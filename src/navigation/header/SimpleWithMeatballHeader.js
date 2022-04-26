import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BackArrow32, Meatball50_GRAY20_Horizontal} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {FEED_MEATBALL_MENU_MY_FEED, FEED_MEATBALL_MENU_MY_FEED_WITH_STATUS, PROTECT_REQUEST_STATUS} from 'Root/i18n/msg';
import {deleteProtectRequest, setShelterProtectAnimalStatus} from 'Root/api/shelterapi';
import {setProtectRequestStatus} from 'Root/api/protectapi';

//보호 요청게시글 및 제보, 실종글 작성자일 경우 미트볼 아이콘 출력이 되는 헤더
export default SimpleWithMeatballHeader = ({navigation, route, options, back}) => {
	const isWriter = userGlobalObject.userInfo._id == route.params.writer; //작성자인지 여부 판단

	const onPressChangeProtectRequestStatus = () => {
		Modal.close();
		setTimeout(() => {
			//요청게시글 ‘rescue’,'complete',’rainbowbridge’,’discuss’), //항목 추가 필요
			//보호동물 (‘rescue’,’adopt’,’protect’,’rainbowbridge’,’discuss’),
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
						selectedStatus = 'rainbowbridge';
						break;
					case PROTECT_REQUEST_STATUS[2]:
						//사망
						selectedStatus = 'rescue';
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
							// console.log('result / setShelterProtectAnimalStatus / SimpleWithMeatballHeader', result.msg);
							Modal.popNoBtn('보호 요청 게시글의 상태변경이 \n 완료되었습니다.');
							setTimeout(() => {
								Modal.close();
								navigation.setParams({...route.params, reset: true});
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

	// 미트볼 공유하기 클릭
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

	//보호요청 게시글 미트볼 메뉴 - 수정 클릭
	const onPressEdit = () => {
		navigation.push('EditAidRequest', {data: route.params.id});
	};

	//제보 실종 미트볼 메뉴 - 수정 클릭
	const onPressEditFeed = () => {
		navigation.navigate('FeedEdit', route.params.feed_object);
	};

	//제보 실종 미트볼 메뉴 - 삭제 클릭
	const onPressDeleteFeed = () => {
		console.log('삭제 제보 실종');
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
		if (route.params.isMissingOrReport) {
			// 실종 제보글일 경우
			Modal.popSelectBoxModal(
				FEED_MEATBALL_MENU_MY_FEED,
				selectedItem => {
					switch (selectedItem) {
						case '공유하기':
							onPressShare();
							break;
						case '수정':
							onPressEditFeed();
							break;
						case '삭제':
							onPressDeleteFeed();
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
		} else {
			Modal.popSelectBoxModal(
				// 보호요청 게시글일 경우
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
		}
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
