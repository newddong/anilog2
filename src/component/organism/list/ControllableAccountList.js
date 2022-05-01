import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ControllableAccount from 'Organism/listitem/ControllableAccount';
import ListEmptyInfo from 'Molecules/info/ListEmptyInfo';
import {controllableAccountList} from 'Organism/style_organism copy';

/**
 *
 * @param {{
 * items : Object,
 * onClickFollowBtn: void,
 * onClickUnFollowBtn : void,
 * onClickAccount : void,
 * showCheckBox : boolean,
 * showCheckBox :boolean,
 * showButtons : boolean,
 * showFollowStatusText : boolean,
 * listEmptyText : string,
 * width : number,
 * }} props
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
	const onClickFollowBtn = item => {
		props.onClickFollowBtn(item);
	};

	const onClickUnFollowBtn = item => {
		props.onClickUnFollowBtn(item);
	};

	const renderItem = (item, index) => {
		return (
			<View style={[selectedItem == index ? controllableAccountList.selectedItem : controllableAccountList.no_selectedItem]}>
				<ControllableAccount
					data={item}
					showCrossMark={props.showCrossMark}
					showCheckBox={props.showCheckBox}
					showButtons={props.showButtons}
					onClickLabel={() => onSelectItem(item, index)}
					onPressCrossMark={() => onPressCrossMark(index)}
					onClickFollowBtn={() => onClickFollowBtn(item)}
					onClickUnFollowBtn={() => onClickUnFollowBtn(item)}
					showFollowStatusText={props.showFollowStatusText}
					width={props.width}
				/>
			</View>
		);
	};

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
							renderItem={({item, index}) => renderItem(item, index)}
							ListEmptyComponent={<ListEmptyInfo text={props.listEmptyText} />}
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
