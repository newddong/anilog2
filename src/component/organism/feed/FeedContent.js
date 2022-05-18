import React from 'react';
import {Text, View, Platform} from 'react-native';
import {organism_style, feedContent_style} from 'Organism/style_organism';
import UserLocationTimeLabel from 'Molecules/label/UserLocationTimeLabel';
import {useNavigation, useRoute} from '@react-navigation/core';
import {FavoriteTag48_Border, FavoriteTag48_Filled, Meatball50_GRAY20_Horizontal, Share48_Filled} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {Arrow_Down_GRAY20} from 'Atom/icon';
import DP from 'Root/config/dp';
import {GRAY10} from 'Root/config/color';
import {
	FEED_MEATBALL_MENU,
	FEED_MEATBALL_MENU_FOLLOWING,
	FEED_MEATBALL_MENU_FOLLOWING_UNFAVORITE,
	FEED_MEATBALL_MENU_MY_FEED,
	FEED_MEATBALL_MENU_MY_FEED_WITH_STATUS,
	FEED_MEATBALL_MENU_UNFOLLOWING,
	FEED_MEATBALL_MENU_UNFOLLOWING_UNFAVORITE,
	REPORT_MENU,
	SHARE,
} from 'Root/i18n/msg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {MAINCOLOR} from 'Root/config/color';
import {getTimeLapsed, parsingDate} from 'Root/util/dateutil';
import HashText from 'Molecules/info/HashText';
import Modal from 'Root/component/modal/Modal';
import {createMemoBox, followUser, getAnimalListNotRegisterWithCompanion, getFollows, unFollowUser} from 'Root/api/userapi';
import {deleteFeed, favoriteFeed, getFavoriteFeedListByUserId} from 'Root/api/feedapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import MissingReportInfo from 'Organism/info/MissingReportInfo';
import {createReport} from 'Root/api/report';
import {getStringLength, getLinesOfString, count_to_K} from 'Root/util/stringutil';

