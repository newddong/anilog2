import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import ActivationList from 'Templete/list/ActivationList';
import TopTabNavigation_Border from 'Organism/menu/TopTabNavigation_Border';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

import {APRI10, GRAY10, GRAY40, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {getHelpByCategoryDynamicQuery, getSearchHelpByCategoryList} from 'Root/api/helpbycategory';
import {getCommonCodeDynamicQuery} from 'Root/api/commoncode';
import CategoryHelp from 'Component/templete/user/CategoryHelp';
import {txt} from 'Root/config/textstyle';
import searchContext from 'Root/config/searchContext';
import OneNotice from 'Organism/listitem/OneNotice';

const CategoryHelpTab = createMaterialTopTabNavigator();
const CategoryHelpTopTabNavigation = ({route, navigation}) => {
	const [categoryList, setCategoryList] = React.useState([]);
	const [currentScreen, setCurrentScreen] = React.useState(0); //현재 보고 있는 화면 State
	const routeName = getFocusedRouteNameFromRoute(route);
	const [loading, setLoading] = React.useState(true);
	const [searchText, setSearchText] = React.useState('');
	const [data, setData] = React.useState();
	const [commonData, setCommomData] = React.useState();

	React.useEffect(() => {
		let temp = [];
		let temp2 = {};
		getCommonCodeDynamicQuery(
			{common_code_c_name: 'helpbycategoryobjects', common_code_language: 'kor', common_code_out_type: 'list'},
			result => {
				// console.log('result', result);
				for (let i in result.msg) {
					if (i >= 1) {
						temp.push(result.msg[i].common_code_msg_kor);
						temp2[result.msg[i]._id] = result.msg[i].common_code_msg_kor;
					}
				}
				setCommomData(temp2);
				setCategoryList(temp);
				setLoading(false);
			},
			err => {
				console.log('err', err);
			},
		);
	}, []);

	React.useEffect(() => {
		console.log('searchInputForHelp : ', searchContext.searchInfo.searchInputForHelp);
		setSearchText(searchContext.searchInfo.searchInputForHelp);
		if (!loading) {
			getSearchHelpByCategoryList(
				{searchKeyword: searchContext.searchInfo.searchInputForHelp},
				result => {
					// console.log('result', result.msg);
					setData(result.msg);
				},
				err => {
					console.log('category search err', err);
					setData();
				},
			);
		}
	}, [searchContext.searchInfo.searchInputForHelp]);

	const renderItem = ({item, index}) => {
		return (
			<OneNotice
				uptitle={commonData[item.help_by_category_common_code_id]}
				downtitle={item.help_by_category_title}
				contents={item.help_by_category_contents.replace(/\\n/g, `\n`)}
			/>
		);
	};

	const onPressAsk = () => {
		navigation.push('ServiceTab');
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		if (searchText) {
			return (
				<View style={styles.container}>
					{/* <Text>검색중</Text> */}
					{data ? (
						<View style={styles.topContainer}>
							<FlatList data={data} keyExtractor={item => item._id} renderItem={renderItem} showsVerticalScrollIndicator={false} />
						</View>
					) : (
						<View style={styles.noResultContainer}>
							<Text style={txt.noto28}>검색결과가 없습니다.</Text>
						</View>
					)}
					<Text style={[txt.noto28, {textAlign: 'center'}, {marginTop: 50 * DP}]}>궁금한 부분을 찾지 못하셨나요?</Text>
					<TouchableOpacity onPress={onPressAsk}>
						<Text style={[txt.noto28, {textAlign: 'center'}, {color: APRI10}]}>1:1 문의하기</Text>
					</TouchableOpacity>
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
									value={currentScreen}
									searchText={'aaa'}
								/>
							</View>
						);
					}}>
					{/* <CategoryTab /> */}
					{/* 
					<CategoryHelpTab.Screen
						name="CategoryHelp"
						component={CategoryHelp}
						options={{header: props => <InputAndSearchHeader {...props} searchText={'aa'} />}}>{props=><CategoryHelp {...props}} search={"aaa"}/></CategoryHelpTab.Screen> */}
					<CategoryHelpTab.Screen name="CategoryHelp">{props => <CategoryHelp {...props} search="aaa" />}</CategoryHelpTab.Screen>
				</CategoryHelpTab.Navigator>
			);
		}
	}
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		marginTop: 10 * DP,
	},

	topContainer: {
		flexDirection: 'row',
		// width: 428 * DP,
		alignItems: 'flex-end',
		marginLeft: 48 * DP,
	},
	noResultContainer: {
		marginTop: 30 * DP,
		alignContent: 'center',
		alignItems: 'center',
	},
});
export default CategoryHelpTopTabNavigation;
