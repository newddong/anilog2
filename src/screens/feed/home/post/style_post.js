import {StyleSheet} from 'react-native';
import {MAINCOLOR} from 'Root/screens/color';
import DP from 'Screens/dp';

const BOXCOLOR = false;

export const lo = StyleSheet.create({
	cntr_contents: {
		marginBottom: 0 * DP,
		backgroundColor: BOXCOLOR && 'green',
	},
	cntr_info_user: {
      paddingHorizontal:48*DP,
		height: 78 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: BOXCOLOR && 'yellow',
	},
	cntr_txt: {
      paddingHorizontal:48*DP,
		marginTop: 20 * DP,
		backgroundColor: BOXCOLOR && 'gold',
	},
	cntr_photo: {
		height: 750 * DP,
		flexDirection: 'row',
		marginTop: 20 * DP,
	},
	photo: {
		// width: 654*DP,
		flex: 1,
	},
	cntr_comment: {
		height: 230 * DP,
		marginTop: 20 * DP,
		backgroundColor: BOXCOLOR && 'blue',
	},
	cntr_txt_footer: {
      paddingHorizontal:48*DP,
		height: 40 * DP,
		backgroundColor: BOXCOLOR && 'yellow',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export const btn = StyleSheet.create({
	btn_moreContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export const comment = StyleSheet.create({
	buttonContainer: {
      paddingHorizontal:48*DP,
		alignItems: 'center',
		height: 48 * DP, //-12
		flexDirection: 'row',
      justifyContent:'space-between',
		backgroundColor: BOXCOLOR && 'yellow',
	},
	commentContainer: {
		backgroundColor: BOXCOLOR && 'gold',
	},
	infoContainer: {
		flexDirection: 'row',
		// position: 'absolute',
		alignItems: 'center',
		right: 10 * DP,
	},
	iconContainer: {
		flexDirection: 'row',
		width: 48 * DP,
		height: 48 * DP,
		marginRight: 12 * DP,
		marginLeft: 24 * DP,
		backgroundColor: BOXCOLOR && 'blue',
	},
	iconHitBox: {
		width: 48 * DP,
		height: 48 * DP,
		backgroundColor: BOXCOLOR && 'white',
		alignItems: 'center',
		justifyContent: 'center',
		// marginRight: 4 * DP,
	},
	comment: {
		width: 558 * DP,
		flexDirection: 'row',
	},
	userId: {
		paddingTop: 6 * DP,
		marginRight: 20 * DP,
	},
	viewAll: {
		justifyContent: 'flex-end',
		right: 0,
	},
	reply: {
		paddingLeft: 114 * DP,
	},
	replyicon: {
		width: 14 * DP,
		height: 14 * DP,
		marginTop: 14 * DP,
		marginRight: 8 * DP,
	},
});

export const userinfo = StyleSheet.create({
	photo: {
		width: 70 * DP,
		height: 70 * DP,
		borderRadius: 70 * DP,
	},
	cntr_info_user: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	grp_info: {
		width: 414 * DP,
		height: '100%',
		marginLeft: 20 * DP,
	},
	meatBallMenu: {
		width: 30 * DP,
		height: 80 * DP,
      // marginLeft:12*DP,
		position: 'absolute',
		right: 58 * DP,
	},
	meatballDropdown: {
		width: 300 * DP,
		// height:360*DP,
		backgroundColor: '#FFF',
		marginLeft: -270 * DP,
		borderRadius: 30 * DP,
		borderTopRightRadius: 0,
		justifyContent: 'center',
		backgroundColor: BOXCOLOR && 'green',
	},
	meatballListBackGround: {
		// height:300*DP,
		// backgroundColor:BOXCOLOR&&'red'
		// left:70*DP,
		// position:'absolute',
		backgroundColor:  BOXCOLOR && 'red',
	},
	meatballListContainer: {
		// height:300*DP,
		// backgroundColor:'#fff',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 4,
	},
	memark: {
		width: 40 * DP,
		height: 26 * DP,
		position: 'absolute',
		backgroundColor: MAINCOLOR,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 0,
		borderRadius: 10 * DP,
		left: 30 * DP,
	},
	temp_shelter: {
		marginLeft: 24 * DP,
		width: 64 * DP,
		height: 38 * DP,
      borderWidth:2*DP,
      borderColor:MAINCOLOR,
      borderRadius:10*DP,
      alignItems:'center'
	},
});

export const txt = StyleSheet.create({
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 38 * DP,
	},
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 38 * DP,
	},
	roboto30b: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30 * DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24 * DP,
		lineHeight: 30 * DP,
	},
	noto40b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 38 * DP,
	},
	aligncenter: {
		textAlign: 'center',
	},
	link: {
		color: '#007EEC',
	},
	gray: {
		color: '#767676',
	},
	white: {
		color: '#FFFFFF',
	},
	red: {
		color: 'red',
	},
});
