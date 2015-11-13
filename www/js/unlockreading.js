
/*                          */
// page: unlockreadings.html
/*                          */
app.controller('unlockreadingsCtrl', ['$scope', 'gApp', function ($scope, gApp) {
    $scope.gotoPage = gApp.gotoPage;
    
    $scope.isOnline = function() {
        var networkState = navigator.connection.type;
        return (networkState != "unknown" && networkState != "none");
    };

    $scope.init = function () {
        $(".description").hide();
        $(".blackScreen").hide();
        return;

        iapmanager.init(function (arg) {
            // Succeed init store........
            $scope.listProducts();


        }, function (arg) {
            // Failed to init store.....
            //$scope.listProducts();
        });

    };

    $scope.updateProduct = function (index, state) {
        var item = $(".prod-state.icon_" + index.toString());
        var cell = item.closest(".col");

        //Purchased already.......
        if (state == 2) {
            item.removeClass("locked").removeClass("unlocked");
            item.removeClass("ion-locked").removeClass("ion-unlocked");
            cell.removeClass("locked").removeClass("unlocked");

            item.attr("spin", false);

            item.addClass("ion-unlocked");
            cell.addClass("unlocked");
        } else if (state == 1) {
            item.attr("spin", false);

            item.addClass("ion-locked");
            cell.addClass("locked");
        }
    }

    $scope.listProducts = function () {
        iapmanager.listProducts(function (arg) {
            var counter = 0;
            gApp.products = arg;


            // List products.....
            for (var i in arg) {
                var id = arg[i].id;
                var index = parseInt(id.substr(id.lastIndexOf("_") + 1));

                // Bought all of them already......
                if (id == "com.fsrc.destinystars.allreading" && arg[i].state == 2) {
                    $scope.makeAsBoughtAll();
                    break;
                }

                $scope.updateProduct(index, arg[i].state);
            }

            $(".blackScreen").hide();

            if (!$scope.isOnline()) {
                alert("Your phone is offline now and you need to go online to purchase life readings. Any life readings you have already purchased are now available to read offline.");
                $(".description").hide();
                //return;
            } else {
                $(".description").show();
            }

        }, function (arg) {
            alert("Err " + arg);
        });
    };

    $scope.unlockAll = function () {
        console.log("================ Unlocking all items ===================");

        for (var i = 0; i < 100; i++) {
            var item = $(".prod-state.icon_" + i.toString());
            var cell = item.closest(".col");

            item.removeClass("locked").removeClass("unlocked");
            item.removeClass("ion-locked").removeClass("ion-unlocked");
            cell.removeClass("locked").removeClass("unlocked");

            item.addClass("ion-unlocked");
            cell.addClass("unlocked");
        }

        $(".description").hide();
    }

    $scope.isBoughtAll = function () {
        var prod = window.iapManager.getBuyAllProd();

        if (typeof (prod) != "undefined") {

        }
        else {
            if (prod.owned) return true;
        }

        return false;
    }

    $scope.isRightDN = function (index) {
        return (index + 1 === gApp.fp_result.dn);
        //return window.iapManager.getProd( index ).canPurchase;
    };

    $scope.onRefresh = function () {
        $(".blackScreen").show();

        $scope.listProducts();
    };

    $scope.makeAsBoughtAll = function () {
        gApp.boughtAll = true;

        for (var i in gApp.products) {
            var id = gApp.products[i].id;
            var index = parseInt(id.substr(id.lastIndexOf("_") + 1));

            $scope.updateProduct(i, gApp.products[i].state = 2);
        }

        $(".description").hide();
    }

    $scope.onClickBuyAll = function () {
        var id = "com.fsrc.destinystars.allreading";

        iapmanager.purchaseProduct(function (arg) {
            //alert("Succeed " + arg);

            //$scope.makeAsBoughtAll();
            $scope.listProducts();
        }, function (arg) {
            //alert("Error " + arg);
            //$scope.makeAsBoughtAll();
            $scope.listProducts();
        }, id);


    };



    $scope.onClickProd = function (index) {
        app.navi.resetToPage('lifereadings.html', { animation: 'slide', numeral: 11 });
        return;

        if (gApp.boughtAll) {
            app.navi.resetToPage('lifereadings.html', { animation: 'slide', numeral: index + 1 });
            return;
        }

        var id = "com.fsrc.destinystars.lr__" + index;
        var prod;

        for (var i in gApp.products) {
            prod = gApp.products[i];

            if (prod.id == id) {
                if (prod.state == 2) {
                    app.navi.resetToPage('lifereadings.html', { animation: 'slide', numeral: index + 1 });
                    return;
                } else {
                    break;
                }

            }
        }

        if (!$scope.isOnline()) {
            alert("Your phone is offline now and you need to go online to purchase life readings.");
            return;
        }

        iapmanager.purchaseProduct(function (arg) {
            alert("Succeed " + arg);
            //$scope.updateProduct(index, prod.state = 2);
            $scope.listProducts();
        }, function (arg) {
            //alert("Error " + arg);
            $scope.listProducts();
        }, id);
    };

    $scope.init();
}]);