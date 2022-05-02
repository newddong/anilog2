import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, FlatList, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import AniButton from '../button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {getUserInfoById} from 'Root/api/userapi';
import userGlobalObj from 'Root/config/userGlobalObject';
import {txt} from 'Root/config/textstyle';
import PetLabel from '../label/PetLabel';
import {styles} from 'Root/component/atom/image/imageStyle';

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
	const [selectedItem, setSelectedItem] = React.useState(1000);
	const checkApi = React.useRef(false);

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

	const renderItem = (item, index) => {
		if (item.user_type == 'pet') {
			return (
				<View key={index} style={[style.listItem, {backgroundColor: index == selectedItem ? APRI10 : WHITE}]}>
					<PetLabel data={item} onLabelClick={() => onClickLabel(index)} />
				</View>
			);
		} else {
			return (
				<TouchableOpacity
					key={index}
					onPress={() => onClickLabel(index)}
					style={[
						style.listItem,
						{
							backgroundColor: index == selectedItem ? APRI10 : WHITE,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						},
					]}>
					<Image style={styles.img_round_94} source={{uri: item.user_profile_uri}} />
					<Text
						style={[
							txt.roboto28b,
							{
								textAlign: 'left',
								paddingLeft: 30 * DP,
								width: 170 * DP,
							},
						]}
						numberOfLines={1}
						ellipsizeMode="tail">
						{item.user_nickname || ''}
					</Text>
				</TouchableOpacity>
			);
		}
	};
	const platform = Platform.OS;

	React.useEffect(() => {
		getUserInfoById(
			{userobject_id: userGlobalObj.userInfo._id},
			user => {
				let avatarList = user.msg?.user_my_pets;
				if (props.isWriteMode) {
					const filter = avatarList.filter(e => e.pet_status != 'adopt'); //입양 동물은 글을 못씀
					filter.push(userGlobalObj.userInfo);
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
		//스크롤 Indicator 출력
		setTimeout(() => {
			scrollViewRef.current?.flashScrollIndicators();
		}, 500);
	}, []);

	const scrollViewRef = React.useRef();

	if (items == '') {
		return <ActivityIndicator />;
	} else
		return (
			<TouchableOpacity onPress={() => Modal.close()} activeOpacity={1} style={style.background}>
				<TouchableOpacity activeOpacity={1} style={[style.popUpWindow, style.shadow]}>
					{/* {console.log('items.length:', items.length)} */}
					{/* {checkApi.current ? ( */}
					{items.length > 0 ? (
						<View style={[style.avatarList, {}]}>
							{/* <Text> {nativeEvent}</Text> */}
							{platform === 'android' ? (
								<FlatList data={items} renderItem={({item, index}) => renderItem(item, index)} persistentScrollbar={true}></FlatList>
							) : (
								<View style={{flexDirection: 'row'}}>
									<FlatList
										ref={scrollViewRef}
										data={items}
										renderItem={({item, index}) => renderItem(item, index)}
										persistentScrollbar={true}
										showsHorizontalScrollIndicator={false}
										scrollToOverflowEnabled={false}></FlatList>
								</View>
							)}
						</View>
					) : (
						<Text style={[{textAlign: 'center', marginBottom: 30 * DP}, txt.noto28b]}>{'등록된 반려동물이 없습니다.\n 반려동물을 등록해주세요'}</Text>
					)}
					{/* // ) : null} */}
					{props.isWriteMode ? (
						<>
							<View style={style.buttonContainer}>
								<AniButton btnLayout={btn_w226} btnStyle={'border'} btnTitle={props.okButtonnMsg} onPress={pressOk} />
							</View>
							{(checkApi.current = false)}
						</>
					) : (
						<></>
					)}
				</TouchableOpacity>
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
		width: 330 * DP,
		backgroundColor: WHITE,
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 20 * DP,
		borderRadius: 40 * DP,
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
	avatarList: {
		maxHeight: 124 * 5 * DP,
		// backgroundColor: 'red',
	},
	listItem: {
		width: 294 * DP,
		height: 124 * DP,
		paddingVertical: 10 * DP,
		borderRadius: 30 * DP,
		paddingHorizontal: 20 * DP,
		// alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default AvatarSelectModal;
