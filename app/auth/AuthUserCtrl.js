(function() {

  angular
    .module('LetsVAN.auth')
    .factory('Users', Users);

  Users.$inject = ['$firebaseArray', '$firebaseObject'];

  function Users($firebaseArray, $firebaseObject) {

    let usersRef = firebase.database().ref().child('users');
    let connectedRef = firebase.database().ref('.info/connected');
    let users = $firebaseArray(usersRef);

    let Users = {
      getProfile: getProfile,
      getDisplayName: getDisplayName,
      getGravatar: getGravatar,
      setOnline: setOnline,
      all: users
    };

    return Users;

    function getProfile(uid) {
      return $firebaseObject(usersRef.child(uid));
    };

    function getDisplayName(uid) {
      return users.$getRecord(uid).displayName;
    };

    function getGravatar(uid) {
      return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
    };

    function setOnline(uid) {
      var connected = $firebaseObject(connectedRef);
      var online = firebase.database().ref('users/' + uid + '/online')

      connected.$watch(function() {
        if(connected.$value === true) {
            var con = online.push(true);
            con.onDisconnect().remove();
        }
      });
    };

  };

})();