import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchAccountA from 'Root/component/templete/search/SearchAccountA';
import SearchFeed from 'Root/component/templete/search/SearchFeed';
import SearchHashTag from 'Root/component/templete/search/SearchHashTag';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import searchContext from 'Root/config/searchContext';
import {getUserListByNickname} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {getHashKeywords} from 'Root/api/hashapi';

const SearchFeedTabNav = createMaterialTopTabNavigator();

export default SearchFeedTabNavigation = props => {
	const [userList, setUserList] = React.useState('false');
	const [hashList, setHashList] = React.useState('false');
	const [loading, setLoading] = React.useState(false);

	const onClickUser = sendUserobject => {
		props.onClickUser(sendUserobject);
	};

	// searchContext.searchInfo.routeName = getFocusedRouteNameFromRoute(props.route); //현재 보고 있는 템플릿

	//검색탭 헤더의 인풋값이 바뀔 때마다 계정과 해쉬를 받아오는 api에 접속
	React.useEffect(() => {
		async function fetchData() {
			setLoading(true);
			if (searchContext.searchInfo.searchInput != '') {
				const user = await getUserList();
				const hash = await getHashList();
				setUserList(user);
				setHashList(hash);
				setLoading(false);
			} else {
				setUserList([]);
				setHashList([]);
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

	return (
		<SearchFeedTabNav.Navigator
			initialRouteName="SearchAccountA"
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarLabelStyle: [txt.noto24, {color: GRAY10, textAlignVertical: 'center', marginTop: -20 * DP}],
				tabBarIndicatorStyle: {backgroundColor: APRI10},
			}}>
			<SearchFeedTabNav.Screen name="SearchFeed" options={{title: '게시글'}}>
				{props => <SearchFeed {...props} prevNav={props.prevNav} />}
			</SearchFeedTabNav.Screen>
			<SearchFeedTabNav.Screen name="SearchAccountA" options={{title: '계정'}}>
				{props => <SearchAccountA {...props} prevNav={props.prevNav} data={userList} loading={loading} onClickUser={onClickUser} />}
			</SearchFeedTabNav.Screen>
			<SearchFeedTabNav.Screen name="SearchHashTag" options={{title: '해쉬태그'}}>
				{props => <SearchHashTag {...props} data={hashList} loading={loading} />}
			</SearchFeedTabNav.Screen>
		</SearchFeedTabNav.Navigator>
	);
};
