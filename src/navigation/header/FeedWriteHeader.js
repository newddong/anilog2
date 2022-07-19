import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, Keyboard} from 'react-native';
import {BackArrow32, Bracket48, Send60_Big} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10, GRAY10, GRAY40} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import {RED10} from 'Root/config/color';
import {createFeed, createMissing, createReport, editFeed, editMissingReport, getFeedDetailById} from 'Root/api/feedapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import feed_obj from 'Root/config/feed_obj';
import {useNavigation} from '@react-navigation/core';
import {createThumbnail} from 'react-native-create-thumbnail';

export default FeedWriteHeader = ({route, options}) => {
	const navigation = useNavigation();
	const userInfo = userGlobalObject;
	const param = route.params;
	const [sent, setSent] = React.useState(false);

	const complete = result => {
		setSent(true);
		Modal.close();
		setTimeout(() => {
			Modal.popNoBtn('게시물 등록이 완료되었습니다.');
		}, 100);
		setTimeout(() => {
			Modal.close();
			if (param.tab == 'Protection') {
				//동물보호 탭의 긴급게시를 통해 실종,제보 글을 작성하는 분기
				navigation.reset({
					// 작성화면으로 돌아가지 않도록 네비게이션 스택초기화
					index: 1,
					routes: [
						{
							name: 'ProtectionTab',
							params: {
								isMissing: true,
							},
						},
						{key: result.msg._id, name: param.feedType == 'Report' ? 'ReportDetail' : 'MissingAnimalDetail', params: {_id: result.msg._id}},
					],
				});
			} else {
				if (route.name == 'FeedEdit') {
					if (param.routeName == 'FeedCommentList') {
						getFeedDetailById(
							{feedobject_id: param._id},
							result => {
								// navigation.navigate('FeedCommentList', {feedobject: result.msg});
								setTimeout(() => {
									navigation.reset({
										index: 1,
										routes: [{name: 'MainTab'}, {name: 'FeedCommentList', params: {feedobject: result.msg}}],
									});
								}, 200);
							},
							err => {
								console.log('err / getFeedDetailById / FeedWriteHeader : ', err);
							},
						);
					} else {
						let edited = {...route.params, feed_medias: result.msg.feed_medias, feed_thumbnail: result.msg.feed_thumbnail};
						if (route.params && route.params.feed_type == 'report') {
							edited.report_witness_location = result.msg?.report_witness_location;
						}
						feed_obj.edit_obj = edited; //피드수정 => 수정한 리스트 아이템만 setData하기 위한 오브젝트
						feed_obj.shouldUpdateByEdit = true;
						navigation.goBack();
					}
				} else {
					//일반 피드 글쓰기 분기
					// console.log('navigation.getState()', navigation.getState());
					const navi = navigation.getState();
					if (navi.routeNames.includes('ProtectionTab')) {
						//동물보호 탭에서 글쓰기
						feed_obj.shouldUpdateUserProfile = true;
						feed_obj.feed_writer = route.params.feed_avatar_id;
						navigation.goBack();
					} else
						navigation.navigate('MainTab', {
							screen: 'FEED',
							params: {
								screen: 'MainHomeFeedList',
								params: {refreshing: true},
							},
						});
				}
			}
		}, 200);
	};

	const handleError = err => {
		console.log('err', err);
		Modal.close();
		setSent(false);
		Modal.popOneBtn(err, '확인', () => Modal.close());
	};

	const onCreate = () => {
		Keyboard.dismiss();
		if (!sent) {
			setSent(true);
			if (route.params.feed_medias[0] == undefined) {
				setSent(false);
				Modal.popOneBtn('이미지 등록은 필수 사항입니다.', '확인', () => {
					Modal.close();
				});
				return;
			}
			Modal.popNoBtn('게시물을 등록중입니다.', () => {
				Modal.close();
				setSent(false);
			});
			let param = {
				...route.params,
				media_uri: route.params.selectedPhoto.map(v => {
					return v.videoUri ?? v.cropUri ?? v.uri;
				}),
				feed_medias: route.params.feed_medias.map(f => {
					route.params.selectedPhoto.some(v => {
						if ((v.videoUri ?? v.cropUri ?? v.uri) == f.media_uri) {
							f.is_video = v.isVideo ?? v.is_video;
						}
					});

					return f;
				}),
				hashtag_keyword: route.params.hashtag_keyword?.map(v => v.substring(1)),
			};
			// console.log('param', param);
			switch (route.params?.feedType) {
				case 'Feed':
					console.log('feed Param', JSON.stringify(param));
					if (param.feed_medias[0].is_video) {
						createThumbnail({url: param.feed_medias[0].media_uri, timeStamp: 500})
							.then(r => {
								console.log('썸네일 생성', r);
								param.media_uri = param.media_uri.concat(r.path);
								// param.media_uri = param.media_uri.concat(r.path.includes('://')?r.path:'file:/'+r.path);
								createFeed(param, complete, handleError);
							})
							.catch(e => {
								createFeed(param, complete, handleError);
							});
					} else {
						createFeed(param, complete, handleError);
					}
					break;
				case 'Missing':
					{
						console.log('Before Write Missing ', param);
						const data = param;
						delete data.feed_location;
						if (data.missing_animal_species == '동물종류') {
							Modal.alert('실종동물의 분류를 \n 선택해주세요.');
							setSent(false);
						} else if (data.missing_animal_lost_location.city == '광역시, 도' || data.missing_animal_lost_location.district == '구를 선택') {
							Modal.alert('실종위치는 반드시 \n선택해주셔야합니다!');
							setSent(false);
							/*} else if (!check.test(data.missing_animal_age)) {
							Modal.alert('실종동물의 나이는 \n숫자만 입력가능합니다!');*/
						} else if (data.missing_animal_date == '눌러서 지정해주세요!') {
							Modal.alert('실종 날짜를 선택해주세요.');
							setSent(false);
						} else if (
							data.missing_animal_species != '동물종류' &&
							data.missing_animal_species_detail != '품종' &&
							(data.feed_content || data.feed_medias) &&
							data.media_uri.length > 0 &&
							(data.missing_animal_age == 0 || data.missing_animal_age) &&
							data.missing_animal_features &&
							data.missing_animal_sex &&
							data.missing_animal_date &&
							data.missing_animal_lost_location &&
							data.missing_animal_contact
						) {
							console.log('NotNull 통과');
							createMissing(param, complete, handleError);
						} else {
							Modal.popOneBtn('작성란은 모두 작성해주셔야합니다.\n (사진 포함)', '확인', () => Modal.close());
							setSent(false);
						}
					}
					break;
				case 'Report':
					{
						const data = param;
						if (data.report_location.city == '광역시, 도' || data.report_location.district == '시,군,구') {
							Modal.alert('제보위치는 반드시 \n선택해주셔야합니다.');
							setSent(false);
						} else if (data.report_witness_date == '' || data.report_witness_date == '눌러서 지정해주세요!') {
							Modal.alert('제보 날짜를 선택해주세요.');
							setSent(false);
						} else {
							data.report_witness_location =
								(data.report_location.city || '') + ' ' + (data.report_location.district || '') + ' ' + (data.report_location.detail || '');

							console.log('Before Write Report ', data);
							delete data.feed_location;
							if (
								// data.addr &&
								(data.feed_content || data.feed_medias) &&
								data.media_uri.length > 0 &&
								// data.report_animal_species &&
								data.report_witness_date &&
								data.report_witness_location
							) {
								console.log('NotNull 통과');
								Modal.popNoBtn('게시물을 등록중입니다.', () => {
									Modal.close();
									setSent(false);
								});
								createReport(param, complete, handleError);
								// Modal.close();
							} else {
								setSent(false);
							}
						}
					}
					break;
				default:
					break;
			}
		}

		userGlobalObject.t.y = 0;
	};

	const onEdit = () => {
		// Modal.popLoading(true);
		try {
			Keyboard.dismiss();
			if (!sent) {
				setSent(true);
				Modal.popNoBtn('게시물을 수정중입니다.', () => {
					Modal.close();
					setSent(false);
				});
				let changeTextRegex = /([#@])([^#@\s]+)/gm;
				let param = {
					...route.params,
					feedobject_id: route.params._id,
					media_uri: route.params.selectedPhoto?.map(v => {
						return v.videoUri ?? v.cropUri ?? v.uri;
					}),
					feed_medias: route.params.feed_medias.map(f => {
						route.params.selectedPhoto?.some(v => {
							if ((v.cropUri ?? v.uri) == f.media_uri) {
								f.is_video = v.isVideo ?? v.is_video;
								f.media_uri = v.videoUri ?? v.cropUri ?? v.uri;
							}
						});
						return f;
					}),
					feed_content: route.params.isEdit ? route.params.feed_content : route.params.feed_content.replace(changeTextRegex, '&$1&$1$1$2%&%&$1&$1'),
					hashtag_keyword: route.params.hashtag_keyword?.map(v => v.substring(1)),
				};

				console.log('onEdit / FeedWrtieHeader', param);
				const te = {
					__v: 0,
					_id: '62d60cae9b725bf32986f8e3',
					feed_comment_count: 0,
					feed_content: '피드 수정 태그 추가',
					feed_date: '2022-07-19T01:45:18.764Z',
					feed_favorite_count: 0,
					feed_is_delete: false,
					feed_is_like: false,
					feed_is_protect_diary: false,
					feed_like_count: 0,
					feed_medias: [
						{
							duration: 0,
							is_video: false,
							media_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1658195118657_4CB89490-1641-4DF8-92BB-CC9E8AFEA2E8.jpg',
							tags: [Array],
						},
					],
					feed_public_type: 'public',
					feed_thumbnail: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1658195118657_4CB89490-1641-4DF8-92BB-CC9E8AFEA2E8.jpg',
					feed_type: 'feed',
					feed_update_date: '2022-07-19T01:45:18.764Z',
					feedobject_id: '62d60cae9b725bf32986f8e3',
					hashtag_keyword: [],
					height: 505.44,
					is_favorite: false,
					media_uri: undefined,
					missing_animal_date: '2022-07-19T01:45:18.764Z',
					offset: 143.52,
					photoToDelete: [],
					report_witness_date: '2022-07-19T01:45:18.764Z',
					routeName: undefined,
					type: 'FeedObject',
				};
				if (param.feed_type == 'feed') {
					if (param.feed_medias[0].is_video) {
						createThumbnail({url: param.feed_medias[0].media_uri, timeStamp: 500})
							.then(r => {
								console.log('썸네일 생성', r);
								param.media_uri = route.params.selectedPhoto?.length > 0 ? param.media_uri.concat(r.path) : [r.path];
								console.log('TJs', param.media_uri);
								editFeed(param, complete, handleError);
							})
							.catch(e => {
								editFeed(param, complete, handleError);
							});
					} else {
						editFeed(param, complete, handleError);
					}
				} else if (param.feed_type == 'report') {
					const data = param;
					if (data.report_location.city == '광역시, 도' || data.report_location.district == '구를 선택') {
						Modal.alert('제보위치는 반드시 \n선택해주셔야합니다.');
						setSent(false);
					} else if (data.report_witness_date == '') {
						// console.log('ddddd');
						Modal.close();
						setTimeout(() => {
							Modal.alert('제보 날짜를 선택해주세요.');
							setSent(false);
						}, 200);
					} else {
						console.log('제보날짜 제보위치는 넘어감', data.photoToDelete);
						data.report_witness_location =
							(data.report_location.city || '') + ' ' + (data.report_location.district || '') + ' ' + (data.report_location.detail || '');
						delete data.report_location;
						delete data.offset;
						if (
							(data.feed_content || data.feed_medias) &&
							// data.media_uri.length > 0 &&
							// data.report_animal_species &&
							data.report_witness_date &&
							data.report_witness_location
						) {
							// console.log('NotNull 통과', data);
							editMissingReport(
								{
									feedobject_id: data.feedobject_id,
									feed_content: data.feed_content,
									hashtag_keyword: data.hashtag_keyword,
									media_uri: data.media_uri,
									photos_to_delete: data.photoToDelete,
									report_witness_date: data.report_witness_date,
									report_witness_location: data.report_witness_location,
									report_animal_species: data.report_animal_species,
								},
								complete,
								handleError,
							);
							Modal.close();
						}
					}
				} else if (param.feed_type == 'missing') {
					const data = param;
					delete data.feed_location;

					let check = /^[0-9]+$/;
					if (data.missing_animal_lost_location.city == '광역시, 도' || data.missing_animal_lost_location.district == '구를 선택') {
						Modal.alert('실종위치는 반드시 \n선택해주셔야합니다!');
						setSent(false);
						/*} else if (!check.test(data.missing_animal_age)) {
						Modal.alert('실종동물의 나이는 \n숫자만 입력가능합니다!');*/
					} else if (
						data.missing_animal_species &&
						data.missing_animal_species_detail &&
						(data.feed_content || data.feed_medias) &&
						data.feed_medias.length > 0 &&
						(data.missing_animal_age == 0 || data.missing_animal_age) &&
						data.missing_animal_features &&
						data.missing_animal_date &&
						data.missing_animal_sex &&
						data.missing_animal_date &&
						data.missing_animal_lost_location &&
						data.missing_animal_contact
					) {
						console.log('NotNull 통과');
						editMissingReport(
							{
								feedobject_id: data.feedobject_id,
								feed_content: data.feed_content,
								hashtag_keyword: data.hashtag_keyword,
								media_uri: data.media_uri,
								photos_to_delete: data.photoToDelete,
								missing_animal_species: data.missing_animal_species,
								missing_animal_species_detail: data.missing_animal_species_detail,
								missing_animal_sex: data.missing_animal_sex,
								missing_animal_age: data.missing_animal_age,
								missing_animal_lost_location: data.missing_animal_lost_location,
								missing_animal_contact: data.missing_animal_contact,
								missing_animal_features: data.missing_animal_features,
								missing_animal_date: data.missing_animal_date,
							},
							complete,
							handleError,
						);
					} else {
						Modal.popOneBtn('작성란은 모두 작성해주셔야합니다.\n (사진 포함)', '확인', () => Modal.close());
						setSent(false);
					}
				}
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	const titleStyle = [{textAlign: 'center'}, txt.noto40b, route.params?.feedType != 'Feed' ? {color: RED10} : {color: '#000'}];
	const avartarSelect = () => {
		Keyboard.dismiss();
		Modal.popAvatarSelectModal(petObject => {
			console.log('petObject / onOk', petObject);
			petObject && navigation.setOptions({title: petObject.user_nickname});
			petObject && navigation.setParams({...route.params, feed_avatar_id: petObject._id});
		}, '이 계정 글쓰기');
	};

	return (
		<View style={[style.headerContainer, style.shadow, {borderBottomColor: GRAY40, borderBottomWidth: 2 * DP}]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
			{userInfo.userInfo.user_type == 'user' && route.params?.feedType == 'Feed' ? (
				<TouchableWithoutFeedback onPress={avartarSelect}>
					<View style={style.titleContainer}>
						<Text style={[titleStyle, {maxWidth: 450 * DP, marginRight: 10 * DP}]} numberOfLines={1}>
							{options.title}
						</Text>
						<Bracket48 />
					</View>
				</TouchableWithoutFeedback>
			) : (
				<View style={style.titleContainer}>
					<Text style={[titleStyle, {maxWidth: 450 * DP}]}>{options.title}</Text>
				</View>
			)}
			{sent ? (
				<View style={{}}>
					<ActivityIndicator size="small" color={'black'} />
				</View>
			) : (
				<TouchableOpacity activeOpacity={0.6} onPress={route.name == 'FeedEdit' ? onEdit : onCreate}>
					<Send60_Big />
				</TouchableOpacity>
			)}
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
