import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, ScrollView, FlatList, ActivityIndicator, Animated} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY20, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import AniButton from '../button/AniButton';
import {Cross24_Filled} from 'Root/component/atom/icon';
import {getAddressList} from 'Root/api/address';
import {getInterestsList} from 'Root/api/interestsapi';
import ArrowDownButton from '../button/ArrowDownButton';
import {btn_w242, btn_w280, btn_w280x68} from 'Root/component/atom/btn/btn_style';
import {getCommonCodeDynamicQuery} from 'Root/api/commoncode';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loading from './Loading';
/**
 * 관심사 추가 및 수정 모달
 * @param {'Activity'|'Location'|'Review'} category -  관심활동 / 관심지역 / 커뮤니티후기 분기
 * @param {object} data - 관심사 추가할 계정 object(반려동물 혹은 유저)
 * @param {(selectedData)=>void)} onSave - 저장 버튼 클릭 콜백 / 선택된 항목의 오브젝트( ex : 지역, 미용, 놀이, 건강 등)
 * @param {()=>void)} onClose - 페이지 좌상단 x버튼 클릭 / 종료 콜백
 * @param {(selectedItems:object)=>void)} setState - 선택 목록
 *
 */
const InterestTagModal = props => {
	// console.log('InterestTagModa', props.data);
	//유저 오브젝트의 user_interests 의 더미데이터
	// user_interests는 크게 location 및 activity로 구성
	console.log('IntrestTagModal', props);
	const [userInterestContent, setUserInterestContent] = React.useState([]);
	const [userInterestLocation, setUserInterestLocation] = React.useState(props.data);
	const [userInterestReview, setUserInterestReview] = React.useState(props.data);

	const [isSaved, setIsSaved] = React.useState(false); // '저장하지 않고 나가시겠습니까?' 메시지 출력 여부 판별

	const [activityLists, setActivityLists] = React.useState([]);

	//커뮤니티 카테고리 선택 관련 state
	const [communityInterests, setCommunityInterests] = React.useState('');
	const [showBtnModal, setShowBtnModal] = React.useState(false); //모달창 대체 View 출력 여부
	const [addressList, setAddressList] = React.useState([]);

	React.useEffect(() => {
		//커뮤니티 후기 글쓰기에서 호출한 관심태그 모달
		if (props.category == 'ReviewWrite' || props.category == 'Review') {
			getCommonCodeDynamicQuery(
				{
					common_code_c_name: 'communityobjects',
					common_code_language: 'kor',
					common_code_out_type: 'interests',
				},
				result => {
					// console.log('common code result', result.msg);
					setCommunityInterests(result.msg);
				},
				err => {
					console.log('common code err', err);
				},
			);
		} else {
			let tempUserInterestContentList = [];
			let tempUserInterestLocationList = [];
			//유저 관심사 목록 DB에서 받아오기
			getInterestsList({}, interests => {
				var acitivityList = [];
				const nameList = {interests_beauty: '미용', interests_activity: '놀이', interests_food: '사료&간식', interests_health: '건강'};
				const interestObj = interests.msg[0];
				const getinterest = Object.entries(interestObj).map((category, idx) => {
					if (idx == 2) {
						setAddressList(category[1]);
					}
					if (idx >= 3) {
						acitivityList.push({category: nameList[category[0]], content: category[1]});
					}
				});
				setActivityLists(acitivityList);
			});
			//현재 유저의 관심사 리스트를 목록들에 적용
			const saveUserInterest = Object.entries(props.data).map(interest => {
				console.log('object', interest);
				if (props.isActivation) {
					tempUserInterestContentList.push(interest[1]);
				} else {
					tempUserInterestLocationList.push(interest[1]);
				}

				console.log('아오..', tempUserInterestLocationList, tempUserInterestContentList);
				setUserInterestContent(tempUserInterestContentList);
				// setUserInterestLocation(tempUserInterestLocationList);
				setUserInterestLocation(tempUserInterestContentList);
			});
		}
	}, []);

	//관심활동 태그를 클릭
	const onPressInterestActivationTag = tag => {
		let copy = [...userInterestContent];
		if (copy.includes(tag)) {
			let findIndex = copy.findIndex(e => e == tag);
			copy.splice(findIndex, 1);
		} else {
			copy.push(tag);
		}
		setUserInterestContent(copy);
	};

	//관심지역 태그를 클릭
	const onPressInterestLocationTag = tag => {
		let copy = [...userInterestLocation];
		if (copy.includes(tag)) {
			let findIndex = copy.findIndex(e => e == tag);
			copy.splice(findIndex, 1);
		} else {
			copy.push(tag);
		}
		setUserInterestLocation(copy);
	};

	//저장
	const onPressSave = () => {
		if (props.category == 'Activity') {
			props.setState(userInterestContent);
		} else if (props.category == 'Location') {
			props.setState(userInterestLocation);
		} else if (props.category == 'ReviewWrite') {
			props.setState({
				userInterestReview: userInterestReview,
			});
		}
		setIsSaved(true);
		Modal.close();
	};

	//모달 종료
	const onClose = () => {
		if (props.category == 'Review') {
			props.onClose();
			Modal.close();
		} else if (isSaved) {
			props.onClose();
			Modal.close();
		} else {
			const prev = props.data;
			let equals = true;
			if (props.category == 'Location' && prev.length == userInterestLocation.length) {
				prev.map((v, i) => {
					if (!userInterestLocation.includes(v)) {
						equals = false;
					}
				});
				if (equals) {
					props.onClose();
					Modal.close();
				} else {
					setShowBtnModal(true);
				}
			} else if (props.category == 'Activity' && prev.length == userInterestContent.length) {
				prev.map((v, i) => {
					if (!userInterestContent.includes(v)) {
						equals = false;
					}
				});
				if (equals) {
					props.onClose();
					Modal.close();
				} else {
					setShowBtnModal(true);
				}
			} else {
				let arr = [];
				const review_category_list = arr.concat(
					userInterestReview.interests_review,
					userInterestReview.interests_trip,
					userInterestReview.interests_etc,
					userInterestReview.interests_hospital,
					userInterestReview.interests_interior,
				);
				if (review_category_list.length == 0) {
					props.onClose();
					Modal.close();
				} else {
					setShowBtnModal(true);
				}
			}
		}
	};

	//X마크 클릭 후 저장 후 나감 클릭
	const onPressExitAfterSave = () => {
		onPressSave();
	};

	//X마크 클릭 후 나가기 클릭
	const onPressExitWithoutSave = () => {
		props.onClose();
		Modal.close();
	};

	const onPressBackground = () => {
		console.log('ddd');
		if (showBtnModal) {
			setShowBtnModal(false);
		}
	};

	const getList = () => {
		if (props.category == 'Review' || props.category == 'ReviewWrite') {
			return getReviewCategory();
		} else if (props.category == 'Activity') {
			return getActivityList();
		} else if (props.category == 'Location') {
			return getLocationList();
		}
	};

	//관심 리뷰 태그를 클릭
	const onPressInterestReviewTag = (category, tag) => {
		let copy = [];
		switch (category) {
			case 0:
				copy = [...userInterestReview.interests_trip];
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				setUserInterestReview({...userInterestReview, interests_trip: copy});
				break;
			case 1:
				copy = [...userInterestReview.interests_interior];
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				setUserInterestReview({...userInterestReview, interests_interior: copy});
				break;
			case 2:
				copy = [...userInterestReview.interests_hospital];
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				setUserInterestReview({...userInterestReview, interests_hospital: copy});
				break;
			case 3:
				copy = [...userInterestReview.interests_review];
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				setUserInterestReview({...userInterestReview, interests_review: copy});
				break;
			case 4:
				copy = [...userInterestReview.interests_etc];
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				setUserInterestReview({...userInterestReview, interests_etc: copy});
				break;
			default:
				break;
		}
	};

	const getCommuntyInterestList = (type, typeText) => {
		const hasDefinition = v => {
			let result = true;
			switch (typeText) {
				case 0:
					result = userInterestReview.interests_trip.includes(v);
					break;
				case 1:
					result = userInterestReview.interests_interior.includes(v);
					break;
				case 2:
					result = userInterestReview.interests_hospital.includes(v);
					break;
				case 3:
					result = userInterestReview.interests_review.includes(v);
					break;
				case 4:
					result = userInterestReview.interests_etc.includes(v);
					break;
				default:
					break;
			}
			return result;
		};

		return (
			<View style={{marginBottom: 40 * DP, paddingHorizontal: 20 * DP}}>
				<Text style={[txt.noto24, {color: GRAY10, alignSelf: 'flex-start', paddingLeft: 20 * DP}]}>{type.topic} </Text>
				<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
					{type.definition.map((v, i) => {
						if (i % 2 == 0) {
							return null;
						}
						return (
							<TouchableOpacity
								onPress={() => onPressInterestReviewTag(typeText, v)}
								key={i}
								style={[hasDefinition(v) ? style.contentText_userInterest : style.contentText]}>
								<Text style={[txt.noto28, {color: hasDefinition(v) ? WHITE : GRAY10, textAlign: 'center'}]}>{v}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
					{type.definition.map((v, i) => {
						if (i % 2 != 0) {
							return null;
						}
						return (
							<TouchableOpacity
								onPress={() => onPressInterestReviewTag(typeText, v)}
								key={i}
								style={[hasDefinition(v) ? style.contentText_userInterest : style.contentText]}>
								<Text style={[txt.noto28, {color: hasDefinition(v) ? WHITE : GRAY10, textAlign: 'center'}]}>{v}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</View>
		);
	};

	const scrollRef = React.useRef();

	//커뮤니티 카테고리 분기
	const getReviewCategory = () => {
		if (communityInterests == '') {
			return <ActivityIndicator />;
		} else
			return (
				<ScrollView style={{flex: 1}} ref={scrollRef}>
					<View style={[style.review_container]}>
						{getCommuntyInterestList(communityInterests.interests_trip, 0)}
						{getCommuntyInterestList(communityInterests.interests_interior, 1)}
						{getCommuntyInterestList(communityInterests.interests_hospital, 2)}
						{getCommuntyInterestList(communityInterests.interests_review, 3)}
						{getCommuntyInterestList(communityInterests.interests_etc, 4)}
					</View>
				</ScrollView>
			);
	};

	const getActivityList = () => {
		if (activityLists.length == 0) {
			return <Loading isModal={false} smallBox={true} />;
		} else
			return (
				<ScrollView ref={scrollRef}>
					{activityLists.map((v, i) => {
						return (
							<View key={i} style={{marginBottom: 40 * DP, paddingHorizontal: 20 * DP}}>
								<Text style={[txt.noto24, {color: GRAY10, alignSelf: 'flex-start', paddingLeft: 20 * DP}]}>{v.category}</Text>
								<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
									{v.content.length
										? v.content.map((d, i) => {
												if (i % 2 == 0) {
													return null;
												}
												return (
													<TouchableOpacity
														onPress={() => onPressInterestActivationTag(d)}
														key={i}
														style={[userInterestContent.includes(d) ? style.contentText_userInterest : style.contentText]}>
														<Text style={[txt.noto28, {color: userInterestContent.includes(d) ? WHITE : GRAY10, textAlign: 'center'}]}>{d}</Text>
													</TouchableOpacity>
												);
										  })
										: null}
								</View>
								<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
									{v.content.length
										? v.content.map((d, i) => {
												if (i % 2 != 0) {
													return null;
												}
												return (
													<TouchableOpacity
														key={i}
														onPress={() => onPressInterestActivationTag(d)}
														style={[userInterestContent.includes(d) ? style.contentText_userInterest : style.contentText]}>
														<Text style={[txt.noto28, {color: userInterestContent.includes(d) ? WHITE : GRAY10, textAlign: 'center'}]}>{d}</Text>
													</TouchableOpacity>
												);
										  })
										: null}
								</View>
							</View>
						);
					})}
				</ScrollView>
			);
	};

	const getLocationList = () => {
		const renderItem = (v, index) => {
			return (
				<View style={{alignSelf: 'center', width: 270 * DP, alignItems: 'center'}}>
					{userInterestLocation.includes(v) ? (
						<TouchableOpacity
							onPress={() => onPressInterestLocationTag(v)}
							style={[style.contentText_userInterest, {width: 226 * DP, marginBottom: 40 * DP, paddingHorizontal: 20 * DP}]}>
							<Text style={[txt.noto28b, {color: WHITE, textAlign: 'center'}]}>{v}</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() => onPressInterestLocationTag(v)}
							style={[style.contentText, {width: 226 * DP, marginBottom: 40 * DP, paddingHorizontal: 20 * DP}]}>
							<Text style={[txt.noto28, {color: GRAY10, textAlign: 'center'}]}>{v}</Text>
						</TouchableOpacity>
					)}
				</View>
			);
		};
		return <FlatList data={addressList} ref={scrollRef} renderItem={({item, index}) => renderItem(item, index)} numColumns={2} />;
	};

	return (
		<View style={style.background}>
			<TouchableOpacity activeOpacity={1} onPress={onPressBackground} style={[style.popUpWindow, {}]}>
				<View style={[style.header]}>
					<TouchableOpacity onPress={onClose} style={[style.crossMark]}>
						<Cross24_Filled />
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressSave} style={[style.saveText]}>
						<Text style={[txt.noto36b, {color: APRI10}]}>저장</Text>
					</TouchableOpacity>
				</View>
				{getList()}
			</TouchableOpacity>
			{showBtnModal ? (
				<View style={[style.btnModalContainer, style.shadow]}>
					<View style={[style.btnModalTitle]}>
						<Text style={[txt.noto28, {color: GRAY10}]}>저장하지않고 나가시겠습니까?</Text>
					</View>
					<View style={[style.btnModalBtnContainer]}>
						<AniButton onPress={onPressExitAfterSave} btnStyle={'border'} btnTitle={'저장후 나감'} />
						<AniButton onPress={onPressExitWithoutSave} btnStyle={'border'} btnTitle={'나가기'} />
					</View>
				</View>
			) : (
				<></>
			)}
		</View>
	);
};

InterestTagModal.defaultProps = {
	onSave: () => {},
	onClose: () => {},
	isActivation: true,
	category: 'Review',
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		width: 582 * DP,
		height: 1176 * DP,
		paddingTop: 30 * DP,
		borderRadius: 50 * DP,
		backgroundColor: WHITE,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
	header: {
		width: 502 * DP,
		height: 56 * DP,
		marginBottom: 20 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
	},
	crossMark: {
		width: 90 * DP,
		height: 90 * DP,
		justifyContent: 'center',
	},
	saveText: {
		// width: 66 * DP,

		height: 56 * DP,
	},
	content: {
		// width: 582 * DP,
		paddingHorizontal: 32 * DP,
		marginTop: 10 * DP,
		// backgroundColor: 'lightblue',
	},
	category: {
		width: 502 * DP,
	},
	contentList: {
		width: 502 * DP,
		marginTop: 12 * DP,
	},
	contentText: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 68 * DP,
		paddingHorizontal: 12 * DP,
		minWidth: 126 * DP,
		borderRadius: 25 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY20,
		marginLeft: 20 * DP,
		marginTop: 20 * DP,
	},
	contentText_userInterest: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 12 * DP,
		backgroundColor: APRI10,
		height: 68 * DP,
		borderRadius: 25 * DP,
		minWidth: 126 * DP,
		marginLeft: 20 * DP,
		marginTop: 20 * DP,
	},
	btnModalContainer: {
		position: 'absolute',
		width: 614 * DP,
		height: 216 * DP,
		borderRadius: 50 * DP,
		paddingVertical: 30 * DP,
		paddingHorizontal: 64 * DP,
		backgroundColor: 'white',
		opacity: 0.9,
	},
	btnModalTitle: {
		alignItems: 'center',
	},
	btnModalBtnContainer: {
		width: 486 * DP,
		height: 70 * DP,
		marginTop: 30 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	review_container: {
		paddingHorizontal: 5 * DP,
	},
	review_location: {
		flexDirection: 'row',
		width: 530 * DP,
		paddingVertical: 30 * DP,
		alignSelf: 'center',
		justifyContent: 'space-between',
	},
	review_category_item: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	downScrollSelectContainer: {
		position: 'absolute',
		bottom: 0,
		width: 750 * DP,
		// height: 476 * DP,
		justifyContent: 'flex-end',
	},
	modal_header: {
		width: 750 * DP,
		flexDirection: 'row',
		backgroundColor: APRI10,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
	},
	list: {
		width: 750 * DP,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	listItem: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 666 * DP,
		height: 70 * DP,
		borderRadius: 30 * DP,
	},
});

export default InterestTagModal;
