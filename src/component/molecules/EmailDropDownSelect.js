import React from 'react';
import {txt} from 'Root/config/textstyle';
import PropsTypes, {any, func, number, object, oneOf, oneOfType, shape} from 'prop-types';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import DP from 'Root/config/dp';
import {Arrow_Down_GRAY20, Arrow_Up_GRAY20} from '../atom/icon';
import {APRI10, BLACK, GRAY40} from 'Root/config/color';
import Dropdown from './Dropdown';
import Modal from 'Component/modal/Modal';
import {string} from 'prop-types';

/**
 * 드롭다운 선택 버튼
 * @type {React.ForwardRefRenderFunction<React.FunctionComponent,EmailDropDownSelectProps>}
 *
 * 레퍼런스를 가짐
 * ```js
 * //셀렉트 버튼으로 모달을 띄웠을 경우 Close콜백에서 레퍼런스를 이용 press를 명령형으로
 * //실행해야 버튼이 close상태로 변경됨, 해당 조치를 하지않을 경우
 * //모달이 닫히더라도 버튼은 오픈된 상태로 사용자가 두번 눌러야 닫혀진 상태로 변함(개선필요)
 * const openFn = () => {
 *		Modal.rollingSelect(
 *			'구를 선택해 주세요',
 * 			['북구', '서구', '중구'],
 *			e => {
 *					setData({...data, district: e});
 *					DropdownRef.current.press(); //press처리
 *			},
 *			() => {
 *					DropdownRef.current.press(); //press처리
 *			},
 *			);
 * 	}
 * <DropdownSelect onOpen={openFn} ref={DropdownRef} />
 * ```
 * @example
 * dropdownSelectRef.current.press() //버튼 탭을 명령형으로 작동 가능
 *
 *
 */
const EmailDropDownSelect = React.forwardRef(
	(
		props,
		/** @type {object} 레퍼런스 오브젝트, press 메소드를 가짐 */
		ref,
	) => {
		React.useImperativeHandle(ref, () => ({
			press: () => {
				onPress();
			},
		}));

		// Dropdown 화살표의 state - True일 경우 opened 상태 / False일 경우 closed 상태
		const [btnStatus, setBtnStatus] = React.useState(false);

		const onPress = () => {
			// console.log('DropdownSelect onPress');
			// setBtnStatus(!btnStatus);
			// Modal.popupSelect();
			(btnStatus && (onClose() || true)) || onOpen();
		};
		const onOpen = () => {
			// console.log('DropdownSelect onOpen');
			setBtnStatus(true);
			props.onOpen();
		};

		const onClose = () => {
			// console.log('DropdownSelect onClose');
			setBtnStatus(false);
			props.onClose();
		};

		const onChangeDomain = text => {
			props.onChangeDomain(text);
		};

		const emailRef = React.useRef();

		return (
			<TouchableOpacity onPress={onPress} style={{}}>
				<View
					style={{
						height: 80 * DP, //border가 있으므로 80DP로 수정
						width: props.width * DP,
						borderBottomColor: APRI10,
						borderBottomWidth: 2 * DP,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					{props.value == '직접입력' ? (
						<TextInput
							placeholder={props.value}
							ref={emailRef}
							defaultValue={props.defaultDirectInput || ''}
							autoFocus
							textAlign={'left'}
							maxLength={30}
							onChangeText={onChangeDomain}
							style={[
								txt.noto24b,
								props.textStyle,
								{
									paddingVertical: 16 * DP, // Value와 최상위 View와의 paddingVertical 16px
									paddingHorizontal: 30 * DP,
									textAlign: 'left',
									marginRight: 40 * DP,
									flex: 1,
								},
							]}>
							{props.value == '직접입력' ? '' : props.value}
						</TextInput>
					) : (
						<Text
							style={[
								txt.noto24b,
								props.textStyle,
								{
									paddingVertical: 16 * DP, // Value와 최상위 View와의 paddingVertical 16px
									marginRight: 40 * DP,
								},
							]}>
							{props.value}
						</Text>
					)}

					<View
						style={{
							height: 82 * DP,
							width: 48 * DP,
							position: 'absolute',
							justifyContent: 'center',
							alignItems: 'center',
							right: 2 * DP,
						}}>
						{/* 버튼staus가 true일 경우 위화살표 방향, false일 경우 아래 화살표 방향 */}
						{btnStatus ? <Arrow_Up_GRAY20 /> : <Arrow_Down_GRAY20 />}
					</View>
				</View>
			</TouchableOpacity>
		);
	},
);

const EmailDropDownSelectProps = {
	/** @type {string} 버튼에 표시되는 값 */
	value: string,
	/** @type {()=>void} 닫힐때의 콜백 */
	onClose: func,
	/** @type {()=>void} 열릴 때 콜백 */
	onOpen: func,
	/** @type {()=>void} 도메인주소 바뀔 때 콜백 */
	onChangeDomain: func,
	/** @type {object} 표시되는 글의 글꼴 */
	textStyle: object,
	/** @type {number} 버튼의 너비 숫자만 입력, DP는 컴포넌트 내부에서 자동으로 계산됨 */
	width: number,
};

EmailDropDownSelect.propTypes = EmailDropDownSelectProps;

EmailDropDownSelect.defaultProps = {
	value: '',
	// width: 0, //Select+Text 부분의 width Default=180(5글자)
	onChange: e => console.log('EmailDropDownSelect Default onChange', e),
	onPress: e => console.log('EmailDropDownSelect Default onPress', e),
	onClose: e => console.log('EmailDropDownSelect Default onClose  ', e),
	onOpen: e => console.log('EmailDropDownSelect Default onOpen', e),
	textStyle: null,
};

export default EmailDropDownSelect;
