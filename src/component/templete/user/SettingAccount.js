import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, TEXTBASECOLOR} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {userLogout} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';
export default SettingAccount = ({route}) => {
	const navigation = useNavigation();
	const logout = () => {
		userLogout(
			1,
			e => {
				console.log('e', e);
				userGlobalObject.userInfo = {};
				alert('Logout 성공');
				navigation.reset({routes: [{name: 'Login'}]});
			},
			err => {
				console.log('err', err);
			},
		);
	};
	const onPressNotice = () => {
		Modal.popInfoModal();
		// navigation.push('SaveFavorite'); // FollowObjec
	};
	const onPressDeleteAccount = () => {
		Modal.popInfoModal();
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.accountInfoContainer}>
					<View style={{width: 550 * DP}}>
						<Text style={[txt.noto32b, {color: GRAY10}]}>가입 계정 정보</Text>
						<Text style={[{marginTop: 30 * DP}, txt.noto30, {color: TEXTBASECOLOR}]}>{userGlobalObject.userInfo.user_phone_number}</Text>
					</View>
				</View>
				<View style={styles.logOutContainer}>
					<View style={{width: 550 * DP}}>
						<TouchableOpacity onPress={logout}>
							<Text style={[txt.noto32b, {color: GRAY10}]}>로그아웃</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.exitContainer}>
					<View style={{width: 550 * DP}}>
						<TouchableOpacity onPress={onPressDeleteAccount}>
							<Text style={[txt.noto32b, {color: GRAY10}, {marginTop: 40 * DP}]}>계정 탈퇴</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 456 * DP,
		marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	accountInfoContainer: {
		height: 196 * DP,
		paddingLeft: 48 * DP,
		justifyContent: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	logOutContainer: {
		height: 128 * DP,
		paddingLeft: 48 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		justifyContent: 'center',
	},
	exitContainer: {
		height: 128 * DP,
		paddingLeft: 48 * DP,
	},
});
