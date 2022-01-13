import React from 'react';
import {View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback,Animated} from 'react-native';
import DP from 'Screens/dp';

export default SearchTabBar = ({state, descriptors, navigation, position}) => {
	const shadow = Animated.interpolateNode(position, {
		inputRange:[0,1,2],
		outputRange: [0,4,4],
	 });
	return (
		<Animated.View style={[tab.wrap_tab,tab.shadow,{shadowOffset:{width:0,height:shadow}},{elevation:shadow}]}>
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
				return (
					<TouchableWithoutFeedback
						accessibilityRole="button"
						accessibilityState={isFocused ? {selected: true} : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{flex: 1}} key={index}>
                  <Animated.View style={[tab.cntr_tab,{backgroundColor:isFocused?'#FFB6A5':'#fff'}]}>
						<Animated.Text style={[txt.noto30b,{color:isFocused?'#fff':'#767676'}]}>{label}</Animated.Text>
                  </Animated.View>
					</TouchableWithoutFeedback>
				);
			})}
		</Animated.View>
	);
};

const tab = StyleSheet.create({
	wrap_tab:{
		flexDirection:'row',
		backgroundColor:'#fff'
	},
   cntr_tab:{
      flex:1,
      height:70*DP,
      // backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
   },
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 4,
	},
})

const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 13,
		lineHeight: 36*DP,
	},
	noto28rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 15.5,
		lineHeight: 38*DP,
	},
	noto30b:{
		fontFamily:'NotoSansKR-Bold',
		fontSize:30*DP,
		lineHeight:42*DP
	},
})