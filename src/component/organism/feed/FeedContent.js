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
	const [btnStatus, setBtnStatus] = React.useState(false); //????????? Arrow?????? false??? ??????
	const [layout, setLayout] = React.useState({height: 0 * DP, width: 0}); // ????????? Layout
	const [reportLayout, setReportLayout] = React.useState({height: 0, width: 0});
	const [labelLayout, setlabelLayout] = React.useState({height: 0, width: 0});
	const [show, setShow] = React.useState(false);
	const [isMeatballClicked, setIsMeatballClicked] = React.useState(false);
	//FeedText??? ?????? View ??? onLayout
	const onLayoutContent = event => {
		const {width, height} = event.nativeEvent.layout;
		setLayout({width, height});
	};

	//???????????????
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

	//?????? ????????? ?????? - ?????? ??????
	const onPressReport = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popOneBtnSelectModal(
				REPORT_MENU,
				'??? ???????????? ?????? ???????????????????',
				selectedItem => {
					alert(selectedItem);
				},
				'??????',
			);
		}, 100);
	};

	//?????? ????????? ?????? - ???????????? ??????
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

	//?????? ????????? ?????? - ????????? ??????
	const onPressCancelFollow = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popOneBtn('??? ????????? ????????? ?????????????????????????', '????????? ??????', () => {
				alert('????????? ??????');
				Modal.close();
			});
		}, 100);
	};

	//?????? ????????? ?????? - ?????? ?????????
	const onPressSendMsg = () => {
		Modal.close();
		setTimeout(() => {
			Modal.popMessageModal(
				'?????????',
				msg => {
					console.log('msg', msg);
					Modal.close();
				},
				() => alert('?????????'),
			);
		}, 100);
	};

	const onClickMeatball = () => {
		//?????? ????????? ?????? ?????? ????????? ?????? ??????????????? ???????????? ???????????????
		//???????????? ????????? ?????? ??????????????? ?????? ?????? (????????? ????????? ??????)
		// console.log(props.data);
		let isMyFeed = userGlobalObject.userInfo._id == props.data.feed_writer_id._id;
		if (isMyFeed) {
			//?????? ?????? ???????????? ????????? ?????? ??????
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
					//?????? ????????? ?????? ?????? ????????? ???????????? ????????? ?????? ??????
					if (isFollowers) {
						Modal.popSelectBoxModal(
							FEED_MEATBALL_MENU_FOLLOWING,
							selectedItem => {
								// alert(selectedItem);
								Modal.close();
								if (selectedItem == '??????') {
									onPressReport();
								} else if (selectedItem == '????????????') {
									onPressShare();
								} else if (selectedItem == '????????? ??????') {
									onPressCancelFollow();
								} else if (selectedItem == '?????? ?????????') {
									onPressSendMsg();
								}
								setIsMeatballClicked(false);
							},
							() => Modal.close(),
							false,
							'',
						);
						//?????? ????????? ?????? ????????? ?????? ????????? ???????????? ????????? ?????? ??????
					} else {
						Modal.popSelectBoxModal(
							FEED_MEATBALL_MENU_UNFOLLOWING,
							selectedItem => {
								alert(selectedItem);
								if (selectedItem == '??????') {
									onPressReport();
								} else if (selectedItem == '????????????') {
									onPressShare();
								} else if (selectedItem == '????????? ??????') {
									onPressCancelFollow();
								} else if (selectedItem == '?????? ?????????') {
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
	// console.log('??????', route.name, route.name.includes('FeedCommentList'));
	console.log('?????? ????????? ?????????',route.name);
	return (
		// <View style={[organism_style.feedContent,{overflow:'hidden'}, shouldBeDetail ? {height: 270 * DP + reportLayout.height + labelLayout.height + layout.height} : {}]} removeClippedSubviews>
		<View
			style={[{height: 270 * DP,backgroundColor:'red'}, /*shouldBeDetail ? {height: 270 * DP + layout.height} : {}*/]}
			removeClippedSubviews>
			<View style={[organism_style.feedContent, {overflow: 'hidden',backgroundColor:'green'}]} onLayout={(e)=>{
				console.log('????????????',e.nativeEvent.layout,'??????',270*DP);
			}}>
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
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
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
													marginRight: 10 * DP,
												}}>
												<Text style={[txt.roboto24, txt.maincolor]}>????????????</Text>
											</View>
										)}
									</View>

									{/* ???????????? ?????? ?????? ??? ?????? ?????? */}
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
							<Meatball50_GRAY20_Horizontal onPress={onClickMeatball} />
						</View>
					</View>

					{/* type?????? status??? ?????? status ????????? ????????? ????????? ????????? ?????? ?????? ?????? */}
				</View>
				{/* line 1-1 (??????/???????????? ??????) */}
				{!route.name.includes('MainHomeFeedList')&&(feed_type == 'report'||feed_type=='missing') && (
					<View style={[organism_style.tipOff_feedContent, feedContent_style.tipOff]} onLayout={onLayoutReport}>
						<MissingReportInfo data={props.data} />
					</View>
				)}
				{(route.name.includes('FeedList') || feed_type == 'report' || feed_type == 'missing' || route.name.includes('FeedCommentList') || show) && (
					<View style={[organism_style.content_feedContent, feedContent_style.content_Top10,{backgroundColor:'yellow'}]}>
						<HashText style={[txt.noto28]} numberOfLines={shouldBeDetail ? 0 : 2} onLayout={onLayoutContent}>
							{feed_content}
						</HashText>
					</View>
				)}
			</View>
			<View style={[organism_style.time_view_feedContent, {paddingHorizontal: 48 * DP}]}>
				<View style={[organism_style.time_feedContent]}>
					<Text style={[txt.noto22, {color: GRAY10}]}>{feed_date&&getTimeLapsed(feed_date)}</Text>
				</View>
				{!show&&<TouchableWithoutFeedback onPress={showMore}>
					<View style={[organism_style.addMore_view_feedContent]}>
						<View style={[organism_style.addMore_feedContent]}>
							<Text style={[txt.noto22, {color: GRAY10}]}>?????????</Text>
						</View>
						<View style={[organism_style.braket]}>
							<Arrow_Down_GRAY20 />
						</View>
					</View>
				</TouchableWithoutFeedback>}
			</View>
		</View>
	);
};

FeedContent.defaultProps = {
	data: {
		type: 'button',
		addMore: true,
		tipOff: true,
		content: 'comment ????????? ????????? ?????????.',
	},
};
