import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, LogBox, FlatList} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {getAllAnnouncement} from 'Root/api/announcement';
import {NewMainLogo} from 'Root/component/atom/icon';
import {getFaq} from 'Root/api/faq';
const ServiceCenter = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const [faq, setFaq] = React.useState();
	React.useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
		getAllAnnouncement(
			{},
			result => {
				setData(result.msg);
				setLoading(false);
			},
			err => {
				console.log('getAllAccouncement err', err);
			},
		);
		getFaq(
			{},
			result => {
				// console.log('getFaq', result.msg);
				setFaq(result.msg);
			},
			err => {
				console.log('getFaq err', err);
			},
		);
	}, []);

	//문의하기 클릭
	const onPressQnA = () => {
		navigation.navigate('ServiceTab');
	};

	//카테고리별 도움말
	const onPressCategory = () => {
		navigation.navigate('CategoryHelpTab');
	};

	//자주 묻는 질문 항목 클릭
	const onPressFaQ = item => {
		navigation.navigate('FrequentAsked', {item});
	};

	//자주 묻는 질문 리스트 아이템 컴포넌트
	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity onPress={() => onPressFaQ(item)}>
				<View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {marginTop: 30 * DP}]}>
					<Text style={[txt.noto34, {color: APRI10}, {marginLeft: 48 * DP}, {width: 42 * DP}]}>{index + 1}</Text>
					<Text style={[txt.noto28, {marginLeft: 12 * DP}]}>{item.faq_title.slice(2)}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	//회사정보
	const CompanyInfo = props => {
		return (
			<View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {marginTop: 30 * DP, width: 694 * DP}]}>
				<Text style={[txt.noto24b, {color: GRAY10}, {marginLeft: 48 * DP}, {width: 188 * DP}]}>{props.title}</Text>
				<Text style={[txt.noto24, {marginLeft: 12 * DP, width: 480 * DP}]}>{props.contents}</Text>
			</View>
		);
	};

	const header = () => {
		return (
			<>
				<View style={styles.serviceCenterContainer}>
					<View style={[styles.topContainer]}>
						<Text style={[txt.noto40, {width: 428 * DP}, {height: 122 * DP}]}>안녕하세요 {'\n'}애니로그 고객센터입니다.</Text>
						<NewMainLogo />
					</View>
					<TouchableOpacity onPress={onPressQnA}>
						<View style={[styles.btnLayout, {marginTop: 50 * DP}]}>
							<Text style={[styles.btnTitle, txt.noto36b]}>문의하기</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressCategory}>
						<View style={[styles.btnLayout, {marginTop: 40 * DP}]}>
							<Text style={[styles.btnTitle, txt.noto36b]}>카테고리별 도움말</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={[styles.miniTitleTextContainer]}>
					<Text style={[txt.noto28b, {marginLeft: 48 * DP}]}>자주 묻는 질문</Text>
				</View>
			</>
		);
	};

	const footer = () => {
		return (
			<>
				<View style={[styles.miniTitleTextContainer]}>
					<Text style={[txt.noto28b, {marginLeft: 48 * DP}]}>회사 소개</Text>
				</View>
				<View style={[styles.oftenAskedQuestion, {paddingBottom: 20 * DP}]}>
					<CompanyInfo title="회사명" contents="파인프렌즈(주)" />
					<CompanyInfo title="대 표" contents="최희복" />
					<CompanyInfo title="사업자등록번호" contents="493-88-01873" />
					<CompanyInfo title="주소" contents="서울시 강서구 공항대로8길 18-13, 102호(공항동)" />
					<CompanyInfo title="Tel" contents=" 02-3775-1195" />
					<CompanyInfo title="이메일" contents="admin@pinefriend.com" />
				</View>
			</>
		);
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<View style={[styles.oftenAskedQuestion]}>
					<FlatList
						data={faq}
						keyExtractor={item => item.faq_title}
						renderItem={renderItem}
						ListHeaderComponent={header()}
						ListFooterComponent={footer()}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	serviceCenterContainer: {
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
		height: 596 * DP,
	},
	topContainer: {
		marginTop: 60 * DP,
		flexDirection: 'row',
		width: 428 * DP,
		alignItems: 'flex-end',
		marginLeft: 48 * DP,
	},
	btnLayout: {
		borderColor: MAINBLACK,
		width: 654 * DP,
		height: 132 * DP,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		marginLeft: 48 * DP,
	},
	btnTitle: {
		marginHorizontal: 40 * DP,
		marginVertical: 36 * DP,
	},
	miniTitleTextContainer: {
		height: 84 * DP,
		justifyContent: 'center',
		// marginVertical: 20 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	oftenAskedQuestion: {
		// height: 440 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
	},
});

export default ServiceCenter;
