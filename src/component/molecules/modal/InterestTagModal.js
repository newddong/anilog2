import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, ScrollView, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY20, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import AniButton from '../button/AniButton';
import {Cross24_Filled} from 'Root/component/atom/icon';
import {getInterestsList} from 'Root/api/interestsapi';
import {btn_w226} from 'Root/component/atom/btn/btn_style';
import {getCommonCodeDynamicQuery} from 'Root/api/commoncode';
import {styles} from 'Root/component/atom/image/imageStyle';
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
	const [userInterestContent, setUserInterestContent] = React.useState([]);
	const [userInterestLocation, setUserInterestLocation] = React.useState(props.data);
	const [isSaved, setIsSaved] = React.useState(false); // '저장하지 않고 나가시겠습니까?' 메시지 출력 여부 판별
	const [activityLists, setActivityLists] = React.useState([]);
	const [showBtnModal, setShowBtnModal] = React.useState(false); //모달창 대체 View 출력 여부
	const [addressList, setAddressList] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		getCommonCodeDynamicQuery(
			{
				common_code_c_name: 'communityobjects',
				common_code_language: 'kor',
				common_code_out_type: 'interests',
			},
			result => {
				// console.log('common code result', result);
				let temp = [];
				for (const key in result.msg) {
					// console.log('key', key, result.msg[key]);
					temp.push(result.msg[key]);
				}
				setActivityLists(temp);
			},
			err => {
				console.log('common code err', err);
			},
		);

		let tempUserInterestContentList = [];
		let tempUserInterestLocationList = [];
		//유저 관심사 목록 DB에서 받아오기
		getInterestsList({}, interests => {
			// console.log('interests', interests.msg);

			let acitivityList = [];
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
			setLoading(false);
		});
		//현재 유저의 관심사 리스트를 목록들에 적용
		const saveUserInterest = Object.entries(props.data).map(interest => {
			// console.log('object', interest);
			if (props.isActivation) {
				tempUserInterestContentList.push(interest[1]);
			} else {
				tempUserInterestLocationList.push(interest[1]);
			}
			// console.log('아오..', tempUserInterestLocationList, tempUserInterestContentList);
			setUserInterestContent(tempUserInterestContentList);
			setUserInterestLocation(tempUserInterestContentList);
		});
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
		}
		setIsSaved(true);
		Modal.close();
	};

	//모달 종료
	const onClose = () => {
		if (isSaved) {
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
		if (showBtnModal) {
			setShowBtnModal(false);
		}
	};

	const getList = () => {
		if (props.category == 'Activity') {
			return getActivityList();
		} else if (props.category == 'Location') {
			return getLocationList();
		}
	};

	const scrollRef = React.useRef();

	const getActivityList = () => {
		return (
			<View>
				<ScrollView ref={scrollRef}>
					{activityLists.map((v, i) => {
						return (
							<View key={i} style={[{marginBottom: 30 * DP, paddingHorizontal: 44 * DP}]}>
								{/* <Text style={[txt.noto26, {color: GRAY10, alignSelf: 'flex-start'}]}>{v.category}</Text> */}
								<Text style={[txt.noto26, {color: GRAY10, alignSelf: 'flex-start'}]}>{v.topic}</Text>
								<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
									{/* {v.content.length */}
									{v.definition.length
										? // ? v.content.map((d, i) => {
										  v.definition.map((d, i) => {
												// if (i % 2 == 0) {
												// 	return null;
												// }
												// if (i > 4) {
												// 	return null;
												// }
												return (
													<TouchableOpacity
														onPress={() => onPressInterestActivationTag(d)}
														key={i}
														style={[userInterestContent.includes(d) ? style.InterestText_userInterest : style.InterestContentText]}>
														<Text style={[txt.noto28, {color: userInterestContent.includes(d) ? WHITE : GRAY10, textAlign: 'center'}]}>{d}</Text>
													</TouchableOpacity>
												);
										  })
										: null}
								</View>
								{/* <View style={[{flexDirection: 'row', flexWrap: 'wrap'}]}>
									{v.content.length
										? v.content.map((d, i) => {
												// if (i % 2 != 0) {
												// return null;
												// }
												if (i <= 4) {
													return null;
												}
												return (
													<TouchableOpacity
														key={i}
														onPress={() => onPressInterestActivationTag(d)}
														style={[userInterestContent.includes(d) ? style.InterestText_userInterest : style.InterestContentText]}>
														<Text
															style={[
																txt.noto28,
																{color: userInterestContent.includes(d) ? WHITE : GRAY10, textAlign: 'center'},
																{padding: 12 * DP},
															]}>
															{d}
														</Text>
													</TouchableOpacity>
												);
										  })
										: null}
								</View> */}
							</View>
						);
					})}
				</ScrollView>
				<View style={[{alignItems: 'center'}, {marginBottom: 40}]}>
					<AniButton
						btnLayout={btn_w226}
						width={226}
						btnStyle={'border'}
						btnTheme={'shadow'}
						btnTitle={'저장'}
						height={70}
						titleFontStyle={24}
						onPress={onPressSave}
					/>
				</View>
			</View>
		);
	};

	const getLocationList = () => {
		const renderItem = (v, index) => {
			return (
				<View style={[{alignSelf: 'center', width: 276 * DP}]}>
					{userInterestLocation.includes(v) ? (
						<TouchableOpacity onPress={() => onPressInterestLocationTag(v)} style={[style.contentText_userInterest]}>
							<Text style={[txt.noto28, {color: WHITE, textAlign: 'center'}]}>{v}</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => onPressInterestLocationTag(v)} style={[style.contentText]}>
							<Text style={[txt.noto28, {color: MAINBLACK, textAlign: 'center'}]}>{v}</Text>
						</TouchableOpacity>
					)}
				</View>
			);
		};
		return (
			<View>
				<FlatList
					style={[{width: 694 * DP}, {paddingLeft: 96 * DP}, {marginBottom: 60 * DP}]}
					data={addressList}
					ref={scrollRef}
					renderItem={({item, index}) => renderItem(item, index)}
					numColumns={2}
				/>
				{/* <TouchableOpacity onPress={onPressSave} style={[style.saveText]}>
					<Text style={[txt.noto36b, {color: APRI10}]}>저장</Text>
				</TouchableOpacity> */}
				<View style={[{alignItems: 'center'}, {marginBottom: 40}]}>
					<AniButton
						btnLayout={btn_w226}
						width={226}
						btnStyle={'border'}
						btnTheme={'shadow'}
						btnTitle={'저장'}
						height={70}
						titleFontStyle={24}
						onPress={onPressSave}
					/>
				</View>
			</View>
		);
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator />
			</View>
		);
	} else
		return (
			<View style={style.background}>
				<TouchableOpacity activeOpacity={1} onPress={onPressBackground} style={[style.popUpWindow, {}]}>
					<View style={[style.header]}>
						<Text style={[txt.noto30, {color: MAINBLACK}]}>{props.category == 'Location' ? '관심지역 선택' : '관심활동 선택'}</Text>
						<TouchableOpacity onPress={onClose} style={[style.crossMark]}>
							<Cross24_Filled />
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
		width: 694 * DP,
		// height: 1176 * DP,
		// paddingTop: 30 * DP,
		borderRadius: 30 * DP,
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
		width: 694 * DP,
		height: 88 * DP,
		marginBottom: 20 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		// paddingHorizontal: 42 * DP,
		paddingLeft: 42 * DP,
		justifyContent: 'space-between',
		backgroundColor: '#DEDEDE',
		borderTopLeftRadius: 30 * DP,
		borderTopRightRadius: 30 * DP,
	},
	crossMark: {
		width: 90 * DP,
		height: 80 * DP,
		paddingRight: 42 * DP,
		justifyContent: 'center',
		alignItems: 'flex-end',
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
		width: 226 * DP,
		// backgroundColor: 'red',
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY20,
		// marginLeft: 20 * DP,
		marginTop: 30 * DP,
	},
	contentText_userInterest: {
		alignItems: 'center',
		justifyContent: 'center',
		// paddingHorizontal: 12 * DP,
		backgroundColor: MAINBLACK,
		height: 68 * DP,
		width: 226 * DP,
		borderRadius: 30 * DP,
		borderColor: GRAY20,
		marginTop: 30 * DP,
	},
	InterestText_userInterest: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 12 * DP,
		backgroundColor: MAINBLACK,
		height: 68 * DP,
		minWidth: 114 * DP,
		borderRadius: 30 * DP,
		borderColor: GRAY20,
		marginTop: 20 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
	},
	InterestContentText: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 68 * DP,
		paddingHorizontal: 12 * DP,
		// width: 226 * DP,
		minWidth: 114 * DP,
		// backgroundColor: 'red',
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY20,
		// marginLeft: 20 * DP,
		marginTop: 20 * DP,
		marginRight: 12 * DP,
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

	list: {
		width: 750 * DP,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
});

export default InterestTagModal;
