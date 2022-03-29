import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, ScrollView, FlatList, ActivityIndicator, Animated} from 'react-native';
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
	console.log('InterestTagModa', props.data);
	//유저 오브젝트의 user_interests 의 더미데이터
	// user_interests는 크게 location 및 activity로 구성

	const [userInterestContent, setUserInterestContent] = React.useState([]);
	const [userInterestLocation, setUserInterestLocation] = React.useState([]);
	const [userInterestReview, setUserInterestReview] = React.useState(props.data);
	const [isSaved, setIsSaved] = React.useState(false); // '저장하지 않고 나가시겠습니까?' 메시지 출력 여부 판별
	const [showBtnModal, setShowBtnModal] = React.useState(false); //모달창 대체 View 출력 여부
	const [addressList, setAddressList] = React.useState([]);
	const [city, setCity] = React.useState(''); // 리뷰의 지역 필터 중 광역시, 도 파라미터
	const [district, setDistrict] = React.useState(['', '', '광역시, 도를 먼저 선택해주세요.']); // 리뷰의 지역 필터 중 시군구 파라미터
	const [selectedItem, setSelectedItem] = React.useState(2); // 광역시 도 선택 인덱스
	const [selectedCity, setSelectedCity] = React.useState('강원도');
	const [selectedItem_dis, setSelectedItem_dis] = React.useState(2); // 시군구 선택 인덱스
	const [selectedDistrict, setSelectedDistrict] = React.useState('원주시'); // 시군구 선택 아이템
	const [selectCityOpen, setSelectCityOpen] = React.useState(false);
	const [selectDistrictOpen, setSelectDistrictOpen] = React.useState(false);
	const [activityLists, setActivityLists] = React.useState([]);

	React.useEffect(() => {
		let tempUserInterestContentList = [];
		let tempUserInterestLocationList = [];

		//유저 관심사 목록 DB에서 받아오기
		getInterestsList({}, interests => {
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
		if (props.category == 'Review') {
			getAddressList(
				{},
				result => {
					// console.log('result', result.msg);
					const padding = '';
					let arr = [padding, padding];
					let cities = arr.concat(result.msg);
					cities.push(padding);
					cities.push(padding);
					setCity(cities);
					getAddressList(
						{
							city: '강원도',
						},
						result => {
							const padding = '';
							let arr = [padding, padding];
							let districts = arr.concat(result.msg);
							districts.push(padding);
							districts.push(padding);
							setDistrict(districts);
						},
						err => {
							console.log('err', err);
						},
					);
				},
				err => console.log('err', err),
			);
		} else {
			tempUserInterestContentList = [];
			tempUserInterestLocationList = [];

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
				setUserInterestLocation(tempUserInterestLocationList);
			});
		}
	}, []);

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

	//관심 리뷰 태그를 클릭
	const onPressInterestReviewTag = (category, tag) => {
		let copy = [...userInterestReview.category];
		if (copy.includes(tag)) {
			let findIndex = copy.findIndex(e => e == tag);
			copy.splice(findIndex, 1);
		} else {
			copy.push(tag);
		}
		// setUserInterestReview(copy);
	};

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
		if (props.category == 'Activity') {
			props.setState(userInterestContent);
		} else if (props.category == 'Location') {
			props.setState(userInterestLocation);
		} else {
			props.setState({
				userInterestReview: userInterestReview,
			});
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

	const getList = () => {
		if (props.category == 'Review' || props.category == 'ReviewWrite') {
			return getReviewCategory();
		} else if (props.category == 'Activity') {
			return getActivityList();
		} else if (props.category == 'Location') {
			return getLocationList();
		}
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
		let focused = Math.floor(y / (68 * DP));
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
		let focused = Math.floor(y / (68 * DP));
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
				setDistrict(districts);
				setSelectedDistrict(result.msg[0]);
				setSelectedItem_dis(2);
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

	const getCategoryTitle = v => {
		console.log('v', v);
	};

	React.useEffect(() => {
		getCommonCodeDynamicQuery(
			{common_code_c_name: 'communityobjects', common_code_value: 'interests_trip'},
			result => {
				console.log('common code result', result.msg);
				let temp = {
					interests_trip: [],
					interests_hospital: [],
					interests_interior: [],
					interests_review: [],
					interests_etc: [],
				};
				result.msg.map((v, i) => {
					switch (v.common_code_value) {
						case 'interests_trip':
							if (v.common_code_category == 'definition') {
								temp.interests_trip.push(v.common_code_msg_kor);
							}
							break;

						default:
							break;
					}
				});

				const t = [
					{
						__v: 0,
						_id: '623c2bfea3f2e22cac0fb783',
						common_code_c_name: 'communityobjects',
						common_code_category: 'topic',
						common_code_create_date: '2022-03-24T08:29:50.091Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '여행 · 숙박 · 까페',
						common_code_spare: '',
						common_code_value: 'interests_trip',
					},
					{
						__v: 0,
						_id: '623c2c30a3f2e22cac0fb785',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:30:40.062Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '펫 숙소',
						common_code_spare: '',
						common_code_value: 'interests_trip',
					},
					{
						__v: 0,
						_id: '623c2c3aa3f2e22cac0fb787',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:30:50.446Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '관광지',
						common_code_spare: '',
						common_code_value: 'interests_trip',
					},
					{
						__v: 0,
						_id: '623c2c3fa3f2e22cac0fb789',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:30:55.364Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '놀이터',
						common_code_spare: '',
						common_code_value: 'interests_trip',
					},
					{
						__v: 0,
						_id: '623c2c46a3f2e22cac0fb78b',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:31:02.037Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '펫 까페',
						common_code_spare: '',
						common_code_value: 'interests_trip',
					},
					{
						__v: 0,
						_id: '623c2d66a3f2e22cac0fb78d',
						common_code_c_name: 'communityobjects',
						common_code_category: 'topic',
						common_code_create_date: '2022-03-24T08:35:50.735Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '병원 · 건강',
						common_code_spare: '',
						common_code_value: 'interests_hospital',
					},
					{
						__v: 0,
						_id: '623c2db1a3f2e22cac0fb78f',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:37:05.552Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '병원',
						common_code_spare: '',
						common_code_value: 'interests_hospital',
					},
					{
						__v: 0,
						_id: '623c2db5a3f2e22cac0fb791',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:37:09.835Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '사료',
						common_code_spare: '',
						common_code_value: 'interests_hospital',
					},
					{
						__v: 0,
						_id: '623c2dbaa3f2e22cac0fb793',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:37:14.307Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '간식',
						common_code_spare: '',
						common_code_value: 'interests_hospital',
					},
					{
						__v: 0,
						_id: '623c2dd8a3f2e22cac0fb795',
						common_code_c_name: 'communityobjects',
						common_code_category: 'topic',
						common_code_create_date: '2022-03-24T08:37:44.112Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '펫 인테리어 · 놀이',
						common_code_spare: '',
						common_code_value: 'interests_interior',
					},
					{
						__v: 0,
						_id: '623c2df0a3f2e22cac0fb797',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:38:08.992Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '집 · 방석',
						common_code_spare: '',
						common_code_value: 'interests_interior',
					},
					{
						__v: 0,
						_id: '623c2df6a3f2e22cac0fb799',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:38:14.560Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '가구',
						common_code_spare: '',
						common_code_value: 'interests_interior',
					},
					{
						__v: 0,
						_id: '623c2dffa3f2e22cac0fb79b',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:38:23.600Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '노즈워크/장난감',
						common_code_spare: '',
						common_code_value: 'interests_interior',
					},
					{
						__v: 0,
						_id: '623c2e0ea3f2e22cac0fb79d',
						common_code_c_name: 'communityobjects',
						common_code_category: 'topic',
						common_code_create_date: '2022-03-24T08:38:38.768Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '기타',
						common_code_spare: '',
						common_code_value: 'interests_etc',
					},
					{
						__v: 0,
						_id: '623c2e3aa3f2e22cac0fb79f',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:39:22.398Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '청결 용품',
						common_code_spare: '',
						common_code_value: 'interests_etc',
					},
					{
						__v: 0,
						_id: '623c2fe8a3f2e22cac0fb7a1',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:46:32.752Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '의류',
						common_code_spare: '',
						common_code_value: 'interests_etc',
					},
					{
						__v: 0,
						_id: '623c3051a3f2e22cac0fb7a5',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:48:17.566Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '기타',
						common_code_spare: '',
						common_code_value: 'interests_etc',
					},
					{
						__v: 0,
						_id: '623c305ba3f2e22cac0fb7a7',
						common_code_c_name: 'communityobjects',
						common_code_category: 'topic',
						common_code_create_date: '2022-03-24T08:48:27.096Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '후기',
						common_code_spare: '',
						common_code_value: 'interests_review',
					},
					{
						__v: 0,
						_id: '623c3068a3f2e22cac0fb7a9',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:48:40.146Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '치료 경험',
						common_code_spare: '',
						common_code_value: 'interests_review',
					},
					{
						__v: 0,
						_id: '623c306ca3f2e22cac0fb7ab',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:48:44.692Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '훈련 경험',
						common_code_spare: '',
						common_code_value: 'interests_review',
					},
					{
						__v: 0,
						_id: '623c3077a3f2e22cac0fb7ad',
						common_code_c_name: 'communityobjects',
						common_code_category: 'definition',
						common_code_create_date: '2022-03-24T08:48:55.442Z',
						common_code_f_name: 'community_interests',
						common_code_msg_kor: '다이어트 경험',
						common_code_spare: '',
						common_code_value: 'interests_review',
					},
				];
			},
			err => {
				console.log('common code err', err);
			},
		);
	}, []);

	const dum = {
		interests_trip: ['펫 숙소', '관광지', '놀이터', '펫카페'],
		interests_hospital: ['병원', '사료', '간식', '훈련', '건강 보조제', '치료', '다이어트', '노즈워크/장난감'],
		interests_interior: ['집 ㆍ 방석', '가구'],
		interests_review: ['청결용품', '의류', '기타'],
		interests_etc: ['치료 경혐', '훈련 경혐', '다이어트 경험'],
	};

	const getReviewCategory = () => {
		if (city == '' && props.category != 'ReviewWrite') {
			return <ActivityIndicator />;
		} else
			return (
				<ScrollView style={{flex: 1}}>
					<View style={[style.review_container]}>
						{props.category == 'ReviewWrite' ? (
							<></>
						) : (
							<View style={[style.review_location]}>
								<ArrowDownButton onPress={onOpenCity} btnStyle={'border'} btnLayout={btn_w242} btnTitle={selectedCity} />
								<ArrowDownButton onPress={onOpenDistrict} btnStyle={'border'} btnLayout={btn_w280} titleFontStyle={22} btnTitle={selectedDistrict} />
							</View>
						)}
						{/* 여행 ㆍ 숙박 ㆍ 카페 */}
						<View style={{marginBottom: 40 * DP, paddingHorizontal: 20 * DP}}>
							<Text style={[txt.noto24, {color: GRAY10, alignSelf: 'flex-start', paddingLeft: 20 * DP}]}>여행 ㆍ 숙박 ㆍ 카페 </Text>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_trip.map((v, i) => {
									if (i % 2 == 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_trip', v)}
											key={i}
											style={[userInterestReview.interests_trip.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_trip.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_trip.map((v, i) => {
									if (i % 2 != 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_trip', v)}
											key={i}
											style={[userInterestReview.interests_trip.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_trip.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
						</View>
						{/* 건강 ㆍ 놀이 ㆍ 음식 */}
						<View style={{marginBottom: 40 * DP, paddingHorizontal: 20 * DP}}>
							<Text style={[txt.noto24, {color: GRAY10, alignSelf: 'flex-start', paddingLeft: 20 * DP}]}>건강 ㆍ 놀이 ㆍ 음식 </Text>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_hospital.map((v, i) => {
									if (i % 2 == 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_hospital', v)}
											key={i}
											style={[userInterestReview.interests_hospital.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_hospital.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_hospital.map((v, i) => {
									if (i % 2 != 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_hospital', v)}
											key={i}
											style={[userInterestReview.interests_hospital.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_hospital.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
						</View>
						{/* 펫 인테리어  */}
						<View style={{marginBottom: 40 * DP, paddingHorizontal: 20 * DP}}>
							<Text style={[txt.noto24, {color: GRAY10, alignSelf: 'flex-start', paddingLeft: 20 * DP}]}>펫 인테리어 </Text>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_interior.map((v, i) => {
									if (i % 2 == 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_interior', v)}
											key={i}
											style={[userInterestReview.interests_interior.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_interior.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_interior.map((v, i) => {
									if (i % 2 != 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_interior', v)}
											key={i}
											style={[userInterestReview.interests_interior.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_interior.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
						</View>
						{/* 후기 */}
						<View style={{marginBottom: 40 * DP, paddingHorizontal: 20 * DP}}>
							<Text style={[txt.noto24, {color: GRAY10, alignSelf: 'flex-start', paddingLeft: 20 * DP}]}>펫 인테리어 </Text>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_review.map((v, i) => {
									if (i % 2 == 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_review', v)}
											key={i}
											style={[userInterestReview.interests_review.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_review.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_review.map((v, i) => {
									if (i % 2 != 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_review', v)}
											key={i}
											style={[userInterestReview.interests_review.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_review.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
						</View>
						{/* 기타 */}
						<View style={{marginBottom: 40 * DP, paddingHorizontal: 20 * DP}}>
							<Text style={[txt.noto24, {color: GRAY10, alignSelf: 'flex-start', paddingLeft: 20 * DP}]}>기타 </Text>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_etc.map((v, i) => {
									if (i % 2 == 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_etc', v)}
											key={i}
											style={[userInterestReview.interests_etc.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_etc.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								{dum.interests_etc.map((v, i) => {
									if (i % 2 != 0) {
										return null;
									}
									return (
										<TouchableOpacity
											onPress={() => onPressInterestReviewTag('interests_etc', v)}
											key={i}
											style={[userInterestReview.interests_etc.includes(v) ? style.contentText_userInterest : style.contentText]}>
											<Text style={[txt.noto28, {color: userInterestReview.interests_etc.includes(v) ? WHITE : GRAY10, textAlign: 'center'}]}>
												{v}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
						</View>
					</View>
				</ScrollView>
			);
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
			<View
				// activeOpacity={0.9}
				// onPress={() => {
				// 	setSelectCityOpen(false);
				// 	setSelectDistrictOpen(false);
				// }}
				style={[style.popUpWindow]}>
				<View style={[style.header]}>
					<TouchableOpacity onPress={onClose} style={[style.crossMark]}>
						<Cross24_Filled />
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressSave} style={[style.saveText]}>
						<Text style={[txt.noto36b, {color: APRI10}]}>저장</Text>
					</TouchableOpacity>
				</View>
				{getList()}
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
			<Animated.View
				style={[
					style.downScrollSelectContainer,
					{
						height: cityInterpolatedHeight,
					},
				]}>
				<View style={[style.modal_header]}>
					<Text onPress={() => setSelectCityOpen(false)} style={[txt.noto30, {color: WHITE, paddingVertical: 22 * DP}]}>
						취소
					</Text>
					<TouchableOpacity onPress={onSelect}>
						<Text style={[txt.noto30, {color: WHITE}]}>완료</Text>
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
									style={[style.listItem, index == selectedItem && item != '' ? {backgroundColor: APRI10} : null]}>
									<>
										<Text style={[txt.roboto34, {color: index == selectedItem && item != '' ? WHITE : GRAY10}]}>{item}</Text>
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
					<Text onPress={() => setSelectDistrictOpen(false)} style={[txt.noto30, {color: WHITE, paddingVertical: 22 * DP}]}>
						취소
					</Text>
					<TouchableOpacity onPress={onSelect_dis}>
						<Text style={[txt.noto30, {color: WHITE}]}>완료</Text>
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
									style={[style.listItem, index == selectedItem_dis && item != '' ? {backgroundColor: APRI10} : null]}>
									<>
										<Text style={[txt.roboto34, {color: index == selectedItem_dis && item != '' ? WHITE : GRAY10}]}>{item}</Text>
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

InterestTagModal.defaultProps = {
	onSave: () => {},
	onClose: () => {},
	isActivation: true,
};
const dummyReviewCategoryList = [
	{
		category_title: '여행ㆍ숙박ㆍ카페',
		content: ['펫 숙소', '관광지', '놀이터', '펫카페'],
	},
	{
		category_title: '병원ㆍ건강',
		content: ['병원', '사료', '간식'],
	},
	{
		category_title: '펫 인테리어 ㆍ 놀이',
		content: ['집 ㆍ 방석', '가구', '노즈워크/장난감'],
	},
	{
		category_title: '기타',
		content: ['청결용품', '의류', '기타'],
	},
	{
		category_title: '후기',
		content: ['치료 경혐', '훈련 경혐', '다이어트 경험'],
	},
];

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
