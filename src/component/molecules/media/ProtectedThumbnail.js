import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {GRAY10, RED10, RED20, WHITE, APRI10, YELL20, BLACK} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {Female48, Male48, Blur, RainbowBridge, RainbowBridge_226} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import feed_obj from 'Root/config/feed_obj';
/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {object} props.data - 썸네일 오브젝트 (img_uri, gender(female, male), status(protected, missing, reported, onNegotiation, adoption_available, adopted)
 * @param {(status:string, _id:number)=>void} props.onLabelClick - 썸네일 클릭할 때 동작하는 콜백, 썸네일 클릭 상태와 클릭한 썸네일의 고유 _id반환
 * @param {boolean} props.inActiveOpacity - 전시용일 경우 Touch 액션 제거
 */
const ProtectedThumbnail = props => {
	// console.log('props ProtectThumb', props.data);
	// const data = props.data;
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);

	//해당 보호요청 혹은 실종/제보 게시글의 수정이 발생했을 경우 썸네일을 갱신
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			try {
				if (feed_obj.shouldUpdateByEdit && feed_obj.edit_obj && feed_obj.edit_obj._id == props.data._id) {
					setData({...data, img_uri: feed_obj.edit_obj.feed_thumbnail});
				}
			} catch (err) {
				console.log('err', err);
			}
		});
		return unsubscribe;
	}, []);

	const borderByStatus = () => {
		if (data.status == 'emergency') {
			return {
				borderWidth: 8 * DP,
				borderColor: RED10,
				borderRadius: 30 * DP,
			};
		} else return false;
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
		switch (data.status) {
			case 'rescue':
				if (data.notice_day < 0) {
					return '공고중 D' + data.notice_day;
				} else return '입양가능';
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
	};

	const onClickLabel = () => {
		props.onLabelClick(data.status, data._id);
	};

	const getStatus = () => {
		if (data.status == 'missing' || data.status == 'report') {
			return (
				<View style={[style.upperStatus, {backgroundColor: data.status == 'missing' ? '#FF3120' : '#FFD153', zIndex: 3}]}>
					<Text style={[txt.noto28, {color: WHITE}]}>{data.status == 'missing' ? '실종' : '제보'}</Text>
				</View>
			);
		}
	};

	const getBottomStatus = () => {
		if (data.status != 'missing' && data.status != 'report' && data.status != 'rainbowbridge_euthanasia' && data.status != 'rainbowbridge') {
			return (
				<View style={[style.bottomCont]}>
					<Text style={[txt.noto24, {color: WHITE, textAlign: 'center', lineHeight: 32 * DP}]}>{getStatusText()}</Text>
				</View>
			);
		}
	};

	const getBlur = () => {
		if (data.status != 'missing' && data.status != 'report' && data.status != 'rainbowbridge_euthanasia' && data.status != 'rainbowbridge') {
			return (
				<View style={[style.blur, {zIndex: -1}]}>
					<Blur />
				</View>
			);
		} else {
			return <></>;
		}
	};

	return (
		<View style={styles.img_square_round_226}>
			<TouchableOpacity activeOpacity={props.inActiveOpacity ? 1 : 0.4} onPress={onClickLabel}>
				<FastImage
					source={{uri: data.img_uri, width: 226 * DP, height: 226 * DP}}
					style={[styles.img_square_round_226, borderByStatus(), {zIndex: -3}]}
				/>
				{/* <Image source={{uri: data.img_uri}} onLoad={e => setImageLoad(true)} style={[styles.img_square_round_226, borderByStatus(), {zIndex: -3}]} /> */}
				{/* 펫 성별마크 */}
				<View style={{position: 'absolute', right: 10 * DP, top: 10 * DP}}>{getGenderMark()}</View>
				{/* 펫 보호상태 */}
				{getBottomStatus()}
				{getStatus()}
				{getBlur()}
			</TouchableOpacity>
			{data.status == 'rainbowbridge' || data.status == 'rainbowbridge_euthanasia' ? (
				<TouchableOpacity activeOpacity={props.inActiveOpacity ? 1 : 0.4} onPress={onClickLabel} style={[style.rainbow, styles.img_square_round_226]}>
					<RainbowBridge_226 />
				</TouchableOpacity>
			) : (
				<></>
			)}
		</View>
	);
};

ProtectedThumbnail.defaultProps = {
	onLabelClick: e => console.log(e),
	inActiveOpacity: false,
};
export default React.memo(ProtectedThumbnail);

const style = StyleSheet.create({
	upperStatus: {
		width: 96 * DP,
		height: 56 * DP,
		position: 'absolute',
		borderTopLeftRadius: 30 * DP,
		borderBottomRightRadius: 20 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	blur: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		top: 0,
		right: 0,
		opacity: 0.8,
		borderRadius: 30 * DP,
		zIndex: 1,
		width: 226 * DP,
		height: 226 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomCont: {
		position: 'absolute',
		width: '100%',
		height: 36 * DP,
		opacity: 1,
		bottom: 4 * DP,
		borderBottomLeftRadius: 30 * DP,
		borderBottomRightRadius: 30 * DP,
	},
	rainbow: {
		position: 'absolute',
		backgroundColor: BLACK,
		opacity: 0.6,
		zIndex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
