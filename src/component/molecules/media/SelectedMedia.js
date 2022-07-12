import React from 'react';
import {View, Image} from 'react-native';
import DP from 'Root/config/dp';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Cancel48, Cancel62, Cancel36} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
/**
 * 갤러리에서 불러온 사진 박스
 * @param {object} props - Props Object
 * @param {string} props.media_uri - 미디어 uri
 * @param {object} props.layout - ImageStyle  styles.img_square_round_190 / 410
 * @param {()=>void} props.onDelete - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const SelectedMedia = props => {
	const onDelete = () => {
		props.onDelete();
	};

	const isVideo = props.media ? props.media.is_video || props.media.isVideo : false;
	// console.log('isVideo', isVideo, props.media);
	const image = () => {
		if (isVideo) return false;
		let uri = props.media_uri ?? props.media.uri;
		if (uri.uri) {
			return uri.uri.includes('http') ? (
				<FastImage source={{uri: uri.uri}} style={props.layout} />
			) : (
				<Image source={{uri: uri.cropUri ?? uri.uri}} style={props.layout} />
			);
		} else {
			return uri.includes('http') ? <FastImage source={{uri: uri.uri}} style={props.layout} /> : <Image source={{uri: uri}} style={props.layout} />;
		}
	};

	const video = () => {
		let video = props.media.videoUri ?? props.media.uri;
		return <Video source={{uri: video}} style={[props.layout]} muted={true} resizeMode="contain"></Video>;
	};

	return (
		<View style={[props.layout]}>
			{isVideo ? video() : image()}
			<View
				style={{
					position: 'absolute',
					right: 6 * DP,
					top: 6 * DP,
					borderRadius: 30 * DP,
				}}>
				<View
					style={{
						position: 'absolute',
						top: 10 * DP,
						right: 10 * DP,
						borderRadius: 30 * DP,
						backgroundColor: 'lightgray',
						shadowOpacity: 0.1,
					}}>
					{/* 190 크기의 selectMedia를 호출한 경우 Cancel 마크 크기는 더 작게 */}
					{props.layout == styles.img_square_round_190 || props.layout == styles.img_square_round_336 ? (
						<Cancel36 onPress={onDelete} />
					) : (
						<Cancel62 onPress={onDelete} />
					)}
				</View>
			</View>
		</View>
	);
};

SelectedMedia.defaultProps = {
	layout: styles.img_square_round_190,
};
export default SelectedMedia;
