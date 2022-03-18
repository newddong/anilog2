import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import CheckBox from 'Molecules/select/CheckBox';
import {userAccount} from 'Organism/style_organism copy';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {GRAY10, APRI10, BLACK} from 'Root/config/color';
import {getTimeLapsed} from 'Root/util/dateutil';
import {ProfileDefaultImg} from 'Root/component/atom/icon';
/**
 * 쪽지 썸네일 객체
 * @param {object} props - Props Object
 * @param {object} props.data - 쪽지 아이템 데이터
 * @param {void} props.onLabelClick - 쪽지 라벨 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default = false)
 * @param {boolean} props.checkBoxState - 선택 여부 (default = false)
 */
const UserNote = props => {
	// console.log('UserAccount item', props.data);
	const data = props.data;
	console.log('time', data.memobox_date);
	console.log('getTime', getTimeLapsed(data.memobox_date));
	console.log('UserNote props', data);

	return (
		<View style={[styles.userNoteContainer]}>
			{props.checkBoxMode ? (
				<View style={[userAccount.checkBox]}>
					<CheckBox
						state={props.data.checkBoxState}
						onCheck={() => props.onCheckBox(props.data.type == 'HashTagObject' ? props.data.keyword : props.data.user_nickname)}
					/>
				</View>
			) : (
				false
			)}
			{/* 메모 썸네일 객체 */}
			<View style={[styles.userNoteContainer]}>
				<TouchableOpacity onPress={() => props.onLabelClick(data)}>
					<View style={[styles.userNoteThumbnail]}>
						{data.opponent_user_profile_uri != undefined ? (
							<Image source={{uri: data.opponent_user_profile_uri}} style={[styles.img_round_94]} />
						) : (
							<ProfileDefaultImg size={styles.img_round_94} />
						)}

						<View style={{marginLeft: 30 * DP}}>
							<View style={{flexDirection: 'row'}}>
								<Text style={[txt.roboto28b, {color: BLACK}, {lineHeight: 44 * DP}]} numberOfLines={1} ellipsizeMode="tail">
									{data.opponent_user_nickname || ''}
								</Text>
								{/* {data.showStatus ? <Text style={[txt.noto22, {color: APRI10, alignSelf: 'center', paddingLeft: 10 * DP}]}> STATUS</Text> : null} */}
							</View>
							{data.memobox_contents ? (
								<View style={[props.checkBoxMode ? {width: 450 * DP} : {width: 530 * DP}, {flexDirection: 'row'}]}>
									<View style={[props.checkBoxMode ? {width: 328 * DP} : {width: 408 * DP}, {marginRight: 12 * DP}]}>
										<Text
											style={[
												txt.noto28,
												{
													lineHeight: 44 * DP,
													color: GRAY10,
													maxWidth: 440 * DP,
												},
											]}
											numberOfLines={1}
											ellipsizeMode="tail">
											{data.memobox_contents || ''}
										</Text>
									</View>
									<View style={styles.timeBeforeContainer}>
										<Text style={[txt.noto26, {color: GRAY10}]}>{data.memobox_date && getTimeLapsed(data.memobox_date)}</Text>
									</View>
								</View>
							) : (
								<></>
							)}
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	userNoteContainer: {
		height: 94 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#F2C2C2',
	},
	userNoteThumbnail: {
		height: 94 * DP,
		// width: 654 * DP,
		flexDirection: 'row',
	},
	img_round_94: {
		width: 94 * DP,
		height: 94 * DP,
		borderRadius: 500,
	},
	noteContainer: {
		flexDirection: 'row',
		width: 530 * DP,
		height: 44 * DP,
		backgroundColor: '#F2C2C2',
		alignItems: 'center',
	},
	messageContainer: {},
	timeBeforeContainer: {
		width: 110 * DP,
		height: 44 * DP,
		// backgroundColor: 'yellow',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
});

UserAccount.defaultProps = {
	onLabelClick: e => console.log(e),
	onClickFollow: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false,
	checkBoxState: false,
	showFollowBtn: false,
};

export default UserNote;
