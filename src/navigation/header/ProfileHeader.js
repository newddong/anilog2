import React, {useState, useRef} from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import Backbutton from 'Screens/header/icon_back.svg';
import Dropdown from 'Screens/common/dropdown';
import {Logo, AlarmIcon, SearchIcon, AnimalIcon, MeatballIcon} from 'Asset/image';
import {DropdownMeatball, BracketDown} from 'Asset/image_v2';
import {GRAY_MEATBALL, GRAY, MAINCOLOR} from 'Screens/color';
import {txt} from 'Screens/textstyle';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
//deprecated
export default ProfileHeader = ({options, route, navigation}) => {
	const [isMeatballOpen, setMeatballOpen] = React.useState(false);

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableWithoutFeedback onPress={navigation.goBack}>
				<View style={{width: 80 * DP, height: 80 * DP, justifyContent: 'center'}}>
					<SvgWrapper style={{width: 32 * DP, height: 32 * DP}} svg={<Backbutton />} />
				</View>
			</TouchableWithoutFeedback>
			<Text style={txt.roboto40b}>{options.title}</Text>
			<Dropdown
				// style={{marginRight:70*DP}}
				style={style.meatballContainer}
				dropdownContainerStyle={[style.meatballDropdown, style.shadow]}
				data={['링크복사', '공유하기']}
				// onSelect={selectAreaCode}
				// dropItemStyle={{marginVertical: 3 * DP, paddingHorizontal: 30 * DP}}
				dropItemTxtStyle={style.noto28}
				listBackgroundStyle={[style.meatballListBackGround]}
				listContainerStyle={style.meatballListContainer}
				onSelect={e => {
					alert(e);
				}}
				onSelectNotClose={true}
				onOpen={() => {
					setMeatballOpen(true);
				}}
				onClose={() => {
					setMeatballOpen(false);
				}}
				animation
				// component={<SvgWrapper style={style.buttonMeatBall} svg={<MeatballIcon fill="#fff" />} />}
				component={
					<SvgWrapper style={{width: 30 * DP, height: 80 * DP}} svg={<DropdownMeatball fill={isMeatballOpen ? MAINCOLOR : GRAY_MEATBALL} />} />
				}
			/>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 120 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
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
	meatballContainer: {
		width: 40 * DP,
		height: 80 * DP,
		// backgroundColor:'yellow',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonMeatBall: {
		width: 32 * DP,
		height: 8 * DP,
	},
	meatballDropdown: {
		width: 300 * DP,
		height: 180 * DP,
		backgroundColor: '#FFF',
		marginLeft: -260 * DP,
		borderRadius: 30 * DP,
		borderTopRightRadius: 0,
		justifyContent: 'center',
	},
	meatballListBackGround: {
		height: 100 * DP,
		// backgroundColor:'red'
	},
	meatballListContainer: {
		height: 100 * DP,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	noto40b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40 * DP,
		lineHeight: 60 * DP,
	},
	noto28: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 40 * DP,
	},
	roboto40b: {
		fontFamily: 'Roboto-Bold',
		fontSize: 40 * DP,
	},
});
