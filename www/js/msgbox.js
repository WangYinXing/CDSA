var alertsToShow = [];
var dialogVisible = false;

document.addEventListener("deviceready", function () {
    // JavaScript source code
    

    function showPendingAlerts() {
        if (dialogVisible || !alertsToShow.length) {
            return;
        }


        dialogVisible = true;

        var msgBox;
        var msgInfo = alertsToShow.shift();

        if      (msgInfo.type == "alert") {
            msgBox = new Windows.UI.Popups.MessageDialog(msgInfo.msg);
        }
        else if (msgInfo.type == "confirm") {
            var confirmInfo = msgInfo.confirmInfo;

            // Validation parameters ....
            var contents = typeof (confirmInfo.msg) == "undefined" ? "Are you sure?" : confirmInfo.msg;
            var ok = typeof (confirmInfo.ok) == "undefined" ? "OK" : confirm.ok;
            var cancel = typeof (confirmInfo.cancel) == "undefined" ? "Cancel" : confirmInfo.cancel;
            var handler = typeof (confirmInfo.handler) == "undefined" ? function () { } : confirmInfo.handler;


            // Create the message dialog and set its content
            msgBox = new Windows.UI.Popups.MessageDialog(contents);

            // Add commands and set their command handlers
            msgBox.commands.append(new Windows.UI.Popups.UICommand(ok, handler));
            msgBox.commands.append(new Windows.UI.Popups.UICommand(cancel, handler));

            // Set the command that will be invoked by default
            msgBox.defaultCommandIndex = 0;

            // Set the command to be invoked when escape is pressed
            msgBox.cancelCommandIndex = 1;
        }

        msgBox.showAsync().done(function () {
            dialogVisible = false;
            showPendingAlerts();
        })
    }
    window.alert = function (message) {
        var msgInfo = {
            type: "alert",
            msg: message
        };

        alertsToShow.push(msgInfo);
        showPendingAlerts();
    }

    window.confirm = function (confirmInfo) {
        if (typeof (confirmInfo) == "undefined")
            return;

        var msgInfo = {
            type: "confirm",
            confirmInfo: confirmInfo
        };

        alertsToShow.push(msgInfo);
        showPendingAlerts();

        

        // Show the message dialog
        msgBox.showAsync();
    }
}, false);