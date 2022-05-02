import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {APRI10, BLACK, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {styles} from 'Atom/image/imageStyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import {Private48, Public48, Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, ProfileDefaultImg} from 'Atom/icon';

/**
 * 유저의 프로필 사진, 닉네임, 소개글, 팔로우 상태를 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.data - UserObejct
 * @param {number} props.width - user_introduction 너비
 * @param {(data:object)=>void} props.onClickLabel - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 * @param {boolean} props.showFollowStatusText - 닉네임 우측 팔로우 중 텍스트 출력 여부
 */
const UserDescriptionLabel = props => {
	const data = props.data;
	// console.log('data / USerDescription Label : ', props.data.user_nickname, props.data.pet_status);

	const onClickLabel = () => {
		props.onClickLabel(props.data);
	};

	//  팻의 상태 여부에 따른 분기 - protected, adopted, normal
	const getStatusMark = () => {
		switch (data.pet_status) {
			case 'protect':
				return <Paw30_YELL20 />;
			case 'adopt':
				return <Paw30_Mixed />;
			default:
				return <Paw30_APRI10 />;
		}
	};

	const getShelterStatusMark = () => {
		switch (props.data.shelter_type) {
			case 'public':
				return <Public48 />;
			case 'private':
				return <Private48 />;
			default:
				return <></>;
		}
	};

	//이미지 프로필 라벨
	const getLabel = () => {
		if (data.user_type == 'user') {
			return data.user_profile_uri != undefined ? (
				<Image source={{uri: data.user_profile_uri}} style={[styles.img_round_94]} />
			) : (
				<ProfileDefaultImg size={styles.img_round_94} />
			);
		} else if (data.user_type == 'pet') {
			return data.user_profile_uri != undefined ? (
				<>
					<Image source={{uri: data.user_profile_uri}} style={[styles.img_round_94]} />
					<View style={{position: 'absolute', top: 0}}>{getStatusMark()}</View>
				</>
			) : (
				<>
					<ProfileDefaultImg size={styles.img_round_94} />
					<View style={{position: 'absolute', top: 0}}>
						{/* 팻의 상태 여부에 따른 분기 - protected, adopted, normal  */}
						{getStatusMark()}
					</View>
				</>
			);
		} else if (data.user_type == 'shelter') {
			return data.user_profile_uri != undefined ? (
				<View style={[styles.img_round_94]}>
					<Image source={{uri: data.user_profile_uri}} style={[styles.img_round_94]}></Image>
					<View style={{position: 'absolute', right: 0, bottom: 0}}>{getShelterStatusMark()}</View>
				</View>
			) : (
				<View style={[styles.img_round_94]}>
					<ProfileDefaultImg size={styles.img_round_94} />
					<View style={{position: 'absolute', right: 0, bottom: 0}}>{getShelterStatusMark()}</View>
				</View>
			);
		}
	};

	// console.log('data.showStatus', data.showStatus);

	return (
		// <View style={{flexDirection: 'row', alignItems: 'center', width: props.width != null ? props.width : null}}>
		<TouchableOpacity onPress={onClickLabel}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				{getLabel()}
				<View style={{marginLeft: 30 * DP}}>
					<View style={{flexDirection: 'row'}}>
						<Text
							style={(txt.roboto28b, {maxWidth: 400 * DP, color: userGlobalObject.userInfo._id == data._id ? APRI10 : BLACK})}
							numberOfLines={1}
							ellipsizeMode="tail">
							{data.user_nickname || ''}
						</Text>
						{props.showFollowStatusText ? (
							data.follow ? (
								<Text style={[txt.noto22, {color: APRI10, alignSelf: 'center', paddingLeft: 10 * DP}]}> 팔로우 중</Text>
							) : (
								<></>
							)
						) : (
							<></>
						)}
					</View>
					{data.user_introduction ? (
						<Text
							style={[
								txt.noto24,
								{
									lineHeight: 44 * DP,
									color: GRAY10,
									width: props.width * DP || null, //22.02.24 추가 KSW UserDescriptionLabel이 사용되는 모든 템플릿  확인 완료 출력 오류 없는 상태 (And, ios)
									maxWidth: props.width * DP || 400 * DP,
								},
							]}
							numberOfLines={1}
							ellipsizeMode="tail">
							{data.user_introduction || ''}
						</Text>
					) : (
						<></>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

UserDescriptionLabel.defaultProps = {
	onClickLabel: e => console.log(e),
	showFollowStatusText: true,
};

export default UserDescriptionLabel;
