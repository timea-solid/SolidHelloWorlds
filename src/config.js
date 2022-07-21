//Note: appsDisplay.ttl, the form for the search interface has a hardcoded LINK_TO_KNOWLEDGE_GRAPH which has to be changed manually
//this are DEVELOPMENT configs and should be changed
const appConfig = {

    // this is the resource we make snapshots for
    LINK_TO_KNOWLEDGE_GRAPH: "https://timea.solidcommunity.net/SolidHelloWorldDevelopment/data/helloWorld.ttl",
    // this is the container where we place the snapshots
    LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS: "https://timea.solidcommunity.net/SolidHelloWorldDevelopment/data/snapshots/",
    // this is the basename of the created snapshots to which we add the timestamp and the filetype .ttl 
    KNOWLEDGE_GRAPH_SNAPSHOT_NAME: "https://timea.solidcommunity.net/SolidHelloWorldDevelopment/data/snapshots/helloWorld",

    //forms
    //solid-ui needs an absolute URL for the form
    LINK_TO_EDIT_FORM: "https://timea.solidcommunity.net/SolidHelloWorldDevelopment/forms/helloWorldForm.ttl",

    //SNAPSHOT related
    NUMBER_OF_SNAPSHOTS: 20
}
