angular.module('messages', [])

  .factory('flash', function() {
    let alert = {};
    return {
      setAlert: function(value) {
        alert = value;
      },
      getAlert: function() {
        return alert;
      },
      resetAlert: function() {
        alert = {};
      }
    }
  })
