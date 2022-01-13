import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {dummy_selectedMediaList} from 'Root/config/dummyDate_json';
import {styles} from '../atom/image/imageStyle';
import SelectedMedia from '../molecules/SelectedMedia';
import {selectedMediaList} from './style_organism';

/**
 * @param {{
 * layout : 'styles / layout ex) img_square_round_190',
 * items : 'list Items / [1,2,3,4]',
 * onDelete : '우상단 X마크 클릭 / 삭제 콜백함수'
 * }} props
 */
export default SelectedMediaList = props => {
	const onDelete = index => {
		props.onDelete(index);
	};

	const renderItem = (item, index) => {
		return (
			<View style={[selectedMediaList.itemContainer]}>
				<SelectedMedia layout={props.layout} media_uri={item} onDelete={() => onDelete(index)} />
			</View>
		);
	};

	return (
		<View style={[props.layout == styles.img_square_round_190 ? selectedMediaList.container_190 : selectedMediaList.container_410]}>
			<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} horizontal={true} showsHorizontalScrollIndicator={false} />
		</View>
	);
};

SelectedMediaList.defaultProps = {
	items: dummy_selectedMediaList,
	layout: styles.img_square_round_190,
	onDelete: e => console.log(e),
};

// media_uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',
