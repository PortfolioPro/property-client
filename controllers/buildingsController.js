angular.module('buildingsController', ['ngResource', 'ui.router', 'messages'])

  .factory('buildingsFactory', ['$resource', function($resource) {
    return $resource('https://property-server-api.herokuapp.com/api/buildings')
  }])

  .controller('buildingsIndexController', ['buildingsFactory', function(buildingsFactory) {
    this.buildings = buildingsFactory.query();
  }])
