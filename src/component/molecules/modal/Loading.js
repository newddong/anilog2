import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, Image, Animated, Easing} from 'react-native';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';

/**
 * 버튼이 없는 모달
 *
 * @todo 모달창이 없어지기 위한 조건을 넣어야함.
 *
 * @param {Object} props - props object
 * @param {boolean} props.isModal - 모달인지 여부
 *
 */
const Loading = props => {
	const spinValue = new Animated.Value(0);

	const defaultColors = ['#FF9888', '#FF9888', '#FF9888', '#FF9888'];

	const [animations, setAnimations] = useState([]);
	const [reverse, setReverse] = useState(false);

	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const dotAnimations = [];
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < 4; i++) {
			dotAnimations.push(new Animated.Value(0));
		}
		setAnimations(dotAnimations);
	}, []);

	useEffect(() => {
		if (animations.length === 0) return;
		loadingAnimation(animations, reverse);
		appearAnimation();
	}, [animations]);

	function appearAnimation() {
		Animated.timing(opacity, {
			toValue: 1,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start();
	}

	function floatAnimation(node, reverseY, delay) {
		const floatSequence = Animated.sequence([
			Animated.timing(node, {
				toValue: reverseY ? 20 : -20,
				easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
				delay,
				useNativeDriver: true,
			}),
			Animated.timing(node, {
				toValue: reverseY ? -20 : 20,
				easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
				delay,
				useNativeDriver: true,
			}),
			Animated.timing(node, {
				toValue: 0,
				delay,
				useNativeDriver: true,
			}),
		]);
		return floatSequence;
	}

	function loadingAnimation(nodes, reverseY) {
		Animated.parallel(nodes.map((node, index) => floatAnimation(node, reverseY, index * 100))).start(() => {
			setReverse(!reverse);
		});
	}

	useEffect(() => {
		if (animations.length === 0) return;
		loadingAnimation(animations, reverse);
	}, [reverse, animations]);

	// First set up animation
	React.useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1500,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
		).start();
	}, []);

	return (
		<View
			style={[
				style.background,
				{
					backgroundColor: props.isModal ? '#0009' : 'white',
				},
			]}>
			<Animated.View style={[styles.loading, {opacity}]}>
				{animations.map((animation, index) => (
					<Animated.View
						key={`loading-anim-${index}`}
						style={[
							{width: 20 * DP, height: 20 * DP, borderRadius: (20 * DP) / 2, marginLeft: 10 * DP},
							{backgroundColor: defaultColors[index]},
							{transform: [{translateY: animation}]},
						]}
					/>
				))}
			</Animated.View>
		</View>
	);
};

Loading.defaultProps = {
	popUpMsg: 'popUp',
	isModal: true,
};

const styles = StyleSheet.create({
	loading: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 200 * DP,
	},
});
const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		backgroundColor: WHITE,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40 * DP,
		minHeight: 126 * DP, //UX 모달크기 변경(22.02.03 - 상우)
	},
	msg: {
		// marginBottom: 30 * DP,
		// marginTop: 30 * DP,
		// maxWidth: 466 * DP, // 상우 추가
		padding: 40 * DP, // 상우 추가
		textAlignVertical: 'center',
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
});

export default Loading;
