import React from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, FlatList, Linking} from 'react-native';
import {WHITE, GRAY10, APRI10, GRAY20, APRI20, GRAY30, BLACK, BLUE20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY20, Cross24, Cross24_Filled, Cross24_White, Female48, Male48} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import {btn_w130, btn_w136} from 'Atom/btn/btn_style';
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
	const dummyInteres = [];
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
			// console.log('data', data);
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
					<View style={[style.info_step1]}>
						{/* 성별 */}
						<View style={[style.category]}>
							<View style={[style.category_title]}>
								<Text style={[txt.noto24]}>성별</Text>
							</View>
							<View style={[style.category_content]}>{data.pet_sex == 'male' ? <Male48 /> : <Female48 />}</View>
						</View>
						{/* 생일 */}
						<View style={[style.category]}>
							<View style={[style.category_title]}>
								<Text style={[txt.noto24]}>생일</Text>
							</View>
							<View style={[style.category_content]}>
								<Text style={[txt.roboto30, {color: GRAY10}]}>{getBirthDate()}</Text>
							</View>
						</View>
						{/* 중성화 */}
						<View style={[style.category]}>
							<View style={[style.category_title]}>
								<Text style={[txt.noto24]}>중성화</Text>
							</View>
							<View style={[style.category_content]}>
								<Text style={[txt.noto30, {color: GRAY10}]}>{getNeutralization()}</Text>
							</View>
						</View>
					</View>
					<View style={[style.info_step2]}>
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
			return (
				<>
					<View style={[style.shelter_name]}>
						<Text style={[txt.noto32b]}>{data.user_nickname}</Text>
					</View>
					{/* 주소 */}
					<View style={[style.shelter_address]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto24]}>주소</Text>
						</View>
						<Text numberOfLines={2} style={[txt.noto30, {color: GRAY10, textAlign: 'center'}]}>
							{data.shelter_address.brief}
						</Text>
					</View>
					{/* 전화번호 */}
					<View style={[style.category]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto24]}>전화번호</Text>
						</View>
						<Text
							onPress={() => Linking.openURL(`tel:${data.shelter_delegate_contact_number}`)}
							style={[txt.roboto30, {textDecorationLine: 'underline', color: BLUE20}]}>
							{data.shelter_delegate_contact_number || ''}
						</Text>
					</View>
					{/* 이메일 */}
					<View style={[style.category]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto24]}>E-mail</Text>
						</View>
						<Text onPress={() => alert('이메일 선택')} style={[txt.roboto30, {textDecorationLine: 'underline', color: BLUE20}]}>
							{data.user_email || ''}
						</Text>
					</View>
					{/* 홈페이지 */}
					<View style={[style.category]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto24]}>홈페이지</Text>
						</View>
						<Text onPress={() => alert('홈페이지 선택')} style={[txt.roboto30, {textDecorationLine: 'underline', color: BLUE20}]}>
							{data.shelter_homepage || ''}
						</Text>
					</View>
					{/* 설립일 */}
					<View style={[style.category]}>
						<View style={[style.category_title]}>
							<Text style={[txt.noto24]}>설립일</Text>
						</View>
						<Text style={[txt.noto30, {color: GRAY10}]}>{moment(data.shelter_foundation_date).format('yyyy년 MM월 DD일')}</Text>
					</View>
					{isOwner() ? (
						<View>
							<AniButton btnLayout={btn_w136} btnStyle={'border'} btnTitle={'수정'} onPress={onPressEdit} />
						</View>
					) : (
						<></>
					)}
				</>
			);
		} else {
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
						<View style={[{marginBottom: 20 * DP, alignSelf: 'center'}]}>
							<Text style={[txt.noto32b]}>
								{data.user_nickname || ''}
								<Text style={[txt.noto28, {color: BLACK}]}> 님의 정보</Text>
							</Text>
						</View>
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
		width: 582 * DP,
		padding: 40 * DP,
		paddingTop: 22 * DP,
		// paddingHorizontal: 40 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: WHITE,
		opacity: 0.9,
		borderRadius: 50 * DP,
	},
	header: {
		width: 502 * DP,
		marginBottom: 20 * DP,
		alignItems: 'flex-end',
	},
	info_step1: {
		width: 502 * DP,
		height: 360 * DP,
		borderBottomColor: GRAY20,
		borderBottomWidth: 2 * DP,
		alignItems: 'center',
	},
	category: {
		width: 502 * DP,
		height: 86 * DP,
		marginBottom: 30 * DP,
		alignItems: 'center',
	},
	category_step2: {
		width: 502 * DP,
		// height: 126 * DP,
		alignItems: 'center',
	},
	category_title: {
		width: 254 * DP,
		height: 38 * DP,
		alignItems: 'center',
	},
	category_content: {
		width: 254 * DP,
		height: 48 * DP,
		alignItems: 'center',
	},
	category_step2_content: {
		width: 502 * DP,
		// height: 48 * DP,
		alignItems: 'center',
	},
	info_step2: {
		width: 502 * DP,
		minHeight: 120 * DP,
		marginTop: 40 * DP,
		marginBottom: 40 * DP,
	},
	shelter_name: {
		marginBottom: 18 * DP,
	},
	shelter_address: {
		width: 502 * DP,
		alignItems: 'center',
		marginBottom: 18 * DP,
	},
});

export default InformationModal;
