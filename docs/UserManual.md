# Solid Hello Worlds user manual

## Table of contents
- [Table of contents](#table-of-contents)
- [Main page - search interface](#main-page---search-interface)
- [Footer - page navigation](#footer---page-navigation)
- [Second page - edit interface](#second-page---edit-interface)

## Main page - search interface

<p align="center">
  <img width="50%" src="/docs/resources/Search%20frontend.png">
  </br>Figure 1: Search interface on main page
</p>

On the left side of the main page we have the menu with 4 options to select from: Semantic web library, Solid library, Technical use case and Code stack. By clicking on one of the options in the menu, a list of options is revealed. For example, the options for Solid libraries are shown in Figure 2.
For now, you can only select one option at a time from all 4 menu options.
The results are filtered and displayed on the right side. The results are the only examples that contain the one option selected on the left. The results on the right contain links to the repository, where the applications are deployed and running and if available, a link to their tutorial.

<p align="center">
  <img width="25%" src="/docs/resources/Solid%20library%20options.png">
  </br>Figure 2: Options for Solid libraries
</p>

## Footer - page navigation

<p align="center">
  <img width="70%" src="/docs/resources/footer.png">
  </br>Figure 3: Footer of Web App
</p>

At the bottom of the page you will find the footer of the application. The first link (change data or search) will bring you to the second or back to the first page of the application. The second link, source code, is where you can find the code of the application on GitHub.

## Second page - edit interface

When navigating to the second page (from the * change data * link in the footer) we will land on the edit interface as displayed in Figure 4.

<p align="center">
  <img width="53%" src="/docs/resources/edit%20interface%201.png">
  <img width="50%" src="/docs/resources/edit%20interface%202.png">
  <img width="50%" src="/docs/resources/edit%20interface%203.png">
  </br>Figure 4: Edit frontend on second page
</p>

First, you can select from the drop down menu the example project one wants to edit like in Figure 5.  

<p align="center">
  <img width="50%" src="/docs/resources/Select%20example%20application.png">
  </br>Figure 5: Select project menu item
</p>

### Edit

After selecting an option, the information is displayed right under: name of the project, short description, author are all text fields. The project links expect URLs. And the technical stack are multi select fields.
A multi select field is depicted in Figure 6. If one wants to remove an option, you click on the x of the options. One can delete all options by clicking on the rightmost x. When clicking on *Select…* a drop down menu is extended where one can add other options.

<p align="center">
  <img width="40%" src="/docs/resources/MultiSelect.png">
  </br>Figure 6: Multi-select input field
</p>

### Add

In all select input fields there is an options named *Create new*.
When this option is selected a brand new element is created in the background. As soon as the following input field is edited, the new element is auto-saved. (to be exact, as soon as one clicks outside of an input field the data is saved). This specific feature makes it so that there is no more SAVE button necessary anymore (much like your experience of writing in Google Docs), the reason why it is missing entirely. After each edit: adding to an input field, editing a field, deleting text in a field, the data is autosaved for you. However, to see the new options part of the drop down fields one might need to refresh the page entirely.

There are cases when concepts are missing. In that situation we recommend to select the *Create new* option, case in which an input field will appear where one can name the new concept. See an example of creating a new technical stack in Figure 7.

<p align="center">
  <img width="50%" src="/docs/resources//Creating%20a%20new%20code%20stack.png">
  </br>Figure 7: Input field for creating a new generic technical stack
</p>

### Delete

There is, on purpose, no delete option in the edit interface. For now, if one wants to delete a record entirely you can open a Git Issue on this repo. Or, one can completely edit an existing record, basically replacing an existing one. 

For feedback or missing information please consider opening a PR or a git issue in the [GitHub repository](https://github.com/timea-solid/SolidHelloWorlds).
