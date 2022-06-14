async function manageSnapshots(LINK_TO_KNOWLEDGE_GRAPH, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME, threshold) {

    if (!LINK_TO_KNOWLEDGE_GRAPH) LINK_TO_KNOWLEDGE_GRAPH = "https://timea.solidcommunity.net/HelloWorld/data/helloWorld.ttl"
    if (!LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS) LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS = "https://timea.solidcommunity.net/HelloWorld/data/snapshots/"
    if (!LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME) LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME = LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS+"helloWorld"
    if (!threshold) threshold = 20
    
    const store = UI.store

    await loadOrCreateContainer(store, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS)
    const snapshots = await getContainerMembers(store, UI.rdf.sym(LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS))
    const sortedSnapshotFileNames = snapshots.map(snapshot => snapshot.value).sort() // the first element contains the oldest content
    
    const currentKG = await store.fetcher?.load(LINK_TO_KNOWLEDGE_GRAPH)

    if (sortedSnapshotFileNames && sortedSnapshotFileNames.length === 0) {
        sortedSnapshotFileNames.push(await createSnapshot(store, currentKG, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME))
    } else {
        const latestSnapshotLink = sortedSnapshotFileNames[sortedSnapshotFileNames.length-1] // last element contains the newest content
        const latestSnapshotKG = await store.fetcher?.load(latestSnapshotLink)
        if (latestSnapshotKG && latestSnapshotKG.responseText !== currentKG.responseText) {
            sortedSnapshotFileNames.push(await createSnapshot(store, currentKG, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME))
        }
    }

    if (sortedSnapshotFileNames && sortedSnapshotFileNames.length > threshold) {
        deleteOlderSnapshots(store, sortedSnapshotFileNames, threshold)
    }

}
async function loadOrCreateContainer(store, containerNode) {
    try {
        const response = await store.fetcher?.load(containerNode)
    } catch (err) {
        if (err.response && err.response.status === 404) {
            try {
                await createContainer(store, containerNode)
            } catch (err) {
                const msg = 'createContainer: PUT FAILED: ' + doc + ': ' + err
                throw new Error(msg)
            }
            delete store.fetcher.requested[containerNode] // delete cached 404 error
        } else {
            const msg =  'createIfNotExists doc load error NOT 404:  ' + containerNode + ': ' + err
            throw new Error(msg) // @@ add nested errors
        }
    }
}

async function createSnapshot(store, currentKG, nameOfSnapshot) {
    const docName = nameOfSnapshot +"-"+ (new Date()).getTime() + ".ttl"
    await createResource(store, currentKG.responseText, docName)
    return docName
}

async function createResource(store, currentKG, docName) {
    try {
        await store.fetcher?.webOperation('PUT', docName, { data: currentKG, contentType: 'text/turtle' })
    } catch (err) {
        const msg = 'createIfNotExists: PUT FAILED: ' + docName + ': ' + err
        throw new Error(msg)
    }
    console.info("created snapshot")
}

function isContainer(url) {
    return url.charAt(url.length-1) === "/";
}

async function createContainer (store, url) {
    if (!isContainer(url)) {
        const msg = 'not a container URL '+url
        throw new Error(msg);
    }

    try {
        await store.fetcher?.webOperation('PUT', url, { data: '', contentType: 'text/turtle', Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"' })
    } catch (err) {
        const msg = `not OK: got ${result.status} response while creating container at ${url}`
        throw new Error(msg)
    }
    console.info('created snapshot container') 
}

function getContainerElements (store, containerNode) {
return store
    .statementsMatching(
    containerNode,
    UI.rdf.sym("http://www.w3.org/ns/ldp#contains"),
    undefined,
    )
    .map((st) => st.object);
}

async function getContainerMembers (store, containerNode) {
    return getContainerElements(store, containerNode);
}

function getContainerElements(store, containerNode) {
    return store
    .statementsMatching(
        containerNode,
        UI.rdf.sym("http://www.w3.org/ns/ldp#contains"),
        undefined,
    )
    .map((st) => st.object);
}

function deleteOlderSnapshots(store, snapshots, threshold) {
    snapshots.sort(function (x, y) {
    const timestampx = x.substring(x.indexOf('-')+1, x.indexOf('.ttl'))
    const timestampy = y.substring(y.indexOf('-')+1, y.indexOf('.ttl'))
    return timestampx - timestampy;
    })
    for (let i = 0; i < snapshots.length-threshold; i++) {
        console.info('deleting '+snapshots[i])
        store.fetcher?.webOperation('DELETE', UI.rdf.sym(snapshots[i]))
    }
}