var iapmanager = {
    init: function (successCallback, errorCallback, strInput) {
        cordova.exec(successCallback, errorCallback, "iapmanager", "Init", [strInput]);
    },
    listProducts: function (successCallback, errorCallback, strInput) {
        cordova.exec(successCallback, errorCallback, "iapmanager", "ListProducts", [strInput]);
    },
    purchaseProduct: function (successCallback, errorCallback, strInput) {
        cordova.exec(successCallback, errorCallback, "iapmanager", "PurchaseProduct", [strInput]);
    },
    ToUpper: function (successCallback, errorCallback, strInput) {
        cordova.exec(successCallback, errorCallback, "iapmanager", "ToUpper", [strInput]);
    }
}

module.exports = iapmanager;