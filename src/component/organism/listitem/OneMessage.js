import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, Image} from 'react-native';
import UserAccount from 'Organism/listitem/UserAccount';
import {accountHashList} from 'Organism/style_organism copy';
import UserNote from '../listitem/UserNote';
import DP from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10, GRAY20, GRAY30, TEXTBASECOLOR, WHITE} from 'Root/config/color';
import {ProfileDefaultImg} from 'Component/atom/icon';
import {getTimeLapsed} from 'Root/util/dateutil';
const OneMessage = props => {
	console.log('NoteMessageList props', props.data);
	const data = props.data;
	//사용자가 보낸메세지 일때
	if (userGlobalObject.userInfo._id == data.memobox_send_id._id) {
		return (
			<View style={[{alignItems: 'center'}]}>
				<View style={styles.messageContainer}>
					<View style={styles.sendMessageContainer}>
						<View style={[{flexDirection: 'row'}]}>
							<Text style={styles.timeTextLeft}>{data.memobox_date && getTimeLapsed(data.memobox_date)}</Text>
							<View style={styles.sendMessageBox}>
								<Text style={[txt.noto28, {color: WHITE}]}>{data.memobox_contents}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
	//사용자가 받은 메세지 일때
	else {
		return (
			<View style={[{alignItems: 'center'}]}>
				<View style={styles.messageContainer}>
					<View style={styles.receivedMessageContainer}>
						<View style={[{marginRight: 32 * DP}]}>
							{data.memobox_send_id.user_profile_uri != undefined ? (
								<Image source={{uri: data.memobox_send_id.user_profile_uri}} style={[styles.img_round_80]} />
							) : (
								<ProfileDefaultImg size={styles.img_round_80} />
							)}
						</View>

						<View>
							<Text style={[[txt.noto24], {marginBottom: 14 * DP}, {marginTop: 3 * DP}]}>{data.memobox_send_id.user_nickname}</Text>
							<View style={[{flexDirection: 'row'}]}>
								<View style={styles.receivedMessageBox}>
									<Text style={[txt.noto28]}>{data.memobox_contents}</Text>
								</View>
								<Text style={styles.timeTextRight}>{data.memobox_date && getTimeLapsed(data.memobox_date)}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
};
const styles = StyleSheet.create({
	messageContainer: {
		width: 654 * DP,
	},
	sendMessageContainer: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		alignContent: 'center',
		// backgroundColor: 'yellow',
	},
	receivedMessageContainer: {
		alignItems: 'flex-start',
		alignContent: 'center',
		// backgroundColor: 'yellow',
		flexDirection: 'row',
	},
	receivedMessageBox: {
		padding: 20 * DP,
		backgroundColor: GRAY30,
		borderTopRightRadius: 30 * DP,
		borderBottomEndRadius: 30 * DP,
		borderBottomLeftRadius: 30 * DP,
		maxWidth: 450 * DP,
	},
	sendMessageBox: {
		padding: 20 * DP,
		backgroundColor: APRI10,
		borderBottomEndRadius: 30 * DP,
		borderBottomLeftRadius: 30 * DP,
		borderTopLeftRadius: 30 * DP,
		maxWidth: 450 * DP,
	},
	img_round_80: {
		width: 80 * DP,
		height: 80 * DP,
		borderRadius: 500,
	},
	timeTextRight: {
		...txt.noto24,
		alignSelf: 'flex-end',
		marginLeft: 14 * DP,
		color: GRAY10,
		marginBottom: 3 * DP,
	},
	timeTextLeft: {
		...txt.noto24,
		alignSelf: 'flex-end',
		marginRight: 14 * DP,
		color: GRAY10,
		marginBottom: 3 * DP,
	},
});

OneMessage.defaultProps = {
	items: [],
};

export default OneMessage;
