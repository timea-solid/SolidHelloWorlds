document.addEventListener('DOMContentLoaded', function () {
    snapshotsLogic(appConfig.LINK_TO_KNOWLEDGE_GRAPH, appConfig.LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS, appConfig.KNOWLEDGE_GRAPH_SNAPSHOT_NAME, appConfig.NUMBER_OF_SNAPSHOTS )
    loadData()
        }, false)

function complainIfBad(ok, message) {
    if (ok) return
    div = document.getElementById("app")
    div.appendChild(UI.widgets.errorMessageBlock(dom, message, '#fee'))
}
    
function renderData(div, subject, form) {
    const formThis = UI.store.sym(form.doc().uri+"#this")
    const newSubject = UI.store.sym(subject.doc().uri + "#Examples")
    console.log('appending form now')
    var ele = UI.widgets.appendForm(
        document,
        div,
        {},
        newSubject, //subject = is the RDF thing about which data will be stored
        formThis, //form = is the RDF object in the store for the form
        newSubject.doc(), //doc = is the RDF document on the web where the data will be stored. Often, subject.doc()
        complainIfBad
    )
    return ele
}

async function loadFormData() {

    // load Form data
    const linkToFormDoc = UI.store.sym(appConfig.LINK_TO_EDIT_FORM)
    await UI.store.fetcher.load(linkToFormDoc)
    console.log("loaded form turtle")
    // just a test to see that it is loaded
    const formTitel = UI.store.statementsMatching(undefined, undefined, UI.rdf.sym('http://www.w3.org/2004/02/skos/core#prefLabel'))
    for (let i=0; i<formTitel.length;i++) {
        let title = formTitel[i]
        // console.log(title.subject.uri +" "+title.predicate.uri + " has skos:prefLabel ") // the WebID of a friend
    }
    
    // load Solid example knowledge graph
    const linkToSolidExampleKnowledgeGraphDoc = UI.rdf.sym(appConfig.LINK_TO_KNOWLEDGE_GRAPH)
    await UI.store.fetcher.load(linkToSolidExampleKnowledgeGraphDoc)
    console.log("loaded knowledge graph")
    // just a test to see that it is loaded
    const examples = UI.store.statementsMatching(undefined, undefined, UI.rdf.sym('https://wkokgit.github.io/hellosolid/'))
    for (let i=0; i<examples.length;i++) {
        let example = examples[i]
        // console.log(example.subject.uri +" "+example.predicate.uri + " have the desired link") // the WebID of a friend
    } 
    
    renderForm(linkToSolidExampleKnowledgeGraphDoc, linkToFormDoc)
}

function renderForm(subject, form) {
    const div = document.getElementById("app")
    div.innerHTML = ""
    // login only used maybe later
    //if (UI.authn.currentUser()) {
      //  loggedInUser = UI.authn.currentUser().uri
       // console.log("------" + loggedInUser)
        renderData(div, subject, form)
    //}
}

async function loadData() {
    await loadFormData()
}