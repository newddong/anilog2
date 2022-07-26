import React, {useEffect} from 'react';
import {Platform,View,Text,TouchableOpacity} from 'react-native';
import { txt } from 'Root/config/textstyle';
import RootStackNavigation from 'Navigation/route/RootStackNavigation';
import codePush from 'react-native-code-push';
import appConfig, {DEV, RELEASE, STAGING} from 'Root/config/appConfig';
// import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';
import {init, captureMessage} from '@sentry/browser';
import {RewriteFrames as RewriteFramesIntegration} from '@sentry/integrations';
import Raven from 'raven-js';
import ErrorBoundary from 'react-native-error-boundary';
// require('raven-js/plugins/react-native')(Raven)
// import Raven from 'raven-js/plugins/react-native';
const NoRaven = false;
const RELEASE_ID = appConfig.sentryReleaseID;
const PUBLIC_DSN = appConfig.mode == DEV ? appConfig.sentryDsnStaging : appConfig.sentryDsnRelease;
const integrations =
	Platform.OS == 'ios'
		? new RewriteFramesIntegration({prefix: ''})
		: new RewriteFramesIntegration({
				prefix: '',
		  });
(function sentryinit(){
	Sentry.init({
		dsn: PUBLIC_DSN,
		release: RELEASE_ID,
		integrations: [integrations],
	});

	init({
		dsn: PUBLIC_DSN,
		release: RELEASE_ID,
		integrations: [integrations],
	});
	!NoRaven&&Raven.config(PUBLIC_DSN, {release: RELEASE_ID}).install();
})()
const codePushOptions = {
	checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
	// 언제 업데이트를 체크하고 반영할지를 정한다.
	// ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
	// ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미
	updateDialog: false,
	// 업데이트를 할지 안할지 여부에 대한 노출 (잠수함 패치의 경우 false)
	installMode: codePush.InstallMode.IMMEDIATE,
	// 업데이트를 어떻게 설치할 것인지 (IMMEDIATE는 강제설치를 의미)
};

const consoleOld = console;
(() => {
	if (appConfig.mode == DEV) return;
	console = {};
	Object.keys(consoleOld).forEach(key => {
		if (key == 'log') {
			if (appConfig.mode == DEV) {
				console[key] = function (message) {
					consoleOld[key](message);
				};
			} else {
				console[key] = function () {};
			}
		} else {
			console[key] = consoleOld[key];
		}
	});
})();
const ErrorPage = (props) => {
	return (
		<View style={{flex:1,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
			<Text style={txt.noto30b}>에러가 발생했습니다.</Text>
			<TouchableOpacity style={{width: 300, height: 300, backgroundColor: 'yellow'}} onPress={() => codePush.restartApp()}>
				<Text style={txt.noto24b}>앱을 재시작합니다. 노란 박스를 눌러주세요</Text>
			</TouchableOpacity>
		</View>
	);
};

const App = () => {
	// useEffect(() => {
	// 	try {
	// 	  setTimeout(() => {
	// 			SplashScreen.hide();
	// 	  }, 1000); /** 스플래시 시간 조절 (1초) **/
	// 	} catch(e) {
	// 	  console.warn('Error');
	// 	  console.warn(e);
	// 	}
	//  });
	// return (
	// 	<RootStackNavigation />
	// 	// <Route/>
	// );

	

	return (
		<Sentry.ErrorBoundary fallback={props=><ErrorPage {...props}/>}>
			<RootStackNavigation />
		</Sentry.ErrorBoundary>
	);
};
// export default Sentry.wrap(codePush(codePushOptions)(App));
export default (codePush(codePushOptions)(Sentry.wrap(App)));
// export default App
