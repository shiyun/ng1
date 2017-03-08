angular.module('myApp.mainPage', ['ui.router'])
    .controller('MainPageCtrl', ['mainService', '$scope', "$cookieStore", "$sce", "localStorageService", "$state","$rootScope",
        function(mainService, $scope, $cookieStore, $sce, localStorageService,$state, $rootScope) {
            $('.btn-test').addClass('hidden');
            $('body').css('background', 'red')
            $scope.test = function(){
                alert(222)
            }
            
    }]);