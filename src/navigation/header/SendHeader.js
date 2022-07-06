import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {BackArrow32, Bracket48, Send60_Big} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import {createProtectRequest, updateProtectRequest} from 'Root/api/shelterapi';
import {RED} from 'Root/config/color';
import {createCommunity, updateAndDeleteCommunity} from 'Root/api/community';

export default SendHeader = ({route, navigation, options}) => {
	// console.log('props SendHeader', route.params);
	const onSend = () => {
		Keyboard.dismiss();
		if (route.params.data) {
			const data = route.params.data;
			// console.log('data at SendHeader', JSON.stringify(data));
			switch (route.params.nav) {
				case 'AidRequestAnimalList': {
					//보호요청 글쓰기 템플릿
					navigation.navigate('WriteAidRequest', {data: data});
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
								Modal.close();
								setTimeout(() => {
									Modal.popLoading(true);
									createProtectRequest(
										{
											protect_request_photos_uri: data.protect_request_photos_uri,
											shelter_protect_animal_object_id: data.shelter_protect_animal_object_id,
											protect_request_title: data.protect_request_title,
											protect_request_content: data.protect_request_content,
										},
										successed => {
											// console.log('successed / createProtectRequest / SendHeader', successed);
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
								}, 100);
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
				case 'CommunityWrite': {
					if (!data.community_content || !data.community_title) {
						Modal.popOneBtn('게시글 내용과 제목은 \n 반드시 입력해주셔야합니다.', '확인', () => Modal.close());
					} else {
						Modal.popTwoBtn(
							'해당 내용으로 커뮤니티 \n 게시글을 작성하시겠습니까?',
							'취소',
							'확인',
							() => Modal.close(),
							() => {
								Modal.close();
								let getImgTag = data.community_content.match(/<img[\w\W]+?\/?>/g); //img 태그 추출
								const attachedCheck = !(getImgTag == null); //추가된 img 태그가 있다면 is_attatched_file은 true or false
								const removeLine = data.community_content.replace('<p id="toDelete"><br></p>', '');
								setTimeout(() => {
									Modal.popLoading(true, () => navigation.goBack());
									createCommunity(
										{...data, community_is_attached_file: attachedCheck, community_content: removeLine},
										result => {
											// console.log('result / createCommunity / SendHeader ', result.msg);
											navigation.reset({
												index: 0,
												routes: [{name: 'CommunityMain', params: {isReview: data.community_type != 'free'}}],
											});
										},
										err => {
											console.log('err / createCommunity / SendHeader ', err);
										},
									);
								}, 200);
							},
						);
					}
					break;
				}
				case 'CommunityEdit': {
					if (!data.community_content || !data.community_title) {
						Modal.popOneBtn('게시글 내용과 제목은 \n 반드시 입력해주셔야합니다.', '확인', () => Modal.close());
					} else {
						Modal.popTwoBtn(
							'해당 내용으로 커뮤니티 \n 게시글을 수정하시겠습니까?',
							'취소',
							'확인',
							() => Modal.close(),
							() => {
								// console.log('data before Create', data);
								let getImgTag = data.community_content.match(/<img[\w\W]+?\/?>/g); //img 태그 추출
								const attachedCheck = !(getImgTag == null); //추가된 img 태그가 있다면 is_attatched_file은 true or false
								updateAndDeleteCommunity(
									{
										...data,
										community_object_id: data._id,
										community_is_attached_file: attachedCheck,
									},
									result => {
										// console.log('result / updateAndDeleteCommunity / SendHeader ', result.msg);
										console.log('param', route.params.isSearch);
										if (route.params.isSearch) {
											result.msg.community_type == 'review'
												? navigation.reset({
														index: 1,
														routes: [
															{name: 'SearchTab', params: {tab: 'REVIEW'}},
															{name: 'ReviewDetail', params: {community_object: result.msg, searchInput: route.params.isSearch}},
														],
												  })
												: navigation.reset({
														index: 1,
														routes: [
															{name: 'SearchTab', params: {tab: 'ARTICLE'}},
															{name: 'ArticleDetail', params: {community_object: result.msg, searchInput: route.params.isSearch}},
														],
												  });
										} else {
											result.msg.community_type == 'review'
												? navigation.reset({
														index: 1,
														routes: [{name: 'CommunityMain'}, {name: 'ReviewDetail', params: {community_object: result.msg}}],
												  })
												: navigation.reset({
														index: 1,
														routes: [{name: 'CommunityMain'}, {name: 'ArticleDetail', params: {community_object: result.msg}}],
												  });
										}
									},
									err => {
										console.log('err / updateAndDeleteCommunity / sendHeader ', err);
									},
								);
								Modal.close();
							},
						);
					}
				}
				default:
					break;
			}
		} else {
			Modal.popOneBtn('선택하신 보호요청 게시글이 없습니다!', '선택완료', () => Modal.close());
		}
	};

	const titleStyle = [{textAlign: 'center'}, txt.noto40b, route.params?.type ? {color: RED} : {}];

	const [backPressed, setBackPressed] = React.useState(false);

	const onPressBackButton = () => {
		setBackPressed(true);
		if (!backPressed) {
			navigation.goBack();
		}
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity style={style.backButtonContainer} onPress={onPressBackButton}>
				<BackArrow32 />
			</TouchableOpacity>

			<View style={style.titleContainer}>
				<Text style={[titleStyle]}>{options.title}</Text>
			</View>
			<Send60_Big onPress={onSend} />
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 98 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 28 * DP,
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
