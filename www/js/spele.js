
app.controller('speleCtrl', ['$scope', 'gApp', '$rootScope', 'FourPillarCalc', function ($scope, gApp, $rootScope, FPCalc) {
    $scope.init = function () {
        $scope.ret = gApp.fp_result;

    };


    $scope.getClass = function (unit, mode) {
        if ($scope.mode == mode && $scope.unit == unit) {
            return "selected-chart";
        }

        return "";
    };

    $scope.onClickStem = function (index, mode) {
        $scope.mode = mode;
        $scope.unit = index;

        var xs = "";
        var arrDS = $scope.ret.fpc[1].stem.match(/([\+\-]?)(\w+)\s+\[(\w+)(.)\]/);

        var DS = arrDS[3];

        if (mode == "stem")
            xs = $scope.ret.fpc[index].stem;
        else if (mode == "branch")
            xs = $scope.ret.fpc[index].branch;

        var arrValues = xs.match(/([\+\-]?)(\w+)\s+\[(\w+)(.)\]/);

        var arrDSValues = $scope.ret.fpc[index].stem.match(/([\+\-]?)(\w+)\s+\[(\w+)(.)\]/);

        var dsPinyin = arrDSValues[3];

        var sign = arrValues[1];
        var type = arrValues[2];
        var pinyin = arrValues[3];

        var key = arrValues[1] + arrValues[2];

        $scope.type = type;

        var data = gApp.json.spele[DS];

        if ($scope.mode == "stem") {
            /*
                User selected day stem..........

                DAY STEM
            */
            if ($scope.unit == 1)
                $scope.desc = data["DS"] + gApp.json.spele["DS_Footer"];
            /*
                User selected hour, year, month stem.....


            */
            else {
                $scope.typeDesc = data["HS"][type][0];

                $scope.typeLabel = (sign == "+" ? "Yang " : "Yin ") + arrValues[2] + " " + arrValues[3] + "(" + arrValues[4] + ")";
                $scope.desc = sign == "+" ? data["HS"][type][1] : data["HS"][type][2];
            }
        }
        else if ($scope.mode == "branch") {
            $scope.desc = data["BR"][type];
        }
    };

    $scope.onClose = function () {
        gApp.gotoPage("analyse");
    };
}]);
