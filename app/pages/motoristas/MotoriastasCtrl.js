(function() {
	
	'use strict';

    angular
        .module('LetsVAN.motoristas')
        .controller('MotoriastasCtrl', MotoriastasCtrl);

        MotoriastasCtrl.$inject = ['$state','viaCEP', 'Motoristas', 'currentAuth'];

        function MotoriastasCtrl( $state,viaCEP,Motoristas,currentAuth ) {
        	let vm = this;

            /*Function*/
        	vm.save = save;
            vm.deleteMotorista = deleteMotorista;
            vm.interacted = interacted;

           /*Global variable*/
            const UID = currentAuth.uid
            vm.customer = {};
        	vm.submitted = false;
            vm.motoristas = Motoristas.all( UID );
            vm.btn = {
                 'name': 'Salvar'
             }

        	function save() {                
                Motoristas.addMotorista( UID,vm.customer ).then( resposta => {
                    vm.submitted = true;
                    console.log( 'Data were successfully sent to the server!' );
                    console.log( JSON.stringify( vm.customer, null, 2 ));                  
                    vm.customer = {};
                    $state.go('motoristas')
                })        		
        	}

             function deleteMotorista( id ) {
                Motoristas.deleteMotorista( id,UID ).then(()=>{
                    alert('Deletado');
                }, (error)=>{
                    alert('Erro ao deletar');
                })
             }

        	function interacted( field ){                
        		return vm.submitted || field.$dirty;
        	}           
        }
})();