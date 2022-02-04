import React from 'react';
import {Text, View} from 'react-native';
import {btn_w226} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Input30 from 'Molecules/input/Input30';
import InputTimeLimit from 'Molecules/input/InputTimeLimit';
import InputWithEmail from 'Molecules/input/InputWithEmail';
import {btn_style, temp_style} from 'Templete/style_templete';
import {emailVerification} from 'Organism/style_organism';

export default EmailVerification = props => {
	const [timeOut, setTimeOut] = React.useState(false);
	const onEndTimer = () => {
		setTimeOut(true);
	};

	const requestReVerification = () => {
		console.log('requestReVerification');
	};
	const requestVerification = () => {
		console.log('requestVerification');
	};
	return (
		<View style={[emailVerification.container]}>
			<View style={[temp_style.input30, emailVerification.input30]}>
				<Input30 showTitle={false} width={654} placeholder={'이름을 입력해주세요'} />
			</View>
			<View style={[temp_style.inputWithSelect, emailVerification.inputWithSelect]}>
				<InputWithEmail width={330} placeholder={'이메일을 입력해주세요'} />
			</View>
			<View style={{flexDirection: 'row', backgroundColor: 'white'}}>
				<View style={[emailVerification.inputTimeLimit]}>
					<InputTimeLimit
						timelimit={5}
						onEndTimer={onEndTimer}
						placeholder={'인증번호 입력'}
						timeout_msg={'인증 가능한 시간이 초과되었습니다.'}
						alert_msg={'인증번호가 일치하지 않습니다.'}
					/>
				</View>
				<View style={[btn_style.btn_w226, emailVerification.btn_w226]}>
					{timeOut ? (
						<AniButton
							btnLayout={btn_w226}
							btnTitle={'인증 재요청'}
							btnTheme={'shadow'}
							btnStyle={'border'}
							titleFontStyle={24}
							onPress={requestReVerification}
						/>
					) : (
						<AniButton btnLayout={btn_w226} btnTitle={'인증 요청'} btnTheme={'shadow'} titleFontStyle={24} onPress={requestVerification} />
					)}
				</View>
			</View>
		</View>
	);
};

// btnTitle: 'title', //버튼의 제목
// 	btnTheme: 'shadow', // btnTheme - ’shadow’, ‘noShadow’, ‘gray’에서 결정
// 	btnStyle: 'filled', // btnStyle - ‘filled’, ‘border’, ‘noBorder’ 에서 결정
// 	disable: false, // disable - 기본값은 false true일 경우 버튼 탭을 할수없도록 하고 표시를 바
// 	titleFontStyle: 24 * DP, // titleFontStyle - title의 폰트 크기
// 	btnLayout: btn_w226, // btnLayout - 버튼의 레이아웃(width, height, borderRadius를 결정)
// 	onPress: {}, // 버튼을 탭했을때 발생하는 콜백
