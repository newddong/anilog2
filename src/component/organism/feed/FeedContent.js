import React from 'react';
import {Text, View, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {organism_style, feedContent_style} from 'Organism/style_organism';
import UserLocationTimeLabel from 'Molecules/label/UserLocationTimeLabel';
import {useNavigation, useRoute} from '@react-navigation/core';
import {
	FavoriteTag48_Border,
	FavoriteTag48_Filled,
	Meatball50_GRAY20_Horizontal,
	Share48_Filled,
	Comment48_Border,
	Like48_Border,
	Like48_Filled,
	Blur694,
} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {Arrow_Down_GRAY20} from 'Atom/icon';
import DP from 'Root/config/dp';
import {GRAY10, WHITE} from 'Root/config/color';
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
import {
	getStringLength,
	getLinesOfString,
	count_to_K,
	getByteSubtring,
	getByteCharAt,
	findByteIndex,
	findByteLastIndex,
	findNearSpace,
	splitStr,
	extractTags,
} from 'Root/util/stringutil';
import FeedMedia from 'Molecules/media/FeedMedia';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {object} from 'prop-types';

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
	const [show, setShow] = React.useState(false);
	const [send, setSend] = React.useState();
	const feed_writer = props.data.feed_avatar_id ? props.data.feed_avatar_id : props.data.feed_writer_id;
	React.useEffect(() => {
		//피드 아바타(반려동물)가 비어있을 경우 feed_writer_id로 send 대체
		if (typeof feed_avatar_id === object) {
			setSend(feed_avatar_id);
		} else {
			setSend(feed_writer_id);
		}
	}, [props.data]);

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
						console.log('err / getFollows : FeedContent /', err);
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
		// console.log('props.data ', props.data);
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
			favoriteFeed(
				{
					feedobject_id: props.data._id,
					userobject_id: userGlobalObject.userInfo._id,
					is_favorite: bool,
				},
				result => {
					console.log('result / FavoriteFeed / FeedContent : ', result.msg.targetFeed);
				},
				err => {
					console.log('err / FavoriteFeed / FeedContent : ', err);
				},
			);
		}
	};
	const lines = getLinesOfString(feed_content, 55);

	const layoutStyle = () => {
		if (isMissingReportRoute || show) {
			return {};
		} else if (isCommentList) {
			return {};
		} else if (route.name == 'AlarmCommentList') {
			return {};
		} else {
			return {
				height: 914 * DP + (lines > 2 ? 2 : lines) * 44 * DP,
			};
		}
	};

	const moveToCommentList = async () => {
		console.log('move to comment');
		if (userGlobalObject.userInfo.isPreviewMode && feed_comment_count == 0) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			AsyncStorage.getItem('sid', (err, res) => {
				console.log('res', res);
				if (res == null && feed_comment_count == 0) {
					Modal.popNoBtn('로그인이 필요합니다.');
					setTimeout(() => {
						Modal.close();
					}, 1500);
				} else {
					navigation.push('FeedCommentList', {feedobject: props.data});
					// console.log('move to FeedCommnetList', props.data);
				}
			});
		}
	};

	return (
		<View style={[layoutStyle()]}>
			<View style={[style.feedContent]}>
				<View style={[style.userLocationLabel_view_feedContent]}>
					<View style={[style.userLocationLabel_feedContent]}>
						{send ? (
							<UserLocationTimeLabel
								data={send}
								onLabelClick={userobject => navigation.push('UserProfile', {userobject: userobject})}
								location={feed_location}
								time={feed_date}
								isLarge
							/>
						) : (
							<UserLocationTimeLabel empty={true} time={feed_date} isLarge location={feed_location} />
						)}
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

									{props.data.feed_writer_id ? (
										<View style={[organism_style.meatball]}>
											<Meatball50_GRAY20_Horizontal onPress={onClickMeatball} />
										</View>
									) : (
										<></>
									)}
								</View>
							) : (
								false
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
						<View style={[style.missingReportInfo]}>
							<MissingReportInfo data={props.data} />
						</View>
					)}
				<View style={[style.feedMedia_feed]}>
					<FeedMedia data={props.data} />
				</View>

				<View style={[feed_templete_style.likeCommentButtons_view]}>
					<View style={[feed_templete_style.likeCommentInfo_view_feed]}>
						<TouchableWithoutFeedback onPress={props.toggleFeedLike}>
							<View style={feed_templete_style.likeButtonWrapper}>
								<View style={[feed_templete_style.like48]}>{props.isLike ? <Like48_Filled /> : <Like48_Border />}</View>
								<View style={[feed_templete_style.like_count_feed]}>
									<Text style={[txt.roboto24, {color: GRAY10}]}>{props.likeCount}</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={moveToCommentList}>
							<View style={feed_templete_style.commentButtonWrapper}>
								<View style={organism_style.like48}>
									<Comment48_Border />
								</View>
								<View style={[organism_style.comment_count_feed]}>
									<Text style={[txt.roboto24, {color: GRAY10, marginLeft: -15 * DP}]}>{feed_comment_count}</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
					{props.data.feed_writer_id ? (
						<View style={[organism_style.favoriteTag_view_feedContent, {}]}>
							<View style={[organism_style.favoriteTag_feedContent]}>
								{props.data.feed_writer_id.is_favorite ? (
									<FavoriteTag48_Filled onPress={() => onPressFavoriteWriter(false)} />
								) : (
									<FavoriteTag48_Border onPress={() => onPressFavoriteWriter(true)} />
								)}
							</View>
							{false && (
								<View style={[organism_style.like_count_feedContent, feedContent_style.like_count]}>
									<Text style={[txt.roboto24, {color: GRAY10}]}>{count_to_K(props.data.feed_writer_id.user_favorite_count)}</Text>
								</View>
							)}
						</View>
					) : (
						<></>
					)}
				</View>

				{(route.name.includes('FeedList') || feed_type == 'missing' || route.name.includes('FeedCommentList')) && (
					<View style={[organism_style.content_feedContent, /*feedContent_style.content_Top10,*/ {width: 750 * DP, paddingHorizontal: 28 * DP}]}>
						<HashText
							style={[txt.noto28]}
							byteOfLine={55}
							onMoreView={() => {
								setShow(true);
							}}>
							{feed_content}
						</HashText>
					</View>
				)}
			</View>
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
	onPressFavorite: () => {},
};

