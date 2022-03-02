import React from 'react';
import {Text, TextInput, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {AlarmBadger48, Search48, BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {WHITE, APRI10} from 'Root/config/color';
import Modal from 'Root/component/modal/Modal';

export default ConfirmHeader = ({navigation, route, options, back}) => {
	const navState = navigation.getState();
	const prevRoute = navState.routes[navState.index - 1];
	const confirm = () => {
		navigation.navigate(prevRoute);
		// alert('Confirm');
	};
	const warnGoback = () => {
		console.log(prevRoute);
		let count = prevRoute.params.feed_medias?.reduce((a, c) => {
			return a + c.tags.length;
		}, 0);
		console.log(count);
		if (count > 0) {
			Modal.popTwoBtn(
				'진행사항이 취소됩니다.',
				'취소',
				'확인',
				() => {
					Modal.close();
				},
				() => {
					Modal.close();
					prevRoute.params.feed_medias?.map(v => {
						v.tags = [];
					});
					navigation.goBack();
				},
			);
		} else {
			navigation.goBack();
		}
	};

	const test = () => {
		console.log(navigation.getState());
	};
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={warnGoback}>
				<View style={style.backButtonContainer}>
					<BackArrow32 />
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={confirm}>
				<View style={style.buttonContainer}>
					<Text style={[txt.noto36b, {color: APRI10, lineHeight: 56 * DP}]}>확인</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 67 * DP,
		marginBottom: 22 * DP,
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
	backButtonContainer: {
		width: 80 * DP,
		height: 66 * DP,
		justifyContent: 'center',
		// backgroundColor:'red',
		marginBottom: 18 * DP,
	},
});
