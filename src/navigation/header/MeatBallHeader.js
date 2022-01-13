import React from 'react';
import {Text, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
// import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import {BackArrow32, Meatball50_GRAY20_Horizontal} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import MeatBallDropdown from 'Molecules/dropdown/MeatBallDropdown';
import {btn_w280} from 'Root/component/atom/btn/btn_style';

/**
 * 유저가 기르는 반려동물의 프로필 사진, 닉네임, 유저의 닉네임을 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.menu - 미트볼 클릭시 출력되는 메뉴 목록
 * @param {(value:object, index:number)=>void} props.onSelect - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
export default MeatBallHeader = props => {
	// console.log('props.options', props);
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={props.navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={props.navigation.goBack} />
				</View>
			</TouchableOpacity>
			<Text style={txt.roboto40b}>{props.options.title ? props.options.title : props.route.params.title}</Text>
			<MeatBallDropdown
				menu={props.menu}
				onSelect={(v, i) => console.log(v + ':' + i)}
				horizontal
				// onOpen={()=>{alert('open')}}
				// onClose={()=>{alert('close')}}
			/>
		</View>
	);
};

MeatBallHeader.defaultProps = {
	menu: [],
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 135 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
	},
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		padding: 10 * DP,
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
});
