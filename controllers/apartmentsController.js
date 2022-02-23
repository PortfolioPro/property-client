angular.module('apartmentsController', ['ngResource', 'ui.router', 'messages'])

  .factory('apartmentsFactory', ['$resource', function($resource) {
    return $resource('https://property-server-api.herokuapp.com/api/buildings/:buildingId/apartments/:id', {
      buildingId: '@buildingId',
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }])

  .controller('apartmentsIndexController', ['apartmentsFactory', '$stateParams', 'flash', function(apartmentsFactory, $stateParams, flash) {
    this.apartments = apartmentsFactory.query({buildingId: $stateParams.buildingId});
    this.success = flash.getAlert();
    flash.resetAlert();
  }])

  .controller('apartmentEditController', ['apartmentsFactory', '$stateParams', '$state', 'flash', function(apartmentsFactory, $stateParams, $state, flash) {
    this.apartment = apartmentsFactory.get({buildingId: $stateParams.buildingId, id: $stateParams.id});
    let app = this;
    this.update = function() {
      this.apartment.$update({buildingId: $stateParams.buildingId, id: $stateParams.id}).then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('apartmentsIndex', {buildingId: $stateParams.buildingId})
        } else {
          app.apartment = apartmentsFactory.get({buildingId: $stateParams.buildingId, id: $stateParams.id});
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      })
    }
  }])
