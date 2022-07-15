/**
 * @format
 */
if (__DEV__) {
	import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//글자 크기 scaling 끄기
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.autoCorrect = false;
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, ()=>App);
