import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import {getAllAnnouncement} from 'Root/api/announcement';
import {FlatList} from 'react-native-gesture-handler';
/**
 * touch하면 회색 text나오는
 *
 * @param {boolean} status - 답변 완료 text 출현 여부
 * @param {string} uptitle - 위 text
 * @param {string} downtitle - 아래 text
 * @param {string} contents - 내용
 * @param {boolean} answered - true- 답변완료 false - 미답변
 */
const OneNotice = props => {
	const [pressed, setPressed] = React.useState(false);

	const onPressNotice = () => {
		console.log('pressed');
		setPressed(!pressed);
	};
	return (
		<View style={[styles.noticeContainer]}>
			<TouchableOpacity onPress={onPressNotice}>
				<View style={[{flexDirection: 'row'}]}>
					<View style={[{width: 564 * DP}]}>
						<Text style={[styles.dataText, txt.noto26, {color: GRAY20}]}>{props.uptitle}</Text>
						<Text style={[styles.titleText, txt.noto30]}>{props.downtitle}</Text>
					</View>
					{props.status ? (
						<View style={[{justifyContent: 'center'}]}>
							{props.answered ? (
								<Text style={[txt.noto30, {color: APRI10}]}>답변완료</Text>
							) : (
								<Text style={[txt.noto30, {color: GRAY10}]}>미답변</Text>
							)}
						</View>
					) : (
						<></>
					)}
				</View>
			</TouchableOpacity>
			{pressed ? (
				<View style={styles.noticeDetailContainer}>
					<Text style={[styles.detailText]}>{props.contents}</Text>
				</View>
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	noticeContainer: {
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	dataText: {
		marginTop: 30 * DP,
		marginHorizontal: 48 * DP,
	},
	titleText: {
		marginBottom: 30 * DP,
		marginHorizontal: 48 * DP,
	},
	noticeDetailContainer: {
		backgroundColor: GRAY40,
	},
	detailText: {
		marginBottom: 40 * DP,
		marginHorizontal: 48 * DP,
		marginTop: 40 * DP,
	},
});

OneNotice.defaultProps = {
	status: false,
};

export default OneNotice;
