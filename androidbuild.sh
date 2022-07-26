npx react-native bundle \
  --dev false \
  --platform android \
  --entry-file index.js \
  --bundle-output index.android.bundle \
  --sourcemap-output index.android.bundle.map

appcenter codepush release -a pinefriends/anilog-android-1 -d "$1" -c ./index.android.bundle -t 1.0 || true
if [ $1 == "Staging" ] 
then
    sentry-cli releases -o pinefriend -p anilogstaging files staging1 upload-sourcemaps --rewrite  index.android.bundle index.android.bundle.map --url-prefix '~/'
fi
if [ $1 == "Production" ] 
then
    sentry-cli releases -o pinefriend -p anilogrelease files release1 upload-sourcemaps --rewrite  index.android.bundle index.android.bundle.map --url-prefix '~/'
fi