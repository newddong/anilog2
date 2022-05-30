import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AlarmBadger48, Search48, BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE} from 'Root/config/color';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';

export default AlarmAndSearchHeader = ({navigation, route, options, back}) => {
	const [isNewAlarm, setIsNewAlarm] = React.useState();
	const isLoginUser = userGlobalObject.userInfo?._id;
	const clickSearch = () => {
		navigation.navigate('Search', {mother: 0, child: 0, prevNav: route.name});
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
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// The screen is focused
			// Call any action
			// console.log('logoHeader foucesed', isLoginUser);
			getAlarmStatus(
				{user_object_id: isLoginUser},
				result => {
					// console.log('result', result);
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
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
			<View style={style.buttonContainer}>
				<Search48 onPress={clickSearch} />
				{isNewAlarm ? <AlarmBadgerNotice onPress={clickAlarm} /> : <AlarmBadger48 onPress={clickAlarm} />}
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 126 * DP,
		marginBottom: 26 * DP,
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
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		marginBottom: 8 * DP,
	},
});
