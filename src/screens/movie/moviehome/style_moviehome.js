import {StyleSheet} from 'react-native';
import DP from 'Screens/dp';

export const lo = StyleSheet.create({
	wrp_main: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	wrp_cnts:{
		flex:1,
		// backgroundColor:'cyan',
	},
	sctn: {
		// backgroundColor: 'blue', 
		height: 610 * DP
	},
	lnb: {
		
		height: 176 * DP,
		width: 750 * DP,
		marginVertical: 40 *DP
	},
	
});


export const sctn = StyleSheet.create({
	img_thumb:{
		
		height: 422*DP
	},
	cntr_playtime:{
		backgroundColor:'black',
		height:28*DP,
		position:'absolute',
		right:10*DP,
		bottom:11*DP,
		borderRadius:10*DP,
		paddingHorizontal:6*DP,
		
	},
	cntr_info:{
		height:188*DP,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
		
	},
	cntr_userimg:{
		height:100*DP,
		width:100*DP,
		borderRadius:100*DP,
		marginRight:20*DP
	},
	wrp_txt:{
		width:534*DP,
		height:128*DP,
		flexDirection:'row',
		flexWrap:'wrap',
		
	},
	cntr_title:{
		width:'100%',
		height:92*DP
	},
	cntr_userid:{
		height:36*DP,
		width:310*DP
	},
	cntr_popularity:{
		height:36*DP,
		width:198*DP,
		position:'absolute',
		right:0,
		bottom:0,
		flexDirection:'row',
		alignItems:'center',
	},
	cntr_icon:{
		marginLeft:6*DP,
		marginRight:30*DP
	}
})


export const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 13,
		lineHeight: 36*DP,
	},
	noto28rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 15.4,
		lineHeight: 38*DP,
	},
	noto30b:{
		fontFamily:'NotoSansKR-Regular',
		fontSize:16.5,
		lineHeight:46*DP
	},
	roboto30bold: {
		fontFamily: 'Roboto-Bold',
		fontSize: 16.5,
	},
   roboto24r:{
      fontFamily:'Roboto-Regular',
      fontSize: 13,
      lineHeight: 30*DP,
   },
	roboto22r:{
		fontFamily:'Roboto-Regular',
      fontSize: 11.5,
		lineHeight: 28*DP,
	},
	bold40: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 22,
	},
	bold28: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 15.4,
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

