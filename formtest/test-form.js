document.addEventListener('DOMContentLoaded', async function () {
   UI.store.updater.editable = // uri => true // Force modifyable UX // @@@
    function (uri) {
      console.log(' @@ fudging editable for ' + uri)
      return 'SPARQL'
    }

  var dom = document

  const getOptions = {
    credentials: 'omit', withCredentials: false
  }

  function output (row) {
    return row.children[1]
  }
  
  function renderForm (form, subject, container) {
    async function callback() {
    }
    const doc = subject.doc()

    var ele =  UI.widgets.appendForm(dom, container, {}, subject, form, doc, callback)
    return ele
  }

  /* For loading eg ontologies from w3.org
  */
  function addStoHTTP (str) {
    if (str.startsWith('http:')) {
      return 'https:' + str.slice(5)
    }
    return str
  }

  async function doRow (row) {

    async function loadTextIntoCell (cell) {
      const source = cell.getAttribute('source')
      if (!source) return
      const response = await UI.store.fetcher.webOperation('GET', addStoHTTP(source), getOptions)
      if (!response.ok) { // if HTTP-status is 200-299
        const msg = "HTTP-Error: " + response.status
        cell.textContent = msg
        cell.style.backgroundColor = '#fee'
        alert(msg);
        return
      }
      const text = response.responseText;
      const pre = dom.createElement('pre')
      cell.appendChild(pre)
      pre.textContent = text
    }

    const cellForClass = []

    for (var cell of row.children) {
      await loadTextIntoCell(cell)
      if (cell.getAttribute('class')) {
        for (const c of cell.getAttribute('class').split(' ')) {
          cellForClass[c] = cell
          console.log('   cellForClass: ' + c)
        }
      }
    }
    const inputCell = cellForClass['input']
    const targetCell  = cellForClass['target']
    const outputCell = cellForClass['output']

    const inputText = inputCell.firstElementChild.textContent
    console.log(inputText)
    if (inputCell.getAttribute('source')) {
      form = UI.rdf.sym(inputCell.getAttribute('source'))
    }
    /* else {
      form = ex('form')
    } */
    if (targetCell.getAttribute('source')) {
      subject = UI.rdf.sym(targetCell.getAttribute('source'))
    }
    /* else {
      subject = ex('this')
    } */

    // const linkToForm = "https://timea.solidcommunity.net/HelloWorld/components/helloWorldForm.ttl#this"
    //form = UI.rdf.sym(linkToForm)
    await UI.store.fetcher.load(form.doc().uri)


    //const linkToSolidExampleKnowledgeGraph = "https://timea.solidcommunity.net/HelloWorld/data/helloWorld.ttl#0data-Solid-Hello-World"
    //subject = UI.rdf.sym(linkToSolidExampleKnowledgeGraph)
    await UI.store.fetcher.load(subject.doc().uri)
    
    renderForm(form, subject, outputCell)
  }
  async function showResults () {
   
    const testRows = dom.getElementsByClassName('form-demo')
    for (var row of testRows) {
      await doRow(row)
    }
   
  } // showResults

  await showResults()
})
