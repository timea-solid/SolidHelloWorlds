async function adminSnapshots(snapshotTable) {
    // from snapshot.js
    // this is the resource we make snapshots for
    LINK_TO_KNOWLEDGE_GRAPH = "https://timea.solidcommunity.net/HelloWorld/data/helloWorld.ttl"
    // this is the container where we place the snapshots
    LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS = "https://timea.solidcommunity.net/HelloWorld/data/snapshots/"
    // this is the basename of the created snapshots to which we add the timestamp and the filetype .ttl 
    // TODO: automatised to identify the filetype from the input file type
    LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME = LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS + "helloWorld"

    const parentDiv = document.getElementById('adminDiv')
    snapshotTable.innerHTML = ""

    const store = UI.store

    try {
        const response = await store.fetcher?.load(LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS)
    } catch (err) {
        const msg = 'could not load '+LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS
        throw new Error(msg)
    }

    const snapshots = await getContainerMembers(store, UI.rdf.sym(LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS))
    const sortedSnapshotFileNames = snapshots.map(snapshot => snapshot.value).sort() // the first element contains the oldest content
    if (sortedSnapshotFileNames && sortedSnapshotFileNames.length !== 0) {

        const message = document.createElement('span')
        message.textContent = 'We found the following snapshots:'
        snapshotTable.appendChild(message)

        const snapshotsUL = document.createElement('ul')
        snapshotTable.appendChild(snapshotsUL)

        sortedSnapshotFileNames.reverse(function (x, y) {
            const timestampx = x.substring(x.lastIndexOf('-')+1, x.indexOf('.ttl'))
            const timestampy = y.substring(y.lastIndexOf('-')+1, y.indexOf('.ttl'))
            return timestampx - timestampy;
        })

        for (let i = 0; i < sortedSnapshotFileNames.length; i++) {
            const snapshotLI = document.createElement('li')
            snapshotLI.setAttribute('class', 'snapshotLi')
            snapshotLI.setAttribute('value', sortedSnapshotFileNames[i])

            const liDiv = document.createElement('div')
            liDiv.setAttribute('class', 'snapshotLiDiv')

            const timestampDiv = document.createElement('div')
            timestampDiv.setAttribute('class', 'timstampDiv')
            const timestamp = sortedSnapshotFileNames[i].substring(sortedSnapshotFileNames[i].lastIndexOf('-') + 1, sortedSnapshotFileNames[i].indexOf('.ttl'))
            timestampDiv.textContent = (new Date(parseInt(timestamp))).toISOString()

            const userDiv = document.createElement('div')
            userDiv.setAttribute('class', 'nameDiv')
            const snapshotKG = await store.fetcher?.load(sortedSnapshotFileNames[i])
            const snapshotCreator = store.any(UI.rdf.sym(sortedSnapshotFileNames[i]+"#this"), UI.rdf.sym('http://purl.org/dc/terms/creator'), null)
            if (snapshotCreator) {
                userDiv.textContent = snapshotCreator.value
            } else {
                userDiv.textContent = 'unknown creator'
            }

            const useActionDiv = document.createElement('div')
            const useButton = document.createElement('button')
            useButton.setAttribute('class', 'snapshotLiButton')
            useButton.textContent = 'Switch to this version'
            useButton.addEventListener(
                'click',
                function (_event) {
                    switchSnapshot(store, sortedSnapshotFileNames[i], timestamp)
                },
                false
            )
            useActionDiv.appendChild(useButton)

            const deleteActionDiv = document.createElement('div')
            const deleteButton = document.createElement('button')
            deleteButton.setAttribute('class', 'snapshotLiButton')
            deleteButton.textContent = 'Delete this snapshot'
            deleteButton.addEventListener(
                'click',
                function (_event) {
                    deleteSnapshot(store, sortedSnapshotFileNames[i], timestamp)
                },
                false
            )
                
            deleteActionDiv.appendChild(deleteButton)

            const messageDiv = document.createElement('div')
            const messageDivSpan = document.createElement('span')
            messageDivSpan.setAttribute('id','span'+timestamp)
            messageDivSpan.setAttribute('class','spanshotMessage')
            messageDiv.appendChild(messageDivSpan)
            
            liDiv.appendChild(timestampDiv)
            liDiv.appendChild(userDiv)
            liDiv.appendChild(useActionDiv)
            liDiv.appendChild(deleteActionDiv)
            liDiv.appendChild(messageDiv)

            snapshotLI.appendChild(liDiv)
            snapshotsUL.appendChild(snapshotLI)
            
        }
        
    } else {
        const message = document.createElement('span')
        message.setAttribute('id', 'spanMessage')
        message.textContent = "The system has no snapshots yet"
        snapshotTable.appendChild(message)
    }

    const createSnapDiv = document.createElement('div')
    createSnapDiv.setAttribute('class', 'createNewDiv')
    
    const createSnapshotButton = document.createElement('button')
    createSnapshotButton.textContent = 'Create snpashot now'
    createSnapshotButton.addEventListener(
        'click',
        function (_event) {
            createSnapshotNow(store, LINK_TO_KNOWLEDGE_GRAPH, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME, sortedSnapshotFileNames)
        },
        false
    )
    
    const messageCreateSpan = document.createElement('span')
    messageCreateSpan.setAttribute('class', 'spanshotCreateMessage')
    messageCreateSpan.setAttribute('id', 'createSnap')
    createSnapDiv.appendChild(createSnapshotButton)
    createSnapDiv.appendChild(messageCreateSpan)
    
    snapshotTable.appendChild(createSnapDiv)

}
    
    
function deleteSnapshot(store, url, timestamp) {
    console.info('deleting '+url)
    store.fetcher?.webOperation('DELETE', UI.rdf.sym(url))
    document.getElementById('span'+timestamp).textContent = "Successful"
}

async function switchSnapshot(store, url, timestamp) {
    console.info("switching to version from " + (new Date(parseInt(timestamp))).toISOString())
    try {
        const snapshotKG = await store.fetcher?.load(url)
        await store.fetcher?.webOperation('DELETE', UI.rdf.sym(LINK_TO_KNOWLEDGE_GRAPH))
        await store.fetcher?.webOperation('PUT', LINK_TO_KNOWLEDGE_GRAPH, { data: snapshotKG.responseText, contentType: 'text/turtle', Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"' })
        const currentKG = await store.fetcher?.load(LINK_TO_KNOWLEDGE_GRAPH)
    } catch (err) {
        const msg = 'could not switch snapshot '
        throw new Error(msg);
    }
    document.getElementById('span'+timestamp).textContent = "Successful"
}

async function createSnapshotNow(store, linkToCurrentKG, snapName, sortedSnapshotFileNames) {
    try {
        const currentKG = await store.fetcher?.load(linkToCurrentKG)
        sortedSnapshotFileNames.push(await createSnapshot(store, currentKG, snapName))
    } catch (err) {
        const msg = 'Something went wrong'
        document.getElementById('createSnap').textContent = msg
        throw new Error(msg + ' ' + err)
    }
    document.getElementById('createSnap').textContent = 'Successful'
}