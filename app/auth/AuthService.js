(function(){


	'use strict';

	angular
		.module('LetsVAN.auth')
		.factory('Auth', Auth);

	Auth.$inject = ['$firebaseAuth'];
	
	 function Auth($firebaseAuth) {    	 
   		return $firebaseAuth();
  	}	

})();