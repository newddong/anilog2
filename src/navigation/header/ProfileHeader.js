import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BackArrow32, InfoIcon50, Meatball50_APRI10_Horizontal, Meatball50_GRAY20_Horizontal} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import {REPORT_MENU} from 'Root/i18n/msg';
import {createReport} from 'Root/api/report';
import {createMemoBox} from 'Root/api/userapi';

/**
 * 유저가 기르는 반려동물의 프로필 사진, 닉네임, 유저의 닉네임을 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.menu - 미트볼 클릭시 출력되는 메뉴 목록
 * @param {(value:object, index:number)=>void} props.onSelect - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
export default ProfileHeader = props => {
	const userInfo = userGlobalObject.userInfo;
	const data = props.options.data;
	// console.log('props.options', data);

	const onSelect = select => {
		console.log('select Item', select);
		if (select == '쪽지 보내기') {
			Modal.close();
			setTimeout(() => {
				Modal.popMessageModal(
					data.user_nickname,
					msg => {
						createMemoBox(
							{memobox_receive_id: data._id, memobox_contents: msg},
							result => {
								console.log('message sent success', result);
								Modal.popOneBtn('쪽지가 성공적으로 전송되었습니다.', '확인', () => Modal.close());
							},
							err => {
								console.log('message sent err', err);
							},
						);
						console.log('msg', msg);
						Modal.close();
					},
					() => alert('나가기'),
				);
			}, 100);
		} else if (select.includes('님의 관심사')) {
			Modal.close();
			setTimeout(() => {
				Modal.popInformationModal(
					data,
					() => onClose(),
					type => {
						console.log('type', type);
						switch (type) {
							case 'user':
								props.navigation.push('UserInfoDetailSetting', props.options.data);
								break;
							case 'shelter':
								props.navigation.push('EditShelterInfo', {data: props.options.data});
								break;
							case 'pet':
								props.navigation.push('SetPetInformation', props.options.data);
								break;

							default:
								break;
						}
					},
				);
			}, 100);
		} else if (select == '신고') {
			Modal.close();
			setTimeout(() => {
				if (userGlobalObject.userInfo.isPreviewMode) {
					Modal.popLoginRequestModal(() => {
						props.navigation.navigate('LoginRequired');
					});
				} else {
					Modal.popOneBtnSelectModal(
						REPORT_MENU,
						'이 유저를 신고 하시겠습니까?',
						selectedItem => {
							console.log('props.options.data', data.user_nickname);
							createReport(
								{
									report_target_object_id: data.user_nickname,
									report_target_object_type: 'commentsobjects',
									report_target_reason: selectedItem,
									report_is_delete: false,
								},
								result => {
									console.log('신고 완료', result);
									Modal.close();
									Modal.popOneBtn('신고 완료되었습니다.', '확인', () => Modal.close());
								},
								err => {
									console.log('신고 err', err);
									Modal.close();
								},
							);
						},
						'신고',
					);
				}
			}, 100);
		} else if (select == '공유하기') {
			Modal.close();
			setTimeout(() => {
				Modal.popSocialModal(
					() => alert('카카오'),
					() => alert('링크복사'),
					() => alert('메시지'),
				);
			}, 100);
		}
	};

	const onPressInfo = () => {
		if (data && data.user_type != 'user') {
			//반려동물 프로필
			const pet_family = data.pet_family;
			let family_id_list = [];
			pet_family.map((v, i) => {
				family_id_list.push(v._id);
			});
			const isPetOwner = family_id_list.includes(userInfo._id); // 보고 있는 반려동물 프로필이 로그인한 계정의 반려동물인지 여부
			Modal.close();
			console.log('data', data.user_interests);
			setTimeout(() => {
				Modal.popInformationModal(
					data,
					() => onClose(),
					type => {
						console.log('type', type);
						switch (type) {
							case 'user':
								props.navigation.push('UserInfoDetailSetting', data);
								break;
							case 'shelter':
								props.navigation.push('EditShelterInfo', {data: data});
								break;
							case 'pet':
								props.navigation.push('SetPetInformation', data);
								break;

							default:
								break;
						}
					},
				);
			}, 100);
		}
		// else if (data && data.user_type == 'shelter' && data._id != userInfo._id) {
		// 	//보호소 프로필이며 자신의 계정이 아닐경우
		// 	Modal.popSelectBoxModal(['정보'], select => onSelect(select), onClose, false, false);
		// } else if (data && data.user_type == 'shelter' && data._id == userInfo._id) {
		// 	//보호소 프로필이며 자신의 계정일 경우
		// 	Modal.popSelectBoxModal(['정보'], select => onSelect(select), onClose, false, false);
		// }
	};

	const onPressMeatball = () => {
		Modal.popSelectBoxModal(['쪽지 보내기', data.user_nickname + '님의 관심사'], select => onSelect(select), onClose, false, false);
	};

	const onClose = () => {
		Modal.close();
	};

	const isMyProfile = data && data._id == userInfo._id;

	const getIcon = () => {
		if (data && data.user_type == 'user' && isMyProfile) {
			return <></>;
		} else if (data && data.user_type == 'user') {
			// return <Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />;
			return <></>;
		} else {
			return <InfoIcon50 onPress={onPressInfo} />;
		}
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity style={style.backButtonContainer} onPress={props.navigation.goBack}>
				<BackArrow32 onPress={props.navigation.goBack} />
			</TouchableOpacity>
			<View style={{justifyContent: 'center', alignItems: 'center'}}>
				<Text style={[txt.roboto40b, {width: 550 * DP, textAlign: 'center'}]} numberOfLines={1}>
					{props.options?.title ? props.options.title : props.route.params.title}
				</Text>
			</View>
			{getIcon()}
		</View>
	);
};

ProfileHeader.defaultProps = {
	menu: [],
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		// justifyContent: 'space-between',
		paddingHorizontal: 28 * DP,
		// backgroundColor: 'yellow',
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
