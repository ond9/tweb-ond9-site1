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

### Creation of the project

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

### Heroku deployment 

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

#### Dependencies
Inside the Angular Application we need to use dependencies, Chart Js and UIrouter so we have to specify that :

```javascript
var module = angular.module('myApp', ['chart.js', 'ui.router']);
```

#### routing and UIrouter
For ui.router we have to config the routing parts as following : 

```javascript
module.config(function( $stateProvider, $urlRouterProvider, $locationProvider ) {
    
		$urlRouterProvider.when('', '/');
		
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
		
		$stateProvider.state('home', {
			templateUrl: '/template/home.html',
			url: '/'
		});
		
		$stateProvider.state('commit', {
			templateUrl: '/template/commit.html',
			url: '/commit'
		});
		
		$stateProvider.state('board', {
			templateUrl: '/template/board.html',
			url: '/board'
		});
		
	});
```
Note that i use HTML5 mode so we can access url as usual http://myApp/page1, http://myApp/page2, http://myApp/page3 and so on.

It raises problems when we refresh current page inside à specific view, because to refresh a specific page we need to pass through the base url, because is that page who laod any others.
To fixe that we add a route inside the app/controllers/home.js :

```javascript

// to match jade view 
router.get('/template/:name.html', function(req, res) {
	console.log(req.params.name);
	res.render('template/' + req.params.name);
})

// because of html 5 mode refresh certain page don't load index and fail 

router.get('*', function(req, res){
    res.render('index', {
      title: 'TWEB-ond9-Site1',
    });
});
```

#### Angular Controllers







