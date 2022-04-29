function complainIfBad(ok, message) {
    if (ok) return
    div = document.getElementById("app")
    div.appendChild(UI.widgets.errorMessageBlock(dom, message, '#fee'))
}
    
function renderData(div, subject, form) {
    const formThis = UI.rdf.sym(form.doc().uri+"#this")
    const newSubject = UI.rdf.sym(subject.doc().uri + "#Hello-Solid")
    console.log('\nAppending form now:')
    console.log(`  form ${formThis}\n  subject:  ${newSubject}`)
    UI.widgets.appendForm(
        document,
        div,
        {},
        newSubject, //subject = is the RDF thing about which data will be stored
        formThis, //form = is the RDF object in the store for the form
        subject.doc(), //doc = is the RDF document on the web where the data will be stored. Often, subject.doc()
        complainIfBad
    )
}

async function loadFormData() {

    // load Form data
    const linkToForm = "https://timea.solidcommunity.net/HelloWorld/components/editData/helloWorldForm.ttl"
    linkToFormDoc = UI.rdf.sym(linkToForm)
    await UI.store.fetcher.load(linkToFormDoc)
    console.log("loaded form turtle")
    const formTitel = UI.store.statementsMatching(undefined, undefined, UI.rdf.sym('http://www.w3.org/2004/02/skos/core#prefLabel'))
    for (let i=0; i<formTitel.length;i++) {
        let title = formTitel[i]
        console.log(title.subject.uri +" "+title.predicate.uri + " has skos:prefLabel ") // the WebID of a friend
    }
    // load Solid example knowledge graph
    const linkToSolidExampleKnowledgeGraph = "https://timea.solidcommunity.net/HelloWorld/data/helloWorld.ttl"
    linkToSolidExampleKnowledgeGraphDoc = UI.rdf.sym(linkToSolidExampleKnowledgeGraph)
    await UI.store.fetcher.load(linkToSolidExampleKnowledgeGraphDoc)
    console.log("loaded knowledge graph")
    const examples = UI.store.statementsMatching(undefined, undefined, UI.rdf.sym('https://wkokgit.github.io/hellosolid/'))
    for (let i=0; i<examples.length;i++) {
        let example = examples[i]
        console.log(example.subject.uri +" "+example.predicate.uri + " have the desired link") // the WebID of a friend
    }
    renderForm(linkToSolidExampleKnowledgeGraphDoc, linkToFormDoc)
}

function renderForm(subject, form) {
    const div = document.getElementById("app")
    //if (UI.authn.currentUser()) {
      //  loggedInUser = UI.authn.currentUser().uri
       // console.log("------" + loggedInUser)
        renderData(div, subject, form)
    //}
}
