(function(){
  'use strict';

  var module = angular.module('cdsaFilters', []);

  module.filter('cdsa', function() {
    return function(input, what) {
      var out = '';

      input = input || '';

      var varr = input.match(/([\+\-]?)(\w+)\s+\[(\w+)(.)\]/);
      if (varr && varr.length >=5) {
        if (what == 'sign') {
          out = (varr[1] == '+') ? 'Yang' : 'Yin';
        }
        else if (what == 'type') {
          out = varr[2];
        }
        else if (what == 'pinyin') {
          out = varr[3];
        }
        else if (what == 'char') {
          out = varr[4];
        }
      }

      return out;
    };
  });

})();

