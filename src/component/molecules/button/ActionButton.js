import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropsTypes, {any, bool, func, number, object, oneOf, oneOfType, string} from 'prop-types';
import {APRI10, GRAY30} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
<<<<<<< HEAD
import {btn_w226} from '../atom/btn/btn_style';
import {Arrow_Down_APRI10, Arrow_Down_GRAY30, Arrow_Down_White, Arrow_Up_APRI10, Arrow_Up_GRAY30, Arrow_Up_White} from '../atom/icon';
import Modal from '../modal/Modal';
=======
import {btn_w226} from 'Atom/btn/btn_style';
import {Arrow_Down_APRI10, Arrow_Down_GRAY30, Arrow_Down_White, Arrow_Up_APRI10, Arrow_Up_GRAY30, Arrow_Up_White} from 'Atom/icon';
>>>>>>> 0110887ebd3b00c5b3c02bdf349c5d217c2ffd2d

/**
 * 인풋 크기 24
 * @type {React.ForwardRefRenderFunction<?,ActionButtonProps>}
 *
 */
const ActionButton = React.forwardRef((props, ref) => {
	React.useImperativeHandle(ref, () => ({
		press: () => {
			onPress();
		},
	}));
	//btn의 초기상태 - false는 아직 버튼이 오픈되지 않은 상태
	const [btnStatus, setBtnStatus] = React.useState(props.initState);

	const btnTxtColor = () => {
		//txt Color의 종류는 3가지 - white, APRI10, GRAY20
		if (props.disable) {
			return GRAY30;
		} //disable 상태
		else if (props.btnStyle == 'filled') {
			return 'white';
		} //filled상태
		return APRI10; //border 상태
	};

	const border = () => {
		//border는 btnStyle='border' or disable=true 인 경우 발생
		if (props.disable) {
			return {borderColor: GRAY30, borderWidth: 4 * DP};
		} else if (props.btnStyle == 'border') {
			return {borderColor: APRI10, borderWidth: 4 * DP};
		}
	};

	//버튼 안쪽 화살표 모양 설정, btnStatus에 따라 바뀜
	const arrowStyle = () => {
		if (props.disable) {
			return btnStatus ? <Arrow_Up_GRAY30 /> : <Arrow_Down_GRAY30 />;
		} else if (props.btnStyle == 'filled') {
			return btnStatus ? <Arrow_Up_White /> : <Arrow_Down_White />;
		} else if (props.btnStyle == 'border' || props.btnStyle == 'noBorder') {
			return btnStatus ? <Arrow_Up_APRI10 /> : <Arrow_Down_APRI10 />;
		}
	};

	//클릭 이벤트
	const onPress = e => {
		!props.noStateChange && setBtnStatus(!btnStatus);
		// btnStatus ? props.onOpen() : props.onClose();
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

	//액션버튼 본체
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					props.btnLayout, // 버튼 레이아웃
					border(), // 버튼 테두리
					{
						//이외 스타일 적용
						backgroundColor: props.btnStyle == 'filled' ? APRI10 : 'white',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					},
				]}>
				<Text
					style={[
						txt.noto24b,
						{
							fontSize: props.titleFontStyle * DP,
							color: btnTxtColor(), //TXT_COLOR가 다양하므로 함수로 분기처리
							textAlign: 'center',
						},
					]}>
					{props.btnTitle}
				</Text>
				{arrowStyle()}
			</View>
		</TouchableOpacity>
	);
});

const ActionButtonProps = {
	/** @type {string} 입력창 제목(상단) */
	btnTitle: string,
	/** @type {string} 버튼 스타일 'filled'|'border'|'noborder'|undefined */
	btnTheme: string,
	/** @type {string} 버튼 스타일 'filled'|'border'|'noborder'|undefined */
	btnStyle: string,
	/** @type {object} 버튼의 레이아웃 스타일(Atoms의 btn_wXXX) */
	btnLayout: object,
	/** @type {boolean} 버튼 활성화 여부 */
	disable: bool,
	/** @type {boolean} 버튼의 초기상태 false이면 close, true이면 open */
	initState: bool,
	/** @type {boolean} 버튼의 on, off를 변경하지 않음, initState가 false이면 onOpen, true이면 onClose만 실행 */
	noStateChange: bool,
	/** @type {number} 타이틀 폰트 크기 */
	titleFontStyle: number,
	/** @type {()=>void} 버튼이 열렸을 때 동작하는 콜백, 제목 반환홤 */
	onOpen: func,
	/** @type {()=>void} 버튼이 닫혔을 때 동작하는 콜백, 제목 반환환 */
	onClose: func,
};

ActionButton.propTypes = ActionButtonProps;
ActionButton.defaultProps = {
	noStateChange: false,
	initState: false,
	btnTitle: 'BTN_W654', //버튼의 제목
	disable: false, // 버튼탭 사용불가 상태 boolean
	btnLayout: btn_w226, // 버튼의 레이아웃(width, height, radius 등의 수치 결정)
	titleFontStyle: 24, // 버튼 title의 폰트 크기
	btnStyle: 'border', // 버튼스타일 filled border noBorder
	onOpen: e => {},
	onClose: e => {},
};
export default ActionButton;
