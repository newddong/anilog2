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

export default FeedWriteHeader = ({route, navigation, options}) => {
	const userInfo = userGlobalObject;
	const param = route.params;
	const [sent, setSent] = React.useState(false);

	const complete = result => {
		setSent(true);
		Modal.close();
		Modal.popNoBtn('게시물 등록이 완료되었습니다.');
		// console.log('route.params', route.params);
		setTimeout(() => {
			Modal.close();
			if (param.tab == 'Protection') {
				if (param.feedType == 'Report') {
					navigation.navigate('ReportDetail', {_id: result.msg._id});
				} else if (param.feedType == 'Missing') {
					let sexValue = '';
					switch (result.msg.missing_animal_sex) {
						case 'male':
							sexValue = '남';
							break;
						case 'female':
							sexValue = '여';
							break;
						case 'unknown':
							sexValue = '성별모름';
							break;
					}
					const titleValue = result.msg.missing_animal_species + '/' + result.msg.missing_animal_species_detail + '/' + sexValue;
					navigation.navigate('MissingAnimalDetail', {title: titleValue, _id: result.msg._id});
				} else {
					navigation.goBack();
				}
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
						// console.log('route.params', route.params);

						feed_obj.edit_obj = route.params; //피드수정 => 수정한 리스트 아이템만 setData하기 위한 오브젝트
						feed_obj.shouldUpdate = true;
						navigation.goBack();
					}
				} else {
					// console.log('result', result);
					if (navigation.getState().routes[0]) {
						// navigation.navigate({key: navigation.getState().routes[0].key, name: 'MainTab'});
						navigation.navigate('MainTab', {
							screen: 'FEED',
							params: {
								screen: 'MainHomeFeedList',
								params: {refreshing: true},
							},
						});
					} else navigation.goBack();
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
		console.log('sent?', sent);
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
					return v.cropUri ?? v.uri;
				}),
				hashtag_keyword: route.params.hashtag_keyword?.map(v => v.substring(1)),
			};
			switch (route.params?.feedType) {
				case 'Feed':
					console.log('feed Param', JSON.stringify(param));
					createFeed(param, complete, handleError);
					break;
				case 'Missing':
					{
						// console.log('Before Write Report ', param);
						const data = param;
						delete data.feed_location;
						if (data.missing_animal_lost_location.city == '광역시, 도' || data.missing_animal_lost_location.district == '구를 선택') {
							Modal.alert('실종위치는 반드시 \n선택해주셔야합니다!');
							setSent(false);
							/*} else if (!check.test(data.missing_animal_age)) {
							Modal.alert('실종동물의 나이는 \n숫자만 입력가능합니다!');*/
						} else if (data.missing_animal_date == '눌러서 지정해주세요!') {
							Modal.alert('실종 날짜를 선택해주세요.');
							setSent(false);
						} else if (
							data.missing_animal_species &&
							data.missing_animal_species_detail &&
							(data.feed_content || data.feed_medias) &&
							data.media_uri.length > 0 &&
							data.missing_animal_age &&
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
						console.log('data.report_witness_date', data.report_witness_date);
						if (data.report_location.city == '광역시, 도' || data.report_location.district == '구를 선택') {
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
								createReport(param, complete, handleError);
								Modal.close();
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
		Modal.popLoading(true);
		Keyboard.dismiss();
		let changeTextRegex = /([#@])([^#@\s]+)/gm;
		let param = {
			...route.params,
			feedobject_id: route.params._id,
			media_uri: route.params.selectedPhoto?.map(v => {
				return v.cropUri ?? v.uri;
			}),
			feed_content: route.params.isEdit ? route.params.feed_content : route.params.feed_content.replace(changeTextRegex, '&$1&$1$1$2%&%&$1&$1'),
			hashtag_keyword: route.params.hashtag_keyword?.map(v => v.substring(1)),
		};
		// console.log('onEdit / FeedWrtieHeader', param);
		if (param.feed_type == 'feed') {
			editFeed(param, complete, handleError);
		} else if (param.feed_type == 'report') {
			const data = param;
			if (data.report_location.city == '광역시, 도' || data.report_location.district == '구를 선택') {
				Modal.alert('제보위치는 반드시 \n선택해주셔야합니다.');
			} else if (data.report_witness_date == '') {
				// console.log('ddddd');
				Modal.close();
				setTimeout(() => {
					Modal.alert('제보 날짜를 선택해주세요.');
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
				/*} else if (!check.test(data.missing_animal_age)) {
				Modal.alert('실종동물의 나이는 \n숫자만 입력가능합니다!');*/
			} else if (
				data.missing_animal_species &&
				data.missing_animal_species_detail &&
				(data.feed_content || data.feed_medias) &&
				data.feed_medias.length > 0 &&
				data.missing_animal_age &&
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
			}
		}
	};

	const titleStyle = [{textAlign: 'center'}, txt.noto40b, route.params?.feedType != 'Feed' ? {color: RED10} : {color: '#000'}];
	const avartarSelect = () => {
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
