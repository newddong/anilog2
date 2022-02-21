import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import DP from 'Root/config/dp';
import {Arrow_Down_GRAY20, Arrow_Up_GRAY20, Cross52, NextMark} from 'Root/component/atom/icon';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, RED10} from 'Root/config/color';
import Input24 from './Input24';
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
	// Dropdown에서 현재 선택된 항목 State, 처음 Mount시 itemList[defaultIndex]를 반환
	const [selectedItem, setSelectedItem] = React.useState('');
	const [defaultIndex, setDefaultIndex] = React.useState(0);
	const [input, setInput] = React.useState(props.value || '');
	const [domainDirect, setDomainDirect] = React.useState('');
	const [directInputMode, setDirectInputMode] = React.useState(false);
	const [email, setEmail] = React.useState(props.value);
	const [defaultAffected, setDefaultAffected] = React.useState(false);

	React.useEffect(() => {
		console.log('Email 합치기 :', email);
		props.onChange(email);
	}, [email]);

	React.useEffect(() => {
		if (props.defaultValue && !defaultAffected) {
			const findDefaultDomain = EMAIL_DOMAIN.findIndex(e => e == props.defaultValue.split('@')[1]);
			if (findDefaultDomain == -1) {
				const directInputIndex = EMAIL_DOMAIN.findIndex(e => e == '직접입력');
				setDefaultIndex(directInputIndex);
				setDefaultAffected(true);
			} else {
				setDefaultIndex(findDefaultDomain);
				setDefaultAffected(true);
			}
		}
	}, [props.defaultValue]);

	const onChange = text => {
		console.log('text', text);
		setInput(text);
		directInputMode ? setEmail(text + '@' + domainDirect) : setEmail(text + '@' + selectedItem);
	};

	const onSelectDropDown = (item, index) => {
		// console.log('onselectDropdown', item, index);
		if (item == '직접입력') {
			setDomainDirect('');
			setDirectInputMode(true);
			setSelectedItem('');
			// console.log('직접입력 Input', input);
			setEmail(input.split('@')[0]);
			props.onSelectDropDown(item, index);
		} else {
			setDirectInputMode(false);
			setSelectedItem(item);
			setEmail(input.split('@')[0] + '@' + item);
			props.onSelectDropDown(item, index);
		}
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
		const onSelectEmail = selectedItem => {
			console.log('selectedItem', selectedItem);
			if (selectedItem == '직접입력') {
				console.log('직접입력');
				setDirectInputMode(true);
				setSelectedItem('');
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
					<Text style={[txt.noto24, {color: APRI10}]}>{props.title}</Text>
					<Text style={[txt.noto24, {color: RED10, marginLeft: 30 * DP}]}>{props.title_star ? '*' : ''}</Text>
				</View>
			) : (
				false
			)}
			{/* <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2 * DP, borderColor: input.length == 0 ? GRAY30 : APRI10}}> */}
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Input24
					placeholder={props.placeholder}
					value={input.split('@')[0]}
					defaultValue={props.defaultValue ? props.defaultValue.split('@')[0] : ''}
					onChange={onChange}
					showMsg={props.showMsg}
					showCrossMark={false}
					maxlength={30}
					// onClear={onClear}
					numberOfLinst={1}
					width={props.width || 240}
					validator={validator}
					onValid={onValid}
				/>
				<View
					style={{
						height: 80 * DP,
						borderBottomColor: selectedItem != '' || domainDirect != '' ? APRI10 : GRAY30,
						borderBottomWidth: 2 * DP,
						justifyContent: 'center',
					}}>
					<Text style={[txt.roboto24b, {lineHeight: 36 * DP}]}>@</Text>
				</View>
				<TouchableOpacity
					onPress={selectEmailModal}
					style={[
						styles_inputWithEmail.emailDomainContainer,
						{
							borderBottomWidth: 2 * DP,
							borderBottomColor: selectedItem != '' || domainDirect != '' ? APRI10 : GRAY30,
							// backgroundColor: 'red',
							justifyContent: 'space-between',
							alignItems: 'center',
						},
					]}>
					{directInputMode ? (
						<TextInput
							style={[txt.roboto32, styles_inputWithEmail.emailDomain_input, {}]}
							onChangeText={onDirectInput}
							// editable={directInputMode ? true : false}
						/>
					) : (
						<Text
							style={[
								txt.roboto32,
								styles_inputWithEmail.emailDomain,
								{
									color: selectedItem != '' ? BLACK : GRAY20,
								},
							]}
							// onChangeText={onDirectInput}
							// editable={directInputMode ? true : false}
						>
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
