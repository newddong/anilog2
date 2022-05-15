import React, {Component} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import FeedThumnail from 'Molecules/media/FeedThumnail';
import {NORMAL, PET, SHELTER} from 'Root/i18n/msg';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
import ListEmptyInfo from 'Molecules/info/ListEmptyInfo';
import DP from 'Root/config/dp';
/**
 *
 *@param {{
 * items: 'Array / 피드 목록',
 * onClickThumnail: void,
 * selectMode : boolean
 * whenEmpty : Component
 * }} props
 */
export default FeedThumbnailList = props => {
	const NUMCOLUMNS = 3;
	const renderItem = ({item, index}) => {
		// FavoriteFeeds에서 SelectStat로부터 받은 받은 선택모드 값을 selectMode 변수로 넘겨줌. FeedThumail에서 투명도 조절과 체크 사항을 표기하기 위함
		return <FeedThumnail data={item} onSelect={() => props.onClickThumnail(index, item)} selectMode={props.selectMode} />;
	};
	// console.log('items', props.items.length);
	return (
		<View style={[{marginBottom: 0}, {height: props?.height}, {marginTop: -10 * DP}]}>
			{/* {props.items.length > 0 && ( */}
			<FlatList
				data={props.items}
				renderItem={renderItem}
				keyExtractor={(item, index) => index + ''}
				ListHeaderComponent={props.ListHeaderComponent}
				// stickyHeaderIndices={[1]}
				nestedScrollEnabled
				showsVerticalScrollIndicator={false}
				numColumns={NUMCOLUMNS}
				ListEmptyComponent={props.whenEmpty}
			/>
			{/* )} */}
		</View>
	);
};
FeedThumbnailList.defaultProps = {};
