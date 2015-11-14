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

  /*                          */
  // page: lifereadings.html
  /*                          */
  module.controller('readingsCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
    var page = app.navi.getCurrentPage(),
        numeral = page.options.numeral;

    $http.get('reading/Numeral ' + numeral + ' App.html').success(function(data) {
      $scope.contents = $sce.trustAsHtml(data);
    });

  }]);


  /*                          */
  // page: yearstar.html
  /*                          */
  module.controller('yearstarCtrl', ['$scope', 'gApp', function($scope, gApp) {
    $scope.d = {};

    var yss = gApp.json.yearstars,
      i,
      expr1 = /([\+\-]?)(\w+)\s+\[(\w+)(.)\]/,
      expr2 = /(\w+)\s+(\w+)\s*.\s*(\w+)\s+(\w+)/;

      var varrS = gApp.fp_result.ys.match(expr1);
      var varrB = gApp.fp_result.yb.match(expr1);
      var ys_str = varrS[3] + ' ' + varrB[3] + ' - ' + varrS[2] + ' ' + varrB[2];

      for (i = 0; i < yss.length; i++) {
        var varrR = yss[i][1].match(expr2);
        if (ys_str == varrR[1] + ' ' + varrR[2] + ' - ' + varrR[3] + ' ' + varrR[4]) {
          $scope.d = {
            ystype: varrS[2],
            ybtype: varrB[2],
            yearstar: yss[i][2],
            metaphor: yss[i][3],
            explanation: yss[i][4]
          };
          break;
        }
      }
  }]);


})();


