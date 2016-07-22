(function(){

	'use strict';

	angular
		.module('LetsVAN.route',[])
		.config(routeConfig);


	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	function routeConfig($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
       .state('login', {
        url: '/login',
        controller: 'LoginCtrl as vm',
        templateUrl: 'app/pages/login/login.html', 
        resolve: {
         'requireAutenticacao': requireAutenticacao
        }    
      })
      .state('criarConta', {
        url: '/criarConta',
        controller: 'CriarConta as vm',
        templateUrl: 'app/pages/login/criarConta.html',
        resolve: {
         'requireAutenticacao': requireAutenticacao
        }      
      })
      .state('dashboard', {
        url: '/',
        controller: 'DashboardCtrl as vm',
        templateUrl: 'app/pages/dashboard/dashboard.html',
        resolve: {
          "currentAuth": currentAuth,
          "requireDisplayName": requireDisplayName
        } 
      })
      .state('perfil', {
        url: '/perfil',
        controller: 'PerfilCtrl as vm',
        templateUrl: 'app/pages/perfil/perfil.html',
        resolve: {     
        "currentAuth": currentAuth,     
          "perfil": perfil
        } 
      })    
      .state('motoristas', {
        url: '/motoristas',
        controller: 'MotoriastasCtrl as vm',
        templateUrl: 'app/pages/motoristas/motoristas.html',
         resolve: {
         "currentAuth": currentAuth,
         "requireDisplayName": requireDisplayName
        } 
      })
      .state('motoristas.new', {
        url: '/new',
        parent:'motoristas',
        views: {
        	'@':{
        		controller: 'MotoriastasCtrl as vm',
        		templateUrl: 'app/pages/motoristas/motorista.edit.html',
            resolve: {
                "requireDisplayName": requireDisplayName
            } 
        	}
        }        
      })
       .state('motoristas.edit', {
        url: '/{motoristaID}',
        parent:'motoristas',
        views: {
        	'@':{
        		controller: 'MotoriastasEditCtrl as vm',
        		templateUrl: 'app/pages/motoristas/motorista.edit.html',
            resolve: {
              "currentAuth": currentAuth,
              "requireDisplayName": requireDisplayName,
              "perfilMotorista": perfilMotorista
            }
        	}
        }
      })
       .state('veiculos', {
        url: '/veiculos',
        controller: 'VeiculosCtrl as vm',
        templateUrl: 'app/pages/veiculos/veiculos.html',
         resolve: {
         "currentAuth": currentAuth,
         "requireDisplayName": requireDisplayName
        } 
      })
      .state('veiculos.new', {
        url: '/new',
        parent:'veiculos',
        views: {
          '@':{
            controller: 'VeiculosCtrl as vm',
            templateUrl: 'app/pages/veiculos/veiculo.edit.html',
            resolve: {
                "requireDisplayName": requireDisplayName
            } 
          }
        }        
      })
       .state('veiculos.edit', {
        url: '/{veiculoID}',
        parent:'veiculos',
        views: {
          '@':{
            controller: 'VeiculosEditCtrl as vm',
            templateUrl: 'app/pages/veiculos/veiculo.edit.html',
            resolve: {
              "currentAuth": currentAuth,
              "requireDisplayName": requireDisplayName,
              "perfilVeiculo": perfilVeiculo
            }
          }
        }
      })
       .state('clientes', {
        url: '/clientes',
        controller: 'ClientesCtrl as vm',
        templateUrl: 'app/pages/clientes/clientes.html',
         resolve: {
         "currentAuth": currentAuth,
         "requireDisplayName": requireDisplayName
        } 
      })
      .state('clientes.new', {
        url: '/new',
        parent:'clientes',
        views: {
          '@':{
            controller: 'ClientesCtrl as vm',
            templateUrl: 'app/pages/clientes/cliente.edit.html',
            resolve: {
                "requireDisplayName": requireDisplayName
            } 
          }
        }        
      })
       .state('clientes.edit', {
        url: '/{clienteID}',
        parent:'clientes',
        views: {
          '@':{
            controller: 'ClientesEditCtrl as vm',
            templateUrl: 'app/pages/clientes/cliente.edit.html',
            resolve: {
              "currentAuth": currentAuth,
              "requireDisplayName": requireDisplayName,
              "perfilCliente": perfilCliente
            }
          }
        }
      })
	};

    requireAutenticacao.$inject = ['$state', 'Auth'];
    function requireAutenticacao() {
      let user = firebase.auth().currentUser;
       if(!!user) {
          return $state.go('dashboard'); 
       }
    };

    currentAuth.$inject = ['Auth'];
    function currentAuth(Auth) {
      return Auth.$waitForSignIn();
    };

    requireDisplayName.$inject = ['$state', 'Auth', 'Users'];
     function requireDisplayName($state, Auth, Users) {
      return Auth.$requireSignIn().then(function(auth) {
        return Users.getProfile(auth.uid).$loaded().then(function(profile) {
          if(profile.displayName) {
            return profile;
          } else {
            $state.go('perfil');
          }
        });
      }).catch(function(error) {
        $state.go('login');
      });
    };

    perfil.$inject = ['Users', 'Auth'];
    function perfil(Users, Auth) {
      return Auth.$requireSignIn()
      .then(function(auth) {
        console.log(auth.uid);
        return Users.getProfile(auth.uid).$loaded()
      });
    };

    perfilMotorista.$inject = ['$stateParams', 'Motoristas', 'Auth'];
    function perfilMotorista($stateParams, Motoristas, Auth) {
      return Auth.$requireSignIn().then(function(auth) {
        return firebase.database()
        .ref()
        .child('users/'+ auth.uid +'/motoristas/' + $stateParams.motoristaID)
        .once('value').then(function(snapshot) {
              return snapshot.val();
          });
      });    
    };

     perfilVeiculo.$inject = ['$stateParams', 'Veiculos', 'Auth'];
    function perfilVeiculo($stateParams, Veiculos, Auth) {
      return Auth.$requireSignIn().then(function(auth) {
        return firebase.database()
        .ref()
        .child('users/'+ auth.uid +'/veiculos/' + $stateParams.veiculoID)
        .once('value').then(function(snapshot) {
              return snapshot.val();
          });
      });    
    };

    perfilCliente.$inject = ['$stateParams', 'Clientes', 'Auth'];
    function perfilCliente($stateParams, Clientes, Auth) {
      return Auth.$requireSignIn().then(function(auth) {
        return firebase.database()
        .ref()
        .child('users/'+ auth.uid +'/clientes/' + $stateParams.clienteID)
        .once('value').then(function(snapshot) {
              return snapshot.val();
          });
      });    
    };




})();