npx react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.js \
  --bundle-output main.jsbundle \
  --sourcemap-output main.jsbundle.map

appcenter codepush release -a pinefriends/anilogIOS -d "$1" -c ./main.jsbundle -t 1.0 || true
if [ $1 == "Staging" ] 
then
    sentry-cli releases -o pinefriend -p anilogstaging files staging1 upload-sourcemaps --rewrite main.jsbundle.map main.jsbundle --url-prefix "~/"
fi
if [ $1 == "Production" ] 
then
    sentry-cli releases -o pinefriend -p anilogrelease files release1 upload-sourcemaps --rewrite main.jsbundle.map main.jsbundle --url-prefix "~/"
fi





