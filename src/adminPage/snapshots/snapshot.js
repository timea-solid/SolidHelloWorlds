async function snapshotsLogic(LINK_TO_KNOWLEDGE_GRAPH, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME, threshold) {

    // this is the resource we make snapshots for
    if (!LINK_TO_KNOWLEDGE_GRAPH) LINK_TO_KNOWLEDGE_GRAPH = "https://timea.solidcommunity.net/HelloWorld/data/helloWorld.ttl"
    // this is the container where we place the snapshots
    if (!LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS) LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS = "https://timea.solidcommunity.net/HelloWorld/data/snapshots/"
    // this is the basename of the created snapshots to which we add the timestamp and the filetype .ttl 
    // TODO: automatised to identify the filetype from the input file type
    if (!LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME) LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOT_NAME = LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS + "helloWorld"
    // how many maximim snapshots we should maintain
    if (!threshold) threshold = 20
    
    const store = UI.store

    await loadOrCreateContainer(store, LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS)
    const snapshots = await getContainerMembers(store, UI.rdf.sym(LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS))
    const sortedSnapshotFileNames = snapshots.map(snapshot => snapshot.value).sort() // the first element contains the oldest content
    
    const currentKG = await store.fetcher.load(LINK_TO_KNOWLEDGE_GRAPH)

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

async function createSnapshot(store, currentKG, nameOfSnapshot) {
    const now = new Date()
    const timestamp = now.getTime()
    let docName = nameOfSnapshot + "-" + timestamp + ".ttl"
    let versioningTriples = ":this <http://purl.org/dc/terms/modified> \"" + now.toISOString() + "\"^^<http://www.w3.org/2001/XMLSchema#dateTime> ."
    if (UI.authn.currentUser()) {
        versioningTriples += "\n" + ":this <http://purl.org/dc/terms/creator> "+ UI.authn.currentUser() +" ."
    }
    await createResource(store, currentKG.responseText + versioningTriples, docName)
    return docName
}

function deleteOlderSnapshots(store, snapshots, threshold) {
    snapshots.sort(function (x, y) {
    const timestampx = x.substring(x.lastIndexOf('-')+1, x.indexOf('.ttl'))
    const timestampy = y.substring(y.lastIndexOf('-')+1, y.indexOf('.ttl'))
    return timestampx - timestampy;
    })
    for (let i = 0; i < snapshots.length-threshold; i++) {
        console.info('deleting '+snapshots[i])
        store.fetcher?.webOperation('DELETE', UI.rdf.sym(snapshots[i]))
    }
}

function deleteSnapshot(store, url, element) {
    console.info('deleting ' + url)
    element.textContent = 'Working...'
    try {
        store.fetcher?.webOperation('DELETE', UI.rdf.sym(url))
    } catch (err) {
        const msg = 'Something went wrong'
        element.textContent = msg
        throw new Error(msg + ' ' + err)
    }
    element.textContent = "Successful"
}

async function createSnapshotNow(store, linkToCurrentKG, snapName, sortedSnapshotFileNames, element) {
    console.info('creating snapshot')
    element.textContent = 'Working...'
    try {
        const currentKG = await store.fetcher?.load(linkToCurrentKG)
        sortedSnapshotFileNames.push(await createSnapshot(store, currentKG, snapName))
    } catch (err) {
        const msg = 'Something went wrong'
        element.textContent = msg
        throw new Error(msg + ' ' + err)
    }
    element.textContent = 'Successful'
}

async function switchSnapshot(store, url, element) {
    console.info("switching snapshot")
    element.textContent = 'Working...'
    try {
        const snapshotKG = await store.fetcher?.load(url)
        await store.fetcher?.webOperation('DELETE', UI.rdf.sym(LINK_TO_KNOWLEDGE_GRAPH))
        await store.fetcher?.webOperation('PUT', LINK_TO_KNOWLEDGE_GRAPH, { data: snapshotKG.responseText, contentType: 'text/turtle', Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"' })
        const currentKG = await store.fetcher?.load(LINK_TO_KNOWLEDGE_GRAPH)
    } catch (err) {
        const msg = 'could not switch snapshot '
        element.textContent = msg
        throw new Error(msg);
    }
    element.textContent = "Successful"
}