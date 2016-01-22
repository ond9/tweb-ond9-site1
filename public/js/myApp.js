(function() {
	
	var module = angular.module('myApp', ['chart.js', 'ui.router']);
	 
	module.config(function( $stateProvider, $urlRouterProvider, $locationProvider ) {
		
    console.log('test');
    
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
	
})();