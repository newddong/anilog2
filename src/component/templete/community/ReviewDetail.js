import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, Like48_Border, LocationGray, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import {dummy_userObject} from 'Root/config/dummyDate_json';
import {styles} from 'Root/component/atom/image/imageStyle';
import {GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import CommentList from 'Root/component/organism/comment/CommentList';
import ReviewBriefList from 'Root/component/organism/list/ReviewBriefList';
import {useNavigation} from '@react-navigation/core';
import ReviewContent from 'Root/component/organism/article/ReviewContent';

/**
 * 후기 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 리뷰 데이터 오브젝트
 */
export default ReviewDetail = props => {
	const navigation = useNavigation();

	React.useEffect(() => {
		navigation.setOptions({title: '서울시 / 성동구'});
	}, []);

	const onPressMeatball = () => {
		alert('onPressMeatball');
	};

	const onPressFavorite = () => {
		alert('onPressFavorite');
	};

	const category_dummy = ['애견카페', '애견호텔', '애견놀이터'];

	const moveToReviewDetail = () => {
		alert('moveToReviewDetail');
	};

	const onPressReply = () => {
		// alert('moveToReplyListPage');
		navigation.push('ReviewCommentList', {feedobject: {_id: '62262a16d38ae5f3c51390d6'}});
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={[{}]}
				// keyExtractor={({item, index}) => index}
				listKey={({item, index}) => index}
				showsVerticalScrollIndicator={false}
				renderItem={({item, index}) => {
					return (
						<View style={{alignItems: 'center'}}>
							<ReviewContent onPressFavorite={onPressFavorite} onPressMeatball={onPressMeatball} />
							<View style={[style.separator]} />
							<View style={[style.commentList]}>
								<TouchableOpacity onPress={onPressReply} style={[style.commentLength]}>
									<Text style={[txt.noto26, {color: GRAY10}]}>댓글 6개 모두 보기</Text>
								</TouchableOpacity>
								<CommentList />
							</View>
							<View style={[style.replyWriteBox]}>
								<ReplyWriteBox onPressReply={onPressReply} onWrite={onPressReply} isProtectRequest={true} />
							</View>
							<View style={[style.reviewList]}>
								<Text style={[txt.noto24, {}]}>관련후기 게시글</Text>
								<ReviewBriefList items={dummyReviews} />
							</View>
						</View>
					);
				}}
			/>
		</View>
	);
};

ReviewDetail.defaultProps = {};

const style = StyleSheet.create({
	container: {
		paddingVertical: 30 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		// backgroundColor: 'yellow',
	},

	separator: {
		width: 654 * DP,
		height: 2 * DP,
		backgroundColor: GRAY30,
		marginTop: 30 * DP,
	},
	commentList: {
		width: 654 * DP,
		paddingVertical: 30 * DP,
		// backgroundColor: 'yellow',
	},
	commentLength: {
		alignItems: 'flex-end',
		marginBottom: 30 * DP,
	},
	replyWriteBox: {
		width: 694 * DP,
		paddingVertical: 30 * DP,
	},
	reviewList: {
		width: 654 * DP,
		marginTop: 20 * DP,
	},
});

const dummyReviews = [{id: 1}, {id: 2}, {id: 3}];