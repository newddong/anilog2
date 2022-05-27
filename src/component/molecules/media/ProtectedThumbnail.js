import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {GRAY10, RED10, RED20, WHITE, APRI10, YELL20} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {Mercy_Killing, Female48, Male48} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import FastImage from 'react-native-fast-image';

/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {object} props.data - 썸네일 오브젝트 (img_uri, gender(female, male), status(protected, missing, reported, onNegotiation, adoption_available, adopted)
 * @param {(status:string, _id:number)=>void} props.onLabelClick - 썸네일 클릭할 때 동작하는 콜백, 썸네일 클릭 상태와 클릭한 썸네일의 고유 _id반환
 * @param {boolean} props.inActiveOpacity - 전시용일 경우 Touch 액션 제거
 */
const ProtectedThumbnail = props => {
	// console.log('props ProtectThumb', props.data);
	const data = props.data;

	const borderByStatus = () => {
		if (data.status == 'emergency') {
			return {
				borderWidth: 8 * DP,
				borderColor: RED10,
				borderRadius: 30 * DP,
			};
		} else return false;
	};

	const getEmergencyMsg = () => {
		return data.status == 'emergency' ? (
			<View style={{position: 'absolute', alignSelf: 'center', bottom: 46 * DP}}>
				<Mercy_Killing />
			</View>
		) : (
			false
		);
	};

	const getGenderMark = () => {
		switch (data.gender) {
			case 'male':
				return <Male48 />;
				break;
			case 'female':
				return <Female48 />;
				break;

			default:
				break;
		}
	};

	const getStatusContainerStyle = () => {
		if (data.status == 'missing') {
			return {backgroundColor: RED20};
		} else if (data.status == 'report') {
			return {backgroundColor: YELL20, borderWidth: 2 * DP, borderColor: YELL20};
		} else if (data.status == 'emergency') {
			return {backgroundColor: RED20, borderWidth: 2 * DP, borderColor: RED20};
		} else return {backgroundColor: GRAY10};
	};

	const getStatusText = () => {
		if (data.notice_day < 0) {
			return '공고중 D' + data.notice_day;
		} else {
			switch (data.status) {
				case 'rescue':
				case 'wait':
				case 'protect':
					return '입양 가능';
				case 'emergency':
					return '안락사 임박';
				case 'found':
					return '주인 찾음';
				case 'missing':
					return '실종';
				case 'rainbowbridge_euthanasia':
				case 'rainbowbridge':
					return '무지개다리';
				case 'report':
					return '제보';
				case 'discuss':
				case undefined:
					return '협의 중';
				case 'donation':
					return '기증';
				case 'complete':
				case 'accept':
				case 'done':
					return '입양 완료';
			}
		}
	};

	const onClickLabel = () => {
		// console.log(`--onClickLabel-- data=>${JSON.stringify(data)}`);
		props.onLabelClick(data.status, data._id);
	};

	return (
		<View style={styles.img_square_round_214}>
			<TouchableOpacity activeOpacity={props.inActiveOpacity ? 1 : 0.4} onPress={onClickLabel}>
				<Image source={{uri: data.img_uri}} style={[styles.img_square_round_214, borderByStatus()]} />
				{/* 펫 성별마크 */}
				<View style={{position: 'absolute', right: 10 * DP, top: 10 * DP}}>{getGenderMark()}</View>
				{/* 펫 보호상태 */}
				<View
					style={[
						getStatusContainerStyle(),
						{
							position: 'absolute',
							width: '100%',
							height: 36 * DP,
							opacity: 1,
							bottom: 0,
							borderBottomLeftRadius: 30 * DP,
							borderBottomRightRadius: 30 * DP,
						},
					]}>
					<Text style={[txt.noto24, {color: WHITE, textAlign: 'center', lineHeight: 32 * DP}]}>{getStatusText()}</Text>
				</View>
				{getEmergencyMsg()}
			</TouchableOpacity>
		</View>
	);
};

ProtectedThumbnail.defaultProps = {
	onLabelClick: e => console.log(e),
	inActiveOpacity: false,
};
export default ProtectedThumbnail;
