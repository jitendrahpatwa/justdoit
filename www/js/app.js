// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform,$cordovaStatusbar,$http, $cordovaPushV5) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      if (cordova.platformId == 'android') {
          $cordovaStatusbar.overlaysWebView(true);
          $cordovaStatusbar.styleHex('#699cfa');
        //$cordovaStatusbar.hide();
          $cordovaStatusbar.show();
      }else{
          $cordovaStatusbar.overlaysWebView(true);
          $cordovaStatusbar.styleHex('#699cfa');
        //$cordovaStatusbar.hide();
          $cordovaStatusbar.show();
      }
      /*$cordovaStatusbar.overlaysWebView(true);
          $cordovaStatusbar.styleHex('#699cfa');
        //$cordovaStatusbar.hide();
          $cordovaStatusbar.show();*/
    }


  // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
  //$cordovaStatusbar.style(1);

  // supported names: black, darkGray, lightGray, white, gray, red, green,
  // blue, cyan, yellow, magenta, orange, purple, brown
  //$cordovaStatusbar.styleColor('blue');

  

  //var isVisible = $cordovaStatusbar.isVisible();


  ////
    var options = {
    android: {
      senderID: "904286916278"
    },
    ios: {
      alert: "true",
      badge: "true",
      sound: "true"
    },
    windows: {}
  };
  
  // initialize
  $cordovaPushV5.initialize(options).then(function() {
    // start listening for new notifications
    $cordovaPushV5.onNotification();
    // start listening for errors
    $cordovaPushV5.onError();
    
    // register to get registrationId
    $cordovaPushV5.register().then(function(registrationId) {
      // save `registrationId` somewhere;
      //alert("registrationId:"+registrationId);
    })
  });
  
  // triggered every time notification received
  $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
  });

  // triggered every time error occurs
  $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
    // e.message
    alert("e.message:"+e.message);
  });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
