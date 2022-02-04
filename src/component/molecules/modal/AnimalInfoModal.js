import React from 'react';
import {View, StyleSheet, Platform, Dimensions} from 'react-native';
import AniButton from 'Molecules/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import AidRequest from '../organism_ksw/AidRequest';

/**
 * 나의 보호소 출신 동물 / 보호동물 및 보호요청게시글 게이트웨이 모달
 *
 * @param {Object} props - props object
 * @param {object} props.data - 팝업 메시지
 * @param {(data)=>void} props.onPressAdoptorInfo - 입양처보기 클릭
 * @param {(data)=>void} props.onPressReqeustInfo - 게시글보기 클릭
 *
 */
const AnimalInfoModal = props => {
	const data = props.data;
	const onPressAdoptorInfo = () => {
		props.onPressAdoptorInfo();
	};

	const onPressReqeustInfo = () => {
		props.onPressReqeustInfo();
	};

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				<View style={[style.inside]}>
					<View style={[style.aidRequestContainer]}>
						<AidRequest data={data.protect_animal_id} selectBorderMode={true} showBadge={false} />
					</View>
					<View style={style.buttonContainer}>
						<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={'게시글 보기'} onPress={onPressAdoptorInfo} />
						<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={'입양처 보기'} onPress={onPressReqeustInfo} />
					</View>
				</View>
			</View>
		</View>
	);
};

AnimalInfoModal.defaultProps = {};

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
		height: 358 * DP,
		padding: 20 * DP,
		paddingBottom: 30 * DP,
		backgroundColor: WHITE,
		borderRadius: 50 * DP,
	},
	inside: {
		width: 654 * DP,
		height: 308 * DP,
		justifyContent: 'space-between',
	},
	aidRequestContainer: {},
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

export default AnimalInfoModal;
