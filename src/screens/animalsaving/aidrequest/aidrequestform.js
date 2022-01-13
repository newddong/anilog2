import React, {useState, useRef} from 'react';
import {ScrollView} from 'react-native';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	HeartBtnIcon,
	HeartBtnFocusedIcon,
	ShareFocusedIcon,
	Kakao,
	CopylinkIcon,
	MessageIcon,
	Bracket,
	GliderIcon,
} from 'Asset/image';
import Comments from 'Screens/movie/moviehome/subcomponent/comments';
import LostAnimal from './lostanimal';
import DP, {svg_size} from 'Root/screens/dp';
import {Shadow} from 'react-native-shadow-2';
import Adoption from './btn_adoption.svg';
import TemporalProtection from './btn_temporalProtection.svg';
import Cross from './cross.svg';
import Minus from './minus.svg';
import Checked from './btn_checked.svg';

const SelectBox = props => {
	const addSub = StyleSheet.create({
		width: 20 * DP,
		height: 20 * DP,
	});

	return (
		<View style={form.box_picker}>
			{props.addSub && (
				<View style={form.sub}>
					<View style={addSub}>
						<Minus {...svg_size} fill="black" />
					</View>
				</View>
			)}
			<View style={[form.picker_txt, {paddingHorizontal: props.addSub ? 8 * DP : 15 * DP}]}>
				<Text style={txt.roboto30r}>{props.children}</Text>
			</View>
			{props.bracket && (
				<View style={form.bracket}>
					<Bracket {...svg_size} fill="black" />
				</View>
			)}
			{props.addSub && (
				<View style={form.add}>
					<View style={addSub}>
						<Cross {...svg_size} fill="black" />
					</View>
				</View>
			)}
		</View>
	);
};

const PetLife = props => {
	return (
		<View style={{alignItems: 'center', flexDirection: 'row', marginVertical: 25 * DP}}>
			<SelectBox bracket={true}>
				<Text style={txt.noto24r}>개</Text>
			</SelectBox>
			<Text style={[txt.noto24r, {marginLeft: 20 * DP, marginRight: 10 * DP}]}>나이</Text>
			<SelectBox addSub>
				<Text style={txt.roboto24r}>16</Text>
			</SelectBox>
			<Text style={[txt.noto24r, {marginLeft: 6 * DP, marginRight: 22 * DP}]}>살</Text>
			<Text style={[txt.noto24r, {marginLeft: 22 * DP, marginRight: 10 * DP}]}>반려생활</Text>
			<SelectBox addSub>
				<Text style={txt.roboto24r}>13</Text>
			</SelectBox>
			<Text style={[txt.noto24r, {marginLeft: 6 * DP}]}>년</Text>
		</View>
	);
};

SelectBox.defaultProps = {
	bracket: false,
	addSub: false,
};

