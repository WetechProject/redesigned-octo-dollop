(function(){

	'use strict';

	angular
        .module('LetsVAN.login')
        .controller('CriarConta', CriarConta);

        CriarConta.$inject = ['$state', 'Auth', '$timeout'];

        function CriarConta($state, Auth, $timeout) {

        	let vm = this;

        	//Global variable
        	vm.submitted = false;
        	vm.formCreate = {
        		nome: '',
        		email: '',
        		senha: ''
        	};        	

        	//Function
        	vm.interacted = interacted;
        	vm.criarConta = criarConta;
        	vm.entrarSistema = entrarSistema;


        	function criarConta() {
		        Auth.$createUserWithEmailAndPassword(vm.formCreate.email, vm.formCreate.senha)
		        	.then(function(userData) {
		        		console.log('User ' + userData.uid + ' created successfully.');
		        		 vm.entrarSistema();
		     		 }).catch(function(error) {			        	
		     		 	console.log(error);
		        		//authCtrl.error = error;
		      	});
        	};

        	function entrarSistema() {
        		console.log(vm.formCreate.email );
        		console.log(vm.formCreate.senha );
        		Auth.$signInWithEmailAndPassword(vm.formCreate.email, vm.formCreate.senha).then(function(authData) {
			        	console.log('Logged in as: ', authData.uid);
			        	$state.go('dashboard');
			      	}).catch(function(error) {
			        	console.log(error);
      			});
        	};

        	function interacted( field ){
        		return vm.submitted || field.$dirty;
        	};

        }

})();