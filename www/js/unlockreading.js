
  /*                          */
  // page: unlockreadings.html
  /*                          */
  app.controller('unlockreadingsCtrl', ['$scope',  'gApp', function($scope, gApp) {

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

        store.when( "product" ).finished(function(product) {
          console.log( "finished " + product.id );
          //product.finish();
        });

        store.when( "product" ).loaded( function(product) {
          console.log( "Loaded " + product.id );



          if ( ++gApp.loadedCount == 101 ) {
            $(".blackScreen").hide();
          }

          console.log( gApp.loadedCount );
        });
        store.error( function( e ) {
            alert( "Can't load store." );
            $(".prodpending").hide();


            if ( e.code == store.ERR_SETUP ) {
              app.navi.resetToPage('home.html', {animation : 'slide'});
            }
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

    $scope.isOnline = function() {
      var type = navigator.connection.type;

      return (type != Connection.NONE && type != Connection.UNKNOWN);
    };

    $scope.onRefresh = function() {
      if (!$scope.isOnline()) {

        try {
          gApp.itemOwned = JSON.parse(window.localStorage["itemOwned"]);
        }
        catch (exp) {
          //alert("!");
        }

        gApp.loadedCount = 101;
        $(".blackScreen").hide();

        // Bought all items already.......
        if (window.localStorage[ "boughtAll" ] == 1) {
          gApp.boughtAll = true;

          alert("You've already purchased all life readings. Any life readings are now available to read offline.");

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

      $(".prodpending").show();

      if ( gApp.loadedCount >= 101 ) {
        $(".blackScreen").hide();
      }
      //$(".prod-state").removeClass("ion-load-d").addClass("ion-locked locked").removeClass("ion-unlocked unlocked");

      var buyAll = store.get("com.fsrc.destinystars.allreading");

      if ( gApp.boughtAll || buyAll.owned ) {
        $(".prodpending").hide();
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


      var id = "com.fsrc.destinystars.lr__" + index;
      var prod = store.get( id );

      if ( typeof( prod ) == "undefined" )
        return;

      //alert( prod.id + "  " + prod.state + " " + prod.canPurchase + " " + prod.alias );



      // Can purchase..
      if ( prod.canPurchase && !gApp.boughtAll ) {
        store.order( id );
        $(".prodpending").show();

      } else if ( prod.owned || gApp.boughtAll ) {
        app.navi.resetToPage( 'lifereadings.html', { animation : 'slide', numeral: index + 1 } );
      }
    };

    $scope.gotoPage = app.gotoPage;

    //$scope.init();

  }]);
