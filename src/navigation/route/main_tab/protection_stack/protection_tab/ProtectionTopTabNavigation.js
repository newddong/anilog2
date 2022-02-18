import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProtectRequestList from 'Templete/protection/ProtectRequestList';
import MissingReportList from 'Templete/missing/MissingReportList';
import ActivationList from 'Templete/list/ActivationList';
import TopTabNavigation_Border from 'Organism/menu/TopTabNavigation_Border';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const ProtectionTab = createMaterialTopTabNavigator();

export default ProtectionTopTabNavigation = ({route, navigation}) => {
	const tabList = ['보호 요청', '실종/제보', '참여 방법'];
	const navName = ['ProtectRequestList', 'MissingReportList', 'ActivationList'];
	//SearchHeader에서 작성한 검색어와 검색클릭이 행해지면 SearchInput에 값이 들어감

	const [currentScreen, setCurrentScreen] = React.useState(0); //현재 보고 있는 화면 State
	const routeName = getFocusedRouteNameFromRoute(route);
	React.useEffect(() => {
		// console.log('routeName', routeName);
		if (routeName == navName[0]) setCurrentScreen(0);
		else if (routeName == navName[1]) setCurrentScreen(1);
		else if (routeName == navName[2]) setCurrentScreen(2);
	}, [routeName]);
	return (
		<ProtectionTab.Navigator
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
						items={tabList} //Tab에 출력될 Label 배열
						onSelect={onSelectTab} // 현재 클릭된 상태인 tab (pressedTab에는 클릭된 index가 담겨져있음)
						// select={state.index} //클릭으로 인한 변환
						value={currentScreen}
					/>
				); // gesture Handler(손가락으로 swipe)로 tab을 움직였을 시 자식까지 state를 연동시키기 위한 props
			}}>
			<ProtectionTab.Screen name="ProtectRequestList" component={ProtectRequestList} />
			<ProtectionTab.Screen name="MissingReportList" component={MissingReportList} />
			<ProtectionTab.Screen name="ActivationList" component={ActivationList} />
		</ProtectionTab.Navigator>
	);
};
