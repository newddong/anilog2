import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DP from 'Root/config/dp';
import SvgWrapper, {SvgWrap} from 'Atom/svgwrapper';
import {txt} from 'Root/config/textstyle';
import {tab, layout} from './style_BottomTab';
import {APRI10, GRAY20} from 'Root/config/color';
import {
	FeedTabFilled,
	FeedTabBorder,
	AnimalSavingTabBorder,
	AnimalSavingTabFilled,
	CommunityTabBorder,
	CommunityTabFilled,
	MyTabBorder,
	MyTabFilled,
	ProfileDefaultImg,
} from 'Atom/icon';
import userGlobalObject from 'Root/config/userGlobalObject';

export default function BottomTab({state, descriptors, navigation}) {
	// console.log('바텀탭 유저 글로벌',userGlobalObject);
	const focusedOptions = descriptors[state.routes[state.index].key].options;
	const icons = [<FeedTabBorder />, <AnimalSavingTabBorder />, <CommunityTabBorder />, <MyTabBorder />];
	const iconsFocused = [<FeedTabFilled />, <AnimalSavingTabFilled />, <CommunityTabFilled />, <MyTabFilled />];

	const iconlayout = [tab.tab_feed, tab.tab_animal_saving, tab.tab_community, tab.tab_my];

	let currentIndex = null;
	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	//SearchTab이 MainTab으로 편입되면서 불가피하게 제작
	//서치탭이 포커스(돋보기 클릭)되지만 탭의 선택상태는 이전의 Tab상태로 유지를 해야함
	//더 좋은 방법이 있을 시 개선 [상우]
	if (state.index == 4 && state.routes) {
		// console.log('state', state?.routes[state.index].params.prevNav);
		if (state.routes[state.index].params != undefined) {
			let prevNav = state.routes[state.index].params.prevNav;
			switch (prevNav) {
				case 'MainHomeFeedList':
					currentIndex = 0;
					break;
				case 'ProtectionTab':
					currentIndex = 1;
					break;
				case 'CommunityMain':
					currentIndex = 2;
					break;
				default:
					break;
			}
			// prevNav == 'ProtectionTab' ? (currentIndex = '1') : (currentIndex = '0');
		}
	}

	const nestedState = state.routes[state.index].state;
	const nestedRouteName = nestedState ? nestedState.routes[nestedState.index].name : 'none';

	if (nestedRouteName.includes('CommentList')) return false;
	return (
		<>
			<Shadow />
			<View style={tab.wrap_main}>
				{state.routes.map((route, index) => {
					const {options} = descriptors[route.key];
					const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
					//SearchTab으로 왔을 경우 현재 포커스되어야할 인덱스는 state.index(Tabindex)가 아닌 이전의 Index로 처리되어야 함 [상우]
					const isFocused = (currentIndex != null ? currentIndex : state.index) == index;
					// const isFocused = state.index == index;
					//확인 필
					const color = isFocused ? APRI10 : GRAY20;
					const textStyle = isFocused ? txt.noto22b : txt.noto22;
					const textStyleEng = isFocused ? txt.roboto22b : txt.roboto22;

					const onPress = () => {
						if (index == 3 && userGlobalObject.userInfo.isPreviewMode) {
							Modal.popLoginRequestModal(() => {
								navigation.navigate({name: 'Login', merge: true});
							});
						} else {
							console.log('tabP');
							if (state.index == 4) {
								navigation.navigate({name: route.name, merge: true});
							}
							const event = navigation.emit({
								type: 'tabPress',
								target: route.key,
								canPreventDefault: true,
							});

							if (!isFocused && !event.defaultPrevented) {
								console.log('click');
								navigation.navigate({name: route.name, merge: true});
							}
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					const renderIcons = index => {
						if (userGlobalObject.userInfo) {
							return index == 3 ? (
								userGlobalObject.userInfo.user_profile_uri == undefined ? (
									<ProfileDefaultImg size={{height: 54 * DP, width: 54 * DP, borderRadius: 27 * DP, marginBottom: -10 * DP}} />
								) : (
									<Image
										style={[
											{height: 54 * DP, width: 54 * DP, borderRadius: 27 * DP, marginBottom: -10 * DP},
											isFocused ? {borderWidth: 4 * DP, borderColor: APRI10} : {},
										]}
										source={{uri: userGlobalObject.userInfo.user_profile_uri}}
									/>
								)
							) : isFocused ? (
								iconsFocused[index]
							) : (
								icons[index]
							);
						} else {
							return isFocused ? iconsFocused[index] : icons[index];
						}
					};

					const renderTab = index => {
						if (index == 4) {
							return false;
						} else {
							return (
								<View style={[tab.hitboxLayout, iconlayout[index]]}>
									{/* {isFocused ? iconsFocused[index] : icons[index]} */}
									{renderIcons(index)}
									<Text style={[index === 3 ? textStyleEng : textStyle, {color: color, lineHeight: 36 * DP, marginTop: 7 * DP}]}>{label}</Text>
								</View>
							);
						}
					};

					return (
						<TouchableOpacity
							// accessibilityRole="button"
							// accessibilityState={isFocused ? {selected: true} : {}}
							// accessibilityLabel={options.tabBarAccessibilityLabel}
							// testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							key={index}>
							{renderTab(index)}
						</TouchableOpacity>
					);
				})}
			</View>
		</>
	);
}

const TabItem = () => {
	return (
		<View style={{alignItems: 'center', marginTop: 20 * DP}}>
			<SvgWrapper style={{height: 58 * DP, width: 58 * DP}} svg={isFocused ? iconsFocused[index] : icons[index]} />
			<Text style={[{color: isFocused ? '#FFB6A5' : '#767676'}, txt.noto22, {lineHeight: 36 * DP}]}>{label}</Text>
		</View>
	);
};

const Shadow = () => (
	<>
		<View
			style={{
				position: 'absolute',
				width: '100%',
				height: 106 * DP,
				backgroundColor: '#767676',
				bottom: 0,
				opacity: 0.03,
			}}></View>
		<View
			style={{
				position: 'absolute',
				width: '100%',
				height: 103 * DP,
				backgroundColor: '#767676',
				bottom: 0,
				opacity: 0.1,
			}}></View>
	</>
);
