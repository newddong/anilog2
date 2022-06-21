import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View, ScrollView, StyleSheet} from 'react-native';
import {GRAY10, GRAY20, GRAY30, MAINBLACK} from 'Root/config/color';
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
						<View style={[styles.item]}>
							<TouchableOpacity onPress={() => menuClick(item[0])}>
								<View style={[styles.item_text]}>
									<Text style={[txt.noto26, {color: GRAY10}]}>{item[0]}</Text>
								</View>
							</TouchableOpacity>
							<View style={[styles.item_bracket]}>
								<NextMark onPress={() => menuClick(item[0])} />
							</View>
						</View>
						<View style={[profileMenu.vertical_separator]} />
						<View style={[styles.item]}>
							<TouchableOpacity onPress={() => menuClick(item[1])}>
								<View style={[styles.item_text]}>
									<Text style={[txt.noto26, {color: GRAY10}]}>{item[1]}</Text>
								</View>
							</TouchableOpacity>
							{/* <View style={[profileMenu.item_bracket]}>{item[1] == '' ? null : <NextMark onPress={() => menuClick(item[1])} />}</View> */}
							<View style={[styles.item_bracket]}>{item.length == 1 ? null : <NextMark onPress={() => menuClick(item[1])} />}</View>
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
				<View style={[styles.titleContainer]}>
					{props.titleIcon}
					<View style={[profileMenu.title]}>
						<Text style={[txt.noto28b, {color: MAINBLACK}]}>{props.menuTitle}</Text>
					</View>
				</View>
				<ScrollView horizontal={false} scrollEnabled={false}>
					<ScrollView horizontal={true} scrollEnabled={false}>
						<FlatList data={props.menuItems} renderItem={({item, index}) => renderItem(item, index)} scrollEnabled={false} />
					</ScrollView>
				</ScrollView>
			</View>
			<View style={[{height: 10 * DP}, {backgroundColor: GRAY40}, {marginTop: -3 * DP}]}></View>
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

const styles = StyleSheet.create({
	titleContainer: {
		height: 82 * DP,
		flexDirection: 'row',
		borderBottomWidth: 2 * DP,
		borderBottomColor: GRAY30,
		alignItems: 'center',
		paddingLeft: 28 * DP,
	},
	item: {
		width: 330 * DP,
		height: 48 * DP,
		// marginLeft: 16 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		// backgroundColor: 'red',
	},
	item_text: {
		width: 274 * DP,
		height: 40 * DP,
		// marginRight: 52 * DP,
		justifyContent: 'center',
		// backgroundColor: 'yellow',
		alignSelf: 'center',
	},
	item_bracket: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: 48 * DP,
		height: 48 * DP,
		// right: 30 * DP,ss
		marginLeft: 12 * DP,
		// marginRight: 16 * DP,
	},
});
