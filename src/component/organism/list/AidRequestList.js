import React from 'react';
import {View, FlatList, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {AddItem64} from 'Atom/icon';
import {aidRequestList} from 'Organism/style_organism copy';
import AidRequest from 'Organism/listitem/AidRequest';

/**
 *
 * @param {{
 * items : 'ArrayList',
 * onSelect : '(index:number) => void /',
 * onPressAddProtectAnimal : void,
 * selectBorderMode : 'Boolean / 선택시 테두리 및 투명도 적용 모드 default true'
 * }} props
 */
export default AidRequestList = props => {
	const [selectedIndex, setSelectedIndex] = React.useState();
	const [isSelectedOnce, setIsSelectedOnce] = React.useState(false);
	const isShelterProtectAnimal = props.callFrom == 'ShelterProtectAnimalList';
	const onPressAddProtectAnimal = () => {
		setIsSelectedOnce(false);
		setSelectedIndex(-1);
		props.onPressAddProtectAnimal();
	};

	const onSelect = index => {
		setIsSelectedOnce(true); //첫 화면에서는 모든 Item이 붙투명, 허나 한번이라도 item이 선택된다면 투명도가 적용된 View상태로 적용
		setSelectedIndex(index);
		props.onSelect(index);
	};

	const cancelSelect = () => {
		setSelectedIndex(-1);
		setIsSelectedOnce(false);
	};

	const renderItem = (item, index) => {
		const isSelected = index == selectedIndex; //현재 선택된 indexd와 해당 item의 index가 같은 경우에서만 불투명으로 처리되며 나머지는 투명해짐
		return (
			<View
				style={[
					// {backgroundColor: 'red'},
					aidRequestList.itemContainer,
					index != selectedIndex && isSelectedOnce && props.selectBorderMode ? {opacity: 0.5} : {opacity: 1},
				]}>
				<AidRequest
					data={item}
					selected={isSelected}
					onSelect={() => onSelect(index)}
					selectBorderMode={props.selectBorderMode}
					showBadge={!isShelterProtectAnimal}
				/>
			</View>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={cancelSelect}>
			<View style={[aidRequestList.container]}>
				{/* {console.log('ProtectRequestList=>' + JSON.stringify(dummy_ProtectRequestList))} */}
				{/* '보호중인 동물' 메뉴에 들어갔을때만 '보호중인 동물 추가하기 기능 보임' */}
				{props.callFrom != 'ProtectApplyList' ? (
					<TouchableOpacity onPress={onPressAddProtectAnimal} style={[aidRequestList.addProtectedPetContainer]}>
						<View style={[aidRequestList.addProtectedPet_insideContainer]}>
							<AddItem64 />
						</View>
						<Text style={[txt.noto30, aidRequestList.addProtectedPetText]}>보호중인 동물 추가하기</Text>
					</TouchableOpacity>
				) : null}
				<ScrollView horizontal={false} contentContainerStyle={{flex: 0}}>
					<ScrollView horizontal={true} contentContainerStyle={{flex: 1}} scrollEnabled={false}>
						<View style={aidRequestList.aidRequestListCont}>
							<FlatList
								data={props.items}
								renderItem={({item, index}) => renderItem(item, index)}
								scrollEnabled={false}
								ListEmptyComponent={props.whenEmpty}
							/>
						</View>
					</ScrollView>
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
};

AidRequestList.defaultProps = {
	items: [],
	selectBorderMode: true,
	onSelect: e => console.log('AidRequestList / Onselect', e),
	onPressAddProtectAnimal: e => console.log('AidRequestList, OnPressAddProtectAnimal', e),
};
