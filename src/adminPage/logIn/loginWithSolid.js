function loggedInFrontend(session, store) {
  if (session.info.isLoggedIn) {
    webId.innerHTML = "<h4>Welcome: <span id='name'></span></h4>"
    setName(store, document.getElementById('name'), UI.authn.currentUser())

    const adminManagementDiv = document.createElement('div')
    adminManagementDiv.setAttribute('class', 'adminDivButton')
    const snapshotButton = document.createElement('button')
    snapshotButton.textContent = 'Manage snapshots'
    snapshotButton.addEventListener(
      'click',
      function (_event) {
        const parentDiv = document.getElementById('adminDiv')
        let snapshotTable = document.getElementById('snapshotTableId')
        if (!snapshotTable) snapshotTable = document.createElement('div')
        snapshotTable.setAttribute('class', 'snapshotTable')
        snapshotTable.setAttribute('id', 'snapshotTableId')
        snapshotTable.innerHTML = "Loading..."
        parentDiv.appendChild(snapshotTable)
        manageSnapshots(snapshotTable)
      },
      false
    )
    const thesaurusButton = document.createElement('button')
    thesaurusButton.textContent = 'Manage data'
    thesaurusButton.addEventListener(
      'click',
      function (_event) {
        adminThesaurus()
      },
      false
    )
    adminManagementDiv.appendChild(snapshotButton)
    adminManagementDiv.appendChild(thesaurusButton)

    document.getElementById('adminDiv').appendChild(adminManagementDiv)
  }
}
  
function setName (store, element, webID) {
  const findName = function (x) {
    const name =
      store.any(x, UI.ns.vcard('fn')) ||
      store.any(x, UI.ns.foaf('name')) ||
      store.any(x, UI.ns.vcard('organization-name'))
    return name ? name.value : null
  }
  const name = webID.sameTerm(UI.ns.foaf('Agent')) ? 'Everyone' : findName(webID)
  element.textContent = name || UI.utils.label(webID)
  if (!name && webID.uri) {
    store.fetcher?.nowOrWhenFetched(webID.doc(), undefined, function (_ok) {
      element.textContent = findName(webID) || UI.utils.label(webID) 
    })
  }
}

const session = UI.authn.authSession
const store = UI.store

session.handleIncomingRedirect(
  {
    restorePreviousSession: true
  }).then((info) => {
    console.log(`Logged in with WebID [${info.webId}]`)
    loginBanner.appendChild(UI.login.loginStatusBox(document, null, {}));
    loggedInFrontend(session, store)
  })
