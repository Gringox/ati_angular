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
		.when('/todos', {
			templateUrl: 'pages/todos.html',
			controller: 'todosController'
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

		// POST Example
		// $http.post(host+'/login', {
		// 	'email': that.user.email,
		// 	'password': that.user.password
		// })
    // .success(function(data) {
    //   localStorageService.set('login_token', data.login_token);
    //   localStorageService.set('id', data.id);
    // });

		localStorageService.set('login_token', '123456');
    localStorageService.set('id', '1');

	};

	$scope.signOut = function() {

		// DELETE Example
		// $http.delete(host+'/login/'+localStorageService.get('login_token'))
		// .success(function(data) {
		// 	    console.log(data);
		// });

		localStorageService.remove("login_token");
		localStorageService.remove("id");

		$location.path("/");
	};

	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

atiApp.controller('todosController', function($scope, $http, localStorageService) {

	$http.get(host+'/todos')
	.success(function(data){
		console.log(data);
		$scope.todos = data;
	});

	$scope.message = "Hi I'm a Package page";
});

atiApp.controller('userController', function($scope, $http, localStorageService) {

	$scope.user = {name: 'Pedro', lastname: 'Valdivieso'};

	$scope.message = 'Develop by somebody';
});
