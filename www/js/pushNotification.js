var service = new PushSDK.NotificationService.getCurrent("E70D6-CE4DE");


function initPushwooshForWindows() {
    service.setHost("https://cp.pushwoosh.com/");

    service.ononpushaccepted = function (args) {
        //code to handle push notification
        //display push notification payload for test only
        //alert("!");
        alert(args.toString());
    }

    service.ononpushtokenreceived = function (pushToken) {
        //code to handle push token
        
        //alert(pushToken);
        
    }



    service.ononpushtokenfailed = function (error) {
        //code to handle push subscription failure

        alert("Failed to obtain push token. Error :" + error);
    }

    service.subscribeToPushService();
}