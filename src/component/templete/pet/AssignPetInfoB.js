import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, GRAY40, GRAY50} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import Stagebar from 'Molecules/info/Stagebar';
import AniButton from 'Molecules/button/AniButton';
import {login_style, btn_style, temp_style, progressbar_style} from 'Templete/style_templete';
import DatePicker from 'Molecules/select/DatePicker';
import Modal from 'Component/modal/Modal';
import {assignPet} from 'Root/api/userapi';
import {stagebar_style} from 'Organism/style_organism copy';
import userGlobalObj from 'Root/config/userGlobalObject';
import Input24 from 'Root/component/molecules/input/Input24';
import ArrowButton from 'Root/component/molecules/button/ArrowButton';

export default AssignPetInfoB = props => {
	// console.log('AssignPetInfoB', props.route.params.data);
	const navigation = useNavigation();
	const isAdoptRegist = props.route.params.isAdoptRegist;
	const weightRef = React.useRef(0);
	const params = props.route.params.data;
	const [data, setData] = React.useState({
		...props.route.params.data,
		pet_birthday: '',
		pet_weight: '',
	});

	React.useEffect(() => {
		if (isAdoptRegist) {
			setData({...params, pet_weight: '0', pet_birthday: '2021.03.03'});
		}
	}, []);

	const [selectedBirthDate, setSelectedBirthDate] = React.useState('2022.01.01');
	const [btnOn, setBtnOn] = React.useState(true);
	//생녈월일 계산 함수
	const getBirthDate = () => {
		const today = new Date().getTime();
		let split = selectedBirthDate.split('.');
		const selectDate = new Date(split[0], split[1] - 1, split[2]);
		const duration = (today - selectDate.getTime()) / 1000;
		// console.log(duration / 86400); //하루단위
		const birthDate = () => {
			let year = parseInt(duration / 86400 / 365) + '년 ';
			let month = parseInt(((duration / 86400) % 365) / 30) + '개월';
			if (parseInt(duration / 86400 / 365) == 0) {
				year = '';
			}
			return year + month;
		};
		return <Text>{birthDate()}</Text>;
	};

	//생일이 지정되었을 때
	const onSelectBirthDate = date => {
		setSelectedBirthDate(date);
		setData({...data, pet_birthday: date});
		weightRef.current.focus();
	};

	//체중 Input Value 바뀌었을 때
	const onChangeKg = kg => {
		let res = kg;
		if (res.startsWith('0') && !res.includes('.') && res.length > 1) {
			res = res.replace('0', '');
		}
		console.log('res', res);
		setData({...data, pet_weight: res});
	};

	//등록 완료
	const onRegister = () => {
		let isCopied = {...data};
		if (isCopied.user_profile_uri == '') {
			isCopied.user_profile_uri = 'https://';
		}
		console.log('isCop', isCopied);
		Modal.popLoading();
		assignPet(
			{
				...isCopied,
				userobject_id: data.userobject_id,
			},
			success => {
				Modal.close();
				// console.log('success', success.msg);
				// console.log('아바타', userGlobalObj.userInfo.user_avatar);
				try {
					if (userGlobalObj.userInfo.user_avatar != undefined) {
						userGlobalObj.userInfo.user_avatar = userGlobalObj.userInfo.user_avatar.push(success.msg);
					}
				} catch (err) {
					console.log('err', err);
				}

				Modal.popNoBtn('반려동물 등록이 완료되었습니다.');
				setTimeout(() => {
					Modal.close();
					console.log('반려 추가 등록 전 userGlobal', userGlobalObj.userInfo.hasOwnProperty('_id'));
					// 일반유저가 MY탭에서 반려동물을 추가할 경우 계속 추가 등록이 가능하도록 네비게이션 초기화 처리
					Modal.popTwoBtn(
						'추가로 등록할 반려동물이 있나요?',
						'아니오',
						'추가 등록',
						() => {
							props.navigation.navigate(data.previousRouteName);
						},
						() => {
							//reset 설정 시 기존의 state값들은 초기화됨
							if (data.previousRouteName == 'Login') {
								props.navigation.reset({
									index: 1,
									routes: [{name: 'Login'}, {name: 'AssignPetProfileImage', params: {userobject_id: data.userobject_id, previousRouteName: 'Login'}}],
								});
							} else {
								props.navigation.reset({
									index: 2,
									routes: [
										{name: 'UserMenu'},
										{name: 'UserInfoSetting', params: {token: userGlobalObj.userInfo._id}},
										{name: 'AssignPetProfileImage', params: {previousRouteName: 'UserInfoSetting'}},
									],
								});
							}
						},
						() => {
							props.navigation.navigate(data.previousRouteName);
						},
					);
				}, 500);
			},
			error => {
				console.log('error', error);
				Modal.close();
			},
		);
	};

	const weigthValid = e => {
		var regExp = /^[0-9]{1,2}(\.[0-9]{0,1})?$/;
		// var regExp = /^[\D]{1,20}$/;
		setBtnOn(!regExp.test(e));
		return regExp.test(e);
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={3} //현재 단계를 정의
					maxstage={3} //전체 단계를 정의
					width={640 * DP} //bar의 너비
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
				/>
			</View>
			<View style={[style.textMsg]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>반려 동물의 생일과 체중을 적어주세요.</Text>
			</View>
			<View style={[style.inputForm]}>
				<View style={[style.birthCont]}>
					<Text style={[txt.noto28, temp_style.text_assignPetInfo]}>생일</Text>
					<View style={[style.datePicker_depth1]}>
						<DatePicker width={418} onDateChange={onSelectBirthDate} defaultDate={'눌러서 지정!'} future={false} />
					</View>
					{data.pet_birthday != '' ? <Text style={[txt.noto24, style.text218]}>{getBirthDate()}</Text> : <></>}
				</View>
				<View style={[style.line2]}>
					<Text style={[txt.noto28, temp_style.text_assignPetInfo]}>몸무게</Text>
					<View style={[style.inputNoTitle]}>
						<Input24
							keyboardType={'number-pad'}
							ref={weightRef}
							value={data.pet_weight}
							width={550}
							height={104}
							alert_msg={'두자리 숫자, 소수점 한자리'}
							showMsg={false}
							confirm_msg="올바른 양식입니다."
							onChange={onChangeKg}
							validator={weigthValid}
							placeholder={'몸무게 입력'}
							showCrossMark={false}
							maxlength={4}
							style={{textAlign: 'center'}}
						/>
						<View style={{position: 'absolute', height: 104 * DP, right: 24 * DP, justifyContent: 'center'}}>
							<Text style={[txt.noto28, {}]}>kg</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={[style.btn_w226_viewB]}>
				<ArrowButton direction={'back'} onPress={() => navigation.goBack()} />
				{/* <AniButton btnTitle={'등록'} onPress={onRegister} disable={btnOn} /> */}
				<TouchableOpacity
					onPress={onRegister}
					style={{
						width: 162 * DP,
						height: 70 * DP,
						borderRadius: 30 * DP,
						borderWidth: 2 * DP,
						borderColor: GRAY30,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Text style={[txt.noto24]}>완료</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

const style = StyleSheet.create({
	textMsg: {
		width: 694 * DP,
		height: 36 * DP,
		marginTop: 12 * DP,
	},
	inputForm: {
		width: 694 * DP,
		height: 224 * DP,
		marginTop: 70 * DP,
	},
	birthCont: {
		flexDirection: 'row',
		width: 694 * DP,
		height: 104 * DP,
		alignItems: 'center',
	},
	dropdownSelect_depth1: {
		marginLeft: 16 * DP,
	},
	dropdownSelect_depth2: {
		marginLeft: 24 * DP,
	},
	line2: {
		flexDirection: 'row',
		width: 694 * DP,
		height: 104 * DP,
		alignItems: 'center',
		marginTop: 60 * DP,
	},
	tabSelectFilled_Type1: {
		marginLeft: 16 * DP,
	},
	line3: {
		marginTop: 60 * DP,
	},
	btn_w226_viewA: {
		marginTop: 110 * DP,
	},
	btn_w226: {
		marginLeft: 202 * DP,
	},
	datePicker_depth1: {
		marginLeft: 12 * DP,
	},
	text218: {
		marginTop: 46 * DP,
		marginLeft: 12 * DP,
	},
	inputNoTitle: {
		marginLeft: 12 * DP,
	},
	text68: {
		marginLeft: 16 * DP,
	},
	btn_w226_viewB: {
		flexDirection: 'row',
		width: 694 * DP,
		justifyContent: 'space-between',
		marginTop: 130 * DP,
	},
	petKind: {
		width: 204 * DP,
		height: 82 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
	},
	pet_species_detail: {
		width: 292 * DP,
		height: 82 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
	},
	petKind_text: {
		minWidth: 120 * DP,
		// width: 120 * DP,
		height: 44 * DP,
		textAlign: 'center',
	},
	pet_species_detail_text: {
		minWidth: 208 * DP,
		// width: 208 * DP,
		height: 44 * DP,
		textAlign: 'center',
	},
});
