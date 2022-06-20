/**
 * @format
 */
if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import {AppRegistry} from 'react-native';
// import App from './src/test_sangwoo/testNavi';
// import App from './App';
import App from './IosModuleTest_App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
