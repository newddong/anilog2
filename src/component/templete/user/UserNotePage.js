import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import CheckBox from 'Molecules/select/CheckBox';
import {userAccount} from 'Organism/style_organism copy';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {GRAY10, APRI10, BLACK, WHITE} from 'Root/config/color';
import {getTimeLapsed} from 'Root/util/dateutil';
import {textstyles} from '../style_templete';
import {ScrollView} from 'react-native-gesture-handler';
import NoteMessageList from 'Root/component/organism/list/NoteMessageList';
/**
 * 쪽지 썸네일 객체
 * @param {object} props - Props Object
 * @param {object} props.data - 쪽지 아이템 데이터
 * @param {void} props.onLabelClick - 쪽지 라벨 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default = false)
 * @param {boolean} props.checkBoxState - 선택 여부 (default = false)
 */
const UserNotePage = props => {
	// console.log('UserAccount item', props.data);
	const data = props.route.params.messageObject;
	console.log('====================================');
	console.log(data);
	console.log('====================================');
	return (
		<View style={styles.container}>
			<Text style={txt.noto24}>쪽지는 한 달 후에 자동 삭제됩니다.</Text>
			<View style={styles.messageContainer}>
				<NoteMessageList />
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: WHITE,
	},
	messageContainer: {
		marginTop: 30 * DP,
	},
});

// Us.defaultProps = {
// 	onLabelClick: e => console.log(e),
// 	onClickFollow: e => console.log(e),
// 	onCheckBox: e => console.log(e),
// 	checkBoxMode: false,
// 	checkBoxState: false,
// 	showFollowBtn: false,
// };

export default UserNotePage;
