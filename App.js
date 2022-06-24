import React, {useEffect} from 'react';
import RootStackNavigation from 'Navigation/route/RootStackNavigation';
import codePush from 'react-native-code-push';
import appConfig,{DEV,RELEASE,STAGING} from 'Root/config/appConfig';

// import SplashScreen from 'rreact-native-splash-screen';

const codePushOptions = {
	checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
	// 언제 업데이트를 체크하고 반영할지를 정한다.
	// ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
	// ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미
	updateDialog: false,
	// 업데이트를 할지 안할지 여부에 대한 노출 (잠수함 패치의 경우 false)
	installMode: codePush.InstallMode.IMMEDIATE
	// 업데이트를 어떻게 설치할 것인지 (IMMEDIATE는 강제설치를 의미)
}

const consoleOld = console;
console.log(consoleOld);
console = {};
Object.keys(consoleOld).forEach(key=>{
	if(key=='log'){
		if(appConfig.mode==DEV){
			console[key] = function(message){
				consoleOld[key](message)
			}	
		}else{
			console[key] = function(){}
		}
	}else{
		console[key]=consoleOld[key]
	}
})


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
	return (
		<RootStackNavigation />
		// <Route/>
	);
};

export default codePush(codePushOptions)(App)
// export default App
