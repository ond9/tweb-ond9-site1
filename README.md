# Project Report

## Administrative information

This project is realized for the TWEB course, this assement is for the TEI2 of TWEB.
The main goal of this project is to learn and applies AngularJS within an web application.

I choose the 2nd subject it handle : Develop and AngularJS web application that retrive result from the GitHub API.

You can test app on Heroku : https://tweb-ond9-site1.herokuapp.com/

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

As pre-requisites we need to have yo and generator-express installed you can retrive them as the following:

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

I have three controllers for the project, the first 'ActiveController' is to handle Navbar style when we change pages. 
The second 'DataController' is for the result page, it contain data that chart JS will render inside a graph.
The third 'commitController' do the real job, that is process user input and send Ajax request to GitHub API to retrive data.

```javascript
module.controller('ActiveController', function($scope, $location) {	  
	  $scope.isActive = function(viewLocation) {
		  return viewLocation === $location.path();
	  };
	});
  
  module.factory('commitData', function() {
		  
		  var nbCommits = {};
      var repoName;
      var repoOwner;
		  return {
				 data:nbCommits        
			};
  });
	  
  module.controller('DataController', function($scope, commitData) {

    $scope.data = [];
    $scope.labels = [];

    for (var key in commitData.data) {
      $scope.labels.push(key);
      $scope.data.push(commitData.data[key]);
    }
    
    $scope.repoOwner = commitData.repoOwner;
    $scope.repoName = commitData.repoName; 
    
  });
    
  module.controller('commitController', function($scope, $http, $state, commitData) {
    $scope.checkResponse = true;
    $scope.sumbitted = false;
    $scope.repoName = commitData.repoName;
    $scope.repoOwner = commitData.repoOwner;
    

    var apiUrlBase = 'https://api.github.com/repos';
  
    $scope.getCommit = function() {
    
    commitData.data = [];
      commitData.repoName = $scope.repoName;
      commitData.repoOwner = $scope.repoOwner;
      
      $http({
            headers: {
              'Authorization': 'token a09331666be7f11ed3ba5a55e99ca4730d87ccdd'
            },
            method: 'GET',
            url: apiUrlBase +'/'+ $scope.repoOwner +'/'+ $scope.repoName +'/stats/contributors'
          }
        ).then(function (res) {
          var data = res.data;
          //here the logic
          data.forEach( function(c) {
            console.log(c.author.login);
            if(commitData.data[c.author.login] === undefined) 
              commitData.data[c.author.login] = c.total;

          });
          
          console.log(commitData.data);
          if(res.status == 200){
            $scope.sumbitted = true;
            $scope.checkResponse = true;
            $state.go('board');
          }

          
        }, function (err) {
          if(err.status == 404)
            $scope.checkResponse = false;
            commitData.repoName = $scope.repoName = "";
            commitData.repoOwner = $scope.repoOwner = "";
            commitData.data = "";
      });
    };
  });
```

Note GitHub request token if we wouldn't be limited on the number of request on their API for a given IP. For that i create a token on my GitHub acount.
To create a token on GitHub follow this link : https://github.com/settings/tokens.

Once we have our token we simply need to send it for each request within the Authorization header of http GET request : 
```
'Authorization: token <MYTOKEN>'
```

That's all :)

#### Views and jade

I have nothing particular to say about jade but i include my angular app and the 'ActiveController' controller inside the navbar.jade file

```jade
nav.navbar.navbar-default(ng-app='myApp',ng-controller='ActiveController')
```

and 'commitController' inside the commit.jade file wich represend the view to get repository commit info

```jade
div(ng-controller='commitController')
```

and 'DataController' inside the board.jade file wich is the graphical result of number of commit by contributors.

```jade
div(ng-controller='DataController')
```

#### ChartJS

To build a chart with ChartJS and Angular you can refer to this link : http://jtblin.github.io/angular-chart.js/

```jade
canvas(id="doughnut",class="chart chart-doughnut", chart-data="data", chart-labels="labels", chart-legend="true")
```

## Conclusion

This project allowed me to strengthen my knowlege with angularjs and others tools that we learn during the course.

Link to another assesment made during the course : https://tweb-realtime-angularjs-ond9.herokuapp.com/




