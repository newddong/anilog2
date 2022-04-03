import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity} from 'react-native';
import {APRI10, BLACK, GRAY10} from 'Root/config/color';
import {Animal_another_off, Animal_cat_off, Animal_dog_off, Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import {getCommunityList} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';
import {styles} from 'Root/component/atom/image/imageStyle';
import {txt} from 'Root/config/textstyle';
import ArticleList from 'Root/component/organism/list/ArticleList';
import searchContext from 'Root/config/searchContext';

export default SearchCommunity = ({route, navigation}) => {
	const [data, setData] = React.useState({
		free: 'false',
		review: 'false',
	});
	const [searchInput, setSearchInput] = React.useState('');
	const [reviewList, setReviewList] = React.useState('false');
	const [articleList, setArticleList] = React.useState('false');
	const [isFilter, setIsFilter] = React.useState(false);
	const [type, setType] = React.useState('free');

	React.useEffect(() => {
		fetchData();
	}, []);

	//검색탭 헤더의 인풋값이 바뀔 때마다 계정과 해쉬를 받아오는 api에 접속
	React.useEffect(() => {
		setSearchInput(searchContext.searchInfo.searchInput);
	}, [searchContext.searchInfo.searchInput]);

	const fetchData = arg => {
		getCommunityList(
			{
				community_type: 'all', //required
			},
			result => {
				// console.log('result / getCommunityList / ArticleMain :', arg, result.msg);
				setArticleList(result.msg.free);
				setReviewList(result.msg.review);
			},
			err => {
				console.log('err / getCommunityList / ArticleMain : ', err);
			},
		);
	};

	const [filterData, setFilterData] = React.useState({
		dog: false,
		cat: false,
		etc: false,
		filter: {
			location: {
				city: '',
				district: '',
			},
			category: [],
		},
	});

	const onPressFilter = () => {
		setIsFilter(true);
		Modal.popInterestTagModal(
			'Review',
			{interests_etc: [], interests_hospital: [], interests_interior: [], interests_review: [], interests_trip: []},
			() => Modal.close(),
			() => {
				setIsFilter(false);
				Modal.close();
			},
			arg => {
				console.log('arg', arg);
				const userInterestObj = arg.userInterestReview;
				let arr = [];
				const selectedCategoryFilter = arr.concat(
					userInterestObj.interests_review,
					userInterestObj.interests_trip,
					userInterestObj.interests_etc,
					userInterestObj.interests_hospital,
					userInterestObj.interests_interior,
				);
				const isCategoryNotSelected = selectedCategoryFilter.length == 0;
				const isLocationNotSelected = userInterestObj.interests_location.city == '';
				console.log('isCategoryNotSelected', isCategoryNotSelected);
				console.log('isLocationNotSelected', isLocationNotSelected);
				isLocationNotSelected && isCategoryNotSelected ? setIsFilter(false) : false;
			},
		);
	};

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
			<>
				<Image
					style={[styles.img_square_246, {marginTop: 150 * DP}]}
					resizeMode={'stretch'}
					source={{
						uri: 'https://st.depositphotos.com/21121724/53932/v/600/depositphotos_539322694-stock-illustration-cartoon-home-pets-empty-feeder.jpg',
					}}
				/>
				<Text style={[txt.roboto36b]}>목록이 없네요.</Text>
			</>
		);
	};

	const header = () => {
		return (
			<View style={[style.filter]}>
				<View style={[style.shadow_filter]}>
					{isFilter ? <Filter60Filled onPress={() => setIsFilter(false)} /> : <Filter60Border onPress={onPressFilter} />}
				</View>
				<View style={[style.filter_community_type]}>
					<TouchableOpacity onPress={() => setType('free')} style={[{paddingHorizontal: 10 * DP}]} activeOpacity={0.6}>
						<Text style={[txt.noto24, {color: type == 'free' ? APRI10 : GRAY10}]}>자유글</Text>
					</TouchableOpacity>
					<Text style={[txt.noto24, {color: GRAY10}]}>{'    |    '}</Text>
					<TouchableOpacity onPress={() => setType('review')} activeOpacity={0.6} style={[{paddingHorizontal: 10 * DP}]}>
						<Text style={[txt.noto24, {color: type == 'review' ? APRI10 : GRAY10}]}>후기</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			{header()}
			{articleList == 'false' || reviewList == 'false' ? (
				<Loading isModal={false} />
			) : (
				<FlatList
					data={[{}]}
					renderItem={({item, index}) => {
						return (
							<View style={[style.listContainer]}>
								{type == 'free' ? (
									<>
										<ArticleList
											items={articleList}
											isSearch={searchInput}
											onPressArticle={onPressArticle} //게시글 내용 클릭
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
			)}
		</View>
	);
};
SearchCommunity.defaultProps = {};

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
		justifyContent: 'space-between',
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
