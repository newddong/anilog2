import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {BackArrow32, Meatball50_GRAY20_Horizontal} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {FEED_MEATBALL_MENU_MY_FEED_WITH_STATUS, PROTECT_REQUEST_STATUS} from 'Root/i18n/msg';
import {getProtectRequestByProtectRequestId} from 'Root/api/protectapi';
import {deleteProtectRequest} from 'Root/api/shelterapi';

//보호 요청게시글 작성자일 경우 미트볼 아이콘 출력이 되는 헤더
export default SimpleWithMeatballHeader = ({navigation, route, options, back}) => {
	const isWriter = userGlobalObject.userInfo._id == route.params.writer;
	// console.log('route.params', route.params);

	const onPressChangeProtectRequestStatus = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popSelectScrollBoxModal([PROTECT_REQUEST_STATUS], '', selectedItem => {
				alert(selectedItem);
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
					case '상태 변경':
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
