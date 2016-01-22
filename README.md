# Project Report

## Administrative information

This project is realized for the TWEB course, this assement is for the TEI2 of TWEB.
The main goal of this project is to learn and applies AngularJS within an web application.

I choose the 2nd subject it handle : Develop and AngularJS web application that retrive result from the GitHub API.

## Specification

I use GitHub API to retrive info about commit for a given GitHub project, process result and display them graphically.
The project use AngularJs for the main client application, UIrouter for the navigation between pages, ChartJS to display result.
On the server side it use express template, for the bone of the project, it use Template engine Jade.
I have use scaffolding tools suite Yeoman, Bower, and grunt.
The project must be deployed on Heroku.

## Implementation

### creation of the project

Of course i have use yeoman express template as we can see in the TWEB course.

```
yo express
```

Of course as pre-requisites we need to have yo and generator-express installed you can retrive them as the following:

```
npm install -g yo
npm install -g generator-express
```
And of course all this tools require node JS.

### heroku deployment 

inside the config/config.js file we have to specify the Heroku port because of course we can't choose for heroku the default port and we also need to specify the MangoDB url as the following 

```javascript

var port = process.env.PORT || 7070;


var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';
  
  
 ```
 
 So if the var environnement process.env.x is defined like when we deploy it on heroku it will be 
automatically set by Heroku otherwise it will be set to our config.

note that i don't use Database on this project.

### Web application description

Inside the Angular Application we need to use dependencies, Chart Js and UIrouter so we have to specify that :

```javascript
var module = angular.module('myApp', ['chart.js', 'ui.router']);
```


