(function() {
	
	'use strict';

    angular
        .module('LetsVAN.motoristas')
        .controller('MotoriastasCtrl', MotoriastasCtrl);

        MotoriastasCtrl.$inject = ['$scope','$state','viaCEP', 'Motoristas', 'currentAuth', 'ngNotify', 'toastr'];

        function MotoriastasCtrl( $scope,$state,viaCEP,Motoristas,currentAuth, ngNotify,toastr ) {
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

            $scope.htmlSweet='<a sweetalert sweet-options="{{sweet.option}}" sweet-confirm-option="{{sweet.confirm}}" sweet-cancel-option="{{sweet.cancel}}"  name="login-submit" sweet-on-cancel="checkCancel()" sweet-on-confirm="checkConfirm()" style="background-color:blue"  class="btn" >Try It</a>'
            $scope.htmlSweetOption='<a sweetalert sweet-options='
            $scope.htmlSweetConfirm=' sweet-confirm-options='
            $scope.htmlSweetCancel=' sweet-cancel-options='
            $scope.htmlSweetOnConfirmCancel=' sweet-on-confirm="checkConfirm()" sweet-on-cancel="checkCancel()">Try It</a>'
            $scope.sweet = {};
            $scope.sweet.option = {
                title: "Você tem certeza?",
                text: "Você não será capaz de recuperar esse Motorista!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, excluí-lo!",
                cancelButtonText: "Não cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            }
            $scope.sweet.confirm = {
                title: 'Excluir!',
                text: 'O motorista foi excluido!',
                type: 'success'
            };

            $scope.sweet.cancel = {
                title: 'Cancelado!',
                text: 'A exclusão foi cancelada!',
                type: 'error'
            }
            
            $scope.checkCancel = function(){
            console.log("check cancel")
            }
            
             $scope.checkConfirm = function( id ){
                    deleteMotorista( id )
            }

        	function save() {                
                Motoristas.addMotorista( UID,vm.customer ).then( resposta => {
                    vm.submitted = true;
                    console.log( 'Data were successfully sent to the server!' );
                    console.log( JSON.stringify( vm.customer, null, 2 ));
                    toastr.success('Criado com sucesso!', 'Motorista');                 
                    vm.customer = {};
                    $state.go('motoristas')
                },(error)=>{
                     ngNotify.set('Error: ' + error, {
                            position: 'top',
                            sticky: false,
                            type: 'error',
                            theme: 'pastel',
                            duration:3000,
                            button: true
                        });
                })        		
        	}

             function deleteMotorista( id ) {
                Motoristas.deleteMotorista( id,UID ).then(()=>{
                    toastr.success('Deletado com sucesso!!', 'Motorista'); 
                }, (error)=>{
                   ngNotify.set('Error: ' + error, {
                        position: 'top',
                        sticky: false,
                        type: 'error',
                        theme: 'pastel',
                        duration:3000,
                        button: true
                    });
                })
             }

        	function interacted( field ){                
        		return vm.submitted || field.$dirty;
        	}           
        }
})();