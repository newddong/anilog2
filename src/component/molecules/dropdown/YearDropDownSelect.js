import React from 'react';
import {txt} from 'Root/config/textstyle';
import PropsTypes, {any, func, number, object, oneOf, oneOfType, shape} from 'prop-types';
import {Text, View, TouchableOpacity} from 'react-native';
import DP from 'Root/config/dp';
import {Arrow_Down_GRAY20, Arrow_Up_GRAY20} from 'Atom/icon';
import {APRI10, BLACK, GRAY10, GRAY40} from 'Root/config/color';
import Dropdown from './Dropdown';
import Modal from 'Component/modal/Modal';
import {string} from 'prop-types';

/**
 * 드롭다운 선택 버튼
 * @type {React.ForwardRefRenderFunction<React.FunctionComponent,YearDropDownSelectProps>}
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
const YearDropDownSelect = React.forwardRef(
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
			console.log('DropdownSelect onPress');
			// setBtnStatus(!btnStatus);
			// Modal.popupSelect();
			(btnStatus && (onClose() || true)) || onOpen();
		};
		const onOpen = () => {
			console.log('DropdownSelect onOpen');
			setBtnStatus(true);
			props.onOpen();
		};

		const onClose = () => {
			console.log('DropdownSelect onClose');
			setBtnStatus(false);
			props.onClose();
		};

		return (
			<TouchableOpacity onPress={onPress}>
				<View
					style={{
						height: 80 * DP, //border가 있으므로 80DP로 수정
						width: 200 * DP,
						bottom: 0,
						marginLeft: 30 * DP,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Text
						style={[
							txt.roboto36b,
							props.textStyle,
							{
								paddingVertical: 16 * DP, // Value와 최상위 View와의 paddingVertical 16px
								// textAlign: 'center',
								marginRight: 40 * DP,
								color: GRAY10,
							},
						]}>
						{props.value}
					</Text>
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

const YearDropDownSelectProps = {
	/** @type {string} 버튼에 표시되는 값 */
	value: string,
	/** @type {()=>void} 닫힐때의 콜백 */
	onClose: func,
	/** @type {()=>void} 열릴 때 콜백 */
	onOpen: func,
	/** @type {object} 표시되는 글의 글꼴 */
	textStyle: object,
	/** @type {number} 버튼의 너비 숫자만 입력, DP는 컴포넌트 내부에서 자동으로 계산됨 */
	width: number,
};

YearDropDownSelect.propTypes = YearDropDownSelectProps;

YearDropDownSelect.defaultProps = {
	value: '',
	// width: 0, //Select+Text 부분의 width Default=180(5글자)
	// onChange: e => console.log('DropdownSelect Default onChange', e),
	// onPress: e => console.log('DropdownSelect Default onPress', e),
	onClose: e => console.log('YearDropDownSelect Default onClose  ', e),
	onOpen: e => console.log('YearDropDownSelect Default onOpen', e),
	textStyle: null,
};

export default YearDropDownSelect;
