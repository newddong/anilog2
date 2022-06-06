import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import UserAccount from 'Organism/listitem/UserAccount';
import {BGCOLOR} from '../style_organism copy';

/**
 * 친구 즐겨찾기 Hash와 유저오브젝트 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 친구 아이템 데이터
 * @param {void} props.onClickLabel - 친구 라벨 클릭
 * @param {void} props.onClickHash - 리스트가 해쉬일 경우 해쉬 클릭
 * @param {void} props.onClickFollow - 팔로우, 팔로잉 버튼 클릭
 * @param {void} props.onCheckBox - 선택 체크박스 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default= false)
 * @param {boolean} props.showFollowBtn - 선택 삭제 모드 여부 (default= false)
 * @param {(component)=> void} props.whenEmpty - 빈 값 발생 시 출력 컴포넌트
 */
export default AccountHashList = props => {
	// console.log('props Account List', props);
	const renderItem = ({item, index}) => {
		return (
			<View style={[accountHashList.userAccount, {}]}>
				<UserAccount
					data={item}
					checkBoxMode={props.checkBoxMode}
					onLabelClick={item => props.onClickLabel(item, index)}
					onHashClick={() => props.onClickHash(item)}
					onClickFollow={() => props.onClickFollow(item)}
					onCheckBox={e => props.onCheckBox(e, index)}
					showFollowBtn={props.showFollowBtn}
				/>
			</View>
		);
	};

	const ITEM_HEIGHT = 134 * DP;

	return (
		<View style={[accountHashList.container, {}]}>
			<FlatList
				data={props.data}
				keyExtractor={item => item._id}
				getItemLayout={(data, index) => {
					if (!data[index]) return {length: 0, offset: 0, index: index};
					return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index: index};
				}}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={props.whenEmpty}
			/>
		</View>
	);
};

AccountHashList.defaultProps = {
	items: [],
	onClickLabel: e => console.log(e), // UserAccount의 UserDescriptionLabel 클릭
	onClickHash: e => console.log(e), // U
	onClickFollow: e => console.log(e), //
	onCheckBox: e => console.log(e),
	checkBoxMode: false, // CheckBox 콘테이너 Show T/F
	showFollowBtn: false,
	whenEmpty: () => {
		return <></>;
	},
};

const accountHashList = StyleSheet.create({
	container: {
		width: 694 * DP,
		alignItems: 'center',
		paddingTop: 20 * DP,
		// backgroundColor: BGCOLOR,
		alignSelf: 'center',
	},
	userAccount: {
		width: 694 * DP,
		height: 134 * DP,
		// marginBottom: 40 * DP,
	},
});
