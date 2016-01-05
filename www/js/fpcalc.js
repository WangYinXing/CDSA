/*                    */
// page: fpcalc.html
/*                    */




var offlineMsg = "Your phone is offline now. Would you make sure your phone is online? When offline you can enter timezone and longitude manually to compute chart.";


app.controller('fpcalcCtrl', ['$scope', 'gApp', 'FourPillarCalc', function ($scope, gApp, FPCalc) {

    gApp.fp_result = $scope.ret = {};

    $.ajaxSetup({ cache: false });


    $scope.init = function () {
       for (var i in gApp.json.timezones) {
            var item = gApp.json.timezones[i];

            $('#timezone').append($('<option>', {
                value: item.value,
                text: item.text
            }));
        }

        //$("#lng").val("0.0");
      $("#dtBox").DateTimePicker();

        $("#datepicker").datebox();
        $("#timepicker").datebox();

        $("#datepicker").datebox('setTheDate', new Date());
        $("#timepicker").datebox('setTheDate', new Date());

        $(".ui-icon-clock").addClass("afterBtn");
        $(".ui-icon-calendar").addClass("afterBtn");

        $('#recordName').blur(function(evt) {
            // Check validation here?
            gApp.record.name = $("#recordName").val();
        });

        $('#lng').blur(function () {
            var lng = parseFloat($(this).val());

            if (isNaN(lng)) {
                alert("Please input longitude correctly. ie: -120.425");
                $(this).focus();
                $(this).val("0.0");
                return;
            }

            if (lng < -180.0 || lng > 180) {
                alert("Longitude should be in -180.0 ~ 180.0");
                $(this).focus();
                $(this).val("0.0");
                return;
            }
        });



        /******************************************************************************************************
            Load record.......
        *******************************************************************************************************/
        if (typeof(gApp.record) == "undefined") {
            gApp.record = {};
            gApp.record.name = "New record";
            gApp.record.timeZone = "0";
            gApp.record.lng = 0.0;
            gApp.record.date = new Date();
            gApp.record.time = new Date();
            gApp.record.gender = "1";
        }
        else {

        }

        $scope.updateUIFromRecord();

        if (typeof (gApp.myLocation) != "undefined" && gApp.myLocation != null) {
            updateTimeZoneFromPosition(gApp.myLocation.latitude, gApp.myLocation.longitude);

            gApp.myLocation = null;
        } else {
            $(".blackScreen").hide();

        }

        gApp.showLoadingScreen(false);
    };

    $scope.updateUIFromRecord = function() {
        $("#recordName").val(gApp.record.name);
        $("#lng").val(gApp.record.lng);
        $("#timezone").val( gApp.record.timeZone );

        $("#datepicker").datebox('setTheDate', new Date(gApp.record.date));
        $("#timepicker").datebox('setTheDate', new Date(gApp.record.time));

        $scope.BBB = gApp.record.gender;
        $scope.dst = gApp.record.dst;
    }

    function onError(error) {
        clearInterval(gApp.timeout);

        alert("Geolocation service failed. Status is " + 'code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        $(".blackScreen").hide();
    }

    function onSuccess(position) {
        clearInterval(gApp.timeout);

        updateTimeZoneFromPosition(position.coords.latitude, position.coords.longitude);
        //$(".blackScreen").hide();
    }

    function updateTimeZoneFromPosition(lat, lng) {
        $(".blackScreen").show();

        $("#lng").val(gApp.record.lng = lng.toFixed(2));

        $.ajax({
            url: "http://api.timezonedb.com/?key=SGAMR7ZV3RTU&lat=" + lat + "&lng=" + lng + "&format=json",
            //dataType: 'HTML',
            complete: function (r) {
                //alert(r.response);
            },
            success: function (data) {
                if (typeof (data.zoneName) == "undefined") {
                    alert("Can't fetch time-zone db from remote server. Please check your internet connection.");
                    $(".blackScreen").hide();

                    return;
                }

                var gmt = data.gmtOffset / 3600.0 - data.dst;

                for (var i in gApp.json.timezones) {
                    var item = gApp.json.timezones[i];

                    if (parseFloat(item.value) == gmt) {
                        $("#timezone").val(gApp.record.timeZone = item.value);
                    }
                }

                $(".blackScreen").hide();
            },
            error: function (xhr, textStatus, errorThrown) {
                $(".blackScreen").hide();

                alert("Geolocation service failed. Status is " + textStatus);
            }
        });
    }


    // Timezone
    $scope.ITZ = '0';
    $scope.timezone = gApp.json.timezones[0].text;
    $scope.chooseTimezone = function () {

    };

    // Longitude
    $scope.longi = 0;
    $scope.longi_we = '+';
    $scope.toggleLongiWE = function () {
        $scope.longi_we = ($scope.longi_we === '+' ? '-' : '+');
    };


    // DateTime
    $scope.date = new Date();
    $scope.time = new Date();
    $scope.chooseDateTime = function (mode) {

    };

    // Gender
    $scope.BBB = "1";

    $scope.onOpen = function (openMode) {
        gApp.openMode = openMode;

        /*****************************************************************************************************************************
            Save current record.
        *****************************************************************************************************************************/
        if (openMode == 1) {
            gApp.record = {};

            gApp.record.name = $("#recordName").val();

            gApp.record.timeZone = $("#timezone").val();

            gApp.record.lng = $("#lng").val();

            gApp.record.date = $("#datepicker").datebox('getTheDate');
            gApp.record.time = $("#timepicker").datebox('getTheDate');

            gApp.record.gender = $scope.BBB;
            gApp.record.dst = $scope.dst;
        }

        gApp.gotoPage("saveload");
    }

    $scope.showMap = function () {
        var networkState = navigator.connection.type;

        if (networkState == "unknown" || networkState == "none") {
            alert(offlineMsg);
            return;
        }

        gApp.gotoPage('bingmap');
    };

    $scope.setFromCurrentPos = function () {
        if (typeof (navigator.geolocation) == "undefined") {
            alert("Geolocation plugin is not installed.");
            return;
        }

        var networkState = navigator.connection.type;

        if (networkState == "unknown" || networkState == "none") {
            alert(offlineMsg);
            return;
        }

        $(".blackScreen").show();



        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);

        gApp.timeout = setTimeout(function () {
            alert("Geolocation service time out. Would you make sure your phone is online?");
            $(".blackScreen").hide();
        }, 10000);
    };

    // Compute
    $scope.compute = function () {
        $scope.date = $("#datepicker").datebox('getTheDate');
        $scope.time = $("#timepicker").datebox('getTheDate');
        $scope.ITZ = $("#timezone").val();
        $scope.longi = parseFloat($("#lng").val());

        if (isNaN($scope.longi)) {
            alert("Please input longitude correctly. ie: -120.425");
            $("#lng").focus();
            $("#lng").val("0.0");
            return;
        }

        if ($scope.longi < -180.0 || $scope.longi > 180) {
            alert("Longitude should be in -180.0 ~ 180.0");
            $("#lng").focus();
            $("#lng").val("0.0");
            return;
        }


        var date = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(),
            $scope.time.getHours(), $scope.time.getMinutes(), $scope.time.getSeconds(), 0);


        if ($scope.dst == 1) {
            date = moment(date).subtract(1, 'hours').toDate();
        }


        //gApp.fp_result = $scope.ret = FPCalc.compute(parseFloat($scope.ITZ), date, parseInt($scope.BBB), longi * ($scope.longi_we === '+' ? 1 : (-1)), $scope.dst);
        gApp.fp_result = $scope.ret = FPCalc.compute(parseFloat($scope.ITZ), date, parseInt($scope.BBB), $scope.longi, $scope.dst);
    };

    $scope.gotoPage = gApp.gotoPage;

    $scope.gotoGetReading = function (num) {
        if (gApp.fp_result.dn) {
            gApp.gotoPage('unlockreadings');
        }
    };

    $scope.gotoYearStar = function () {
        if (angular.isDefined(gApp.fp_result.ys)) {
            app.navi.pushPage('yearstar.html');
        }
        else {
            ons.notification.alert({
                title: 'Read This Note',
                message: 'To see the Year Star, please enter birth data and hit compute button first.'
            });
        }
    };

}]);
