import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Bracket} from 'Asset/image';
import DP, {svg_size} from 'Screens/dp';

export default ActivityRequestItem = () => {
	return (
		<View style={style.wrp_item}>
			<View style={style.req_status}>
				<Text style={[txt.noto24r,txt.gray]}>후원 신청중</Text>
				<Text style={[txt.noto24b]}>[콜라] 경기도 하남시 / 미미미 보호소</Text>
			</View>
         <View style={style.btn_detail}>
					<Text style={[txt.noto24r,txt.gray]}>신청 접수중</Text>
					<View style={style.icon_size}>
						<Bracket {...svg_size} fill="gray" />
					</View>
				</View>
		</View>
	);
};

const style = StyleSheet.create({
	wrp_item: {
      flexDirection:'row'
	},
	req_status: {
      flexBasis:463*DP,
   },
   btn_detail:{
      flexGrow:1,
      flexDirection: 'row',
      justifyContent:'flex-end',
		alignItems: 'flex-end',

   },
   icon_size:{
      width:48*DP,
      height:48*DP,
   }
});

export const txt = StyleSheet.create({
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24*DP,
		lineHeight: 42 * DP,
	},
	noto24b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 24*DP,
		lineHeight: 42 * DP,
	},
	gray: {
		color: '#767676',
	},
});