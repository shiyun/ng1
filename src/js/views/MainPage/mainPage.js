angular.module('myApp.mainPage', ['ui.router'])
    .controller('MainPageCtrl', ['mainService', '$scope', "$cookieStore", "$sce", "localStorageService", "$state","$rootScope",
        function(mainService, $scope, $cookieStore, $sce, localStorageService,$state, $rootScope) {
            $('.btn-test').on('click', function(){
                $('body').css('background', 'red')
            });
            $scope.test = function(){
                alert(222)
            }
            
    }]);