import {StyleSheet} from 'react-native';
import {MAINCOLOR, LINK, GRAY, GRAY_TXT_INPUT, GRAY_PLACEHOLDER, WHITE, RED, GRAY_BRIGHT} from '../color';
import DP from 'Screens/dp';

export const buttonstyle = StyleSheet.create({
	notcheckButton: {
		width: 50 * DP,
		height: 50 * DP,
		borderRadius: 25 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY_PLACEHOLDER,
		marginRight: 12 * DP,
	},
	checkedButton: {
		width: 50 * DP,
		height: 50 * DP,
		borderRadius: 25 * DP,
		marginRight: 12 * DP,
	},
	loginbutton: {
		height: 104 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30 * DP,
		backgroundColor: MAINCOLOR,
		marginBottom: 42 * DP,
	},
	socialAppsButton: {
		width: 80 * DP,
		height: 80 * DP,
		marginHorizontal: 15 * DP,
	},
	autologinButton: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginRight: 32 * DP,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		elevation: 2,
	},
});

export const textstyles = StyleSheet.create({
	noto28: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
		includeFontPadding: false,
	},
	noto24: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 42 * DP,
	},
	noto40b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40 * DP,
	},
	noto32b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 32 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
	},
	roboto28:{
		fontFamily:'Roboto-Regular',
		fontSize:28*DP,
	},
	center:{
		textAlign:'center',
	},
	link: {
		color: LINK,
	},
	gray: {
		color: GRAY,
	},
	white: {
		color: WHITE,
	},
	red:{
		color: RED,
	},
});

export const formstyles = StyleSheet.create({
	id_input: {
		width: '100%',
		height: 104 * DP,
		backgroundColor: GRAY_TXT_INPUT,
		paddingHorizontal: 24 * DP,
		paddingVertical: 30 * DP,
		marginBottom:20*DP,
	},
	pass_input: {
		width: '100%',
		height: 104 * DP,
		backgroundColor: GRAY_TXT_INPUT,
		paddingHorizontal: 24 * DP,
		paddingVertical: 30 * DP,
	},
	fail_msg:{
		borderTopColor:'red',
		borderTopWidth:2*DP,
		marginBottom:32*DP,
	},
	fail_description:{
		marginBottom:14*DP,
	},
	select_mobile:{
		flexDirection:'row',
		borderWidth:2*DP,
		borderColor:GRAY_BRIGHT,
		width:184*DP,
		alignItems:'center',
		justifyContent:'space-around'
	},
	input_mobile:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between'
	}
});

export const layoutstyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: WHITE,
	},
	contents: {
		flex: 1,
		flexDirection: 'column',
		width: '87%',
		backgroundColor: WHITE,
	},
	inputform: {
		marginBottom: 70 * DP,
	},
	textinputContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		
	},
	autologinContainer: {
		flexDirection: 'row',
	},
	socialLinkContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 22 * DP,
		flexDirection: 'row',
	},
	suggestion: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
	},
	container_recaptcha:{
		marginTop:40*DP,
		marginBottom:32*DP,
	},
	recaptcha:{
		backgroundColor:'yellow',
		marginBottom:24*DP,
		height:128*DP,
	}

});

export const verifyuser = StyleSheet.create({
	tab:{
		marginTop:190*DP,
		height:88*DP,
		flexDirection:'row',
		
	},
	btn_tab:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		borderWidth:2*DP,
		borderColor:MAINCOLOR
	},
	btn_tab_notselected:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		borderWidth:2*DP,
		borderColor:GRAY_BRIGHT
	},
	container_msg:{
		height:234*DP,
		justifyContent:'center',
		alignItems:'center'
	},
});