import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {BackArrow32, CircleMeatBall70} from 'Atom/icon';
import DP from 'Root/config/dp';
import {getUserInfoById} from 'Root/api/userapi';
import PetLabel70 from 'Root/component/molecules/label/PetLabel70';
import {useNavigation} from '@react-navigation/core';
export default MyHeader = ({route, options, back}) => {
	const navigation = useNavigation();
	const [items, setItems] = React.useState('');
	const [userData, setUserData] = React.useState('');
	const [pressed, setPressed] = React.useState(false);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
			setPressed(false);
		});
		return unsubscribe;
	}, []);

	const fetchData = () => {
		getUserInfoById(
			{userobject_id: userGlobalObj.userInfo._id},
			user => {
				let avatarList = user.msg?.user_my_pets;
				setUserData({...user.msg, pet_status: 'user'});
				setItems(avatarList);
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
		setPressed(true);
		if (!pressed) {
			if (data.user_type) {
				if (data?.user_type == 'pet') {
					console.log('pet_id', options.pet_id);
					if (options.pet_id != data._id) {
						navigation.navigate({key: new Date().getTime(), name: 'PetInfoSetting', params: {pet_id: data._id}});
					} else {
						setPressed(false);
					}
				} else if (data?.user_type === 'user') {
					if (route.name == 'PetInfoSetting') {
						//현재 보고 있는 화면이 UserMenu일 경우에는 따로 navigate 실행 X
						navigation.navigate('UserMenu', {userobject: data});
					} else {
						setPressed(false);
					}
				}
				Modal.close();
			} else {
				navigation.navigate('AssignPetProfileImage', {userobject_id: userData._id, previousRouteName: route.name});
				Modal.close();
			}
		}
	};
	const onClickMeatBall = () => {
		setPressed(true);
		if (!pressed) {
			try {
				Modal.popPetProfileEditSelectModal(
					{items: items, user_data: userData, pet_data: route.params?.pet_id || ''},
					'나의 계정',
					selected => {
						if (selected.user_type) {
							if (selected?.user_type == 'pet') {
								if (options.pet_id != selected._id) {
									navigation.navigate({key: new Date().getTime(), name: 'PetInfoSetting', params: {pet_id: selected._id}});
								} else {
									setPressed(false);
								}
							} else if (selected?.user_type === 'user') {
								navigation.navigate('UserInfoSetting', {token: selected._id}); //userObject
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
			} catch (err) {
				setPressed(false);
				console.log('err ', err);
			}
		}
	};

	const renderItem = (item, index) => {
		// console.log('items', item);
		return (
			<View key={index} style={[style.listItem, {}]}>
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