export default FeedContent = props => {
	const {
		_id,
		feed_content,
		feed_thumbnail,
		feed_medias,
		feed_location,
		feed_date,
		feed_update_date,
		feed_type,
		feed_is_protect_diary,
		feed_recent_comment,
		missing_animal_species,
		missing_animal_species_detail,
		missing_animal_sex,
		missing_animal_age,
		missing_animal_lost_location,
		missing_animal_contact,
		missing_animal_features,
		missing_animal_date,
		report_witness_date,
		report_witness_location,
		report_animal_species,
		report_animal_species_detail,
		report_animal_sex,
		report_animal_age,
		report_animal_contact,
		report_animal_features,
		feed_like_count,
		feed_favorite_count,
		feed_comment_count,
		feed_writer_id,
		feed_avatar_id,
	} = props.data;
	const navigation = useNavigation();
	const route = useRoute();
	const [btnStatus, setBtnStatus] = React.useState(false); //더보기 Arrow방향 false면 아래
	const [textLayout, setTextLayout] = React.useState({height: 0 * DP, width: 0}); // 초기의 Layout
	const [reportLayout, setReportLayout] = React.useState({height: 0, width: 0});
	const [labelLayout, setlabelLayout] = React.useState({height: 0, width: 0});
	const [show, setShow] = React.useState(false);
	const [send, setSend] = React.useState();
	const feed_writer = props.data.feed_avatar_id ? props.data.feed_avatar_id : props.data.feed_writer_id;
	React.useEffect(() => {
		if (typeof feed_avatar_id == 'object') {
			setSend(feed_avatar_id);
		} else {
			setSend(props.data.feed_writer_id);
			// console.log('props.data.feed_writer_id', props.data.feed_writer_id.is_favorite);
		}
	}, [props.data]);

	//FeedText가 담긴 View 의 onLayout
	const onLayoutText = event => {
		const {width, height} = event.nativeEvent.layout;
		setTextLayout({width, height});
	};

	//제보게시물
	const onLayoutReport = event => {
		const {width, height} = event.nativeEvent.layout;
		setReportLayout({width, height});
	};

	const onLayoutLabel = event => {
		const {width, height} = event.nativeEvent.layout;
		setlabelLayout({width, height});
	};

	React.useEffect(() => {
		if (textLayout.height + reportLayout.height + labelLayout.height + 116 * DP > 265 * DP) {
			setBtnStatus(true);
		} else {
			setBtnStatus(false);
		}
	}, [textLayout]);

	//피드 미트볼 메뉴 - 신고 클릭
	const onPressReport = context => {
		console.log('신고 context', context, props.data._id);
		Modal.close();

		setTimeout(() => {
			Modal.popOneBtnSelectModal(
				REPORT_MENU,
				'이 게시물을 신고 하시겠습니까?',
				selectedItem => {
					console.log('selected', selectedItem);
					// alert(selectedItem);
					createReport(
						{
							report_target_object_id: props.data._id,
							report_target_object_type: 'feedobjects',
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
		}, 100);
	};

	//피드 미트볼 메뉴 - 공유하기 클릭
	const onPressShare = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popSocialModal(
				() => alert('kakao'),
				() => alert('link'),
				() => alert('message'),
			);
		}, 100);
	};

	//피드 미트볼 메뉴 - 팔로우 취소
	const onPressCancelFollow = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popTwoBtn(
				feed_writer.user_nickname + '님을 팔로우 취소하시겠습니까?',
				'아니오',
				'팔로우 취소',
				() => {
					Modal.close();
				},
				() => {
					unFollowUser(
						{
							// follow_userobject_id: props.data.feed_avatar_id ? props.data.feed_avatar_id._id : props.data.feed_writer_id._id,
							follow_userobject_id: feed_writer._id,
						},
						result => {
							// console.log('result / unFollowUser / FeedContent', result.msg);
							Modal.close();
							// Modal.popNoBtn(props.data.feed_writer_id.user_nickname + '님을 \n 팔로우 취소하였습니다.');
							setTimeout(() => {
								Modal.popNoBtn(feed_writer.user_nickname + '님을 \n 팔로우 취소하였습니다.');
								setTimeout(() => {
									Modal.close();
								}, 2000);
							}, 100);
						},
						err => {
							console.log('err / unFollowUser / FeedContent', err);
							Modal.close();
						},
					);
				},
			);
		}, 100);
	};

	//팔로우 버튼
	const onPressFollow = () => {
		console.log('feed_writer._id,', feed_writer._id);
		Modal.close();
		setTimeout(() => {
			Modal.popTwoBtn(
				feed_writer.user_nickname + '님을 \n 팔로우하시겠습니까?',
				'아니오',
				'팔로우',
				() => Modal.close(),
				() => {
					followUser(
						{
							// follow_userobject_id: props.data.feed_avatar_id ? props.data.feed_avatar_id._id : props.data.feed_writer_id._id,
							follow_userobject_id: feed_writer._id,
						},
						result => {
							// console.log('result / followUser / FeedContent', result.msg);
							Modal.close();
							// Modal.popNoBtn(props.data.feed_writer_id.user_nickname + '님을 \n 팔로우하였습니다.');
							Modal.popNoBtn(feed_writer.user_nickname + '님을 \n 팔로우하였습니다.');
							setTimeout(() => {
								Modal.close();
							}, 2000);
						},
						err => {
							console.log('err / followUser / FeedContent', err);
						},
					);
				},
			);
		}, 100);
	};

	//피드 미트볼 메뉴 - 쪽지 보내기
	const onPressSendMsg = _id => {
		Modal.close();
		setTimeout(() => {
			Modal.popMessageModal(
				_id.user_nickname,
				msg => {
					createMemoBox(
						{memobox_receive_id: _id._id, memobox_contents: msg},
						result => {
							console.log('message sent success', result);
							Modal.popOneBtn('쪽지 전송하였습니다.', '확인', () => Modal.close());
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
	};

	//피드 미트볼 메뉴 - 수정 클릭
	const onPressEdit = () => {
		Modal.close();
		// console.log('props.', props.routeName);
		let editData = props.data;
		editData.routeName = props.routeName;
		navigation.navigate('FeedEdit', editData);
	};

	//피드 미트볼 메뉴 - 삭제 클릭
	const onPressDelete = () => {
		Modal.close();
		// console.log('삭제');
		console.log('props.data before Delete', props.data._id);
		setTimeout(() => {
			Modal.popTwoBtn(
				'정말로 이 게시글을 \n 삭제하시겠습니까?',
				'아니오',
				'예',
				() => Modal.close(),
				() => {
					props.deleteFeed(props.data._id);
				},
			);
		}, 200);
	};

	//피드 미트볼 - 즐겨찾기 설정
	const onFavorite = isFavorite => {
		Modal.close();
		setTimeout(() => {
			Modal.popTwoBtn(
				isFavorite ? '게시물을 즐겨찾기로 추가하시겠습니까?' : '게시물을 즐겨찾기에서 삭제 하시겠습니까?',
				'아니오',
				isFavorite ? '즐겨찾기 추가' : '즐겨찾기 삭제',
				() => Modal.close(),
				() => {
					favoriteFeed(
						{
							feedobject_id: _id,
							userobject_id: userGlobalObject.userInfo._id,
							is_favorite: isFavorite,
						},
						result => {
							// console.log('result / followUser / FeedContent', result.msg);
							Modal.close();
							Modal.popNoBtn('즐겨찾기 ' + (isFavorite ? '추가' : '삭제') + '가 완료되었습니다.');
							setTimeout(() => {
								Modal.close();
							}, 200);
						},
						err => {
							console.log('err / favorite', err);
						},
					);
				},
			);
		}, 100);
	};

	const meatballActions = context => {
		//피드 미트볼 메뉴 팝업 분기에 대한 기획의도가 불분명한 상태이므로
		//출력되는 메뉴에 대한 분기처리는 차후 처리 (현재는 더미로 적용)
		// console.log('context / FeedContent', context);
		// console.log('props.data', props.data);
		let isFavorite = context.favorite_feeds.some(feed => feed._id == _id);
		console.log('즐겨찾기됨?', isFavorite);
		let isMyFeed = userGlobalObject.userInfo._id == props.data.feed_writer_id._id;
		let feedType = props.data.feed_type;
		if (feedType == 'feed') {
			if (isMyFeed) {
				//나의 피드 게시글의 미트볼 헤더 클릭
				Modal.popSelectBoxModal(
					FEED_MEATBALL_MENU_MY_FEED,
					selectedItem => {
						if (selectedItem == '공유하기') {
							onPressShare();
						} else if (selectedItem == '수정') {
							onPressEdit();
						} else if (selectedItem == '삭제') {
							onPressDelete();
						}
						Modal.close();
					},
					() => Modal.close(),
					false,
					'',
				);
			} else if (!isMyFeed) {
				//내 피드가 아닐 경우의 미트볼 클릭 출력 아이템
				getFollows(
					{userobject_id: userGlobalObject.userInfo._id},
					result => {
						// console.log('result / getFollows ', result.msg);
						let follow_id_list = [];
						result.msg.map((v, i) => {
							follow_id_list.push(v.follower_id._id);
						});
						// let isFollowers = follow_id_list.includes(props.data.feed_avatar_id ? props.data.feed_avatar_id._id : props.data.feed_writer_id._id); //해당 피드 게시글 작성자가 내 팔로워 목록에 있는지 여부
						let isFollowers = follow_id_list.includes(feed_writer._id); //해당 피드 게시글 작성자가 내 팔로워 목록에 있는지 여부
						//현재 팔로우 상태 중인 유저의 피드글의 미트볼 헤더 클릭
						if (isFollowers) {
							//내가 팔로우하고 있는 유저의 피드게시글
							Modal.popSelectBoxModal(
								!isFavorite ? FEED_MEATBALL_MENU_FOLLOWING : FEED_MEATBALL_MENU_FOLLOWING_UNFAVORITE,
								selectedItem => {
									Modal.close();
									if (selectedItem == '신고') {
										onPressReport(context);
									} else if (selectedItem == '공유하기') {
										onPressShare();
									} else if (selectedItem == '팔로우 취소') {
										onPressCancelFollow();
									} else if (selectedItem == '쪽지 보내기') {
										onPressSendMsg(context._id);
									} else if (selectedItem == '즐겨찾기') {
										onFavorite(true);
									} else if (selectedItem == '즐겨찾기 취소') {
										onFavorite(false);
									}
								},
								() => Modal.close(),
								false,
								'',
							);
						} else {
							//현재 팔로우 상태 중이지 않은 유저의 피드글의 미트볼 헤더 클릭
							Modal.popSelectBoxModal(
								!isFavorite ? FEED_MEATBALL_MENU_UNFOLLOWING : FEED_MEATBALL_MENU_UNFOLLOWING_UNFAVORITE,
								selectedItem => {
									// alert(selectedItem);
									if (selectedItem == '신고') {
										onPressReport(context);
									} else if (selectedItem == '팔로우') {
										onPressFollow();
									} else if (selectedItem == '공유하기') {
										onPressShare();
									} else if (selectedItem == '팔로우 취소') {
										onPressCancelFollow();
									} else if (selectedItem == '쪽지 보내기') {
										onPressSendMsg(context._id);
									} else if (selectedItem == '즐겨찾기') {
										onFavorite(true);
									} else if (selectedItem == '즐겨찾기 취소') {
										onFavorite(false);
									}
									Modal.close();
								},
								() => Modal.close(),
								false,
								'',
							);
						}
					},
					err => {
						console.log('err', err);
					},
				);
			}
		} else {
			//긴급 피드(실종 제보)
			if (isMyFeed) {
				// 긴급피드 올린 작성자일 경우
				Modal.popSelectBoxModal(
					['수정', '삭제'],
					selectedItem => {
						console.log(selectedItem);
						if (selectedItem == '상태변경') {
							// onPressReport();
						} else if (selectedItem == '공유하기') {
							onPressShare();
						} else if (selectedItem == '수정') {
							onPressEdit();
							navigation.navigate('FeedEdit', props.data);
						} else if (selectedItem == '삭제') {
							onPressDelete();
						}
						Modal.close();
					},
					() => Modal.close(),
					false,
					'',
				);
			} else if (!isMyFeed) {
				// 긴급피드 올린 작성자가 아닐 경우
				Modal.popSelectBoxModal(
					// FEED_MEATBALL_MENU,
					!isFavorite ? FEED_MEATBALL_MENU_UNFOLLOWING : FEED_MEATBALL_MENU_UNFOLLOWING_UNFAVORITE,
					selectedItem => {
						if (selectedItem == '신고') {
							onPressReport(context);
						} else if (selectedItem == '팔로우') {
							onPressFollow();
						} else if (selectedItem == '공유하기') {
							onPressShare();
						} else if (selectedItem == '팔로우 취소') {
							onPressCancelFollow();
						} else if (selectedItem == '쪽지 보내기') {
							onPressSendMsg(context._id);
						} else if (selectedItem == '즐겨찾기') {
							onFavorite(true);
						} else if (selectedItem == '즐겨찾기 취소') {
							onFavorite(false);
						}
						Modal.close();
						Modal.close();
					},
					() => Modal.close(),
					false,
					'',
				);
			}
		}
	};

	const onClickMeatball = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			getFavoriteFeedListByUserId(
				{
					userobject_id: userGlobalObject.userInfo._id,
				},
				r => {
					let context = {
						favorite_feeds: r.msg,
						_id: feed_writer_id,
					};
					meatballActions(context);
				},
				err => {
					console.log('getFavoriteFeedListByUserId / FeedContent', err);
				},
			);
		}
	};

	const isMissingReportRoute = route.name == 'MissingAnimalDetail' || route.name == 'ReportDetail';
	const isCommentList = route.name == 'FeedCommentList';
	const isMissingReportType = feed_content == 'missing' || feed_content == 'report';

	const [isShowBtn, setIsShowBtn] = React.useState(true);
	const [numLine, setNumLine] = React.useState(isMissingReportRoute ? 0 : 2);

	const showMore = () => {
		setNumLine(0);
		setShow(true);
	};

	const onPressFavoriteWriter = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			props.onPressFavorite(bool);
		}
	};

	const layoutStyle = () => {
		if (isMissingReportRoute || show) {
			return {};
		} else if (isCommentList) {
			return {};
		} else if (route.name == 'AlarmCommentList') {
			return {};
		} else {
			let lines = getLinesOfString(feed_content, Platform.OS == 'android' ? 48 : 50);
			return {
				height: 120 * DP + (lines > 3 ? 3 : lines) * 54 * DP,
			};
		}
	};

	return (
		<View style={[layoutStyle()]} removeClippedSubviews onLayout={props.onLayout}>
			<View style={[organism_style.feedContent]}>
				{/* line 1 */}
				<View style={[organism_style.userLocationLabel_view_feedContent]} onLayout={onLayoutLabel}>
					{/* UserLocationLabel */}
					<View style={[organism_style.userLocationLabel_feedContent]}>
						<UserLocationTimeLabel
							// data={props.data.feed_writer_id}
							// data={feed_avatar_id || feed_writer_id || undefined}
							// data={feed_avatar_id || props.data.feed_writer_id || undefined}
							data={send}
							onLabelClick={userobject => navigation.push('UserProfile', {userobject: userobject})}
							location={feed_location}
							time={feed_date}
							isLarge
						/>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							{!isMissingReportRoute ? (
								<View style={{flexDirection: 'row', alignItems: 'center'}}>
									<View style={[feedContent_style.status /*{width:130*DP,height:38*DP}*/]}>
										{feed_is_protect_diary && (
											<View
												style={{
													width: 130 * DP,
													height: 38 * DP,
													justifyContent: 'center',
													alignSelf: 'flex-end',
													alignItems: 'center',
													borderColor: MAINCOLOR,
													borderRadius: 10 * DP,
													borderWidth: 2 * DP,
													marginRight: 10 * DP,
												}}>
												<Text style={[txt.roboto24, txt.maincolor]}>임보일기</Text>
											</View>
										)}
									</View>

									{/* 연결되는 기능 개발 후 추후 연결 */}
									<View style={[organism_style.meatball, feedContent_style.meatball]}>
										<Meatball50_GRAY20_Horizontal onPress={onClickMeatball} />
									</View>
								</View>
							) : //실종 및 제보게시글의 유저 라벨 우측에 출력되는 즐겨찾기아이콘, 내 게시글일 경우 미출력
							props.data.feed_writer_id._id == userGlobalObject.userInfo._id ? (
								<></>
							) : (
								<View style={[organism_style.button_view_feedContent]}>
									{/* <View style={[organism_style.favoriteTag_view_feedContent, {}]}>
										<View style={[organism_style.favoriteTag_feedContent]}>
											{props.data.feed_writer_id.is_favorite ? (
												<FavoriteTag48_Filled onPress={() => onPressFavoriteWriter(false)} />
											) : (
												<FavoriteTag48_Border onPress={() => onPressFavoriteWriter(true)} />
											)}
										</View>
										<View style={[organism_style.like_count_feedContent, feedContent_style.like_count]}>
											<Text style={[txt.roboto24, {color: GRAY10}]}>{count_to_K(props.data.feed_writer_id.user_favorite_count)}</Text>
										</View>
									</View> */}
									{/* <Meatball50_GRAY20_Horizontal onPress={onClickMeatball} /> */}

									{/* <View style={[organism_style.share48_view_feedContent]}>
										<View style={[organism_style.share48_feedContent]}>
											<Share48_Filled />
										</View>
										<View style={[organism_style.share_feedContent, feedContent_style.share]}>
											<Text style={[txt.noto24, {color: GRAY10}]}>{SHARE}</Text>
										</View>
									</View> */}
								</View>
							)}
						</View>
					</View>

					{/* type값이 status일 경우 status 버튼이 나오고 그렇지 않으면 다른 버튼 표기 */}
				</View>
				{/* line 1-1 (실종/제보관련 내용) */}
				{!route.name.includes('MainHomeFeedList') &&
					!route.name.includes('UserTagFeedList') &&
					!route.name.includes('UserFeedList') &&
					!route.name.includes('FavoriteFeedList') &&
					!route.name.includes('HashFeedList') &&
					!route.name.includes('TagMeFeedList') &&
					(feed_type == 'report' || feed_type == 'missing') && (
						<View style={[organism_style.tipOff_feedContent, feedContent_style.tipOff]} onLayout={onLayoutReport}>
							<MissingReportInfo data={props.data} />
						</View>
					)}
				{(route.name.includes('FeedList') || feed_type == 'report' || feed_type == 'missing' || route.name.includes('FeedCommentList') || show) && (
					<View style={[organism_style.content_feedContent, feedContent_style.content_Top10]}>
						<HashText style={[txt.noto28]} numberOfLines={numLine} ellipsizeMode={'tail'}>
							{feed_content}
						</HashText>
					</View>
				)}
			</View>
			{!isMissingReportRoute && isShowBtn && !show && (
				<View style={[organism_style.time_view_feedContent]}>
					<TouchableWithoutFeedback onPress={showMore}>
						<View style={[organism_style.addMore_view_feedContent]}>
							<View style={[organism_style.addMore_feedContent]}>
								<Text style={[txt.noto22, {color: GRAY10}]}>더보기</Text>
							</View>
							<View style={[organism_style.braket]}>
								<Arrow_Down_GRAY20 />
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			)}
		</View>
	);
};

FeedContent.defaultProps = {
	data: {
		type: 'button',
		addMore: true,
		tipOff: true,
		content: 'comment 내용을 넣어야 합니다.',
	},
	deleteFeed: () => {},
};
