import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {BackArrow32, Bracket48, Send60_Big} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import {RED} from 'Root/config/color';
import {createFeed, createMissing, createReport, editFeed, getFeedDetailById} from 'Root/api/feedapi';
import userGlobalObject from 'Root/config/userGlobalObject';

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
					console.log('dd', param.routeName);
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
						navigation.goBack();
					}
				} else {
					navigation.goBack();
				}
			}
		}, 200);
	};
	const handleError = err => {
		console.log('err', err);
		Modal.close();
		Modal.popOneBtn(err, '확인', () => Modal.close());
	};

	const onCreate = () => {
		if (!sent) {
			if (route.params.feed_medias[0] == undefined) {
				Modal.popOneBtn('이미지 등록은 필수 사항입니다.', '확인', () => {
					Modal.close();
				});
				return;
			}
			// console.log('route.params:', route.params);
			Modal.popNoBtn('게시물을 등록중입니다.');
			let param = {...route.params, hashtag_keyword: route.params.hashtag_keyword?.map(v => v.substring(1))};
			switch (route.params?.feedType) {
				case 'Feed':
					console.log('feed Param', JSON.stringify(param));
					// Modal.close();
					createFeed(param, complete, handleError);
					break;
				case 'Missing':
					{
						// console.log('Before Write Report ', param);
						const data = param;
						delete data.feed_location;
						let check = /^[0-9]+$/;
						if (data.missing_animal_lost_location.city == '광역시, 도' || data.missing_animal_lost_location.district == '구를 선택') {
							Modal.alert('실종위치는 반드시 \n선택해주셔야합니다!');
						} else if (!check.test(data.missing_animal_age)) {
							Modal.alert('실종동물의 나이는 \n숫자만 입력가능합니다!');
						} else if (
							data.missing_animal_species &&
							data.missing_animal_species_detail &&
							(data.feed_content || data.feed_medias) &&
							data.media_uri.length > 0 &&
							data.missing_animal_age &&
							data.missing_animal_features &&
							data.missing_animal_date &&
							data.missing_animal_sex &&
							data.missing_animal_date &&
							data.missing_animal_lost_location &&
							data.missing_animal_contact
						) {
							console.log('NotNull 통과');
							createMissing(param, complete, handleError);
							Modal.close();
						} else {
							Modal.popOneBtn('작성란은 모두 작성해주셔야합니다.\n (사진 포함)', '확인', () => Modal.close());
						}
					}
					break;
				case 'Report':
					{
						const data = param;
						if (data.report_location.city == '광역시, 도' || data.report_location.district == '구를 선택') {
							Modal.alert('제보위치는 반드시 \n선택해주셔야합니다.');
						} else if (data.report_witness_date == '') {
							Modal.alert('제보 날짜를 선택해주세요.');
						}

						data.report_witness_location =
							(data.report_location.city || '') + ' ' + (data.report_location.district || '') + ' ' + (data.report_location.detail || '');

						console.log('Before Write Report ', data);
						delete data.feed_location;
						if (
							// data.addr &&
							(data.feed_content || data.feed_medias) &&
							data.media_uri.length > 0 &&
							data.report_animal_species &&
							data.report_witness_date &&
							data.report_witness_location
						) {
							console.log('NotNull 통과');
							createReport(param, complete, handleError);
							Modal.close();
						}
						// Modal.close();
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
		let changeTextRegex = /([#@])([^#@\s]+)/gm;
		let param = {
			...route.params,
			feedobject_id: route.params._id,
			feed_content: route.params.isEdit ? route.params.feed_content : route.params.feed_content.replace(changeTextRegex, '&$1&$1$1$2%&%&$1&$1'),
			hashtag_keyword: route.params.hashtag_keyword?.map(v => v.substring(1)),
			// feed
		};
		console.log('onEdit', param);
		const e = {
			__v: 1,
			_id: '6282088a4d98981bd3c08e33',
			feed_avatar_id: {
				__v: 20,
				_id: '623b17ed400ac30b877dd7d9',
			},
			feed_comment_count: 0,
			feed_content: 'ㅋㅇㅇㅋ',
			feed_date: '2022-05-16T08:17:14.881Z',
			feed_favorite_count: 0,
			feed_is_delete: false,
			feed_is_like: false,
			feed_is_protect_diary: false,
			feed_like_count: 0,
			feed_medias: [
				{
					duration: 0,
					is_video: false,
					media_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1652689034763_9D1B37AE-4873-4FF9-944B-B78E045C4043.jpg',
					tags: [Array],
				},
			],
			feed_thumbnail: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1652689034763_9D1B37AE-4873-4FF9-944B-B78E045C4043.jpg',
			feed_type: 'feed',
			feed_update_date: '2022-05-16T08:17:39.387Z',
			feed_writer_id: {
				__v: 20,
				_id: '623b17ed400ac30b877dd7d9',
			},
			feedobject_id: '6282088a4d98981bd3c08e33',
			hashtag_keyword: undefined,
			height: 479.44,
			isEdit: true,
			media_uri: [],
			missing_animal_date: '2022-05-16T08:17:14.881Z',
			offset: 958.88,
			report_witness_date: '2022-05-16T08:17:14.881Z',
			routeName: undefined,
			type: 'FeedObject',
		};

		const gg = {
			__v: 0,
			_id: '62820a3b4d98981bd3c08f41',
			feed_avatar_id: {
				__v: 20,
				_id: '623b17ed400ac30b877dd7d9',
			},
			feed_comment_count: 0,
			feed_content: '고향밥',
			feed_date: '2022-05-16T08:24:27.475Z',
			feed_favorite_count: 0,
			feed_is_delete: false,
			feed_is_like: false,
			feed_is_protect_diary: false,
			feed_like_count: 0,
			feed_location: {
				_id: '62820a3b4d98981bd3c08f42',
				detail: '까페',
				normal_address: {
					_id: '62820a3b4d98981bd3c08f44',
					address_name: '제주특별자치도 서귀포시 대정읍 무릉리 310 까페',
					city: '제주특별자치도',
					district: '서귀포시',
				},
				region: {_id: '62820a3b4d98981bd3c08f45', latitude: '33.28278213', longitude: '126.243010844'},
				road_address: {
					_id: '62820a3b4d98981bd3c08f43',
					address_name: '제주특별자치도 서귀포시 대정읍 대한로 632 까페',
					city: '제주특별자치도',
					district: '서귀포시',
				},
			},
			feed_medias: [
				{
					duration: 0,
					is_video: false,
					media_uri:
						'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1652689467337_rn_image_picker_lib_temp_f82ed968-a49c-4daa-93ef-f7f29bfb5a12.jpg',
					tags: [Array],
				},
			],
			feed_thumbnail:
				'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1652689467337_rn_image_picker_lib_temp_f82ed968-a49c-4daa-93ef-f7f29bfb5a12.jpg',
			feed_type: 'feed',
			feed_update_date: '2022-05-16T08:24:27.475Z',
			feed_writer_id: {
				__v: 20,
				_id: '623b17ed400ac30b877dd7d9',
			},
			feedobject_id: '62820a3b4d98981bd3c08f41',
			hashtag_keyword: [],
			height: 479.44,
			media_uri: [],
			missing_animal_date: '2022-05-16T08:24:27.475Z',
			offset: 0,
			report_witness_date: '2022-05-16T08:24:27.475Z',
			routeName: undefined,
			type: 'FeedObject',
		};
		editFeed(param, complete, handleError);
	};

	const titleStyle = [{textAlign: 'center'}, txt.noto40b, route.params?.feedType != 'Feed' ? {color: RED} : {color: '#000'}];

	const avartarSelect = () => {
		Modal.popAvatarSelectModal(petObject => {
			console.log('petObject / onOk', petObject);
			petObject && navigation.setOptions({title: petObject.user_nickname});
			petObject && navigation.setParams({...route.params, feed_avatar_id: petObject._id});
		}, '이 계정 글쓰기');
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
			{userInfo.userInfo.user_type == 'user' && route.params?.feedType == 'Feed' ? (
				<TouchableWithoutFeedback onPress={avartarSelect}>
					<View style={style.titleContainer}>
						<Text style={[titleStyle, {maxWidth: 450 * DP}]} numberOfLines={1}>
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
			<Send60_Big onPress={route.name == 'FeedEdit' ? onEdit : onCreate} />
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
