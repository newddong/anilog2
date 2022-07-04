import React from 'react';
import {Text, View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {login_style, btn_style, temp_style, progressbar_style, assignShelterAddress_style} from 'Templete/style_templete';
import {APRI10, GRAY10, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w336x82_r30, btn_w654, btn_w694_r30} from 'Atom/btn/btn_style';
import AniButton from 'Root/component/molecules/button/AniButton';
import Input24 from 'Molecules/input/Input24';
import AddressInput from 'Organism/input/AddressInput';
import {stagebar_style} from 'Root/component/organism/style_organism copy';
import StageBar from 'Root/component/molecules/info/Stagebar';
import {NICKNAME_FORM} from 'Root/i18n/msg';

export default AssignShelterAddress = props => {
	const [confirmed, setConfirmed] = React.useState(false); //주소란이 모두 작성되었다며 통과가능
	const [confirmName, setConfirmName] = React.useState(false); //이름 입력되었다면 통과가능
	const [privateOrPublic, setPrivateOrPublic] = React.useState(false); //private -> 사설 public 공립
	const [publicButton, setPublicButton] = React.useState('filled'); //버튼 상태 filled
	const [privateButton, setPrivateButton] = React.useState('gray'); //버튼 상태 filled

	const [data, setData] = React.useState({
		...props.route.params?.data,
		shelter_name: '',
		shelter_address: {
			city: '', //
			district: '', //
			neighbor: '', //
			brief: '', //기본주소
			detail: '', //세부주소
		},
	});
	let regExp = /^[가-힣a-zA-Z0-9_\s]{2,20}$/;

	React.useEffect(() => {
		if (props.route.params.addr) {
			console.log('주소를 받아온다.', props.route.params.addr);
			let addr = props.route.params.addr;
			setData({
				...data,
				shelter_address: {
					brief: addr.address,
					detail: '',
				},
			});
		}
	}, [props.route.params.addr]);
	React.useEffect(() => {
		setData({...data, shelter_type: privateOrPublic});
	}, [privateOrPublic]);

	React.useEffect(() => {
		if (data.shelter_address.brief.length > 0 && regExp.test(data.shelter_name)) {
			setConfirmed(true);
		} else {
			setConfirmed(false);
		}
	}, [data]);

	//다음
	const goToNextStep = () => {
		props.navigation.navigate('AssignShelterInformation', {data: data});
	};

	//주소
	const onChangeAddress = addr => {
		setData({...data, shelter_address: {...data.shelter_address, brief: addr}});
	};

	//세부주소
	const onChangeDeatilAddress = addr => {
		setData({...data, shelter_address: {...data.shelter_address, detail: addr}});
	};

	//주소찾기 클릭
	const goToAddressSearch = () => {
		console.log('onPressSearchAddr');
		props.navigation.navigate('AddressSearchPage', {prevRoute: props.route.name});
	};

	//보호소 이름
	const onChaneName = name => {
		setData({...data, shelter_name: name});
	};

	const nameValidator = name => {
		return regExp.test(name);
	};

	const onValidName = isValid => {
		setConfirmName(isValid);
	};

	const addressValidator = (addr, detailAddr) => {
		console.log('addressValidator', addr, detailAddr);
		// if (addr != undefined && detailAddr != undefined) {
		return addr != '' > 0 && detailAddr != '' > 0;
		// }
	};

	const onValidAddress = isValid => {
		console.log('onvalid', isValid);
		setConfirmed(isValid);
	};
	const onButtonPress = bool => {
		if (bool == 'private') {
			setPrivateOrPublic('private');
			if (privateButton == 'filled') {
				setPrivateButton('gray');
			} else {
				setPrivateButton('filled');
				setPublicButton('gray');
			}
		} else {
			setPrivateOrPublic('public');
			if (publicButton == 'filled') {
				setPublicButton('gray');
			} else {
				setPublicButton('filled');
				setPrivateButton('gray');
			}
		}
	};

	return (
		<KeyboardAvoidingView style={[login_style.wrp_main, {flex: 1}]} behavior={'padding'}>
			{/* (M)StageBar	 */}
			<View style={[styles.stageBar, {marginTop: 20 * DP}]}>
				<StageBar
					backgroundBarStyle={styles.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					// insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					insideBarStyle={{width: 160 * DP, height: 20 * DP, backgroundColor: MAINBLACK, borderRadius: 18 * DP}} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					current={2} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={640 * DP} //bar의 너비
				/>
			</View>
			<View style={[styles.btn_view]}>
				<AniButton
					btnTitle={'공립'}
					// btnTheme={'shadow'}

					btnStyle={publicButton}
					btnLayout={btn_w336x82_r30}
					titleFontStyle={28}
					// disable={publicButton == 'filled'}
					unTouchable={publicButton == 'filled'}
					onPress={() => onButtonPress('public')}
				/>
				<AniButton
					btnTitle={'사립'}
					btnStyle={privateButton}
					btnLayout={btn_w336x82_r30}
					titleFontStyle={28}
					unTouchable={privateButton == 'filled'}
					onPress={() => onButtonPress('private')}
				/>
			</View>
			{/* <View style={[assignShelterAddress_style.textMsg]}>
				<Text style={[txt.noto24]}>
					'<Text style={{color: 'red'}}>*</Text>'는 필수 입력해야하는 사항입니다.
				</Text>
			</View> */}

			{/* InputForm */}
			<View style={[styles.input24A_assignShelterAddress, {marginTop: 50 * DP}]}>
				<Input24
					title={'보호소 이름'}
					placeholder={'보호소 이름을 적어주세요'}
					descriptionType={'none'}
					onChange={onChaneName}
					value={data.shelter_name}
					validator={nameValidator}
					onValid={onValidName}
					showMsg
					width={694}
					height={104}
					confirm_msg={''}
					alert_msg={NICKNAME_FORM}
				/>
			</View>

			<View style={[styles.addressInput, {marginTop: 40 * DP}]}>
				<AddressInput
					title={'보호소 주소'}
					// titleMode={'star'}
					titleColor={APRI10}
					onChangeAddress={onChangeAddress}
					onChangeDeatilAddress={onChangeDeatilAddress}
					address={data.shelter_address.brief}
					detailAddress={data.shelter_address.detail}
					onPressSearchAddr={goToAddressSearch}
				/>
			</View>

			{/* (A)Btn_w654 */}
			<View style={[styles.btn_w694, assignShelterAddress_style.btn_w654]}>
				{confirmed ? (
					<AniButton btnTitle={'다음'} btnStyle={'border'} btnLayout={btn_w694_r30} titleFontStyle={32} onPress={goToNextStep} />
				) : (
					<AniButton btnTitle={'다음'} disable btnLayout={btn_w694_r30} titleFontStyle={32} onPress={goToNextStep} />
				)}
			</View>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	stageBar: {
		width: 694 * DP,
		height: 32 * DP,
	},
	backgroundBar: {
		width: 640 * DP,
		height: 20 * DP,
		backgroundColor: 'white',
		borderRadius: 20 * DP,
		borderWidth: 4 * DP,
		// borderColor: APRI10,
		borderColor: MAINBLACK,
	},
	btn_view: {
		width: 694 * DP,
		marginTop: 50 * DP,
		height: 82 * DP,
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
	},
	input24A_assignShelterAddress: {
		width: 694 * DP,
		// height: 112 * DP,
	},
	addressInput: {
		width: 694 * DP,
		// height: 238 * DP,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	btn_w694: {
		width: 694 * DP,
		height: 104 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#DEB5B5',
	},
});
