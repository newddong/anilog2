import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {APRI10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {Cross46, Star50_Border, Star50_Filled} from 'Atom/icon';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import {organism_style} from 'Organism/style_organism copy';

/**
 *
 *@param {{
 * items : 'Array / 계정 목록',
 * onSelect : 'void / 계정 클릭  Callback'
 * makeBorderMode: 'boolean / 클릭 시 테두리 생기는 모드 on/off , default = true',
 * onDelete: '계정 지우기 마크 클릭 Callback',
 * onClickLabel : 'void / 계정 라벨 클릭 - ',
 * showCrossMark : 'boolean / X마크 출력 여부 , default = true',
 * showStarMark : 'boolean / 별 마크(즐겨찾기 여부) 출력 여부 / default = false'
 * listEmptyComponent : 'component / 리스트 없을 시 '
 * showFollowStatusText : 'boolean / 닉네임 우측 팔로우 중 텍스트 출력 여부'
 * }} props
 */
export default AccountList = props => {
	const [selectedIndex, setSelectedIndex] = React.useState();
	const [isFollowing, setIsFollowing] = React.useState([]);

	//스크린 첫 마운트 시 팔로우 상태 목록 배열 생성
	React.useEffect(() => {
		let copy = [];
		props.items.map((v, i) => {
			copy[i] = false;
		});
		setIsFollowing(copy);
	}, [props.items]);

	//계정 클릭 시 해당 박스 테두리 생성 함수
	const makeBorder = (item, index) => {
		index == selectedIndex ? setSelectedIndex(99) : setSelectedIndex(index);
		props.onSelect(item, index);
	};

	//즐겨찾기 (별모양) 클릭 콜백 함수
	const onPressFavorite = index => {
		let copy = [...isFollowing];
		copy[index] = !copy[index];
		setIsFollowing(copy);
		props.onPressFavorite(index);
	};

	//계정의 이미지 라벨 클릭 콜백 함수
	const onclickLabel = (item, index) => {
		// console.log('clicked User Data', user_data);
		props.onClickLabel(item);
		props.onSelect(item, index);
		index == selectedIndex ? setSelectedIndex(99) : setSelectedIndex(index);
	};

	const renderItem = (item, index) => {
		return (
			<TouchableOpacity
				style={[organism_style.accountListItem, {borderColor: selectedIndex == index && props.makeBorderMode ? APRI10 : WHITE}]}
				onPress={() => makeBorder(item, index)}>
				<View style={[organism_style.userDescriptionLabelContainer]}>
					<UserDescriptionLabel
						data={item}
						width={310}
						onClickLabel={item => onclickLabel(item, index)}
						showFollowStatusText={props.showFollowStatusText}
					/>
				</View>
				{props.showCrossMark ? (
					<View style={{position: 'absolute', right: 15 * DP}}>
						<Cross46 onPress={() => props.onDelete(index, item)} />
					</View>
				) : (
					<></>
				)}
				{props.showStarMark ? (
					<View style={{position: 'absolute', right: 15 * DP}}>
						{isFollowing[index] ? <Star50_Filled onPress={() => onPressFavorite(index)} /> : <Star50_Border onPress={() => onPressFavorite(index)} />}
					</View>
				) : (
					<></>
				)}
			</TouchableOpacity>
		);
	};
	return (
		<ScrollView horizontal={false} contentContainerStyle={{flex: 0}} showsVerticalScrollIndicator={false}>
			<ScrollView horizontal={true} contentContainerStyle={{flex: 1}} scrollEnabled={false}>
				<View style={organism_style.accountList}>
					<FlatList
						data={props.items}
						renderItem={({item, index}) => renderItem(item, index)}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={props.listEmptyComponent}
					/>
				</View>
			</ScrollView>
		</ScrollView>
	);
};
AccountList.defaultProps = {
	items: [],
	onPressFavorite: e => console.log('onPressFavorite', e),
	onDelete: e => console.log(e),
	onSelect: e => console.log('onSelect', e),
	onClickLabel: e => console.log('OnCLickLabel / AccountList', e),
	makeBorderMode: true,
	showCrossMark: true,
	showStarMark: false,
	showFollowStatusText: true,
	listEmptyComponent: () => {
		return <></>;
	},
};
