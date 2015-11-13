app.controller('saveloadCtrl', ['$scope', 'gApp', 'FourPillarCalc', function ($scope, gApp, FPCalc) {
    $scope.init = function () {

        // Open
        if (gApp.openMode == 0) {
            //$(".action-caption").text("Open");
            $('#toolbar').hide();
            $("#title").text("Open record.");
        }
        // Save
        else if (gApp.openMode == 1) {
            $(".action-caption").text("Save");
            $("#title").text("Save record.");

            $("#name").val(gApp.record.name);
        }
        // Delete
        else if (gApp.openMode == 2) {
            $('#toolbar').hide();
            $("#title").text("Delete record.");
        }
        /*
            Reading local storage.........
        */
        gApp.records = [];

        if (typeof (window.localStorage["records"]) != "undefined")
            $scope.items = gApp.records = JSON.parse(window.localStorage["records"]);

    };

    $scope.onClickItem = function (index) {
        var record;

        if (gApp.openMode == 0) {
            record = gApp.records[index];

            if (typeof (record) == "undefined") {
                alert("Couldn't load selected record.");
                return;
            }

            gApp.record = record;            
        }
        // Save......
        else if (gApp.openMode == 1) {
            if (!confirm("Are you sure want to overwrite on this record?"))
                return;

            // Replace name......
            gApp.record.name = gApp.records[index].name;

            gApp.records[ index ] = gApp.record;

            window.localStorage["records"] = JSON.stringify(gApp.records);


            alert("Record saved.");
        }
        // Delete
        else if (gApp.openMode == 2) {
            if (!confirm("Are you sure want to delete this record?", "asdasd"))
                return;
            
            gApp.records.splice(index, 1);

            

            window.localStorage["records"] = JSON.stringify(gApp.records);
            gApp.record = undefined;

            alert("Record deleted.");
        }

        $scope.onClose();
    };

    $scope.onSave = function () {
        var existingItem = -1;
        // Saving.........
        if (typeof (gApp.record) == "undefined") {
            alert("Record is not valid.");
            $scope.onClose();
            return;
        }

        var name = $('#name').val();

        if (name == "") {
            alert("Please input name.");
            return;
        }
        else {
            for (var i in gApp.records) {
                if (gApp.records[i].name == name) {
                    if (!confirm("The name you entered is used to another record. Do you want to overwrite it?"))
                        return;

                    existingItem = i;
                    break;
                }

            }
        }

        gApp.record.name = $('#name').val();
        
        if (existingItem == -1)
            gApp.records.push(gApp.record);
        else
            gApp.records[existingItem] = gApp.record;

        window.localStorage["records"] = JSON.stringify(gApp.records);

        $scope.onClose();
    };

    $scope.onClose = function () {
        gApp.gotoPage("fpcalc");
    };

    $scope.onClickDel = function () {
        
    };
    
    $scope.init();
}]);