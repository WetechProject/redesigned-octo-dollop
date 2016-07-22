(function() {

  angular
    .module('LetsVAN.auth')
    .factory('Clientes', Clientes);

  Clientes.$inject = ['$firebaseArray', '$firebaseObject'];

  function Clientes($firebaseArray, $firebaseObject) {
    

    let Clientes = {      
      addCliente: addCliente,
      getByIdCliente: getByIdCliente,
      updateCliente: updateCliente,
      deleteCliente: deleteCliente,
      all : all
    };

    return Clientes;

    function all(uid) {
      let clientesRef = firebase.database().ref().child('users/'+ uid +'/clientes');       
      return $firebaseArray(clientesRef);
    };

    function getByIdCliente(uid,id) {
      let clientesRef = firebase.database().ref().child('users/'+ uid +'/clientes');        
      return $firebaseArray(clientesRef.child(id));
    };


    function addCliente( uid,data ) {
      let clientesRef = firebase.database().ref().child('users/'+ uid +'/clientes');        
      let clientes = $firebaseArray(clientesRef);
      return clientes.$add(data);
    }; 

     function updateCliente( uid,id,data ) {
      return firebase.database().ref().child('users/'+ uid +'/clientes/'+ id).update(data);
    };

     function deleteCliente( id,uid ) {
      let clientesRef = firebase.database().ref().child('users/'+ uid +'/clientes/'+ id);        
      let clientes = $firebaseObject(clientesRef);
      return clientes.$remove();
    }; 

  };

})();