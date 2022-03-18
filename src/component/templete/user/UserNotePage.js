import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
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
import {getMemoBoxWithReceiveID} from 'Root/api/userapi';
import {useNavigation} from '@react-navigation/native';
/**
 * 쪽지 썸네일 객체
 * @param {object} props - Props Object
 * @param {object} props._id - 대화 상대 id
 * @param {void} props.onLabelClick - 쪽지 라벨 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default = false)
 * @param {boolean} props.checkBoxState - 선택 여부 (default = false)
 */
const UserNotePage = ({route}) => {
	console.log('userNotePage', route.params);
	const navigation = useNavigation();
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		getMemoBoxWithReceiveID(
			{user_object_id: route.params._id},
			result => {
				// console.log('result', result.msg);
				setData(result.msg);
				setLoading(false);
			},
			err => {
				console.log('err', err);
			},
		);
	}, []);
	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.messageContainer}>
					<NoteMessageList data={data} />
				</View>
			</View>
		);
	}
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
