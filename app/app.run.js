(function() {

	'use strict';

	angular
		.module('LetsVAN')
		.run(["$rootScope", "$state", function($rootScope, $state) {
		  		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {

				    if (error === "AUTH_REQUIRED") {
				      $state.go("login");
				    }

	 	 		});
		}]);
})();