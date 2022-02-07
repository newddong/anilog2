import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Root/component/molecules/button/AniButton';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';
import Input30 from 'Root/component/molecules/input/Input30';
import InputWithSelect from 'Root/component/molecules/input/InputWithSelect';
import {mobile_carrier} from 'Root/i18n/msg';

export default PasswordResetIdentification = props => {
	const [name, setName] = React.useState('');
	const [mobile_number, setMobile_number] = React.useState('');

	const onChangeName = name => {
		setName(name);
	};

	const onChangeMobile = num => {
		setMobile_number(num);
	};

	const onPressConfirm = () => {
		const confirmed = true;
		if (confirmed) {
			props.navigation.push('PasswordReset', '121212');
		} else {
			Modal.popOneBtn('이 정보로 가입한 계정이 없습니다.' + name + ' / ' + mobile_number, '확인', () => Modal.close());
		}
	};

	return (
		<View style={[styles.container]}>
			<View style={[styles.infoMessageBox]}>
				<Text style={[txt.noto30, {color: GRAY10, textAlign: 'center'}]}>회원가입시 등록한 정보로 {'\n'} 비밀번호를 재설정 할 수 있습니다.</Text>
			</View>
			<View style={[styles.nameInputBox]}>
				<Input30
					width={654}
					onChange={onChangeName}
					showCrossMark={false}
					showTitle={false}
					showmsg={false}
					placeholder={'회원가입시 등록한 계정의 이름을 적어주세요.'}
				/>
			</View>

			<View style={[styles.phoneInput]}>
				<InputWithSelect items={mobile_carrier} width={400} onChange={onChangeMobile} placeholder={'회원가입시 등록한 번호 입력'} />
			</View>
			<View style={[styles.buttonContainer]}>
				<AniButton onPress={onPressConfirm} btnTitle={'확인'} btnStyle={'border'} btnLayout={btn_w654} titleFontStyle={32} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#FFF',
	},
	infoMessageBox: {
		// width: 414 * DP,
		height: 94 * DP,
		marginTop: 158 * DP,
		alignItems: 'center',
	},
	nameInputBox: {
		marginTop: 80 * DP,
	},
	phoneInput: {
		marginTop: 60 * DP,
	},
	buttonContainer: {
		marginTop: 110 * DP,
	},
});
