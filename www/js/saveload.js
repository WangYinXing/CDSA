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

    $scope.onClickItem = function (item) {
        var record;
      var index = gApp.records.indexOf(item);

        if (gApp.openMode == 0) {
            record = gApp.records[index];

            if (typeof (record) == "undefined") {
                alert("Couldn't load selected record.");
                return;
            }

            gApp.record = record;

          $scope.onClose();
        }
        // Save......
        else if (gApp.openMode == 1) {
            confirm("Are you sure want to overwrite on this record?", function(ret) {
              if (ret == 0)
                return;


              // Replace name......
              gApp.record.name = gApp.records[index].name;

              gApp.records[ index ] = gApp.record;

              window.localStorage["records"] = JSON.stringify(gApp.records);


              alert("Record saved.");

              $scope.onClose();
            });
        }
        // Delete
        else if (gApp.openMode == 2) {
            confirm("Are you sure want to delete this record?", function(ret) {
              if (ret == 0)
                return;

                gApp.records.splice(index, 1);

                window.localStorage["records"] = JSON.stringify(gApp.records);
                gApp.record = undefined;

                alert("Record deleted.");

                $scope.onClose();
            });
        }


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
                  existingItem = i;

                  confirm("The name you entered is used to another record. Do you want to overwrite it?", function(ret) {
                    if (ret == 0)
                      return;

                    $scope.save(existingItem);
                  });

                  return;
                }

            }
        }

      $scope.save(-1);
    };

  $scope.save = function(existingItem) {
    gApp.record.name = $('#name').val();

    if (existingItem == -1)
      gApp.records.push(gApp.record);
    else
      gApp.records[existingItem] = gApp.record;

    alert("Record saved.");

    window.localStorage["records"] = JSON.stringify(gApp.records);

    $scope.onClose();
  }

    $scope.onClose = function () {
        gApp.gotoPage("fpcalc");
    };

    $scope.onClickDel = function () {

    };

    $scope.init();
}]);
