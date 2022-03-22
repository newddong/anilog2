import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import {getAllAnnouncement} from 'Root/api/announcement';
import {FlatList} from 'react-native-gesture-handler';
import {MainLogo} from 'Root/component/atom/icon';
import AniButton from 'Root/component/molecules/button/AniButton';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
const ServiceCenter = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
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
	}, []);
	const OftenAskedQestion = props => {
		return (
			<View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {marginTop: 30 * DP}]}>
				<Text style={[txt.noto34, {color: APRI10}, {marginLeft: 48 * DP}, {width: 42 * DP}]}>{props.index}</Text>
				<Text style={[txt.noto28, {marginLeft: 12 * DP}]}>{props.title}</Text>
			</View>
		);
	};
	const CompanyInfo = props => {
		return (
			<View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {marginTop: 30 * DP}]}>
				<Text style={[txt.noto28b, {color: GRAY10}, {marginLeft: 48 * DP}, {width: 88 * DP}]}>{props.title}</Text>
				<Text style={[txt.noto28, {marginLeft: 12 * DP}]}>{props.contents}</Text>
			</View>
		);
	};
	const onPressQnA = () => {
		navigation.push('ServiceTab');
	};
	const onPressCategory = () => {
		navigation.push('CategoryHelpTab');
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
				<ScrollView>
					<View style={styles.serviceCenterContainer}>
						<View style={[styles.topContainer]}>
							<Text style={[txt.noto40, {width: 428 * DP}, {height: 122 * DP}]}>안녕하세요 {'\n'}애니로그 고객센터입니다.</Text>
							<MainLogo />
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
					<View style={[styles.oftenAskedQuestion]}>
						<OftenAskedQestion index="1" title="알람이 울리지 않아요." />
						<OftenAskedQestion index="2" title="비밀번호를 분실했는데 어떻게 하나요? 울리지 않아요." />
						<OftenAskedQestion index="3" title="핸드폰 번호를 바꿨는데 어떻게 하나요?" />
						<OftenAskedQestion index="4" title="보호소 등록을 하고 싶어요." />
						<OftenAskedQestion index="5" title="공개 설정을 하나하나 바꾸고 싶어요." />
					</View>
					<View style={[styles.miniTitleTextContainer]}>
						<Text style={[txt.noto28b, {marginLeft: 48 * DP}]}>회사 소개</Text>
					</View>
					<View style={[styles.oftenAskedQuestion]}>
						<CompanyInfo title="회사 명" contents="파인프렌즈" />
						<CompanyInfo title="주소" contents="서울시 마포구 마포대로 86 창강빌딩 1612호" />
						<CompanyInfo title="이메일" contents="pinefriends@pine-partners.com" />
					</View>
				</ScrollView>
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
		borderColor: APRI10,
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
		height: 440 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
	},
});

export default ServiceCenter;
