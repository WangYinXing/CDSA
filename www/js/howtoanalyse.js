app.controller('analyseCtrl', ['$scope', 'gApp', 'FourPillarCalc', function ($scope, gApp, FPCalc) {
    $scope.init = function () {
        $scope.gotoPage = gApp.gotoPage;
    };

    $scope.onClose = function () {
        gApp.gotoPage("fpcalc");
    };
}]);