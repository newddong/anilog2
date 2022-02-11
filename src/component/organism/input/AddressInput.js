import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {APRI10, GRAY10, RED10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {btn_w108, btn_w176, btn_w226} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import Input24 from 'Molecules/input/Input24';
import {btn_style, temp_style} from 'Templete/style_templete';
import {addressInput} from 'Organism/style_organism copy';
/**
 *
 * @param {object} props
 * @param {string} props.title - 제목
 * @param {string} props.titleColor - 제목 색상
 * @param {string} props.addressDefault - 기존에 작성된 주소 정보
 * @param {string} props.detailAddressDefault - 기존에 작성된 세부 주소 정보
 * @param {string} props.address - 주소값
 * @param {string} props.detailAddress - 세부 주소값
 * @param {(address:string)=>void} props.onChangeAddress - 주소 정보가 변동될때 콜백(주소를 파라메터로 넘김)
 * @param {(detailAddress:string)=>void} props.onChangeDeatilAddress - 세부 주소가 변동될때 콜백(세부 주소를 파라메터로 넘김)
 * @param {()=>void} props.onPressSearchAddr - 주소찾기를 눌렸을때 발생생
 * @param {(address:string,detailaddress:string)=>boolean} props.validator - 주소찾기 검증
 * @param {(isValid:boolean)=>void} props.onValid - 주소찾기 검증 변경에 따른 콜백
 */

const AddressInput = props => {
	// console.log('addressInpit', props);
	const [detailAddr, setDetailAddr] = React.useState(props.detailAddress || '');
	React.useEffect(() => {
		// console.log('addressinput Detail', detailAddr);
	}, [detailAddr]);
	const validator = (addr, detailAddr) => {
		let isValid = props.validator(addr, detailAddr);
		props.onValid && props.onValid(isValid);
	};
	//주소 값 변경 콜백
	const onChangeAddress = addr => {
		console.log('onChangeAddress', addr);
		props.validator && validator(addr, props.detailAddress);
		props.onChangeAddress(addr);
	};

	//세부 주소 값 변경 콜백
	const onChangeDetailAddress = addr => {
		console.log('detail address', addr);
		props.validator && validator(props.address, addr);
		props.onChangeDeatilAddress(addr);
		setDetailAddr(addr);
	};

	//주소 찾기 클릭
	// const onPressSearchAddr = () => {
	// 	// console.log('onPressSearchAddr');

	// 	props.onPressSearchAddr();
	// };
	const onPressSearchAddr = () => {
		props.onPressSearchAddr();
	};

	return (
		<View style={[addressInput.container]}>
			{props.titleMode == 'star' ? (
				<Text style={[txt.noto24, {color: APRI10}]}>
					{props.title} <Text style={{color: RED10, fontSize: 24 * DP}}> {'      *'}</Text>
				</Text>
			) : (
				<Text style={[txt.noto28, {color: GRAY10}]}>{props.title} </Text>
			)}

			<View style={[addressInput.upperContainer]}>
				<View style={[addressInput.input24A, {flexDirection: 'row'}]}>
					<Input24
						value={props.address}
						editable={false}
						width={470}
						placeholder={'주소 찾기를 눌러주세요'}
						onChange={onChangeAddress}
						descriptionType={'star'}
						showCrossMark={false}
						defaultValue={props.address}
					/>

					<View style={[addressInput.btn_w226]}>
						<AniButton btnTitle={'주소 찾기'} btnLayout={btn_w176} btnStyle={'border'} onPress={onPressSearchAddr} />
					</View>
				</View>
			</View>
			<View style={[temp_style.inputNoTitle, addressInput.inputNoTitle]}>
				<Input24
					width={654}
					value={props.detailAddress}
					defaultValue={props.detailAddress}
					placeholder={'세부 주소를 입력해 주세요.'}
					multiline={true}
					maxlength={25}
					onChange={onChangeDetailAddress}
				/>
			</View>
		</View>
	);
};

AddressInput.defaultProps = {
	title: '나의 장소',
	titleColor: GRAY10,
	titleMode: '',
	onChangeDeatilAddress: e => {},
	onChangeAddress: e => {},
	onPressSearchAddr: e => {},
};

export default AddressInput;
