import { Platform } from "react-native";
export const DEV = 111;
export const RELEASE = 222;
export const STAGING = 333;

const appConfig = {
    sentryReleaseID:'staging1',
    sentryDsnRelease:'https://1bca951782a447a79c79825eeef02b5a@o1316673.ingest.sentry.io/6576821',
    sentryDsnStaging:'https://bc66a87ff5884863ac299d6ec3c837f5@o1316673.ingest.sentry.io/6569487',
    mode:RELEASE,
    // version: '0.0.3 ver(staging, 7-28 16:00)',
    // version: '0.0.1 ver(debug, 7-17 04:00)',
    version: '0.0.4 ver(release,  7-28 18:00)',
    medias:[],
    lastMedia:undefined,
    // localUri: 'http://localhost:3000'
    localUri: Platform.OS=='ios'?'http://localhost:3000':'http://10.0.2.2:3000'
}
export default appConfig;