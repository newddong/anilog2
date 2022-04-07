import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity} from 'react-native';
import {APRI10, BLACK, GRAY10} from 'Root/config/color';
import ReviewList from 'Root/component/organism/list/ReviewList';
import Loading from 'Root/component/molecules/modal/Loading';
import {txt} from 'Root/config/textstyle';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {useNavigation} from '@react-navigation/core';

export default CommunityList = props => {
	const navigation = useNavigation();
	const reviewList = props.data.review;
	const articleList = props.data.free;
	const [type, setType] = React.useState('free');

	//자유 게시글 아이템 클릭
	const onPressArticle = index => {
		navigation.navigate('COMMUNITY', {screen: 'ArticleDetail', params: {community_object: articleList[index]}});
	};

	//후기 게시글의 댓글쓰기 혹은 댓글 모두 보기 클릭 클릭
	const onPressReply = index => {
		// navigation.push('CommunityCommentList', {community_object: data[index]});
		navigation.navigate('COMMUNITY', {screen: 'CommunityCommentList', params: {community_object: reviewList[index]}});
	};

	//후게 게시글 컨텐츠 클릭
	const onPressReviewContent = index => {
		navigation.navigate('COMMUNITY', {screen: 'ReviewDetail', params: {community_object: reviewList[index]}});
	};

	const whenEmpty = () => {
		return (
			<View style={{paddingVertical: 150 * DP}}>
				<Text style={[txt.roboto36b]}>목록이 없네요.</Text>
			</View>
		);
	};

	const header = () => {
		return (
			<View style={[style.filter]}>
				<View style={[style.filter_community_type]}>
					<TouchableOpacity onPress={() => setType('free')} style={[{paddingHorizontal: 10 * DP}]} activeOpacity={0.6}>
						<Text style={[txt.noto24, {color: type == 'free' ? APRI10 : GRAY10}]}>자유글</Text>
					</TouchableOpacity>
					<Text style={[txt.noto24, {color: GRAY10}]}>{'    |    '}</Text>
					<TouchableOpacity onPress={() => setType('review')} activeOpacity={0.6} style={[{paddingHorizontal: 10 * DP}]}>
						<Text style={[txt.noto24, {color: type == 'review' ? APRI10 : GRAY10}]}>리뷰</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	if (props.loading) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				{header()}
				<FlatList
					data={[{}]}
					renderItem={({item, index}) => {
						return (
							<View style={[style.listContainer]}>
								{type == 'free' ? (
									<>
										<ArticleList
											items={articleList}
											onPressArticle={onPressArticle} //게시글 내용 클릭
											whenEmpty={whenEmpty}
										/>
									</>
								) : (
									<>
										<ReviewList items={reviewList} whenEmpty={whenEmpty} onPressReviewContent={onPressReviewContent} onPressReply={onPressReply} />
									</>
								)}
							</View>
						);
					}}
					showsVerticalScrollIndicator={false}
					listKey={({item, index}) => index}
				/>
			</View>
		);
};
CommunityList.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	filter: {
		width: 676 * DP,
		paddingTop: 15 * DP,
		paddingBottom: 10 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	filter_community_type: {
		flexDirection: 'row',
	},
	shadow_filter: {
		// width: 140 * DP,
		height: 60 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',
		shadowOpacity: 0.5,
		elevation: 2,
		shadowOffset: {
			height: 4 * DP,
		},
		borderRadius: 20 * DP,
	},
	listContainer: {},
});
