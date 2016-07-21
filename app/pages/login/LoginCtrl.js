(function() {

	'use strict';

    angular
        .module('LetsVAN.login')
        .controller('LoginCtrl', LoginCtrl);

        LoginCtrl.$inject = ['$state','Auth'];

        function LoginCtrl($state,Auth) {
        	
        	let vm = this;
        	//Function
        	vm.login = login;
        	vm.criarConta = criarConta;
            vm.interacted = interacted;

        	//Global variable
            vm.submitted = false;
            vm.formLogin = {};        	

        	 function login() {
        		console.log( JSON.stringify( vm.formLogin, null, 2 ));
                Auth.$signInWithEmailAndPassword(vm.formLogin.email, vm.formLogin.senha).then(function(authData) {
                        console.log('Logged in as: ', authData.uid);
                        $state.go('dashboard');
                    }).catch(function(error) {
                        console.log(error);
                });
        	}

        	function criarConta() {
        		$state.go('criarConta');	
        	}

            function interacted( field ){
                return vm.submitted || field.$dirty;
            };
        }

})();