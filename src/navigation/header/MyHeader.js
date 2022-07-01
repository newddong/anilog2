import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {BackArrow32, CircleMeatBall70} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {getUserInfoById} from 'Root/api/userapi';
import {APRI10, WHITE} from 'Root/config/color';
import PetLabel70 from 'Root/component/molecules/label/PetLabel70';
import {useNavigation} from '@react-navigation/core';
export default MyHeader = ({route, options, back}) => {
	// console.log('options', options);
	// console.log('myheader param', route.params);
	const navigation = useNavigation();
	const [items, setItems] = React.useState('');
	const [selectedItem, setSelectedItem] = React.useState(1000);
	const [userData, setUserData] = React.useState('');

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
		});
		return unsubscribe;
	}, []);

	const fetchData = () => {
		getUserInfoById(
			{userobject_id: userGlobalObj.userInfo._id},
			user => {
				// console.log('User', user);
				let avatarList = user.msg?.user_my_pets;

				setUserData({...user.msg, pet_status: 'user'});
				setItems(avatarList);
				// console.log('avatarList', avatarList);
				// }
			},
			err => {
				Modal.popOneBtn(err, '확인', () => Modal.close());
			},
		);
	};

	const MeatBall = () => {
		return (
			<TouchableOpacity style={[{height: 110 * DP}, {alignContent: 'center'}, {justifyContent: 'center'}]} onPress={onClickMeatBall}>
				<CircleMeatBall70 />
			</TouchableOpacity>
		);
	};
	const UserProfile = () => {
		return (
			<View style={[{height: 110 * DP}, {alignContent: 'center'}, {justifyContent: 'center'}, {marginRight: 26 * DP}]}>
				<PetLabel70
					data={userData}
					onLabelClick={() => {
						onClicLabel(userData);
					}}
				/>
			</View>
		);
	};
	const onClicLabel = data => {
		// navigation.push('UserProfile', {userobject: data});
		if (data.user_type) {
			if (data?.user_type == 'pet') {
				navigation.push('PetInfoSetting', {pet_id: data._id});
			} else if (data?.user_type === 'user') {
				console.log('User');
				navigation.push('UserInfoSetting', {token: data._id}); //userObject
			}

			Modal.close();
		} else {
			navigation.push('AssignPetProfileImage', {userobject_id: userData._id, previousRouteName: route.name});
			Modal.close();
		}
	};
	const onClickMeatBall = () => {
		Modal.popPetProfileEditSelectModal(
			{items: items, user_data: userData, pet_data: route.params?.pet_id || ''},
			'나의 계정',
			selected => {
				// console.log('seeokge', selected);
				if (selected.user_type) {
					if (selected?.user_type == 'pet') {
						navigation.push('PetInfoSetting', {pet_id: selected._id});
					} else if (selected?.user_type === 'user') {
						console.log('User');
						// navigation.push('UserProfile', {userobject: selected});
						navigation.push('UserInfoSetting', {token: selected._id}); //userObject
					}

					Modal.close();
				} else {
					navigation.push('AssignPetProfileImage', {userobject_id: userData._id, previousRouteName: route.name});
					Modal.close();
				}
			},
			() => {
				Modal.close();
			},
		);
	};

	const renderItem = (item, index) => {
		// console.log('items', item);
		return (
			<View key={index} style={[style.listItem, {backgroundColor: index == selectedItem ? APRI10 : WHITE}]}>
				<PetLabel70
					data={item}
					onLabelClick={() => {
						onClicLabel(item);
					}}
				/>
			</View>
		);
	};

	React.useEffect(() => {
		const subscribe = navigation.addListener('focus', () => {
			setBackPressed(false);
		});
		return subscribe;
	}, []);

	const [backPressed, setBackPressed] = React.useState(false);

	const onPressBackButton = () => {
		setBackPressed(true);
		if (!backPressed) {
			navigation.goBack();
		}
	};

	if (items == '') {
		return <></>;
	} else
		return (
			<View style={[style.headerContainer, style.shadow]}>
				<TouchableOpacity style={style.backButtonContainer} onPress={onPressBackButton}>
					<BackArrow32 />
				</TouchableOpacity>

				<View style={[style.petList]}>
					<FlatList
						// ref={scrollViewRef}
						horizontal={true}
						data={items.slice(0, 2)}
						renderItem={({item, index}) => renderItem(item, index)}
						persistentScrollbar={true}
						scrollEnabled={false}
						showsHorizontalScrollIndicator={false}
						scrollToOverflowEnabled={false}
						ListHeaderComponent={UserProfile}
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
