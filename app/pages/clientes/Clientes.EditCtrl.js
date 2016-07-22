(function(){


	'use strict';

	   angular
        .module('LetsVAN.clientes')
        .factory('myModal', myModal) 
        .controller('MyModalController', MyModalController)   
        .controller('ClientesEditCtrl', ClientesEditCtrl);

         MyModalController.$inject = ['myModal', 
        '$rootScope', 
        'toastr',
        '$scope',
        'moment'];

        function MyModalController(myModal,$rootScope,toastr,$scope,moment) {
          let vm = this;

          if( $rootScope._UsuarioCtrl.length > 0 ){
            return vm.customer = {
              'id': $scope.id,
              'nome': $scope.nome,
              'ativo': $scope.ativo,
              'bairro_destino': $scope.bairro_destino,
              'bairro_origem': $scope.bairro_origem,
              'celular': $scope.celular,
              'celular_urgencia': $scope.celular_urgencia,
              'codigo_ativacao': $scope.codigo_ativacao,
              'data_Cadastro': $scope.data_Cadastro,
              'data_Nascimento': $scope.data_Nascimento,
              'email': $scope.email,
              'observacao': $scope.observacao,
              'parentesco': $scope.parentesco,
              'sexo': $scope.sexo,
              'telefone_urgencia': $scope.telefone_urgencia
            } 
          }
            vm.customer = {};
            vm.customer.data_Cadastro = moment().format('DDMMYYYY');
            vm.close = closeModal;          
            vm.valid = valid;
            vm.saveUsuario = saveUsuario;
            vm.alterarUsuario = alterarUsuario;
            vm.submitted = false;         
          let id;

          function closeModal(){
            return myModal.deactivate();
          }

          function saveUsuario() { 
            vm.customer.id =  ($rootScope._UsuarioCtrl.length + 1);     
            $rootScope._UsuarioCtrl.push(vm.customer);
            toastr.success('Criado com sucesso!', 'Usuário'); 
            closeModal();
            vm.customer = {};
          }

          function alterarUsuario( dados ) {
            let arrFormat = $rootScope._UsuarioCtrl;
            arrFormat.forEach((elemento,index) => {
              if(elemento.id === dados.id){
                return $rootScope._UsuarioCtrl.splice(index, 1, dados);
              }
            })
            toastr.success('Alterado com sucesso!', 'Usuário');
            closeModal();
            vm.customer = {};
          }

            function valid ( field ){                
            return vm.submitted || field.$dirty;
          }

            vm.btn = {
                 'name': 'Alterar'
             }          

          vm.sexo = [
            {'name':'Feminino'},
            {'name':'Masculino'}
          ];

        }

        myModal.$inject = ['vModal'];

        function myModal(vModal) {
          return vModal({
            controller: 'MyModalController',
            controllerAs: 'vm',
            template: `
<v-modal class="vModal--default" onclose="vm.close()" >
    <v-dialog heading="Usuário" large middle>
      <v-close label="Close"></v-close>
        <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="form-group">            
                <form novalidate 
                  name="customerForm"
                  ng-submit="vm.saveUsuario()">
                <div class="row">
                  <div class="col-lg-7">
                    <div class="form-group ">
                      <label for="input_nome">Nome*</label>
                      <input name="nome" 
                      type="text" 
                      ng-maxlength="100" 
                      ng-minlength="10" 
                      id="input_nome" 
                      ng-model="vm.customer.nome"
                      class="form-control" 
                      required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.nome )" 
                      ng-messages="customerForm.nome.$error">
                        <div ng-message="required">Coloque o nome!</div>
                        <div ng-message="minlength">Erro o nome tem que ter 10 caracteres!</div>
                        <div ng-message="maxlength">Erro o nome tem que ter só 100 caracteres!</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group ">
                      <label for="input_parentesco">Parentesco*</label>
                      <input name="parentesco" 
                      type="text" 
                      ng-maxlength="100" 
                      ng-minlength="2" 
                      id="input_parentesco" 
                      ng-model="vm.customer.parentesco"
                      class="form-control" 
                      required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.parentesco )" 
                      ng-messages="customerForm.parentesco.$error">
                        <div ng-message="required">Coloque o Parentesco!</div>
                        <div ng-message="minlength">Erro o nome tem que ter 2 caracteres!</div>
                        <div ng-message="maxlength">Erro o nome tem que ter só 100 caracteres!</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <div class="form-group ">
                      <label for="input_data_Nascimento">Data Nascimento*</label>
                      <input name="data_Nascimento" 
                      type="text"
                      ng-model="vm.customer.data_Nascimento"
                      id="input_data_Nascimento" 
                      class="form-control" 
                      mask="39/19/9999"
                      required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.data_Nascimento )" 
                      ng-messages="customerForm.data_Nascimento.$error">
                        <div ng-message="required">Coloque a Data de Nascimento!</div>
                      </div>
                    </div>                    
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group ">
                      <label for="input_sexo">Sexo*</label>
                       <select name="sexo"
                        ng-model="vm.customer.sexo"
                        required>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                       </select>
                       <div class="error-messages" 
                      ng-if="vm.valid( customerForm.sexo )" 
                      ng-messages="customerForm.sexo.$error">
                        <div ng-message="required">Coloque a Sexo!</div>
                      </div>
                    </div>                    
                  </div>                 
                  <div class="col-lg-3">
                    <div class="form-group ">
                      <label for="input_celular">Celular*</label>
                      <input name="celular" 
                      type="text" 
                      id="input_celular"
                      ng-model="vm.customer.celular" 
                      class="form-control"
                      ui-br-phone-number
                      required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.celular )" 
                      ng-messages="customerForm.celular.$error">
                        <div ng-message="required">Coloque o nº do Celular!</div>
                      </div>  
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-5">
                    <div class="form-group ">
                      <label for="input_bairro_origem">Bairro Origem*</label>
                      <input name="bairro_origem"
                       type="text" 
                       ng-minlength="5"
                       ng-maxlength="100"                       
                       ng-model="vm.customer.bairro_origem"
                       id="input_bairro_origem" 
                       class="form-control"
                       required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.bairro_origem )" 
                      ng-messages="customerForm.bairro_origem.$error">
                        <div ng-message="required">Coloque o Bairro de Origem!</div>
                        <div ng-message="minlength">5</div>
                        <div ng-message="maxlength">100</div>                 
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5">
                    <div class="form-group ">
                      <label for="input_bairro_destino">Bairro Destino*</label>
                      <input name="bairro_destino"
                       type="text" 
                       ng-minlength="5"
                       ng-maxlength="100"                       
                       ng-model="vm.customer.bairro_destino"
                       id="input_bairro_destino" 
                       class="form-control"
                       required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.bairro_destino )" 
                      ng-messages="customerForm.bairro_destino.$error">
                        <div ng-message="required">Coloque o Bairro de Destino!</div>
                        <div ng-message="minlength">5</div>
                        <div ng-message="maxlength">100</div>                 
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-5">
                    <div class="form-group ">
                      <label for="input_telefone_urgencia">Telefone Urgência</label>
                      <input name="telefone_urgencia" 
                      type="text" 
                      id="input_telefone_urgencia"
                      ng-model="vm.customer.telefone_urgencia" 
                      class="form-control"
                      ui-br-phone-number
                      required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.telefone_urgencia )" 
                      ng-messages="customerForm.telefone_urgencia.$error">
                        <div ng-message="required">Coloque o nº do Telefone de Urgência!</div>
                      </div>  
                    </div>
                  </div>
                  <div class="col-lg-5">
                    <div class="form-group ">
                      <label for="input_celular_urgencia">Celular Urgência</label>
                      <input name="celular_urgencia" 
                      type="text" 
                      id="input_celular_urgencia"
                      ng-model="vm.customer.celular_urgencia" 
                      class="form-control"
                      ui-br-phone-number
                      required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.celular_urgencia )" 
                      ng-messages="customerForm.celular_urgencia.$error">
                        <div ng-message="required">Coloque o nº do Celular de Urgência!</div>
                      </div>  
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-10">
                    <div class="form-group ">
                      <label for="input_email">Email</label>
                      <input name="email" 
                          type="email" 
                          ng-maxlength="60" 
                          id="input_email" 
                          ng-model="vm.customer.email"
                          class="form-control"
                          required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.email )" 
                      ng-messages="customerForm.email.$error">
                        <div ng-message="required">Coloque o email!</div>               
                        <div ng-message="maxlength">60</div>                
                        <div ng-message="email">Email inválido!</div>               
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-10">
                    <div class="form-group">
                      <label for="input_observacao">Observações</label>
                      <textarea name="observacao"
                      ng-maxlength="100"
                      ng-model="vm.customer.observacao"  
                      rows="5" 
                      cols="20" 
                      id="input_observacao" 
                      class="form-control textarea">
                      </textarea>                     
                    </div>                    
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-lg-3">
                    <div class="form-group ">
                      <label for="input_data_Cadastro">Data Cadastro</label>
                      <input name="data_Cadastro" 
                      type="text"
                      ng-model="vm.customer.data_Cadastro"
                      id="input_data_Cadastro" 
                      class="form-control" 
                      mask="39/19/9999"
                      ng-disabled
                      required>
                      <div class="error-messages" 
                      ng-if="vm.valid( customerForm.data_Cadastro )" 
                      ng-messages="customerForm.data_Cadastro.$error">
                        <div ng-message="required">Coloque a Data de Cadastro!</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-lg-3">
                    <div class="form-group">
                      <div class="checkbox">
                        <label>
                          <input id="chk_ativo" 
                          type="checkbox"
                          ng-model="vm.customer.ativo"
                          name="ativo">
                          Ativo</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <div class="checkbox">
                        <label>
                          <input id="chk_codigo_ativacao" 
                          type="checkbox"
                          ng-model="vm.customer.codigo_ativacao"
                          name="codigo_ativacao">
                          Enviar código de ativação</label>
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="panel-footer">
                  <button type="submit"
                      ng-if="!vm.customer.id"
                         ng-disabled="customerForm.$invalid"
                           class="btn btn-success">{{vm.btn.name}}
                     </button>
                     <button type="button"
                        ng-click="vm.alterarUsuario( vm.customer )"
                      ng-if="!!vm.customer.id"
                         ng-disabled="customerForm.$invalid"
                           class="btn btn-success">Alterar
                     </button>
                     <a ng-click="vm.close()"                        
                           class="btn btn-success">Cancelar
                     </a>
                </div>
              </form>
            </div>
          </div>    
        </div>
      </div>
    </div>        
    </v-dialog>
</v-modal>`
          });
        };


        ClientesEditCtrl.$inject = ['currentAuth', 
        'Clientes', 
        '$state', 
        'perfilCliente', 
        '$stateParams', 
        'ngNotify',
        'toastr',
        '$rootScope',
        'moment',
        'myModal',
        '$scope'];

        function ClientesEditCtrl( currentAuth,Clientes,$state,perfilCliente,$stateParams,ngNotify,toastr, $rootScope,moment,myModal,$scope ){

        	let vm = this; 

          vm.show = myModal.activate;
            vm.editarUsuario = function( id ){
              let array = $rootScope._UsuarioCtrl
                    .map(i => {return i} )
                    .filter(n => {return n.id === id});
              console.log(array[0]);
              myModal.activate( array[0] );
            }

             $scope.htmlSweet='<a sweetalert sweet-options="{{sweet.option}}" sweet-confirm-option="{{sweet.confirm}}" sweet-cancel-option="{{sweet.cancel}}"  name="login-submit" sweet-on-cancel="checkCancel()" sweet-on-confirm="checkConfirm()" style="background-color:blue"  class="btn" >Try It</a>'
            $scope.htmlSweetOption='<a sweetalert sweet-options='
            $scope.htmlSweetConfirm=' sweet-confirm-options='
            $scope.htmlSweetCancel=' sweet-cancel-options='
            $scope.htmlSweetOnConfirmCancel=' sweet-on-confirm="checkConfirm()" sweet-on-cancel="checkCancel()">Try It</a>'
            $scope.sweet = {};           
             $scope.sweet.optionUsuario = {
                title: "Você tem certeza?",
                text: "Você não será capaz de recuperar esse Usuário!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, excluí-lo!",
                cancelButtonText: "Não cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            }            

            $scope.sweet.confirmUsuario = {
                title: 'Excluir!',
                text: 'O usuário foi excluido!',
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
            
            $scope.checkUsuarioConfirm = function( id ){
                let arrFormat = $rootScope._UsuarioCtrl;
                arrFormat.forEach((elemento,index) => {
                  if(elemento.id === id){
                    return $rootScope._UsuarioCtrl.splice(index, 1);
                  }
                });
            }

        	 /*Function*/
        	 vm.interacted = interacted;
        	 vm.save = update;

           /*Global variable*/
             const UID = currentAuth.uid           
        	   const id = $stateParams.clienteID;
           	 vm.isShowing = !!id;
           	 vm.customer = {};
           	 vm.btn = {
           	 	 'name': 'Alterar'    
           	 }
             vm.campo_data = 'Data Alteração';

           	  function update(){
                  vm.customer.usuarios = $rootScope._UsuarioCtrl.map(element=>{
                      let opt ={
                        "ativo": element.ativo,
                        "bairro_destino": element.bairro_destino,
                        "bairro_origem": element.bairro_origem,
                        "celular": element.celular,
                        "celular_urgencia": element.celular_urgencia,
                        "codigo_ativacao": element.codigo_ativacao,
                        "data_Cadastro": element.data_Cadastro,
                        "data_Nascimento": element.data_Nascimento,
                        "email": element.email,
                        "id": element.id,
                        "nome": element.nome,
                        "observacao": element.observacao || '',
                        "parentesco": element.parentesco,
                        "sexo": element.sexo,
                        "telefone_urgencia": element.telefone_urgencia
                      }
                    return opt;
                  });
           	 	    console.log( 'Data were successfully sent to the server! EDIT' );
                    console.log( JSON.stringify( vm.customer, null, 2 ));                   
                    Clientes.updateCliente( UID,id,vm.customer ).then(()=>{
                      toastr.success( 'Alterado com sucesso!', 'Cliente');
                    	$state.go('clientes');
                    },(error)=>{
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


           	 if (vm.isShowing) {
            	 vm.customer = perfilCliente; 
               vm.customer.data_Cadastro = moment().format('DDMMYYYY');
               $rootScope._UsuarioCtrl = perfilCliente.usuarios;         	
		        } 

		       function interacted( field ){                
        		return vm.submitted || field.$dirty;
        	 }
            

      }

})()