import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import ActivationList from 'Templete/list/ActivationList';
import TopTabNavigation_Border from 'Organism/menu/TopTabNavigation_Border';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import AskQuestion from 'Templete/user/AskQuestion';
import AskedQuestion from 'Templete/user/AskedQuestion';
import {GRAY10, GRAY40, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {getCommonCodeDynamicQuery} from 'Root/api/commoncode';
import CategoryHelp from 'Component/templete/user/CategoryHelp';
import {txt} from 'Root/config/textstyle';
const CategoryHelpTab = createMaterialTopTabNavigator();

const CategoryHelpTopTabNavigation = ({route, navigation}) => {
	const tabList = ['문의하기', '문의 내역'];
	const navName = ['AskQestion', 'AskedQestion'];
	//SearchHeader에서 작성한 검색어와 검색클릭이 행해지면 SearchInput에 값이 들어감
	const [categoryList, setCategoryList] = React.useState([]);
	const [currentScreen, setCurrentScreen] = React.useState(0); //현재 보고 있는 화면 State
	const routeName = getFocusedRouteNameFromRoute(route);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		var temp = [];
		getCommonCodeDynamicQuery(
			{common_code_c_name: 'helpbycategoryobjects'},
			result => {
				for (var i in result.msg) {
					if (i >= 1) {
						temp.push(result.msg[i].common_code_msg_kor);
					}
				}

				setCategoryList(temp);
				console.log('categoryList', categoryList);
				setLoading(false);
			},
			err => {
				console.log('err', err);
			},
		);
	}, []);

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<CategoryHelpTab.Navigator
				initialRouteName="CategoryHelp"
				tabBar={({state, descriptors, navigation, position}) => {
					const onSelectTab = pressedTab => {
						navigation.navigate(
							'CategoryHelp',

							{category: categoryList[pressedTab]},
						);
					};
					return (
						<View style={[{backgroundColor: WHITE}]}>
							<View style={[{borderBottomColor: GRAY40}, {borderBottomWidth: 1}, {backgroundColor: WHITE}]}>
								<Text style={[txt.noto28b, {marginLeft: 48 * DP}, {marginVertical: 20 * DP}]}>카테고리별 도움말</Text>
							</View>
							<TopTabNavigation_Border
								items={categoryList} //Tab에 출력될 Label 배열
								onSelect={onSelectTab} // 현재 클릭된 상태인 tab (pressedTab에는 클릭된 index가 담겨져있음)
								// select={state.index} //클릭으로 인한 변환
								// fontSize={28}  props적용안됨
								value={currentScreen}
							/>
						</View>
					); // gesture Handler(손가락으로 swipe)로 tab을 움직였을 시 자식까지 state를 연동시키기 위한 props
				}}>
				{/* <CategoryTab /> */}

				<CategoryHelpTab.Screen name="CategoryHelp" component={CategoryHelp} options={{title: '카테고리별 도움말'}} />
			</CategoryHelpTab.Navigator>
		);
	}
};
export default CategoryHelpTopTabNavigation;
