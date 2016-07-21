(function() {

  angular
    .module('LetsVAN.auth')
    .factory('Veiculos', Veiculos);

  Veiculos.$inject = ['$firebaseArray', '$firebaseObject'];

  function Veiculos($firebaseArray, $firebaseObject) {
    

    let Veiculos = {      
      addVeiculo: addVeiculo,
      getByIdVeiculo: getByIdVeiculo,
      updateVeiculo: updateVeiculo,
      deleteVeiculo: deleteVeiculo,
      all : all
    };

    return Veiculos;

    function all(uid) {
      let veiculosRef = firebase.database().ref().child('users/'+ uid +'/veiculos');       
      return $firebaseArray(veiculosRef);
    };

    function getByIdVeiculo(uid,id) {
      let veiculosRef = firebase.database().ref().child('users/'+ uid +'/veiculos');        
      return $firebaseArray(veiculosRef.child(id));
    };


    function addVeiculo( uid,data ) {
      let veiculosRef = firebase.database().ref().child('users/'+ uid +'/veiculos');        
      let veiculos = $firebaseArray(veiculosRef);
      return veiculos.$add(data);
    }; 

     function updateVeiculo( uid,id,data ) {
      return firebase.database().ref().child('users/'+ uid +'/veiculos/'+ id).update(data);
    };

     function deleteVeiculo( id,uid ) {
      let veiculosRef = firebase.database().ref().child('users/'+ uid +'/veiculos/'+ id);        
      let veiculos = $firebaseObject(veiculosRef);
      return veiculos.$remove();
    }; 

  };

})();