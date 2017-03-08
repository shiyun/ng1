angular.module('myApp.mainPage.service', [])
	.factory('mainService', ['$http', '$rootScope', function($http, $rootScope){
		var mainFun = {};

		mainFun.test = function() {
			alert('test factory');
		};

		return mainFun;
	}]);