(function() {

  angular
    .module('LetsVAN.auth')
    .factory('Motoristas', Motoristas);

  Motoristas.$inject = ['$firebaseArray', '$firebaseObject'];

  function Motoristas($firebaseArray, $firebaseObject) {
    

    let Motoristas = {      
      addMotorista: addMotorista,
      getByIdMotorista: getByIdMotorista,
      updateMotorista: updateMotorista,
      deleteMotorista: deleteMotorista,
      all : all
    };

    return Motoristas;

    function all(uid) {
      let motoristasRef = firebase.database().ref().child('users/'+ uid +'/motoristas');       
      return $firebaseArray(motoristasRef);
    };

    function getByIdMotorista(uid,id) {
      let motoristasRef = firebase.database().ref().child('users/'+ uid +'/motoristas');        
      return $firebaseArray(motoristasRef.child(id));
    };


    function addMotorista( uid,data ) {
      let motoristasRef = firebase.database().ref().child('users/'+ uid +'/motoristas');        
      let motoristas = $firebaseArray(motoristasRef);
      return motoristas.$add(data);
    }; 

     function updateMotorista( uid,id,data ) {
      return firebase.database().ref().child('users/'+ uid +'/motoristas/'+ id).update(data);
    };

     function deleteMotorista( id,uid ) {
      let motoristasRef = firebase.database().ref().child('users/'+ uid +'/motoristas/'+ id);        
      let motoristas = $firebaseObject(motoristasRef);
      return motoristas.$remove();
    }; 

  };

})();