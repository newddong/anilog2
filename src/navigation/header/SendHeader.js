import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {BackArrow32, Bracket48, Send60_Big} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import {createProtectRequest, updateProtectRequest} from 'Root/api/shelterapi';
import {RED} from 'Root/config/color';

export default SendHeader = ({route, navigation, options}) => {
	// console.log('props SendHeader', route.params);
	const onSend = () => {
		if (route.params.data) {
			const data = route.params.data;
			switch (route.params.nav) {
				case 'AidRequestAnimalList': {
					//보호요청 글쓰기 템플릿
					navigation.push('WriteAidRequest', {data: data});
					break;
				}
				case 'WriteAidRequest': {
					//보호요청 게시글 쓰기 분기
					if (!data.protect_request_content || !data.protect_request_title) {
						Modal.popOneBtn('보호 요청 내용과 제목은 \n 반드시 입력해주셔야합니다.', '확인', () => Modal.close());
					} else {
						Modal.popTwoBtn(
							'해당 내용으로 보호요청 \n 게시글을 작성하시겠습니까?',
							'취소',
							'확인',
							() => Modal.close(),
							() => {
								createProtectRequest(
									{
										protect_request_photos_uri: data.protect_request_photos_uri,
										shelter_protect_animal_object_id: data.shelter_protect_animal_object_id,
										protect_request_title: data.protect_request_title,
										protect_request_content: data.protect_request_content,
									},
									successed => {
										console.log('successed / createProtectRequest / SendHeader', successed);
										Modal.popNoBtn('보호요청 게시글 \n 작성이 완료되었습니다!');
										Modal.close();
										navigation.reset({
											index: 0,
											routes: [{name: 'ShelterMenu'}],
										});
									},
									err => {
										console.log('err, createProtectRequest / SendHeader', err);
									},
								);
								Modal.close();
							},
						);
					}
					break;
				}
				case 'EditAidRequest': {
					//보호 요청 게시글 수정 분기
					Modal.popTwoBtn(
						'해당 내용으로 보호요청 \n 게시글을 수정하시겠습니까?',
						'취소',
						'확인',
						() => Modal.close(),
						() => {
							updateProtectRequest(
								{
									protect_request_object_id: data.protect_request_object_id,
									protect_request_photos_uri: data.protect_request_photos_uri,
									protect_photos_to_delete: data.protect_photos_to_delete,
									protect_request_content: data.protect_request_content,
									protect_request_title: data.protect_request_title,
								},
								result => {
									// console.log('result / updateProtectRequest / SendHeader : ', result.msg);
									navigation.goBack();
								},
								err => {
									console.log('err / updateProtectRequest / SendHeader : ', err);
								},
							);

							Modal.close();
						},
					);
					break;
				}
				default:
					break;
			}
		} else {
			Modal.popOneBtn('선택하신 보호요청 게시글이 없습니다!', '선택완료', () => Modal.close());
		}
	};

	const titleStyle = [{textAlign: 'center'}, txt.noto40b, route.params?.type ? {color: RED} : {}];

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>

			<View style={style.titleContainer}>
				<Text style={titleStyle}>{options.title}</Text>
			</View>

			<Send60_Big onPress={onSend} />
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 135 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 126 * DP,
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
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		padding: 10 * DP,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
