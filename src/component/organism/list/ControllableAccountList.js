import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ControllableAccount from 'Organism/listitem/ControllableAccount';
import ListEmptyInfo from 'Molecules/info/ListEmptyInfo';
import {controllableAccountList} from 'Organism/style_organism copy';
import DP from 'Root/config/dp';

/**
 * 사용자 목록 리스트
 * @param {Object} props.items - 계정 목록
 * @param {string} props.listEmptyText - 빈 리스트 일때의 안내문
 * @param {void} props.onClickAccount - 계정 클릭 콜백
 * @param {void} props.onClickFollowBtn - 계정 팔로우 버튼 클릭
 * @param {void} props.onClickUnFollowBtn - 계정 언팔로우 버튼 클릭
 * @param {void} props.onPressCrossMark - 크로스 마크 클릭
 * @param {boolean} props.showButtons - 버튼 유무
 * @param {boolean} props.showCheckBox - 체크박스 유무
 * @param {boolean} props.showCrossMark - 크로스 유무
 * @param {boolean} props.showFollowStatusText - 팔로잉 상태 표시 유무
 * @param {string} props.title - 제목
 * @param {number} props.width - width

 */
export default ControllableAccountList = props => {
	const [selectedItem, setSelectedItem] = React.useState(0);
	//AccountList 선택이벤트
	const onSelectItem = (item, index) => {
		props.onClickAccount(item, index);
		setSelectedItem(index);
	};

	//지우기 버튼 클릭
	const onPressCrossMark = index => {
		props.onPressCrossMark(index);
	};

	//팔로우 OR 팔로잉버튼 클릭
	const onClickFollowBtn = (item, index) => {
		props.onClickFollowBtn(item, index);
	};

	const onClickUnFollowBtn = (item, index) => {
		props.onClickUnFollowBtn(item, index);
	};

	const renderItem = ({item, index}) => {
		return (
			<View style={[selectedItem == index ? controllableAccountList.selectedItem : controllableAccountList.no_selectedItem]}>
				<ControllableAccount
					data={item}
					showCrossMark={props.showCrossMark}
					showCheckBox={props.showCheckBox}
					showButtons={props.showButtons}
					onClickLabel={() => onSelectItem(item, index)}
					onPressCrossMark={() => onPressCrossMark(index)}
					onClickFollowBtn={() => onClickFollowBtn(item, index)}
					onClickUnFollowBtn={() => onClickUnFollowBtn(item, index)}
					showFollowStatusText={props.showFollowStatusText}
					width={props.width}
				/>
			</View>
		);
	};

	const ITEM_HEIGHT = 68 + 40 * (1 / DP);

	return (
		<ScrollView horizontal={false} scrollEnabled={false}>
			<ScrollView horizontal={true} scrollEnabled={false}>
				<View style={[controllableAccountList.container]}>
					{props.title == null ? null : (
						<View style={[controllableAccountList.title]}>
							<Text style={[txt.noto24, {color: GRAY10, alignSelf: 'flex-start'}]}>{props.title}</Text>
						</View>
					)}
					<View style={{alignItems: 'center'}}>
						<FlatList
							data={props.items}
							scrollEnabled={false}
							renderItem={renderItem}
							keyExtractor={item => item._id}
							getItemLayout={(data, index) => {
								if (!data[index]) return {length: 0, offset: 0, index: index};
								return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index: index};
							}}
							ListEmptyComponent={<ListEmptyInfo paddingVertical={540 * DP} text={props.listEmptyText} />}
						/>
					</View>
				</View>
			</ScrollView>
		</ScrollView>
	);
};

ControllableAccountList.defaultProps = {
	items: [],
	onClickAccount: e => console.log(e),
	onClickFollowBtn: e => {},
	onClickUnFollowBtn: e => {},
	onPressCrossMark: e => console.log('onPressCrossMark ,', e),
	title: null,
	showCrossMark: false,
	showCheckBox: false,
	showFollowStatusText: true,
	listEmptyText: '목록이 없습니다.',
};
