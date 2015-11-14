/*                          */
// page: yearstar.html
/*                          */
app.controller('yearstarCtrl', ['$scope', 'gApp', function($scope, gApp) {
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