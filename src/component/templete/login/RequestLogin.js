import React, {useState} from 'react';
import {Text, View} from 'react-native';
import TabSelectBorder_Type1 from 'Molecules/tab/TabSelectBorder_Type1';
import {login_style, btn_style, requestLogin_style, loginTemplete_style} from 'Templete/style_templete';
import {txt} from 'Root/config/textstyle';
import {NEEDS_LOGIN_ARE_YOU_MEMBER} from 'Root/i18n/msg';
import AniButton from 'Molecules/button/AniButton';
import {btn_w522} from 'Atom/btn/btn_style';
import {Facebook_Icon, Instagram_Icon, Kakao_Icon, Naver_Icon} from 'Atom/icon';

export default RequestLogin = props => {
	const onPressRegister = () => {
		console.log('register ');
	};
	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			{/* Text Massage	 */}
			<View style={requestLogin_style.txt_msg}>
				<Text style={[txt.noto28, txt.center]}>{NEEDS_LOGIN_ARE_YOU_MEMBER}</Text>
			</View>

			{/* (A)Btn_w522 */}
			<View style={[btn_style.btn_w522, requestLogin_style.btn_w522]}>
				<AniButton btnLayout={btn_w522} btnTitle={'회원가입'} onPress={onPressRegister} titleFontStyle={30} />
			</View>

			<View style={[login_style.social_info, loginTemplete_style.social_info]}>
				<View style={[loginTemplete_style.socialLogin_icon]}>
					<Naver_Icon />
				</View>
				<View style={[loginTemplete_style.socialLogin_icon]}>
					<Kakao_Icon />
				</View>
				<View style={[loginTemplete_style.socialLogin_icon]}>
					<Instagram_Icon />
				</View>
				<View style={[loginTemplete_style.socialLogin_icon]}>
					<Facebook_Icon />
				</View>
			</View>
			{/* social login */}
			<View style={[requestLogin_style.social_info]}>
				<Text style={[txt.noto24]}>소셜아이디로 로그인</Text>
			</View>
		</View>
	);
};
