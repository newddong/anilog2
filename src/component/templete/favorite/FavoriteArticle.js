import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {styles} from 'Root/component/atom/image/imageStyle';
import community_obj from 'Root/config/community_obj';
import {getFavoriteEtcListByUserId} from 'Root/api/favoriteetc';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import {EmptyIcon} from 'Root/component/atom/icon';
import {getCommunityListByUserId} from 'Root/api/community';

//즐겨찾기한 커뮤니티 조회
export default FavoriteArticle = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
		});
		// fetchData();
		return unsubscribe;
	}, []);

	const fetchData = () => {
		route.name == 'MyArticle'
			? getCommunityListByUserId(
					{
						userobject_id: userGlobalObject.userInfo._id,
						community_type: 'all',
					},
					result => {
						console.log('result / getCommunityListByUserId / FavoriteCommunity', result.msg.free.length);
						setData(result.msg.free);
					},
					err => {
						console.log('err / getCommunityListByUserId / FavoriteCommunity : ', err);
						setReview([]);
						setArticle([]);
					},
			  )
			: getFavoriteEtcListByUserId(
					{
						userobject_id: userGlobalObject.userInfo._id,
						collectionName: 'communityobjects',
					},
					result => {
						// console.log('result / getFavoriteEtcListByUserId / FavoriteCommunity : ', result.msg[0]);
						let articleList = [];
						result.msg.map(v => {
							if (v.favorite_etc_target_object_id.community_type == 'free') {
								v.favorite_etc_target_object_id.community_is_like = v.is_like;
								v.favorite_etc_target_object_id.community_is_favorite = v.is_favorite;
								articleList.push(v.favorite_etc_target_object_id);
							}
						});
						setData(articleList);
					},
					err => {
						console.log('err / getFavoriteEtcListByUserId / FavoriteCommunity : ', err);
						setData([]);
					},
			  );
	};

	// 게시글 내용 클릭
	const onPressArticle = index => {
		community_obj.object = data[index];
		community_obj.pageToMove = 'ArticleDetail';
		community_obj.initial = false;
		console.log('community_obj.current', community_obj.current);
		if (community_obj.current == '') {
			//탭 간의 이동을 간편히 하기 위해 만든 community_obj의 current 값이 빈값 == 현재 보고 있는 ArticleDetail이 없음
			//우선 ArticleMain의 스택을 쌓기 위해 ArticleMain으로 먼저 보낸 뒤 바로 이동되어야 할 상세 자유 게시글을 여기서 선언 => Parameter로 보냄
			navigation.navigate('COMMUNITY', {screen: 'ArticleMain', initial: false, params: {community_object: data[index], pageToMove: 'ArticleDetail'}});
		} else {
			//이미 보고 있는 ArticleDetail이 존재하므로 ArticleDetail 템플릿을 덮어씌우고 봐야할 상세 자유 게시글은 Parameter로 송신
			navigation.navigate('COMMUNITY', {
				screen: 'ArticleDetail',
				initial: false,
				params: {community_object: data[index], reset: true},
			});
		}
	};

	const whenEmpty = () => {
		return (
			<View style={{paddingVertical: 150 * DP, alignItems: 'center'}}>
				<EmptyIcon />
				<Text style={[txt.noto28, {marginTop: 10 * DP}]}>
					{route.name == 'MyArticle' ? '작성한 자유게시글이 없습니다..' : '즐겨찾기한 자유게시글이 없습니다..'}{' '}
				</Text>
			</View>
		);
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				{route.name == 'MyArticle' ? (
					<></>
				) : (
					<View style={[style.header]}>
						<Text style={[txt.noto24]}>직접 책갈피 표시를 선택해 즐겨찾기를 해제할 수 있습니다.</Text>
					</View>
				)}
				<View style={{paddingVertical: 20 * DP}}>
					<ArticleList
						items={data}
						onPressArticle={onPressArticle} //게시글 내용 클릭
						whenEmpty={whenEmpty}
					/>
				</View>
			</View>
		);
};

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
	},
	header: {
		width: 654 * DP,
		marginTop: 10 * DP,
		marginBottom: 30 * DP,
		alignItems: 'flex-end',
	},
});
