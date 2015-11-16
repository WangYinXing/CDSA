cd /Volumes/Work/Hybrid/CDSA/CDSA
ionic prepare android
ionic build android --release
jarsigner -storepass CDSA1234 -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cdsa_new.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk CDSA
zipalign -f -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk cdsa.apk
adb install -r cdsa.apk
adb shell am start -n com.fsrc.destinystars/.MainActivity