# 📚 Collection of Solid Intro Code Examples

Demo is running on my Solid Pod at: [https://timea.solidcommunity.net/HelloWorld](https://timea.solidcommunity.net/HelloWorld)

This application is a prototype and still under construction. 

The idea was ignited from a conversation on the [Solid forum](https://forum.solidproject.org/t/yet-another-solid-hello-world/4883/38).

# Architecture

* This Application is built with: HTML, Simple CSS and RDF. And it makes use of RDF & Solid JavaScript libraries (Comunica & Mashlib). See [Attributions](#Attribution)
* The application is a one page web application. It all comes together in the `index.html`. 
* The table you see is being rendered from a Turtle file (a RDF serialization) which you find under `/data/helloWorld.ttl`.
* Similar to Reach components, we make use of components. The Table you see is such a component. However, this component is written in RDF (Turtle serialization). Find the table component under `/components/tables.ttl`.

## Data

* The data is a Knowledge Graph about Solid Code examples. 
* Data is described with the help of [SKOS](https://www.w3.org/2004/02/skos/) and an own created ontology.

The thesaurus contains skos:concepts that describe:
* Solid Example applications
* Code stack
* Technical use cases

And looks like:

![Solid Hello Worlds SKOS Thesaurus](/docs/SolidHelloWorldsSKOSThesaurus.png)

The ontology extends the SKOS scheme with predicates that help further describe or connects the skos:concepts. The onotology looks like:

![Solid Hello Worlds ontology](/docs/SolidHelloWorldsOntology.png)

* Find the Turle files of the Knowledge Graph and of the ontology under `/data`

## Improvements & ideas

* The table cannot display the Code Stack (for example) because the SPARQL query uses GROUP_CONCAT which give XMLSchema#string which is for some reason not render by the ui-components. 
* The applciation is actually intented to be like a form or a QA service where a developer can select code stack, use cases and then be presented with the best fitting Solid code example for their needs. 
* If you have improvement ideas or find bugs please open a Git Issue. 
* Feel free to commit PRs. 
 
# Attribution

* [Jeff Zucker's solid-ui-components](https://github.com/jeff-zucker/solid-ui-components)
* [Simple CSS](https://simplecss.org/)
* [Comunica - a knowedge graph querying framework for JavaScript](https://github.com/comunica/comunica)
* [Mashlib - Solid compatible library for applciation-level functionality](https://github.com/solid/mashlib)
