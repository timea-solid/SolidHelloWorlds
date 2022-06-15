async function finishLogin() {
  await UI.authn.authSession.handleIncomingRedirect()
  const session = UI.authn.authSession
  if (session.info.isLoggedIn) {
    webId.innerHTML = "<h4>Welcome: <span id='name'></span></h4>"
    setName(UI.store, document.getElementById('name'), UI.authn.currentUser())

    const adminManagementDiv = document.createElement('div')
    adminManagementDiv.setAttribute('class','adminDivButton')
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
        adminSnapshots(snapshotTable)
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
  } else {
    const loginBanner = document.getElementById("loginBanner")
    const webId = document.getElementById("webId")
    webId.innerHTML = "<h4>First please login or get a Solid user and then register as admin</h4>"
    loginBanner.appendChild(UI.login.loginStatusBox(document, null, {}));
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

finishLogin();