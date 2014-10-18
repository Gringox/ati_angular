	// create the module and name it atiApp
	var atiApp = angular.module('atiApp', ['ngRoute']);

	// configure our routes
	atiApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the package page
			.when('/package', {
				templateUrl : 'pages/package.html',
				controller  : 'packageController'
			})

			// route for the user page
			.when('/user', {
				templateUrl : 'pages/user.html',
				controller  : 'userController'
			})
	});

// create the controller and inject Angular's $scope
atiApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

atiApp.controller('packageController', function($scope) {
	$scope.message = "Hi I'm a Package page";
});

atiApp.controller('userController', function($scope) {
	$scope.message = 'Develop by somebody';
});