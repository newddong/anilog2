import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import OneNotice from 'Component/organism/listitem/OneNotice';
import {getQandInfo, createQandA} from 'Root/api/qanda';
import userGlobalObj from 'Root/config/userGlobalObject';
import {TwoPaw} from 'Root/component/atom/icon';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
const AskedQuestion = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		getQandInfo(
			{qanda_user_id: userGlobalObj.userInfo._id},
			result => {
				// console.log('result', result);
				setData(result.msg);
				setLoading(false);
			},
			err => {
				console.log('getQandInfo err', err);
			},
		);
	}, []);

	const renderItem = ({item, index}) => {
		// console.log('item', item);
		let answered = false;

		if (item.qanda_status == 'waiting') {
			answered = false;
		} else {
			answered = true;
		}
		const date = moment(item.announcement_date).format('YYYY.MM.DD');
		return (
			<OneNotice
				uptitle={`${date} / ${item.qanda_common_code_id?.common_code_msg_kor || ''} `}
				downtitle={item.qanda_question_title}
				contents={item.qanda_question_contents}
				status={true}
				answered={answered}
				answerText={item.qanda_answer_contents || null}
			/>
		);
	};

	const listEmpty = () => {
		return (
			<View style={[{flex: 1}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
				<TwoPaw />
				<Text style={[txt.noto28]}>문의 내역이 없습니다.</Text>
			</View>
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
				<FlatList
					data={data}
					keyExtractor={item => item._id}
					renderItem={renderItem}
					// ListEmptyComponent={listEmpty}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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

export default AskedQuestion;
