import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, Platform} from 'react-native';

import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import NormalDropDown from 'Molecules/dropdown/NormalDropDown';
import {getPettypes} from 'Root/api/userapi';

/**
 * 선택창과 직접 입력창을 띄우는 모달 컴포넌트
 *
 * @param {Object} props - props object
 * @param {string} props.okButtonnMsg - 확인 버튼 메시지
 * @param {(primaryValue:string,secondaryValue:string)=>void} props.onOk - 확인 버튼 콜백
 * @param {string} props.primaryInitItem - 첫번째 선택창에 들어갈 초기값
 * @param {string} props.secondaryInitItem - 두번째 선택창에 들어갈 초기값
 *
 */
const PetSelectModal = props => {
	const initPrimaryValue = props.primaryInitItem ? props.primaryInitItem : '개';
	const initSecondaryValue = props.secondaryInitItem ? props.secondaryInitItem : '믹스견';

	const [primaryValue, setPrimaryValue] = React.useState([initPrimaryValue]);
	const [secondaryValue, setSecondaryValue] = React.useState([initSecondaryValue]);
	// const [isDirectInput, setDirectInput] = React.useState(false);
	const [petTotalList, setPetTotalList] = React.useState();
	const [isSpeciesChanged, setIsSpeciesChanged] = React.useState(false);
	const [selectedPrimary, setSelectedPrimary] = React.useState(initPrimaryValue);
	const [selectedSecondary, setSelectedSecondary] = React.useState(initSecondaryValue);

	const pressOk = () => {
		props.onOk(selectedPrimary, selectedSecondary);
		console.log(selectedPrimary, selectedSecondary);
		Modal.close();
	};

	// React.useEffect(() => {
	// 	if (secondaryValue === '직접입력') {
	// 		setDirectInput(true);
	// 	}
	// }, [secondaryValue]);

	React.useEffect(() => {
		const arraySpecies = [];
		getPettypes(
			{},
			types => {
				setPetTotalList(types.msg);
				types.msg.map((v, i) => {
					arraySpecies.push(v.pet_species);
				});
				setPrimaryValue(arraySpecies);
			},
			err => Modal.alert(err),
		);
	}, []);

	const selectPrimary = (item, index) => {
		const arraySpeciesDetail = [];
		let tempList = {};
		tempList = petTotalList[index];
		setSecondaryValue(tempList.pet_species_detail);
		setIsSpeciesChanged(!isSpeciesChanged);
		setSelectedPrimary(item);
	};

	React.useEffect(() => {}, [secondaryValue]);

	const selectSecondary = (item, index) => {
		setSelectedSecondary(item);
	};

	const onDirectInput = input => {
		setSecondaryValue(input);
	};

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 * DP}}>
					<NormalDropDown menu={primaryValue} width={204} onSelect={selectPrimary} defaultIndex={0} />
					<NormalDropDown
						menu={secondaryValue}
						defaultIndex={0}
						width={292}
						height={500}
						isLargeCategoryChanged={isSpeciesChanged}
						onSelect={selectSecondary}
					/>
				</View>
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'filled'} btnTitle={props.okButtonnMsg} onPress={pressOk} />
				</View>
			</View>
		</View>
	);
};

PetSelectModal.defaultProps = {
	okButtonnMsg: '확인',
	onOk: (primaryValue, secondaryValue) => {
		console.log('YES');
	},
	// primaryInitItem: props.primaryInitItem,
	// secondaryInitItem: props.secondaryInitItem,
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	popUpWindow: {
		width: 654 * DP,
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

export default PetSelectModal;
