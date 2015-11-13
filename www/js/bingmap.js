app.controller('bingmapCtrl', ['$scope', 'gApp', 'FourPillarCalc', function ($scope, gApp, FPCalc) {
    $scope.init = function () {
        $("#back").hide();

        if (typeof (Microsoft) == "undefined") {
            $.getScript('https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&s=1', function () {
                //alert(Microsoft.Maps.Location);
                
                setTimeout(function() {
                    $scope.createMap();
                }, 1000);

                clearInterval($scope.scriptTimeout);
                $(".blackScreen").hide();
            });

            $scope.scriptTimeout = setTimeout(function () {
                alert("Connection time out. Map won't be loaded at this time. Please try again later.");
                $scope.onClose();
            }, 10000);
        }
        else {
            $(".blackScreen").hide();
            $scope.createMap();
        }
    };

    $scope.createMap = function () {
        var loc = new Microsoft.Maps.Location(58.995311, -103.535156)
        var mapOptions = {
            credentials: 'AsZTf61DrVoAi51wJMGBykJ-BJYU-lp3yyhSLyyLQ_guxehHmFFHOAHnda52WIhg',
            center: loc,
            zoom: 3,
            mapTypeId: Microsoft.Maps.MapTypeId.road
        }

        gApp.map = new Microsoft.Maps.Map(document.getElementById("map-container"), mapOptions);

        gApp.pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(0, 0), { 'draggable': false });
        gApp.pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { title: 'Pin position info.', visible: false });

        gApp.map.entities.push(gApp.pin);
        gApp.map.entities.push(gApp.pinInfobox);

        Microsoft.Maps.Events.addHandler(gApp.map, 'click', $scope.getLatlng);

        $("#back").show();
    };

    $scope.onClose = function () {
        gApp.gotoPage('fpcalc');
    };

    $scope.getLatlng = function (e) {
        if (e.targetType == "map") {
            var point = new Microsoft.Maps.Point(e.getX(), e.getY());
            var locTemp = e.target.tryPixelToLocation(point);
            var location = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);

            gApp.pin.setLocation(location);
            gApp.pinInfobox.setLocation(location);

        }
        else if (e.targetType == "pushpin") {
            var pinLoc = e.target.getLocation();
        }
    }

    $scope.onClickOK = function () {
        gApp.myLocation = gApp.pin.getLocation();

        $scope.onClose();
    };

    $scope.init();
}]);