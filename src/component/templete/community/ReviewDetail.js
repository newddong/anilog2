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
	const gg = {
		__v: 0,
		_id: '624592de06cdc2f33c14cfdd',
		community_address: {
			_id: '624592de06cdc2f33c14cfde',
			normal_address: {_id: '624592de06cdc2f33c14cfe0', address_name: '', city: '', district: ''},
			region: {_id: '624592de06cdc2f33c14cfe1', latitude: '', longitude: ''},
			road_address: {_id: '624592de06cdc2f33c14cfdf', address_name: '', city: '', district: ''},
		},
		community_animal_type: 'cat',
		community_comment_count: 0,
		community_content:
			'<div>4년을 함께</div><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648726746166_1473A70E-78E5-4B2D-893E-18B35E2BD4C8.jpg" id="image" height="450px" width="300px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><br></p>',
		community_date: '2022-03-30T05:57:16.687Z',
		community_favorite_count: 0,
		community_free_type: '',
		community_interests: {
			interests_etc: [],
			interests_hospital: [],
			interests_interior: ['노즈워크/장난감'],
			interests_location: {city: '', district: ''},
			interests_review: [],
			interests_trip: ['펫 숙소', '놀이터'],
		},
		community_is_attached_file: true,
		community_is_delete: false,
		community_is_recomment: false,
		community_is_temporary: false,
		community_like_count: 0,
		community_title: '사진1개요',
		community_type: 'review',
		community_update_date: '2022-03-30T05:57:16.687Z',
		community_writer_id: {
			_id: '623b17ed400ac30b877dd7d9',
			user_nickname: '자네는고양이어딘가',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648045670715_812A892F-3DE8-4C38-96D8-2F6A6BC78091.jpg',
		},
		type: 'CommunityObject',
	};

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
		navigation.push('ReviewCommentList', {feedobject: {_id: '62262a16d38ae5f3c51390d6'}});
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

const dummyReviews = [{id: 1}, {id: 2}, {id: 3}];
