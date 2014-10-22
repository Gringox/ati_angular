	var host = 'http://testserver.com:3000'

	// create the module and name it atiApp
	var atiApp = angular.module('atiApp', ['ngRoute', 'LocalStorageModule']);

	// configure our routes
	atiApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl: 'pages/home.html',
				controller: 'mainController'
			})

			// route for the package page
			.when('/package', {
				templateUrl: 'pages/package.html',
				controller: 'packageController'
			})

			// route for the user page
			.when('/user', {
				templateUrl: 'pages/user.html',
				controller: 'userController'
			})
	});

// create the controller and inject Angular's $scope
atiApp.controller('mainController', function($scope, $http, $location, localStorageService) {

	$scope.userIsLogged = function() {
		return (localStorageService.get('login_token'))? true : false;
	}

	$scope.submit = function() {
		var that = this;
		this.error = false;

		$http.post(host+'/login', {
			'email': that.user.email,
			'password': that.user.password
		})
    .success(function(data) {
      localStorageService.set('login_token', data.login_token);
      localStorageService.set('id', data.id);
    });

    this.user.email = '';
    this.user.password = '';
	};

	$scope.signOut = function() {
		$http.delete(host+'/login/'+localStorageService.get('login_token'))
		.success(function(data) {
			    console.log(data);
		});

		localStorageService.remove("login_token");
		localStorageService.remove("id");

		$location.path("/");
	};

	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

atiApp.controller('packageController', function($scope, $http, localStorageService) {

	$http.get(host+'/users/'+localStorageService.get('id'), {
		headers: {
			'Token': localStorageService.get('login_token')
		}
	})
	.success(function(data){
		$scope.packages = data.package;
	});

	$scope.message = "Hi I'm a Package page";
});

atiApp.controller('userController', function($scope, $http, localStorageService) {

	$http.get(host+'/users/'+localStorageService.get('id'), {
		headers: {
			'Token': localStorageService.get('login_token')
		}
	})
	.success(function(data){
		$scope.user = data;
	});

	$scope.message = 'Develop by somebody';
});