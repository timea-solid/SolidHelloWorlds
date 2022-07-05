//solid-ui is used in solid-ui-components
import * as UI from '../../lib/solid-ui'
// for now we copy over the needed js from Jeff Zucker's project
// see: "https://jeff-zucker.github.io/solid-ui-components/src/solid-ui-components.js
import * as uiCom from '../../lib/solid-ui-components'

uiCom.solidUI.init()

document.getElementById("loading-span").hidden = true