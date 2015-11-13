


window.iapManager = {};



/*
    -2 : Not available item
    -1 :
*/


window.iapManager.getBuyAllProd = function() {
    var prodInfo = {};
    
    var prod = store.get( "com.fsrc.destinystars.allreading" );
    //
    if ( !prod ) {
        return undefined;
    }
    else if (prod.state === store.INVALID) {
        return undefined;
    }

    return prod;
}


window.iapManager.getProd = function( index ) {
    var prodInfo = {};
    
    var prod = store.get( "com.fsrc.destinystars.lr__" + index.toString() );
    //
    if ( !prod ) {
        return undefined;
    }
    else if (prod.state === store.INVALID) {
        return undefined;
    }

    return prod;
}

window.iapManager.purchase = function( index ) {
    var id = "com.fsrc.destinystars.lr__" + index.toString();
    
    store.order( id );
}

window.iapManager.purchaseBuyAll = function() {
    var id = "com.fsrc.destinystars.allreading";
    
    store.order( id );
}





// We must wait for the "deviceready" event to fire
// before we can use the store object.
document.addEventListener('deviceready', initializeStore, false);


function verifyProducts() {
    for ( var i=0; i<100; i++ ) {
        var id = "com.fsrc.destinystars.lr__" + i.toString();
        store.when( id ).approved(function(product) {
            //product.finish();
        });
    }
}


function updateItems() {
    var item = store.get("com.fsrc.destinystars.lr__0");
    
    var $el = $(document);
    
    if (!item) {
        //$el.html("");
        //alert("No item");
    }
    else if (item.state === store.REGISTERED) {
        //$el.html("<div class=\"loading\" />");
        alert("Loading..");
    }
    else if (item.state === store.INVALID) {
        //$el.html("");
        alert("Item is not valid");
    }
    else {
        // Good! Product loaded and valid.
        $el.html(
                 "<div class=\"title\">"       + item.title       + "</div>"
                 + "<div class=\"description\">" + item.description + "</div>"
                 + "<div class=\"price\">"       + item.price       + "</div>"
                 );
        
        
        // Is this product owned? Give him a special class.
        if (item.owned)
            $el.addClass("owned");
        else
            $el.removeClass("owned");
        
        // Is an order for this product in progress? Can't be ordered right now?
        if (item.canPurchase)
            $el.addClass("can-purchase");
        else
            $el.removeClass("can-purchase");
    }
}

function initializeStore() {
    // Let's set a pretty high verbosity level, so that we see a lot of stuff
    // in the console (reassuring us that something is happening).
    return;
    store.verbosity = store.INFO;
    
    // We register a dummy product. It's ok, it shouldn't
    // prevent the store "ready" event from firing.


   
    
    
    // Refresh store
    //store.refresh();
    
    
    
    
    // When every goes as expected, it's time to celebrate!
    // The "ready" event should be welcomed with music and fireworks,
    // go ask your boss about it! (just in case)
    //store.ready(function() {
        //console.log("\\o/ ##################################### STORE READY \\o/");
        //verifyProducts();
    //});
    
    // After we've done our setup, we tell the store to do
    // it's first refresh. Nothing will happen if we do not call store.refresh()
    //store.refresh();
}


/*

store.validator = "http://store.fovea.cc:1980/check-purchase";
store.validator = function(product, callback) {
    
    callback(true, { ... transaction details ... }); // success!
    
    // OR
    callback(false, {
             error: {
             code: store.PURCHASE_EXPIRED,
             message: "XYZ"
             }
             });
    
    // OR
    callback(false, "Impossible to proceed with validation");
    
    // Here, you will typically want to contact your own webservice
    // where you check transaction receipts with either Apple or
    // Google servers.
});

*/