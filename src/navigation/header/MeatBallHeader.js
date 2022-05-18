import React from 'react';
import {Text, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {BackArrow32, Meatball50_APRI10_Horizontal, Meatball50_GRAY20_Horizontal} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import {REPORT_MENU} from 'Root/i18n/msg';
import {createReport} from 'Root/api/report';

/**
 * 유저가 기르는 반려동물의 프로필 사진, 닉네임, 유저의 닉네임을 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.menu - 미트볼 클릭시 출력되는 메뉴 목록
 * @param {(value:object, index:number)=>void} props.onSelect - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
export default MeatBallHeader = props => {
	// console.log('props.options', props.options.data);
	const userInfo = userGlobalObject.userInfo;

	const onSelect = select => {
		console.log('select Item', select);
		if (select == '정보') {
			Modal.close();
			console.log('props.options.data', props.options.data.user_interests);
			setTimeout(() => {
				Modal.popInformationModal(
					props.options.data,
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
						props.navigation.navigate('Login');
					});
				} else {
					Modal.popOneBtnSelectModal(
						REPORT_MENU,
						'이 유저를 신고 하시겠습니까?',
						selectedItem => {
							console.log('props.options.data', props.options.data.user_nickname);
							// createReport(
							// 	{
							// 		report_target_object_id: props.options.data.user_nickname,
							// 		report_target_object_type: 'commentsobjects',
							// 		report_target_reason: selectedItem,
							// 		report_is_delete: false,
							// 	},
							// 	result => {
							// 		console.log('신고 완료', result);
							// 		Modal.close();
							// 		Modal.popOneBtn('신고 완료되었습니다.', '확인', () => Modal.close());
							// 	},
							// 	err => {
							// 		console.log('신고 err', err);
							// 		Modal.close();
							// 	},
							// );
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
	const isUserProfile = props.options.data && props.options.data.user_type == 'user';
	const isMyProfile = props.options.data && props.options.data.user_type == 'user' && props.options.data._id == userInfo._id; //일반 유저 프로필이며 자신의 계정일 경우

	const onPressMeatball = () => {
		if (isUserProfile) {
			Modal.popSelectBoxModal(
				['정보'],
				select => onSelect(select),
				() => onClose(),
				false,
				false,
			);
		} else if (props.options.data && props.options.data.user_type == 'pet') {
			//반려동물 프로필
			const pet_family = props.options.data.pet_family;
			let family_id_list = [];
			pet_family.map((v, i) => {
				family_id_list.push(v._id);
			});
			const isPetOwner = family_id_list.includes(userInfo._id); // 보고 있는 반려동물 프로필이 로그인한 계정의 반려동물인지 여부
			isPetOwner
				? Modal.popSelectBoxModal(
						['정보'],
						select => onSelect(select),
						() => onClose(),
						false,
						false,
				  )
				: Modal.popSelectBoxModal(
						['정보'],
						select => onSelect(select),
						() => onClose(),
						false,
						false,
				  );
		} else if (props.options.data && props.options.data.user_type == 'shelter' && props.options.data._id != userInfo._id) {
			//보호소 프로필이며 자신의 계정이 아닐경우
			Modal.popSelectBoxModal(['정보'], select => onSelect(select), onClose, false, false);
		} else if (props.options.data && props.options.data.user_type == 'shelter' && props.options.data._id == userInfo._id) {
			//보호소 프로필이며 자신의 계정일 경우
			Modal.popSelectBoxModal(['정보'], select => onSelect(select), onClose, false, false);
		}
	};

	const onClose = () => {
		Modal.close();
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={props.navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={props.navigation.goBack} />
				</View>
			</TouchableOpacity>
			<Text style={[txt.roboto40b, {maxWidth: 500 * DP}]} numberOfLines={1}>
				{props.options?.title ? props.options.title : props.route.params.title}
			</Text>
			{/* <MeatBallDropdown menu={PROTECT_STATUS} onSelect={onPressMeatball} /> */}
			<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
		</View>
	);
};

MeatBallHeader.defaultProps = {
	menu: [],
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
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
