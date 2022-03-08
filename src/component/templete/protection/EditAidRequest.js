import React from 'react';
import {Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Camera54} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import AidRequest from 'Organism/listitem/AidRequest';
import {assignProtectAnimal_style, login_style, writeAidRequest} from 'Templete/style_templete';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'Component/modal/Modal';
import {getProtectRequestByProtectRequestId} from 'Root/api/protectapi';

//보호요청 게시글 수정
export default EditAidRequest = ({route, navigation}) => {
	// console.log('route.params :   ', route.params);

	const [data, setData] = React.useState('false'); //ShelterProtectAnimalObject(보호소의 보호동물) 정보가 담겨있음
	const [imageList, setImageList] = React.useState([]); //PhotoSelect에서 선택된 사진List
	const [protectRequestData, setProtectRequestData] = React.useState();
	const [previousPhotoList, setPreviousPhotoList] = React.useState([]);
	const [deletedList, setDeletedList] = React.useState([]);
	const titleRef = React.useRef();
	const contentRef = React.useRef();
	React.useEffect(() => {
		getProtectRequestByProtectRequestId(
			{
				protect_request_object_id: route.params.data,
			},
			result => {
				// console.log('result / getProtectRequestByProtectRequestId / EditAidREquest : ', result.msg);
				const res = result.msg.protect_animal_id;
				setProtectRequestData({
					protect_request_object_id: result.msg._id,
					protect_request_photos_uri: [],
					protect_request_title: result.msg.protect_request_title,
					protect_request_content: result.msg.protect_request_content,
					protect_request_status: 'rescue',
					protect_photos_to_delete: '',
				});
				setImageList(result.msg.protect_request_photos_uri.slice(1, result.msg.protect_request_photos_uri.length));
				setPreviousPhotoList(result.msg.protect_request_photos_uri);
				setData(res);
			},
			err => {
				console.log('err / getProtectRequestByProtectRequestId / EditAidRequest : ', err);
			},
		);
	}, []);

	//헤더로 데이터 보내기
	React.useEffect(() => {
		// console.log('ProtectRequestData / WriteAidRequest ', protectRequestData);
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
						// console.log('images', images);
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
		// console.log('deleted uri', previousPhotoList[index]);
		let deleted = [...deletedList];
		deleted.push(previousPhotoList[index]);
		setDeletedList(deleted);
		setProtectRequestData({...protectRequestData, protect_request_photos_uri: copy, protect_photos_to_delete: deleted});
		// setData({...data, protect_request_photos_uri: copy || data.protect_request_photos_uri});
	};

	//보호게시글 내용 값 변경 콜백
	const onChangeContent = text => {
		setProtectRequestData({...protectRequestData, protect_request_content: text});
	};

	//보호게시글 제목 값 변경 콜백
	const onChangeTitle = text => {
		setProtectRequestData({...protectRequestData, protect_request_title: text});
	};

	if (data == 'false') {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	}
	return (
		<View style={[login_style.wrp_main, style.container]}>
			<ScrollView style={{flex: 1}} contentContainerStyle={{}}>
				<View style={[style.aidRequestCont]}>
					<AidRequest data={data} selected={true} />
				</View>
				<View style={[style.feedTextEdit]}>
					<View style={[style.titleContainer]}>
						<TextInput
							onChangeText={onChangeTitle}
							placeholder={'제목 입력'}
							placeholderTextColor={GRAY20}
							// numberOfLines={1}
							ref={titleRef}
							defaultValue={protectRequestData.protect_request_title}
							style={[txt.noto30, style.titleInput, {borderBottomColor: APRI10}]}
						/>
					</View>
					<View style={[style.contentContainer]}>
						{/* 피드 글 작성 */}
						<TextInput
							onChangeText={onChangeContent}
							defaultValue={protectRequestData.protect_request_content}
							style={[style.contentInput]}
							maxLength={500}
							ref={contentRef}
							textAlignVertical={'top'}
							multiline={true}
							placeholderTextColor={GRAY20}
							placeholder="내용 입력"
						/>
						<Text style={[txt.noto24, {color: GRAY20, alignSelf: 'flex-end'}]}>{protectRequestData.protect_request_content.length} / 500</Text>
					</View>
				</View>

				<View style={[style.pic, {}]}>
					<Camera54 onPress={gotoSelectPicture} />
					<TouchableOpacity onPress={gotoSelectPicture}>
						<Text style={[txt.noto24, assignProtectAnimal_style.addpic]}>사진추가</Text>
					</TouchableOpacity>
				</View>
				<View style={[style.selectedMediaList]}>
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

export const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	aidRequest: {
		marginTop: 40 * DP,
	},
	aidRequestCont: {
		width: 750 * DP,
		alignItems: 'center',
		marginTop: 40 * DP,
	},
	titleContainer: {
		marginBottom: 20 * DP,
	},
	titleInput: {
		paddingHorizontal: 15 * DP,
		marginTop: 10 * DP,
		borderBottomWidth: 2 * DP,
		height: 100 * DP,
	},
	contentInput: {
		width: 606 * DP,
		height: 300 * DP,
	},
	feedTextEdit: {
		marginTop: 40 * DP,
		width: 654 * DP,
		alignSelf: 'center',
		borderRadius: 24 * DP,
	},
	requestContent_underline: {
		width: 654 * DP,
		height: 2 * DP,
		marginVertical: 40 * DP,
		backgroundColor: APRI10,
	},
	contentContainer: {
		width: 654 * DP,
		height: 376 * DP,
		borderRadius: 24 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		padding: 24 * DP,
	},
	addPhotoContainer: {
		width: 160 * DP,
		height: 54 * DP,
		marginLeft: 48 * DP,
		marginTop: 38 * DP,
		alignSelf: 'flex-start',
		flexDirection: 'row',
	},
	addPhotoText: {
		marginLeft: 12 * DP,
		width: 94 * DP,
		height: 38 * DP,
		backgroundColor: 'pink',
		alignSelf: 'center',
	},
	addPhoto: {
		height: 190 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		borderRadius: 40 * DP,
		borderWidth: 7 * DP,
		borderColor: APRI10,
	},
	selectedMediaList: {
		width: 654 * DP,
		alignSelf: 'flex-start',
		marginTop: 30 * DP,
		marginBottom: 40 * DP,
		marginLeft: 48 * DP,
	},
	pic: {
		flexDirection: 'row',
		width: 654 * DP,
		marginTop: 40 * DP,
		alignSelf: 'center',
		justifyContent: 'flex-start',
	},
});
const gg = {
	__v: 0,
	_id: '6220bcd538912a3d251edaa6',
	protect_animal_id: {
		__v: 0,
		_id: '6220b3cb38912a3d251ed9b7',
		protect_act_applicants: [],
		protect_animal_belonged_shelter_id: '6203aff5c0f179ccd5bb8054',
		protect_animal_estimate_age: '1년',
		protect_animal_neutralization: 'unknown',
		protect_animal_photo_uri_list: [
			'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646310347669_675DC92F-A20A-4243-B355-577FCB107923.jpg',
		],
		protect_animal_protect_request_id: '6220bcd538912a3d251edaa6',
		protect_animal_protector_discussion_id: [],
		protect_animal_rescue_date: '2022-03-02T00:00:00.000Z',
		protect_animal_rescue_location: '아이스',
		protect_animal_sex: 'male',
		protect_animal_species: '고양이',
		protect_animal_species_detail: '코리안 숏헤어',
		protect_animal_status: 'rescue',
		protect_animal_weight: 3,
	},
	protect_animal_species: '고양이',
	protect_animal_species_detail: '코리안 숏헤어',
	protect_request_comment_count: 0,
	protect_request_content: '수정?',
	protect_request_date: '2022-03-03T13:04:21.215Z',
	protect_request_favorite_count: 0,
	protect_request_hit: 0,
	protect_request_is_delete: false,
	protect_request_photos_uri: [
		'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646312661013_55B40DE1-F9DC-43FE-B452-B096108F2051.jpg',
		'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646312661046_7A409BE4-9680-48EA-9381-96D83F4C1ACA.jpg',
		'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646312661059_5EF6CAFB-6248-44EE-897F-998E098BE771.jpg',
		'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646310347669_675DC92F-A20A-4243-B355-577FCB107923.jpg',
	],
	protect_request_status: 'rescue',
	protect_request_title: '사진 2개 이상 게시글',
	protect_request_update_date: '2022-03-03T13:04:21.215Z',
	protect_request_writer_id: {
		__v: 0,
		_id: '6203aff5c0f179ccd5bb8054',
		pet_family: [],
		shelter_address: {brief: '서울 서대문구 경기대로9길 92', detail: 'ㅇ1'},
		shelter_delegate_contact_number: '0109645011',
		shelter_foundation_date: '2022-08-04T00:00:00.000Z',
		shelter_homepage: 'Naver.com',
		shelter_name: '형산보호소',
		shelter_type: 'private',
		type: 'UserObject',
		user_agreement: {
			is_donation_info: false,
			is_location_service_info: false,
			is_marketting_info: false,
			is_over_fourteen: false,
			is_personal_info: false,
			is_service: false,
		},
		user_denied: false,
		user_email: 'Lanad01@naver.com',
		user_follow_count: 2,
		user_follower_count: 1,
		user_interests: [],
		user_introduction: '',
		user_is_verified_email: false,
		user_is_verified_phone_number: false,
		user_my_pets: [],
		user_name: '형산보호소',
		user_nickname: '형산보호소',
		user_password: 'tkddn123',
		user_phone_number: '01096450001',
		user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1644408821715_76E74A61-FDF5-4B75-BD96-B309E2475F05.jpg',
		user_register_date: '2022-02-09T12:13:41.815Z',
		user_type: 'shelter',
		user_upload_count: 18,
	},
};
