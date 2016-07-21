(function() {

	'use strict';

    angular
        .module('LetsVAN.perfil',[])
        .controller('PerfilCtrl', PerfilCtrl);


        PerfilCtrl.$inject = ['$state', 'perfil', 'currentAuth', 'md5'];

        function PerfilCtrl( $state,perfil,currentAuth,md5 ) {
        	let vm =  this;

           /*Global variable*/            
            vm.submitted = false;
            vm.profile = perfil;

            /*Function*/
            vm.interacted = interacted;
            vm.atualizarPerfil = atualizarPerfil;

            function atualizarPerfil() {
                vm.profile.emailHash = md5.createHash(currentAuth.email);
                vm.profile.$save().then(function(data) {
                    console.log(data);
                    $state.go('dashboard');
                });
            }


            function interacted( field ){

                return vm.submitted || field.$dirty;
            }
        }
})();