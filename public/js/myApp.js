(function() {
	
	 var module = angular.module('myApp', ['ui.router']);
	 
	
	module.controller('ActiveController', function($scope, $location) {	  
	  $scope.isActive = function(viewLocation) {
		  return viewLocation === $location.path();
	  };
	});
	
	
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
		
		$stateProvider.state('audience', {
			templateUrl: '/template/audience.html',
			url: '/audience'
		});
		
		$stateProvider.state('board', {
			templateUrl: '/template/board.html',
			url: '/board'
		});
		
		$stateProvider.state('debug', {
			templateUrl: '/template/debug.html',
			url: '/debug'
		});
		
	});
	
	
})();