import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {GRAY40} from 'Root/config/color';
import DP from 'Root/config/dp';
import ArticleSummary from '../article/ArticleSummary';
import {Check50, Rect50_Border} from 'Root/component/atom/icon';

/**
 * 자유 게시글 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {(data:object)=>void)} props.onPressArticle - 게시글 컨텐츠 클릭(사진 이외 영역)
 * @param {string} props.isSearch - 검색어
 */
const ArticleList = props => {
	const [refresh, setRefresh] = React.useState(true);

	const onPressToggle = (index, bool) => {
		props.onPressCheck(index, bool);
	};

	const renderItem = (item, index) => {
		return (
			<View style={{flexDirection: 'row'}}>
				{props.selectMode ? (
					<View style={{justifyContent: 'center', marginRight: 20 * DP}}>
						{/* <CheckBox state={item.checkBoxState} onCheck={() => props.onCheckBox(index)} /> */}
						{item.checkBoxState ? (
							<Check50 onPress={() => onPressToggle(index, false)} />
						) : (
							<Rect50_Border onPress={() => onPressToggle(index, true)} />
						)}
					</View>
				) : (
					<></>
				)}
				<ArticleSummary data={item} isSearch={props.isSearch} selectMode={props.selectMode} onPressArticle={() => props.onPressArticle(index)} />
			</View>
		);
	};

	return (
		<View style={[style.container, {borderBottomColor: props.items.length == 0 ? 'white' : GRAY40}]}>
			<FlatList
				data={props.items}
				keyExtractor={item => item._id}
				listKey={({item, index}) => index}
				renderItem={({item, index}) => renderItem(item, index)}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={props.whenEmpty}
				// https://reactnative.dev/docs/optimizing-flatlist-configuration
				extraData={refresh}
				initialNumToRender={15}
				// maxToRenderPerBatch={5} // re-render를 막는군요.
				windowSize={11}
				// https://reactnative.dev/docs/optimizing-flatlist-configuration
			/>
		</View>
	);
};

ArticleList.defaultProps = {
	whenEmpty: () => {
		return <></>;
	},
	onPressArticle: () => {},
	onPressRecommendReview: () => {},
	onPressThumnails: () => {},
	onPressReply: () => {},
	isSearch: '',
};

export default ArticleList;

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		borderBottomWidth: 2 * DP,
	},
});
