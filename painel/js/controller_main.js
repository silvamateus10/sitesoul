var app = angular.module('SOUL', []);
app.controller('Main', function($scope,$http,$compile) {


	
	$scope.login = [];	
	

	$scope.send_logar = function() { 
		if($scope.login.email == null  && $scope.login.senha == null ){		
			swal({
				type: 'error',
				title: 'Oops...',
				text: "Campos devem ser preenchidos!" 
			})
			return

		}else{		
			if($scope.login.email == 'profissional@soul' && $scope.login.senha == 'admin'){			

				window.location.href = "../soulprofissional/pages/painel.html";
				

			}else if($scope.login.email == 'cliente@soul' && $scope.login.senha == 'cliente'){			
				
				window.location.href = "../soulcliente/pages/painel.html";
				

			}else{
				swal({
					type: 'error',
					title: 'Oops...',
					text: "Senha ou E-mail incorretos!" 
				})
				return
				}//fim IF igual	
			}		
	}//Fim da função send_senha()
	



	
	

// identar "alt+shift+d"



});