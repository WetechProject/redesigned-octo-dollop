(function() {

	'use strict';

    angular
        .module('LetsVAN.perfil',[])
        .controller('PerfilCtrl', PerfilCtrl);


        PerfilCtrl.$inject = ['$state', 'perfil', 'currentAuth', 'md5', 'toastr','ngNotify'];

        function PerfilCtrl( $state,perfil,currentAuth,md5,toastr,ngNotify ) {
        	let vm =  this;

           /*Global variable*/            
            vm.submitted = false;
            vm.profile = perfil;

            /*Function*/
            vm.interacted = interacted;
            vm.atualizarPerfil = atualizarPerfil;

            function atualizarPerfil() {
                vm.profile.emailHash = md5.createHash(currentAuth.email);
                vm.profile.$save().then((data)=> {
                    toastr.success('Deletado com sucesso!!', 'Perfil');                    
                    $state.go('dashboard');
                }, (error)=>{
                     ngNotify.set('Error: ' + error, {
                            position: 'top',
                            sticky: false,
                            type: 'error',
                            theme: 'pastel',
                            duration:3000,
                            button: true
                        });
                });
            }


            function interacted( field ){

                return vm.submitted || field.$dirty;
            }
        }
})();