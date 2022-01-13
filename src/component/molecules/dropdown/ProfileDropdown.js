<<<<<<< HEAD:src/component/molecules/ProfileDropdown.js
import React, {useState} from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback, Text, Animated, StyleSheet, Easing} from 'react-native';
import AniButton from 'Molecules/AniButton';
import ActionButton from 'Molecules/ActionButton';
import Dropdown from 'Molecules/Dropdown';
=======
import React from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback, Text} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import ActionButton from 'Molecules/button/ActionButton';
import Dropdown from 'Molecules/dropdown/Dropdown';
>>>>>>> d635673fc899603860bb55ede7a5818ebcc9d5fc:src/component/molecules/dropdown/ProfileDropdown.js
import {btn_w280, btn_w226} from 'Atom/btn/btn_style';
import {APRI10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {txt} from 'Root/config/textstyle';

/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {object} props.menu - 드롭다운 목록
 * @param {object} props.btnLayout - 버튼의 레이아웃 스타일(Atoms의 btn_wXXX)
 * @param {number} props.titleFontStyle - 제목 글꼴 크기, 기본값 24
 * @param {(value,index:number)=>void} props.onSelect - 드롭다운을 선택했을 때 동작하는 콜백, 선택된 값과 인덱스를 반환
 * @param {()=>void} props.onOpen - 드롭다운이 열렸을 때 동작하는 콜백
 * @param {()=>void} props.onClose - 드롭다운이 닫혔을 때 동작하는 콜백
 */
const ProfileDropdown = props => {
	const closeAnimation = () => {
		Animated.timing(animatedHeight, {
			toValue: -100,
			duration: 300,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		setExpanded(false);
	};

	const onClose = () => {
		console.log('Close');
		props.onClose();
		closeAnimation();
	};

	const onOpen = () => {
		console.log('Open');
		Animated.timing(animatedHeight, {
			duration: 500,
			toValue: 252 * DP,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
		setExpanded(true);
	};

	const onSelect = (v, i) => {
		closeAnimation();
		props.onSelect(v, i);
		dropdown.current.button.current.press();
	};

	const dropdown = React.useRef();
	const animatedHeight = React.useRef(new Animated.Value(0)).current;
	const [expanded, setExpanded] = useState(false);

	const interpolatedHeight = animatedHeight.interpolate({
		inputRange: [0, 100],
		outputRange: [75, 150],
	});

	const onLayout = e => {
		// console.log('e', e.nativeEvent);
	};

	return (
		<Dropdown
			buttonComponent={<ActionButton {...props} initState={expanded} onOpen={onOpen} onClose={onClose} noStateChange />}
			ref={dropdown}
			animated={true}
			dropdownList={
				<Animated.ScrollView
					onLayout={onLayout}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={[styles.container]}
					style={{
						// backgroundColor: 'lightgray',
						height: interpolatedHeight,
						borderRadius: 40 * DP,
						shadowColor: 'blue',
						shadowOffset: {
							height: 2,
							width: 2,
						},
						// elevation: 2,
					}}>
					<ActionButton {...props} initState={!expanded} onClose={onSelect} />
					{props.menu.map((v, i) => (
						<TouchableWithoutFeedback onPress={() => onSelect(v, i)} key={i}>
							<View style={[styles.menuItem, {width: props.btnLayout.width}]}>
								<Text
									style={[
										txt.noto24b,
										{
											fontSize: props.titleFontStyle * DP,
											textAlign: 'center',
											color: WHITE,
											shadowOffset: {width: 2, height: 1},
											shadowOpacity: 0.3,
											shadowColor: 'black',
										},
									]}>
									{v}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					))}
				</Animated.ScrollView>
			}
		/>
	);
};

ProfileDropdown.defaultProps = {
	btnLayout: btn_w226, // 버튼의 레이아웃(width, height, radius 등의 수치 결정)
	titleFontStyle: 24, // 버튼 title의 폰트 크기
	onOpen: e => console.log('onOpen', e),
	onClose: e => console.log('onClose', e),
	onSelect: (v, i) => console.log(i + ':' + v),
	menu: [],
};

export default ProfileDropdown;

const styles = StyleSheet.create({
	container: {
		backgroundColor: APRI10,
		borderRadius: 40 * DP,
		alignItems: 'center',
	},
	menuItem: {
		height: 70 * DP,
		justifyContent: 'center',
	},
});
