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
            const msg = 'createIfNotExists doc load error NOT 404:  ' + containerNode + ': ' + err
            throw new Error(msg) // @@ add nested errors
        }
    }
}

async function createResource(store, currentKG, docName) {
    try {
        await store.fetcher?.webOperation('PUT', docName, { data: currentKG, contentType: 'text/turtle' })
    } catch (err) {
        const msg = 'createIfNotExists: PUT FAILED: ' + docName + ': ' + err
        throw new Error(msg + ' '+ err)
    }
    console.info("created snapshot")
}

function isContainer(url) {
    return url.charAt(url.length-1) === "/";
}

async function createContainer (store, url) {
    if (!isContainer(url)) {
        const msg = 'not a container URL '+url
        throw new Error(msg)
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