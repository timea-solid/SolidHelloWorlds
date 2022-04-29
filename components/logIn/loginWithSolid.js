
async function goEdit() {
  await loadFormData()
}

goEdit()

/* loginBanner.appendChild(UI.login.loginStatusBox(document, null, {}));

const loginBanner = document.getElementById("loginBanner");
const webId = document.getElementById("webId");

async function finishLogin() {
  await UI.authn.authSession.handleIncomingRedirect();
  const session = UI.authn.authSession;
  if (session.info.isLoggedIn) {
    // Update the page with the status.
    webId.innerHTML = "<h4>Hello: " + UI.authn.currentUser().uri + "</h4>";
    await loadFormData()
  } else {
    webId.innerHTML = "<h4>First please login or get a Solid user</h4>";
  }
}

finishLogin(); */