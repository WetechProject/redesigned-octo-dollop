(function(){


	'use strict';

	   angular
        .module('LetsVAN.motoristas')
        .controller('MotoriastasEditCtrl', MotoriastasEditCtrl);

        MotoriastasEditCtrl.$inject = ['currentAuth', 'Motoristas', '$state', 'perfilMotorista', '$stateParams'];

        function MotoriastasEditCtrl( currentAuth,Motoristas,$state,perfilMotorista,$stateParams ){

        	let vm = this;       	

        	 /*Function*/
        	 vm.interacted = interacted;
        	 vm.save = update;

           /*Global variable*/
             const UID = currentAuth.uid           
        	 const id = $stateParams.motoristaID;
           	 vm.isShowing = !!id;
           	 vm.customer = {};
           	 vm.btn = {
           	 	 'name': 'Alterar'    
           	 }

           	  function update(){
           	 	    console.log( 'Data were successfully sent to the server! EDIT' );
                    console.log( JSON.stringify( vm.customer, null, 2 ));
                    Motoristas.updateMotorista( UID,id,vm.customer ).then(()=>{
                    	$state.go('motoristas');
                    },(error)=>{
                    	alert('Erro: ', error)
                    });
           	 }


           	 if (vm.isShowing) {
            	 vm.customer = perfilMotorista;           	
		     } 

		     function interacted( field ){                
        		return vm.submitted || field.$dirty;
        	}
            

        }

})()