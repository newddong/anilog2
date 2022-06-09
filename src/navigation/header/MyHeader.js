import React from 'react';
import {Text, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {BackArrow32, CircleMeatBall70} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {getUserInfoById} from 'Root/api/userapi';
import {APRI10, WHITE} from 'Root/config/color';
import PetLabel from 'Root/component/molecules/label/PetLabel';
import PetLabel70 from 'Root/component/molecules/label/PetLabel70';
export default MyHeader = ({navigation, route, options, back}) => {
	// console.log('options', options);
	// console.log('route', route.params);
	const [items, setItems] = React.useState('');
	const [selectedItem, setSelectedItem] = React.useState(1000);
	React.useEffect(() => {
		getUserInfoById(
			{userobject_id: userGlobalObj.userInfo._id},
			user => {
				let avatarList = user.msg?.user_my_pets;
				// if (props?.isWriteMode) {
				// 	const filter = avatarList.filter(e => e.pet_status != 'adopt'); //입양 동물은 글을 못씀
				// 	filter.push(userGlobalObj.userInfo);
				// 	setItems(filter);
				// } else {
				setItems(avatarList);
				// }
			},
			err => {
				Modal.popOneBtn(err, '확인', () => Modal.close());
			},
		);
		// checkApi.current = true;
		//스크롤 Indicator 출력
		// setTimeout(() => {
		// 	scrollViewRef.current?.flashScrollIndicators();
		// }, 500);
	}, []);
	const MeatBall = () => {
		return (
			<TouchableOpacity style={[{height: 110 * DP}, {alignContent: 'center'}, {justifyContent: 'center'}]}>
				<CircleMeatBall70 />
			</TouchableOpacity>
		);
	};

	const renderItem = (item, index) => {
		console.log('items', item);
		return (
			<View key={index} style={[style.listItem, {backgroundColor: index == selectedItem ? APRI10 : WHITE}]}>
				<PetLabel70 data={item} onLabelClick={() => onClickLabel(index)} />
			</View>
		);
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>

			<View style={[style.petList]}>
				<FlatList
					// ref={scrollViewRef}
					horizontal={true}
					data={items.slice(0, 3)}
					renderItem={({item, index}) => renderItem(item, index)}
					persistentScrollbar={true}
					scrollEnabled={false}
					showsHorizontalScrollIndicator={false}
					scrollToOverflowEnabled={false}
					ListFooterComponent={MeatBall}
				/>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 110 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'flex-start',
		paddingHorizontal: 28 * DP,
	},
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		padding: 10 * DP,
		// backgroundColor: 'red',
	},
	shadow: {
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 4,
		// },
		// elevation: 4,
	},
	petList: {
		width: 614 * DP,
		height: 110 * DP,
		// flex: 1,
		// backgroundColor: 'blue',
		alignItems: 'flex-end',
		marginRight: 28 * DP,
		// flexDirection:'row',
	},
	listItem: {
		width: 70 * DP,
		height: 70 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginRight: 26 * DP,
	},
});
