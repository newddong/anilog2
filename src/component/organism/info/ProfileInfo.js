import React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w280} from 'Atom/btn/btn_style';
import {Bracket48} from 'Atom/icon';
import ActionButton from 'Molecules/button/ActionButton';
import AniButton from 'Molecules/button/AniButton';
import ProfileImageLarge160 from 'Molecules/image/ProfileImageLarge160';
import SocialInfoA from 'Organism/info/SocialInfoA';
import {NORMAL, PET, SHELTER} from 'Root/i18n/msg';
import ProfileDropdown from 'Molecules/dropdown/ProfileDropdown';
import {organism_style, profileInfo_style} from 'Organism/style_organism';
import Modal from 'Root/component/modal/Modal';
import {followUser, unFollowUser} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';

/**
 *
 *@param {{
 * data: 'profile userObject',
 * onPressVolunteer: void,
 * onShowOwnerBtnClick : void,
 * onHideOwnerBtnClick : void,
 * onShowCompanion : void,
 * onHideCompanion :void,
 * adoptionBtnClick: void
 * }} props
 */
export default ProfileInfo = props => {
	const [data, setData] = React.useState(props.data);

	const [showMore, setShowMore] = React.useState(false); // 프로필 Description 우측 더보기 클릭 State
	const [ownerListState, setOwnerListState] = React.useState(false); // userType이 Pet일 경우 반려인계정 출력 여부 T/F
	const [companionListState, setCompanionListState] = React.useState(false); // userType이 User일 경우 반렫동물 리스트 출력 여부 T/F
	const [into_height, setIntro_height] = React.useState(0); //user_introduction 의 길이 => 길이에 따른 '더보기' 버튼 출력 여부 결정

	//더보기 클릭
	const onPressShowMore = () => {
		setShowMore(!showMore);
	};

	//반려인 계정 보이기
	const showOwner = () => {
		setOwnerListState(true);
		props.onShowOwnerBtnClick();
	};
	//반려인 계정 숨기기
	const hideOwner = () => {
		setOwnerListState(false);
		props.onHideOwnerBtnClick();
	};

	//보호소 계정의 봉사활동 버튼 클릭
	const onPressVolunteer = () => {
		props.onPressVolunteer();
	};

	// 펫 계정 => 입양하기 버튼 클릭
	const onPressAdoption = () => {
		props.adoptionBtnClick();
	};

	//유저 계정 => 반려동물 액션버튼 오픈
	const showCompanion = () => {
		setCompanionListState(true);
		props.onShowCompanion();
	};

	//유저 계정 => 반려동물 액션버튼 클로즈
	const hideCompanion = () => {
		setCompanionListState(false);
		props.onHideCompanion();
	};
	const onLayout = e => {
		setIntro_height(e.nativeEvent.layout.height);
	};

	// props.data의 유저타입에 따라 다른 버튼이 출력
	// NORMAL - [팔로우, 반려동물] / PET - [팔로우, 반려인계정 OR 입양하기] / SHELTER - [팔로우, 봉사활동 ]
	const getButton = () => {
		if (data.user_type == PET) {
			if (data.pet_status == 'protected') {
				return <AniButton btnTitle={'입양 하기'} btnStyle={'border'} titleFontStyle={30} btnLayout={btn_w280} onPress={onPressAdoption} />;
			} else
				return (
					<ActionButton
						btnTitle={'반려인 계정'}
						btnStyle={ownerListState ? 'filled' : 'border'}
						titleFontStyle={24}
						btnLayout={btn_w280}
						onOpen={showOwner}
						onClose={hideOwner}
					/>
				);
		} else if (data.user_type == NORMAL) {
			return (
				<ActionButton
					btnTitle={'반려동물'}
					btnStyle={companionListState ? 'filled' : 'border'}
					titleFontStyle={24}
					btnLayout={btn_w280}
					onOpen={showCompanion}
					onClose={hideCompanion}
				/>
			);
		}
		return <AniButton btnTitle={'봉사 활동'} btnStyle={'border'} titleFontStyle={24} btnLayout={btn_w280} onPress={onPressVolunteer} />;
	};

	React.useEffect(() => {
		setData(props.data); //부모에서 props가 비동기로 바뀌었을때 반영하기위함
	}, [props.data]);

	//현재 프로필의 유저를 팔로우한다.
	const follow = () => {
		followUser(
			{follow_userobject_id: data._id},
			result => {
				setData({...data, is_follow: !result.msg.follow_is_delete, user_follower_count: data.user_follower_count + 1});
			},
			error => Modal.alert(error),
		);
	};

	const socialAction = (v, i) => {
		console.log('socialAction', v, i);
		switch (i) {
			case 3:
				unFollowUser(
					{follow_userobject_id: data._id},
					result => {
						setData({...data, is_follow: !result.msg.follow_is_delete, user_follower_count: data.user_follower_count - 1});
					},
					error => Modal.alert(error),
				);
				break;

			default:
				break;
		}
	};

	return (
		<View style={organism_style.profileInfo_main}>
			{/* 프로필 INFO */}
			<View style={[organism_style.profileImageLarge_view_profileInfo]}>
				<View style={[organism_style.profileImageLarge_profileInfo, profileInfo_style.profileImageLarge]}>
					<ProfileImageLarge160 data={props.data} />
				</View>
				<View style={[organism_style.socialInfo_profileInfo, profileInfo_style.socialInfo]}>
					<SocialInfoA data={data} />
				</View>
			</View>

			{/* user_introduction 높이정보를 얻기 위한 더미 ScrollView / 투명도 설정으로 화면에는 출력이 되지 않음 */}
			<ScrollView onLayout={onLayout} style={{position: 'absolute', opacity: 0}}>
				<Text ellipsizeMode={'tail'} numberOfLines={showMore ? null : 2} style={[txt.noto24, profileInfo_style.content_expanded]}>
					{data.user_introduction}
				</Text>
			</ScrollView>

			<View style={[organism_style.content_view_profileInfo, profileInfo_style.content_view]}>
				<Text
					ellipsizeMode={'tail'}
					numberOfLines={showMore ? null : 2}
					style={[txt.noto24, showMore ? profileInfo_style.content_expanded : profileInfo_style.content]}>
					{data.user_introduction != '' ? data.user_introduction : '유저 인트로 소개글입니다. 현재는 비어있습니다.'}
				</Text>
				{into_height > 50 * DP ? (
					<TouchableOpacity onPress={onPressShowMore} style={[organism_style.addMore_profileInfo, profileInfo_style.addMore]}>
						<View style={{flexDirection: 'row'}}>
							<Text style={[txt.noto24, {color: GRAY10, top: 2}]}>더보기 </Text>
							<View style={[showMore ? {transform: [{rotate: '180deg'}]} : null]}>
								<Bracket48 />
							</View>
						</View>
					</TouchableOpacity>
				) : (
					<></>
				)}
			</View>

			{/* 프로필 관련 버튼 */}
			<View style={[organism_style.btn_w280_view_profileInfo, profileInfo_style.btn_w280_view]}>
				<View style={[organism_style.btn_w280_profileInfo, profileInfo_style.btn_w280]}>
					{userGlobalObject.userInfo._id == data._id ? (
						<AniButton btnTitle={'내 계정'} btnStyle={'filled'} titleFontStyle={24} btnLayout={btn_w280} />
					) : data.is_follow ? (
						<ProfileDropdown
							btnTitle={'팔로우 중'}
							titleFontStyle={24}
							btnStyle={'filled'}
							btnLayout={btn_w280}
							menu={['즐겨찾기', '소식받기', '차단', '팔로우 취소']}
							// menu={['팔로우 취소']}
							onSelect={socialAction}
							// onOpen={()=>{alert('open')}}
							// onClose={()=>{alert('close')}}
						/>
					) : (
						<AniButton btnTitle={'팔로우'} btnStyle={'border'} titleFontStyle={24} btnLayout={btn_w280} onPress={follow} />
					)}
				</View>
				<View style={[organism_style.ActionButton_profileInfo, profileInfo_style.btn_w280]}>{getButton()}</View>
			</View>
		</View>
	);
};
ProfileInfo.defaultProps = {
	volunteerBtnClick: e => {},
	adoptionBtnClick: e => {},
	onShowOwnerBtnClick: e => {},
	onHideOwnerBtnClick: e => {},
	onShowCompanion: e => {},
	onHideCompanion: e => {},
};
