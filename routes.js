angular.module('routes', ['ui.router', 'buildingsController', 'apartmentsController', 'tenantsController'])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root', {
      url: '/',
      templateUrl: 'views/buildings-index.html',
      controller: 'buildingsIndexController',
      controllerAs: 'vm'
    })

    .state('buildingsIndex', {
      url: '/buildings',
      templateUrl: 'views/buildings-index.html',
      controller: 'buildingsIndexController',
      controllerAs: 'vm'
    })

    .state('apartmentsIndex', {
      url: '/buildings/:buildingId/apartments',
      templateUrl: 'views/apartments-index.html',
      controller: 'apartmentsIndexController',
      controllerAs: 'vm'
    })

    .state('apartmentEdit', {
      url: '/buildings/:buildingId/apartments/:id/edit',
      templateUrl: 'views/apartment-edit.html',
      controller: 'apartmentEditController',
      controllerAs: 'vm'
    })

    .state('tenantsIndex', {
      url: '/buildings/:buildingId/apartments/:apartmentId/tenants',
      templateUrl: 'views/tenants-index.html',
      controller: 'tenantsIndexController',
      controllerAs: 'vm'
    })

    .state('tenantNew', {
      url: '/buildings/:buildingId/apartments/:apartmentId/tenants/new',
      templateUrl: 'views/tenant-new.html',
      controller: 'tenantNewController',
      controllerAs: 'vm'
    })

    .state('tenantEdit', {
      url: '/buildings/:buildingId/apartments/:apartmentId/tenants/:id/edit',
      templateUrl: 'views/tenant-edit.html',
      controller: 'tenantEditController',
      controllerAs: 'vm'
    })

    .state('noRoute', {
      url: '*path',
      templateUrl: 'views/buildings-index.html',
      controller: 'buildingsIndexController',
      controllerAs: 'vm'
    })
  }])
