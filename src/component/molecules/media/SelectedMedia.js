import React from 'react';
import {View, Image} from 'react-native';
import DP from 'Root/config/dp';
import {Cancel48, Cancel62} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import FastImage from 'react-native-fast-image';

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

	return (
		<View style={props.layout}>
			{props.media_uri.includes('http:') ? (
				<FastImage source={{uri: props.media_uri}} style={props.layout} />
			) : (
				<Image source={{uri: props.media_uri}} style={props.layout} />
			)}
			<View
				style={{
					position: 'absolute',
					right: 6 * DP,
					top: 6 * DP,
					backgroundColor: 'white',
					borderRadius: 30 * DP,
					opacity: 0.8,
				}}>
				<View
					style={{
						position: 'absolute',
						right: 0,
						borderRadius: 30 * DP,
						backgroundColor: 'lightgray',
						opacity: 0.9,
						shadowOpacity: 0.1,
					}}>
					{/* 190 크기의 selectMedia를 호출한 경우 Cancel 마크 크기는 더 작게 */}
					{props.layout == styles.img_square_round_190 ? <Cancel48 onPress={onDelete} /> : <Cancel62 onPress={onDelete} />}
				</View>
			</View>
		</View>
	);
};

SelectedMedia.defaultProps = {
	layout: styles.img_square_round_190,
};
export default SelectedMedia;
