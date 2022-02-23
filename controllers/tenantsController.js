angular.module('tenantsController', ['ngResource', 'ui.router', 'messages'])

  .factory('tenantsFactory', ['$resource', function($resource) {
      return $resource('https://property-server-api.herokuapp.com/api/buildings/:buildingId/apartments/:apartmentId/tenants/:id', {
        buildingId: '@buildingId',
        apartmentId: '@apartmentId',
        id: '@id'
      }, {
        update: {
          method: 'PUT'
        }
      })
    }])

  .controller('tenantsIndexController', ['tenantsFactory', '$stateParams', '$state', 'flash', function(tenantsFactory, $stateParams, $state, flash) {
    this.buildingId = $stateParams.buildingId;
    this.apartmentId = $stateParams.apartmentId;
    this.tenants = tenantsFactory.query({buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId});
    this.success = flash.getAlert();
    flash.resetAlert();
    let app = this;
    this.destroy = function(tenant) {
      tenant.$delete({buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId, id: tenant.id}).then(function(message) {
        flash.setAlert(message);
        app.success = flash.getAlert();
        flash.resetAlert();
      })
    }
  }])

  .controller('tenantNewController', ['tenantsFactory', '$stateParams', '$state', 'flash', function(tenantsFactory, $stateParams, $state, flash) {
    this.buildingId = $stateParams.buildingId;
    this.apartmentId = $stateParams.apartmentId;
    this.tenant = new tenantsFactory({buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId});
    let app = this;
    this.create = function() {
      this.tenant.$save().then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('tenantsIndex', {buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId});
        } else {
          app.tenant = new tenantsFactory({buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId});
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      })
    }
  }])

  .controller('tenantEditController', ['tenantsFactory', '$stateParams', '$state', 'flash', function(tenantsFactory, $stateParams, $state, flash) {
    this.buildingId = $stateParams.buildingId;
    this.apartmentId = $stateParams.apartmentId;
    this.tenant = tenantsFactory.get({buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId, id: $stateParams.id})
    let app = this;
    this.update = function() {
      this.tenant.$update({buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId, id: $stateParams.id}).then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('tenantsIndex', {buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId});
        } else {
          app.tenant = tenantsFactory.get({buildingId: $stateParams.buildingId, apartmentId: $stateParams.apartmentId, id: $stateParams.id});
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      })
    }
  }])
