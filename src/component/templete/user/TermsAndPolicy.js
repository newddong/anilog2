import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {OpenSourceLicense} from 'Root/config/OpenSourceLicense';
import {NextMark} from 'Root/component/atom/icon';
const TermsAndPolicy = ({route}) => {
	const navigation = useNavigation();
	const [contents, setContents] = React.useState('');
	const data = route.params.term;
	React.useEffect(() => {
		switch (route.params.name) {
			case 'service':
				navigation.setOptions({title: '서비스 이용약관'});
				break;
			case 'location':
				navigation.setOptions({title: '위치 정보 이용 약관'});
				break;
			case 'privacy':
				navigation.setOptions({title: '개인정보처리 방침'});
				break;
			case 'opensource':
				navigation.setOptions({title: '오픈소스 라이선스 정보'});
		}
	}, []);
	const ITEM_HEIGHT = 108 * DP;
	const onPressOpenLicense = item => {
		navigation.navigate('OpenSourceDetail', {item: item});
	};
	const renderItem = ({item}) => {
		console.log('item', item);
		return (
			<TouchableOpacity onPress={() => onPressOpenLicense(item)}>
				<View style={[styles.renderItemStyle]}>
					<Text style={[txt.noto28]}>{item.libraryName}</Text>
					<NextMark />
				</View>
			</TouchableOpacity>
		);
	};
	const getItemLayout = useCallback(
		(data, index) => ({
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		}),
		[],
	);

	return (
		<View style={styles.container}>
			{route.params.name != 'opensource' ? (
				<ScrollView style={styles.termsContainer} showsVerticalScrollIndicator={false}>
					<Text style={[txt.noto28]}>{data?.terms_of_service_contents.replace(/\\n/g, `\n`)}</Text>
				</ScrollView>
			) : (
				<FlatList data={OpenSourceLicense} renderItem={renderItem} keyExtractor={item => item.libraryName} getItemLayout={getItemLayout} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// width: 750 * DP,
		// height: 780 * DP,
		// marginTop: 10 * DP,
		// paddingVertical: 30 * DP,
		backgroundColor: '#FFFFFF',
	},
	noticeContainer: {
		height: 128 * DP,
		paddingHorizontal: 48 * DP,
		justifyContent: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	termsContainer: {
		marginVertical: 30 * DP,
		marginHorizontal: 48 * DP,
	},
	renderItemStyle: {
		height: 108 * DP,
		paddingHorizontal: 28 * DP,
		borderBottomWidth: 2 * DP,
		// justifyContent: 'center',
		alignItems: 'center',
		borderColor: GRAY20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
export default TermsAndPolicy;
