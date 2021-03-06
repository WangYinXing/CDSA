(function(){
  'use strict';

    var deviceIsReady = false;
    var rootScope;

    var module = angular.module('app', ['onsen', 'config', 'cdsaDirectives', 'cdsaServices', 'cdsaFilters']);
    var xmlHttp = new XMLHttpRequest();

    document.addEventListener("deviceready", function() {

      deviceIsReady = true;

      if (typeof(rootScope) != "undefined") {
        rootScope.$broadcast("device_ready");
      }
    }, false);

    module.service('gApp', function() {
        this.fp_result = {};
        this.json = {};
    });

    module.run(['$rootScope', function($rootScope) {
      if (deviceIsReady) {
        $rootScope.$broadcast("device_ready");
      }
      else {
        rootScope = $rootScope;
      }
    }]);

    module.controller('appCtrl', ['$scope', '$rootScope', '$sce', '$http', 'gApp', function($scope, $rootScope, $sce, $http, gApp) {
      /*
       Detection of platform...
       */
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
      {
        $rootScope.platform = 'iOS';
        //return 'iOS';

      }
      else if( userAgent.match( /Android/i ) )
      {
        $rootScope.platform = 'Android';
        //return 'Android';
      }
      else
      {
        $rootScope.platform = 'browser';
        //return 'unknown';
      }

      app.gotoPage = gApp.gotoPage = function(page) {
        gApp.showLoadingScreen();
        var pageUrl = page + '.html';

        if (app.navi.getCurrentPage().page == pageUrl)
          return;

        app.navi.resetToPage(pageUrl, { animation: 'slide', onTransitionEnd:function() {
            gApp.showLoadingScreen(false);
          }
        });
      };

      gApp.showLoadingScreen = function(bShow) {
        bShow = typeof(bShow) == "undefined" ? true : false;

        bShow ? $(".page-transitioning").show() : $(".page-transitioning").hide();
      };


      gApp.showLoadingScreen(false);

      // year stars
      $http.get('json/yearstars.json').success(function(data) {
          gApp.json.yearstars = data;
      });
      // timezone
      $http.get('json/timezones.json').success(function(data) {
              gApp.json.timezones = data;
      });
        // spele
      $http.get('json/spele.json').success(function (data) {
          gApp.json.spele = data;
      });
    }]);

    module.directive('compile', ['$compile', function ($compile) {
        return function(scope, element, attrs) {
            scope.$watch(
              function(scope) {
                  // watch the 'compile' expression for changes
                  return scope.$eval(attrs.compile);
              },
              function(value) {
                  // when the 'compile' expression changes
                  // assign it into the current DOM
                  element.html(value);

                  // compile the new DOM and link it to the current
                  // scope.
                  // NOTE: we only compile .childNodes so that
                  // we don't get into infinite loop compiling ourselves
                  $compile(element.contents())(scope);
              }
          );
        };
    }]);
})();


