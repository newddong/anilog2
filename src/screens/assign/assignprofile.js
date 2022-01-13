import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Screens/dp';
import {BLACK, GRAY, GRAY_BRIGHT, GRAY_PLACEHOLDER, MAINCOLOR, SLIGHT_BLACK, LINK, WHITE, RED, GRAY_TXT_INPUT, GREEN} from 'Screens/color';
import {
	CHECK_VERIFYCATION_NUM1,
	COMPLETE_VERIFYCATION,
	COMPLETE_ASSIGN,
} from 'Screens/msg';
import {DownBracketBlack, CancelInput, BtnWriteFeed} from 'Asset/image';
import blankProfile from 'Asset/image/blankProfile.png';
import {txt, lo, btn, form, tab, assign_profile} from './style_assign';
import FormTxtInput from 'Screens/common/formtxtinput';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serveruri, cookieReset} from 'Screens/server';
import {addPet} from 'Root/api/userapi';
import axios from 'axios';
//todo:닉네임 체크 로직(서버랑)

export default AssingProfile = props => {
	const [existId, setExistId] = React.useState(false);

	const [match, setMatch] = React.useState(false);
	const [stat, setStat]  = React.useState(0);
	const [data, setData] = React.useState({
		...props.route.params?.data,
		profileImg:null
	});

	React.useEffect(()=>{
		setData({...data,profileImg:props.route.params.localSelectedImages?.uri});
	},[props.route.params.localSelectedImages])


	const completeAssign = () => {
		setStat(1);
		console.log(data);
		// props.navigation.navigate('Assign');
		// 서버에 유저 추가 신청
		// 아이디 중복체크, 비밀번호 유효성 체크, 서버작업 필요
		let form = new FormData();
		form.append('id',data.phone!==''?data.phone:(data.email+'@'+(data.userEmailCompany===null?data.emailCompany:data.userEmailCompany)));
		form.append('password',data.password);
		form.append('name',data.name);
		form.append('nickname',data.nickname);
		form.append('userType','user');
		form.append('idType',data.mobilecompany?'mobile':'email');
		form.append('mobilecompany',data.mobilecompany);
		form.append('imgfile',{
			name: data.profileImg,
			type: 'image/jpeg',
			uri: data.profileImg
		});
		/*
		addUser({
			id:data.phone!==''?data.phone:(data.email+'@'+(data.userEmailCompany===null?data.emailCompany:data.userEmailCompany)),
			password:data.password,
			name:data.name,
			nickname:data.nickname,
			userType:'user',
			idType:data.mobilecompany?'mobile':'email',
			mobilecompany:data.mobilecompany,
			imgfile:props.route.params?.localSelectedImages,
		},
		()=>{

		})*/


		axios.post(serveruri+'/user/add',form,{
			headers:{
				'Content-Type':'multipart/form-data'
			}
		})
			.then(res => {
			console.log(res);
			// 성공후 이동
			setStat(2);
			setTimeout(()=>{props.navigation.navigate('Login')},2000);
		});
	};



	const changeNickname = (e) => {
		setData({...data, nickname:e.nativeEvent.text})
	}

	const selectPhoto = () => {
		props.navigation.navigate('AddSinglePhoto',{navfrom:'AssingProfile'});
	}

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<View style={lo.assign_profile}>
					<Text style={[txt.noto24, txt.gray, {marginTop: 20 * DP}]}>프로필 사진과 닉네임은 나중에도 변경 할 수 있어요.</Text>
					<View style={assign_profile.cntr_profile}>
						<Image
							style={assign_profile.img_profile}
							source={data.profileImg?{uri: data.profileImg}:blankProfile}></Image>

						<TouchableWithoutFeedback
							onPress={selectPhoto}>
							<View style={assign_profile.btn_add}>
								<SvgWrapper style={{width: 92 * DP, height: 92 * DP}} svg={<BtnWriteFeed fill="#fff" />} />
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>

				<View style={[lo.pass_form]}>
					<Text style={[txt.noto30b, {color: GRAY, lineHeight: 40 * DP}]}>{'닉네임'}</Text>
					<Text style={[txt.noto24, {color: GRAY_PLACEHOLDER}]}>{"*2자 이상 15자 이내의 한글,영문,숫자,'_'의 입력만 가능합니다"}</Text>
					<FormTxtInput
						onChange={changeNickname}
						inputStyle={[txt.noto28, form.mobile_input]}
						placeholder={'닉네임을 입력하세요'}
						placeholderTextColor={GRAY_PLACEHOLDER}></FormTxtInput>
				</View>

				<View style={[lo.confirm_status, {borderTopColor: existId ? RED : GREEN}]}>
					<Text style={[txt.noto30, {color: existId ? RED : GREEN}]}>{existId ? '이미 사용중인 닉네임입니다.' : '사용이 가능한 닉네임입니다.'}</Text>
				</View>

				{stat!==0 ? (
					<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{COMPLETE_ASSIGN}</Text>
					</View>
				) : (
					<TouchableWithoutFeedback onPress={completeAssign}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto32b, txt.white]}>{COMPLETE_ASSIGN}</Text>
						</View>
					</TouchableWithoutFeedback>
				)}

				{false && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>{COMPLETE_VERIFYCATION}</Text>
					</View>
				)}
				{false && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>{CHECK_VERIFYCATION_NUM1}</Text>
					</View>
				)}
				{stat===1 && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>아이디를 등록중입니다.</Text>
					</View>
				)}
				{stat===2 && (
					<View style={[lo.msg_pop, btn.shadow]}>
						<Text style={[txt.noto30b, {color: GRAY}]}>등록이 완료되었습니다.</Text>
					</View>
				)}
			</View>
		</View>
	);
};

const TabButton = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={props.select ? tab.btn_tab : tab.btn_tab_notselected}>
				<Text style={props.select ? [txt.noto28b, {color: MAINCOLOR}] : [txt.noto28, {color: GRAY}]}>{props.txt}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};
