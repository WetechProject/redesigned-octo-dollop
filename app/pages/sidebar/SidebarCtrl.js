(function() {

	'use strict';

    angular
        .module('LetsVAN.dashboard')
        .controller('SidebarCtrl', SidebarCtrl);


        SidebarCtrl.$inject = ['$state','Users', 'Auth'];

        function SidebarCtrl( $state,Users, Auth ) {
        	let vm =  this;

             /*Function*/
            vm.sair = sair;            

           /*Global variable*/


           function sair() {
            firebase.auth().signOut().then(() =>{
                $state.go('login');
             },()=>{
                return;
            });
           };
            

            firebase.auth().onAuthStateChanged((user)=> {
                if (user) {
                    vm.usuario = Users.getProfile(user.uid);
                    vm.foto = Users.getGravatar(user.uid);
                } else {
                   console.log('Nda!!');
                }
            });                 
                 	
        	
        };
})();