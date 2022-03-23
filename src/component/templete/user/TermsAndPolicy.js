import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';

const dummyData = [
	'서비스 이용약관 서비스 이용약관 서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관서비스 이용약관',
	'위치 정보 이용 약관 위치 정보 이용 약관위치 정보 이용 약관위치 정보 이용 약관위치 정보 이용 약관위치 정보 이용 약관위치 정보 이용 약관',
	'개인 정보 처리 방침 개인 정보 처리 방침개인 정보 처리 방침개인 정보 처리 방침개인 정보 처리 방침개인 정보 처리 방침개인 정보 처리 방침개인 정보 처리 방침',
	'오픈 소스 라이선스 정보 오픈 소스 라이선스 정보오픈 소스 라이선스 정보오픈 소스 라이선스 정보오픈 소스 라이선스 정보오픈 소스 라이선스 정보',
];

const TermsAndPolicy = ({route}) => {
	const navigation = useNavigation();
	console.log('route', route);
	const [data, setData] = React.useState('');
	React.useEffect(() => {
		// console.log('route name', route.params.name);
		switch (route.params.name) {
			case 'service':
				navigation.setOptions({title: '서비스 이용약관'});
				setData(dummyData[0]);
				break;
			case 'location':
				navigation.setOptions({title: '위치 정보 이용 약관'});
				setData(dummyData[1]);
				break;
			case 'privacy':
				navigation.setOptions({title: '개인정보처리 방침'});
				setData(dummyData[2]);
				break;
			case 'opensource':
				navigation.setOptions({title: '오픈소스 라이선스 정보'});
				setData(dummyData[3]);
		}
	}, []);
	return (
		<View style={styles.container}>
			<ScrollView style={styles.termsContainer}>
				<Text>{data}</Text>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	termsContainer: {
		marginTop: 48 * DP,
		marginHorizontal: 48 * DP,
	},
});
export default TermsAndPolicy;
