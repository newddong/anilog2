import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY50, OPACITY90} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {getUserInfoById} from 'Root/api/userapi';
import userGlobalObj from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import {styles} from 'Root/component/atom/image/imageStyle';
import {Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, ProfileDefaultImg, Triangle, Write94} from 'Atom/icon';
import FastImage from 'react-native-fast-image';
import {NETWORK_ERROR} from 'Root/i18n/msg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * 글쓰기 선택 후 아바타 동물을 선택하는 모달창
 *
 * @param {Object} props - props object
 * @param {(petObject:string)=>void} props.onSelectPet - 반려동물 라벨을 클릭했을때 콜백
 * @param {()=>void} props.onClose - 모달 종료 콜백
 *
 */
const AvatarSelectFromWriteModal = props => {
	const [items, setItems] = React.useState('');
	const scrollViewRef = React.useRef();
	const [scrollIndex, setScrollIndex] = React.useState(0); //현재 스크롤 페이지
	const insets = useSafeAreaInsets();
	console.log('ind', insets);

	//첫 클릭 시 사용자의 반려동물 리스트를 받아서 user_avatar 전역변수에 저장
	React.useEffect(() => {
		if (userGlobalObj.userInfo.user_avatar == undefined) {
			console.log('전역변수 없음');
			getUserInfoById(
				{userobject_id: userGlobalObj.userInfo._id},
				user => {
					let avatarList = user.msg?.user_my_pets;
					const filter = avatarList.filter(e => e.pet_status != 'adopt'); //입양 동물은 글을 못씀
					filter.push(userGlobalObj.userInfo);
					const reverse = filter.reverse();
					setItems(reverse);
					userGlobalObj.userInfo.user_avatar = reverse;
				},
				err => {
					console.log('err , getUserInfoByID', err);
					Modal.close();
					setTimeout(() => {
						Modal.popOneBtn(NETWORK_ERROR, '확인', () => Modal.close());
					}, 200);
				},
			);
		} else {
			//전역변수가 있는 경우 api 접속 없이 리스트 채움
			// console.log('user_avatar', userGlobalObj.userInfo.user_avatar);
			// console.log('전역변수 있음');
			setItems(userGlobalObj.userInfo.user_avatar);
		}
	}, []);

	//반려동물 타입 아이콘
	const getStatusMark = status => {
		switch (status) {
			case 'companion':
				return <Paw30_APRI10 />;
			case 'adopt':
				return <Paw30_Mixed />;
			default:
				return <Paw30_YELL20 />;
		}
	};

	const renderItem = (item, index) => {
		const onClickLabel = () => {
			if (index == 0) {
				props.onSelectPet && props.onSelectPet(userGlobalObj.userInfo);
			} else {
				props.onSelectPet && props.onSelectPet(items[index]);
			}
		};
		//반려동물 프로필
		if (item.user_type == 'pet') {
			return (
				<View key={index} style={[style.listItem, {}]}>
					<TouchableOpacity onPress={onClickLabel} style={[style.avatarName]}>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={[txt.noto26, {paddingHorizontal: 10 * DP}]}>
							{item.user_nickname}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onClickLabel} style={[style.avatarImage]}>
						{item.user_profile_uri == undefined ? (
							<ProfileDefaultImg size={styles.img_round_94} />
						) : (
							<FastImage source={{uri: item.user_profile_uri}} style={[styles.img_round_94]} />
						)}
						<View style={{position: 'absolute', top: 0}}>
							{/* 팻의 상태 여부에 따른 분기 - protected, adopted, normal  */}
							{getStatusMark(item.pet_status)}
						</View>
					</TouchableOpacity>
				</View>
			);
		} else {
			//사용자 프로필
			return (
				<View key={index} style={[style.listItem]}>
					<TouchableOpacity onPress={onClickLabel} style={[style.avatarName]}>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={[txt.noto26, {paddingHorizontal: 10 * DP}]}>
							{item.user_nickname}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onClickLabel} style={[style.avatarImage]}>
						{item.user_profile_uri == undefined ? (
							<ProfileDefaultImg size={styles.img_round_94} />
						) : (
							<FastImage source={{uri: item.user_profile_uri}} style={[styles.img_round_94]} />
						)}
					</TouchableOpacity>
				</View>
			);
		}
	};

	const scrollUp = () => {
		if (scrollIndex + 1 == items.length / 4) {
			return <></>;
		} else if (scrollIndex >= Math.floor(items.length / 4) || items.length <= 4) {
			return <></>;
		} else {
			return (
				<TouchableOpacity
					onPress={() => {
						if (items.length !== 0 && scrollViewRef !== null) {
							setScrollIndex(scrollIndex + 1);
							scrollViewRef.current.scrollToIndex({
								animated: true,
								index: 4 * (scrollIndex + 1) >= items.length ? 4 * scrollIndex : 4 * (scrollIndex + 1),
							});
						}
					}}
					style={[style.triangle, {transform: [{rotate: '180deg'}]}]}>
					<Triangle />
				</TouchableOpacity>
			);
		}
	};

	const closeModal = () => {
		props.onClose();
	};

	if (items == '') {
		return (
			<View style={[style.back]}>
				<ActivityIndicator size={'large'} color={'white'} />
			</View>
		);
	} else
		return (
			<TouchableOpacity onPress={closeModal} activeOpacity={1} style={style.background}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={closeModal}
					// android 180 ios 235 였음
					// style={[style.popUpWindow, {marginBottom: Platform.OS == 'android' ? 180 * DP : 275 * DP}, {backgroundColor: 'yellow'}]}>
					style={[
						style.popUpWindow,
						{
							// marginBottom: Platform.OS == 'android' ? 145 * DP : 240 * DP
							bottom: Platform.OS == 'android' ? 140 * DP : insets.bottom + 140 * DP,
						},
					]}>
					{scrollUp()}
					<View style={[style.avatarList, {}]}>
						<FlatList
							data={items}
							renderItem={({item, index}) => renderItem(item, index)}
							ref={scrollViewRef}
							keyExtractor={item => item._id}
							inverted={true}
							scrollEnabled={false}
							showsVerticalScrollIndicator={false}
							onScrollToIndexFailed={err => {
								console.log('err', err);
								if (items.length !== 0 && scrollViewRef !== null) {
									scrollViewRef.current.scrollToIndex({index: err.index != -1 ? err.index : 0, animated: true, viewPosition: 0});
								}
							}}
						/>
					</View>

					<View style={[style.triangle, {marginBottom: Platform.OS == 'android' ? 40 * DP : 20 * DP}]}>
						{scrollIndex == 0 ? (
							<></>
						) : (
							<TouchableOpacity
								onPress={() => {
									if (items.length !== 0 && scrollViewRef !== null) {
										setScrollIndex(scrollIndex - 1);
										scrollViewRef.current.scrollToIndex({
											animated: true,
											index: 4 * (scrollIndex - 1),
										});
									}
								}}
								style={[style.triangle]}>
								<Triangle />
							</TouchableOpacity>
						)}
					</View>
					<View style={[style.writeBtn, {}]}>
						<Write94 />
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		);
};

