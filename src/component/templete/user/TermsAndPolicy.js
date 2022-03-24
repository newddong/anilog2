import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {getTermsOfService} from 'Root/api/termsofservice';

const TermsAndPolicy = ({route}) => {
	const navigation = useNavigation();
	console.log('route', route);
	const [contents, setContents] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const data = route.params.term;
	React.useEffect(() => {
		console.log('route name', route.params);

		switch (route.params.name) {
			case 'service':
				navigation.setOptions({title: '서비스 이용약관'});
				// setContents(data[2]);
				console.log('contents', contents);
				break;
			case 'location':
				navigation.setOptions({title: '위치 정보 이용 약관'});
				// setData(dummyData[0]);
				// setContents(data[0]);
				break;
			case 'privacy':
				navigation.setOptions({title: '개인정보처리 방침'});
				// setData(dummyData[1]);
				// setContents(data[1]);
				break;
			case 'opensource':
				navigation.setOptions({title: '오픈소스 라이선스 정보'});
			// setData(dummyData[3]);
			// setContents(data[1]);
		}
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.termsContainer}>
				<Text>{data.terms_of_service_contents.replace(/\\n/g, `\n`)}</Text>
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
