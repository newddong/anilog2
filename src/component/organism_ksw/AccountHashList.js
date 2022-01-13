import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {accountHashList} from './style_organism';
import UserAccount from './UserAccount';

/**
 * 친구 즐겨찾기 Hash와 유저오브젝트 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 친구 아이템 데이터
 * @param {void} props.onClickLabel - 친구 라벨 클릭
 * @param {void} props.onClickHash - 리스트가 해쉬일 경우 해쉬 클릭
 * @param {void} props.onClickFollow - 팔로우, 팔로잉 버튼 클릭
 * @param {void} props.onCheckBox - 선택 체크박스 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default= false)
 */
export default AccountHashList = props => {
	// console.log('props', props.items.length);
	console.log(props.data);
	const renderItem = ({item, index}) => {
		return (
			<View style={[accountHashList.userAccount]}>
				<UserAccount
					data={item}
					checkBoxMode={props.checkBoxMode}
					onLabelClick={item => props.onClickLabel(item)}
					onHashClick={() => props.onClickHash(item)}
					onClickFollow={() => props.onClickFollow(item)}
					onCheckBox={e => props.onCheckBox(e, index)}
					showFollowBtn={props.showFollowBtn}
				/>
			</View>
		);
	};

	return (
		<View style={[accountHashList.container, {height: props.routeName&&props.routeName != 'SaveFavorite' ? 300 * DP : null}]}>
			<FlatList
				data={props.data}
				keyExtractor={item => item._id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
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
};
