import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {getTermsOfService} from 'Root/api/termsofservice';

import DP from 'Root/config/dp';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
export default SettingInformAsk = ({route}) => {
	const navigation = useNavigation();
	const [term, setTerm] = React.useState();
	React.useEffect(() => {
		getTermsOfService(
			{},
			result => {
				console.log('getTermsOfService', result.msg);
				setTerm(result.msg);
			},
			err => {
				console.log('getTermsOfService err', err);
			},
		);
	}, []);

	const onPressNotice = () => {
		navigation.push('NoticeList'); // FollowObjec
	};
	const onPressServiceCenter = () => {
		navigation.push('ServiceCenter');
	};

	const onPressServiceTerms = () => {
		// Modal.popInfoModal();
		navigation.push('TermsAndPolicy', {name: 'service', term: term[2]});
	};
	const onPressLocationTerms = () => {
		navigation.push('TermsAndPolicy', {name: 'location', term: term[0]});
	};
	const onPressPrivacyTerms = () => {
		navigation.push('TermsAndPolicy', {name: 'privacy', term: term[1]});
	};
	const onPressOpenSource = () => {
		if (term[4]) {
			navigation.push('TermsAndPolicy', {name: 'privacy', term: term[4]});
		} else {
			navigation.push('TermsAndPolicy', {name: 'opensource', term: {terms_of_service_contents: '추후 추가되야됨'}});
		}
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.noticeContainer}>
					<View style={{width: 550 * DP}}>
						<TouchableOpacity onPress={onPressNotice}>
							<Text style={[txt.noto32b]}>공지사항</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.noticeContainer}>
					<View style={{width: 550 * DP}}>
						<TouchableOpacity onPress={onPressServiceCenter}>
							<Text style={[txt.noto32b]}>고객 센터</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.termsContainer}>
					<View style={{width: 550 * DP}}>
						<TouchableOpacity onPress={onPressServiceTerms}>
							<Text style={[txt.noto28, {marginTop: 40 * DP}]}>서비스 이용약관</Text>
						</TouchableOpacity>
					</View>
					<View style={{width: 550 * DP}}>
						<TouchableOpacity onPress={onPressLocationTerms}>
							<Text style={[txt.noto28, {marginTop: 24 * DP}]}>위치 정보 이용 약관</Text>
						</TouchableOpacity>
					</View>
					<View style={{width: 550 * DP}}>
						<TouchableOpacity onPress={onPressPrivacyTerms}>
							<Text style={[txt.noto28, {marginTop: 24 * DP}]}>개인정보처리 방침</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.versionContainer}>
					<View style={[{width: 180 * DP}]}>
						<Text style={[txt.noto32b]}>버전 정보</Text>
					</View>
					<View style={[{flex: 1}]}>
						{/* <Text style={[txt.noto32b, {textAlign: 'right'}]}>0.0.1 ver(staging, 6-23 13:56)</Text> */}
						{/* <Text style={[txt.noto32b, {textAlign: 'right'}]}>0.0.1 ver(debug, 6-23 11:51)</Text> */}
						<Text style={[txt.noto32b, {textAlign: 'right'}]}>0.0.1 ver(release, 6-23 21:40)</Text>
					</View>
				</View>
				<View style={styles.serviceContainer}>
					<View style={{width: 550 * DP}}>
						<TouchableOpacity onPress={onPressOpenSource}>
							<Text style={[txt.noto32b]}>오픈 소스 라이선스 정보</Text>
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
		height: 780 * DP,
		marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	noticeContainer: {
		height: 128 * DP,
		paddingLeft: 48 * DP,
		justifyContent: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	serviceContainer: {
		height: 128 * DP,
		paddingLeft: 48 * DP,
		justifyContent: 'center',
	},
	termsContainer: {
		height: 260 * DP,
		paddingLeft: 48 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	versionContainer: {
		height: 128 * DP,
		width: 750 * DP,
		paddingHorizontal: 48 * DP,
		flexDirection: 'row',
		// alignContent: 'center',
		alignItems: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
});
