import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, ScrollView, FlatList, ActivityIndicator, Animated, TouchableOpacity} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY20, BLACK, MAINBLACK, GRAY30, GRAY50, GRAY40} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import AniButton from '../button/AniButton';
import {Cross24_Filled} from 'Root/component/atom/icon';
import {getAddressList} from 'Root/api/address';
import ArrowDownButton from '../button/ArrowDownButton';
import {btn_w242, btn_w280} from 'Root/component/atom/btn/btn_style';
import {getCommonCodeDynamicQuery} from 'Root/api/commoncode';
/**
 * 리뷰 필터 추가 및 수정 모달
 * @param {'Review'|'ReviewWrite'} category -  리뷰/리뷰글쓰기
 * @param {object} data - 관심사 추가할 계정 object(반려동물 혹은 유저)
 * @param {(selectedData)=>void)} onSave - 저장 버튼 클릭 콜백 / 선택된 항목의 오브젝트( ex : 지역, 미용, 놀이, 건강 등)
 * @param {()=>void)} onClose - 페이지 좌상단 x버튼 클릭 / 종료 콜백
 * @param {(selectedItems:object)=>void)} setState - 선택 목록
 *
 */
const ReviewFilterModal = props => {
	const [userInterestReview, setUserInterestReview] = React.useState(props.data);
	const [isSaved, setIsSaved] = React.useState(false); // '저장하지 않고 나가시겠습니까?' 메시지 출력 여부 판별

	//커뮤니티 카테고리 선택 관련 state
	const [communityInterests, setCommunityInterests] = React.useState('');
	const [showBtnModal, setShowBtnModal] = React.useState(false); //모달창 대체 View 출력 여부
	const [city, setCity] = React.useState(''); // 리뷰의 지역 필터 중 광역시, 도 파라미터
	const [district, setDistrict] = React.useState(['', '', '광역시, 도를 먼저 선택해주세요.']); // 리뷰의 지역 필터 중 시군구 파라미터
	const [selectedItem, setSelectedItem] = React.useState(2); // 광역시 도 선택 인덱스
	const [selectedCity, setSelectedCity] = React.useState(props.data.interests_location?.city);
	const [selectedItem_dis, setSelectedItem_dis] = React.useState(2); // 시군구 선택 인덱스
	const [selectedDistrict, setSelectedDistrict] = React.useState(props.data.interests_location?.district); // 시군구 선택 아이템
	const [selectCityOpen, setSelectCityOpen] = React.useState(false);
	const [selectDistrictOpen, setSelectDistrictOpen] = React.useState(false);
	const isReviewWrite = props.category == 'ReviewWrite';

	React.useEffect(() => {
		//커뮤니티 후기 글쓰기에서 호출한 관심태그 모달
		if (isReviewWrite || props.category == 'Review') {
			getCommonCodeDynamicQuery(
				{
					common_code_c_name: 'communityobjects',
					common_code_language: 'kor',
					common_code_out_type: 'interests',
				},
				result => {
					// console.log('common code result', result.msg);
					// const res = {
					// 	interests_etc: result.msg.interests_etc,
					// 	interests_trip: result.msg.interests_group1,
					// 	interests_hospital: result.msg.interests_group2,
					// 	interests_interior: result.msg.interests_group3,
					// };
					setCommunityInterests(result.msg);
				},
				err => {
					console.log('common code err', err);
				},
			);
		}
		if (props.category == 'Review') {
			//커뮤니티 후기글 상세에서 호출한 관심태그 모달
			getAddressList(
				{},
				result => {
					const padding = '';
					let arr = [padding, padding];
					let cities = arr.concat(result.msg);
					let find = cities.findIndex(e => e == '서울특별시');
					let find2 = cities.findIndex(e => e == '경기도');
					cities.splice(find, 1);
					cities.splice(find2, 1);
					cities.splice(2, 0, '서울특별시');
					cities.splice(3, 0, '경기도');
					cities.push(padding);
					cities.push(padding);
					setCity(cities);
				},
				err => console.log('err', err),
			);
		}
	}, []);

	//현재 선택된 광역시, 도가 있다면 자동으로 시,군,구를 채움
	React.useEffect(() => {
		if (props.data.interests_location?.city) {
			getAddressList(
				{city: props.data.interests_location?.city},
				result => {
					const padding = '';
					let arr = [padding, padding];
					let districts = arr.concat(result.msg);
					districts.push(padding);
					districts.push(padding);
					setDistrict(districts);
					setSelectedDistrict(props.data.interests_location?.district);
				},
				err => {
					console.log('err', err);
				},
			);
		}
	}, [props.data]);

	const citySelectHeight = React.useRef(new Animated.Value(0)).current;
	const districtSelectHeight = React.useRef(new Animated.Value(0)).current;

	const cityInterpolatedHeight = citySelectHeight.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 100],
	});

	const districtInterpolatedHeight = districtSelectHeight.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 100],
	});

	React.useEffect(() => {
		animateSelectModal(citySelectHeight, selectCityOpen);
	}, [selectCityOpen]);

	React.useEffect(() => {
		animateSelectModal(districtSelectHeight, selectDistrictOpen);
	}, [selectDistrictOpen]);

	const animateSelectModal = (kind, bool) => {
		const toValue = bool ? 465 : 0;
		Animated.timing(kind, {
			duration: 500,
			toValue: toValue * DP,
			// easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	};

	//저장
	const onPressSave = () => {
		console.log('userInterestReview', userInterestReview);
		if (isReviewWrite) {
			props.setState({
				userInterestReview: userInterestReview,
			});
		} else if (props.category == 'Review') {
			let temp = userInterestReview;
			temp.interests_location = {
				city: selectedCity,
				district: selectedDistrict,
			};
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
			let arr = [];
			let review_category_list = [];

			review_category_list = arr.concat(
				// userInterestReview.interests_review,
				userInterestReview.interests_group1,
				userInterestReview.interests_etc,
				userInterestReview.interests_group2,
				userInterestReview.interests_group3,
			);
			// review_category_list = arr.concat(
			// 	// userInterestReview.interests_review,
			// 	userInterestReview.interests_trip,
			// 	userInterestReview.interests_etc,
			// 	userInterestReview.interests_hospital,
			// 	userInterestReview.interests_interior,
			// );
			if (review_category_list.length == 0 && userInterestReview.interests_location.city == '') {
				props.setState({
					userInterestReview: userInterestReview,
				});
			}
			props.onClose();
			Modal.close();
		} else if (isSaved) {
			props.onClose();
			Modal.close();
		} else {
			let arr = [];
			let review_category_list = [];
			review_category_list = arr.concat(
				// userInterestReview.interests_review,
				userInterestReview.interests_group1,
				userInterestReview.interests_group2,
				userInterestReview.interests_group3,
				userInterestReview.interests_etc,
			);
			// review_category_list = arr.concat(
			// 	// userInterestReview.interests_review,
			// 	userInterestReview.interests_trip,
			// 	userInterestReview.interests_etc,
			// 	userInterestReview.interests_hospital,
			// 	userInterestReview.interests_interior,
			// );
			if (review_category_list.length == 0) {
				props.onClose();
				Modal.close();
			} else {
				setShowBtnModal(true);
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

	//모달이 열린 상태에서 모달 이외 영역 클릭
	const onPressBackground = () => {
		setShowBtnModal(false);
		setSelectCityOpen(false);
		setSelectDistrictOpen(false);
	};

	//필터 초기화
	const onPressInitialize = () => {
		setShowBtnModal(false);
		setSelectCityOpen(false);
		setSelectDistrictOpen(false);
		const init = {
			interests_etc: [],
			interests_group1: [],
			interests_group2: [],
			interests_group3: [],
			interests_location: {city: '', district: ''},
			// interests_hospital: [],
			// interests_interior: [],
			// interests_trip: [],
			// interests_review: [],
		};
		setUserInterestReview(init);
		setSelectedCity('');
		setSelectedDistrict('');
	};

	//상단 모달창에서 광역시, 도 드롭다운 열기 클릭
	const onOpenCity = () => {
		setSelectDistrictOpen(false); // 광역시가 열리면 시군구는 닫힘
		setSelectCityOpen(!selectCityOpen);
	};

	//상단 모달창에서 시군구 드롭다운 열기 클릭
	const onOpenDistrict = () => {
		setSelectCityOpen(false); // 시군구가 열리면 광역시는 닫힘
		setSelectDistrictOpen(!selectDistrictOpen);
	};

	//광역시 도  모달 스크롤
	const onScroll = event => {
		let y = event.nativeEvent.contentOffset.y; //스크롤 영역 데이터
		let focused = '';
		if (city.length < 5) {
			focused = Math.floor(y / (63 * DP));
		} else {
			focused = Math.floor(y / (67 * DP));
		}
		if (focused < 1) {
			setSelectedItem(2);
		} else {
			if (focused + 2 >= city.length - 2) {
				// 마지막 배열을 넘어서서 스크롤을 할 경우 마지막으로 자동 회귀
				setSelectedItem(city.length - 3);
			} else {
				setSelectedItem(focused + 2);
			}
		}
	};

	//시군구 모달 스크롤
	const onScroll_dis = event => {
		let y = event.nativeEvent.contentOffset.y;
		let focused = '';
		if (district.length < 5) {
			focused = Math.floor(y / (63 * DP));
		} else {
			focused = Math.floor(y / (67 * DP));
		}
		// let focused = Math.floor(y / (69 * DP));
		if (focused < 1) {
			setSelectedItem_dis(2);
		} else {
			if (focused + 2 >= district.length - 2) {
				// 마지막 배열을 넘어서서 스크롤을 할 경우 마지막으로 자동 회귀
				setSelectedItem_dis(district.length - 3);
			} else {
				setSelectedItem_dis(focused + 2);
			}
		}
	};

	//하단 드롭다운에서 완료 버튼 클릭
	const onSelect = () => {
		setSelectCityOpen(false);
		setSelectedCity(city[selectedItem]);
		getAddressList(
			{
				city: city[selectedItem],
			},
			result => {
				const padding = '';
				let arr = [padding, padding];
				let districts = arr.concat(result.msg);
				districts.push(padding);
				districts.push(padding);
				//시,군,구가 자동으로 바뀌지 않도록 주석처리
				setDistrict(districts);
				// setSelectedDistrict(result.msg[0]);
				// setSelectedItem_dis(2);
			},
			err => {
				console.log('err', err);
			},
		);
	};

	//하단 드롭다운에서 완료 버튼 클릭
	const onSelect_dis = arg => {
		setSelectDistrictOpen(false);
		setSelectedDistrict(district[selectedItem_dis]);
	};

	//관심 리뷰 태그를 클릭
	const onPressInterestReviewTag = (category, tag) => {
		let copy = [];
		let newer = userInterestReview.hasOwnProperty('interests_group1');
		console.log('newer', newer);
		switch (category) {
			case 0:
				newer ? (copy = [...userInterestReview.interests_group1]) : (copy = [...userInterestReview.interests_trip]);
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				newer
					? setUserInterestReview({...userInterestReview, interests_group1: copy})
					: setUserInterestReview({...userInterestReview, interests_trip: copy});
				break;
			case 1:
				newer ? (copy = [...userInterestReview.interests_group2]) : (copy = [...userInterestReview.interests_interior]);
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				newer
					? setUserInterestReview({...userInterestReview, interests_group2: copy})
					: setUserInterestReview({...userInterestReview, interests_interior: copy});
				break;
			case 2:
				newer ? (copy = [...userInterestReview.interests_group3]) : (copy = [...userInterestReview.interests_hospital]);
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				newer
					? setUserInterestReview({...userInterestReview, interests_group3: copy})
					: setUserInterestReview({...userInterestReview, interests_hospital: copy});
				break;
			case 3:
				// copy = [...userInterestReview.interests_review];
				// copy.includes(tag)
				// 	? copy.splice(
				// 			copy.findIndex(e => e == tag),
				// 			1,
				// 	  )
				// 	: copy.push(tag);
				// setUserInterestReview({...userInterestReview, interests_review: copy});
				break;
			case 4:
				newer ? (copy = [...userInterestReview.interests_etc]) : (copy = [...userInterestReview.interests_etc]);
				copy.includes(tag)
					? copy.splice(
							copy.findIndex(e => e == tag),
							1,
					  )
					: copy.push(tag);
				newer
					? setUserInterestReview({...userInterestReview, interests_etc: copy})
					: setUserInterestReview({...userInterestReview, interests_etc: copy});
				break;
			default:
				break;
		}
	};

	const getCommuntyInterestList = (type, typeText) => {
		const hasDefinition = v => {
			let result = true;
			if (userInterestReview.hasOwnProperty('interests_group1')) {
				switch (typeText) {
					case 0:
						result = userInterestReview.interests_group1.includes(v);
						break;
					case 1:
						result = userInterestReview.interests_group2.includes(v);
						break;
					case 2:
						result = userInterestReview.interests_group3.includes(v);
						break;
					case 3:
						// result = userInterestReview.interests_review.includes(v);
						break;
					case 4:
						result = userInterestReview.interests_etc.includes(v);
						break;
					default:
						break;
				}
			} else {
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
						// result = userInterestReview.interests_review.includes(v);
						break;
					case 4:
						result = userInterestReview.interests_etc.includes(v);
						break;
					default:
						break;
				}
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

	const getCategory = () => {
		if (communityInterests.hasOwnProperty('interests_group1')) {
			return (
				<>
					{getCommuntyInterestList(communityInterests.interests_group1, 0)}
					{getCommuntyInterestList(communityInterests.interests_group2, 1)}
					{getCommuntyInterestList(communityInterests.interests_group3, 2)}
					{getCommuntyInterestList(communityInterests.interests_etc, 4)}
				</>
			);
		} else {
			return (
				<>
					{getCommuntyInterestList(communityInterests.interests_trip, 0)}
					{getCommuntyInterestList(communityInterests.interests_interior, 1)}
					{getCommuntyInterestList(communityInterests.interests_hospital, 2)}
					{getCommuntyInterestList(communityInterests.interests_review, 3)}
					{getCommuntyInterestList(communityInterests.interests_etc, 4)}
				</>
			);
		}
	};

	const scrollRef = React.useRef();

	//커뮤니티 카테고리 분기
	const getReviewCategory = () => {
		if (communityInterests == '') {
			return (
				<View style={{paddingVertical: 100 * DP}}>
					<ActivityIndicator size={'large'} />
				</View>
			);
		} else
			return (
				<ScrollView style={{flex: 1}} onResponderMove={onPressBackground} ref={scrollRef}>
					<View style={[style.review_container]}>
						{isReviewWrite ? (
							<></>
						) : (
							<TouchableOpacity activeOpacity={1} onPress={onPressBackground} style={[style.review_location]}>
								<ArrowDownButton
									onPress={onOpenCity}
									btnStyle={'border'}
									btnLayout={{width: 290 * DP, height: 68 * DP, borderRadius: 30 * DP}}
									btnTitle={selectedCity || '도, 광역시'}
								/>
								<ArrowDownButton
									onPress={onOpenDistrict}
									btnStyle={'border'}
									btnLayout={{width: 290 * DP, height: 68 * DP, borderRadius: 30 * DP}}
									titleFontStyle={22}
									btnTitle={selectedDistrict || '시군구'}
								/>
							</TouchableOpacity>
						)}
						<TouchableOpacity activeOpacity={1} onPress={onPressBackground}>
							{getCategory()}
						</TouchableOpacity>
					</View>
				</ScrollView>
			);
	};

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, {}]}>
				<TouchableOpacity onPress={onPressBackground} activeOpacity={1} style={[isReviewWrite ? style.header_write : style.header]}>
					{isReviewWrite ? (
						<></>
					) : (
						<View style={{marginTop: 10 * DP}}>
							<AniButton
								btnTitle={'필터 초기화'}
								onPress={onPressInitialize}
								btnStyle={'border'}
								btnLayout={{width: 160 * DP, height: 50 * DP, borderRadius: 30 * DP}}
								activeOpacity={0.2}
							/>
						</View>
					)}
					<TouchableOpacity onPress={onClose} style={[style.crossMark, {alignItems: isReviewWrite ? 'flex-start' : 'flex-end'}]}>
						<Cross24_Filled />
					</TouchableOpacity>
				</TouchableOpacity>
				{getReviewCategory()}
				{communityInterests == '' ? (
					<></>
				) : (
					<TouchableOpacity onPress={onPressSave} style={[style.saveText]}>
						<Text style={[txt.noto24, {color: MAINBLACK}]}>완료</Text>
					</TouchableOpacity>
				)}
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
			{/* 하단 스크롤뷰 영역 - 광역시 도 */}
			<Animated.View style={[style.downScrollSelectContainer, {height: cityInterpolatedHeight}]}>
				<View style={[style.modal_header]}>
					<Text onPress={() => setSelectCityOpen(false)} style={[txt.noto30b, {paddingVertical: 22 * DP}]}>
						취소
					</Text>
					<TouchableOpacity onPress={onSelect}>
						<Text style={[txt.noto30b]}>완료</Text>
					</TouchableOpacity>
				</View>
				<View style={[style.list, {}]}>
					<FlatList
						data={city}
						onScroll={onScroll}
						showsVerticalScrollIndicator={false}
						renderItem={({item, index}) => {
							return (
								<TouchableOpacity
									activeOpacity={1}
									onPress={() => setSelectedItem(index)}
									key={index}
									style={[style.listItem, index == selectedItem && item != '' ? {backgroundColor: GRAY30} : null]}>
									<>
										<Text style={[txt.roboto34, {color: index == selectedItem && item != '' ? MAINBLACK : GRAY10}]}>{item}</Text>
									</>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
			</Animated.View>
			{/* 하단 스크롤뷰 영역 - 시군구 */}
			<Animated.View
				style={[
					style.downScrollSelectContainer,
					{
						height: districtInterpolatedHeight,
					},
				]}>
				<View style={[style.modal_header]}>
					<Text onPress={() => setSelectDistrictOpen(false)} style={[txt.noto30b, {paddingVertical: 22 * DP}]}>
						취소
					</Text>
					<TouchableOpacity onPress={onSelect_dis}>
						<Text style={[txt.noto30b]}>완료</Text>
					</TouchableOpacity>
				</View>
				<View style={[style.list, {}]}>
					<FlatList
						data={district}
						onScroll={onScroll_dis}
						showsVerticalScrollIndicator={false}
						renderItem={({item, index}) => {
							return (
								<TouchableOpacity
									activeOpacity={1}
									onPress={() => setSelectedItem_dis(index)}
									key={index}
									style={[style.listItem, index == selectedItem_dis && item != '' ? {backgroundColor: GRAY30} : null]}>
									<>
										<Text style={[txt.roboto34, {color: index == selectedItem_dis && item != '' ? MAINBLACK : GRAY10}]}>{item}</Text>
									</>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
			</Animated.View>
		</View>
	);
};

ReviewFilterModal.defaultProps = {
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
		height: 1210 * DP,
		paddingTop: 20 * DP,
		borderRadius: 30 * DP,
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
		width: 606 * DP,
		paddingBottom: 20 * DP,
		// marginRight: 20 * DP,
		// marginBottom: 20 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
	},
	header_write: {
		width: 52 * DP,
		height: 52 * DP,
		marginRight: 20 * DP,
		// marginBottom: 20 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
	},
	crossMark: {
		width: 104 * DP,
		height: 52 * DP,
		justifyContent: 'center',
	},
	saveText: {
		width: 226 * DP,
		height: 70 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		backgroundColor: 'white',
		borderRadius: 30 * DP,
		marginTop: 10 * DP,
		marginBottom: 40 * DP,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
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
		minWidth: 114 * DP,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		backgroundColor: WHITE,
		marginLeft: 10 * DP,
		marginTop: 20 * DP,
	},
	contentText_userInterest: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 12 * DP,
		backgroundColor: MAINBLACK,
		height: 68 * DP,
		borderRadius: 30 * DP,
		minWidth: 114 * DP,
		marginLeft: 10 * DP,
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
		// opacity: 0.9,
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
		width: 654 * DP,
		paddingVertical: 30 * DP,
		paddingHorizontal: 20 * DP,
		alignSelf: 'center',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
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
		backgroundColor: GRAY30,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40 * DP,
		borderTopRightRadius: 40 * DP,
		borderTopLeftRadius: 40 * DP,
		bottom: -2,
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

export default ReviewFilterModal;
