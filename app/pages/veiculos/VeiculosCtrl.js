(function() {
    angular
        .module('LetsVAN.veiculos')
        .controller('VeiculosCtrl', VeiculosCtrl);

        VeiculosCtrl.$inject = ['$state', 'Veiculos','currentAuth'];

        function VeiculosCtrl( $state, Veiculos, currentAuth ) {

        	let vm = this;

        	  /*Function*/
        	vm.save = save;
            vm.deleteVeiculo = deleteVeiculo;
            vm.interacted = interacted;

           /*Global variable*/
        	const UID = currentAuth.uid
            vm.customer = {};
        	vm.submitted = false;
            vm.veiculos = Veiculos.all( UID );
            vm.btn = {
                 'name': 'Salvar'
             }


             function save() {                
                Veiculos.addVeiculo( UID,vm.customer ).then( resposta => {
                    vm.submitted = true;
                    console.log( 'Data were successfully sent to the server!' );
                    console.log( JSON.stringify( vm.customer, null, 2 ));                  
                    vm.customer = {};
                    $state.go('veiculos')
                })        		
        	};

        	function deleteVeiculo( id ) {
                Veiculos.deleteVeiculo( id,UID ).then(()=>{
                    alert('Deletado');
                }, (error)=>{
                    alert('Erro ao deletar');
                })
             };

        	function interacted( field ){                
        		return vm.submitted || field.$dirty;
        	};
        }
})();