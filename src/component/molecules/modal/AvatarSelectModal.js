import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, FlatList, TouchableOpacity, ActivityIndicator, Image, Animated, Easing} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY20, GRAY30} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {getUserInfoById} from 'Root/api/userapi';
import userGlobalObj from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import {styles} from 'Root/component/atom/image/imageStyle';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Check64, ProfileDefaultImg} from 'Root/component/atom/icon';

/**
 * 아바타 동물을 선택하는 모달창
 *
 * @param {Object} props - props object
 * @param {(petObject:string)=>void} props.onSelectPet - 반려동물 라벨을 클릭했을때 콜백
 * @param {string} props.okButtonnMsg - 확인 버튼 메시지
 * @param {boolean} props.isWriteMode - 버튼출력여부
 *
 */
const AvatarSelectModal = props => {
	const [items, setItems] = React.useState('');
	const [selectedItem, setSelectedItem] = React.useState(0);
	const checkApi = React.useRef(false);

	React.useEffect(() => {
		getUserInfoById(
			{userobject_id: userGlobalObj.userInfo._id},
			user => {
				let avatarList = user.msg?.user_my_pets;
				if (props.isWriteMode) {
					const filter = avatarList.filter(e => e.pet_status != 'adopt'); //입양 동물은 글을 못씀
					filter.unshift(userGlobalObj.userInfo);
					setItems(filter);
				} else {
					setItems(avatarList);
				}
			},
			err => {
				Modal.popOneBtn(err, '확인', () => Modal.close());
			},
		);
		checkApi.current = true;
		animateSelectModal();
	}, []);

	const pressOk = () => {
		props.onOk();
		props.onSelectPet && props.onSelectPet(items[selectedItem]);
		Modal.close();
	};

	const onClickLabel = index => {
		if (props.isWriteMode) {
			setSelectedItem(index);
		} else {
			props.onSelectPet && props.onSelectPet(items[index]);
		}
	};

	const scrollViewRef = React.useRef();
	const animatedHeight = React.useRef(new Animated.Value(0)).current;

	const animateSelectModal = () => {
		Animated.timing(animatedHeight, {
			duration: 300,
			toValue: 750 * DP,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	};

	const closeSelectModal = () => {
		Animated.timing(animatedHeight, {
			duration: 200,
			toValue: 0,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start(() => {
			props.onSelectPet && props.onSelectPet(items[selectedItem]);
			Modal.close();
		});
	};

	const renderItem = ({item, index}) => {
		// console.log('item', item);
		const age = 2022 - parseFloat(moment(item.pet_birthday).format('yyyy'));
		return (
			<>
				<TouchableOpacity key={index} onPress={() => onClickLabel(index)} style={[style.listItem, {}]}>
					{item.user_profile_uri ? (
						<FastImage style={styles.img_round_68} source={{uri: item.user_profile_uri}} />
					) : (
						<ProfileDefaultImg size={styles.img_round_68} />
					)}
					<View style={{}}>
						<Text style={[txt.noto30b, style.user_nickname, {}]} numberOfLines={1}>
							{item.user_nickname || ''}
						</Text>
						{item.user_type == 'pet' ? (
							<Text style={[txt.noto28, style.user_nickname, {color: GRAY10}]} numberOfLines={1}>
								{item.pet_species || ''} / {item.pet_species_detail || ''}
								{item.pet_birthday ? ' / ' + age + '살' : ''}
							</Text>
						) : (
							<></>
						)}
					</View>
					{index == selectedItem ? <Check64 /> : <></>}
				</TouchableOpacity>
				{index == items.length - 1 ? <View style={{height: 100 * DP}} /> : <></>}
			</>
		);
	};

	if (items == '') {
		return (
			<View style={{position: 'absolute', right: 0, bottom: 0, left: 0, top: 0, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator />
			</View>
		);
	} else
		return (
			<TouchableOpacity onPress={closeSelectModal} activeOpacity={1} style={style.background}>
				<Animated.View
					activeOpacity={1}
					style={[
						style.popUpWindow,
						style.shadow,
						{
							height: animatedHeight,
						},
					]}>
					<Text style={[txt.noto30b]}>글 쓸 계정 선택</Text>
					{items.length > 0 ? (
						<FlatList
							ref={scrollViewRef}
							data={items}
							renderItem={renderItem}
							showsVerticalScrollIndicator={false}
							ItemSeparatorComponent={() => {
								return <View style={{width: 750 * DP, height: 2 * DP, backgroundColor: GRAY30}} />;
							}}
						/>
					) : (
						<Text style={[{textAlign: 'center', marginBottom: 30 * DP}, txt.noto28b]}>{'등록된 반려동물이 없습니다.\n 반려동물을 등록해주세요'}</Text>
					)}
					{/* // ) : null} */}
					{props.isWriteMode ? <>{(checkApi.current = false)}</> : <></>}
				</Animated.View>
			</TouchableOpacity>
		);
};

AvatarSelectModal.defaultProps = {
	okButtonnMsg: '확인',
	onOk: () => {
		console.log('YES');
	},
	onSelectPet: e => {},
	isWriteMode: true,
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	popUpWindow: {
		width: 750 * DP,
		height: 732 * DP,
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		backgroundColor: WHITE,
		paddingTop: 30 * DP,
		borderRadius: 40 * DP,
		borderBottomEndRadius: 0,
		borderBottomStartRadius: 0,
	},
	msg: {
		marginBottom: 30 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		paddingTop: 10 * DP,
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	user_nickname: {
		width: 510 * DP,
		marginLeft: 30 * DP,
		// backgroundColor: 'red',
	},
	avatarList: {
		maxHeight: 124 * 5 * DP,
		// backgroundColor: 'red',
	},
	listItem: {
		width: 694 * DP,
		height: 148 * DP,
		paddingLeft: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		// backgroundColor: 'palegreen',
	},
});

export default AvatarSelectModal;
