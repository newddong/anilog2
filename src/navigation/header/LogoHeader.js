import React from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import {Logo} from 'Asset/image';
import {AlarmBadger48, MainLogo, Search48, AlarmBadgerNotice} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import SvgWrapper, {SvgWrap} from 'Atom/svgwrapper';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {getAlarmStatus} from 'Root/api/userapi';

export default LogoHeader = ({navigation, route, options, back}) => {
	const isLoginUser = userGlobalObject.userInfo?._id;
	const [isNewAlarm, setIsNewAlarm] = React.useState();
	const clickLogo = () => {
		// alert('Logo!');
	};
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// The screen is focused
			// Call any action
			console.log('logoHeader foucesed', isLoginUser);
			getAlarmStatus(
				{user_object_id: isLoginUser},
				result => {
					console.log('result', result);
					if (result.msg.user_alarm) {
						// console.log('reuslt isNewAlarm', result.msg.user_alarm);
						setIsNewAlarm(result.msg.user_alarm);
					} else {
						setIsNewAlarm(result.msg.user_alarm);
					}
				},
				err => {
					console.log('err', err);
				},
			);
		});
		return unsubscribe;
	}, [navigation]);

	const clickSearch = () => {
		navigation.navigate('Search', {mother: 0, child: 0, prevNav: route.name});
		// alert('이후 버전에서 제공할 예정입니다!');
	};
	const clickAlarm = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			navigation.navigate('AlarmList', {isNewAlarm: isNewAlarm});
		}
	};
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<View style={style.logoContainer}>
				<MainLogo />
			</View>
			<View style={style.buttonContainer}>
				<Search48 onPress={clickSearch} />
				{isNewAlarm ? <AlarmBadgerNotice onPress={clickAlarm} /> : <AlarmBadger48 onPress={clickAlarm} />}
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 105 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	logoContainer: {
		// marginBottom: 26 * DP,
		// backgroundColor: 'red',
		width: 167 * DP,
		height: 74 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 126 * DP,
		// marginBottom: 26 * DP,
		backgroundColor: '#fff',
	},
	shadow: {
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 4,
		// },
		// elevation: 4,
	},
});
