import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {BackArrow32, Meatball50_GRAY20_Horizontal} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {FEED_MEATBALL_MENU_MY_FEED_WITH_STATUS, PROTECT_REQUEST_STATUS} from 'Root/i18n/msg';
import {deleteProtectRequest, setShelterProtectAnimalStatus} from 'Root/api/shelterapi';
import {setProtectRequestStatus} from 'Root/api/protectapi';

//보호 요청게시글 작성자일 경우 미트볼 아이콘 출력이 되는 헤더
export default SimpleWithMeatballHeader = ({navigation, route, options, back}) => {
	const isWriter = userGlobalObject.userInfo._id == route.params.writer;
	// console.log('route.params / SimpleWithMeatballHeader : ', route.params.request_object);
	const g = {
		__v: 0,
		_id: '6226f807269db4bdc7628b89',
		protect_animal_id: {
			__v: 0,
			_id: '6226f687269db4bdc7628b6f',
			protect_act_applicants: [],
			protect_animal_belonged_shelter_id: '62220ed4477a1c991fd47cf7',
			protect_animal_estimate_age: '1개월',
			protect_animal_neutralization: 'unknown',
			protect_animal_photo_uri_list: [
				'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646720646917_24893246-4742-47C0-A4D0-D0D53F5C8DB3.jpg',
				'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646720646971_10DA8154-1D4E-4FD0-9E50-BF95359F0DF3.jpg',
				'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646720647099_A584AEE4-8ABE-413E-A32B-8A2A905BD86E.jpg',
				'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646720647174_EB642F5B-0250-487B-837A-3E5E3BBE6AEF.jpg',
			],
			protect_animal_protect_request_id: '6226f807269db4bdc7628b89',
			protect_animal_protector_discussion_id: [],
			protect_animal_rescue_date: '2022-03-01T00:00:00.000Z',
			protect_animal_rescue_location: '아카베',
			protect_animal_sex: 'female',
			protect_animal_species: '개',
			protect_animal_species_detail: '믹스견',
			protect_animal_status: 'rescue',
			protect_animal_weight: 3,
		},
		protect_animal_species: '개',
		protect_animal_species_detail: '믹스견',
		protect_request_comment_count: 0,
		protect_request_content: 'Dsd',
		protect_request_date: '2022-03-08T06:30:31.999Z',
		protect_request_favorite_count: 0,
		protect_request_hit: 0,
		protect_request_is_delete: false,
		protect_request_photos_uri: [
			'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646720646917_24893246-4742-47C0-A4D0-D0D53F5C8DB3.jpg',
			'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646720646971_10DA8154-1D4E-4FD0-9E50-BF95359F0DF3.jpg',
			'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646720647099_A584AEE4-8ABE-413E-A32B-8A2A905BD86E.jpg',
			'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646720647174_EB642F5B-0250-487B-837A-3E5E3BBE6AEF.jpg',
		],
		protect_request_status: 'rescue',
		protect_request_title: 'Ds',
		protect_request_update_date: '2022-03-08T06:30:31.999Z',
		protect_request_writer_id: {
			__v: 0,
			_id: '62220ed4477a1c991fd47cf7',
			pet_family: [],
			shelter_address: {brief: '서울 중랑구 용마산로 194', detail: '22013'},
			shelter_delegate_contact_number: '01001096450003',
			shelter_foundation_date: '2014-08-01T00:00:00.000Z',
			shelter_homepage: 'Htttp:dd12',
			shelter_name: '탄지보호소',
			shelter_type: 'public',
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
			user_email: 'Lanad01@kakao.com',
			user_follow_count: 1,
			user_follower_count: 0,
			user_interests: {
				interests_activity: [Array],
				interests_beauty: [Array],
				interests_food: [Array],
				interests_health: [Array],
				interests_location: [Array],
			},
			user_introduction: '',
			user_is_verified_email: false,
			user_is_verified_phone_number: false,
			user_my_pets: [],
			user_name: '탄지보호소',
			user_nickname: '탄지보호소',
			user_password: 'tkddn123',
			user_phone_number: '01001096450003',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1646399188505_07B57E46-3AFE-4DEF-AC34-974489A43703.jpg',
			user_register_date: '2022-03-04T13:06:28.612Z',
			user_type: 'shelter',
			user_update_date: '2022-03-04T13:06:28.612Z',
			user_upload_count: 5,
		},
	};

	//요청게시글 ‘rescue’,'complete',’rainbowbridge’,’discuss’), //항목 추가 필요

	//보호동물 (‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’),

	const onPressChangeProtectRequestStatus = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popSelectScrollBoxModal([PROTECT_REQUEST_STATUS], '', selectedItem => {
				const request_obj = route.params.request_object;
				let selectedStatus = '';
				switch (selectedItem) {
					case PROTECT_REQUEST_STATUS[0]:
						//협의 중
						selectedStatus = 'discuss';
						break;
					case PROTECT_REQUEST_STATUS[1]:
						//완료
						selectedStatus = 'complete';
						break;
					case PROTECT_REQUEST_STATUS[2]:
						//사망
						selectedStatus = 'rainbowbridge';
						break;
					case PROTECT_REQUEST_STATUS[3]:
						//입양가능
						selectedStatus = 'rescue';
						break;
					default:
						break;
				}
				if (selectedStatus == request_obj.protect_request_status) {
					Modal.close();
					setTimeout(() => {
						Modal.popOneBtn('현재 상태와 다른 항목을 \n 골라주세요.', '확 인', () => Modal.close());
					}, 300);
				} else {
					//보호요청 게시글의 상태 변경 실시
					setProtectRequestStatus(
						{
							protect_request_object_id: request_obj._id,
							protect_request_status: selectedStatus, //선택된 상태
						},
						result => {
							console.log('result / setProtectRequestStatus / SimpleWithMeatballHeader', result.msg.protect_request_status);
						},
						err => {
							console.log('err / setProtectRequestStatus / SimpleWithMeatballHeader', err);
						},
					);
					let shelterProtectAnimalStatus = selectedStatus == 'complete' ? 'adopt' : selectedStatus; // 'complete'와 일치하는 보호동물 상태는 'adopt
					setShelterProtectAnimalStatus(
						{
							shelter_protect_animal_object_id: request_obj.protect_animal_id._id,
							protect_animal_status: shelterProtectAnimalStatus,
							// protect_animal_adoptor_id,
							// protect_animal_protector_id
						},
						result => {
							console.log('result / setShelterProtectAnimalStatus / SimpleWithMeatballHeader', result.msg.protect_animal_status);
							Modal.popNoBtn('보호 요청 게시글의 상태변경이 \n 완료되었습니다.');
							setTimeout(() => {
								Modal.close();
							}, 1000);
						},
						err => {
							console.log('err / setShelterProtectAnimalStatus / SimpleWithMeatballHeader', err);
						},
					);
				}
				Modal.close();
			});
		}, 200);
	};

	const onPressShare = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popSocialModal(
				() => alert('kakao'),
				() => alert('link'),
				() => alert('메시지'),
			);
		}, 200);
	};

	//수정 버튼 클릭
	const onPressEdit = () => {
		navigation.push('EditAidRequest', {data: route.params.id});
	};

	//게시글 삭제
	const onPressDelete = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popTwoBtn(
				'이 게시글을 삭제하시겠습니까?',
				'아니오',
				'삭제',
				() => Modal.close(),
				() => {
					deleteProtectRequest(
						{
							protect_request_object_id: route.params.id,
						},
						result => {
							console.log('result / deleteProtectRequest / SimpleWithMeatBallHeader  : ', result.msg.protect_request_is_delete);
							navigation.goBack(); //뒤로 가기
						},
						err => {
							console.log('err /deleteProtectRequest / SimpleWithMeatBallHeader  :  ', err);
						},
					);
					Modal.close();
				},
			);
		}, 400);
	};

	const onPressMeatball = () => {
		Modal.popSelectBoxModal(
			FEED_MEATBALL_MENU_MY_FEED_WITH_STATUS,
			selectedItem => {
				switch (selectedItem) {
					case '상태변경':
						onPressChangeProtectRequestStatus();
						break;
					case '공유하기':
						onPressShare();
						break;
					case '수정':
						onPressEdit();
						break;
					case '삭제':
						onPressDelete();
						break;
					default:
						break;
				}
				Modal.close();
			},
			() => Modal.close(),
			false,
			'',
		);
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
			<Text style={[{flex: 1, textAlign: 'center', marginLeft: 30 * DP, marginRight: 80 * DP}, txt.roboto40b]} numberOfLines={1}>
				{options.title ? options.title : route.params.title}
			</Text>
			{isWriter ? <Meatball50_GRAY20_Horizontal onPress={onPressMeatball} /> : <></>}
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 135 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'flex-start',
		paddingHorizontal: 48 * DP,
	},
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		padding: 10 * DP,
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
});
