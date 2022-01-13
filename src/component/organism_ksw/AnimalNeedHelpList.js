import React from 'react';
import {FlatList, TouchableOpacity, View, Text, ScrollView} from 'react-native';
import AnimalNeedHelp from './AnimalNeedHelp';
import {animalNeedHelpList} from './style_organism';
import {useNavigation} from '@react-navigation/core';
import {dummy_AnimalNeedHelpList} from 'Root/config/dummyDate_json';
/**
 *
 *@param {{
 *nowRoute: parentName,
 *onClickLabel: 'void / Label클릭 콜백함수 '
 *onFavoriteTag : 'void / 즐겨찾기 태그 깃발 클릭 ',
 *borderMode : 'boolean / 테두리 및 입양처보기, 게시글보기 모드 ',
 *onCheckBox : 'boolean / CheckBox 보이기',
 *onHashClick : 'boolean / HashClick Callback',
 *onPressAdoptorInfo : 'void / 테두리 모드 입양처 보기 클릭'
 *onPressProtectRequest : 'void / 테두리 모드 게시글보기 클릭',
 *onPressReporter : 'void / 제보 게시글의 제보자 닉네임 클릭',
 *whenEmpty : 'component / 목록이 없을 시 출력되는 컴포넌트',
 *onLayout : void,
 * }} props
 */
export default AnimalNeedHelpList = props => {
	const debug = false;
	const onClickLabel = (status, id, item) => {
		props.onClickLabel(status, id, item);
	};

	const renderItem = (item, index) => {
		return (
			<View style={[animalNeedHelpList.itemContainer]}>
				{/* {console.log('item:item.checkBoxState=>' + item.checkBoxState)} */}
				<AnimalNeedHelp
					index={index}
					isDeleted={props.isDeleted}
					data={item}
					checkBoxMode={props.checkBoxMode}
					isChecked={item.checkBoxState}
					isCheckAll={props.isCheckAll}
					borderMode={props.borderMode}
					onClickLabel={(status, id) => onClickLabel(status, id, item)}
					onHashClick={() => props.onHashClick(item)}
					onCheckBox={e => props.onCheckBox(e, index)}
					onFavoriteTag={e => props.onFavoriteTag(e, index)}
					onPressAdoptorInfo={() => props.onPressAdoptorInfo(item)}
					onPressProtectRequest={() => props.onPressProtectRequest(item)}
					callFrom={props.callFrom}
				/>
			</View>
		);
	};

	return (
		//  width: 702 * DP
		<ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
			<ScrollView horizontal={true} scrollEnabled={false}>
				{debug && console.log(`AnimalNeedHelpList:props.borderMode - ${JSON.stringify(props.borderMode)}`)}
				{/* [hjs borderMode 모드일때와 아닐때 width 값 추후에 확인 할 것] */}
				<View style={[!props.borderMode ? animalNeedHelpList.container_bordermode : animalNeedHelpList.container]}>
					{/* {console.log(`AnimalNeedHelpList:view - props.data=>${JSON.stringify(props.data)}`)} */}
					<FlatList
						data={props.data}
						renderItem={({item, index}) => renderItem(item, index)}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						keyExtractor={item => item._id}
						ListEmptyComponent={props.whenEmpty}
					/>
				</View>
			</ScrollView>
		</ScrollView>
	);
};

AnimalNeedHelpList.defaultProps = {
	data: dummy_AnimalNeedHelpList,
	onClickLabel: e => console.log(e),
	onFavoriteTag: e => console.log('FavoriteTag ', e),
	onHashClick: e => console.log('HashClick AnimalNeedHelpList', e),
	checkBoxState: false,
	borderMode: false,
};
