import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, Animated, Image, PanResponder} from 'react-native';

import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Cancel48} from 'Atom/icon';

const Tag = ({pos, user, onDelete, onEndTagMove, viewmode, backgroundLayout, onTagMoveStart}) => {
	const [position, setPosition] = React.useState({x: pos?.x, y: pos?.y});
	const [dimension, setDimension] = React.useState({width: 0, height: 0});
	const tagnav = useNavigation();
	const [isDelete, setDelete] = React.useState(false);
	const WIDTH = 750 * DP;
	const HEIGHT = 750 * DP;
	const WIDTHRATIO = backgroundLayout.width / WIDTH;
	const HEIGTHRATIO = backgroundLayout.height / HEIGHT;
	const pan = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: ({nativeEvent}) => {
				// console.log('moveg',nativeEvent,pan);
				pan.setOffset({x: -nativeEvent.pageX, y: -nativeEvent.pageY});
			},
			onPanResponderStart: ({nativeEvent}) => {
				// console.log('moves',nativeEvent,pan);
				pan.setOffset({x: -nativeEvent.pageX, y: -nativeEvent.pageY});
				onTagMoveStart();
			},
			onPanResponderMove: ({nativeEvent}) => {
				// console.log('move',nativeEvent,pan);
				pan.setValue({x: nativeEvent.pageX, y: nativeEvent.pageY});
			},
			onPanResponderRelease: ({nativeEvent}) => {
				// console.log('mover',nativeEvent,pan);
				let traverseX = pan.x._value + pan.x._offset;
				let traverseY = pan.y._value + pan.y._offset;
				pan.setValue({x: nativeEvent.pageX, y: nativeEvent.pageY});
				onEndTagMove({user: user, x: position.x + traverseX, y: position.y + traverseY});
			},
			onPanResponderTerminate: ({nativeEvent}) => {
				// console.log('movet',nativeEvent,pan)
			},
		}),
	).current;

	const onLayout = e => {
		console.log('onlayout', e.nativeEvent.layout, pos, user.user_nickname);
		setDimension(e.nativeEvent.layout);
	};

	const deleteTag = () => {
		// setDelete(true);
		onDelete(user);
	};

	const moveToTaggedProfile = () => {
		tagnav.push('UserProfile', {userobject: user});
	};
	if (isDelete) return false;
	if (viewmode) {
		return (
			<TouchableOpacity
				style={{position: 'absolute', backgroundColor: 'red', top: HEIGTHRATIO * position.y, left: HEIGTHRATIO * position.x}}
				onPress={moveToTaggedProfile}>
				<View style={[tag.background, {paddingRight: 30 * DP}]} onLayout={onLayout}>
					<Text style={[txt.roboto28, txt.white]}>{user.user_nickname}</Text>
				</View>
			</TouchableOpacity>
		);
	} else {
		return (
			<Animated.View
				{...panResponder.panHandlers}
				style={[
					tag.background,
					{
						backgroundColor: null,
						height: 100 * DP,
						top: HEIGTHRATIO * position.y,
						left: WIDTHRATIO * position.x,
						transform: [{translateX: pan.x}, {translateY: pan.y}],
					},
				]}
				onStartShouldSetResponder={() => true}>
				<Text style={[txt.roboto28, {opacity: 0, paddingHorizontal: 50 * DP}]}>{user.user_nickname}</Text>
				<View style={[tag.background]} onLayout={onLayout}>
					<Text style={[txt.roboto28, txt.white]}>{user.user_nickname}</Text>
					<View
						style={{width: 58 * DP, height: 100 * DP, justifyContent: 'center', alignItems: 'flex-end'}}
						onStartShouldSetResponder={() => true}
						onResponderGrant={() => {
							deleteTag();
						}}>
						<Cancel48 />
					</View>
				</View>
			</Animated.View>
		);
	}
};

Tag.defaultProps = {
	viewmode: false,
};

const tag = StyleSheet.create({
	background: {
		height: 52 * DP,
		paddingLeft: 30 * DP,
		paddingRight: 15 * DP,
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

export default Tag;
