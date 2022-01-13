import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet,Dimensions,Platform} from 'react-native';
import DropdownSelect from 'Molecules/DropdownSelect';

import AniButton from 'Molecules/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import Input24 from './Input24';

/**
 * 선택창과 직접 입력창을 띄우는 모달 컴포넌트
 *
 * @param {Object} props - props object
 * @param {string} props.okButtonnMsg - 확인 버튼 메시지
 * @param {(primaryValue:string,secondaryValue:string)=>void} props.onOk - 확인 버튼 콜백
 * @param {Array.<string>} props.primaryItems - 첫번째 선택창에 들어갈 항목들의 배열
 * @param {Array.<string>} props.secondaryItems - 두번째 선택창에 들어갈 항목들의 배열
 *
 */
const SelectModal = props => {
	const initPrimaryValue = props.primaryItems ? props.primaryItems[0] : '멍멍이';
	const initSecondaryValue = props.secondaryItems ? props.secondaryItems[0] : '직접입력';

	const [primaryValue, setPrimaryValue] = React.useState(initPrimaryValue);
	const [secondaryValue, setSecondaryValue] = React.useState(initSecondaryValue);
	const [isDirectInput, setDirectInput] = React.useState(false);
	const Primary = React.useRef();
	const Secondary = React.useRef();

	const pressOk = () => {
		props.onOk(primaryValue, secondaryValue);
        console.log(primaryValue,secondaryValue);
		Modal.close();
	};

	React.useEffect(() => {
		if (secondaryValue === '직접입력') {
			setDirectInput(true);
		}
	}, [secondaryValue]);

	const selectPrimary = () => {
		Modal.rollingSelect(
			'반려동물의 종류',
			props.primaryItems,
			type => {
				setPrimaryValue(type);
				Primary.current.press();
			},
			() => {
				Primary.current.press();
			},
		);
	};

	const selectSecondary = () => {
		Modal.rollingSelect(
			'반려동물의 종류',
			props.secondaryItems.concat('직접입력'),
			type => {
				setSecondaryValue(type);
				Secondary.current.press();
			},
			() => {
				Secondary.current.press();
			},
		);
	};

    const onDirectInput = (input) => {
        setSecondaryValue(input);
    };

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 * DP}}>
					<DropdownSelect width={204} value={primaryValue} onOpen={selectPrimary} ref={Primary} />
					{isDirectInput ? (
						<Input24 width={250} placeholder={'직접입력'} onChange={onDirectInput} value={secondaryValue}></Input24>
					) : (
						<DropdownSelect width={262} value={secondaryValue} onOpen={selectSecondary} ref={Secondary} />
					)}
				</View>
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'filled'} btnTitle={props.okButtonnMsg} onPress={pressOk} />
				</View>
			</View>
		</View>
	);
};

SelectModal.defaultProps = {
	okButtonnMsg: '확인',
	onOk: (primaryValue, secondaryValue) => {
		console.log('YES');
	},
	primaryItems: ['Item1', 'Item2', 'Item3', 'Item4'],
	secondaryItems: ['Item1', 'Item2', 'Item3', 'Item4'],
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height:Platform.OS=='ios'?Dimensions.get('window').height:'100%',
        width:Platform.OS=='ios'?Dimensions.get('window').width:'100%',
		justifyContent: 'center',
		alignItems: 'center',
        position:'absolute',
	},
	popUpWindow: {
		width: 614 * DP,
		backgroundColor: WHITE,
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
	},
	msg: {
		marginBottom: 30 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
});

export default SelectModal;
