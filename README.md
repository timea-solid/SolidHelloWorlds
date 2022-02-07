# 📚 Collection of Solid Intro Code Examples

Demo is running on a Solid Pod at: [https://timea.solidcommunity.net/HelloWorld](https://timea.solidcommunity.net/HelloWorld)

The idea was ignited from a conversation on the [Solid forum](https://forum.solidproject.org/t/yet-another-solid-hello-world/4883/38).

# Code Stack

* This Application is built with: HTML, Simple CSS and RDF. And it makes use of RDF & Solid JavaScript libraries (Comunica, Mashlib and solid-ui-components). See [Attributions](#Attribution)
* The application is a one page web application. It all comes together in the `index.html`. 
* Similar to Reach components, we make use of components. The ExamplesApp you see in `index.html` is such a component. However, this component is written in RDF (Turtle serialization). Find the components under `/components/`.

## Data

* The data is a Knowledge Graph about Solid code examples (aka. Solid Hello World). 
* Data is described with the help of [SKOS](https://www.w3.org/2004/02/skos/) and an own created ontology.

The thesaurus contains skos:concepts that describe:
* Solid code examples (Examples)
* Full code stack which contains:
* Code Stack, Solid library and Semantic Web library (see thesaurus image).
* Technical use cases

The thesaurus structure drives the facests/the accordion menu and is served from a SPARQL query part of the `appsDisplay.ttl` file. 

And looks like:

![Solid Hello Worlds SKOS Thesaurus](/docs/SolidHelloWorldsSKOSThesaurus.png)

The ontology extends the SKOS scheme with predicates that help further describe or connect the skos:concepts. The onotology looks like:

![Solid Hello Worlds ontology](/docs/SolidHelloWorldsOntology.png)

* Find the Turle files of the Knowledge Graph and of the ontology under `/data`

## Improvements & ideas

* There are problems with usage of GROUP_CONCAT which give XMLSchema#string in SPARQL queries. However the SPARQL queries and the thesaurus structure was changed to overcome this need.
* If you have improvement ideas or find bugs please open a Git Issue. 
* Feel free to commit PRs. 

TODO:
* make the data about the Solid code examples editable by the community.
 
 ## How to deploy the code

Locally, I make use of LiveServer in Visual Studio Code to run the code. 
Otherwise, the running demo is simply on my Pod, in a HelloWorld folder. An example is: [https://timea.solidcommunity.net/HelloWorld/components/](https://timea.solidcommunity.net/HelloWorld/components/). I made sure the HelloWorld folder has public access.  

### To configure in production

In the `index.html` where I make use of solid ui components make sure to replace `data-solid_ui_component="https://timea.solidcommunity.net/HelloWorld/components/appsDisplay.ttl#ExamplesApp"` with the public location of where you deploy the components Turtle file (appsDisplay.ttl) if you use your own.

# Attribution

* [Jeff Zucker's solid-ui-components](https://github.com/jeff-zucker/solid-ui-components)
* [Simple CSS](https://simplecss.org/)
* [Comunica - a knowedge graph querying framework for JavaScript](https://github.com/comunica/comunica)
* [Mashlib - Solid compatible library for applciation-level functionality](https://github.com/solid/mashlib)
