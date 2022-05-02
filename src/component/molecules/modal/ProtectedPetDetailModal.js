import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions, Image, TouchableWithoutFeedback} from 'react-native';
import AniButton from '../button/AniButton';
import {WHITE, GRAY10, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Female48, Male48} from '../../atom/icon';
import {styles} from '../../atom/image/imageStyle';
import Modal from '../../modal/Modal';

/**
 * 한개 버튼을 띄우는 모달
 *
 * @param {Object} props - props object
 * @param {Object} props.data - 보호동물 데이터 오브젝트
 * @param {()=>void} props.onOk - 등록 버튼 콜백
 * @param {()=>void} props.onOk - 취소 버튼 콜백
 *
 */
const ProtectedPetDetailModal = props => {
	const data = props.data;

	const pressOk = () => {
		props.onOk();
		Modal.close();
	};

	const getNeutralization = () => {
		let neutralization = 'O';
		if (data.protect_animal_neutralization == 'no') {
			neutralization = 'X';
		} else if (data.protect_animal_neutralization == 'unknown') {
			neutralization = '모름';
		}
		return neutralization;
	};

	const getGender = () => {
		switch (data.pet_sex) {
			case 'male':
				return <Male48 />;
			case 'female':
				return <Female48 />;
			case 'unknown':
				return <></>;
			default:
				break;
		}
	};

	const getOverLap = leng => {
		let left = 0;
		switch (leng) {
			case 0:
			case 1:
			case 2:
				left = 0;
				break;
			case 3:
				left = -42;
				break;
			case 4:
				left = -88;
				break;
			case 5:
				left = -110;
				break;
			default:
				break;
		}
		return left;
	};
	return (
		<TouchableWithoutFeedback onPress={() => Modal.close()}>
			<View style={style.background}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={event => {
						event.preventDefault();
					}}
					style={[style.popUpWindow, style.shadow]}>
					<View style={[style.imageBox, data.protect_animal_photo_uri_list.length < 3 ? {justifyContent: 'center'} : null]}>
						{data.protect_animal_photo_uri_list.map((v, i) => {
							return (
								<View
									key={i}
									style={[
										{
											left: getOverLap(data.protect_animal_photo_uri_list.length) * DP * i,
										},
									]}>
									<Image source={{uri: v}} style={[styles.img_square_round_178, style.imageItem]} />
								</View>
							);
						})}
					</View>
					<View style={[style.detailBox]}>
						<View style={[style.detail_step1]}>
							{getGender()}
							<Text style={[txt.noto28b]}>
								{'  '}
								{data.pet_species + ' / ' + data.pet_species_detail}
							</Text>
						</View>
						<View style={[style.detail_step2]}>
							<Text style={[txt.noto24, {color: GRAY20}]}>예상연령 : </Text>
							<Text style={[txt.noto24]}>{data.protect_animal_estimate_age || ''}</Text>
							<Text style={[txt.noto24, {color: GRAY20, marginLeft: 40 * DP}]}>체중 : </Text>
							<Text style={[txt.noto24]}>{data.protect_animal_weight == '' ? '모름' : data.protect_animal_weight + ' kg' || ''}</Text>
							<Text style={[txt.noto24, {color: GRAY20, marginLeft: 40 * DP}]}>중성화: </Text>
							<Text style={[txt.noto24]}>{getNeutralization()}</Text>
						</View>
						<View style={[style.detail_step2]}>
							<Text style={[txt.noto24, {color: GRAY20}]}>구조장소 : </Text>
							<Text style={[txt.noto24]}>{data.protect_animal_rescue_location || ''}</Text>
						</View>
					</View>
					<View style={[style.underline]}></View>
					<View style={[style.msg]}>
						<Text style={[txt.noto28, {color: GRAY10}]}>위 내용으로 등록하시겠습니까?</Text>
					</View>

					<View style={style.buttonContainer}>
						<AniButton btnTitle={'등록'} onPress={pressOk} />
					</View>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

ProtectedPetDetailModal.defaultProps = {
	popUpMsg: 'popUp',
	okMsg: 'ok',
	onOk: () => {
		alert('OK');
	},
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
		width: 654 * DP,
		height: 668 * DP,
		backgroundColor: WHITE,
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		// paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
		alignItems: 'center',
	},
	imageBox: {
		width: 450 * DP,
		height: 182 * DP,
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 2 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	detailBox: {
		width: 574 * DP,
		height: 140 * DP,
		marginTop: 28 * DP,
	},
	detail_step1: {
		height: 48 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	detail_step2: {
		marginTop: 10 * DP,
		height: 36 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	underline: {
		width: 574 * DP,
		height: 2 * DP,
		marginVertical: 30 * DP,
		backgroundColor: APRI10,
	},
	msg: {
		width: 466 * DP,
		height: 48 * DP,
		color: GRAY10,
		alignItems: 'center',
	},
	buttonContainer: {
		marginTop: 30 * DP,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 2 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	imageItem: {
		borderWidth: 2 * DP,
		borderColor: WHITE,
	},
});

export default ProtectedPetDetailModal;
