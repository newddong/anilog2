import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {btn_w654} from '../atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import ProfileImageSelect from 'Molecules/select/ProfileImageSelect';
import {login_style, btn_style, temp_style, assignShelterProfileImage_style} from './style_templete';
import Modal from 'Component/modal/Modal';
import {launchImageLibrary} from 'react-native-image-picker';
import {assignShelter} from 'Root/api/userapi';
import ImagePicker from 'react-native-image-crop-picker';

export default AssignShelterProfileImage = props => {
	const [data, setData] = React.useState({
		...props.route.params,
		user_profile_uri: '',
	});

	const assginShelter = () => {
		Modal.popNoBtn('등록중입니다.');
		console.log('data', data);

		assignShelter(
			{...data, user_profile_uri: data.user_profile_uri ? data.user_profile_uri : 'http://'},
			successmsg => {
				console.log('보호소가입 ID : ', successmsg.shelter_delegate_contact_number);
				console.log('보호소가입 PWD : ', successmsg.user_password);
				Modal.close(); //NoBtn팝업 종료
				Modal.popNoBtn('보호소 등록이 완료되었습니다.');
				setTimeout(() => {
					Modal.close();
					props.navigation.reset({index: 0, routes: [{name: 'Login'}]});
				}, 1000);
			},
			errormsg => {
				Modal.close();
				//에러메세지 표시
				Modal.popOneBtn(errormsg, '확인', () => {
					Modal.close();
				});
			},
		);
	};

	const selectPhoto = () => {
		ImagePicker.openPicker({
			compressImageQuality: 0.8,
			cropping: true,
			cropperCircleOverlay: true,
		})
			.then(images => {
				setData({...data, user_profile_uri: images.path});
				Modal.close();
			})
			.catch(err => console.log(err + ''));
		Modal.close();
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			{/* Text Msg */}
			<View style={[temp_style.textMsg_AssignUserProfileImage, assignShelterProfileImage_style.txt_msg]}>
				<Text style={[txt.noto24]}>프로필 이미지를 설정해주셔야해요.</Text>
			</View>

			{/* (M)ProfileImageSelect */}
			<View style={[temp_style.profileImageSelect, assignShelterProfileImage_style.profileImageSelect]}>
				<ProfileImageSelect onClick={selectPhoto} selectedImageUri={data.user_profile_uri} />
			</View>

			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, assignShelterProfileImage_style.btn_w654]}>
				<AniButton btnTitle={'확인'} titleFontStyle={'32'} disable={data.user_profile_uri == ''} btnLayout={btn_w654} onPress={assginShelter} />
			</View>
		</View>
	);
};
