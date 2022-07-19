//Note: appsDisplay.ttl, the form for the search interface has a hardcoded LINK_TO_KNOWLEDGE_GRAPH which has to be changed manually
//TODO: make appsDisplay.ttl form pull link to KG from config
const appConfig = {

    // this is the resource we make snapshots for
    LINK_TO_KNOWLEDGE_GRAPH: "https://timea.solidcommunity.net/HelloWorld/data/helloWorld.ttl",
    // this is the container where we place the snapshots
    LINK_TO_KNOWLEDGE_GRAPH_SNAPSHOTS: "https://timea.solidcommunity.net/HelloWorld/data/snapshots/",
    // this is the basename of the created snapshots to which we add the timestamp and the filetype .ttl 
    KNOWLEDGE_GRAPH_SNAPSHOT_NAME: "https://timea.solidcommunity.net/HelloWorld/data/snapshots/helloWorld",

    //forms
    LINK_TO_SEARCH_FORM: "../src/facetedSearchPage/appsDisplay.ttl",
    //solid-ui needs an absolute URL for the form
    LINK_TO_EDIT_FORM: "https://solidweb.me/timeacss/public/SolidHelloWorlds/src/editDataPage/helloWorldForm.ttl",

    //SNAPSHOT related
    NUMBER_OF_SNAPSHOTS: 20
}
