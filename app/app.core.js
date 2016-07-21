(function() {

	'use strict';
	
    angular.module('LetsVAN.core', [
    	'ui.router',
    	'ngMessages',
    	'ui.utils.masks',
    	'ngMask',
    	'angular.viacep',
    	'ui.bootstrap',
        'firebase',
        'angular-md5'
    ]);
})();