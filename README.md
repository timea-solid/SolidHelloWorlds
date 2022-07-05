# Welcome to Solid Hello World! <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="28">

Demo is running on my Solid Pod: [https://timea.solidcommunity.net/HelloWorld](https://timea.solidcommunity.net/HelloWorld)

**Note:** This project is build on prototype libraries. And it serves multiple goals.

# Table of contents:
- [Purpose of Demo](#Purpose-of-demo)
- [Code Stack](#Code-Stack)
- [Data Model](#Data-model)
  - [Solid Hello World Thesaurus](#Solid-Hello-World-Thesaurus)
  - [Solid Hello World Ontology](#Solid-Hello-World-Ontology)
- [Improvements & ideas](#Improvements-&-ideas)
- [How to deploy the code](#How-to-deploy-the-code)
  - [To configure in production](#To-configure-in-production)
- [Attribution](#Attribution)

# Purpose of Demo

This demo server multiple goals.
1) A collection of beginner friendly Solid code examples. The Solid community survey identified this as one of the highest needs in the community.
2) A reply to a conversation over at the [Solid forum](https://forum.solidproject.org/t/yet-another-solid-hello-world/4883/38).
3) Create a Solid Web App with low-code by defining the Web App UI in RDF (no need to know any frontend framework). 
4) Showcase how the 'Single point of truth' can be achieved and used with Solid.


# Code Stack

This Web App makes use of HTML, Simple CSS, RDF and basic javascript. The heavy lifting (rendering the UI from RDF) is taken care of libraries one can simply reuse such as: Comunica, Mashlib, solid-ui-components, see [attributions](#Attribution) for links.

* Initially, the application was intended to be a one page web application. It all starts at `index.html`. However, because I make use of different libs, I added additional pages but kept them completely separate in order to easier follow how to use the libs best. 

* Details:
  - [facetedSearchPage](https://github.com/timea-solid/SolidHelloWorlds/tree/master/src/facetedSearchPage) is the simplest example: it theoretically ONLY needs a html and a RDF file (and CSS if you want to make it shinnier) and the solid-ui (or mashlib) and solid-ui-components libs. This example makes use of Jeff's solid-ui-components lib which has elements like accordion. appsDisplay.ttl is the RDF from which the Frontend if generated and it is of course mapped to the data model (ontology) used in the data we want displayed (which is also in RDF, stored on a Pod).
  - [editDataPage](https://github.com/timea-solid/SolidHelloWorlds/tree/master/src/editDataPage) is based on same principles: you have an RDF file, helloWorldForm.ttl based on which the frontend, a form in this case, is rendered. Again it is based on the data model (ontology) the raw data is using. Here we make use of the original solid-ui forms lib developed by Sir Tim erners-Lee. We use this lib here because one can also EDIT the data in place. 
  - [adminPage](https://github.com/timea-solid/SolidHelloWorlds/tree/master/src/adminPage) is a nothing to see here page not making use of any UI rendered from RDF functionality. This page uses Solid Login to gove access to some admin activities such as checking snapshots of our data. 


# Data Model

The Solid Hello World is a Knowledge Graph which consists of:
- a [Solid Hello World Thesaurus](https://github.com/timea-solid/SolidHelloWorlds/blob/master/data/helloWorld.ttl)
- a [Solid Hello World Ontology](https://github.com/timea-solid/SolidHelloWorlds/blob/master/data/SolidHelloWorldOntology.ttl)

## Solid Hello World Thesaurus

* The raw data, saved in the repo only to serve as an example, [helloWorld.ttl](https://github.com/timea-solid/SolidHelloWorlds/blob/master/data/helloWorld.ttl) is a Thesaurus about Solid code examples (aka. Solid Hello World). This data can be on any Pod.
* The Solid Hello World Thesaurus, helloWorld.ttl, is described with the help of [SKOS](https://www.w3.org/2004/02/skos/) and an own created ontology.

The Solid Hello World Thesaurus is based on [SKOS](https://www.w3.org/2004/02/skos/) and contains skos:concepts that describe:
* Solid code examples (Examples)
* Code stacks divided in:
  * Generic Code Stack, Solid library and Semantic Web library (see thesaurus image).
* Technical use cases

The Solid Hello World Thesaurus structure drives the facests/the accordion menu on the search (main page). When I say the structure drives the menu it technically means a SPARQL query executed on the Solid Hello World Thesaurus `appsDisplay.ttl` automatically fills the search oprions for each accordion.

The Solid Hello World Thesaurus looks like:

![Solid Hello Worlds SKOS Thesaurus](/docs/SolidHelloWorldsSKOSThesaurus.png)

## Solid Hello World Ontology

The ontology extends the SKOS scheme with predicates that help further describe or connect/descriove the skos:concepts. The onotology looks like:

![Solid Hello Worlds ontology](/docs/SolidHelloWorldsOntology.png)


# Improvements & ideas

* There are problems with usage of GROUP_CONCAT which give XMLSchema#string in SPARQL queries. However the SPARQL queries and the thesaurus structure was changed to overcome this need.
* If you have improvement ideas or find bugs please open a Git Issue. 
* Feel free to commit PRs. 
 
# How to deploy the code

Locally, I make use of LiveServer in Visual Studio Code to run the project. 
Otherwise, the running demo is simply on my Pod, in a HelloWorld folder. An example is: [https://timea.solidcommunity.net/HelloWorld/components/](https://timea.solidcommunity.net/HelloWorld/components/). I made sure the HelloWorld folder has public access.  

## To configure in production

In the `index.html` where I make use of solid ui components make sure to replace `data-solid_ui_component="https://timea.solidcommunity.net/HelloWorld/components/facetedSearch/appsDisplay.ttl#ExamplesApp"` with the public location of where you deploy the components Turtle file (appsDisplay.ttl) if you use your own.

# Attribution

* [Jeff Zucker's solid-ui-components](https://github.com/jeff-zucker/solid-ui-components)
* [Simple CSS](https://simplecss.org/)
* [Comunica - a knowedge graph querying framework for JavaScript](https://github.com/comunica/comunica)
* [Mashlib - Solid compatible library for application-level functionality](https://github.com/solid/mashlib)
* [Solid-ui forms - User interface widgetsand utility for Solid](https://github.com/SolidOS/solid-ui)
