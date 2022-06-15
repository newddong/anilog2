import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FollowerList from 'Templete/list/FollowerList';
import RecommendedAccountList from 'Templete/list/RecommendedAccountList';
import DP from 'Root/config/dp';
import {APRI10, BLACK, GRAY10, GRAY40, WHITE} from 'Root/config/color';
import {count_to_K} from 'Root/util/stringutil';
import {getFollowers, getFollows, getUserProfile} from 'Root/api/userapi';
import {useNavigation} from '@react-navigation/core';
import searchContext from 'Root/config/searchContext';

const SocialRelationTab = createMaterialTopTabNavigator();

export default SocialRelationTopTabNavigation = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); //유저 프로필 데이터
	const [followers, setFollwers] = React.useState([]); // 팔로워리스트
	const [follows, setFollows] = React.useState([]); // 팔로우 리스트
	const [followerInput, setFollowerInput] = React.useState(''); // 팔로워 검색
	const [followInput, setFollowInput] = React.useState(''); // 팔로우 검색
	const [loading, setLoading] = React.useState(true);
	const params = props.route.params;
	const initial = params.initial != undefined ? params.initial : 'FollowerList';
	// console.log('type', data.user_type);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('blur', () => {
			searchContext.searchInfo.searchInputForSocial = '';
		});
		return unsubscribe;
	}, []);

	//헤더 타이틀 설정 작업 및 유저 오브젝트 할당
	React.useEffect(() => {
		navigation.setOptions({title: params.userobject.user_nickname});
		fetchData();
	}, [params]);

	React.useEffect(() => {
		//입력마다 api 접속하는 것이 아닌 타이핑 이후 500ms 주어 타이핑이 종료되었을 때 검색을 실시하도록 timeOut 설정
		setTimeout(() => {
			fetchFollowerData();
		}, 500);
	}, [followerInput]);

	React.useEffect(() => {
		//입력마다 api 접속하는 것이 아닌 타이핑 이후 500ms 주어 타이핑이 종료되었을 때 검색을 실시하도록 timeOut 설정
		setTimeout(() => {
			fetchFollowData();
		}, 500);
	}, [followInput]);

	const fetchData = async () => {
		const profileInfo = await getProfileInfo();
		const followList = await getFollow();
		const followerList = await getFollower();
		setData(profileInfo);
		setFollows(followList);
		setFollwers(followerList);
		setLoading(false);
	};

	const fetchFollowData = async () => {
		const followList = await getFollow();
		setFollows(followList);
	};

	const fetchFollowerData = async () => {
		const followerList = await getFollower();
		setFollwers(followerList);
	};

	//해당 유저의 프로필 정보 갱신을 위한 api 접속
	const getProfileInfo = async () => {
		return new Promise(async function (resolve, reject) {
			try {
				getUserProfile(
					{userobject_id: params.userobject._id},
					result => {
						resolve(result.msg);
						// console.log('is_follow', result.msg.is_follow);
					},
					err => {
						console.log('err / getUserProfile / SocailRelationTab', err);
					},
				);
			} catch (error) {
				console.log('error getRoadAddr  :  ', error.message);
				Modal.close(); //오류발생 시 로딩 모달 종료
			}
		});
	};

	//팔로잉 목록 받아오기
	const getFollow = async () => {
		return new Promise(async function (resolve, reject) {
			getFollows(
				{
					userobject_id: params.userobject._id,
					// user_nickname: followInput,
					user_nickname: searchContext.searchInfo.searchInputForSocial,
				},
				result => {
					// console.log('result / getFollows / ', result.msg.length);
					let filtered = result.msg;
					filtered.map((v, i) => {
						v.follower_id = {...v.follower_id, follow: v.follow};
					});
					// setFollows(filtered.map(v => v.follower_id));
					resolve(filtered.map(v => v.follower_id));
				},
				err => {
					console.log('getFollows / error / FollwerList : ', err);
					resolve([]);
				},
			);
		});
	};

	//팔로워 목록 받아오기
	const getFollower = async text => {
		return new Promise(async function (resolve, reject) {
			getFollowers(
				{
					userobject_id: params.userobject._id,
					user_nickname: followerInput,
					user_nickname: searchContext.searchInfo.searchInputForSocial,
				},
				result => {
					// console.log('result / getFollowers / ', result.msg[0]);
					let filtered = result.msg;
					filtered.map((v, i) => {
						v.follow_id = {...v.follow_id, follow: v.follow};
					});
					resolve(filtered.map(v => v.follow_id));
				},
				err => {
					console.log('getFollowers / error / FollwerList : ', err);
					resolve([]);
				},
			);
		});
	};

	//팔로워 목록 검색 텍스트 변경 콜백
	const onChangeFollower = text => {
		setFollowerInput(text);
	};

	//팔로우 목록 검색 텍스트 변경 콜백
	const onChangeFollow = text => {
		setFollowInput(text);
	};

	return (
		<SocialRelationTab.Navigator
			initialRouteName={initial}
			screenOptions={{
				tabBarItemStyle: {height: 78 * DP},
				tabBarIndicatorStyle: {backgroundColor: params.userobject.user_type == 'pet' ? WHITE : BLACK, height: 6 * DP},
				tabBarLabelStyle: [styles.tabbarLabelStyle],
				tabBarInactiveTintColor: GRAY10,
				tabBarActiveTintColor: BLACK,
				tabBarStyle: {
					borderBottomWidth: 2 * DP,
					borderTopColor: GRAY40,
					borderBottomColor: GRAY40,
					elevation: 0,
					height: params.userobject.user_type == 'pet' ? 0 : 78 * DP,
				},
			}}
			initialLayout={{width: Dimensions.get('window').width}}
			optimizationsEnabled={true}>
			{/* <SocialRelationTab.Screen name="LinkedAccountList" component={LinkedAccountList} initialParams={{userobject: data}} /> */}
			<SocialRelationTab.Screen
				name="FollowerList"
				initialParams={{userobject: data}}
				options={{
					tabBarLabel: count_to_K(followers.length) + ' ' + '팔로워',
				}}>
				{props => (
					<FollowerList {...props} followers={followers} resetProfileInfo={fetchData} onChangeSearchInput={onChangeFollower} loading={loading} />
				)}
			</SocialRelationTab.Screen>
			{params.userobject.user_type != 'pet' ? (
				<SocialRelationTab.Screen
					name="FollowingList"
					initialParams={{userobject: data}}
					options={{tabBarLabel: count_to_K(follows.length) + ' ' + '팔로잉'}}>
					{props => <FollowerList {...props} follows={follows} resetProfileInfo={fetchData} onChangeSearchInput={onChangeFollow} loading={loading} />}
				</SocialRelationTab.Screen>
			) : (
				<></>
			)}

			{/* <SocialRelationTab.Screen
				name="RecommendedAccountList"
				options={{
					tabBarLabel: '추천',
				}}
				component={RecommendedAccountList}
				initialParams={{userobject: data}}
			/> */}
		</SocialRelationTab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabContainer: {
		flexDirection: 'row',
		backgroundColor: WHITE,
		alignItems: 'center',
		paddingHorizontal: 48 * DP,
	},
	tabbarItemStyle: {
		height: 70 * DP,
	},
	tabbarItem: {
		height: 70 * DP,
		width: '33%',
		marginRight: 10 * DP,
		justifyContent: 'center',
		borderBottomWidth: 4 * DP,
	},
	tabBarIndicatorStyle: {
		backgroundColor: WHITE,
		height: 70 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
		color: APRI10,
	},

	tabbarLabelStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		marginTop: -20 * DP,
	},
	tabBarIndicatorStyle: {
		backgroundColor: APRI10,
		height: 70 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
});
