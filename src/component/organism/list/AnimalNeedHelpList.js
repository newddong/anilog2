import React from 'react';
import {FlatList, TouchableOpacity, View, Text, ScrollView} from 'react-native';
import AnimalNeedHelp from 'Organism/listitem/AnimalNeedHelp';
import {animalNeedHelpList} from 'Organism/style_organism copy';
import {dummy_AnimalNeedHelpList} from 'Root/config/dummyDate_json';
import {Check50, Rect50_Border} from 'Root/component/atom/icon';
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
 *onPressCheck : 'void / 보호요청 즐겨찾기 체크모드에서 체크',
 *whenEmpty : 'component / 목록이 없을 시 출력되는 컴포넌트',
 *onLayout : void,
 *showFavorite : 'boolean / 즐겨찾기 아이콘 출력 여부 ',
 * }} props
 */
export default AnimalNeedHelpList = props => {
	const debug = false;
	const onClickLabel = (status, id, item) => {
		props.onClickLabel(status, id, item);
	};

	const onPressToggle = (index, bool) => {
		props.onPressCheck(index, bool);
	};

	const renderItem = (item, index) => {
		return (
			<View style={[animalNeedHelpList.itemContainer]}>
				{/* {console.log('item:item.checkBoxState=>' + item.checkBoxState)} */}
				{props.selectMode ? (
					<View style={{justifyContent: 'center', marginRight: 20 * DP}}>
						{/* <CheckBox state={item.checkBoxState} onCheck={() => props.onCheckBox(index)} /> */}
						{item.checkBoxState ? (
							<Check50 onPress={() => onPressToggle(index, false)} />
						) : (
							<Rect50_Border onPress={() => onPressToggle(index, true)} />
						)}
					</View>
				) : (
					<></>
				)}
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
					showFavorite={props.showFavorite}
					selectMode={props.selectMode}
				/>
			</View>
		);
	};

	return (
		<View style={[!props.borderMode ? animalNeedHelpList.container_bordermode : animalNeedHelpList.container]}>
			{/* {console.log(`AnimalNeedHelpList:view - props.data=>${JSON.stringify(props.data)}`)} */}
			<FlatList
				data={props.data}
				renderItem={({item, index}) => renderItem(item, index)}
				scrollEnabled={false}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item._id}
				ListEmptyComponent={props.whenEmpty}
				listKey={({item, index}) => index}
			/>
		</View>
	);
};

AnimalNeedHelpList.defaultProps = {
	data: dummy_AnimalNeedHelpList,
	onClickLabel: e => console.log(e),
	onFavoriteTag: e => console.log('FavoriteTag ', e),
	onHashClick: e => console.log('HashClick AnimalNeedHelpList', e),
	checkBoxState: false,
	borderMode: false,
	showFavorite: true,
};
