import React from 'react';
import {View, NativeBaseProvider, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import IMP from 'iamport-react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {getSMSimpcode} from 'Root/api/userapi';
import {ActivityIndicator} from 'react-native';
import {actions} from 'react-native-pell-rich-editor';
export default function Certification({route}) {
	const params = route?.params.data.params;
	const tierCode = route?.data?.data.tierCode;
	const navigation = useNavigation();
	const [impCode, setImpCode] = React.useState();
	const [loading, setLoading] = React.useState(true);
	// const userCode = getUserCode('danal', tierCode, 'certification');
	console.log('Certifictaion', route?.params);
	React.useEffect(() => {
		getSMSimpcode(
			{},
			result => {
				console.log('result', result.msg);
				setImpCode(result.msg);
				setLoading(false);
			},
			err => {
				console.log('가맹점 코드 불러오기 err', err);
			},
		);
	}, []);

	function Loading() {
		return (
			<View flex={1} alignItems={'center'} justifyContent={'center'}>
				<Text fontSize={20}>잠시만 기다려주세요...</Text>
			</View>
		);
	}
	if (loading) {
		return (
			<NativeBaseProvider>
				<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
					<ActivityIndicator size={'large'}></ActivityIndicator>
				</View>
			</NativeBaseProvider>
		);
	} else {
		return (
			<NativeBaseProvider>
				<SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
					<IMP.Certification
						userCode={impCode}
						// tierCode={tierCode}
						data={params}
						loading={<Loading />}
						callback={response => {
							console.log('핸드폰 인증 response', response);
							// (response.imp_success || response.success) &&
							if (response.success == 'true') {
								console.log('인증성공');
								navigation.replace(route.params.navigationName, {response: response, user_data: route.params?.user_data});
							} else {
								console.log('인증 실패');
								navigation.goBack();
							}
						}}
					/>
				</SafeAreaView>
			</NativeBaseProvider>
		);
	}
}
