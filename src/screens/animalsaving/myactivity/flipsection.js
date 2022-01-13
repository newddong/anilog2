import React, {useState} from 'react';
import {View, Text, StyleSheet,Animated, Dimensions} from 'react-native';
import DP, {svg_size} from 'Root/screens/dp';
import {DownBracketGray} from 'Asset/image';
import {TouchableWithoutFeedback} from 'react-native';

export default FlipSection = props => {
	const [pageY, setPageY] = useState(116 * DP);
	const defaultH = props.defaultH;
	const [isOpen, setOpen] = useState(false);
	const toggle = () => {
		// console.log('클릭'+pageY+':'+defaultH);
		if (props.children) {
			if (!isOpen) {
				setOpen(true);
			} else {
				setOpen(false);
			}
		} else {
			alert(`${props.title}이 없습니다!`);
		}
	};

	return (
		<View style={[props.style, {marginBottom: 30 * DP,backgroundColor:'#FFF'}]}>
			<View style={style.header}>
				<View style={style.sum_info}>
					<Text style={[txt.noto28rcjk, {marginRight: 10 * DP}]}>{props.title}</Text>
					<Text style={[txt.noto24rcjk, txt.gray]}>{props.children?.length}</Text>
				</View>
				<TouchableWithoutFeedback onPress={toggle}>
					<View style={style.btn_more}>
						<Text style={[txt.noto24rcjk, {lineHeight: 36 * DP, color: 'gray'}]}>더보기</Text>
						<View style={style.btn_bracket}>
							<DownBracketGray {...svg_size} />
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>

			{!props.children && (
				<View
					style={{
						height: 116 * DP,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Text style={[txt.noto24rcjk, txt.gray]}>{props.title}이 없습니다!</Text>
				</View>
			)}

			<Animated.View style={[style.cntr_contens,props.children?{}:{position:'absolute'}]}>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-evenly',
						paddingVertical: 10 * DP,
					}}
					onLayout={e => {
						setPageY(e.nativeEvent.layout.height);
					}}>
					{props.children}
				</View>
			</Animated.View>
			<Animated.View
				style={[
					{
						backgroundColor: '#FFF',
						width: '100%',
						height: 40 * DP,
						position: 'absolute',
					},
					
				]}></Animated.View>
		</View>
	);
};

FlipSection.defaultProps={
	defaultH:116*DP
};

const style = StyleSheet.create({
	header: {
		height: 48 * DP,
		flexDirection: 'row',
		// backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sum_info: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	btn_more: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	btn_bracket: {
		width: 24 * DP,
		height: 16 * DP,
		marginLeft: 16 * DP,
		transform: [{rotate: '270deg'}],
	},
	cntr_contens: {
		// backgroundColor: 'purple',
	},
});

export const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24*DP,
		lineHeight: 42 * DP,
	},
	noto28rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28*DP,
		lineHeight: 38 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30*DP,
		lineHeight: 46 * DP,
	},
	roboto30bold: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30*DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24*DP,
		lineHeight: 30 * DP,
	},
	roboto22r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 22*DP,
		lineHeight: 28 * DP,
	},
	bold40: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40*DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28*DP,
		lineHeight: 36 * DP,
	},
	aligncenter: {
		textAlign: 'center',
	},
	link: {
		color: '#007EEC',
	},
	gray: {
		color: '#767676',
	},
	white: {
		color: '#FFFFFF',
	},
});
