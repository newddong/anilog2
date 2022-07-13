import React from 'react';
import {Text, View, Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';
import {organism_style, feedContent_style} from 'Organism/style_organism';
import UserLocationTimeLabel from 'Molecules/label/UserLocationTimeLabel';
import {useNavigation, useRoute} from '@react-navigation/core';
import {FavoriteTag48_Border, FavoriteTag48_Filled, Meatball50_GRAY20_Horizontal, Comment48_Border, Like48_Border, Like48_Filled} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {GRAY10, WHITE} from 'Root/config/color';
import {FEED_MEATBALL_MENU_MY_FEED, REPORT_MENU} from 'Root/i18n/msg';
import {MAINCOLOR} from 'Root/config/color';
import HashText from 'Molecules/info/HashText';
import Modal from 'Root/component/modal/Modal';
import {createMemoBox, followUser, getFollows, unFollowUser} from 'Root/api/userapi';
import {deleteFeed, favoriteFeed, getFavoriteFeedListByUserId} from 'Root/api/feedapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import MissingReportInfo from 'Organism/info/MissingReportInfo';
import {createReport} from 'Root/api/report';
import {getLinesOfString, count_to_K} from 'Root/util/stringutil';
import FeedMedia from 'Molecules/media/FeedMedia';
import feed_obj from 'Root/config/feed_obj';

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
		is_favorite,
	} = props.data;
	const [data, setData] = React.useState(props.data);
	const navigation = useNavigation();
	const route = useRoute();
	const [pressed, setPressed] = React.useState(false); //더보기 Arrow방향 false면 아래
	const [show, setShow] = React.useState(false);
	const [send, setSend] = React.useState('false');
	const [isFavorite, setIsFavorite] = React.useState(is_favorite);
	const [commentCount, setCommentCount] = React.useState(0);
	const feed_writer = props.data.feed_avatar_id ? props.data.feed_avatar_id : props.data.feed_writer_id;

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setPressed(false);
			const findIndex = feed_obj.list.findIndex(e => e._id == _id);
			if (findIndex != -1) {
				setCommentCount(feed_obj.list[findIndex].feed_comment_count);
				setIsFavorite(feed_obj.list[findIndex].is_favorite);
				if (feed_obj.shouldUpdateByEdit && feed_obj.edit_obj && feed_obj.edit_obj._id == _id) {
					// console.log('feed Contentetn : ', feed_content);
					// console.log('feed_obj.edit_obj', feed_obj.edit_obj?.missing_animal_lost_location);
					setData(feed_obj.edit_obj);
					feed_obj.shouldUpdateByEdit = false;
					feed_obj.edit_obj = {};
				}
			} else {
				// console.log('FeedContent 전역찾기', feed_content, is_favorite);
			}
		});
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		if (feed_avatar_id && feed_avatar_id.user_type === 'pet') {
			setSend(feed_avatar_id);
		} else {
			setSend(feed_writer_id);
		}
		setCommentCount(feed_comment_count);
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
				'신고하기',
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
			Modal.popOneBtn('이 계정을 팔로우 취소하시겠습니까?', '팔로우 취소', () => {
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
			});
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
			if (userGlobalObject.userInfo.isPreviewMode) {
				Modal.popLoginRequestModal(() => {
					navigation.navigate('LoginRequired');
				});
			} else {
				Modal.popMessageModal(
					_id.user_nickname,
					msg => {
						// if (msg.trim() == '') {
						// return Modal.popOneBtn('채팅을 입력하세요.', '확인', () => Modal.close());

						if (msg.length == 0) {
							console.log('메세지 입력없음');
							Alert.alert('내용을 입력해주세요');
						} else {
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
						}
					},
					() => alert('나가기'),
				);
			}
		}, 100);
	};

	//피드 미트볼 메뉴 - 수정 클릭
	const onPressEdit = () => {
		Modal.close();
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
			// Modal.popTwoBtn(
			// 	'정말로 이 게시글을 \n 삭제하시겠습니까?',
			// 	'아니오',
			// 	'예',
			// 	() => Modal.close(),
			// 	() => {
			// 		props.deleteFeed(props.data._id);
			// 	},
			// );
			Modal.popOneBtn('이 게시글을 삭제하시겠습니까?', '삭제', () => {
				props.deleteFeed(props.data._id);
			});
		}, 200);
	};

	//피드 미트볼 - 즐겨찾기 설정
	const onFavorite = isFavorite => {
		// console.log(props.data, '22');
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
							let temp = [...feed_obj.list];
							const findIndex = temp.findIndex(e => e._id == _id); //현재 보고 있는 피드게시글이 저장된 리스트에서 몇 번째인지
							console.log('index of Favorite', findIndex);
							temp[findIndex].is_favorite = isFavorite;
							feed_obj.list = temp;
							Modal.close();
							Modal.popNoBtn('즐겨찾기 ' + (isFavorite ? '추가' : '삭제') + '가 완료되었습니다.');
							setIsFavorite(isFavorite);
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

	const meatBallSelectAction = (selected, context) => {
		switch (selected) {
			case '수정':
				onPressEdit();
				break;
			case '삭제':
				onPressDelete();
				break;
			case '팔로우 취소':
				onPressCancelFollow();
				break;
			case '팔로우':
				onPressFollow();
				break;
			case '신고':
				onPressReport(context);
				break;
			case '쪽지 보내기':
				onPressSendMsg(context._id);
				break;
			case '즐겨찾기':
				onFavorite(true);
				break;
			case '즐겨찾기 취소':
				onFavorite(false);
				break;
			case '공유하기':
				onPressShare();
				break;

			default:
				break;
		}
		Modal.close();
	};

	const meatballActions = context => {
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
						meatBallSelectAction(selectedItem, context);
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
						console.log('follow_id_list', follow_id_list);
						let isFollowers = follow_id_list.includes(feed_writer._id); //해당 피드 게시글 작성자가 내 팔로워 목록에 있는지 여부
						//현재 팔로우 상태 중인 유저의 피드글의 미트볼 헤더 클릭
						Modal.popSelectBoxModal(
							['쪽지 보내기', isFollowers ? '팔로우 취소' : '팔로우', '신고'],
							selectedItem => {
								meatBallSelectAction(selectedItem, context);
							},
							() => Modal.close(),
							false,
							'',
						);
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
						meatBallSelectAction(selectedItem, context);
					},
					() => Modal.close(),
					false,
					'',
				);
			} else if (!isMyFeed) {
				// 긴급피드 올린 작성자가 아닐 경우
				getFollows(
					{userobject_id: userGlobalObject.userInfo._id},
					result => {
						console.log('getFollows / FeedContent : ', result.msg);
						let follow_id_list = [];
						result.msg.map((v, i) => {
							follow_id_list.push(v.follower_id._id);
						});
						console.log('follow_id_list', follow_id_list);
						// let isFollowers = follow_id_list.includes(props.data.feed_avatar_id ? props.data.feed_avatar_id._id : props.data.feed_writer_id._id); //해당 피드 게시글 작성자가 내 팔로워 목록에 있는지 여부
						let isFollowers = follow_id_list.includes(feed_writer._id); //해당 피드 게시글 작성자가 내 팔로워 목록에 있는지 여부
						Modal.popSelectBoxModal(
							// FEED_MEATBALL_MENU,
							['쪽지 보내기', isFollowers ? '팔로우 취소' : '팔로우', '신고'],
							selectedItem => {
								meatBallSelectAction(selectedItem, context);
							},
							() => Modal.close(),
							false,
							'',
						);
					},
					err => {
						console.log('Error / getFollows / FeedContent : ', err);
					},
				);
			}
		}
	};

	const onClickMeatball = () => {
		// console.log('props.data ', props.data);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
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
				navigation.navigate('LoginRequired');
			});
		} else {
			props.onPressFavorite && props.onPressFavorite(bool);
		}
	};
	const lines = getLinesOfString(feed_content, 52);

	const layoutStyle = () => {
		if (isMissingReportRoute || show) {
			return {};
		} else if (isCommentList) {
			return {};
		} else if (route.name == 'AlarmCommentList') {
			return {};
		} else {
			return {
				height: 914 * DP + (lines > 2 ? 2 : lines) * 48 * DP,
			};
		}
	};

	const moveToCommentList = async () => {
		if (route.name != 'FeedCommentList') {
			if (userGlobalObject.userInfo.isPreviewMode && feed_comment_count == 0) {
				Modal.popLoginRequestModal(() => {
					navigation.navigate('LoginRequired');
				});
			} else {
				navigation.navigate('FeedCommentList', {feedobject: props.data});
				// console.log('move to FeedCommnetList', props.data);
			}
		}
	};

	const onPressPhoto = () => {
		props.onPressPhoto(props.data);
		// console.log('props', route.name);
		// if (feed_type == 'report' || feed_type == 'missing') {
		// 	if (feed_type == 'report') {
		// 		navigation.navigate('ReportDetail', {_id: _id});
		// 	} else {
		// 		let sexValue = '';
		// 		switch (missing_animal_sex) {
		// 			case 'male':
		// 				sexValue = '남';
		// 				break;
		// 			case 'female':
		// 				sexValue = '여';
		// 				break;
		// 			case 'unknown':
		// 				sexValue = '성별모름';
		// 				break;
		// 		}
		// 		const titleValue = missing_animal_species + '/' + missing_animal_species_detail + '/' + sexValue;
		// 		navigation.navigate('MissingAnimalDetail', {title: titleValue, _id: _id});
		// 	}
		// }
	};

	const onPressLabel = user => {
		setPressed(true);
		if (!pressed) {
			console.log('user', user);
			navigation.navigate({key: user._id, name: 'UserProfile', params: {userobject: user}});
		}
	};

	return (
		<View style={[layoutStyle()]}>
			<View style={[style.feedContent]}>
				<View style={[style.userLocationLabel_view_feedContent]}>
					<View style={[style.userLocationLabel_feedContent]}>
						{send != 'false' ? (
							send ? (
								<UserLocationTimeLabel
									data={send}
									onClickLabel={onPressLabel}
									location={feed_location}
									time={feed_date}
									isLarge
									publicType={props.data.feed_public_type}
								/>
							) : (
								<UserLocationTimeLabel empty={true} time={feed_date} isLarge location={feed_location} publicType={props.data.feed_public_type} />
							)
						) : (
							<></>
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
										<View style={[{width: 100 * DP, height: 50 * DP, alignItems: 'flex-end', justifyContent: 'center'}]}>
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
				{props.showMedia ? (
					<>
						<View style={[style.feedMedia_feed]}>
							<FeedMedia data={data} onPressPhoto={onPressPhoto} isView={props.isView} />
						</View>
						<View style={[feed_templete_style.likeCommentButtons_view]}>
							<View style={[feed_templete_style.likeCommentInfo_view_feed]}>
								<TouchableWithoutFeedback onPress={props.toggleFeedLike}>
									<View style={feed_templete_style.likeButtonWrapper}>
										<View style={[feed_templete_style.like48]}>{props.isLike ? <Like48_Filled /> : <Like48_Border />}</View>
										<View style={[feed_templete_style.like_count_feed]}>
											<Text style={[txt.roboto24, {color: GRAY10}]}>{JSON.stringify(props.likeCount)}</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
								<TouchableWithoutFeedback onPress={moveToCommentList}>
									<View style={feed_templete_style.commentButtonWrapper}>
										<View style={organism_style.like48}>
											<Comment48_Border />
										</View>
										<View style={[organism_style.comment_count_feed]}>
											<Text style={[txt.roboto24, {color: GRAY10, marginLeft: -15 * DP}]}>{commentCount}</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							</View>
							{props.data.feed_writer_id ? (
								<View style={[organism_style.favoriteTag_view_feedContent, {}]}>
									<View style={[organism_style.favoriteTag_feedContent]}>
										{/* {props.data.feed_writer_id.is_favorite ? ( */}
										{isFavorite ? (
											<TouchableOpacity onPress={() => onFavorite(false)}>
												<FavoriteTag48_Filled />
											</TouchableOpacity>
										) : (
											<TouchableOpacity onPress={() => onFavorite(true)}>
												<FavoriteTag48_Border />
											</TouchableOpacity>
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
					</>
				) : (
					<></>
				)}
				{(route.name.includes('FeedList') || feed_type == 'missing' || route.name.includes('FeedCommentList')) && (
					<View
						style={[
							organism_style.content_feedContent,
							/*feedContent_style.content_Top10,*/ {
								width: 750 * DP,
								paddingHorizontal: 28 * DP,
								marginTop: route.name.includes('FeedCommentList') ? 10 * DP : 0,
							},
						]}>
						<HashText
							style={[txt.noto28]}
							byteOfLine={52}
							onMoreView={() => {
								setShow(true);
							}}>
							{data.feed_content || ''}
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
	showMedia: true,
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
