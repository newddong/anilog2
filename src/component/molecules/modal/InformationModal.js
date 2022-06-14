import React from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, FlatList, Linking} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY20, APRI20, GRAY30, BLACK, BLUE20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY20, Cross24, Cross24_Filled, Cross24_White, Female48, Male48} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import {btn_w130, btn_w136, btn_w226} from 'Atom/btn/btn_style';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';

/**
 * 유저 오브젝트 상세정보 출력 모달
 *
 * @param {Object} props - props object
 * @param {Object} props.data - 유저 오브젝트 데이터
 * @param {()=>void} props.onClose - X 마크 클릭 콜백 함수
 * @param {()=>void} props.onPressEdit - X 마크 클릭 콜백 함수
 *
 */
const InformationModal = props => {
	const data = props.data;

	const userInfo = userGlobalObject.userInfo;
	const isOwner = () => {
		let result = false;
		if (data.user_type == 'pet') {
			//반려동물 프로필의 주인인지 여부 판별
			const pet_family = data.pet_family;
			let family_id_list = [];
			pet_family.map((v, i) => {
				family_id_list.push(v._id);
			});
			const isPetOwner = family_id_list.includes(userInfo._id);
			return isPetOwner;
		} else if (data.user_type == 'shelter') {
			//보호소 프로필의 주인인지 여부 판별
			return data._id == userInfo._id;
		} else {
			result = data._id == userInfo._id;
			return result;
		}
	};
	const [numberOfLines, setNumberOfLines] = React.useState(0);
	const [showMore, setShowMore] = React.useState(false);

	const getBirthDate = () => {
		const dateFormat = moment(data.pet_birthday).format('yyyy.MM.DD');
		if (dateFormat == 'Invalid date') {
			return '미지정 상태입니다.';
		} else return dateFormat;
	};

	const getNeutralization = () => {
		if (data.pet_neutralization == 'unknown') {
			return '모름';
		} else if (data.pet_neutralization == 'no') {
			return 'X';
		} else if (data.pet_neutralization == 'yes') {
			return 'O';
		}
	};

	const onPressEdit = () => {
		props.onPressEdit(data.user_type);
	};

	const getContents = () => {
		if (data.user_type == 'pet') {
			let user_interest_list = [];
			user_interest_list = user_interest_list.concat(data.pet_family[0].user_interests.interests_activity);
			user_interest_list = user_interest_list.concat(data.pet_family[0].user_interests.interests_beauty);
			user_interest_list = user_interest_list.concat(data.pet_family[0].user_interests.interests_food);
			user_interest_list = user_interest_list.concat(data.pet_family[0].user_interests.interests_health);
			user_interest_list = user_interest_list.filter(e => e != undefined);
			user_interest_list = new Set(user_interest_list);
			user_interest_list = [...user_interest_list];
			// console.log('user_interest_list', user_interest_list);
			return (
				<>
					{/* 중성화 */}
					{/* <View style={[style.category]}>
							<View style={[style.category_title]}>
								<Text style={[txt.noto24]}>중성화</Text>
							</View>
							<View style={[style.category_content]}>
								<Text style={[txt.noto30, {color: GRAY10}]}>{getNeutralization()}</Text>
							</View>
						</View> */}
					{/* </View> */}
					<View style={[style.info_step2]}>
						{/* 관심사 */}
						<View style={[style.category_step2]}>
							<View style={{width: 604 * DP, height: 54 * DP, alignItems: 'center'}}>
								<Text style={[txt.noto36b]}>
									{data.pet_species} / {data.pet_species_detail}
								</Text>
							</View>
							<View style={[style.category]}>
								<View style={[style.category_title, {marginTop: 50 * DP}]}>
									<Text style={[txt.noto26]}>성별</Text>
								</View>
								<View style={[style.category_content]}>{data.pet_sex == 'male' ? <Male48 /> : <Female48 />}</View>
							</View>
							<View style={[style.category, {marginTop: 50 * DP}]}>
								<View style={[style.category_title]}>
									<Text style={[txt.noto26]}>생일</Text>
								</View>
								<View style={[style.category_content]}>
									<Text style={[txt.roboto28, {}]}>{getBirthDate()}</Text>
								</View>
							</View>
							{/* <View style={[style.category_title]}>
								<Text style={[txt.noto24]}>관심사</Text>
							</View> */}
							{/* <View style={[style.category_step2_content]}>
								<Text
									style={[txt.noto30, {color: GRAY10, position: 'absolute', opacity: 0}]}
									onTextLayout={({nativeEvent: {lines}}) => {
										setNumberOfLines(lines.length);
									}}>
									{user_interest_list.map((v, i) => {
										return v + (i != user_interest_list.length - 1 ? ', ' : '');
									})}
								</Text>
								<View style={{flexDirection: 'row', width: 502 * DP, marginBottom: 20 * DP}}>
									<Text style={[txt.noto30, {color: GRAY10}]} numberOfLines={showMore ? numberOfLines : 2}>
										{user_interest_list.map((v, i) => {
											return v + (i != user_interest_list.length - 1 ? ', ' : '');
										})}
									</Text>
								</View>
								{numberOfLines > 2 ? (
									showMore ? (
										<TouchableOpacity onPress={() => setShowMore(!showMore)}>
											<View style={{flexDirection: 'row'}}>
												<Text style={[txt.noto24, {color: GRAY10}]}>접기</Text>
												<Arrow_Up_GRAY20 />
											</View>
										</TouchableOpacity>
									) : (
										<TouchableOpacity onPress={() => setShowMore(!showMore)}>
											<View style={{flexDirection: 'row'}}>
												<Text style={[txt.noto24, {color: GRAY10}]}>펼치기</Text>
												<Arrow_Down_GRAY10 />
											</View>
										</TouchableOpacity>
									)
								) : (
									<></>
								)}
							</View> */}
						</View>
					</View>
					{isOwner() ? (
						<View>
							<AniButton onPress={onPressEdit} btnLayout={btn_w136} btnStyle={'border'} btnTitle={'수정'} />
						</View>
					) : (
						<></>
					)}
				</>
			);
		} else if (data.user_type == 'shelter') {
			//보호소 계정의 정보
			console.log('data', data);
			const tttr = {
				__v: 0,
				_id: '628cccea3927793fb05acbae',
				feedList: [],
				is_favorite: false,
				is_follow: false,
				pet_family: [],
				shelter_address: {
					brief: '경상 창원시 의창구 창이대로 71 (명서동, 창원시농업기술센터) 축산과',
					city: '경상남도',
					detail: '창원유기동물보호소',
				},
				shelter_delegate_contact_number: '0552255701',
				shelter_foundation_date: null,
				shelter_homepage: '',
				shelter_name: '창원유기동물보호소',
				shelter_type: 'public',
				type: 'UserObject',
				user_agreement: {
					is_donation_info: false,
					is_location_service_info: false,
					is_marketting_info: false,
					is_over_fourteen: false,
					is_personal_info: false,
					is_service: false,
				},
				user_alarm: false,
				user_contacted: false,
				user_denied: false,
				user_email: '',
				user_favorite_count: 0,
				user_follow_count: 0,
				user_follower_count: 0,
				user_interests: {interests_activity: [], interests_beauty: [], interests_food: [], interests_health: [], interests_location: []},
				user_introduction: '창원유기동물보호소	0552255701',
				user_is_public_data: true,
				user_is_verified_email: false,
				user_is_verified_phone_number: false,
				user_my_pets: [],
				user_name: '창원유기동물보호소',
				user_nickname: '창원유기동물보호소',
				user_phone_number: '0552255701',
				user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1652351934385_6346cd21-25e7-4fa3-be06-ec7ddd85c880.jpg',
				user_register_date: '2022-05-24T12:17:46.708Z',
				user_type: 'shelter',
				user_update_date: '2022-05-24T12:17:46.708Z',
				user_upload_count: 0,
			};
			console.log('data.shelter_foundation_date', data.shelter_foundation_date);
			return (
				<View style={[{marginTop: 48 * DP}]}>
					<View style={[style.category, {marginTop: 60 * DP, marginBottom: 0 * DP}]}>
						<Text style={[txt.noto32b]}>{data.user_nickname}</Text>
					</View>
					{/* 주소 */}
					<View style={[style.shelter_address]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto26, {color: GRAY10}]}>주소</Text>
						</View>
						<Text numberOfLines={2} style={[txt.noto28, {textAlign: 'center'}]}>
							{data.shelter_address.brief}
						</Text>
					</View>
					{/* 전화번호 */}
					<View style={[style.category]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto26, {color: GRAY10}]}>전화번호</Text>
						</View>
						<Text
							onPress={() => Linking.openURL(`tel:${data.shelter_delegate_contact_number}`)}
							style={[txt.roboto28, {textDecorationLine: 'underline', color: BLUE20, marginTop: 12 * DP}]}>
							{data.shelter_delegate_contact_number || ''}
						</Text>
					</View>
					{/* Email */}
					<View style={[style.category]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto26, {color: GRAY10}]}>Email</Text>
						</View>
						<Text style={[txt.roboto28, {marginTop: 12 * DP}]}>{data.user_email || '등록된 이메일이 없습니다.'}</Text>
					</View>
					{/* 설립일 */}
					<View style={[style.category]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto26, {color: GRAY10}]}>설립일</Text>
						</View>
						<Text style={[txt.roboto28, {marginTop: 12 * DP}]}>
							{data.shelter_foundation_date ? moment(data.shelter_foundation_date).format('YYYY/MM/DD') : '미등록 상태입니다.'}{' '}
						</Text>
					</View>
					{data._id == userInfo._id ? (
						<View style={{alignSelf: 'center', marginVertical: 30 * DP}}>
							<AniButton onPress={onPressEdit} btnLayout={btn_w226} btnStyle={'border'} btnTitle={'수정'} />
						</View>
					) : (
						<></>
					)}
				</View>
			);
		} else {
			//유저 프로필 정보
			let user_interest_list = [];
			user_interest_list = user_interest_list.concat(data.user_interests.interests_activity);
			user_interest_list = user_interest_list.concat(data.user_interests.interests_beauty);
			user_interest_list = user_interest_list.concat(data.user_interests.interests_food);
			user_interest_list = user_interest_list.concat(data.user_interests.interests_health);
			user_interest_list = user_interest_list.filter(e => e != undefined);
			user_interest_list = new Set(user_interest_list);
			user_interest_list = [...user_interest_list];
			return (
				<>
					<View style={[style.info_step2]}>
						{/* <View style={[{marginBottom: 40 * DP, alignSelf: 'center'}]}>
							<Text style={[txt.noto32b]}>
								{data.user_nickname || ''}
								<Text style={[txt.noto28, {color: BLACK}]}> 님의 정보</Text>
							</Text>
						</View> */}
						{/* 관심사 */}
						<View style={[style.category_step2]}>
							<View style={[style.category_title]}>
								<Text style={[txt.noto24]}>관심사</Text>
							</View>
							<View style={[style.category_step2_content]}>
								{/* 더미 텍스트컴포넌트 - 조정되기 이전의 numberOfLine 판별용 */}
								<Text
									style={[txt.noto30, {color: GRAY10, position: 'absolute', opacity: 0}]}
									onTextLayout={({nativeEvent: {lines}}) => {
										setNumberOfLines(lines.length);
									}}>
									{user_interest_list.map((v, i) => {
										return v + (i != user_interest_list.length - 1 ? ', ' : '');
									})}
								</Text>
								{/* 더미 텍스트 컴포넌트 종료 */}
								<View style={{flexDirection: 'row', width: 502 * DP, marginBottom: 20 * DP}}>
									<Text style={[txt.noto30, {color: GRAY10}]} numberOfLines={showMore ? numberOfLines : 2}>
										{user_interest_list.map((v, i) => {
											return v + (i != user_interest_list.length - 1 ? ', ' : '');
										})}
									</Text>
								</View>
								{numberOfLines > 2 ? (
									//관심사 항목이 2줄을 넘은 경우 '펼치기 / 접기' 를 출력
									showMore ? (
										<TouchableOpacity onPress={() => setShowMore(!showMore)}>
											<View style={{flexDirection: 'row'}}>
												<Text style={[txt.noto24, {color: GRAY10}]}>접기</Text>
												<Arrow_Up_GRAY20 />
											</View>
										</TouchableOpacity>
									) : (
										<TouchableOpacity onPress={() => setShowMore(!showMore)}>
											<View style={{flexDirection: 'row'}}>
												<Text style={[txt.noto24, {color: GRAY10}]}>펼치기</Text>
												<Arrow_Down_GRAY10 />
											</View>
										</TouchableOpacity>
									)
								) : (
									<></>
								)}
							</View>
						</View>
					</View>
					{data._id == userInfo._id ? (
						<View>
							<AniButton onPress={onPressEdit} btnLayout={btn_w136} btnStyle={'border'} btnTitle={'수정'} />
						</View>
					) : (
						<></>
					)}
				</>
			);
		}
	};

	return (
		<TouchableOpacity activeOpacity={0.9} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={0.9} style={[style.popUpWindow]}>
				<View style={[style.header]}>
					<Text style={[txt.noto26, {width: 610 * DP, textAlignVertical: 'center'}]}>
						{data.user_type == 'shelter' ? '보호소 정보' : data.user_nickname}{' '}
					</Text>
					<Cross24_Filled onPress={() => props.onClose()} />
				</View>
				{getContents()}
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

InformationModal.defaultProps = {
	onClose: () => {},
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
		padding: 40 * DP,
		// paddingTop: 22 * DP,
		// paddingHorizontal: 40 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: WHITE,
		opacity: 0.9,
		borderRadius: 30 * DP,
	},
	header: {
		width: 694 * DP,
		height: 88 * DP,
		position: 'absolute',
		flexDirection: 'row',
		top: 0,
		borderTopLeftRadius: 30 * DP,
		borderTopRightRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: GRAY30,
	},
	petInfoContainer: {
		width: 694 * DP,
		height: 360 * DP,
		marginTop: 46 * DP,
		borderBottomColor: GRAY20,
		borderBottomWidth: 2 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	category: {
		width: 606 * DP,
		height: 86 * DP,
		marginVertical: 30 * DP,
		alignItems: 'center',
	},
	category_step2: {
		width: 606 * DP,
		marginTop: 60 * DP,
		// height: 126 * DP,
		alignItems: 'center',
	},
	category_title: {
		alignItems: 'center',
	},
	category_content: {
		width: 254 * DP,
		height: 48 * DP,
		marginTop: 10 * DP,
		alignItems: 'center',
	},
	category_step2_content: {
		width: 502 * DP,
		// height: 48 * DP,
		alignItems: 'center',
	},
	info_step2: {
		width: 606 * DP,
		minHeight: 120 * DP,
		marginTop: 48 * DP,
	},
	shelter_name: {
		marginBottom: 18 * DP,
	},
	shelter_address: {
		width: 606 * DP,
		marginTop: 20 * DP,
		alignItems: 'center',
		marginBottom: 18 * DP,
	},
});

export default InformationModal;
