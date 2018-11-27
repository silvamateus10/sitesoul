var app = angular.module('SOUL', []);
app.controller('Cliente', function($scope,$http,$compile) {

$scope.teste = "HELLO";

	$scope.cliente = [];
	$scope.find = [];	


	$scope.find_agenda = function() {		
		console.log("find_agenda");
		$http({
			method: "POST",
			url: '../../soulprofissional/js/agenda_retorno.json',				
		}).then(function successCallback(response) {
			$scope.find.agenda = response.data;
			console.log($scope.find.agenda)

		}, function erroCallback(response) {
			console.log("find_agenda  erro");
		});//FIM POST

		console.log("find_agenda fim");
	}//Fim da função send_cartao()

	$scope.find_agenda();
	
	$scope.page = function(page){
		console.log(page);
		
		
		$http({
			method: "GET",
			url: page+'.html'
		}).then(function successCallback(response) {
			setTimeout(function() {
				var d = angular.element(document.getElementById("page-wrapper")),
				btn = $compile(response.data)($scope);
				document.getElementById("page-wrapper").innerHTML="";
				d.append(btn);
				$scope.$apply();
				
			}, 20);

		}, function erroCallback(response) {
			//tratar erros
		});
	}//inserir page
	
	$scope.send_senha = function() { 
		if($scope.cliente.senha != null  && $scope.cliente.cSenha != null ){		
			if($scope.cliente.senha != $scope.cliente.cSenha){
				swal({
					type: 'error',
					title: 'Oops...',
					text: "Senhas diferentes !" 
				})
				return
		}//fim IF igual	
		$http({
			method: "PUT",
			url: 'soul-api.us-east-1.elasticbeanstalk.com/soul/account',
			data: {
				senha_nova : $scope.cliente.senha, 
				senha_antiga : $scope.cliente.aSenha
			}

		}).then(function successCallback(response) {
			
		}, function erroCallback(response) {
			swal(
				'Sucesso!',
				'Senha Alterada!',
				'success'
				)
		});//FIM POST
	}else{
		swal({
			type: 'error',
			title: 'Oops...',
			text: "Campos devem ser preenchidos!" 
		})
		return
	}		
	}//Fim da função send_senha()
	
	$scope.send_cadastro = function() {
		if($scope.cliente.nome != null && $scope.cliente.cpf != null && $scope.cliente.email != null
			&& $scope.cliente.rua != null && $scope.cliente.numero != null && $scope.cliente.bairro != null
			&& $scope.cliente.cidade != null && $scope.cliente.uf != null && $scope.cliente.cep != null){
			swal(
						'Sucesso!',
						'Dados Alterados!',
						'success'
					)			
			//$http({
			//	method: "PUT",
			//	url: 'soul-api.us-east-1.elasticbeanstalk.com/soul/users',
			//	data: {
			//		id : $scope.cliente.cod,
			//		nome : $scope.cliente.nome,
			//		cpf : $scope.cliente.cpf,
			//		email : $scope.cliente.email,
			//		rua : $scope.cliente.rua,
			//		numero : $scope.cliente.numero,
			//		complemento : $scope.cliente.complemento,
			//		bairro : $scope.cliente.bairro,
			//		cidade : $scope.cliente.cidade,
			//		uf : $scope.cliente.uf,
			//		zip_code: $scope.cliente.cep,
			//		referencia: $scope.cliente.referencia}
			//	}).then(function successCallback(response) {
			//		

			//	}, function erroCallback(response) {

			//});//FIM POST
			}else{
				swal({
					type: 'error',
					title: 'Oops...',
					text: "Campos obrigatórios devem ser preenchidos!" 
				})
				return
		}//Fim IF

	}//Fim da função send_cadastro()

	$scope.send_new = function() {		
		$http({
			method: "POST",
			url: 'soul-api.us-east-1.elasticbeanstalk.com/soul/users',
			data: {
				nome : $scope.cliente.nome,
				cpf : $scope.cliente.cpf,
				email : $scope.cliente.email,
				rua : $scope.cliente.rua,
				numero : $scope.cliente.numero,
				complemento : $scope.cliente.complemento,
				bairro : $scope.cliente.bairro,
				cidade : $scope.cliente.cidade,
				uf : $scope.cliente.uf,
				zip_code: $scope.cliente.cep,
				referencia: $scope.cliente.referencia,
				senha: $scope.cliente.senha
			}
		}).then(function successCallback(response) {

		}, function erroCallback(response) {

			});//FIM POST			

	}//Fim da função send_cadastro()

	
	
	$scope.send_cartao = function() {
		if($scope.cartao.numero != null && $scope.cartao.nome  != null && $scope.cartao.validade != null
			&& $scope.cartao.ccv != null){
			swal(
						'Sucesso!',
						'Cartão Inserido com Sucesso!',
						'success'
					)
		//	$http({
		//		method: "POST",
		//		url: 'teste.php',
		//		data: {
		//			numero : $scope.cartao.numero,
		//			nome : $scope.cartao.nome,
		//			validade : $scope.cartao.validade,
		//			ccv : $scope.cartao.ccv
		//		}
		//	}).then(function successCallback(response) {
		//		
		//	}, function erroCallback(response) {
		//		
		//	});//FIM POST		
		}else{
			swal({
				type: 'error',
				title: 'Oops...',
				text: "Os campos devem ser preenchidos!" 
			})
			return
		}//Fim IF
	}//Fim da função send_cartao()

	$scope.send_logar = function() {
		if($scope.senha != null && $scope.email != null){
			$http({
				method: "POST",
				url: 'soul-api.us-east-1.elasticbeanstalk.com/soul/auth',
				data: {
					email : $scope.email,
					senha : $scope.senha
				}
			}).then(function successCallback(response) {
				
				
			}, function erroCallback(response) {
				
			});//FIM POST		
		}else{
			swal({
				type: 'error',
				title: 'Oops...',
				text: "Os campos devem ser preenchidos!" 
			})
			return
		}//Fim IF
	}//Fim da função send_cartao()

	

	$scope.find_servico = function() {
		if($scope.find.servico != null){
			$http({
				method: "POST",
				url: '../js/retorno.json',
				data: {
					servico : $scope.find.servico
				}
			}).then(function successCallback(response) {
				$scope.find.table = response.data;

				
			}, function erroCallback(response) {
				
			});//FIM POST		
		}else{
			swal({
				type: 'error',
				title: 'Oops...',
				text: "Selecione um serviço!" 
			})
			return
		}//Fim IF
	}//Fim da função send_cartao()

	$scope.find_top = function() {		
		console.log("find_top");
		$http({
			method: "POST",
			url: '../js/top_prestador.json',				
		}).then(function successCallback(response) {
			$scope.find.top = response.data;


		}, function erroCallback(response) {

		});//FIM POST

		$http({
			method: "POST",
			url: '../js/table_historico.json',				
		}).then(function successCallback(response) {
			$scope.find.agendamento = response.data;


		}, function erroCallback(response) {

		});//FIM POST				
	}//Fim da função send_cartao()

	$scope.find_top();



	
	

// identar "alt+shift+d"



});