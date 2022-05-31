import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, BLACK, BLUE10, GRAY10, GRAY40, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import searchContext from 'Root/config/searchContext';
import {getUserListByNickname} from 'Root/api/userapi';
import {getHashKeywords} from 'Root/api/hashapi';
import SearchHashTag from 'Root/component/templete/search/SearchHashTag';
import SearchAccountA from 'Root/component/templete/search/SearchAccountA';
import SearchReview from 'Root/component/templete/search/SearchReview';
import {getSearchCommunityList} from 'Root/api/community';
import SearchArticle from 'Root/component/templete/search/SearchArticle';
import {useNavigation} from '@react-navigation/core';
import {NETWORK_ERROR} from 'Root/i18n/msg';
import Modal from 'Root/component/modal/Modal';

const SearchTabNav = createMaterialTopTabNavigator();

export default SearchTabNavigation = props => {
	// console.log('props.', props.route.params);
	// const [searchInput, setSearchInput] = React.useState('');
	const navigation = useNavigation();
	const [userList, setUserList] = React.useState('false');
	const [hashList, setHashList] = React.useState('false');
	const [commList, setCommList] = React.useState('false');
	const [loading, setLoading] = React.useState(false);

	const initial = 'ACCOUNT';

	const onClickUser = sendUserobject => {
		props.navigation.navigate('SearchTabUserProfile', {userobject: sendUserobject});
	};
	//검색탭 헤더의 인풋값이 바뀔 때마다 계정과 해쉬를 받아오는 api에 접속
	React.useEffect(() => {
		console.log('searchContext.searchInfo.searchInput', searchContext.searchInfo.searchInput);
		fetchData(); // effect Hook에서 async await 구문을 쓰기 위한 처리
		navigation.addListener('focus', () => {
			fetchData();
		});
	}, [searchContext.searchInfo.searchInput]);

	async function fetchData() {
		setLoading(true);
		if (searchContext.searchInfo.searchInput != '' && searchContext.searchInfo.searchInput.length > 1) {
			const user = await getUserList(); //계정 검색
			const hash = await getHashList(); //태그 검색
			const comm = await getCommunityList(); //커뮤니티 검색
			setUserList(user);
			setHashList(hash);
			setCommList(comm);
			setLoading(false);
		} else {
			setUserList([]);
			setHashList([]);
			setCommList({free: [], review: []});
			setLoading(false);
		}
	}

	//검색된 입력값과 일치하는 계정 리스트 받아오기
	const getUserList = async () => {
		return new Promise(async function (resolve, reject) {
			try {
				getUserListByNickname(
					{
						user_nickname: searchContext.searchInfo.searchInput,
						request_number: '',
						userobject_id: '',
						user_type: '',
					},
					result => {
						// console.log('result', result.msg.length);
						let filtered = result.msg;
						// let removeMine = result.msg.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
						// removeMine == -1 ? false : filtered.splice(removeMine, 1); // 자기 계정은 출력 안되도록
						resolve(filtered);
					},
					err => {
						console.log('err /getUserListByNickname /  ', err);
						if (err == '검색 결과가 없습니다.') {
							resolve([]);
						} else if (err.includes('code 500')) {
							Modal.popNetworkErrorModal('네트워크 오류가 발생했습니다. \n 잠시후 다시 시도해주세요.');
						}
					},
				);
			} catch (error) {
				console.log('error getRoadAddr  :  ', error.message);
			}
		});
	};

	const getHashList = async () => {
		return new Promise(async function (resolve, reject) {
			try {
				getHashKeywords(
					{
						hashtag_keyword: searchContext.searchInfo.searchInput,
					},
					result => {
						// console.log('hash editing', result.msg.length);
						resolve(result.msg);
					},
					err => {
						console.log(err);
						if (err == '검색 결과가 없습니다.') {
							resolve([]);
						} else if (err.includes('code 500')) {
							Modal.popNetworkErrorModal('네트워크 오류가 발생했습니다. \n 잠시후 다시 시도해주세요.');
						}
					},
				);
			} catch (error) {
				console.log('error getHashList  :  ', error.message);
			}
		});
	};

	const getCommunityList = async () => {
		return new Promise(async function (resolve, reject) {
			try {
				getSearchCommunityList(
					{
						searchKeyword: searchContext.searchInfo.searchInput,
					},
					result => {
						// console.log('searchContext.searchInfo.searchInput', searchContext.searchInfo.searchInput);
						// console.log('result / getSearchCommunityList / SearchTabNav : ', result.msg.review);
						let res = result.msg;
						const noneDeletedReview = result.msg.review.filter(e => e.community_is_delete != true);
						const noneDeletedArticle = result.msg.free.filter(e => e.community_is_delete != true);
						res.free = noneDeletedArticle;
						res.review = noneDeletedReview;
						resolve(res);
					},
					err => {
						console.log('err / getSearchCommunityList / SearchTabNav : ', err);
						if (err.includes('code 500')) {
							resolve({free: [], review: []});
							setTimeout(() => {
								Modal.popNetworkErrorModal('네트워크 오류가 발생했습니다. \n 잠시후 다시 시도해주세요.');
							}, 500);
						} else if (err.includes('없습니다')) {
							resolve({free: [], review: []});
						}
					},
				);
			} catch (error) {
				console.log('error getHashList  :  ', error.message);
			}
		});
	};

	const resetCommunityList = async () => {
		const comm = await getCommunityList(); //커뮤니티 검색
		setCommList(comm);
	};

	const searchTabLabelOption = {
		tabBarActiveTintColor: WHITE,
		tabBarLabelStyle: [styles.tabbarLabelStyle],
		tabBarPressColor: WHITE,
		tabBarActiveTintColor: BLACK,
		tabBarInactiveTintColor: GRAY10,
	};

	return (
		<SearchTabNav.Navigator
			screenOptions={{
				tabBarItemStyle: {height: 78 * DP},
				tabBarStyle: {
					borderBottomWidth: 2 * DP,
					borderTopWidth: 2 * DP,
					borderTopColor: GRAY40,
					borderBottomColor: GRAY40,
					elevation: 0,
				},
				tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
				lazy: true,
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			initialRouteName={initial}>
			<SearchTabNav.Screen
				name="ACCOUNT"
				options={{
					title: '계정',
					...searchTabLabelOption,
				}}>
				{props => <SearchAccountA {...props} onClickUser={onClickUser} prevNav={props.prevNav} data={userList} loading={loading} />}
			</SearchTabNav.Screen>
			<SearchTabNav.Screen
				name="HASHTAG"
				// component={Temp}
				options={{
					title: '태그',
					...searchTabLabelOption,
				}}>
				{props => <SearchHashTag {...props} data={hashList} loading={loading} />}
			</SearchTabNav.Screen>
			<SearchTabNav.Screen
				name="ARTICLE"
				options={{
					title: '자유글',
					...searchTabLabelOption,
				}}>
				{props => <SearchArticle {...props} data={commList} loading={loading} />}
			</SearchTabNav.Screen>
			<SearchTabNav.Screen
				name="REVIEW"
				options={{
					title: '리뷰',
					...searchTabLabelOption,
				}}>
				{props => <SearchReview {...props} data={commList} loading={loading} resetCommunityList={resetCommunityList} />}
			</SearchTabNav.Screen>
		</SearchTabNav.Navigator>
	);
};

const styles = StyleSheet.create({
	tabbarLabelStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		marginTop: -10 * DP,
		// color: GRAY10,
	},
	tabBarIndicatorStyle: {
		backgroundColor: WHITE,
		borderBottomColor: BLACK,
		borderBottomWidth: 6 * DP,
		height: 78 * DP,
	},
});
