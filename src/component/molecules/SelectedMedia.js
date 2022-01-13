import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import DP from 'Root/config/dp';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Cancel48, Cancel62} from '../atom/icon';
import {styles} from '../atom/image/imageStyle';

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
			<Image source={{uri: props.media_uri || DEFAULT_PROFILE}} style={props.layout} />
			<View
				style={{
					position: 'absolute',
					right: 6 * DP,
					top: 6 * DP,
					backgroundColor: 'white',
					borderRadius: 50,
					opacity: 0.8,
				}}>
				<View
					style={{
						position: 'absolute',
						right: 0,
						borderRadius: 50,
						backgroundColor: 'gray',
						opacity: 1,
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
