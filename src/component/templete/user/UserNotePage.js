import React from 'react';
import {View, StyleSheet, Image, ActivityIndicator, ScrollView} from 'react-native';
import DP from 'Root/config/dp';
import {WHITE} from 'Root/config/color';
import NoteMessageList from 'Component/organism/list/NoteMessageList';
import {getMemoBoxWithReceiveID} from 'Root/api/userapi';
import {useNavigation} from '@react-navigation/native';
import ReplyWriteBox from 'Component/organism/input/ReplyWriteBox';
import {useKeyboardBottom} from 'Component/molecules/input/usekeyboardbottom';
import {createMemoBox} from 'Root/api/userapi';
/**
 * 쪽지 썸네일 객체
 * @param {object} props - Props Object
 * @param {object} props._id - 대화 상대 id
 * @param {void} props.onLabelClick - 쪽지 라벨 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default = false)
 * @param {boolean} props.checkBoxState - 선택 여부 (default = false)
 */
const UserNotePage = ({route}) => {
	// console.log('userNotePage', route.params);
	const keyboardY = useKeyboardBottom(0 * DP);
	const navigation = useNavigation();
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const input = React.useRef();
	const [content, setContent] = React.useState('');
	const [sent, setSent] = React.useState(false);
	// console.log('data', data);

	React.useLayoutEffect(() => {
		navigation.setOptions({tabBarVisible: false});
	}, []);

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
	}, [sent]);

	const [heightReply, setReplyHeight] = React.useState(0);

	const onReplyBtnLayout = e => {
		setReplyHeight(e.nativeEvent.layout.height);
	};

	const onWrite = () => {
		if (content.trim() == '') return Modal.popOneBtn('채팅을 입력하세요.', '확인', () => Modal.close());
		createMemoBox(
			{memobox_receive_id: route.params._id, memobox_contents: content},
			result => {
				console.log('message Sent', result);
				setSent(!sent);
			},
			err => {
				'message Sent err', err;
			},
		);
		setContent('');
	};

	const onChangeReplyInput = text => {
		setContent(text);
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[styles.container]}>
				<View style={[styles.messageContainer]}>
					<NoteMessageList data={data} />
				</View>
				<View style={[{position: 'absolute', bottom: keyboardY}, {backgroundColor: WHITE}]} onLayout={onReplyBtnLayout}>
					<ReplyWriteBox onWrite={onWrite} onChangeReplyInput={onChangeReplyInput} ref={input} value={input} isMessage={true} />
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
		paddingVertical: 30 * DP,
		paddingBottom: 100 * DP,
		// height: 1150 * DP,
		// backgroundColor: 'yellow',
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