AvatarSelectFromWriteModal.defaultProps = {
	okButtonnMsg: '확인',
	onOk: () => {
		console.log('YES');
	},
	onSelectPet: e => {},
	isWriteMode: true,
	onClose: () => {
		Modal.close();
	},
};

const style = StyleSheet.create({
	back: {
		flex: 1,
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0.6)',
		// opacity: 0.6,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		position: 'absolute',
	},
	popUpWindow: {
		// position: 'absolute',
		right: 30 * DP,
		// backgroundColor: 'lightgray',
		// opacity: 0.6,
	},
	avatarList: {
		maxHeight: 114 * 4 * DP,
		// backgroundColor: 'red',
	},
	avatarName: {
		// maxWidth: 340 * DP,
		// height: 54 * DP,
		borderRadius: 20 * DP,
		marginRight: 10 * DP,
		paddingHorizontal: 5 * DP,
		padding: 20 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	avatarImage: {
		borderRadius: 50 * DP,
		borderColor: WHITE,
		borderWidth: 4 * DP,
	},
	listItem: {
		// width: 488 * DP,
		height: 94 * DP,
		paddingVertical: 10 * DP,
		marginVertical: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		// backgroundColor: 'red',
	},
	triangle: {
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent: 'center',
		width: 104 * DP,
		height: 45 * DP,
		marginVertical: 10 * DP,
		// backgroundColor: 'red',
	},
	writeBtn: {
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 35 * DP,
		// position: 'absolute',
		bottom: 0,
	},
});

export default AvatarSelectFromWriteModal;
