import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import DP from 'Screens/dp';
import FastImage from 'react-native-fast-image';
import {txt} from 'Screens/textstyle';

export default  React.memo(UserListItem = ({style, data, onSelect}) => {
   const handleSelect = () => {
      onSelect&&onSelect(data);
   }
	return (
		<View style={style}>
			<TouchableWithoutFeedback onPress={handleSelect}>
				<View style={layout.wrap_item}>
					<FastImage style={layout.photo_user} source={{uri: data.profileImgUri}} />
					<View>
						<Text style={[txt.roboto28b, {lineHeight: 42 * DP}]}>{data.nickname}</Text>
						<Text style={[txt.noto24, txt.gray, {lineHeight: 35 * DP}]}>{data.text_intro}</Text>
						{false&&<Text style={[txt.noto22, txt.gray, {lineHeight: 32 * DP}]}>팔로우중</Text>}
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
});

UserListItem.defaultProps = {
	style: {},
   onSelect:()=>{},
};

const BOXCOLOR = false;

const layout = StyleSheet.create({
	wrap_item: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: BOXCOLOR && 'green',
		height: 110 * DP,
	},

	photo_user: {
		width: 94 * DP,
		height: 94 * DP,
		borderRadius: 47 * DP,
		marginRight: 30 * DP,
		backgroundColor: BOXCOLOR && 'red',
	},
});
