(function() {

	'use strict';

    angular
        .module('LetsVAN.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);


        DashboardCtrl.$inject = ['$state', "currentAuth", 'Users'];

        function DashboardCtrl( $state,currentAuth,Users ) {
        	let vm =  this;

            vm.usuario = {
                'data': '',
                'email': '',
                'foto':''
            };
            function activate(){
                return vm.usuario = {
                    'data': Users.getProfile(currentAuth.uid),
                    'email': currentAuth.email,
                    'foto': Users.getGravatar(currentAuth.uid)
                } 
            }
            activate();  
             
        }
})();