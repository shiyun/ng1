angular.module('myApp.Login', ['ui.router'])
    .controller('LoginCtrl', ['mainService', '$scope', "$cookieStore", "$sce", "localStorageService", "$state","$rootScope",
        function(mainService, $scope, $cookieStore, $sce, localStorageService, $state, $rootScope) {        	
        	$scope.username = ''; 
        	$scope.password = '';
        	$scope.verifyCode = '';

        	mainService.getVerifyCode().then(function(res){
				if(!res.verifyImg){
					alert(res)
				}else{
					$scope.imgSrc = 'data:image/jpg;base64,' + res.verifyImg;
					$scope.verifySn = res.verifySn;
				}
			});

        	var refresh = function(){
				mainService.getVerifyCode().then(function(res){
					if(!res.verifyImg){
						alert(res)
					}else{
						$scope.imgSrc = 'data:image/jpg;base64,' + res.verifyImg;
						$scope.verifySn = res.verifySn;
					}
				});
			};
			$scope.refresh = refresh;

			$scope.login = function(){				
				if(!/[a-zA-Z]{4}/.test($scope.verifyCode)){
					alert('验证码格式不正确');
					refresh();
					return false;
				}else{
					mainService.verificationCode($scope.verifyCode, $scope.verifySn).then(function(res){
						if(res){
							mainService.login($scope.username, $scope.password).then(function(res){
								console.log(res)
								if(!res){
									alert('登录失败')
								}else{
									alert('登录成功');									
									location.href = '/ng';
								}
							});
						}else{
							refresh();
							alert('验证码失效或不正确')
						}
					})
				}
			};

    	}
    ]);