const style = StyleSheet.create({
	feedContent: {
		flexDirection: 'column',
		width: 750 * DP,
		// height:1200*DP,
		alignItems: 'center',
		paddingTop: 40 * DP,
		// backgroundColor: WHITE,
		paddingBottom: 15 * DP,
		paddingHorizontal: 28 * DP,
		overflow: 'hidden',
	},
	userLocationLabel_view_feedContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	userLocationLabel_feedContent: {
		flexDirection: 'row',
		width: 694 * DP, //유저아이디 최우측 미트볼 아이콘 추가를 위한 수정
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	missingReportInfo: {
		marginTop: 20 * DP,
	},
	time_view_feedContent: {
		flexDirection: 'row',
		width: '100%',
		height: 48 * DP,
		marginTop: -48 * DP,
		paddingHorizontal: 28 * DP,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: '#fff1',
		// backgroundColor:'red',
		bottom: 0,
		// position:'absolute'
	},
	addMore_view_feedContent: {
		flexDirection: 'row',
		width: 108 * DP,
		height: 48 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addMore_feedContent: {
		width: 70 * DP,
		height: 36 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	feedMedia_feed: {
		width: 750 * DP,
		// height: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const feed_templete_style = StyleSheet.create({
	feed: {
		alignItems: 'center',
		width: 750 * DP,
	},
	feedMedia_feed: {
		width: 750 * DP,
		height: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	comment_feed_view: {
		width: 750 * DP,
		// height: 200 * DP,
		alignItems: 'center',
	},
	likeButtonWrapper: {
		flexDirection: 'row',
		height: 120 * DP,
		width: 104 * DP,
		//터치 영역 확보
		alignItems: 'center',
	},
	likeCommentButtons_view: {
		flexDirection: 'row',
		width: 750 * DP,
		paddingHorizontal: 28 * DP,
		height: 52 * DP,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	likeCommentInfo_view_feed: {
		flexDirection: 'row',
		// width: 256 * DP,
		height: 72 * DP,
		alignItems: 'center',
		// justifyContent: 'center',
	},
	recentComment_view: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 128 * DP,
		justifyContent: 'space-between',
		paddingVertical: 24 * DP,
	},
	like48: {
		width: 48 * DP,
		height: 48 * DP,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	like_count_view_feed: {
		width: 56 * DP,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	like_count_feed: {
		width: 56 * DP,
		height: 30 * DP,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	comment_count_view_feed: {
		width: 56 * DP,
		height: 30 * DP,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	commentButtonWrapper: {
		flexDirection: 'row',
		width: 104 * DP,
		height: 120 * DP,
		alignItems: 'center',
	},
	comment_count_feed: {
		width: 56 * DP,
		height: 30 * DP,
		// backgroundColor: '#F8DDDD',
	},
	writerID_feed_view: {
		// width: 116 * DP,
		// height: 76 * DP,
		height: 114 * DP,
		// backgroundColor: '#FF00FF',
	},
	writerID_feed: {
		// width: 96 * DP,
		height: 36 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#AAE8B6',
	},
	commentText_view: {
		width: 538 * DP,
		height: 76 * DP,
		marginLeft: 20 * DP,
		// backgroundColor: '#AAE8B6',
	},
	allCommentCount: {
		width: 360 * DP,
		height: 44 * DP,
		alignItems: 'flex-end',
		// backgroundColor: '#F8DDDD',
		// backgroundColor:'purple'
	},
});

const feed_style = StyleSheet.create({
	like_count: {
		marginLeft: 12 * DP,
		marginTop: 9 * DP,
	},
	recentComment_view: {
		marginVertical: 24 * DP,
	},
	likeCommentButtons_view: {
		marginTop: 24 * DP,
	},
	comment_count: {
		marginLeft: 12 * DP,
	},
	recent_comment_user: {
		height: 38 * DP, //특정 디바이스에서 Feed Recent Comment User Nickname 텍스트가 잘리던 현상 수정
		// backgroundColor: 'red',
	},
});
