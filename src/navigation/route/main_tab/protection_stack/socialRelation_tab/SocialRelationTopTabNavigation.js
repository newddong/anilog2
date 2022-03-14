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

const SocialRelationTab = createMaterialTopTabNavigator();

export default SocialRelationTopTabNavigation = ({route, navigation}) => {
	const data = route.params.userobject;

	//헤더 타이틀 설정 작업 및 유저 오브젝트 할당
	React.useEffect(() => {
		navigation.setOptions({title: route.params.userobject.user_nickname});
	}, [route.params]);

	const tabBarItems = ['함께 아는 친구', count_to_K(data.user_follower_count) + ' 팔로워', count_to_K(data.user_follow_count) + ' 팔로잉', '추천'];

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

					const getWidth = () => {
						switch (index) {
							case 0:
								return '35%';
								break;
							case 1:
							case 2:
								return '23%';
								break;
							case 3:
								return '13%';
								break;

							default:
								break;
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
								width: getWidth(),
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

	return (
		<SocialRelationTab.Navigator
			initialRouteName={'FollowerList'}
			initialLayout={{width: Dimensions.get('window').width}}
			tabBar={props => <MyTabBar {...props} />}
			screenOptions={{
				lazy: true,
			}}>
			<SocialRelationTab.Screen name="LinkedAccountList" component={LinkedAccountList} initialParams={{userobject: data}} />
			<SocialRelationTab.Screen name="FollowerList" component={FollowerList} initialParams={{userobject: data}} />
			<SocialRelationTab.Screen name="FollowingList" component={FollowerList} initialParams={{userobject: data}} />
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
});
