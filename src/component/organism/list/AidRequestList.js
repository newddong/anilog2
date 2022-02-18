import React from 'react';
import {View, FlatList, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {AddItem64} from 'Atom/icon';
import {aidRequestList} from 'Organism/style_organism copy';
import AidRequest from 'Organism/listitem/AidRequest';
import {APRI10, GRAY20} from 'Root/config/color';
import moment from 'moment';

/**
 * 보호 동물 정보 요약 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.items - 출력 아이템 리스트
 * @param {(index:number)=>void} props.onSelect - 선택 콜백
 * @param {()=>void} props.onPressAddProtectAnimal - 추가 버튼 클릭 콜백
 * @param {boolean} props.selectBorderMode - 선택 및 테두리 출력 모드
 * @param {boolean} props.needPost - 컴포넌트 하단 요청 게시글 필요 / 완려 텍스트 출력 분기
 * @param {string} props.callFrom - 호출 네비게이션
 * @param {component} props.whenEmpty - 빈 값 시 출력 컴포넌트
 *
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

	const getParsedDate = date => {
		const parsing = moment(date).format('YYYY.MM.DD');
		return parsing;
	};

	const renderItem = (item, index) => {
		// console.log('item', item);

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
					showBadge={isShelterProtectAnimal}
				/>
				{props.needPost ? (
					<View style={[aidRequestList.needPostText]}>
						<Text style={[txt.noto26, {color: APRI10, alignSelf: 'flex-end'}]}>
							{getParsedDate(item.protect_animal_rescue_date)} 구조 · 보호 요청글 게시 필요{' '}
						</Text>
					</View>
				) : (
					<View style={[aidRequestList.needPostText]}>
						<Text style={[txt.noto26, {color: GRAY20, alignSelf: 'flex-end'}]}>
							{getParsedDate(item.protect_animal_rescue_date)} 구조 · 보호 요청글 게시 완료{' '}
						</Text>
					</View>
				)}
			</View>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={cancelSelect}>
			<View style={[aidRequestList.container]}>
				{/* {console.log('ProtectRequestList=>' + JSON.stringify(dummy_ProtectRequestList))} */}
				{/* '보호중인 동물' 메뉴에 들어갔을때만 '보호중인 동물 추가하기 기능 보임' */}
				{/* {props.callFrom != 'ProtectApplyList' ? (
					<TouchableOpacity onPress={onPressAddProtectAnimal} style={[aidRequestList.addProtectedPetContainer]}>
						<View style={[aidRequestList.addProtectedPet_insideContainer]}>
							<AddItem64 />
						</View>
						<Text style={[txt.noto30, aidRequestList.addProtectedPetText]}>보호중인 동물 추가하기</Text>
					</TouchableOpacity>
				) : null} */}
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
	needPost: false,
};
