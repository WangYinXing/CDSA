cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/am.armsoft.plugins.ListPicker/www/ListPicker.js",
        "id": "am.armsoft.plugins.ListPicker.ListPicker",
        "clobbers": [
            "window.plugins.listpicker"
        ]
    },
    {
        "file": "plugins/com.plugin.datepicker/www/android/DatePicker.js",
        "id": "com.plugin.datepicker.DatePicker",
        "clobbers": [
            "datePicker"
        ]
    },
    {
        "file": "plugins/com.pushwoosh.plugins.pushwoosh/www/PushNotification.js",
        "id": "com.pushwoosh.plugins.pushwoosh.PushNotification",
        "clobbers": [
            "plugins.pushNotification"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.email-composer/www/email_composer.js",
        "id": "de.appplant.cordova.plugin.email-composer.EmailComposer",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.socialsharing/www/SocialSharing.js",
        "id": "nl.x-services.plugins.socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
        "id": "org.apache.cordova.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cc.fovea.cordova.purchase/www/store-android.js",
        "id": "cc.fovea.cordova.purchase.InAppBillingPlugin",
        "clobbers": [
            "store"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "am.armsoft.plugins.ListPicker": "2.2.0",
    "com.plugin.datepicker": "0.5.0",
    "com.pushwoosh.plugins.pushwoosh": "3.4.13",
    "de.appplant.cordova.plugin.email-composer": "0.8.2dev",
    "nl.x-services.plugins.socialsharing": "4.3.14",
    "org.apache.cordova.console": "0.2.13",
    "org.apache.cordova.splashscreen": "1.0.0",
    "org.apache.cordova.statusbar": "0.1.10",
    "cc.fovea.cordova.purchase": "3.10.1",
    "cordova-plugin-network-information": "1.0.2-dev"
}
// BOTTOM OF METADATA
});