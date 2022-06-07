import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BackArrow32, Meatball50_GRAY20_Horizontal, Report30, Report48} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {createReport} from 'Root/api/report';
import {REPORT_MENU} from 'Root/i18n/msg';
import {updateAndDeleteCommunity} from 'Root/api/community';

export default CommunityHeader = ({navigation, route, options, back}) => {
	// console.log('options', JSON.stringify(options.data));
	const tt = {
		_id: '62989bf158baa2654b688857',
		type: 'CommunityObject',
		community_title: '제목 주중 두줄ㄴㅁㅇㅁ누앰ㄴ앰;나이;ㅣ;ㅁ나이;',
		community_content:
			'<div><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1654168558507_99A4F318-2776-4EAE-9B28-0BF9527C42DF.jpg" id="image" style="height: auto; width: 327.6;  border-radius:15px; object-fit:contain;  margin:5px 0px 5px 0px; "></div><p><br></p>',
		community_content_without_html: '',

		community_date: '2022-06-02T11:16:01.501Z',
		community_is_temporary: false,
		community_is_delete: false,
		community_is_recomment: false,
		community_is_attached_file: true,
		community_type: 'free',
		community_free_type: 'question',
		community_interests: {
			interests_trip: [],
			interests_hospital: [],
			interests_interior: [],
			interests_etc: [],
			interests_review: [],
			interests_location: {city: '', district: ''},
		},
		community_address: {
			road_address: {address_name: '', city: '', district: '', _id: '62989bf158baa2654b688859'},
			normal_address: {address_name: '', city: '', district: '', _id: '62989bf158baa2654b68885a'},
			region: {latitude: '', longitude: '', _id: '62989bf158baa2654b68885b'},
			_id: '62989bf158baa2654b688858',
		},
		community_like_count: 0,
		community_favorite_count: 0,
		community_comment_count: 1,
		__v: 0,
		community_recent_comment: {comment_contents: '순ㄱㄴ', comment_id: '629ec248f75c475c7d3e25d9', comment_user_nickname: '몽키6'},
		community_is_like: false,
		community_is_favorite: false,
	};

	// console.log('route', route.params);
	const data = options.data;

	const onPressReport = () => {
		Modal.close();
		if (userGlobalObject.userInfo.isPreviewMode) {
			setTimeout(() => {
				Modal.popLoginRequestModal(() => {
					navigation.navigate('Login');
				});
			}, 100);
		} else {
			setTimeout(() => {
				Modal.popOneBtnSelectModal(
					REPORT_MENU,
					'이 게시물을 신고 하시겠습니까?',
					selectedItem => {
						createReport(
							{
								report_target_object_id: options.data._id,
								report_target_object_type: 'communityobjects',
								report_target_reason: selectedItem,
								report_is_delete: false,
							},
							result => {
								console.log('신고 완료', result);
								Modal.close();
								Modal.popOneBtn('신고 완료되었습니다.', '확인', () => Modal.close());
							},
							err => {
								Modal.close();
								if (err == '이미 신고되었습니다.') {
									Modal.popOneBtn('이미 신고하셨습니다.', '확인', () => Modal.close());
								}
							},
						);
					},
					'신고',
				);
			}, 200);
		}
	};

	//제목 우측 미트볼 클릭
	const onPressMeatball = () => {
		// console.log(' data.community_writer_id', data.community_writer_id);
		if (data.community_writer_id) {
			Modal.popSelectBoxModal(
				['수정', '삭제'],
				select => {
					switch (select) {
						case '수정':
							navigation.push('CommunityEdit', {previous: data, isReview: false, isSearch: props.route.params.searchInput});
							break;
						case '삭제':
							Modal.close();
							setTimeout(() => {
								Modal.popTwoBtn(
									'정말로 이 게시글을 \n 삭제하시겠습니까?',
									'아니오',
									'네',
									() => Modal.close(),
									() => {
										updateAndDeleteCommunity(
											{
												community_object_id: data._id,
												community_is_delete: true,
											},
											result => {
												// console.log('result / updateAndDeleteCommunity / ArticleDetail : ', result.msg);
												Modal.close();
												setTimeout(() => {
													Modal.popNoBtn('게시글 삭제가 완료되었습니다.');
													setTimeout(() => {
														Modal.close();
														navigation.goBack();
													}, 600);
												}, 200);
											},
											err => {
												console.log('err / updateAndDeleteCommunity / ArticleDetail : ', err);
												Modal.alert(err);
											},
										);
									},
								);
							}, 200);
							break;
						default:
							break;
					}
				},
				() => Modal.close(),
				false,
				false,
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
			<Text numberOfLines={1} style={[{flex: 1, textAlign: 'center', marginLeft: 30 * DP, marginRight: 80 * DP}, txt.roboto40b]}>
				{options.title ? options.title : route.params.title}
			</Text>
			{data && data.community_writer_id._id == userGlobalObject.userInfo._id ? (
				<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
			) : (
				<TouchableOpacity onPress={onPressReport} style={{padding: 10 * DP}} activeOpacity={0.8}>
					<Report48 />
				</TouchableOpacity>
			)}
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'flex-start',
		paddingHorizontal: 28 * DP,
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
