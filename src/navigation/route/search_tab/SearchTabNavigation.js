import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, StyleSheet} from 'react-native';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import searchContext from 'Root/config/searchContext';
import {getUserListByNickname} from 'Root/api/userapi';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import userGlobalObject from 'Root/config/userGlobalObject';
import {getHashKeywords} from 'Root/api/hashapi';
import SearchHashTag from 'Root/component/templete/search/SearchHashTag';
import SearchAccountA from 'Root/component/templete/search/SearchAccountA';
import SearchReview from 'Root/component/templete/search/SearchReview';
import {getSearchCommunityList} from 'Root/api/community';
import SearchArticle from 'Root/component/templete/search/SearchArticle';

const SearchTabNav = createMaterialTopTabNavigator();

export default SearchTabNavigation = props => {
	// navigation.push('Search', {mother: 0, child: 1});
	// ㄴ 위와 같이 호출할 경우 mother는 상위TopTab의 Tab인덱스를, child는 하단TopTab의 인덱스를 설정해줄 수 있음.
	const prevNav = props.prevNav;
	// const [searchInput, setSearchInput] = React.useState('');
	const [userList, setUserList] = React.useState('false');
	const [hashList, setHashList] = React.useState('false');
	const [commList, setCommList] = React.useState('false');
	const [loading, setLoading] = React.useState(false);
	const onClickUser = sendUserobject => {
		props.navigation.navigate('SearchTabUserProfile', {userobject: sendUserobject});
	};

	const searchTabLabelOption = {
		tabBarActiveTintColor: 'white',
		tabBarLabelStyle: [styles.tabbarLabelStyle],
		tabBarInactiveTintColor: GRAY10,
		tabBarPressColor: WHITE,
	};

	// searchContext.searchInfo.routeName = getFocusedRouteNameFromRoute(props.route); //현재 보고 있는 템플릿

	//검색탭 헤더의 인풋값이 바뀔 때마다 계정과 해쉬를 받아오는 api에 접속
	React.useEffect(() => {
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
		fetchData(); // effect Hook에서 async await 구문을 쓰기 위한 처리
	}, [searchContext.searchInfo.searchInput]);

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
						let removeMine = result.msg.findIndex(e => e.user_nickname == userGlobalObject.userInfo.user_nickname);
						removeMine == -1 ? false : filtered.splice(removeMine, 1); // 자기 계정은 출력 안되도록
						resolve(filtered);
					},
					err => {
						console.log('err /getUserListByNickname /  ', err);
						if (err == '검색 결과가 없습니다.') {
							resolve([]);
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
					error => {
						console.log(error);
						if (error == '검색 결과가 없습니다.') {
							resolve([]);
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
						console.log('searchContext.searchInfo.searchInput', searchContext.searchInfo.searchInput);
						// console.log('result / getSearchCommunityList / SearchTabNav : ', result.msg.review);
						resolve(result.msg);
					},
					err => {
						console.log('err / getSearchCommunityList / SearchTabNav : ', err);
						if (err == '검색 결과가 없습니다.') {
							resolve({free: [], review: []});
						}
					},
				);
			} catch (error) {
				console.log('error getHashList  :  ', error.message);
			}
		});
	};

	return (
		<SearchTabNav.Navigator
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
				lazy: true,
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			initialRouteName={'FEED'}
			optimizationsEnabled={true}>
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
				{props => <SearchReview {...props} data={commList} loading={loading} />}
			</SearchTabNav.Screen>
		</SearchTabNav.Navigator>
	);
};

const styles = StyleSheet.create({
	tabbarLabelStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		marginTop: -20 * DP,
	},
	tabBarIndicatorStyle: {
		backgroundColor: APRI10,
		height: 70 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
});
