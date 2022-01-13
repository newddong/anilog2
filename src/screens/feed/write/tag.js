import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback,Animated, Image} from 'react-native';
// import Animated, {useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, runOnJS, runOnUI} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

import {DeleteImage} from 'Asset/image';
import DP from 'Screens/dp';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import {txt} from 'Root/screens/textstyle';
import {useNavigation, useRoute} from '@react-navigation/native';

export default Tag = ({pos, user, content, onDelete, onEnd, viewmode, backgroundLayout}) => {
	const [position, setPosition] = React.useState({x: pos.x, y: pos.y, opacity: 1});
	const tagnav = useNavigation();
	React.useEffect(() => {
		// setPosition({...position, x: pos.x, y: pos.y});
		tagX.value = pos.x;
		tagY.value = pos.y;
	}, [pos.x, pos.y]);

	const WIDTH = 750 * DP;
	const HEIGHT = 750 * DP;
	const WIDTHRATIO = backgroundLayout.width/WIDTH;
	const HEIGTHRATIO = backgroundLayout.height/HEIGHT;

	const onLayout = e => {
		let layout = e.nativeEvent.layout;
		let x = 0;
		let y = 0;
		let left = true;
		let top = true;
		if (pos.x + layout.width > WIDTH) {
			console.log('true');
			x = pos.x - layout.width;
			left = false;
		} else {
			x = pos.x;
			left = true;
		}
		if (pos.y + layout.height > HEIGHT) {
			console.log('true');
			y = pos.y - layout.height;
			top = false;
		} else {
			y = pos.y;
			top = true;
		}
		// setPosition({x: x, y: y, opacity: 1, width: layout.width, height: layout.height});
	};

	const deleteTag = () => {
		onDelete(user);
	};

	//animation setting
	// const tagX = useSharedValue(position.x);
	// const tagY = useSharedValue(position.y);

	React.useEffect(() => {
		// tagX.value = 0;
		// tagY.value = 0;
	}, [position]);

	// const gestureHandler = useAnimatedGestureHandler({
	// 	onStart: (event, ctx) => {
	// 		ctx.startX = tagX.value;
	// 		ctx.startY = tagY.value;
	// 		// console.log('onstart' + JSON.stringify(event));
	// 	},
	// 	onActive: (event, ctx) => {
	// 		tagX.value = ctx.startX + event.translationX;
	// 		tagY.value = ctx.startY + event.translationY;
	// 		// tagX.value = event.translationX;
	// 		// tagY.value = event.translationY;
	// 		// console.log('onActive' + JSON.stringify(event));
	// 	},
	// 	onEnd: (event, ctx) => {
	// 		onEnd && runOnJS(onEnd)({user: user, x: tagX.value, y: tagY.value});
	// 		// tagX.value = 0;
	// 		// tagY.value = 0;
	// 		// onEnd&&runOnJS(setPosition)({x:tagX.value+position.x,y:tagY.value+position.y,opacity:1});
	// 		// tagX.value = ctx.startX + event.translationX;
	// 		// tagY.value = ctx.startY + event.translationY;
	// 		// runOnJS(setPosition)({x:position.x+event.translationX,y:position.y+event.translationY});
	// 		// setPosition({x:0,y:0});
	// 		// console.log('onEnd' + JSON.stringify(event));
	// 	},
	// });

	// const moveTag = useAnimatedStyle(() => {
	// 	// return {transform: [{translateX: tagX.value}, {translateY: tagY.value}]};
	// 	return {top: tagY.value, left: tagX.value};
	// });

	const moveToTaggedProfile = () => {
		tagnav.push('Profile', {user_nickname: user.nickname, user_id: user._id});
	};

	// const style = [tag.background, {top: position.y, left: position.x, opacity: position.opacity}, border()];
	const render = React.useCallback(() => {
		if (viewmode) {
			return (
				<TouchableWithoutFeedback onPress={moveToTaggedProfile}>
					<View style={[tag.background, {position: 'absolute', top: HEIGTHRATIO*position.y, left: WIDTHRATIO*position.x, opacity: position.opacity}]} onLayout={onLayout}>
						<Text style={[txt.roboto28, txt.white]}>{user.nickname}</Text>
					</View>
				</TouchableWithoutFeedback>
			);
		} else {
			return (
				// <PanGestureHandler onGestureEvent={gestureHandler}>
					<Animated.View style={[tag.background, {opacity: position.opacity}/*, moveTag*/]} onLayout={onLayout}>
						<Text style={[txt.roboto28, txt.white]}>{user.nickname}</Text>
						{!viewmode && <SvgWrap style={tag.delete} svg={<DeleteImage />} onPress={deleteTag} />}
					</Animated.View>
				// </PanGestureHandler>
			);
		}
	});

	return render();
};

Tag.defaultProps = {
	viewmode: false,
};

const tag = StyleSheet.create({
	background: {
		height: 52 * DP,
		paddingHorizontal: 30 * DP,
		backgroundColor: '#0006',
		borderRadius: 30 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		position: 'absolute',
	},
	upleft: {
		borderTopLeftRadius: 0,
	},
	upright: {
		borderTopRightRadius: 0,
	},
	botleft: {
		borderBottomLeftRadius: 0,
	},
	botright: {
		borderBottomRightRadius: 0,
	},
	delete: {
		width: 36 * DP,
		height: 36 * DP,
		marginLeft: 10 * DP,
	},
});
