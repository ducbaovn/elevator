(function () {
  'use strict';
  var routerApp = angular.module('elevatorApp', ['ui.router']);

  routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/install');

    $stateProvider

      // HOME STATES AND NESTED VIEWS ========================================
      .state('install', {
        url: '/install',
        templateUrl: './app/components/install/view/install.view.html',
        controller: 'installController'
      })

      // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
      .state('system', {
        url: '/system',
        views: {
          '': {
            templateUrl: './app/components/system/view/system.view.html',
            controller: 'systemController'
          },
          'floor@system': {templateUrl: './app/components/floor/view/floor.view.html'},
          'elevator@system': {templateUrl: './app/components/elevator/view/elevator.view.html'}
        }
        // we'll get to this in a bit
      });
  });
})()