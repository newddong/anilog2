import React, {useEffect} from 'react';
import Route from './route';
import RootStackNavigation from 'Navigation/route/RootStackNavigation';

// import SplashScreen from 'rreact-native-splash-screen';

export default App = () => {
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
