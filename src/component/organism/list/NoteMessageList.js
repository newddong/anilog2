import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet} from 'react-native';
import UserAccount from 'Organism/listitem/UserAccount';
import {accountHashList} from 'Organism/style_organism copy';
import OneMessage from 'Organism/listitem/OneMessage';

/**
 * 쪽지 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 쪽지 데이터
 * @param {void} props.onClickLabel - 쪽지 라벨 클릭
 * @param {void} props.onCheckBox - 선택 체크박스 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default= false)
 * @param {boolean} props.showFollowBtn - 선택 삭제 모드 여부 (default= false)
 */
const NoteMessageList = props => {
	// console.log('NoteMessageList props', props.data);
	const flatlistRef = React.useRef();

	React.useEffect(() => {
		setTimeout(
			() =>
				flatlistRef.current.scrollToIndex({
					animated: true,
					index: props.data.length - 1,
				}),
			500,
		);
		// flatlistRef.current?.scrollToIndex({index: props.data.length - 1, animated: true});
	}, []);
	const renderItem = ({item, index}) => {
		// console.log('item', item);
		//쪽지부분 정책 결정 필요
		return (
			<View style={[styles.messageItemContainer]}>
				<OneMessage data={item} />
				{/* <UserNote
					data={item}
					checkBoxMode={props.checkBoxMode}
					onLabelClick={item => props.onClickLabel(item)}
					onCheckBox={e => props.onCheckBox(e, index)}
				/> */}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* <Text>쪽지 내용 리스트 나오는 화면</Text> */}
			<FlatList data={props.data} keyExtractor={item => item._id} renderItem={renderItem} showsVerticalScrollIndicator={false} ref={flatlistRef} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 1230 * DP,
	},
	messageItemContainer: {
		width: 750 * DP,
		marginBottom: 30 * DP,
		// minHeight: 1150 * DP,
	},
});

export default NoteMessageList;
