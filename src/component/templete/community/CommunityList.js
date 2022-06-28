import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {APRI10, BLACK, GRAY10} from 'Root/config/color';
import ReviewList from 'Root/component/organism/list/ReviewList';
import Loading from 'Root/component/molecules/modal/Loading';
import {txt} from 'Root/config/textstyle';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {useNavigation} from '@react-navigation/core';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import {getCommunityListByUserId, updateAndDeleteCommunity} from 'Root/api/community';
import community_obj, {updateReview} from 'Root/config/community_obj';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import {EmptyIcon} from 'Root/component/atom/icon';
import {likeEtc} from 'Root/api/likeetc';
import {FREE_LIMIT, REPORT_MENU, REVIEW_LIMIT} from 'Root/i18n/msg';

/**
 *  프로필탭 커뮤니티 글 출력용 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressArticle - 내용 클릭
 * @param {()=>void)} props.onPressArticle - 내용 클릭
 * @param {string} props.isSearch - 검색어
 * @param {boolean} props.initializeCommList - 커뮤니티 리스트 초기화
 */
const CommunityList = React.memo(props => {
	const navigation = useNavigation();
	const [free, setFree] = React.useState('false');
	const [review, setReview] = React.useState('false');
	const [type, setType] = React.useState('free');
	const [freeOffset, setFreeOffset] = React.useState(1);
	const [reviewOffset, setReviewOffset] = React.useState(1);
	const [refresh, setRefresh] = React.useState(false);

	React.useEffect(() => {
		getArticleList();
		getReviewList();
	}, []);

	//즐겨찾기버튼을 클릭할 시 data를 최신상태로 갱신하기 위한 setState처리
	React.useEffect(() => {
		if (free != 'false' && review != 'false') {
			setReviewOffset(1);
			setFreeOffset(1);
			onRefresh();
		}
	}, [props.data]);

	React.useEffect(() => {
		if (refresh) {
			getArticleList(true);
			getReviewList(true);
		}
	}, [refresh]);

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};
	const onRefresh = () => {
		setRefresh(true);
		wait(0).then(() => setRefresh(false));
	};

	const getArticleList = isRefresh => {
		console.log('isRefresh', isRefresh, freeOffset);
		getCommunityListByUserId(
			{
				userobject_id: props.user_id,
				community_type: 'free',
				limit: FREE_LIMIT,
				page: freeOffset,
			},
			result => {
				console.log('result / getCommunityListuser / CommunityList : Free', result.msg.free.length);
				const res = result.msg.free;
				if (isRefresh) {
					setFree(res);
				} else if (free != 'false') {
					console.log('temp lenth', [...free, ...res].length);
					setFree([...free, ...res]);
				} else {
					setFree(res);
				}
				setFreeOffset(freeOffset + 1);
			},
			err => {
				if (err.includes('code 500')) {
					setFree([]);
					Modal.popNetworkErrorModal('서버에서 정보를 받아오지 못했습니다.');
				} else if (err.includes('없습니다')) {
					setFree([]);
				}
			},
		);
	};

	const getReviewList = isRefresh => {
		console.log('isRefresh', isRefresh, reviewOffset);
		getCommunityListByUserId(
			{
				userobject_id: props.user_id,
				community_type: 'review',
				limit: REVIEW_LIMIT,
				page: reviewOffset,
			},
			result => {
				console.log('result / getCommunityListuser / CommunityList : Review ', result.msg.review.length);
				const res = result.msg.review;
				if (isRefresh) {
					setReview(res);
				} else if (review != 'false') {
					console.log('temp lenth', [...review, ...res].length);
					setReview([...review, ...res]);
				} else {
					setReview(res);
				}
				setReviewOffset(reviewOffset + 1);
			},
			err => {
				if (err.includes('code 500')) {
					setReview([]);
					Modal.popNetworkErrorModal('서버에서 정보를 받아오지 못했습니다.');
				} else if (err.includes('없습니다')) {
					setReview([]);
				}
			},
		);
	};

	//리스트 페이징 작업
	const onEndReached = commtype => {
		if (commtype == 'free') {
			console.log('EndReached Free', free.length % FREE_LIMIT);
			//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
			//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
			if (free.length % FREE_LIMIT == 0) {
				type == 'free' ? getArticleList() : false;
			}
		} else {
			console.log('EndReached Review', review.length % REVIEW_LIMIT);
			//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
			//리뷰 메인 페이지에서는 필터가 적용이 되었을 때도 api 접속 불필요
			if (review.length % REVIEW_LIMIT == 0) {
				type == 'free' ? false : getReviewList();
			}
		}
	};

	//자유 게시글 아이템 클릭
	const onPressArticle = index => {
		navigation.push('ArticleDetail', {community_object: free[index]});
	};

	//리뷰 좋아요 클릭
	const onPressLike = (index, bool) => {
		// console.log('index', index, bool);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			likeEtc(
				{
					collectionName: 'communityobjects',
					post_object_id: review[index]._id,
					is_like: bool,
				},
				result => {
					console.log('result/ onPressLike / ReviewMain : ', result.msg.targetPost.community_like_count);
					updateReview(true, review[index]._id, bool);
				},
				err => console.log('err / onPressLike / ReviewMain : ', err),
			);
		}
	};

	//후기 게시글의 댓글쓰기 혹은 댓글 모두 보기 클릭 클릭
	const onPressReply = index => {
		// navigation.push('CommunityCommentList', {community_object: review[index]});
		navigation.push('ReviewDetail', {community_object: review[index], comment: true});
	};

	//후게 게시글 컨텐츠 클릭
	const onPressReviewContent = index => {
		navigation.push('ReviewDetail', {community_object: review[index]});
	};

	//리뷰 즐겨찾기 아이콘 클릭
	const onPressFavorite = (index, bool) => {
		console.log('index', index, bool);
		setFavoriteEtc(
			{
				collectionName: 'communityobjects',
				target_object_id: review[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ArticleDetail : ', result.msg.favoriteEtc);
				updateReview(false, review[index]._id, bool);
			},
			err => console.log('err / favoriteEtc / ArticleDetail : ', err),
		);
	};

	const whenEmpty = () => {
		return (
			<View style={{paddingVertical: 130 * DP, alignItems: 'center'}}>
				<EmptyIcon />
				<Text style={[txt.noto28]}>목록이 없습니다..</Text>
			</View>
		);
	};

	const header = () => {
		return (
			<View style={[style.filter]}>
				<View style={[style.filter_community_type, {alignItems: 'center'}]}>
					<TouchableOpacity
						onPress={() => setType('free')}
						style={[{paddingHorizontal: 10 * DP, paddingVertical: 10 * DP, justifyContent: 'center'}]}
						activeOpacity={0.6}>
						<Text style={[txt.noto24, {color: type == 'free' ? APRI10 : GRAY10}]}>자유글</Text>
					</TouchableOpacity>
					<Text style={[txt.noto24, {color: GRAY10}]}>{'    |    '}</Text>
					<TouchableOpacity
						onPress={() => setType('review')}
						activeOpacity={0.6}
						style={[{paddingHorizontal: 20 * DP, paddingVertical: 10 * DP, justifyContent: 'center'}]}>
						<Text style={[txt.noto24, {color: type == 'review' ? APRI10 : GRAY10}]}>리뷰</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	if (free == 'false' || review == 'false') {
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
											items={free}
											onPressArticle={onPressArticle} //게시글 내용 클릭
											whenEmpty={whenEmpty}
											onEndReached={() => {
												console.log('type at ArticleList : ', type);
												type == 'free' ? onEndReached('free') : false;
											}}
										/>
									</>
								) : (
									<>
										<ReviewList
											items={review}
											whenEmpty={whenEmpty}
											onPressReviewContent={onPressReviewContent}
											onPressReply={onPressReply}
											onPressFavorite={onPressFavorite}
											onPressLike={i => onPressLike(i, true)}
											onPressUnlike={i => onPressLike(i, false)}
											showRecommend={false}
											onEndReached={() => {
												console.log('type at REviewList', type);
												type == 'free' ? false : onEndReached('review');
											}}
										/>
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
});
CommunityList.defaultProps = {};
export default CommunityList;

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
