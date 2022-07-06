import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	StyleSheet,
	Keyboard,
	FlatList,
	TouchableWithoutFeedback,
} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, BLACK, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import {getAllAnnouncement} from 'Root/api/announcement';
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
import {Check42, Check50, Rect42_Border} from 'Root/component/atom/icon';
import {assignCheckListItem} from 'Root/component/organism/style_organism copy';
import {KeyboardAvoidingView} from 'native-base';

// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)

const AskQuestion = ({route}) => {
	const navigation = useNavigation();
	const [loading, setLoading] = React.useState(true);
	const [category, setCategory] = React.useState('카테고리 선택');
	const [contents, setContents] = React.useState();
	const [userAgreement, setUserAgreement] = React.useState();
	const [commomCode, setCommonCode] = React.useState();
	const [categoryList, setCategoryList] = React.useState([]);
	const [title, setTitle] = React.useState();
	const userAssign_agreementCheckList = [{text: '개인정보 수집 이용약관 동의 (필수)', detail: true}];
	const [id, setId] = React.useState();
	React.useEffect(() => {
		let i;
		let temp = [];
		getCommonCodeDynamicQuery(
			{common_code_c_name: 'helpbycategoryobjects', common_code_language: 'kor', common_code_out_type: 'list'},
			result => {
				// console.log('common code result', result.msg);
				for (i in result.msg) {
					temp.push(result.msg[i].common_code_msg_kor);
				}
				setCategoryList(temp.slice(2));
				setLoading(false);
				setCommonCode(result.msg.slice(2));
			},
			err => {
				console.log('common code err', err);
			},
		);
	}, []);
	// React.useEffect(() => {
	// 	console.log('categoy, contents, userAggree title', category, contents, userAgreement, title);
	// }, [category, contents, userAgreement, title]);
	const onSelectCategory = (v, i) => {
		// debug && console.log('city:', city[i]);
		// () => Keyboard.dismiss();
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

	const onChangeText = text => {
		setContents(text);
	};
	const onChangeTitle = text => {
		setTitle(text);
	};

	const onPressAcceptItem = (item, index, isCheck) => {
		setUserAgreement(isCheck);
	};

	React.useEffect(() => {
		console.log('user', userAgreement);
	}, [userAgreement]);

	const onPressDetail = index => {
		console.log(index + 'index 항목 더보기 클릭');
		Modal.popOneBtn('적용 예정입니다.', '확인', () => Modal.close());
	};

	const onPressAsk = () => {
		console.log('어쩌고저쩌고', userAgreement, category, contents, title);
		if (userAgreement && category != '카테고리 선택' && contents && title) {
			for (let i in commomCode) {
				if (commomCode[i].common_code_msg_kor == category) {
					// console.log('같은거 ', commomCode[i]._id);
					setId(commomCode[i]._id);
				}
			}
			createQandA(
				{
					qanda_common_code_id: id,
					qanda_question_title: title,
					qanda_question_contents: contents,
				},
				result => {
					console.log('Sucess', result);
					Modal.popOneBtn('문의완료 되었습니다.', '확인', () => navigation.goBack());
					// navigation.goBack();
				},
				err => {
					console.log('err', err);
				},
			);
		} else {
			Modal.close();
			if (!userAgreement) {
				Modal.alert('개인정보 수집 이용약관에 동의해주세요.');
			} else if (category == '카테고리 선택') {
				Modal.alert('문의 카테고리를 선택해주세요.');
			} else if (!contents && contents.length == 0) {
				Modal.alert('문의 내용을 적어주세요.');
			} else if (!title) {
				Modal.alert('제목을 입력해주세요.');
			}
			// Modal.popOneBtn('입력을 확인해주세요', '확인', () => Modal.close());
		}
	};
	const onCheck = isCheck => {
		setUserAgreement(isCheck);
		// props.onCheck(isCheck);
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.selectContainer}>
					<SelectInput onPressInput={onSelectCategory} width={654} height={82} fontSize={28} value={category} />
				</View>
				{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
				<View style={[{marginTop: 40 * DP}]}>
					<TextInput style={styles.input} value={title} placeholder="제목을 입력해 주세요." onChangeText={onChangeTitle} color={MAINBLACK} />
				</View>
				{/* </TouchableWithoutFeedback> */}
				{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
				<View style={[{marginTop: 50 * DP}]}>
					<InputLongText
						placeholder="문제 발생일시와 문의 내용을 보내주시면 문의 확인에 도움이 됩니다!"
						maxlength={500}
						onChange={onChangeText}
						value={contents}
					/>
				</View>
				{/* </TouchableWithoutFeedback> */}
				<View style={[{marginTop: 10 * DP}]}>
					{/* <AssignCheckList items={userAssign_agreementCheckList} onCheck={onPressAcceptItem} onPressDetail={onPressDetail} /> */}
					{/* <AssignCheckListItem items={userAssign_agreementCheckList} /> */}
					<View style={[assignCheckListItem.container]}>
						<View style={[styles.check42]}>
							<CheckBox onCheck={onCheck} state={userAgreement} />
						</View>
						<TouchableOpacity onPress={() => onCheck(!userAgreement)} style={[assignCheckListItem.textContainer]}>
							<Text style={[txt.noto28, {color: userAgreement ? MAINBLACK : MAINBLACK}]}>{userAssign_agreementCheckList[0].text}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onPressDetail} style={[assignCheckListItem.detailText]}>
							<Text style={[txt.roboto28b, {color: MAINBLACK, textDecorationLine: 'underline'}]}>보기</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={[{marginTop: 80 * DP}]}>
					<AniButton btnTitle={'문의접수'} titleFontStyle={32} btnStyle={'border'} btnLayout={btn_w654} onPress={onPressAsk} />
				</View>
			</ScrollView>
		);
	}
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
		color: MAINBLACK,
	},
});

export default AskQuestion;
