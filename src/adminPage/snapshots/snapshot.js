async function snapshotsLogic(linkToKG, linkToGKsnapshotContainer, KGname, threshold) {

    //set a default
    if (!threshold) threshold = 10
    
    const store = UI.store

    await loadOrCreateContainer(store, linkToGKsnapshotContainer)
    const snapshots = await getContainerMembers(store, UI.rdf.sym(linkToGKsnapshotContainer))
    const sortedSnapshotFileNames = snapshots.map(snapshot => snapshot.value).sort() // the first element contains the oldest content
    
    const currentKG = await store.fetcher.load(linkToKG)

    if (sortedSnapshotFileNames && sortedSnapshotFileNames.length === 0) {
        sortedSnapshotFileNames.push(await createSnapshot(store, currentKG, KGname))
    } else {
        const latestSnapshotLink = sortedSnapshotFileNames[sortedSnapshotFileNames.length - 1] // last element contains the newest content
        let latestSnapshotKG
        try {
            latestSnapshotKG = await store.fetcher?.load(latestSnapshotLink)
        } catch (err) {
            console.log(err) 
            latestSnapshotKG = {}
            latestSnapshotKG.responseText = ''
        }

        if (latestSnapshotKG.responseText !== currentKG.responseText) {
            //console.log(latestSnapshotKG.responseText !== currentKG.responseText) 
            //console.log(latestSnapshotKG.responseText)
            //console.log(currentKG.responseText) 
            sortedSnapshotFileNames.push(await createSnapshot(store, currentKG, KGname))
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
    let versioningTriples = "\n" +" :this <http://purl.org/dc/terms/modified> \"" + now.toISOString() + "\"^^<http://www.w3.org/2001/XMLSchema#dateTime> ."
    if (UI.authn.currentUser()) {
        versioningTriples += "\n" + " :this <http://purl.org/dc/terms/creator> "+ UI.authn.currentUser() +" ."
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

async function switchSnapshot(store, url, element, linkToKG) {
    console.info("switching snapshot")
    element.textContent = 'Working...'
    try {
        const snapshotKG = await store.fetcher?.load(url)
        await store.fetcher?.webOperation('DELETE', UI.rdf.sym(linkToKG))
        await store.fetcher?.webOperation('PUT', linkToKG, { data: snapshotKG.responseText, contentType: 'text/turtle', Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"' })
        const currentKG = await store.fetcher?.load(linkToKG)
    } catch (err) {
        const msg = 'could not switch snapshot '
        element.textContent = msg
        throw new Error(msg);
    }
    element.textContent = "Successful"
}