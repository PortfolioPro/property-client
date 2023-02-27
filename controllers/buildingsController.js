angular.module('buildingsController', ['ngResource', 'ui.router', 'messages'])

  .factory('buildingsFactory', ['$resource', function($resource) {
    return $resource('https://property-server-740d.onrender.com/api/buildings')
  }])

  .controller('buildingsIndexController', ['buildingsFactory', function(buildingsFactory) {
    this.buildings = buildingsFactory.query();
  }])
