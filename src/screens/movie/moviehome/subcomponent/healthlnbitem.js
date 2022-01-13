import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {txt} from '../style_moviehome';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import { useNavigation, useRoute } from '@react-navigation/native';

export default HealthLnbItem = props => {
	const [isClick, setClick] = useState(false);
	const nav = useNavigation();
	const route = useRoute();
	const tabClick = () => {
		nav.push('MainScreen',{screen:'movie',params:{screen:'MovieCategory',params:{title:props.label}}});
	};
	const isFocused = route.params?.title === props.label;

	return (
		<TouchableWithoutFeedback onPress={tabClick}>
			<View style={lnb.wrp_item}>
				<View style={lnb.cntr_icon}>
					<SvgWrapper style={props.size} svg={isFocused?props.focused:props.icon}/>
				</View>
				<Text style={[lnb.cntr_txt, txt.noto24rcjk, txt.gray]}>{props.label}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

HealthLnbItem.defaultProps = {
	onPress: () => evt => console.log('함수할당안됨'),
	init: false,
};

const lnb = StyleSheet.create({
	wrp_item: {
		width: 140 * DP,
		marginHorizontal: 9 * DP,
	},
	cntr_icon: {
		height: 140 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cntr_txt: {
		height: 36 * DP,
		textAlign: 'center',
	},
});
