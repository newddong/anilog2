import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from 'Atom/image/imageStyle';
import SelectedMedia from 'Molecules/media/SelectedMedia';
import {selectedMediaList} from 'Organism/style_organism copy';

/**
 * 제보 업로드 선택된 미디어 목록
 * @param {Array} props.items - 미디어 목록
 * @param {Array} props.mediaList - 미디어 목록
 * @param {object} props.layout - 미디어 layout 사이즈
 * @param {void} props.onDelete- 미디어 삭제 함수
 *
 */
export default SelectedMediaList = props => {
	console.log('SeelctedMediaList', props);
	const isContainVideo = props.mediaList.length > 0;
	const onDelete = index => {
		props.onDelete(index);
	};
	const renderItem = ({item, index}) => {
		return (
			<View style={[selectedMediaList.itemContainer, {borderRadius: 30 * DP}]}>
				<SelectedMedia layout={props.layout} media={isContainVideo ? item : false} media_uri={item} onDelete={() => onDelete(index)} />
			</View>
		);
	};

	return (
		<View style={{height: props.layout.height}}>
			<FlatList
				data={isContainVideo ? props.mediaList : props.items}
				renderItem={renderItem}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

SelectedMediaList.defaultProps = {
	items: [],
	layout: styles.img_square_round_190,
	onDelete: e => console.log(e),
};

// media_uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',
