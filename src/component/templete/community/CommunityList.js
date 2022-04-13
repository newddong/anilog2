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
import {updateAndDeleteCommunity} from 'Root/api/community';
import community_obj from 'Root/config/community_obj';
import {favoriteEtc} from 'Root/api/favoriteetc';
import {EmptyIcon} from 'Root/component/atom/icon';
import {likeEtc} from 'Root/api/likeetc';

/**
 *  프로필탭 커뮤니티 글 출력용 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressArticle - 내용 클릭
 * @param {string} props.isSearch - 검색어
 */
const CommunityList = React.memo(props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false' || {review: [], free: []});
	const [type, setType] = React.useState('free');

	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	//자유 게시글 아이템 클릭
	const onPressArticle = index => {
		// navigation.navigate('COMMUNITY', {screen: 'ArticleDetail', params: {community_object: data.free[index]}});
		community_obj.object = data.free[index];
		community_obj.pageToMove = 'ArticleDetail';
		community_obj.initial = false;
		console.log('community_obj.current', community_obj.current);
		if (community_obj.current == '') {
			navigation.navigate('COMMUNITY', {
				screen: 'ArticleMain',
				initial: false,
				params: {community_object: data.free[index], pageToMove: 'ArticleDetail'},
			});
		} else {
			navigation.navigate('COMMUNITY', {
				screen: 'ArticleDetail',
				initial: false,
				params: {community_object: data.free[index], reset: true},
			});
		}
	};

	//리뷰 좋아요 클릭
	const onPressLike = (index, bool) => {
		// console.log('index', index, bool);
		likeEtc(
			{
				collectionName: 'communityobjects',
				post_object_id: data.review[index]._id,
				is_like: bool,
			},
			result => {
				console.log('result/ onPressLike / ReviewMain : ', result.msg.targetPost.community_like_count);
				props.initializeCommList();
			},
			err => console.log('err / onPressLike / ReviewMain : ', err),
		);
	};

	//후기 게시글의 댓글쓰기 혹은 댓글 모두 보기 클릭 클릭
	const onPressReply = index => {
		// navigation.navigate('COMMUNITY', {screen: 'CommunityCommentList', params: {community_object: data.review[index]}});
		community_obj.object = data.review[index];
		community_obj.pageToMove = 'CommunityCommentList';
		community_obj.initial = false;
		console.log('community_obj.current', community_obj.current);
		if (community_obj.current == '') {
			//탭 간의 이동을 간편히 하기 위해 만든 community_obj의 current 값이 빈값 == 현재 쌓여있는 화면이 없음
			//우선 ArticleMain의 스택을 쌓기 위해 ArticleMain으로 먼저 보낸 뒤 바로 이동되어야 할 상세 자유 게시글을 여기서 선언 => Parameter로 보냄
			navigation.navigate('COMMUNITY', {
				screen: 'ArticleMain',
				initial: false,
				params: {community_object: data.review[index], pageToMove: 'CommunityCommentList'},
			});
		} else {
			//이미 보고 있는 ArticleDetail이 존재하므로 ArticleDetail 템플릿을 덮어씌우고 봐야할 상세 자유 게시글은 Parameter로 송신
			navigation.navigate('COMMUNITY', {
				screen: 'CommunityCommentList',
				initial: false,
				params: {community_object: data.review[index], reset: true},
			});
		}
	};

	//후게 게시글 컨텐츠 클릭
	const onPressReviewContent = index => {
		// navigation.navigate('COMMUNITY', {screen: 'ReviewDetail', params: {community_object: data.review[index]}});
		community_obj.object = data.review[index];
		community_obj.pageToMove = 'ReviewDetail';
		community_obj.initial = false;
		console.log('community_obj.current', community_obj.current);
		if (community_obj.current == '') {
			//탭 간의 이동을 간편히 하기 위해 만든 community_obj의 current 값이 빈값 == 현재 보고 있는 ArticleDetail이 없음
			//우선 ArticleMain의 스택을 쌓기 위해 ArticleMain으로 먼저 보낸 뒤 바로 이동되어야 할 상세 자유 게시글을 여기서 선언 => Parameter로 보냄
			navigation.navigate('COMMUNITY', {
				screen: 'ReviewMain',
				initial: false,
				params: {community_object: data.review[index], pageToMove: 'ReviewDetail'},
			});
		} else {
			//이미 보고 있는 ArticleDetail이 존재하므로 ArticleDetail 템플릿을 덮어씌우고 봐야할 상세 자유 게시글은 Parameter로 송신
			navigation.navigate('COMMUNITY', {
				screen: 'ReviewDetail',
				initial: false,
				params: {community_object: data.review[index], reset: true},
			});
		}
	};

	//리뷰 즐겨찾기 아이콘 클릭
	const onPressFavorite = (index, bool) => {
		console.log('index', index, bool);
		favoriteEtc(
			{
				collectionName: 'communityobjects',
				post_object_id: data.review[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ArticleDetail : ', result.msg.favoriteEtc.favorite_etc_is_delete);
			},
			err => console.log('err / favoriteEtc / ArticleDetail : ', err),
		);
	};

	//리뷰 미트볼 클릭
	const onPressMeatball = index => {
		console.log('index', index);
		const isMyArticle = userGlobalObject.userInfo._id == data.review[index].community_writer_id._id;
		Modal.popSelectBoxModal(
			isMyArticle ? ['수정', '삭제'] : ['신고'],
			select => {
				switch (select) {
					case '수정':
						// navigation.push('CommunityEdit', {previous: reviewList[index], isReview: true});
						navigation.navigate('COMMUNITY', {screen: 'CommunityEdit', params: {previous: data.review[index], isReview: true}});
						break;
					case '삭제':
						Modal.close();
						setTimeout(() => {
							Modal.popTwoBtn(
								'정말로 이 게시글을 \n 삭제하시겠습니까?',
								'아니오',
								'네',
								() => Modal.close(),
								() => {
									updateAndDeleteCommunity(
										{
											community_object_id: data.review[index]._id,
											community_is_delete: true,
										},
										result => {
											// console.log('result / updateAndDeleteCommunity / ArticleDetail : ', result.msg);
											Modal.close();
											setTimeout(() => {
												Modal.popNoBtn('게시글 삭제가 완료되었습니다.');
												setTimeout(() => {
													Modal.close();
													props.initializeCommList();
												}, 600);
											}, 200);
										},
										err => {
											console.log('err / updateAndDeleteCommunity / ArticleDetail : ', err);
											Modal.alert(err);
										},
									);
								},
							);
						}, 200);
						break;
					case '신고':
						break;
					default:
						break;
				}
			},
			() => Modal.close(),
			false,
			false,
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
	if (data == 'false') {
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
											items={data.free}
											onPressArticle={onPressArticle} //게시글 내용 클릭
											whenEmpty={whenEmpty}
										/>
									</>
								) : (
									<>
										<ReviewList
											items={data.review}
											whenEmpty={whenEmpty}
											onPressReviewContent={onPressReviewContent}
											onPressReply={onPressReply}
											onPressMeatball={onPressMeatball}
											onPressFavorite={onPressFavorite}
											onPressLike={i => onPressLike(i, true)}
											onPressUnlike={i => onPressLike(i, false)}
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