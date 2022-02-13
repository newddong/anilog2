import React from 'react';
import {Dimensions, Text, View, Platform} from 'react-native';
import {organism_style, feedContent_style} from 'Organism/style_organism';
import UserLocationLabel from 'Molecules/label/UserLocationLabel';
import AniButton from 'Molecules/button/AniButton';
import {btn_w130} from 'Root/component/atom/btn/btn_style';
import {useNavigation, useRoute} from '@react-navigation/core';
import {FavoriteTag48_Filled, Meatball50_APRI10_Horizontal, Meatball50_GRAY20_Horizontal, Share48_Filled} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {Arrow_Down_GRAY20, Arrow_Up_GRAY20} from 'Atom/icon';
import DP from 'Root/config/dp';
import {GRAY10} from 'Root/config/color';
import {
	FEED_MEATBALL_MENU_FOLLOWING,
	FEED_MEATBALL_MENU_MY_FEED_WITH_STATUS,
	FEED_MEATBALL_MENU_UNFOLLOWING,
	REPORT_MENU,
	SHARE,
} from 'Root/i18n/msg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {MAINCOLOR} from 'Root/config/color';
import {getTimeLapsed, parsingDate} from 'Root/util/dateutil';
import HashText from 'Molecules/info/HashText';
import Modal from 'Root/component/modal/Modal';
import {getFollows} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import MissingReportInfo from 'Organism/info/MissingReportInfo';

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
	const [layout, setLayout] = React.useState({height: 0 * DP, width: 0}); // 초기의 Layout
	const [reportLayout, setReportLayout] = React.useState({height: 0, width: 0});
	const [labelLayout, setlabelLayout] = React.useState({height: 0, width: 0});
	const [show, setShow] = React.useState(false);
	const [isMeatballClicked, setIsMeatballClicked] = React.useState(false);
	//FeedText가 담긴 View 의 onLayout
	const onLayoutContent = event => {
		const {width, height} = event.nativeEvent.layout;
		setLayout({width, height});
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
		if (layout.height + reportLayout.height + labelLayout.height + 116 * DP > 265 * DP) {
			setBtnStatus(true);
		} else {
			setBtnStatus(false);
		}
	}, [layout]);

	//피드 미트볼 메뉴 - 신고 클릭
	const onPressReport = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popOneBtnSelectModal(
				REPORT_MENU,
				'이 게시물을 신고 하시겠습니까?',
				selectedItem => {
					alert(selectedItem);
				},
				'신고',
			);
		}, 500);
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
		}, 500);
	};

	//피드 미트볼 메뉴 - 팔로우 취소
	const onPressCancelFollow = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popOneBtn('이 계정을 팔로우 취소하시겠습니까?', '팔로우 취소', () => {
				alert('팔로우 취소');
				Modal.close();
			});
		}, 100);
	};

	//피드 미트볼 메뉴 - 쪽지 보내기
	const onPressSendMsg = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popMessageModal(
				'주둥이',
				msg => {
					console.log('msg', msg);
					Modal.close();
				},
				() => alert('나가기'),
			);
		}, 100);
	};

	const onClickMeatball = () => {
		//피드 미트볼 메뉴 팝업 분기에 대한 기획의도가 불분명한 상태이므로
		//출력되는 메뉴에 대한 분기처리는 차후 처리 (현재는 더미로 적용)
		// console.log(props.data);
		let isMyFeed = userGlobalObject.userInfo._id == props.data.feed_writer_id._id;
		if (isMyFeed) {
			//나의 피드 게시글의 미트볼 헤더 클릭
			Modal.popSelectBoxModal(
				FEED_MEATBALL_MENU_MY_FEED_WITH_STATUS,
				selectedItem => {
					alert(selectedItem);
					Modal.close();
					setIsMeatballClicked(false);
				},
				() => Modal.close(),
				false,
				'',
			);
		} else if (!isMyFeed) {
			getFollows(
				{userobject_id: userGlobalObject.userInfo._id},
				result => {
					// console.log('result / getFollows ', result.msg);
					let follow_id_list = [];
					result.msg.map((v, i) => {
						follow_id_list.push(v.follow_id._id);
					});
					// console.log('follow', follow_id_list);
					let isFollowers = follow_id_list.includes(props.data.feed_writer_id._id);
					// console.log('isFollowers?', follow_id_list.includes(props.data.feed_writer_id._id));
					//현재 팔로우 상태 중인 유저의 피드글의 미트볼 헤더 클릭
					if (isFollowers) {
						Modal.popSelectBoxModal(
							FEED_MEATBALL_MENU_FOLLOWING,
							selectedItem => {
								// alert(selectedItem);
								Modal.close();
								if (selectedItem == '신고') {
									onPressReport();
								} else if (selectedItem == '공유하기') {
									onPressShare();
								} else if (selectedItem == '팔로우 취소') {
									onPressCancelFollow();
								} else if (selectedItem == '쪽지 보내기') {
									onPressSendMsg();
								}
								setIsMeatballClicked(false);
							},
							() => Modal.close(),
							false,
							'',
						);
						//현재 팔로우 상태 중이지 않은 유저의 피드글의 미트볼 헤더 클릭
					} else {
						Modal.popSelectBoxModal(
							FEED_MEATBALL_MENU_UNFOLLOWING,
							selectedItem => {
								alert(selectedItem);
								if (selectedItem == '신고') {
									onPressReport();
								} else if (selectedItem == '공유하기') {
									onPressShare();
								} else if (selectedItem == '팔로우 취소') {
									onPressCancelFollow();
								} else if (selectedItem == '쪽지 보내기') {
									onPressSendMsg();
								}
								Modal.close();
								setIsMeatballClicked(false);
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
		// if()
	};

	const showMore = () => {
		setShow(true);
	};

	const shouldBeDetail = show || route.name == 'MissingAnimalDetail' || route.name == 'ReportDetail';
	// console.log('경로', route.name, route.name.includes('FeedCommentList'));

	return (
		<View style={[organism_style.feedContent, shouldBeDetail ? {height: 270 * DP + reportLayout.height + labelLayout.height + layout.height} : {}]}>
			{/* // <View style={[organism_style.feedContent,{height:800*DP}]}> */}
			{/* line 1 */}
			<View style={[organism_style.userLocationLabel_view_feedContent]} onLayout={onLayoutLabel}>
				{/* UserLocationLabel */}
				<View style={[organism_style.userLocationLabel_feedContent]}>
					<UserLocationLabel
						data={feed_avatar_id || feed_writer_id || undefined}
						onLabelClick={userobject => navigation.push('UserProfile', {userobject: userobject})}
						location={feed_location}
					/>

					<Meatball50_GRAY20_Horizontal onPress={onClickMeatball} />
				</View>

				{/* type값이 status일 경우 status 버튼이 나오고 그렇지 않으면 다른 버튼 표기 */}
				{feed_type == 'feed' ? (
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
									}}>
									<Text style={[txt.roboto24, txt.maincolor]}>임보일기</Text>
								</View>
							)}
						</View>

						{/* 연결되는 기능 개발 후 추후 연결 */}
						{/* <View style={[organism_style.meatball, feedContent_style.meatball]}>
							<Meatball50_GRAY20_Horizontal onPress={onClickMeatball} />
						</View> */}
					</View>
				) : (
					<View style={[organism_style.button_view_feedContent]}>
						<View style={[organism_style.favoriteTag_view_feedContent]}>
							<View style={[organism_style.favoriteTag_feedContent]}>
								<FavoriteTag48_Filled />
							</View>
							<View style={[organism_style.like_count_feedContent, feedContent_style.like_count]}>
								<Text>{feed_favorite_count}</Text>
							</View>
						</View>
						<View style={[organism_style.share48_view_feedContent]}>
							<View style={[organism_style.share48_feedContent]}>
								<Share48_Filled />
							</View>
							<View style={[organism_style.share_feedContent, feedContent_style.share]}>
								<Text style={[txt.noto24, {color: GRAY10}]}>{SHARE}</Text>
							</View>
						</View>
					</View>
				)}
			</View>

			{/* line 1-1 (제보관련 내용) */}
			{feed_type == 'report' && (
				<View style={[organism_style.tipOff_feedContent, feedContent_style.tipOff]} onLayout={onLayoutReport}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Text style={[txt.noto28]}>제보 날짜: </Text>
						<Text style={[txt.noto30b]}>{parsingDate(report_witness_date)}</Text>
						{/* <MissingReportInfo data={props.data} /> */}
					</View>
					<View style={{flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 * DP}}>
						<Text style={[txt.noto28]}>제보 장소: </Text>
						<Text style={[txt.noto28b, {width: 500 * DP}]}>{report_witness_location}</Text>
					</View>
				</View>
			)}

			{(route.name.includes('FeedList') || feed_type == 'report' || feed_type == 'missing' || route.name.includes('FeedCommentList') || show) && (
				<View style={[organism_style.content_feedContent, feedContent_style.content_Top10]}>
					<HashText style={[txt.noto28]} numberOfLines={shouldBeDetail ? 0 : 2} onLayout={onLayoutContent}>
						{feed_content}
					</HashText>
				</View>
			)}

			<View style={[organism_style.time_view_feedContent]}>
				<View style={[organism_style.time_feedContent]}>
					<Text style={[txt.noto22, {color: GRAY10}]}>{getTimeLapsed(feed_date)}</Text>
				</View>

				{(!show && route.name.includes('FeedList')) ||
					(route.name.includes('FeedCommentList') && (
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
					))}
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
};
