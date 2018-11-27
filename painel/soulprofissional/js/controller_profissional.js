var app = angular.module('SOUL', []);
app.controller('Profissional', function($scope,$http,$compile) {



	

	$scope.profissional = [];
	$scope.servico = [];
	$scope.dias = [];
	$scope.financeiro = [];
	$scope.find = [];	
	

	$scope.page = function(page){
		console.log(page);
		
		
		$http({
			method: "POST",
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

		$scope.send_cadastro = function() {
		if($scope.profissional.nome != null && $scope.profissional.cpf != null && $scope.profissional.email != null
			&& $scope.profissional.rua != null && $scope.profissional.numero != null && $scope.profissional.cep != null){			
			$http({
				method: "POST",
				url: 'soul-api.us-east-1.elasticbeanstalk.com/soul/users',
				data: {nome : $scope.profissional.nome,
					cpf : $scope.profissional.cpf,
					email : $scope.profissional.email,
					rua : $scope.profissional.rua,
					numero : $scope.profissional.numero,
					complemento : $scope.profissional.complemento,
					zip_code: $scope.profissional.cep,
					referencia: $scope.profissional.referencia}
				}).then(function successCallback(response) {

				}, function erroCallback(response) {

			});//FIM POST
			}else{
				swal({
					type: 'error',
					title: 'Oops...',
					text: "Campos obrigatórios devem ser preenchidos!" 
				})
				return
		}//Fim IF

	}//Fim da função send_cadastro()
	
	$scope.send_senha = function() {
	if($scope.profissional.senha != null && $scope.profissional.cSenha != null){		
		if($scope.profissional.senha != $scope.profissional.cSenha){
			swal({
				type: 'error',
				title: 'Oops...',
				text: "Senhas diferentes !" 
			})
		return
		}//fim IF igual	
		$http({
			method: "POST",
			url: 'teste.php',
			data: {senha : $scope.profissional.senha, asenha : $scope.profissional.aSenha}
		}).then(function successCallback(response) {
			
		}, function erroCallback(response) {
			
		});
		}else{
			swal({
					type: 'error',
					title: 'Oops...',
					text: "Campos devem ser preenchidos!" 
				})
			return
		}		
	}//Fim da função
	
	
	$scope.send_servico = function() {
	if($scope.servico.nome != null && $scope.servico.preco != null && $scope.servico.descricao != null){				
		$http({
			method: "POST",
			url: 'teste.php',
			data: { 
				servicos : [
							{
								nome: $scope.servico.nome, 
								preco: $scope.servico.preco , 
								descricao: $scope.servico.descricao,
								servico.intervalo
							}
							],
				dias : [
						{
							domingo : $scope.servico.dias.domingo,
							segunda : $scope.servico.dias.segunda,
							terca 	: $scope.servico.dias.terca,
							quarta	: $scope.servico.dias.quarta,
							quinta 	: $scope.servico.dias.quinta,
							sexta 	: $scope.servico.dias.sexta,
							sabado 	: $scope.servico.dias.sabado
						}
						],
				periodo : [
							{
								manha 		: $scope.servico.periodo.manha,
								tarde 		: $scope.servico.periodo.tarde,
								noite 		: $scope.servico.periodo.noite,
								madrugada 	: $scope.servico.periodo.madrugada
							}
							]					

			}
		}).then(function successCallback(response) {
			
		}, function erroCallback(response) {
			
		});
		}else{
			swal({
					type: 'error',
					title: 'Oops...',
					text: "Campos obrigatórios devem ser preenchidos!" 
				})
			return
		}		
	}//Fim da função

	$scope.send_financeiro = function() {
		if($scope.financeiro.banco != null || $scope.financeiro.agencia != null || $scope.financeiro.conta){
			swal(
					'Sucesso!',
					'Banco atualizado com Sucesso!',
					'success'
				)						
			//$http({
			//	method: "POST",
			//	url: 'teste.php',
			//	data: {
			//			banco: $scope.financeiro.banco,
			//			agencia : $scope.financeiro.agencia,
			//			conta : $scope.financeiro.conta
			//			}
			//	}).then(function successCallback(response) {

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

	}//Fim da função send_financeiro()


	$scope.find_historico = function() {		
		console.log("find_historico");
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
			$scope.find.agendados = response.data;


		}, function erroCallback(response) {

		});//FIM POST				
	}//Fim da função send_cartao()

	$scope.find_historico();

		$scope.find_agenda = function() {		
		console.log("find_agenda");
		$http({
			method: "POST",
			url: '../js/agenda_retorno.json',				
		}).then(function successCallback(response) {
			$scope.find.agenda = response.data;


		}, function erroCallback(response) {

		});//FIM POST

			
	}//Fim da função send_cartao()

	$scope.find_agenda();






});