const LiveOrDie = props => {
	const [check, setCheck] = useState(1);
	return (
		<View style={form.select_life}>
			<TouchableWithoutFeedback
				onPress={() => {
					setCheck(1);
				}}>
				<View style={form.select_option}>
					<View style={form.btn_radio}>{check == 1 && <View style={form.btn_radio_center} />}</View>
					<Text style={[txt.noto24r, check == 1 ? txt.pink : {color: 'black'}]}>
						현재 함께 살고 있어요
					</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback
				onPress={() => {
					setCheck(2);
				}}>
				<View style={form.select_option}>
					<View style={form.btn_radio}>{check == 2 && <View style={form.btn_radio_center} />}</View>
					<Text style={[txt.noto24r, check == 2 ? txt.pink : {color: 'black'}]}>
						무지개 다리를 건넜어요
					</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const CheckPoint = props => {
	const checkboxstyle = {width: 42 * DP, height: 42 * DP, marginRight: 10 * DP};
	const notchecked = {borderWidth: 2 * DP, borderColor: '#DBDBDB'};
	const [click, setClick] = useState(false);
	return (
		<TouchableWithoutFeedback onPress={() => setClick(!click)}>
			<View style={{flexDirection: 'row', marginVertical: 15 * DP}}>
				{click ? (
					<View style={{...checkboxstyle}}>
						<Checked {...svg_size} />
					</View>
				) : (
					<View style={[checkboxstyle, notchecked]} />
				)}
				<View style={{width: 602 * DP}}>
					<Text style={[txt.noto24r, click ? txt.pink : {color: 'black'}]}>{props.children}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AidRequestForm = props => {
   const [modal, setModal] = useState(false);
	return (
		<View style={form.wrp_main}>
			<ScrollView>
				<View style={form.wrp_sctn}>
					<View style={form.sctn_bar_title}>
						<Text style={[txt.noto30b, txt.gray]}>보호 장소 확인</Text>
					</View>
					<View style={form.sctn_content}>
						<Text style={txt.noto24r}>서울 마포구 서강 1로 21 래미안 301동 1105호</Text>
					</View>
					<View style={[form.sctn_btn, form.shadow, {right: 48 * DP, bottom: 92 * DP}]}>
						<Text style={txt.noto24r}>주소검색</Text>
					</View>
				</View>

				<View style={form.wrp_sctn}>
					<View style={form.sctn_bar_title}>
						<Text style={[txt.noto30b, txt.gray]}>연락처</Text>
					</View>
					<View style={form.sctn_content}>
						<View style={form.contact}>
							<SelectBox bracket={true}>Skt</SelectBox>
							<SelectBox bracket={true}>010</SelectBox>
							<SelectBox>12345678</SelectBox>
						</View>
					</View>
					<View style={[form.sctn_btn, form.shadow, {right: 48 * DP, bottom: 40 * DP}]}>
						<Text style={txt.noto24r}>인증하기</Text>
					</View>
				</View>

				<View style={form.wrp_sctn}>
					<View style={form.sctn_bar_title}>
						<Text style={[txt.noto30b, txt.gray]}>반려 동물 생활</Text>
					</View>
					<View style={form.sctn_content}>
						<PetLife></PetLife>
						<LiveOrDie />
						<PetLife></PetLife>
						<LiveOrDie />
					</View>
					<View style={form.add_pet}>
						<Text style={[txt.noto24r, txt.gray]}>반려동물 추가하기</Text>
						<View style={{marginLeft: 6 * DP, width: 20 * DP, height: 20 * DP}}>
							<Cross {...svg_size} fill="gray" />
						</View>
					</View>
				</View>

				<View style={form.wrp_sctn}>
					<View style={form.sctn_bar_title}>
						<Text style={[txt.noto30b, txt.gray]}>체크 포인트</Text>
					</View>
					<View style={form.sctn_content}>
						<CheckPoint>하루 평균 4시간 이상 집이 비어 있을 때가 일주일에 5일 이상이다.</CheckPoint>
						<CheckPoint>함께 지내는 사람들중 동물 관련 알러지 보유자가 있다.</CheckPoint>
						<CheckPoint>
							현 거주지에서 반려동물을 금지하거나 소음에 대한 규제가 엄격하다.
						</CheckPoint>
						<CheckPoint>현재 다른 동물에 심한 경계/적대감을 보이는 반려동물이 있다.</CheckPoint>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
						<Text style={[txt.noto24r, txt.gray]}>지금까지의 선택을 기본값으로 유지</Text>
						<View style={{marginLeft: 10 * DP, width: 42 * DP, height: 42 * DP}}>
							<Checked {...svg_size} />
						</View>
					</View>
				</View>

				<View style={[form.wrp_sctn, {borderBottomColor: '#FFF'}]}>
					<View style={form.sctn_bar_title}>
						<Text style={[txt.noto30b, txt.gray]}>신청 동기</Text>
					</View>
					<View style={form.sctn_content}>
						<Text style={txt.noto24r}>
							안녕하세요! 저는 중학생때 부터 키웠던 댕댕이 한 마리를 떠나보내고, 지금은 고양이 한
							마리를 모시고 있는 집사입니다. 한 달 뒤에 조금 더 큰 집으로 이사 할 계획이라 우리 레미
							동생 만들어 주고 싶어서 신청하게 되었습니다.
						</Text>
					</View>
				</View>

				<View style={form.cntr_apply_btn}>
					<View style={[form.btn_apply2, form.shadow]}>
						<Text style={txt.noto24r}>임시저장</Text>
					</View>
               <TouchableWithoutFeedback onPress={()=>{setModal(true)}}>
					<View style={[form.btn_apply, form.shadow]}>
						<Text style={[txt.noto24b, txt.white]}>신청서제출</Text>
					</View>
               </TouchableWithoutFeedback>
				</View>
			</ScrollView>
         {modal&&<>
         <TouchableWithoutFeedback onPress={()=>{setModal(false)}}>
			<View style={form.modal}></View>
         </TouchableWithoutFeedback>
			<View style={form.pop}>
            <Text style={form.noto30r}>이 내용으로 제출 하시겠습니까?</Text>
				<View style={[form.cntr_apply_btn,{width:'100%'}]}>
					<View style={[form.btn_apply2, form.shadow,{width:162*DP}]}>
						<Text style={txt.noto24r}>취소</Text>
					</View>
					<View style={[form.btn_apply, form.shadow,{width:162*DP}]}>
						<Text style={[txt.noto24b, txt.white]}>제출</Text>
					</View>
				</View>
			</View></>}
		</View>
	);
};

const form = StyleSheet.create({
	wrp_main: {
		flex: 1,
		backgroundColor: '#FFF',
		paddingTop: 30 * DP,
	},
	wrp_content: {
		paddingHorizontal: 48 * DP,
		backgroundColor: '#FFF',
	},
	wrp_sctn: {
		paddingHorizontal: 48 * DP,
		paddingVertical: 40 * DP,
		backgroundColor: '#FFF',
		borderBottomColor: '#DBDBDB',
		borderBottomWidth: 2 * DP,
	},
	sctn_bar_title: {
		marginBottom: 16 * DP,
	},
	sctn_btn: {
		position: 'absolute',
		width: 190 * DP,
		height: 60 * DP,
		backgroundColor: '#fff',
		borderRadius: 30 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sctn_content: {},
	contact: {
		flexDirection: 'row',
	},
	box_picker: {
		borderWidth: 2 * DP,
		borderColor: '#DBDBDB',
		height: 48 * DP,
		flexDirection: 'row',
		// justifyContent:'space-evenly',
		alignItems: 'center',
	},
	picker_txt: {
		alignItems: 'center',
	},
	add: {
		paddingHorizontal: 8 * DP,
		borderColor: '#DBDBDB',
		borderLeftWidth: 2 * DP,
		justifyContent: 'center',
		height: '100%',
	},
	sub: {
		paddingHorizontal: 8 * DP,
		borderColor: '#DBDBDB',
		borderRightWidth: 2 * DP,
		justifyContent: 'center',
		height: '100%',
	},

	bracket: {
		marginLeft: 14 * DP,
		height: 40 * DP,
		width: 40 * DP,
		transform: [{rotate: '90deg'}],
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 4,
	},

	select_life: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	select_option: {
		flexDirection: 'row',
	},
	btn_radio: {
		height: 40 * DP,
		width: 40 * DP,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: '#DBDBDB',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 6 * DP,
	},
	btn_radio_center: {
		height: 25 * DP,
		width: 25 * DP,
		borderRadius: 30 * DP,
		backgroundColor: '#FFB6A5',
	},
	add_pet: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40 * DP,
	},
	cntr_apply_btn: {
		paddingHorizontal: 48 * DP,
		marginTop: 40 * DP,
		marginBottom: 70 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	btn_apply: {
		backgroundColor: '#FFB6A5',
		height: 60 * DP,
		width: 278 * DP,
		borderRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn_apply2: {
		backgroundColor: '#FFF',
		height: 60 * DP,
		width: 190 * DP,
		borderRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modal: {
		position: 'absolute',
		opacity: 0.5,
		backgroundColor: 'gray',
		height: 1500 * DP,
		width: '100%',
		flexGrow: 1,
		flexShrink: 1,
	},
	pop: {
		position: 'absolute',
		width: 550 * DP,
		height: 226 * DP,
		borderRadius: 30 * DP,
		borderBottomRightRadius: 0,
		backgroundColor: '#FFF',
		top: 422 * DP,
		left: 100 * DP,
      paddingHorizontal:30*DP,
      paddingVertical:40*DP,
      alignItems:'center'
	},
});

const txt = StyleSheet.create({
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 38 * DP,
	},
	noto36r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 36 * DP,
		lineHeight: 54 * DP,
	},
   noto30r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 30 * DP,
		lineHeight: 48 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		lineHeight: 48 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 41 * DP,
	},
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 42 * DP,
	},
	noto24b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 24 * DP,
		lineHeight: 32 * DP,
	},
	noto22r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 22 * DP,
		lineHeight: 32 * DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24 * DP,
		lineHeight: 30 * DP,
	},
	roboto28r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 28 * DP,
		lineHeight: 38 * DP,
	},
	roboto30r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 30 * DP,
		lineHeight: 36 * DP,
	},
	gray: {
		color: '#767676',
	},
	white: {
		color: '#FFF',
	},
	pink: {
		color: '#FFB6A5',
	},
});
