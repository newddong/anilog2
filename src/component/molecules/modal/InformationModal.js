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
	console.log('datatata', data);
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
			console.log('user_interest_list', user_interest_list);
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
								<View style={[style.category_title, {marginTop: 30 * DP}]}>
									<Text style={[txt.noto26, {color: GRAY10}]}>성별</Text>
								</View>
								<View style={[style.category_content]}>{data.pet_sex == 'male' ? <Male48 /> : <Female48 />}</View>
							</View>
							<View style={[style.category, {marginTop: 50 * DP}]}>
								<View style={[style.category_title]}>
									<Text style={[txt.noto26, {color: GRAY10}]}>생일</Text>
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
			try {
				if (data.user_interests) {
					let user_interest_list = [];

					if (
						(data.user_interests.hasOwnProperty('interests_group1') || data.user_interests.hasOwnProperty('interests_group2'),
						data.user_interests.hasOwnProperty('interests_group3'))
					) {
						user_interest_list = user_interest_list.concat(data.user_interests.interests_group1);
						user_interest_list = user_interest_list.concat(data.user_interests.interests_group2);
						user_interest_list = user_interest_list.concat(data.user_interests.interests_group3);
						user_interest_list = user_interest_list.concat(data.user_interests.interests_etc);
					} else {
						user_interest_list = user_interest_list.concat(data.user_interests.interests_activity);
						user_interest_list = user_interest_list.concat(data.user_interests.interests_beauty);
						user_interest_list = user_interest_list.concat(data.user_interests.interests_food);
						user_interest_list = user_interest_list.concat(data.user_interests.interests_health);
					}

					user_interest_list = user_interest_list.filter(e => e != undefined);
					user_interest_list = new Set(user_interest_list);
					user_interest_list = [...user_interest_list];
					console.log('user', user_interest_list);
					user_interest_list = [];
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
								<View style={[style.category_step2, {paddingBottom: 20 * DP}]}>
									<View style={[style.category_title]}>
										<Text style={[txt.noto26, {color: GRAY10}]}>관심사</Text>
									</View>
									<View style={[style.category_step2_content]}>
										{/* 더미 텍스트컴포넌트 - 조정되기 이전의 numberOfLine 판별용 */}
										<Text
											style={[txt.noto28, {position: 'absolute', opacity: 0}]}
											onTextLayout={({nativeEvent: {lines}}) => {
												setNumberOfLines(lines.length);
											}}>
											{user_interest_list.map((v, i) => {
												return v + (i != user_interest_list.length - 1 ? ', ' : '');
											})}
										</Text>
										{/* 더미 텍스트 컴포넌트 종료 */}
										<View style={{flexDirection: 'row', width: 620 * DP, marginBottom: 20 * DP, marginTop: 10 * DP, justifyContent: 'center'}}>
											{user_interest_list && user_interest_list.length == 0 ? (
												<Text
													style={[
														txt.noto28,
														{
															// width: 620 * DP,
															marginTop: 10 * DP,
															textAlign: 'center',
														},
													]}>
													아직 {data.user_nickname}님의 관심사 설정이 되지 않았습니다.
												</Text>
											) : (
												<Text style={[txt.noto28]} numberOfLines={showMore ? numberOfLines : null}>
													{user_interest_list.map((v, i) => {
														return v + (i != user_interest_list.length - 1 ? ', ' : '');
													})}
												</Text>
											)}
										</View>
										{/* {numberOfLines > 2 ? (
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
										)} */}
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
			} catch (err) {
				console.log('err InformationModal', err);
				return <></>;
			}
		}
	};

	return (
		<TouchableOpacity activeOpacity={0.9} onPress={() => Modal.close()} style={style.background}>
			<TouchableOpacity activeOpacity={0.9} style={[style.popUpWindow]}>
				<View style={[style.header]}>
					<Text style={[txt.noto26, {textAlignVertical: 'center'}]}>{data.user_type == 'shelter' ? '보호소 정보' : data.user_nickname} </Text>
					<TouchableOpacity onPress={() => props.onClose()} style={{padding: 30 * DP, position: 'absolute', right: 12 * DP}}>
						<Cross24_Filled />
					</TouchableOpacity>
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
		paddingHorizontal: 42 * DP,
		position: 'absolute',
		flexDirection: 'row',
		top: 0,
		borderTopLeftRadius: 30 * DP,
		borderTopRightRadius: 30 * DP,
		alignItems: 'center',
		// justifyContent: 'center',
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
