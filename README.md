# Welcome to Solid Hello Worlds! <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="28">

* The App is running on my Solid Pod: [https://timea.solidcommunity.net/HelloWorld](https://timea.solidcommunity.net/HelloWorld) and on [GitHub pages](https://timea-solid.github.io/SolidHelloWorlds/)

* The [user manual](https://github.com/timea-solid/SolidHelloWorlds/blob/master/docs/UserManual.md) is under docs.

* Tutorial will be posted soon.

* The App is part of the Blog post series of the SolidOS team

**Note:** This project is build on prototype libraries. And it serves multiple goals.

# Table of contents

- [Welcome to Solid Hello Worlds! <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="28">](#welcome-to-solid-hello-worlds-)
- [Table of contents](#table-of-contents)
- [Purpose of App](#purpose-of-app)
- [About the code](#about-the-code)
- [Data Model](#data-model)
  - [Solid Hello Worlds Thesaurus](#solid-hello-worlds-thesaurus)
  - [Solid Hello Worlds Ontology](#solid-hello-worlds-ontology)
- [How to run the code locally](#how-to-run-the-code-locally)
  - [Improvements and ideas](#improvements-and-ideas)
  - [Known TODOs](#known-todos)
- [How to deploy the code](#how-to-deploy-the-code)
  - [Run on a Pod](#run-on-a-pod)
  - [Run as a distributed system](#run-as-a-distributed-system)
- [Attribution](#attribution)

# Purpose of App

This demo server multiple goals.

1) A collection of beginner friendly Solid code examples. The Solid community survey identified this as one of the biggest needs in the Solid community.
2) A reply to a conversation over at the [Solid forum](https://forum.solidproject.org/t/yet-another-solid-hello-world/4883/38).
3) Create a Solid Web App with low-code by defining the Web App UI in RDF (no need to know any frontend framework).
4) Showcase how the 'Single point of truth' can be achieved and used with Solid.

# About the code

This Web App makes use of HTML, Simple CSS, RDF and basic javascript. The heavy lifting (rendering the UI from RDF) is taken care of libraries one can simply reuse such as: Comunica, Mashlib, solid-ui-components, see [attributions](#Attribution) for links.

* Initially, the application was intended to be a one page web application. It all starts at `index.html`. However, because I make use of different libs, I added additional pages but kept them in separate folders in the structure in order to easier follow how to use the libs best.

* Details:
  * [facetedSearchPage](https://github.com/timea-solid/SolidHelloWorlds/tree/master/src/facetedSearchPage) is the simplest example: it theoretically ONLY needs a html and a RDF file (and CSS if you want to make it shinnier) and the solid-ui (or mashlib) and solid-ui-components libs. This part of the app makes use of Jeff's solid-ui-components lib which has elements for menus, like accordions. [appsDisplay.ttl](https://github.com/timea-solid/SolidHelloWorlds/blob/master/src/facetedSearchPage/appsDisplay.ttl) is the RDF form which the frontend is generated from, and it is of course mapped to the data model (Knowlegde Graph and Ontology) used in the data we want displayed (which is also in RDF, stored on a Pod).
  * [editDataPage](https://github.com/timea-solid/SolidHelloWorlds/tree/master/src/editDataPage) is based on same principles: you have an RDF file, [helloWorldForm.ttl](https://github.com/timea-solid/SolidHelloWorlds/blob/master/src/editDataPage/helloWorldForm.ttl), a form, based on which the frontend is rendered. Again it is based on the data model (ontology) the raw data is using. Here we make use of the original solid-ui forms lib developed by Sir Tim Berners-Lee. This lib allows us to EDIT the data in place.
  * [adminPage](https://github.com/timea-solid/SolidHelloWorlds/tree/master/src/adminPage) uses Solid Login to give access to some admin activities such as checking snapshots of our data.
  * ***Note** adminPage does not work when app is deployed on a Pod due to mashlib. If deployed on another platform it should work.

# Data Model

The Solid Hello Worlds data model is a Knowledge Graph which consists of:

* a [Solid Hello Worlds Thesaurus](https://github.com/timea-solid/SolidHelloWorlds/blob/master/data/example_helloWorld.ttl)
* a [Solid Hello Worlds Ontology](https://github.com/timea-solid/SolidHelloWorlds/blob/master/data/SolidHelloWorldOntology.ttl)

## Solid Hello Worlds Thesaurus

* The raw data, saved in the repo only to serve as an example, [example-helloWorld.ttl](https://github.com/timea-solid/SolidHelloWorlds/blob/master/data/example_helloWorld.ttl) is a Thesaurus about Solid code examples (aka. Solid Hello Worlds). This data can be on any Pod.
* The Solid Hello Worlds Thesaurus, [example-helloWorld.ttl](https://github.com/timea-solid/SolidHelloWorlds/blob/master/data/example_helloWorld.ttl), is described with the help of [SKOS](https://www.w3.org/2004/02/skos/) and an own created ontology.

The Solid Hello Worlds Thesaurus is based on [SKOS](https://www.w3.org/2004/02/skos/) and contains skos:concepts that describe:

* Solid code examples (Examples)
* Code stacks divided in:
  * Code Stack, Solid library and Semantic Web library (see thesaurus image).
* Technical use cases

The Solid Hello Worlds Thesaurus structure drives the facests/the accordion menu on the search (main page). When I say the structure drives the menu it technically means a SPARQL query executed on the Solid Hello Worlds Thesaurus `appsDisplay.ttl` automatically fills the search oprions for each accordion.

The Solid Hello Worlds Thesaurus looks like:

<p align="center">
   <img width="25%" src="/docs/resources/knowledgeGraph/SolidHelloWorldsSKOSThesaurus.png">
   </br>Solid Hello Worlds Thesaurus
</p>

## Solid Hello Worlds Ontology

The ontology extends the SKOS scheme with predicates that help further describe or connect/descriove the skos:concepts. The onotology looks like:

<p align="center">
   <img width="25%" src="/docs/resources/knowledgeGraph/SolidHelloWorldsOntology.png">
    </br>Solid Hello Worlds Ontology
</p>

# How to run the code locally

1. Git clone repo.
2. OPTIONAL: Change the links to the data model and forms over in the [config.js](https://github.com/timea-solid/SolidHelloWorlds/blob/master/src/config.js). Defaults are the KG and form of the project.
3. OPTIONAL: Change the link to the appsDisplay.ttl over in the [index.html](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/index.html#L24)
4. OPTIONAL: Change the link to your KG in the appsDisplay.ttl [L20](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/src/facetedSearchPage/appsDisplay.ttl#L20) and [L42](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/src/facetedSearchPage/appsDisplay.ttl#L42)
5. Run with `npm run start` or `npx vite`.

## Improvements and ideas

* There are problems with usage of GROUP_CONCAT which give XMLSchema#string in SPARQL queries. However the SPARQL queries and the thesaurus structure was changed to overcome this need.
* If you have improvement ideas or find bugs please open a Git Issue.
* Feel free to commit PRs.

## Known TODOs

* improve snapshot file type
* improve login box styling
* add callback on spanshot functions
* improve js libs imports
* clean code further
* add further thesaurus admin management
* connect login with ACP
* adminPage does not work when app deployed on a Pod

# How to deploy the code

## Run on a Pod

1. Create a folder on your Pod and [make it public](https://github.com/SolidOS/userguide/blob/main/views/sharing/userguide.md#add).
2. Deploy the data from this project to the Pod in the same exact structure. Be sure to have data, src, lib, static, index.html and their contents on your Pod.
3. Change the links to the data model and forms over in the [config.js](https://github.com/timea-solid/SolidHelloWorlds/blob/master/src/config.js). Defaults are the KG and form of the project which will not work.
4. Change the link to the appsDisplay.ttl over in the [index.html](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/index.html#L24)
5. Change the link to your KG in the appsDisplay.ttl [L20](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/src/facetedSearchPage/appsDisplay.ttl#L20) and [L42](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/src/facetedSearchPage/appsDisplay.ttl#L42)
6. Navigate to your the Pod folder name you created for your project and you should see the index.html rendered.

Example: my running demo is simply on my Pod, in a HelloWorld folder over at: [https://timea.solidcommunity.net/HelloWorld/components/](https://timea.solidcommunity.net/HelloWorld/src/). I made sure the HelloWorld folder has public access.  

***NOTE*** the adminPage is not working on a Pod deployment due to mashlib.

## Run as a distributed system

1. Create a folder on a Pod and [make it public](https://github.com/SolidOS/userguide/blob/main/views/sharing/userguide.md#add).
2. Rename the KG [example-helloWorld.ttl](https://github.com/timea-solid/SolidHelloWorlds/blob/master/data/example_helloWorld.ttl) to helloWorld.ttl and deploy in the new folder.
3. Create a folder on a Pod for your forms, can be the same folder or separate folders for each form. Make sure they are publicly readable.
4. Deploy the [appsDisplay.ttl](https://github.com/timea-solid/SolidHelloWorlds/blob/master/src/facetedSearchPage/appsDisplay.ttl) form and the [helloWorldForm.ttl](https://github.com/timea-solid/SolidHelloWorlds/blob/master/src/editDataPage/helloWorldForm.ttl) form to the new folder/s. Keep the names.
5. Change the links to the data model and forms over in the [config.js](https://github.com/timea-solid/SolidHelloWorlds/blob/master/src/config.js). Defaults are the KG and form of the project which will not work.
7. Change the link to the appsDisplay.ttl over in the [index.html](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/index.html#L24)
8. Change the link to your KG in the appsDisplay.ttl [L20](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/src/facetedSearchPage/appsDisplay.ttl#L20) and [L42](https://github.com/timea-solid/SolidHelloWorlds/blob/9bcb50f34c1e457427c0c72393f1ca4976005254/src/facetedSearchPage/appsDisplay.ttl#L42)
9. Navigate to your project on your platform and you should see the index.html rendered.

Example: my running demo is simply on two of my Pods. Main code is over at HelloWorld folder on [https://timea.solidcommunity.net/HelloWorld/components/](https://timea.solidcommunity.net/HelloWorld/src/). The data and forms are on another Pod over at: [https://solidweb.me/timeacss/public/SolidHelloWorlds/](https://solidweb.me/timeacss/public/SolidHelloWorlds/). I made sure the SolidHelloWorlds folder has public access because this is where the single point of truth (the KG) is.  

# Attribution

* [Jeff Zucker's solid-ui-components](https://github.com/jeff-zucker/solid-ui-components)
* [Simple CSS](https://simplecss.org/)
* [Comunica - a knowedge graph querying framework for JavaScript](https://github.com/comunica/comunica)
* [Mashlib - Solid compatible library for application-level functionality](https://github.com/solid/mashlib)
* [Solid-ui forms - User interface widgetsand utility for Solid](https://github.com/SolidOS/solid-ui)
