import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import CommentList from 'Root/component/organism/comment/CommentList';
import ReviewBriefList from 'Root/component/organism/list/ReviewBriefList';
import {useNavigation} from '@react-navigation/core';
import ReviewContent from 'Root/component/organism/article/ReviewContent';
import {getCommunityList} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {getCommentListByCommunityId} from 'Root/api/commentapi';

/**
 * 후기 상세 내용
 * @param {object} props - Props Object
 * @param {object} props.data - 리뷰 데이터 오브젝트
 */
export default ReviewDetail = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.route.params.community_object);
	const [reviewList, setReviewList] = React.useState('false');
	const [comments, setComments] = React.useState([]);
	const [showMore, setShowMore] = React.useState(false);
	const scrollRef = React.useRef();
	// console.log('data', data);

	React.useEffect(() => {
		if (data.community_address.normal_address.address_name != '') {
			navigation.setOptions({title: `${data.community_address.normal_address.city} / ${data.community_address.normal_address.district}`});
		} else {
			navigation.setOptions({title: '후기 게시글'});
		}
		getComment();
		getCommunityList(
			{
				community_type: 'review',
			},
			result => {
				const res = result.msg.review.slice(0, 4);
				let removeThisReview = res.filter(e => e._id != data._id);
				console.log('removeThisReview', removeThisReview.length);
				setReviewList(removeThisReview);
			},
			err => {
				console.log('err / getCommunityList / ReviewDEtail : ', err);
			},
		);
	}, []);

	const getComment = () => {
		getCommentListByCommunityId(
			{
				community_object_id: data._id,
				request_number: 1000,
			},
			comments => {
				setComments(comments.msg);
				// console.log('comments', comments);
			},
			err => console.log('getCommentListByFeedId', err),
		);
	};

	//미트볼 클릭
	const onPressMeatball = () => {
		alert('onPressMeatball');
	};

	//즐겨찾기 클릭
	const onPressFavorite = () => {
		alert('onPressFavorite');
	};

	//댓글 클릭
	const onPressReply = () => {
		// alert('moveToReplyListPage');
		navigation.push('CommunityCommentList', {community_object: data});
	};

	//카테고리 클릭
	const onPressLikeBriefItem = index => {
		alert('onPressLikeBriefItem');
	};

	//다른 후기 게시글 클릭
	const onPressReviewBrief = index => {
		navigation.push('ReviewDetail', {community_object: reviewList[index]});
	};

	if (reviewList == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={[{}]}
					ref={scrollRef}
					// keyExtractor={({item, index}) => index}
					listKey={({item, index}) => index}
					showsVerticalScrollIndicator={false}
					onContentSizeChange={(width, height) => {
						if (showMore) {
							scrollRef.current.scrollToEnd();
						}
					}}
					renderItem={({item, index}) => {
						return (
							<View style={{alignItems: 'center', marginTop: 30 * DP}}>
								<ReviewContent data={data} onPressFavorite={onPressFavorite} onPressMeatball={onPressMeatball} />
								<View style={[style.separator]} />
								<View style={[style.commentList]}>
									{comments && comments.length > 0 ? (
										<TouchableOpacity onPress={onPressReply} style={[style.replyCountContainer]}>
											<Text style={[txt.noto24, {color: GRAY10}]}> 댓글 {comments.length}개 모두 보기</Text>
										</TouchableOpacity>
									) : (
										<></>
									)}
									<View style={[style.commentContainer]}>
										<CommentList items={comments && comments.length > 3 ? comments.slice(0, 3) : comments} onPressReplyBtn={onPressReply} />
									</View>
									<View style={[{marginTop: 20 * DP, marginBottom: 30 * DP}]}>
										<ReplyWriteBox onPressReply={onPressReply} onWrite={onPressReply} isProtectRequest={true} />
									</View>
								</View>

								<View style={[style.reviewList]}>
									<Text style={[txt.noto24, {}]}>관련후기 게시글</Text>
									<ReviewBriefList
										items={reviewList}
										showMore={() => setShowMore(true)}
										onPressReview={onPressReviewBrief}
										onPressLike={onPressLikeBriefItem}
									/>
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
		// paddingVertical: 30 * DP,
		flex: 1,
		// alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	separator: {
		width: 654 * DP,
		height: 2 * DP,
		backgroundColor: GRAY30,
		marginTop: 30 * DP,
	},
	commentList: {},
	replyWriteBox: {
		width: 694 * DP,
	},
	reviewList: {
		width: 654 * DP,
	},
	replyCountContainer: {
		width: 474 * DP,
		alignItems: 'flex-end',
		alignSelf: 'flex-end',
		marginRight: 48 * DP,
		marginTop: 30 * DP,
		marginBottom: 20 * DP,
	},
	commentContainer: {
		paddingBottom: 10 * DP,
		paddingTop: 20 * DP,
		// backgroundColor: 'yellow',
	},
});
