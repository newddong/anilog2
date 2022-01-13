import {StyleSheet, Dimensions} from 'react-native';
import DP from 'Screens/dp';
import {BLACK, GRAY, GRAY_BRIGHT, GRAY_PLACEHOLDER, MAINCOLOR, SLIGHT_BLACK, LINK, WHITE, RED, GRAY_TXT_INPUT} from 'Screens/color';

export const lo = StyleSheet.create({
	wrp_main: {
		backgroundColor: '#fff',
		flex: 1,
	},
	cntr_footer:{
		paddingHorizontal:48*DP,
		
	},
	cntr_contents: {
		paddingTop: 20 * DP,
		paddingHorizontal: 48 * DP,
		// flex: 1,
	},
	cntr_tab: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10 * DP,
	},
	btn_tab: {
		width: 322 * DP,
		height: 56 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY_BRIGHT,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tab_selected: {
		backgroundColor: '#FF9888',
		borderWidth: 0,
	},
	cntr_msg: {
		flexDirection: 'row',
		marginBottom: 30 * DP,
	},
	cntr_form: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 70 * DP,
	},
	form_input: {
		borderColor: GRAY_BRIGHT,
		borderWidth: 2 * DP,
		width: 586 * DP,
		height: 56 * DP,
		marginRight: 18 * DP,
	},
	cntr_addr_result: {
		flex: 1,
		width: Dimensions.get('screen').width,
		// left: -48 * DP,
	},
	cntr_addr_result_stat:{
		paddingHorizontal:48*DP,
		height:60*DP,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	cntr_detail_addr: {
		marginTop: 70 * DP,
		marginBottom: 20 * DP,
	},
	cntr_btn: {
		alignItems: 'center',
		marginBottom: 80 * DP,
	},
	shadow: {
		backgroundColor:'#fff',
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

export const btn = StyleSheet.create({
	confirm_button: {
		width: 280 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30 * DP,
		backgroundColor: MAINCOLOR,
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
	scrolltop:{
		flexDirection:'row'
	}
});

export const item = StyleSheet.create({
	box_addr: {
		paddingHorizontal:48*DP,
		borderBottomColor:GRAY_BRIGHT,
		borderBottomWidth:2*DP,
		flexDirection:'row',
		alignItems:'center'
	},
	box_addr_result:{
		marginRight:10*DP,
		marginVertical:30*DP,
	},
	addr_detail:{
		flexDirection:'row',
		// alignItems:'center'
	},
	btn_check:{
		width:42*DP,
		height:42*DP,
		borderRadius:21*DP,
		borderWidth:2*DP,
		borderColor:GRAY_BRIGHT,
		justifyContent:'center',
		alignItems:'center',
		marginRight:10*DP,
	},
	btn_check_selected:{
		width:25.2*DP,
		height:25.2*DP,
		borderRadius:21*DP,
		backgroundColor:MAINCOLOR
	},
	icon_type:{
		backgroundColor:'#999999',
		width:58*DP,
		height:28*DP,
		borderRadius:18*DP,
		marginRight:2*DP,
		marginTop:6*DP,
		alignItems:'center'
	}
});

export const txt = StyleSheet.create({
	noto28: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
		includeFontPadding: false,
	},
	noto18: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 18 * DP,
		lineHeight: 28 * DP,
	},
	noto20: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 20 * DP,
	},
	noto24: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 42 * DP,
	},
	noto32: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 32 * DP,
		lineHeight: 42 * DP,
	},
	noto30: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 30 * DP,
		lineHeight: 42 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
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
	noto24b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 36 * DP,
	},
	roboto28: {
		fontFamily: 'Roboto-Regular',
		fontSize: 28 * DP,
	},
	roboto24: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24 * DP,
	},
	center: {
		textAlign: 'center',
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
	red: {
		color: RED,
	},
	maincolor: {
		color: MAINCOLOR,
	},
});
