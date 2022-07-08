import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated, PanResponder} from 'react-native';

import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Cancel48} from 'Atom/icon';

const Tag = ({pos, user, onDelete, onEndTagMove, viewmode, backgroundLayout, onTagMoveStart}) => {
	const [position, setPosition] = React.useState({x: pos?.x, y: pos?.y});

	// const [dimension, setDimension] = React.useState({width: 0, height: 0});
	const dimension = React.useRef({width:0,height:0});
	const TOPLEFT = {x: 10*DP, y: 10*DP};
	const BOTTOMRIGHT = {x: 720 * DP, y: 720 * DP};
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
				onTagMoveStart();
			},
			onPanResponderStart: ({nativeEvent}) => {
				// console.log('moves',nativeEvent,pan);
				onTagMoveStart();
			},
			onPanResponderMove: ({nativeEvent}, state) => {
				// console.log('== moveX: '+ state.moveX+'  moveY: '+ state.moveY+'  x0: '+state.x0+'  y0: '+state.y0+'  dx: '+state.dx+'  dy: '+state.dy+'  vx: '+state.vx+'  vy: '+state.vy);
				// console.log('@@ x: '+nativeEvent.locationX+' pageX: '+nativeEvent.pageX+'    y: '+nativeEvent.locationY+' pageY: '+nativeEvent.pageY);
				let x = state.dx;
				let y = state.dy;

				if(position.x+state.dx<=TOPLEFT.x){
					x= TOPLEFT.x-position.x
				}
				if(position.y+state.dy<=TOPLEFT.y){
					y= TOPLEFT.y-position.y
				}

				if(position.x+state.dx+dimension.current.width>=BOTTOMRIGHT.x){
					x= BOTTOMRIGHT.x - position.x - dimension.current.width 
				}
				if(position.y+state.dy+dimension.current.height>=BOTTOMRIGHT.y){
					y= BOTTOMRIGHT.y - position.y - dimension.current.height
				}
				pan.setValue({x:x,y:y})
			},
			onPanResponderRelease: ({nativeEvent},state) => {
				
				
				let x = position.x + state.dx;
				let y = position.y + state.dy;

				if(position.x+state.dx<=TOPLEFT.x){
					x= TOPLEFT.x
				}
				if(position.y+state.dy<=TOPLEFT.y){
					y= TOPLEFT.y
				}

				if(position.x+state.dx+dimension.current.width>=BOTTOMRIGHT.x){
					x=BOTTOMRIGHT.x-dimension.current.width
				}

				if(position.y+state.dy+dimension.current.height>=BOTTOMRIGHT.y){
					y=BOTTOMRIGHT.y-dimension.current.height
				}


				pan.setValue({x: 0, y: 0});
				onEndTagMove({user: user, x: x, y: y});
			},
			onPanResponderTerminate: ({nativeEvent}) => {
				// console.log('movet',nativeEvent,pan)
			},
		}),
	).current;

	const onLayout = e => {
		dimension.current = {...e.nativeEvent.layout};
	};

	const deleteTag = () => {
		onDelete(user);
	};

	const moveToTaggedProfile = () => {
		tagnav.push('UserProfile', {userobject: user});
	};
	if (isDelete) return false;
	if (viewmode) {
		return (
			<TouchableOpacity
				style={[
					tag.background,
					{position: 'absolute', backgroundColor: '#0000', height: 100 * DP, top: HEIGTHRATIO * position.y, left: HEIGTHRATIO * position.x},
				]}
				onPress={moveToTaggedProfile}
				>
				<Text style={[txt.roboto28, {opacity: 0, paddingHorizontal: 50 * DP}]}>{user.user_nickname}</Text>
				<View
					style={[tag.background, {paddingRight: 30 * DP}]}

					>
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
						backgroundColor: '#0000',
						height: 100 * DP,
						top: HEIGTHRATIO * position.y,
						left: WIDTHRATIO * position.x,
						transform: [{translateX: pan.x}, {translateY: pan.y}],
					},
				]} onLayout={onLayout}
				onStartShouldSetResponder={() => true}>
				<Text style={[txt.roboto28, {opacity: 0, paddingHorizontal: 50 * DP}]}>{user.user_nickname}</Text>
				<View style={[tag.background]}  onStartShouldSetResponder={() => true}>
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
