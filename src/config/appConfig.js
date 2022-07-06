export const DEV = 111;
export const RELEASE = 222;
export const STAGING = 333;

const appConfig = {
    mode:DEV,
    version: '0.0.1 ver(staging, 7-6 15:40)',
    // version: '0.0.1 ver(debug, 6-24 13:54)'
    // version: '0.0.1 ver(release, 7-1 19:50)',
    medias:[],
    lastMedia:undefined,
    // localUri: 'http://localhost:3000'
    localUri: 'http://10.0.2.2:3000'
}
export default appConfig;