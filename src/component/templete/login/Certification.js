import React from 'react';
import {View, NativeBaseProvider, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import IMP from 'iamport-react-native';
import {useNavigation} from '@react-navigation/native';
export default function Certification({route}) {
	const params = route?.params.data.params;
	const tierCode = route?.data?.data.tierCode;
	const navigation = useNavigation();
	// const userCode = getUserCode('danal', tierCode, 'certification');
	console.log('Certifictaion', route?.params);
	function Loading() {
		return (
			<View flex={1} alignItems={'center'} justifyContent={'center'}>
				<Text fontSize={20}>잠시만 기다려주세요...</Text>
			</View>
		);
	}

	return (
		<NativeBaseProvider>
			<SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
				<IMP.Certification
					userCode={'imp72342634'}
					// tierCode={tierCode}
					data={params}
					loading={<Loading />}
					callback={response => {
						navigation.navigate('UserVerification', {response: response});
						console.log('reponse', response);
					}}
				/>
			</SafeAreaView>
		</NativeBaseProvider>
	);
}
