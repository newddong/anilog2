import React from 'react';
import {View, StyleSheet, Platform, Dimensions, Text, TouchableOpacity} from 'react-native';
import AniButton from '../button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import AidRequest from 'Organism/listitem/AidRequest';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import AidRequestList from 'Root/component/organism/list/AidRequestList';

/**
 * 입양 및 임시보호 동물 알림 모달
 *
 * @param {Object} props - props object
 * @param {object} props.data - 보호동물 데이터오브젲ㄱ트
 * @param {string} props.msg - 팝업 메시지
 * @param {string} props.yesMsg - Yes버튼 타이틀
 * @param {string} props.noMsg - No 버튼 타이틀
 * @param {(data)=>void} props.onYes - 등록 클릭
 * @param {(data)=>void} props.onNo - 아니오  클릭
 *
 */
const AnimalToRegisterModal = props => {
	// console.log('Adoption data', props.data);
	const data = props.data;
	const [selectedIndex, setSelectedIndex] = React.useState(props.data.length == 0 ? 0 : -1);

	const onYes = () => {
		if (selectedIndex == -1) {
			Modal.popOneBtn('등록하려는 동물을 선택해주세요.', '확인', () => Modal.close());
		}
		props.onYes(selectedIndex);
	};

	const onNo = () => {
		props.onNo();
	};

	const onSelect = i => {
		console.log('i', i);
		setSelectedIndex(i);
	};

	return (
		<TouchableOpacity activeOpacity={1} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
				<View style={[style.inside]}>
					<View style={[style.infoText]}>
						<Text style={[txt.noto28b, {textAlign: 'center'}]}>{props.msg}</Text>
					</View>
					<View style={[style.aidRequestContainer]}>
						{data.map((v, i) => {
							return (
								<View key={i} style={[style.aidRequestItem, {opacity: selectedIndex == -1 || i == selectedIndex ? 1 : 0.5}]}>
									<AidRequest data={v} selectBorderMode={true} inActiveOpacity={true} onSelect={() => onSelect(i)} showBadge={false} />
								</View>
							);
						})}
					</View>
					<View style={style.buttonContainer}>
						<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={props.noMsg} onPress={onNo} />
						<AniButton btnLayout={btn_w226} btnStyle={'filled'} btnTitle={props.yesMsg} onPress={onYes} />
					</View>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

AnimalToRegisterModal.defaultProps = {
	yesMsg: '등 록',
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 694 * DP,
		// height: 490 * DP,
		padding: 20 * DP,
		// paddingBottom: 30 * DP,
		backgroundColor: WHITE,
		borderRadius: 50 * DP,
	},
	inside: {
		width: 654 * DP,
		// height: 420 * DP,
		paddingVertical: 40 * DP,
	},
	infoText: {
		width: 466 * DP,
		// height: 92 * DP,
		alignItems: 'center',
		alignSelf: 'center',
	},
	aidRequestContainer: {
		marginVertical: 20 * DP,
		// backgroundColor: 'yellow',
	},
	aidRequestItem: {
		marginBottom: 10 * DP,
	},
	buttonContainer: {
		width: 486 * DP,
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
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

export default AnimalToRegisterModal;
