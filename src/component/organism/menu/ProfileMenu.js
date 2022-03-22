import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {FavoriteTag46_Filled, FavoriteTag48_Filled, NextMark, Paw46} from 'Atom/icon';
import {profileMenu} from 'Organism/style_organism copy';
import {GRAY40} from 'Root/config/color';
/**
 *
 * @param {{
 * menuItems : " ex) [ [ 'menu1', 'menu2'], ['menu3,''menu4']]  - 바깥 배열의 length는 메뉴의 층수, 안쪽 배열의 2가지 메뉴는 각 층별 왼쪽 오른쪽에 담겨질 메뉴 이름",
 * menuTitle : string,
 * onClick : void,
 * titleIcon : 'Icon Component'
 * }} props
 */
export default ProfileMenu = props => {
	const menuClick = menuName => {
		props.onClick(menuName);
	};
	const renderItem = (item, index) => {
		// console.log('item', item);
		return (
			<View>
				<View style={[profileMenu.itemContainer]}>
					<View style={[profileMenu.item_step1]}>
						<View style={[profileMenu.item]}>
							<TouchableOpacity onPress={() => menuClick(item[0])}>
								<View style={[profileMenu.item_text]}>
									<Text style={[txt.noto26, {color: GRAY10}]}>{item[0]}</Text>
								</View>
							</TouchableOpacity>
							<View style={[profileMenu.item_bracket]}>
								<NextMark onPress={() => menuClick(item[0])} />
							</View>
						</View>
						<View style={[profileMenu.vertical_separator]} />
						<View style={[profileMenu.item]}>
							<TouchableOpacity onPress={() => menuClick(item[1])}>
								<View style={[profileMenu.item_text]}>
									<Text style={[txt.noto26, {color: GRAY10}]}>{item[1]}</Text>
								</View>
							</TouchableOpacity>
							{/* <View style={[profileMenu.item_bracket]}>{item[1] == '' ? null : <NextMark onPress={() => menuClick(item[1])} />}</View> */}
							<View style={[profileMenu.item_bracket]}>{item.length == 1 ? null : <NextMark onPress={() => menuClick(item[1])} />}</View>
						</View>
					</View>
				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={[profileMenu.horizon_separator]} />
					<View style={[profileMenu.horizon_separator]} />
				</View>
			</View>
		);
	};
	return (
		<View style={[profileMenu.container]}>
			{/* 즐겨찾기 */}
			<View style={[profileMenu.upperMenu]}>
				<View style={[profileMenu.titleContainer]}>
					{props.titleIcon}
					<View style={[profileMenu.title]}>
						<Text style={[txt.noto28b, {color: GRAY10}]}>{props.menuTitle}</Text>
					</View>
				</View>
				<ScrollView horizontal={false} scrollEnabled={false}>
					<ScrollView horizontal={true} scrollEnabled={false}>
						<FlatList data={props.menuItems} renderItem={({item, index}) => renderItem(item, index)} scrollEnabled={false} />
					</ScrollView>
				</ScrollView>
			</View>
		</View>
	);
};

ProfileMenu.defaultProps = {
	titleIcon: <FavoriteTag48_Filled />,
	menuTitle: '즐겨찾기',
	onClick: e => console.log(e),
	menuItems: [
		['메뉴1', '메뉴2'],
		['메뉴3', '메뉴4'],
	],
};
