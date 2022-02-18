import React from 'react';
import {View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions, Animated} from 'react-native';
import DP from 'Root/config/dp';

export default FeedTabBar = ({state, descriptors, navigation, position}) => {
	const width = Dimensions.get('screen').width / state.routes.length;
	const pos = Animated.interpolateNode(position, {
		inputRange: [0, 1, 2, 3],
		outputRange: [0, width, width * 2, width * 3],
	});

	return (
		<Animated.View style={[tab.wrap_tab, tab.shadow]}>
			<Animated.View style={[tab.indicator, {transform: [{translateX: pos}]}]}></Animated.View>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key];
				const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

				const isFocused = state.index === index;

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

				const inputRange = state.routes.map((_, i) => i);
				const opacity = Animated.interpolateNode(position, {
					inputRange,
					outputRange: inputRange.map(i => (i === index ? 1 : 0)),
				});

				return (
					<TouchableWithoutFeedback
						accessibilityRole="button"
						accessibilityState={isFocused ? {selected: true} : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{flex: 1}}
						key={index}>
						<Animated.View style={[tab.cntr_tab]}>
							<Animated.Text style={[isFocused ? txt.focused : txt.notfocused]}>{label}</Animated.Text>
						</Animated.View>
					</TouchableWithoutFeedback>
				);
			})}
		</Animated.View>
	);
};

const tab = StyleSheet.create({
	wrap_tab: {
		flexDirection: 'row',
		backgroundColor: '#fff',
	},
	cntr_tab: {
		flex: 1,
		height: 70 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	shadow: {
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 4,
		// },
		// elevation: 4,
	},
	indicator: {
		backgroundColor: '#FFB6A5',
		height: 4 * DP,
		width: '25%',
		position: 'absolute',
		zIndex: 1,
		bottom: 0,
		left: 0,
	},
});

const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 13,
		lineHeight: 36 * DP,
	},
	notfocused: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 38 * DP,
		color: '#767676',
	},
	focused: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 38 * DP,
		color: '#FFB6A5',
	},
});
