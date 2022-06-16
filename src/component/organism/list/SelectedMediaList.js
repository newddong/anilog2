import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from 'Atom/image/imageStyle';
import SelectedMedia from 'Molecules/media/SelectedMedia';
import {selectedMediaList} from 'Organism/style_organism copy';

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
		<View style={{height:props.layout.height}}>
			<FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)} horizontal={true} showsHorizontalScrollIndicator={false} />
		</View>
	);
};

SelectedMediaList.defaultProps = {
	items: [],
	layout: styles.img_square_round_190,
	onDelete: e => console.log(e),
};

// media_uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',
