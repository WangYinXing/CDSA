(function(){
  'use strict';
    var rootScope;
    var module = angular.module('app', ['onsen', 'config', 'cdsaDirectives', 'cdsaServices', 'cdsaFilters']);
    var xmlHttp = new XMLHttpRequest();

    document.addEventListener("deviceready", function() {
      rootScope.$broadcast("device_ready");
    }, false);

    module.service('gApp', function() {
        this.fp_result = {};
        this.json = {};
    });

    module.run(['$rootScope', function($rootScope) {
      rootScope = $rootScope;
    }]);

    module.controller('appCtrl', ['$scope', '$sce', '$http', 'gApp', function($scope, $sce, $http, gApp) {
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


