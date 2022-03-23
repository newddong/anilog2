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
	const [followers, setFollwers] = React.useState('false'); // 팔로워리스트
	const [follows, setFollows] = React.useState('false'); // 팔로우 리스트
	const [followerInput, setFollowerInput] = React.useState('');
	const [followInput, setFollowInput] = React.useState('');
	const tabBarItems = [count_to_K(data.user_follower_count) + ' 팔로워', count_to_K(data.user_follow_count) + ' 팔로잉', '추천'];

	// console.log('data', data.user_nickname);

	//헤더 타이틀 설정 작업 및 유저 오브젝트 할당
	React.useEffect(() => {
		fetchData();
	}, [props.route.params]);

	React.useEffect(() => {
		//입력마다 api 접속하는 것이 아닌 타이핑 이후 500ms 주어 타이핑이 종료되었을 때 검색을 실시하도록 timeOut 설정
		setTimeout(() => {
			Modal.popLoading();
			fetchFollowerData();
		}, 500);
	}, [followerInput]);

	React.useEffect(() => {
		//입력마다 api 접속하는 것이 아닌 타이핑 이후 500ms 주어 타이핑이 종료되었을 때 검색을 실시하도록 timeOut 설정
		setTimeout(() => {
			Modal.popLoading();
			fetchFollowData();
		}, 500);
	}, [followInput]);

	const fetchData = async () => {
		const profileInfo = await getProfileInfo();
		// console.log('SocialRelation Info', profileInfo);
		fetchFollowData();
		fetchFollowerData();
		setData(profileInfo);
	};

	const fetchFollowData = async () => {
		const followList = await getFollow();
		// console.log('followList', followList);
		setFollows(followList);
	};

	const fetchFollowerData = async () => {
		const followerList = await getFollower();
		// console.log('followerList', followerList);
		setFollwers(followerList);
	};

	const getProfileInfo = async () => {
		return new Promise(async function (resolve, reject) {
			try {
				getUserProfile(
					{
						userobject_id: props.route.params.userobject._id,
					},
					result => {
						navigation.setOptions({title: props.route.params.userobject.user_nickname});
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

	const getFollow = async () => {
		return new Promise(async function (resolve, reject) {
			getFollows(
				{
					userobject_id: props.route.params.userobject._id,
					user_nickname: followInput,
				},
				result => {
					console.log('result / getFollows / ', result.msg.length);
					let filtered = result.msg;
					filtered.map((v, i) => {
						v.follower_id = {...v.follower_id, follow: v.follow};
					});
					// setFollows(filtered.map(v => v.follower_id));
					resolve(filtered.map(v => v.follower_id));
					Modal.close();
				},
				err => {
					console.log('getFollows / error / FollwerList : ', err);
					Modal.close();
				},
			);
		});
	};

	const getFollower = async text => {
		return new Promise(async function (resolve, reject) {
			getFollowers(
				{
					userobject_id: props.route.params.userobject._id,
					user_nickname: followerInput,
				},
				result => {
					console.log('result / getFollowers / ', result.msg[0]);
					let filtered = result.msg;
					filtered.map((v, i) => {
						v.follow_id = {...v.follow_id, follow: v.follow};
					});
					resolve(filtered.map(v => v.follow_id));
					Modal.close();
				},
				err => {
					console.log('getFollowers / error / FollwerList : ', err);
					Modal.close();
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

	function MyTabBar({state, descriptors, navigation, position}) {
		return (
			<View style={[styles.tabContainer]}>
				{state.routes.map((route, index) => {
					const {options} = descriptors[route.key];
					const isFocused = state.index === index;
					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});
						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate({name: route.name, merge: true});
						}
					};

					return (
						<TouchableOpacity
							key={index}
							accessibilityRole="button"
							accessibilityState={isFocused ? {selected: true} : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							style={{
								height: 70 * DP,
								width: '33%',
								marginRight: 10 * DP,
								justifyContent: 'center',
								borderBottomColor: isFocused ? APRI10 : WHITE,
								borderBottomWidth: 4 * DP,
							}}>
							<Text
								numberOfLines={1}
								style={[
									txt.noto24,
									{
										fontSize: 24 * DP,
										fontWeight: isFocused ? 'bold' : 'normal',
										color: isFocused ? APRI10 : GRAY10,
										textAlign: 'center',
									},
								]}>
								{tabBarItems[index]}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
	if (followers == 'false' || follows == 'false') {
		<></>;
	}
	return (
		<SocialRelationTab.Navigator
			initialRouteName={'FollowerList'}
			initialLayout={{width: Dimensions.get('window').width}}
			tabBar={props => <MyTabBar {...props} />}
			screenOptions={{
				lazy: true,
			}}>
			{/* <SocialRelationTab.Screen name="LinkedAccountList" component={LinkedAccountList} initialParams={{userobject: data}} /> */}
			<SocialRelationTab.Screen name="FollowerList" initialParams={{userobject: data}}>
				{props => <FollowerList {...props} followers={followers} resetProfileInfo={fetchData} onChangeSearchInput={onChangeFollower} />}
			</SocialRelationTab.Screen>
			<SocialRelationTab.Screen name="FollowingList" initialParams={{userobject: data}}>
				{props => <FollowerList {...props} follows={follows} resetProfileInfo={fetchData} onChangeSearchInput={onChangeFollow} />}
			</SocialRelationTab.Screen>
			<SocialRelationTab.Screen name="RecommendedAccountList" component={RecommendedAccountList} initialParams={{userobject: data}} />
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
	tabBarIndicatorStyle: {
		backgroundColor: WHITE,
		height: 70 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
		color: APRI10,
	},

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
