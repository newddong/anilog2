import React from 'react';
import {View} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTabNavigation_Border from 'Root/component/organism_ksw/TopTabNavigation_Border';
import LinkedAccountList from 'Root/component/templete/LinkedAccountList';
import FollowerList from 'Root/component/templete/FollowerList';
import RecommendedAccountList from 'Root/component/templete/RecommendedAccountList';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const SocialRelationTab = createMaterialTopTabNavigator();

export default SocialRelationTopTabNavigation = ({route, navigation}) => {
	const [data, setData] = React.useState(route.params.userobject);
	const [currentScreen, setCurrentScreen] = React.useState(0); //현재 보고 있는 화면 State
	const routeName = getFocusedRouteNameFromRoute(route); ////현재 보고 있는 화면 얻어오는 라이브러리

	//헤더 타이틀 설정 작업 및 유저 오브젝트 할당
	React.useEffect(() => {
		navigation.setOptions({title: route.params.userobject.user_nickname});
	}, [route.params]);

	// const navName = ['LinkedAccountList', 'FollowerList', 'FollowingList', 'RecommendedAccountList']; //Top 탭 스크린 name
	const navName = ['FollowerList', 'FollowingList', 'RecommendedAccountList']; //Top 탭 스크린 name
	// const tabBarItems = [1032 + ' 함께 아는 사람', data.user_follower_count + ' 팔로워', data.user_follow_count + ' 팔로잉', '추천']; //커스텀 TabBar의 각 라벨들
	const tabBarItems = [data.user_follower_count + ' 팔로워', data.user_follow_count + ' 팔로잉', '추천']; //커스텀 TabBar의 각 라벨들

	//현재 보고있는 스크린이 바뀜에 따라 TopTab도 변경
	React.useEffect(() => {
		let index = navName.findIndex(screenName => screenName == routeName);
		index == -1 ? setCurrentScreen(0) : setCurrentScreen(index);
	}, [routeName]);

	return (
		<View style={{flex:1}}>
		<SocialRelationTab.Navigator
			initialRouteName={'FollowerList'}
			tabBar={({state, descriptors, navigation, position}) => {
				const onSelectTab = pressedTab => {
					navigation.navigate({
						//현재 Tab state가 가지는 routes들 중 pressedTab 인덱스
						name: state.routes[pressedTab].name,
						merge: true,
					});
				};

				return (
					<TopTabNavigation_Border
						items={tabBarItems} //Tab에 출력될 Label 배열
						onSelect={onSelectTab} // 현재 클릭된 상태인 tab (pressedTab에는 클릭된 index가 담겨져있음)
						select={state.index} // gesture Handler(손가락으로 swipe)로 tab을 움직였을 시 자식까지 state를 연동시키기 위한 props
						fontSize={24}
						value={currentScreen} //TopTab의 현재 선택 Value(가변)
					/>
				);
			}}>
			{/* <SocialRelationTab.Screen name="LinkedAccountList" component={LinkedAccountList} initialParams={{userobject:data}}/> */}
			<SocialRelationTab.Screen name="FollowerList" component={FollowerList} initialParams={{userobject:data}}/>
			<SocialRelationTab.Screen name="FollowingList" component={FollowerList} initialParams={{userobject:data}}/>
			<SocialRelationTab.Screen name="RecommendedAccountList" component={RecommendedAccountList} initialParams={{userobject:data}}/>
		</SocialRelationTab.Navigator>
		</View>
	);
};
