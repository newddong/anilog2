import React from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, Animated} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LinkedAccountList from 'Templete/list/LinkedAccountList';
import FollowerList from 'Templete/list/FollowerList';
import RecommendedAccountList from 'Templete/list/RecommendedAccountList';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {count_to_K} from 'Root/util/stringutil';
import {getFollowers, getFollows, getUserProfile} from 'Root/api/userapi';
import {useNavigation} from '@react-navigation/core';
import userGlobalObject from 'Root/config/userGlobalObject';

const SocialRelationTab = createMaterialTopTabNavigator();

export default SocialRelationTopTabNavigation = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.route.params?.userobject); //유저 프로필 데이터
	const [followers, setFollwers] = React.useState(''); // 팔로워리스트
	const [follows, setFollows] = React.useState(''); // 팔로우 리스트
	const [followerInput, setFollowerInput] = React.useState(''); // 팔로워 검색
	const [followInput, setFollowInput] = React.useState(''); // 팔로우 검색
	const tabBarItems = [count_to_K(data.user_follower_count) + ' 팔로워', count_to_K(data.user_follow_count) + ' 팔로잉', '추천'];

	//헤더 타이틀 설정 작업 및 유저 오브젝트 할당
	React.useEffect(() => {
		navigation.setOptions({title: props.route.params.userobject.user_nickname});
		fetchData();
	}, [props.route.params]);

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
		fetchFollowData();
		fetchFollowerData();
		setData(profileInfo);
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
					{
						userobject_id: props.route.params.userobject._id,
					},
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
					userobject_id: props.route.params.userobject._id,
					user_nickname: followInput,
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
					userobject_id: props.route.params.userobject._id,
					user_nickname: followerInput,
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
			initialRouteName={'FollowerList'}
			screenOptions={{
				tabBarItemStyle: {height: 70 * DP},
				tabBarIndicatorStyle: {backgroundColor: APRI10, height: 2 * DP},
				tabBarLabelStyle: [styles.tabbarLabelStyle],
				tabBarInactiveTintColor: GRAY10,
				tabBarActiveTintColor: APRI10,
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
				{props => <FollowerList {...props} followers={followers} resetProfileInfo={fetchData} onChangeSearchInput={onChangeFollower} />}
			</SocialRelationTab.Screen>
			<SocialRelationTab.Screen
				name="FollowingList"
				initialParams={{userobject: data}}
				options={{
					tabBarLabel: count_to_K(follows.length) + ' ' + '팔로잉',
				}}>
				{props => <FollowerList {...props} follows={follows} resetProfileInfo={fetchData} onChangeSearchInput={onChangeFollow} />}
			</SocialRelationTab.Screen>
			<SocialRelationTab.Screen
				name="RecommendedAccountList"
				options={{
					tabBarLabel: '추천',
				}}
				component={RecommendedAccountList}
				initialParams={{userobject: data}}
			/>
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
		fontSize: 24 * DP,
		marginTop: -20 * DP,
	},
	tabBarIndicatorStyle: {
		backgroundColor: APRI10,
		height: 70 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
});
