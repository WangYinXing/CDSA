/*                          */
// page: home.html
/*                          */
app.controller('homeCtrl', ['$scope', '$window', 'gApp', function($scope, $window, gApp) {
  var img = 'www/img/AppHome.png',
      url,
      message = "The Chinese Destiny Stars Astrology App has a free Four Pillars Calculator, free Year Star reading and you can buy 'Done for You' readings. I recommend you get it",
      subject = 'I like this app, I think you will too!';

  if (ons.platform.isAndroid()) {
    url = 'https://play.google.com/store/apps/details?id=com.fsrc.destinystars';
  }
  else if (ons.platform.isIOS()) {
    url = 'https://itunes.apple.com/us/app/family-newsletter/id888043575';
  }
  else {  // WP
      url = 'http://windowsphone.com/s?appid=886fa5b2-48f9-4706-ba97-086f36f95f17';
  }

  $scope.gotoPage = gApp.gotoPage;

  $scope.init = function() {
    $scope.version = '';
  };

  $scope.$on("device_ready", function() {
    if (typeof(cordova) != "undefined") {
      try {
        cordova.getAppVersion.getVersionNumber().then(function (version) {
          $scope.$apply(function() {
            $scope.version = version;
          })
        });
      }
      catch(e) {

      }
    }
  });

  function onSuccess() {
    console.log('Sharing successed !');
  }

  function onError() {
    console.log('Sharing error !');
    window.plugins.socialsharing.share(
      message + ' (' + url + ')',
      subject,
      img,
      url
    );
  }

  $scope.shareViaFacebook = function() {
    if (ons.platform.isAndroid()) {
      window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(
        message,
        null,
        url,
        null,
        onSuccess, onError);
    }
    else if (ons.platform.isIOS()) {
      window.plugins.socialsharing.shareViaFacebook(
        null,
        null,
        url,
        null,
        onSuccess, onError);
    }
    else {  // WP
        window.plugins.socialsharing.shareViaTwitter(
          subject + ' (' + url + ')',
          img,
          null,
          onSuccess, onError);
    }
  };

  $scope.shareViaTwitter = function () {
      window.plugins.socialsharing.shareViaTwitter(
          subject + ' (' + url + ')',
          img,
          null,
          onSuccess, onError);
  };

  $scope.shareViaEmail = function() {
    window.plugins.socialsharing.shareViaEmail(
      message + ' (' + url + ')',
      'I like this app, I think you will too!',
      null,
      null,
      null,
      img,
      onSuccess, onError);
  };

}]);