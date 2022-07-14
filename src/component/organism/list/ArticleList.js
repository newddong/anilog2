import React from 'react';
import {FlatList, StyleSheet, View, Text, NativeModules} from 'react-native';
import {GRAY30, GRAY40, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import ArticleSummary from '../article/ArticleSummary';
import {Check42, Check50, Rect42_Border, Rect50_Border} from 'Root/component/atom/icon';
import {getLinesOfString} from 'Root/util/stringutil';
import {txt} from 'Root/config/textstyle';

/**
 * 자유 게시글 리스트
 * @param {object} props - Props Object
 * @param {object} props.items - 데이터
 * @param {(data:object)=>void)} props.onPressArticle - 게시글 컨텐츠 클릭(사진 이외 영역)
 * @param {string} props.isSearch - 검색어
 * @param {string} props.currentDetail - 자유글 상세 페이지에서 현재 자유글 여부
 * @param {()=>void)} props.onEndReached - 최하단 스크롤 콜백
 */
const ArticleList = props => {
	const onPressToggle = (index, bool) => {
		props.onPressCheck(index, bool);
	};

	const renderItem = (item, index) => {
		return (
			<View
				style={[
					{
						flexDirection: 'row',
						borderTopColor: GRAY40,
						borderTopWidth: index == 0 ? 0 : 2 * DP,
						backgroundColor: props.currentDetail == item._id ? GRAY30 : WHITE,
						width: 694 * DP,
					},
				]}>
				{props.selectMode ? (
					<View style={{justifyContent: 'center', marginRight: 20 * DP}}>
						{/* <CheckBox state={item.checkBoxState} onCheck={() => props.onCheckBox(index)} /> */}
						{item.checkBoxState ? (
							<Check42 onPress={() => onPressToggle(index, false)} />
						) : (
							<Rect42_Border onPress={() => onPressToggle(index, true)} />
						)}
					</View>
				) : (
					<></>
				)}
				<ArticleSummary data={item} isSearch={props.isSearch} selectMode={props.selectMode} onPressArticle={() => props.onPressArticle(index)} />
			</View>
		);
	};

	const onEndReached = () => {
		props.onEndReached();
	};

	return (
		<View style={[style.container, {borderBottomColor: props.items.length == 0 ? 'white' : GRAY40}]}>
			<FlatList
				data={props.items}
				keyExtractor={item => item._id}
				listKey={({item, index}) => index}
				renderItem={({item, index}) => renderItem(item, index)}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={<View style={{height: 30 * DP}} />}
				ListEmptyComponent={props.whenEmpty}
				// https://reactnative.dev/docs/optimizing-flatlist-configuration
				initialNumToRender={15}
				onEndReached={onEndReached} //Flatlist 페이징
				onEndReachedThreshold={0.6} //페이징을 하는 타이밍
				// maxToRenderPerBatch={5} // re-render를 막는군요.
				windowSize={5}
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
	onEndReached: () => {},
};

export default ArticleList;

const style = StyleSheet.create({
	container: {
		// width: 750 * DP,
		alignItems: 'center',
		borderBottomWidth: 2 * DP,
		paddingHorizontal: 28 * DP,
		// paddingVertical: 30 * DP,
	},
});
