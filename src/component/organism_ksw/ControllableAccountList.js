import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ControllableAccount from './ControllableAccount';
import {dummy_userObject} from '../../config/dummyDate_json';
import {controllableAccountList} from './style_organism';
import ListEmptyInfo from '../molecules/ListEmptyInfo';

/**
 *
 * @param {{
 * items : Object,
 * onFollowBtnClick: void,
 * onClickAccount : void,
 * showCheckBox : boolean,
 * showCheckBox :boolean,
 * showButtons : boolean
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
	const onClickFollowBtn = index => {
		props.onClickFollowBtn(index);
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
					onClickFollowBtn={() => onClickFollowBtn(index)}
				/>
			</View>
		);
	};

	return (
		<ScrollView horizontal={false}>
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
							ListEmptyComponent={<ListEmptyInfo text={'목록이 없습니다.'} />}
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
	onPressCrossMark: e => console.log('onPressCrossMark ,', e),
	title: null,
	showCrossMark: false,
	showCheckBox: false,
};
