 var commentaryTesting = false;


 /*                          */
  // page: unlockreadings.html
  /*                          */
 app.controller('unlockreadingsCtrl', ['$scope', 'gApp', function ($scope, gApp) {
     $scope.gotoPage = gApp.gotoPage;


    if (commentaryTesting) {
      //platform = "win32nt";
    }
    else {
      //platform = device.platform.toLowerCase();
    }


/*##########################################################################################

    Check if the connection is valid or not....

##########################################################################################*/
    $scope.isOnline = function () {
        var type = navigator.network.connection.type;
        return (type != Connection.NONE && type != Connection.UNKNOWN);
    }
    
/*######################################################################################################################################################################################
######################################################################################################################################################################################

  This part is used for windows Phone....

######################################################################################################################################################################################
######################################################################################################################################################################################*/
      //if (platform == "win32nt") {
    if (window.platform == "wp") {
        $scope.init = function () {
        /*_______________________________________________________________________________________________

        This is temp code for reading test......
        */
        if (commentaryTesting) {
          $scope.makeAsBoughtAll();
          $(".blackScreen").hide();
          //$(".prodpending").hide();
          return;
        }
        /*

        ------------------------------------------------------------------------------------------------*/


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
                if (id == "com.fsrc.destinystars.allreadings" && arg[i].state == 2) {
                    $scope.makeAsBoughtAll();
                    break;
                }

                $scope.updateProduct(index, arg[i].state);
            }

            $(".blackScreen").hide();
            $(".prodpending").hide();

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
        var id = "com.fsrc.destinystars.allreadings";

        $(".prodpending").show();
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
        $(".prodpending").show();

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

        $(".prodpending").show();

        iapmanager.purchaseProduct(function (arg) {
            alert("Succeed " + arg);
            //$scope.updateProduct(index, prod.state = 2);
            $scope.listProducts();
        }, function (arg) {
            //alert("Error " + arg);
            $scope.listProducts();
        }, id);
      };

    }

    

/*######################################################################################################################################################################################
######################################################################################################################################################################################

  This part is used for ios and android...

######################################################################################################################################################################################
######################################################################################################################################################################################*/

     //else if (platform == "ios" || platform == "android") {
     else {
      /*##########################################################################################
        Initial function.....
      ##########################################################################################*/
      $scope.init = function() {
          $(".prodpending").hide();
          if ( typeof( gApp.initialized ) == "undefined" || !gApp.initialized ) {
              gApp.loadedCount = 0;
              gApp.itemOwned = [];

              for ( var i=0; i<101; i++ ) {
                  store.register({
                             id:    "com.fsrc.destinystars.lr__" + i,
                             alias: "jia jia",
                             type:  store.NON_CONSUMABLE
                             });
              }

          gApp.boughtAll = false;

          store.register({
                         id:    "com.fsrc.destinystars.allreading",
                         alias: "All 100 Readings",
                         type:  store.NON_CONSUMABLE
                         });

          store.when( "product" ).cancelled(function(product) {
            $(".prodpending").hide();
          });

          store.when( "product" ).owned(function(product) {
            $(".prodpending").hide();
          });

          store.when( "product" ).error(function(product) {
            $(".prodpending").hide();
          });

          store.when( "product" ).updated(function(product) {
            console.log( "updated " + product.id + "  " + product.state );


            if ( "com.fsrc.destinystars.allreading" == product.id && product.owned ) {
              gApp.boughtAll = true;
              //$scope.onRefresh();
              $scope.unlockAll();

              window.localStorage[ "boughtAll" ] = 1;

              return;
            }

            $scope.updateProduct( product );
          });

          store.when( "product" ).approved(function(product) {
            console.log( "approved " + product.id );
            product.finish();
          });

          store.when( "product" ).loaded( function(product) {
            console.log( "Loaded " + product.id );

            if ( ++gApp.loadedCount == 101 ) {
              $(".blackScreen").hide();
            }

            console.log( gApp.loadedCount );
          });


          store.error( function( e ) {
              //alert( "Error :" + e.code + " : " + e.message );

              console.log( store.ERR_LOAD );
              console.log(e.code);

              $(".prodpending").hide();

              //if ( e.code == store.ERR_LOAD ) {
              app.navi.resetToPage('home.html', {animation : 'slide'});
              //}
          });
          store.ready(function() {
            //alert("Restore completed.")
            //$(".blackScreen").hide();
            store.onFinish = function() { $(".blackScreen").hide(); }
            console.log( "Store is ready now *******************************************" );
          });


          gApp.initialized = true;
        }
        

  //      $scope.onRefresh();
        
        setTimeout( function() {
          $scope.onRefresh();
        }, 1000 );
        
      };

      $scope.unlockAll = function() {
        console.log( "================ Unlocking all items ===================" );
        for ( var i=0; i<100; i++ ) {
          var item = $( ".prod-state.icon_" + i.toString() );
          var cell = item.closest( ".col" );

          item.removeClass("locked").removeClass("unlocked");
          item.removeClass("ion-locked").removeClass("ion-unlocked");
          cell.removeClass("locked").removeClass("unlocked");

          item.addClass("ion-unlocked");
          cell.addClass("unlocked");
        }

        $(".description").hide();
      }

      $scope.updateProduct = function( product ) {
        var id = product.id;
        //product.finish();

        if ( product.type == store.NON_CONSUMABLE )
        {
          var index = parseInt( id.substr( id.lastIndexOf("_") + 1) );

          if ( !isNaN( index ) && index != null ) {
            var item = $( ".prod-state.icon_" + index.toString() );
            var cell = item.closest( ".col" );

            item.removeClass("locked").removeClass("unlocked");

            item.removeClass("ion-locked").removeClass("ion-unlocked");

            cell.removeClass("locked").removeClass("unlocked");

            if ( gApp.boughtAll ) {
              item.addClass("ion-unlocked");
              cell.addClass("unlocked");

              return;
            }


            if (!product) {
              item.addClass("ion-load-d");
            }
            else if (product.state === store.REGISTERED) {
              item.addClass("ion-load-d");
            }
            else if (product.state === store.INVALID) {
              item.addClass("ion-load-d");
            }
            else {
              if ( product.owned ) {
                item.addClass("ion-unlocked");
                cell.addClass("unlocked");

                var isAdded = false;

                for (var i in gApp.itemOwned) {
                  if (gApp.itemOwned[ i ] == index)
                    isAdded = true;
                }

                if (!isAdded)
                  gApp.itemOwned.push(index);

                // Now update local storage...
                window.localStorage["itemOwned"] = JSON.stringify(gApp.itemOwned);

                console.log(window.localStorage["itemOwned"]);
              }
              else if    ( product.canPurchase ) {
                item.addClass("ion-locked");
                cell.addClass("locked");
              }
            }
          }
        }
      };
      
      $scope.isRightDN = function( index ) {
          return (index + 1 === gApp.fp_result.dn);
          //return window.iapManager.getProd( index ).canPurchase;
      };

      $scope.isBoughtAll = function() {
        var prod = window.iapManager.getBuyAllProd();

        if ( typeof(prod) != "undefined" ) {

        }
        else {
          if ( prod.owned )                     return true;
        }

        return false;
      }

      $scope.isLocked = function( index ) {
        var prod = window.iapManager.getProd( index );

        if ( typeof(prod) != "undefined" ) {
          if ( prod.owned )                     return false;
          else if ( prod.canPurchase )          return true;
        }

        return true;
      }

      $scope.getStatusIcon = function( index ) {
        var prod = window.iapManager.getProd( index );

        if ( typeof(prod) != "undefined" ) {
          if ( prod.owned )                     return "ion-unlocked unlocked";
          else if ( prod.canPurchase )          return "ion-locked locked";        
        }

        return "ion-load-d";
      };


      


      /*##########################################################################################

          The function that is called when user click refresh button....

      ##########################################################################################*/
      $scope.onRefresh = function() {
        if (!$scope.isOnline()) {
          //alert("Your phone is offline now. you can't purchase products until your phone is online.");

          try {
            gApp.itemOwned = JSON.parse(window.localStorage["itemOwned"]);
          } catch(e) {

          }
          

          gApp.loadedCount = 101;
          $(".blackScreen").hide();

          // Bought all items already.......
          if (window.localStorage[ "boughtAll" ] == 1) {
            gApp.boughtAll = true;

            alert("You've already purchased all life readings. Any life readings are available to read offline.");

            $scope.unlockAll();

            return;
          }

          if(gApp.itemOwned.length) {
            alert("Your phone is offline now and you need to go online to purchase life readings. Any life readings you have already purchased are now available to read offline.");
          }
          else {
            alert("Your phone is offline now and you need to go online to purchase life readings.");
          }

          $(".description").hide();

          for (var i in gApp.itemOwned) {
            var index = gApp.itemOwned[ i ];

            var item = $( ".prod-state.icon_" + index.toString() );
            var cell = item.closest( ".col" );

            item.removeClass("locked").removeClass("unlocked");

            item.removeClass("ion-locked").removeClass("ion-unlocked");

            cell.removeClass("locked").removeClass("unlocked");


            item.addClass("ion-unlocked");
            cell.addClass("unlocked");
          }

          return;
        }

        $(".description").show();


        if ( gApp.loadedCount >= 101 ) {
          $(".blackScreen").hide();
        }
        //$(".prod-state").removeClass("ion-load-d").addClass("ion-locked locked").removeClass("ion-unlocked unlocked");

        var buyAll = store.get("com.fsrc.destinystars.allreading");

        if ( gApp.boughtAll || buyAll.owned ) {
          $(".description").hide();
          gApp.boughtAll = true;
        }
        
        for ( var i=0; i<100; i++ ) {
          var prod = store.get("com.fsrc.destinystars.lr__" + i);

          //prod.owned = buyAll.owned | prod.owned;
          //prod. = buyAll.owned | prod.owned;

          $scope.updateProduct( prod );
        }

        store.refresh();

        console.log( "====================== Refreshing now ===========================" );


      };

      $scope.onClickBuyAll = function() {
        var id = "com.fsrc.destinystars.allreading";
        var prod = store.get( "com.fsrc.destinystars.allreading" );

        if ( typeof( prod ) == "undefined" )
          return;

        // Can purchase..
        if ( prod.canPurchase ) {
          store.order( id );
          $(".prodpending").show();
        } else if ( prod.owned ) {
          //app.navi.resetToPage( 'lifereadings.html', { animation : 'slide', numeral: index + 1 } );
        }
      };

      $scope.onClickProd = function( index ) {
        if (!$scope.isOnline()) {
          if (gApp.boughtAll) {
            app.navi.resetToPage( 'lifereadings.html', { animation : 'slide', numeral: index + 1 } );
            return;
          }


          for (var i in gApp.itemOwned) {
            if ( gApp.itemOwned[ i ] == index ) {
              app.navi.resetToPage( 'lifereadings.html', { animation : 'slide', numeral: index + 1 } );
              return;
            }
          }

          alert("Your phone is offline now and you need to go online to purchase life readings.");

          return;
        }

        var id = "com.fsrc.destinystars.lr__" + index;
        var prod = store.get( id );

        if ( typeof( prod ) == "undefined" )
          return;

        // Can purchase..
        if ( prod.canPurchase && !gApp.boughtAll ) {
          store.order( id );
          $(".prodpending").show();
        } else if ( prod.owned || gApp.boughtAll ) {
          app.navi.resetToPage( 'lifereadings.html', { animation : 'slide', numeral: index + 1 } );
        }
      };
    }

  }]);