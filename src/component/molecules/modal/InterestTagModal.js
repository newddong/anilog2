import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, ScrollView, FlatList} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import AniButton from '../button/AniButton';
import {Cross24_Filled} from 'Root/component/atom/icon';
import {getAddressList} from 'Root/api/address';
import {getInterestsList} from 'Root/api/interestsapi';
/**
 * 관심사 추가 및 수정 모달
 * @param {object} isActivation -  관심활동 / 관심지역 분기 (true일 경우 관심활동)
 * @param {object} data - 관심사 추가할 계정 object(반려동물 혹은 유저)
 * @param {(selectedData)=>void)} onSave - 저장 버튼 클릭 콜백 / 선택된 항목의 오브젝트( ex : 지역, 미용, 놀이, 건강 등)
 * @param {()=>void)} onClose - 페이지 좌상단 x버튼 클릭 / 종료 콜백
 *
 */
const InterestTagModal = props => {
	console.log('InterestTagModa', props.data);
	//유저 오브젝트의 user_interests 의 더미데이터
	// user_interests는 크게 location 및 activity로 구성

	const userDataDummy = [
		{
			category: '건강',
			content: ['재활', '노환'],
		},
		{
			category: '놀이',
			content: ['애견카페', '애견패션'],
		},
		{
			category: '사료&간식',
			content: ['노환', '애견패션', '어질리티'],
		},
	];
	// const dummyActivityList = [
	// 	{
	// 		category: '생활',
	// 		content: ['미용', '펫의류', '펫인테리어', '산책', '훈련'],
	// 	},
	// 	{
	// 		category: '놀이',
	// 		content: ['프리스비', '어질리티', '노즈워쿠', '장난감', '캣휠', '사냥놀이'],
	// 	},
	// 	{
	// 		category: '장소',
	// 		content: ['애견놀이터', '애견카페', '애견패션', '목장', '펫페어'],
	// 	},
	// 	{
	// 		category: '사료&간식',
	// 		content: ['수제간식', '건강보조제', '습식사료', '건식사료', '캣닢'],
	// 	},
	// 	{
	// 		category: '건강',
	// 		content: ['재활', '노환', '예방접종', '구강관리', '다이어트'],
	// 	},
	// ];
	const [userData, setUserData] = React.useState(userDataDummy);
	const [userInterestContent, setUserInterestContent] = React.useState([]);
	const [isSaved, setIsSaved] = React.useState(false); // '저장하지 않고 나가시겠습니까?' 메시지 출력 여부 판별
	const [showBtnModal, setShowBtnModal] = React.useState(false); //모달창 대체 View 출력 여부
	const [addressList, setAddressList] = React.useState([]);
	const [userInterestLocation, setUserInterestLocation] = React.useState([]);
	const [activityLists, setActivityLists] = React.useState([]);
	React.useEffect(() => {
		var tempUserInterestContentList = [];
		var tempUserInterestLocationList = [];
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
			// console.log('activityList', acitivityList);
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
			setUserInterestLocation(tempUserInterestLocationList);
		});
		// getAddressList(
		// 	{},
		// 	cities => {
		// 		// setAddressList(cities.msg);
		// 		console.log(cities.msg);
		// 	},
		// 	err => console.log('err', err),
		// );
	}, []);

	//현재 유저의 관심사 리스트를 목록들에 적용
	// React.useEffect(() => {
	// 	let copy = [...userInterestContent];
	// 	userData.map((v, i) => {
	// 		v.content.map(value => {
	// 			copy.push(value);
	// 		});
	// 	});

	// 	copy = [...new Set(copy)];
	// 	console.log('copy', copy);
	// 	setUserInterestContent(copy);
	// }, [userData]);
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
		// userInterestContent.push(tag);
	};

	//저장
	const onPressSave = () => {
		if (props.isActivation) {
			props.setState(userInterestContent);
		} else {
			props.setState(userInterestLocation);
		}
		setIsSaved(true);

		Modal.close();
	};

	const onClose = () => {
		if (isSaved) {
			props.onClose();
			Modal.close();
		} else {
			// alert('저장하지 않고 나가시겠습니까?');
			setShowBtnModal(true);
		}
	};

	//X마크 클릭 후 저장 후 나감 클릭
	const onPressExitAfterSave = () => {
		console.log('onPressExitAfterSave');
		onPressSave();
		props.onClose();
		Modal.close();
	};

	//X마크 클릭 후 나가기 클릭
	const onPressExitWithoutSave = () => {
		console.log('onPressExitWithoutSave');
		props.onClose();
		Modal.close();
	};

	const getActivityList = () => {
		return (
			<ScrollView>
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
		return <FlatList data={addressList} renderItem={({item, index}) => renderItem(item, index)} numColumns={2} />;
	};

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow]}>
				<View style={[style.header]}>
					<View style={[style.crossMark]}>
						<Cross24_Filled onPress={onClose} />
					</View>
					<TouchableOpacity onPress={onPressSave} style={[style.saveText]}>
						<Text style={[txt.noto36b, {color: APRI10}]}>저장</Text>
					</TouchableOpacity>
				</View>
				{props.isActivation ? getActivityList() : getLocationList()}
			</View>
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
		opacity: 0.9,
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
		width: 52 * DP,
	},
	saveText: {
		width: 66 * DP,
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
		borderRadius: 30 * DP,
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
		borderRadius: 30 * DP,
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
		opacity: 0.8,
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
});

export default InterestTagModal;
