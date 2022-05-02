import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {BackArrow32, Bracket48, Send60_Big} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import {RED} from 'Root/config/color';
import {createFeed, createMissing, createReport, editFeed} from 'Root/api/feedapi';
import userGlobalObject from 'Root/config/userGlobalObject';

export default FeedWriteHeader = ({route, navigation, options}) => {
	const userInfo = userGlobalObject;
	const complete = result => {
		Modal.close();
		Modal.popNoBtn('게시물 등록이 완료되었습니다.');
		setTimeout(() => {
			Modal.close();
			navigation.goBack();
		}, 200);
	};
	const handleError = err => {
		console.log('err', err);
		Modal.close();
		Modal.popOneBtn(err, '확인', () => Modal.close());
	};

	const onCreate = () => {
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
				console.log('feed Param', param);
				// Modal.close();
				createFeed(param, complete, handleError);
				break;
			case 'Missing':
				{
					// console.log('Before Write Report ', param);
					const data = param;
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
		userGlobalObject.t.y = 0;
	};

	const onEdit = () => {
		// if (route.params.feed_medias[0] == undefined) {
		// 	Modal.popOneBtn('이미지 등록은 필수 사항입니다.', '확인', () => {
		// 		Modal.close();
		// 	});
		// 	return;
		// }
		// console.log('route.params:', route.params);
		// Modal.popNoBtn('게시물을 수정중입니다.');
		let changeTextRegex = /([#@])([^#@\s]+)/gm;
		let param = {
			...route.params,
			feedobject_id: route.params._id,
			feed_content: route.params.isEdit ? route.params.feed_content : route.params.feed_content.replace(changeTextRegex, '&$1&$1$1$2%&%&$1&$1'),
			hashtag_keyword: route.params.hashtag_keyword?.map(v => v.substring(1)),
		};
		editFeed(param, complete, handleError);
		console.log('수정 파라메터', param);
		switch (route.params?.feedType) {
			case 'Feed':
				break;
			case 'Missing':
				break;
			case 'Report':
				break;
			default:
				break;
		}
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
