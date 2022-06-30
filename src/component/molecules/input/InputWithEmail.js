import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity, TextInput, StyleSheet, Keyboard} from 'react-native';
import DP from 'Root/config/dp';
import {NextMark} from 'Root/component/atom/icon';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, MAINBLACK, RED10} from 'Root/config/color';
import {EMAIL_DOMAIN} from 'Root/i18n/msg';
import Modal from 'Root/component/modal/Modal';

/**
 *
 * @param {object} props
 * @param {Array.<string>} props.dropdownItems - 메일주소 업체들
 * @param {number} props.defaultIndex - 드롭다운의 기본 인덱스(기본값:0)
 * @param {string} props.value - 값
 * @param {string} props.defaultValue -디폴트 값
 * @param {number} props.width - 텍스트입력의 너비
 * @param {string} props.title - InputWithEmail의 제목
 * @param {boolean} props.title_star - 제목에 *표시 여부
 * @param {()=>void} props.onClear - 지우기 버튼 클릭시 콜백
 * @param {()=>void} props.onSelectDirectInput - 직접 입력 선택 콜백
 * @param {(isValid:boolean)=>void} props.onValid - 택스트 입력이 유효할 경우 반환(현재는 입력길이가 1이상일 경우 유효함)
 * @param {(item:object, index:number)=>void} props.onSelectDropDown - 이메일 도메인에서 선택값 오브젝트와 인덱스 반환
 * @param {(value:string)=>void} props.onChange - InputWithEmail값의 변동에 따른 콜백
 *
 */
const InputWithEmail = props => {
	const [selectedItem, setSelectedItem] = React.useState('');
	const [input, setInput] = React.useState(props.value || '');
	const [domainDirect, setDomainDirect] = React.useState('');
	const [directInputMode, setDirectInputMode] = React.useState(false);
	const [email, setEmail] = React.useState(props.value);
	const directInputRef = React.useRef('');
	// console.log('default', props.defaultValue);

	React.useEffect(() => {
		if (props.defaultValue && props.defaultValue != '') {
			setSelectedItem(props.defaultValue.split('@')[1]);
		}
	}, []);

	React.useEffect(() => {
		// console.log('Email 합치기 :', email);
		props.onChange(email);
	}, [email]);

	const onChange = text => {
		console.log('text', text);
		setInput(text);
		directInputMode ? setEmail(text + '@' + domainDirect) : setEmail(text + '@' + selectedItem);
	};

	const onDirectInput = text => {
		setDomainDirect(text);
		setEmail(input.split('@')[0] + '@' + text);
	};

	const validator = text => {
		return text.length > 0;
	};

	const onValid = isValid => {
		props.onValid(isValid);
	};

	const selectEmailModal = () => {
		Keyboard.dismiss();
		const onSelectEmail = selectedItem => {
			if (selectedItem == '직접입력') {
				console.log('직접입력');
				setDirectInputMode(true);
				setSelectedItem('');
				setTimeout(() => {
					//타임아웃 없을 시 Exception
					directInputRef.current.focus();
				}, 500);
			} else {
				setDirectInputMode(false);
				setSelectedItem(selectedItem);
				setEmail(input + '@' + selectedItem);
			}
			Modal.close();
		};
		Modal.popSelectScrollBoxModal([EMAIL_DOMAIN], '메일 주소 선택', onSelectEmail);
	};

	return (
		<View style={{}}>
			{props.title ? (
				<View style={{flexDirection: 'row'}}>
					<Text style={[txt.noto28, {color: MAINBLACK}]}>{props.title}</Text>
					<Text style={[txt.noto24, {color: RED10, marginLeft: 30 * DP}]}>{props.title_star ? '*' : ''}</Text>
				</View>
			) : (
				false
			)}
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					// borderBottomColor: APRI10,
					// borderBottomWidth: 2 * DP,
				}}>
				{/* 이메일 주소 */}
				<TextInput
					style={[
						txt.roboto32,
						{
							width: props.width * DP,
							height: 104 * DP,
							paddingHorizontal: 20 * DP,
							backgroundColor: '#FAFAFA',
							borderRadius: 30 * DP,
						},
					]}
					placeholder={props.placeholder}
					placeholderTextColor="#767676"
					autoCapitalize={'none'}
					defaultValue={props.defaultValue ? props.defaultValue.split('@')[0] : ''}
					onChangeText={onChange}
					maxlength={30}
				/>
				<View
					style={{
						height: 80 * DP,
						justifyContent: 'center',
					}}>
					<Text style={[txt.roboto32, {lineHeight: 36 * DP}, {marginLeft: 12 * DP}]}>@</Text>
				</View>
				{/* 이메일 도메인 */}
				<TouchableOpacity
					onPress={selectEmailModal}
					style={[
						styles_inputWithEmail.emailDomainContainer,
						{
							justifyContent: 'space-between',
							alignItems: 'center',
						},
					]}>
					{directInputMode ? (
						<TextInput
							style={[txt.roboto32, styles_inputWithEmail.emailDomain_input, {}]}
							onChangeText={onDirectInput}
							ref={directInputRef}
							multiline={true}
							selectTextOnFocus
							keyboardType={'email-address'}
						/>
					) : (
						<Text
							style={[
								txt.roboto32,
								styles_inputWithEmail.emailDomain,
								{
									color: selectedItem != '' ? BLACK : GRAY20,
								},
							]}>
							{selectedItem != '' ? selectedItem : '도메인'}
						</Text>
					)}

					<View style={[styles_inputWithEmail.arrowMark]}>
						<NextMark />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};
InputWithEmail.defaultProps = {
	placeholder: 'placeholder',
	value: '',
	title_star: false,
	showMsg: false,
	onClear: e => {},
	onChange: e => {},
	onValid: e => {},
	onSelectDropDown: e => {},
};

export default InputWithEmail;
const styles_inputWithEmail = StyleSheet.create({
	emailDomainContainer: {
		width: 250 * DP,
		height: 80 * DP,
		flexDirection: 'row',
		// backgroundColor: 'red',
	},
	emailDomain: {
		flex: 1,
		// width: 170 * DP,
		// paddingLeft: 10 * DP,
		textAlign: 'center',
	},
	emailDomain_input: {
		flex: 1,
		// width: 170 * DP,
		paddingHorizontal: 15 * DP,
		// textAlign: 'center',
	},

	arrowMark: {
		// width: 44 * DP,
		height: 80 * DP,
		transform: [{rotate: '90deg'}],
		right: 30 * DP,
	},
});
