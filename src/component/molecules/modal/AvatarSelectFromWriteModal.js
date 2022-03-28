import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView} from 'react-native';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {getUserInfoById} from 'Root/api/userapi';
import userGlobalObj from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import {styles} from 'Root/component/atom/image/imageStyle';
import {Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, ProfileDefaultImg, Triangle, Write94} from 'Atom/icon';

/**
 * 글쓰기 선택 후 아바타 동물을 선택하는 모달창
 *
 * @param {Object} props - props object
 * @param {(petObject:string)=>void} props.onSelectPet - 반려동물 라벨을 클릭했을때 콜백
 *
 */
const AvatarSelectFromWriteModal = props => {
	const [items, setItems] = React.useState('');
	const scrollViewRef = React.useRef();
	const [scrollIndex, setScrollIndex] = React.useState(0);

	React.useEffect(() => {
		getUserInfoById(
			{userobject_id: userGlobalObj.userInfo._id},
			user => {
				let avatarList = user.msg?.user_my_pets;
				const filter = avatarList.filter(e => e.pet_status != 'adopt'); //입양 동물은 글을 못씀
				filter.push(userGlobalObj.userInfo);
				const reverse = filter.reverse();

				setItems(reverse);
			},
			err => {
				Modal.popOneBtn(err, '확인', () => Modal.close());
			},
		);
	}, []);

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
			props.onSelectPet && props.onSelectPet(items[index]);
		};
		if (item.user_type == 'pet') {
			return (
				<TouchableOpacity onPress={onClickLabel} key={index} style={[style.listItem]}>
					<View style={[style.avatarName]}>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={[txt.noto26, {paddingHorizontal: 10 * DP}]}>
							{item.user_nickname}
						</Text>
					</View>
					<View style={[style.avatarImage]}>
						{item.user_profile_uri == undefined ? (
							<ProfileDefaultImg size={styles.img_round_94} />
						) : (
							<Image source={{uri: item.user_profile_uri}} style={[styles.img_round_94]} />
						)}
						<View style={{position: 'absolute', top: 0}}>
							{/* 팻의 상태 여부에 따른 분기 - protected, adopted, normal  */}
							{getStatusMark(item.pet_status)}
						</View>
					</View>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity onPress={onClickLabel} key={index} style={[style.listItem]}>
					<View style={[style.avatarName]}>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={[txt.noto26, {paddingHorizontal: 10 * DP}]}>
							{item.user_nickname}
						</Text>
					</View>
					<View style={[style.avatarImage]}>
						{item.user_profile_uri == undefined ? (
							<ProfileDefaultImg size={styles.img_round_94} />
						) : (
							<Image source={{uri: item.user_profile_uri}} style={[styles.img_round_94]} />
						)}
					</View>
				</TouchableOpacity>
			);
		}
	};

	if (items == '') {
		return <ActivityIndicator />;
	} else
		return (
			<TouchableOpacity onPress={() => Modal.close()} activeOpacity={1} style={style.background}>
				{/* <View
					style={[
						{
							width: 654 * DP,
							alignSelf: 'center',
							alignItems: 'center',
							// backgroundColor: 'yellow',
						},
					]}>
					<Text style={[txt.roboto40b, {color: WHITE}]}>계정을 선택해주세요.  </Text>
				</View> */}
				<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
					{scrollIndex >= Math.floor(items.length / 4) || items.length < 4 ? (
						<></>
					) : (
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => {
								setScrollIndex(scrollIndex + 1);
								scrollViewRef.current.scrollToIndex({
									animated: true,
									index: 4 * (scrollIndex + 1),
								});
							}}
							style={[
								style.triangle,
								{
									transform: [{rotate: '180deg'}],
								},
							]}>
							<Triangle />
						</TouchableOpacity>
					)}
					<View style={[style.avatarList]}>
						<FlatList
							data={items}
							renderItem={({item, index}) => renderItem(item, index)}
							ref={scrollViewRef}
							keyExtractor={item => item._id}
							inverted={true}
							// scrollEnabled={false}
							showsVerticalScrollIndicator={false}
						/>
					</View>

					<View style={[style.triangle]}>
						{scrollIndex == 0 ? (
							<></>
						) : (
							<TouchableOpacity
								onPress={() => {
									setScrollIndex(scrollIndex - 1);
									scrollViewRef.current.scrollToIndex({
										animated: true,
										index: 4 * (scrollIndex - 1),
									});
								}}
								style={[style.triangle]}
								activeOpacity={1}>
								<Triangle />
							</TouchableOpacity>
						)}
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
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		position: 'absolute',
	},
	popUpWindow: {
		// width: 488 * DP,
		marginBottom: 235 * DP,
		marginRight: 35 * DP,
		// backgroundColor: 'green',
	},
	avatarList: {
		maxHeight: 114 * 4 * DP,
		// backgroundColor: 'red',
	},
	avatarName: {
		// maxWidth: 340 * DP,
		height: 54 * DP,
		borderRadius: 20 * DP,
		marginRight: 10 * DP,
		paddingHorizontal: 5 * DP,
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
});

export default AvatarSelectFromWriteModal;
