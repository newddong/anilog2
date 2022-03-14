import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TextInput, Platform, Keyboard, StyleSheet} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Camera54, Location54_APRI10, Location54_Filled, NextMark_APRI, Save54} from 'Root/component/atom/icon/index';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'Component/modal/Modal';
import userGlobalObj from 'Root/config/userGlobalObject';
import {useNavigation, useRoute} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import HashInput from 'Molecules/input/HashInput';
import {getAddress} from 'Root/util/addressutill';
import SelectedMediaList from 'Root/component/organism/list/SelectedMediaList';
import {styles} from 'Root/component/atom/image/imageStyle';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default CommunityWrite = props => {
	const inputRef = React.useRef();
	const navigation = useNavigation();
	const isReview = props.route.params.isReview; //후기 게시글 여부 boolean
	const [catergory, setCategory] = React.useState('카테고리 선택');
	const [loading, setLoading] = React.useState(false);
	const [temp, setTemp] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [selectedImg, setSelectedImg] = React.useState([]); //사진 uri리스트

	React.useEffect(() => {
		if (props.route.params?.addr) {
			//다른 주소 검색 결과값 적용
			console.log('props.route.params?.addr', props.route.params?.addr.address);
			setLocation(props.route.params?.addr.address); //다른 주소 검색 결과값 적용
		}
	}, [props.route.params]);

	React.useEffect(() => {
		if (loading) {
			Modal.popLoading();
		} else if (!loading && temp != '') {
			Modal.close();
			setTimeout(() => {
				Modal.popLocationCheckModal(
					() => {
						Modal.close();
						navigation.push('AddressSearchPage', {prevRoute: props.route.name});
					},
					() => {
						Modal.close();
						setLocation(temp);
					},
					temp,
				);
			}, 100);
		}
	}, [loading]);

	const onPressPhotoSelect = () => {
		if (selectedImg.length > 4) {
			Modal.alert('첨부파일은 5개까지만 가능합니다');
			return;
		}
		Modal.popTwoBtn(
			'사진 선택 모드를 선택하세요',
			'하나씩선택',
			'여러개선택',
			() => {
				ImagePicker.openPicker({
					// multiple: true,
					compressImageQuality: 0.8,
					width: 750,
					height: 750,
					cropping: true,
				})
					.then(images => {
						// console.log('images', images);
						setSelectedImg(selectedImg.concat(images.path));
						Modal.close();
					})
					.catch(err => console.log(err + ''));
				Modal.close();
			},
			() => {
				launchImageLibrary(
					{
						mediaType: 'photo',
						selectionLimit: 5 - selectedImg.length, //다중선택 모드일 경우 상시 5개면 4개 상태에서 최대 5개를 더해 9개가 가능해짐
						maxHeight: 750,
						maxWidth: 750,
						quality: 0.8,
					},
					responseObject => {
						// console.log('선택됨', responseObject);
						if (!responseObject.didCancel) {
							let tempContainer = [...selectedImg];
							responseObject.assets.map(v => tempContainer.push(v.uri));
							setSelectedImg(tempContainer.slice(-5));
							Modal.close();
						}
					},
				);
			},
		);
	};

	const moveToLocationPicker = async () => {
		// console.log('moveToLocationPicker');
		// navigation.push('AddressSearchPage', {prevRoute: props.route.name});
		navigation.push('KakaoMap');

		// setLoading(true);
		// const address = await getAddress();
		// setTemp(address.address.address_name);
		// setLoading(false);
	};

	const onPressFilter = () => {
		Modal.popInterestTagModal(
			'Review',
			[],
			() => Modal.close(),
			() => Modal.close(),
			arg => {
				setCategory(arg);
				Modal.close();
			},
		);
	};

	const onDeleteImage = () => {
		console.log('onDeleteImage');
	};

	const onPressTempSave = () => {
		alert('onPressTempSave');
	};

	return (
		<View style={[style.container]}>
			{isReview ? (
				<></>
			) : (
				<>
					<TextInput style={[txt.noto30, style.title_text]} placeholder={'제목 입력...'} placeholderTextColor={GRAY20} />
					<TouchableOpacity activeOpacity={0.6} onPress={onPressFilter} style={[style.category]}>
						<Text style={[txt.noto28, style.categoryText]} ellipsizeMode={'tail'} numberOfLines={1}>
							{catergory}
						</Text>
						<View style={[style.nextMark]}>
							<NextMark_APRI />
						</View>
					</TouchableOpacity>
				</>
			)}

			<View style={[style.content]}>
				{location != '' ? (
					<View style={[style.location]}>
						<Location54_Filled />
						<Text style={[txt.noto26b, {color: APRI10, marginLeft: 10 * DP}]}>{location}</Text>
					</View>
				) : (
					<></>
				)}
				<TextInput
					textAlignVertical={'top'}
					multiline={true}
					style={[style.contentInput, txt.noto24, {}]}
					placeholder={'서비스, 가성비, 위생, 특이사항, 위치등의 내용을 적어주세요! 후기는 자세할수록 좋아요.'}
					ref={inputRef}
				/>
				<View
					style={[
						{
							marginVertical: 20 * DP,
						},
					]}>
					<SelectedMediaList items={selectedImg} layout={styles.img_square_round_190} onDelete={onDeleteImage} />
				</View>
			</View>
			<View style={[style.buttonContainer]}>
				<TouchableOpacity activeOpacity={0.6} onPress={onPressTempSave}>
					<View style={[style.buttonItem]}>
						<Save54 />
						<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>임시저장</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={onPressPhotoSelect}>
					<View style={[style.buttonItem]}>
						<Camera54 />
						<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>사진추가</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={moveToLocationPicker}>
					<View style={[style.buttonItem, {}]}>
						<Location54_APRI10 />
						<Text style={[txt.noto24, {color: APRI10, alignSelf: 'center', marginLeft: 10 * DP}]}>위치추가</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	title_text: {
		width: 654 * DP,
		height: 82 * DP,
		paddingLeft: 24 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
	},
	category: {
		width: 654 * DP,
		height: 82 * DP,
		paddingLeft: 24 * DP,
		marginTop: 30 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		paddingVertical: 18 * DP,
		marginBottom: 30 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	categoryText: {
		color: APRI10,
		width: 500 * DP,
	},
	nextMark: {
		marginLeft: (654 - 558) * DP,
	},
	content: {
		// marginTop: 30 * DP,
		width: 654 * DP,
		// minHeight: 376 * DP,
		// marginTop: 12 * DP,
		borderRadius: 24 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		padding: 17 * DP,
		paddingVertical: 20 * DP,
	},
	buttonContainer: {
		// backgroundColor: 'yellow',
		marginTop: 30 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		// justifyContent: 'space-between',
		marginRight: 48 * DP,
	},
	buttonItem: {
		width: 160 * DP,
		height: 54 * DP,
		marginLeft: 78 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentInput: {
		// flex: 1,
		minHeight: 120 * DP,
	},
	location: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15 * DP,
	},
});
