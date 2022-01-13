import {StyleSheet} from 'react-native';
import DP from 'Screens/dp';

export const lo = StyleSheet.create({
   wrp_main:{
      flex:1,
      paddingHorizontal:48*DP,
      backgroundColor:'#FFF'
   },
   cntr_btn:{
      flexBasis:200*DP,
      paddingVertical:70*DP,
      alignItems:'center'
   }
   
});

export const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24*DP,
		lineHeight: 36*DP,
	},
	noto28rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28*DP,
		lineHeight: 38*DP,
	},
	noto30b:{
		fontFamily:'NotoSansKR-Bold',
		fontSize:30*DP,
		lineHeight:46*DP
	},
	roboto30bold: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30*DP,
	},
   roboto24r:{
      fontFamily:'Roboto-Regular',
      fontSize: 24*DP,
      lineHeight: 30*DP,
   },
	roboto22r:{
		fontFamily:'Roboto-Regular',
      fontSize: 22*DP,
		lineHeight: 28*DP,
	},
	bold40: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40*DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28*DP,
		lineHeight: 36*DP,
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
	white:{
		color: '#FFFFFF',
		
	},
});