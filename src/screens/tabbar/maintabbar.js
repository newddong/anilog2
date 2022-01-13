import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DP from 'Screens/dp';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import {MainTabFeed, MainTabMy, MainTabVideo, MainTabSaveAnimal} from 'Asset/image_v2';
import {txt} from 'Screens/textstyle';
import {tab, layout} from './maintabbar_style';
import {MAINCOLOR, GRAY_MAINTAB} from '../color';

export default function MainTabBar({state, descriptors, navigation}) {
	const focusedOptions = descriptors[state.routes[state.index].key].options;
	const icons = [
		<MainTabFeed fill={GRAY_MAINTAB} />,
		<MainTabSaveAnimal fill={GRAY_MAINTAB} />,
		<MainTabVideo fill={GRAY_MAINTAB} />,
		<MainTabMy fill={GRAY_MAINTAB} />,
	];
	const iconsFocused = [
		<MainTabFeed fill={MAINCOLOR} />,
		<MainTabSaveAnimal fill={MAINCOLOR} />,
		<MainTabVideo fill={MAINCOLOR} />,
		<MainTabMy fill={MAINCOLOR} />,
	];

	const iconstyle = [tab.tab_feed, tab.tab_animal_saving, tab.tab_video, tab.tab_my];
	const iconlayout = [layout.tab_feed, layout.tab_animal_saving, layout.tab_video, layout.tab_my];

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	return (
		<>
			<Shadow />
			<View style={tab.wrap_main}>
				{state.routes.map((route, index) => {
					const {options} = descriptors[route.key];
					const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

					const isFocused = state.index === index;
					const color = isFocused ? MAINCOLOR : GRAY_MAINTAB;
					const textStyle = isFocused ? txt.noto22b : txt.noto22;
					const textStyleEng = isFocused ? txt.roboto22b : txt.roboto22;

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					const renderTab = index => {
						return (
							<View style={[tab.hitboxLayout, iconstyle[index]]}>
								<SvgWrapper style={iconlayout[index]} svg={isFocused ? iconsFocused[index] : icons[index]} />

								<Text style={[{color: color}, index === 3 ? textStyleEng : textStyle, {lineHeight: 36 * DP}]}>{label}</Text>
							</View>
						);
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
				height: 146 * DP,
				backgroundColor: '#767676',
				bottom: 0,
				opacity: 0.03,
			}}></View>
		<View
			style={{
				position: 'absolute',
				width: '100%',
				height: 143 * DP,
				backgroundColor: '#767676',
				bottom: 0,
				opacity: 0.1,
			}}></View>
	</>
);
