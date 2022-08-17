import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import FeedThumnail from 'Molecules/media/FeedThumnail';
import DP from 'Root/config/dp';
/**
 *
 *@param {{
 * items: 'Array / 피드 목록',
 * onClickThumnail: void,
 * onEndReached: void,
 * selectMode : boolean
 * whenEmpty : Component
 * }} props
 */
export default FeedThumbnailList = props => {
	console.log('Feed Thubail lIst', props);
	const NUMCOLUMNS = 3;
	const [callOnScrollEnd, setCallOnScrollEnd] = React.useState(true); //처음 화면이 마운트 될 때 스크롤이 되지 않으면 onEndReached가 호출되지 않도록 처리
	const keyExtractor = (item, index) => index + '';

	const renderItem = ({item, index}) => {
		return (
			props.focused && (
				<FeedThumnail
					data={item}
					onSelect={() => {
						props.onClickThumnail(index, item);
					}}
					selectMode={props.selectMode}
				/>
			)
		);
	};
	return (
		<View style={[{marginBottom: 0}, {minHeight: props?.height}, {marginTop: 0 * DP}]}>
			<FlatList
				data={props.items}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				ListHeaderComponent={props.ListHeaderComponent}
				nestedScrollEnabled
				showsVerticalScrollIndicator={false}
				numColumns={NUMCOLUMNS}
				ListEmptyComponent={props.whenEmpty}
				onMomentumScrollBegin={() => {
					setCallOnScrollEnd(false); //처음 화면이 마운트 될 때 스크롤이 되지 않으면 onEndReached가 호출되지 않도록 처리
				}}
				onEndReached={() => {
					if (!callOnScrollEnd) {
						//처음 화면이 마운트 될 때 스크롤이 되지 않으면 onEndReached가 호출되지 않도록 처리
						props.onEndReached();
						setCallOnScrollEnd(true);
					}
				}}
			/>
			{/* )} */}
		</View>
	);
};
FeedThumbnailList.defaultProps = {
	onEndReached: () => {},
};
