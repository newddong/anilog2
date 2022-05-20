import React from 'react';
import {Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {APRI10, GRAY10, GRAY20, GRAY30, GRAY40} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Camera54} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import AidRequest from 'Organism/listitem/AidRequest';
import {assignProtectAnimal_style, login_style, writeAidRequest} from 'Templete/style_templete';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'Component/modal/Modal';

export default WriteAidRequest = ({route, navigation}) => {
	// console.log('WriteAidRequest', route.params);
	const params = route.params.data;
	const [data, setData] = React.useState(params); //ShelterProtectAnimalObject(보호소의 보호동물) 정보가 담겨있음
	//ProtectRequestObject(보호소의 동물 보호 요청 게시글) 테이블에 맞춘 보호요청 작성글을 작성
	const [protectRequestData, setProtectRequestData] = React.useState({
		shelter_protect_animal_object_id: data._id,
		protect_request_photos_uri: imageList,
		protect_request_photo_thumbnail: data.protect_animal_photo_uri_list ? data.protect_animal_photo_uri_list[0] : DEFAULT_PROFILE,
		protect_animal_id: data._id, // 이 부분 API에서 받아와야 함 보호요청을 하려고 하는 동물의 _id
		protect_request_title: '',
		protect_request_content: '',
		protect_request_status: 'rescue',
	});
	const [imageList, setImageList] = React.useState([]); //PhotoSelect에서 선택된 사진List

	React.useEffect(() => {
		//다시 게시하기일 경우 imageList 반영시켜야함
		if (route.params.isRePost) {
			setImageList(params.protect_animal_photo_uri_list.slice(1, params.protect_animal_photo_uri_list.length));
		}
	}, [route.params.isRePost]);

	React.useEffect(() => {
		route.params.onConfirm ? Modal.popLoading() : Modal.close();
	}, [route.params.onConfirm]);

	//헤더로 데이터 보내기
	React.useEffect(() => {
		navigation.setParams({data: protectRequestData, nav: route.name});
	}, [protectRequestData]);

	const gotoSelectPicture = () => {
		// navigation.push('SinglePhotoSelect', route.name);
		if (imageList.length > 4) {
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
					cropping: true,
				})
					.then(images => {
						console.log('images', images);
						let photoList = [...imageList];
						photoList.push(images.path);
						setImageList(imageList.concat(images.path));
						setProtectRequestData({...protectRequestData, protect_request_photos_uri: photoList});
						setData({...data, protect_request_photos_uri: photoList || data.protect_request_photos_uri});
						Modal.close();
					})
					.catch(err => console.log(err + ''));
				Modal.close();
			},
			() => {
				launchImageLibrary(
					{
						mediaType: 'photo',
						selectionLimit: 5 - imageList.length, //다중선택 모드일 경우 상시 5개면 4개 상태에서 최대 5개를 더해 9개가 가능해짐
						maxHeight: 1500,
						maxWidth: 1500,
						quality: 0.8,
					},
					responseObject => {
						// console.log('선택됨', responseObject);
						if (!responseObject.didCancel) {
							let tempContainer = [...imageList];
							responseObject.assets.map(v => tempContainer.push(v.uri));
							setImageList(tempContainer);
							setProtectRequestData({...protectRequestData, protect_request_photos_uri: tempContainer});
							setData({...data, protect_request_photos_uri: tempContainer || data.protect_request_photos_uri});
							Modal.close();
						} else {
							Modal.close();
						}
					},
				);
			},
		);
	};

	//SelectedMedia 아이템의 X마크를 클릭
	const onDelete = index => {
		let copy = [...imageList];
		copy.splice(index, 1);
		setImageList(copy);
		setProtectRequestData({...protectRequestData, protect_request_photos_uri: copy});
		setData({...data, protect_request_photos_uri: copy || data.protect_request_photos_uri});
	};

	//보호게시글 내용 값 변경 콜백
	const onChangeContent = text => {
		setProtectRequestData({...protectRequestData, protect_request_content: text});
	};

	//보호게시글 제목 값 변경 콜백
	const onChangeTitle = text => {
		setProtectRequestData({...protectRequestData, protect_request_title: text});
	};

	return (
		<View style={[login_style.wrp_main, writeAidRequest.container]}>
			<ScrollView style={{flex: 1}} contentContainerStyle={{}}>
				<View style={[writeAidRequest.aidRequestCont]}>
					<AidRequest data={data} selected={true} />
				</View>
				<View style={[writeAidRequest.feedTextEdit]}>
					<View style={[writeAidRequest.titleContainer]}>
						<TextInput
							onChangeText={onChangeTitle}
							placeholder={'제목 입력 (최대30자)'}
							placeholderTextColor={GRAY20}
							// numberOfLines={1}
							maxLength={30}
							style={[txt.noto30, writeAidRequest.titleInput, {borderBottomColor: APRI10}]}
						/>
					</View>
					<View style={[writeAidRequest.contentContainer]}>
						{/* 피드 글 작성 */}
						<TextInput
							onChangeText={onChangeContent}
							style={[writeAidRequest.contentInput]}
							maxLength={500}
							textAlignVertical={'top'}
							multiline={true}
							placeholderTextColor={GRAY20}
							placeholder="내용 입력"
						/>
						<Text style={[txt.noto24, {color: GRAY20, alignSelf: 'flex-end'}]}>{protectRequestData.protect_request_content.length} / 500</Text>
					</View>
				</View>

				<View style={[writeAidRequest.pic, {}]}>
					<Camera54 onPress={gotoSelectPicture} />
					<TouchableOpacity onPress={gotoSelectPicture}>
						<Text style={[txt.noto24, assignProtectAnimal_style.addpic]}>사진추가</Text>
					</TouchableOpacity>
				</View>
				<View style={[writeAidRequest.selectedMediaList]}>
					{imageList.length == 0 ? (
						<></>
					) : (
						<SelectedMediaList items={imageList} layout={styles.img_square_round_190} onDelete={index => onDelete(index)} />
					)}
				</View>
			</ScrollView>
		</View>
	);
};
