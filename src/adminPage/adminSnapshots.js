async function manageSnapshots(snapshotTable) {

    const parentDiv = document.getElementById('adminDiv')
    snapshotTable.innerHTML = ""

    const store = UI.store

    try {
        const response = await store.fetcher.load(appConfig.LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS)
    } catch (err) {
        const msg = 'could not load '+appConfig.LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS
        throw new Error(msg)
    }

    const snapshots = await getContainerMembers(store, UI.rdf.sym(appConfig.LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS))
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
            await store.fetcher.load(sortedSnapshotFileNames[i])
            const snapshotCreator = await store.any(UI.rdf.sym(sortedSnapshotFileNames[i]+'#this'), UI.rdf.sym('http://purl.org/dc/terms/creator'), null, UI.rdf.sym(sortedSnapshotFileNames[i]))
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
                    switchSnapshot(store, sortedSnapshotFileNames[i], document.getElementById('span'+timestamp), appConfig.LINK_TO_KNOWLEDGE_GRAPH)
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
                    deleteSnapshot(store, sortedSnapshotFileNames[i], document.getElementById('span'+timestamp))
                },
                false
            )
                
            deleteActionDiv.appendChild(deleteButton)

            const messageDiv = document.createElement('div')
            const messageDivSpan = document.createElement('span')
            messageDivSpan.setAttribute('id','span'+timestamp)
            messageDivSpan.setAttribute('class','spanshotMessage')
            messageDiv.appendChild(messageDivSpan)

            try {
                await store.fetcher.load(sortedSnapshotFileNames[i])
            } catch (err) {
                messageDivSpan.textContent = "This snapshot has a parse error"
            }
            
            liDiv.appendChild(timestampDiv)
            liDiv.appendChild(userDiv)
            liDiv.appendChild(useActionDiv)
            liDiv.appendChild(deleteActionDiv)
            liDiv.appendChild(messageDiv)

            snapshotLI.appendChild(liDiv)
            snapshotsUL.appendChild(snapshotLI)
            
        }
        
    } else {
        const noSnapMessageDiv = document.createElement('div')
        const message = document.createElement('span')
        message.setAttribute('id', 'spanMessage')
        message.textContent = "The system has no snapshots yet"
        noSnapMessageDiv.appendChild(message)
        snapshotTable.appendChild(noSnapMessageDiv)
        snapshotTable.setAttribute('class', 'noSnapshots')
    }

    const createSnapDiv = document.createElement('div')
    createSnapDiv.setAttribute('class', 'createNewDiv')
    
    const createSnapshotButton = document.createElement('button')
    createSnapshotButton.textContent = 'Create snapshot now'
    createSnapshotButton.addEventListener(
        'click',
        function (_event) {
            createSnapshotNow(store, appConfig.LINK_TO_KNOWLEDGE_GRAPH, appConfig.KNOWLEDGE_GRAPH_SNAPSHOT_NAME, sortedSnapshotFileNames, document.getElementById('createSnap'))
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


