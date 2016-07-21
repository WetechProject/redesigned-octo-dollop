(function() {
    angular
        .module('LetsVAN.veiculos')
        .controller('VeiculosEditCtrl', VeiculosEditCtrl);

        VeiculosEditCtrl.$inject = ['currentAuth', 'Veiculos', '$state', 'perfilVeiculo', '$stateParams'];

        function VeiculosEditCtrl( currentAuth,Veiculos,$state,perfilVeiculo,$stateParams ) {

        	let vm = this;       	

        	 /*Function*/
        	 vm.interacted = interacted;
        	 vm.save = update;

           /*Global variable*/
             const UID = currentAuth.uid           
        	 const id = $stateParams.veiculoID;
           	 vm.isShowing = !!id;
           	 vm.customer = {};
           	 vm.btn = {
           	 	 'name': 'Alterar'    
           	 }

           	  function update(){
           	 	    console.log( 'Data were successfully sent to the server! EDIT' );
                    console.log( JSON.stringify( vm.customer, null, 2 ));
                    Veiculos.updateVeiculo( UID,id,vm.customer ).then(()=>{
                    	$state.go('veiculos');
                    },(error)=>{
                    	alert('Erro: ', error)
                    });
           	 }


           	 if (vm.isShowing) {
            	 vm.customer = perfilVeiculo;           	
		     } 

		     function interacted( field ){                
        		return vm.submitted || field.$dirty;
        	}
        }
})();