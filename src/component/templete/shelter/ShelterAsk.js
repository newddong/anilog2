import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Keyboard} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import {getAllAnnouncement} from 'Root/api/announcement';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Modal from 'Component/modal/Modal';
import SelectInput from 'Component/molecules/button/SelectInput';
import InputLongText from 'Component/molecules/input/InputLongText';
import AssignCheckListItem from 'Organism/listitem/AssignCheckListItem';
import AniButton from 'Component/molecules/button/AniButton';
import {btn_w654} from 'Component/atom/btn/btn_style';
import {getCommonCodeDynamicQuery} from 'Root/api/commoncode';
import {createQandA} from 'Root/api/qanda';
import InputBalloon from 'Root/component/molecules/input/Input30';
import Formtxtinput from 'Root/component/molecules/input/formtxtinput';
import HashText from 'Root/component/molecules/info/HashText';
import Input30 from 'Root/component/molecules/input/Input30';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)

const ShelterAsk = ({route}) => {
	const navigation = useNavigation();
	const [loading, setLoading] = React.useState(true);
	const [category, setCategory] = React.useState('카테고리 선택');
	const [contents, setContents] = React.useState('');
	const [userAgreement, setUserAgreement] = React.useState(false);
	const [commomCode, setCommonCode] = React.useState();
	const [categoryList, setCategoryList] = React.useState([]);
	const [title, setTitle] = React.useState('');
	const userAssign_agreementCheckList = [{text: '개인정보 수집 이용약관 동의 (필수)', detail: true}];
	const [id, setId] = React.useState();
	const [fullfilled, setFullFilled] = React.useState(true);
	// React.useEffect(() => {
	// 	let i;
	// 	let temp = [];
	// 	getCommonCodeDynamicQuery(
	// 		{common_code_c_name: 'helpbycategoryobjects', common_code_language: 'kor', common_code_out_type: 'list'},

	// 		result => {
	// 			// console.log('common code result', result.msg);
	// 			for (i in result.msg) {
	// 				temp.push(result.msg[i].common_code_msg_kor);
	// 			}

	// 			setCategoryList(temp.slice(2));
	// 			setLoading(false);
	// 			setCommonCode(result.msg.slice(2));
	// 		},
	// 		err => {
	// 			console.log('common code err', err);
	// 		},
	// 	);
	// }, []);
	// React.useEffect(() => {
	// 	console.log('categoy, contents, userAggree title', category, contents, userAgreement, title);
	// }, [category, contents, userAgreement, title]);
	const onSelectCategory = (v, i) => {
		// debug && console.log('city:', city[i]);
		Keyboard.dismiss();
		Modal.popSelectScrollBoxModal(
			[categoryList],
			'카테고리 선택',
			selected => {
				setCategory(selected);

				console.log('selected', selected);
				Modal.close();
			},

			() => Modal.close(),
		);
	};
	React.useEffect(() => {
		// console.log('cc ttt uuu', contents == '', title == '', userAgreement);

		if (contents != '' && title != '' && userAgreement) {
			setFullFilled(false);
		} else {
			// setFullFilled(true);
		}
	}, [contents, title, userAgreement]);
	React.useEffect(() => {
		console.log('fullfilled changed', fullfilled);
	}, [fullfilled]);
	const onChangeText = text => {
		setContents(text);
	};
	const onChangeTitle = text => {
		setTitle(text);
	};

	const onPressAcceptItem = () => {
		let temp = userAgreement;
		setUserAgreement(!temp);
	};
	const onPressDetail = index => {
		console.log(index + 'index 항목 더보기 클릭');
		Modal.popOneBtn('적용 예정입니다.', '확인', () => Modal.close());
	};

	const onPressAsk = () => {
		console.log('dd', userAgreement && contents && title, userAgreement, contents, title);
		if (userAgreement && contents && title) {
			console.log('전송준비 완료');
			// console.log('qetoiqoeti', commomCode, category);
			// for (let i in commomCode) {
			// 	if (commomCode[i].common_code_msg_kor == category) {
			// 		// console.log('같은거 ', commomCode[i]._id);
			// 		setId(commomCode[i]._id);
			// 	}
			// }
			createQandA(
				{
					qanda_common_code_id: '62720aaf9f6f319fdbb35553',
					qanda_question_title: title,
					qanda_question_contents: contents,
				},
				result => {
					console.log('Sucess', result);
					Modal.popOneBtn('문의완료 되었습니다.', '확인', () => Modal.close());
				},
				err => {
					console.log('err', err);
				},
			);
			navigation.goBack();
		} else {
			Modal.popOneBtn('입력을 확인해주세요', '확인', () => Modal.close());
		}
	};

	return (
		<View style={styles.container}>
			{/* <View style={styles.selectContainer}>
					<SelectInput onPressInput={onSelectCategory} width={654} height={82} fontSize={28} value={category} />
				</View> */}
			<View style={[{marginTop: 40 * DP}]}>
				<TextInput style={styles.input} value={title} placeholder="제목을 입력해 주세요." onChangeText={onChangeTitle} />
			</View>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={[{marginTop: 50 * DP}]}>
					<InputLongText
						placeholder="문제 발생일시와 문의 내용을 보내주시면 문의 확인에 도움이 됩니다!"
						maxlength={500}
						onChange={onChangeText}
						value={contents}
					/>
				</View>
			</TouchableWithoutFeedback>

			<View style={[{marginTop: 80 * DP}]}>
				<AniButton btnTitle={'문의접수'} titleFontStyle={32} btnStyle={'border'} btnLayout={btn_w654} onPress={onPressAsk} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		// marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	selectContainer: {
		width: 654 * DP,
		height: 82 * DP,
		marginTop: 30 * DP,
	},
	input: {
		width: 654 * DP,
		height: 86 * DP,
		fontSize: 32 * DP,
		borderBottomColor: BLACK,
		borderBottomWidth: 2 * DP,
	},
});

export default ShelterAsk;
