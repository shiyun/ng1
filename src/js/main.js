var myApp = angular.module('myApp', [
		'ui.router',
		'ngCookies',
		'LocalStorageModule',
		'myApp.mainPage',
		'myApp.mainPage.service'
	]);

myApp.config(function($stateProvider, $urlRouterProvider){
		//$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		//$httpProvider.interceptors.push('mainInterceptor');

		$urlRouterProvider.when('', '/PageTab');

		$stateProvider

			.state("PageTab", {
	            url: "/PageTab",
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
		}
	)
	.run([
		'$rootScope', '$state', '$stateParams', '$cookieStore', 'mainService', '$window', 
		function($rootScope, $state, $stateParams, $cookieStore, mainService, $window){
			$rootScope.a = 'test';
			$rootScope.$on('login', function(event, data){
                alert(3)
            });
		}
	])
