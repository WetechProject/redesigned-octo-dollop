(function() {
    angular
        .module('LetsVAN.veiculos')
        .controller('VeiculosCtrl', VeiculosCtrl);

        VeiculosCtrl.$inject = ['$scope','$state', 'Veiculos','currentAuth','ngNotify'];

        function VeiculosCtrl( $scope,$state, Veiculos, currentAuth,ngNotify ) {

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

             $scope.htmlSweet='<a sweetalert sweet-options="{{sweet.option}}" sweet-confirm-option="{{sweet.confirm}}" sweet-cancel-option="{{sweet.cancel}}"  name="login-submit" sweet-on-cancel="checkCancel()" sweet-on-confirm="checkConfirm()" style="background-color:blue"  class="btn" >Try It</a>'
             $scope.htmlSweetOption='<a sweetalert sweet-options='
             $scope.htmlSweetConfirm=' sweet-confirm-options='
             $scope.htmlSweetCancel=' sweet-cancel-options='
             $scope.htmlSweetOnConfirmCancel=' sweet-on-confirm="checkConfirm()" sweet-on-cancel="checkCancel()">Try It</a>'
            $scope.sweet = {};
            $scope.sweet.option = {
                title: "Você tem certeza?",
                text: "Você não será capaz de recuperar esse Veículo!",
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
                text: 'O veículo foi excluido!',
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
                    deleteVeiculo( id )
            }


             function save() {                
                Veiculos.addVeiculo( UID,vm.customer ).then( resposta => {
                    vm.submitted = true;
                    console.log( 'Data were successfully sent to the server!' );
                    console.log( JSON.stringify( vm.customer, null, 2 ));
                     toastr.success('Veículo', 'Criado com sucesso!');                   
                    vm.customer = {};
                    $state.go('veiculos')
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
        	};

        	function deleteVeiculo( id ) {
                Veiculos.deleteVeiculo( id,UID ).then(()=>{
                    toastr.success('Veículo', 'Deletado com sucesso!'); 
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
             };

        	function interacted( field ){                
        		return vm.submitted || field.$dirty;
        	};
        }
})();