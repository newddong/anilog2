import React, {useState, useRef, useEffect} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

import {SearchIcon} from 'Asset/image';
import Backbutton from 'Screens/header/icon_back.svg';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import SearchContext from './searchcontext';
// import { CommonActions } from '@react-navigation/native';
// import { useNavigationState } from '@react-navigation/native';

export default SearchHeader = (props) => {
	
	
	return (
		<SearchContext.Consumer>
			{({setInput,releaseInput})=><Inside {...props} setInput={setInput} releaseInput={releaseInput}/>}
		</SearchContext.Consumer>
	);
};

const Inside = ({scene, previous, navigation,setInput,releaseInput}) => {


	return (
		<View style={[style.headerContainer]}>
			<TouchableWithoutFeedback onPress={navigation.goBack}>
				<SvgWrapper style={{width: 32 * DP, height: 32 * DP}} svg={<Backbutton />} />
			</TouchableWithoutFeedback>
			<View style={style.cntr_txtinput}>
				<TextInput style={[style.input_txt]} placeholder={'검색'}
					// onBlur={()=>{navigation.navigate('HealthMovie',{test:0})}} onFocus={()=>{navigation.navigate('HealthMovie',{test:1})}}
					onBlur={releaseInput} onFocus={setInput}
				></TextInput>
				<TouchableWithoutFeedback onPress={() => alert('검색')}>
					<SvgWrapper style={[style.searchbtn]} svg={<SearchIcon />} />
				</TouchableWithoutFeedback>
			</View>
			{/* <View style={style.searchbtn}/> */}
		</View>
	);

}





const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 132 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
	},
	cntr_txtinput: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 594 * DP,
		justifyContent: 'space-between',
		// backgroundColor:'red',
		height: 80 * DP,
		backgroundColor: '#fff',
		borderColor: '#DBDBDB',
		borderWidth: 2 * DP,
		borderRadius: 30 * DP,
		// marginRight:-88*DP,
	},
	input_txt: {
		width: 490 * DP,
		height: 80*DP,
		paddingLeft: 20 * DP,
		paddingVertical:0*DP,
		borderWidth:0,
		includeFontPadding:false,
	},
	searchbtn: {
		width: 48 * DP,
		height: 48 * DP,
		// position:'absolute',
		// marginLeft:-48*DP,
		marginRight: 20 * DP,
		right: 0,
		bottom: 0,
	},
	backbutton: {
		fontSize: 100 * DP,
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
	noto40b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40 * DP,
		lineHeight: 60 * DP,
	},
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 48 * DP,
	},
});
