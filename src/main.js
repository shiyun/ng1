var myApp = angular.module('myApp', [
		'ui.router',
		'ngCookies',
		'LocalStorageModule',
		'myApp.Login',
		'myApp.mainPage',
		'myApp.mainPage.service',
		'myApp.directive.headerTop'
	]);

myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		//$httpProvider.interceptors.push('mainInterceptor');

		$urlRouterProvider.when('', '/ng/login');

		$stateProvider
			.state("Login", {
	            url: "/ng/login",
	            templateUrl: "/js/views/Login/Login.html",
	            controller: 'LoginCtrl'
	        })
	        .state("MainPage", {
	            url: "/ng",
	            templateUrl: "/js/views/MainPage/MainPage.html",
	            controller: 'MainPageCtrl'
	        })
			.state("PageTab", {
	            url: "/ng/PageTab",
	            templateUrl: "/js/views/PageTab/PageTab.html"
	        })
	        .state("PageTab.Page1", {
	            url:"/Page1",
	            templateUrl: "/js/views/Page1/Page1.html"
	        })
	        .state("PageTab.Page2", {
	            url:"/Page2",
	            templateUrl: "/js/views/Page2/Page2.html"
	        })
	        .state("PageTab.Page3", {
	            url:"/Page3",
	            templateUrl: "/js/views/Page3/Page3.html"
	        });

	    $locationProvider.html5Mode(true).hashPrefix('!');
    	$urlRouterProvider.otherwise('/ng/login');
	})
	.run([
		'$rootScope', '$state', '$stateParams', '$cookieStore', 'mainService', '$window', 
		function($rootScope, $state, $stateParams, $cookieStore, mainService, $window){
			$rootScope.a = 'test';
			$rootScope.$on('login', function(event, data){
                alert(3)
            });
		}
	])
