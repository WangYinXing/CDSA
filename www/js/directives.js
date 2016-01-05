(function(){
  'use strict';

  var module = angular.module('cdsaDirectives', ['config']);

    module.directive('fpBigGonji', function (COLOR_TABLE) {
    return {
      restrict: 'E',
      templateUrl: "templates/fpBigGonji.html",
      scope: {
        data: '@'
      },

      controller: function($scope, $attrs) {
        if (angular.isDefined($attrs.nosign)) {
          $scope.nosign = true;
        }

        if (angular.isDefined($attrs.compact)) {
          $scope.compactMode = true;
        }

        $scope.isSelected = function () {
            return $scope.$parent.unit == $scope.index && ($scope.nosign && $scope.$parent.mode == "branch" || !$scope.nosign && $scope.$parent.mode == "stem");
        };

        $scope.$watch('data', function(value) {
          if (value) {
            var varr = value.match(/([\+\-]?)(\w+)\s+\[(\w+)(.)\]/);
            if (varr && varr.length >= 5) {
                if (typeof ($scope.d) == "undefined")
                    $scope.d = {};

                $scope.d.sign = (varr[1] == '+') ? 'Yang' : 'Yin';
                $scope.d.type = varr[2];
                $scope.d.pinyin = varr[3];
                $scope.d.char = varr[4];


                $scope.index = $scope.$parent.$index;



                $scope.colorClass = function () {
                    var selected = false;

                    if (typeof ($scope.$parent.unit) != "undefined")
                        selected = $scope.isSelected();

                    if ($scope.d.type == "Wood" || $scope.d.type == "Tiger" || $scope.d.type == "Rabbit") // Green
                        return selected ? "sel-green-background sel-basic" : "green-background";
                    else if ($scope.d.type == "Fire" || $scope.d.type == "Snake" || $scope.d.type == "Horse") // Red
                        return selected ? "sel-red-background sel-basic" : "red-background";
                    else if ($scope.d.type == "Earth" || $scope.d.type == "Ox" || $scope.d.type == "Dragon" || $scope.d.type == "Goat" || $scope.d.type == "Dog") // Yellow
                        return selected ? "sel-yellow-background sel-basic" : "yellow-background";
                    else if ($scope.d.type == "Metal" || $scope.d.type == "Monkey" || $scope.d.type == "Rooster") // Grey
                        return selected ? "sel-grey-background sel-basic" : "grey-background";
                    else if ($scope.d.type == "Water" || $scope.d.type == "Rat" || $scope.d.type == "Pig") // Blue
                        return selected ? "sel-blue-background sel-basic" : "blue-background";
                }
            }
          }
          else {
            $scope.d = {
              type: '\r\n',
              char: '\r\n'
            };
          }
        });
      }

    };
  })
  .directive('fpSmallGonji', function(COLOR_TABLE) {
    return {
        restrict: 'E',
        templateUrl: "templates/fpSmallGonji.html",
      scope: {
        data: '@'
      },

      controller: function($scope) {
        $scope.$watch('data', function(value) {
          if (value) {
            var varr = value.match(/([\+\-]?)(\w+)\s+\[(\w+)(.)\]/);
            if (varr && varr.length >= 5) {
                if (typeof ($scope.d) == "undefined")
                    $scope.d = {};

                $scope.d.sign = (varr[1] == '+') ? 'Yang' : 'Yin';
                $scope.d.type = varr[2];

                if ($scope.d.type == "Wood") {
                    $scope.textClass = "green-text";
                }
                else if ($scope.d.type == "Fire") {
                    $scope.textClass = "red-text";
                }
                else if ($scope.d.type == "Earth") {
                    $scope.textClass = "yellow-text";
                }
                else if ($scope.d.type == "Metal") {
                    $scope.textClass = "grey-text";
                }
                else if ($scope.d.type == "Water") {
                    $scope.textClass = "blue-text";
                }
            }
          }
          else {
            $scope.d = {
              sign: '\r\n'
            };
          }
        });
      }

    };
  })

    .directive('accordion', function () {
        return {
            link: function (scope, iElement, iAttrs) {
                $(iElement).accordion({
                    collapsible: true,
                    heightStyle: "content",
                    active: false
                });
                // get weather details

                $(iElement).addClass("accordion-wrapper");
            }
        }
    });

})();
