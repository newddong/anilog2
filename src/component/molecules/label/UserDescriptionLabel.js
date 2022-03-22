import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {APRI10, BLACK, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {styles} from 'Atom/image/imageStyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import userGlobalObject from 'Root/config/userGlobalObject';
import {ProfileDefaultImg} from 'Atom/icon';

/**
 * 유저의 프로필 사진, 닉네임, 소개글, 팔로우 상태를 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.data - UserObejct
 * @param {number} props.width - user_introduction 너비
 * @param {(data:object)=>void} props.onClickLabel - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const UserDescriptionLabel = props => {
	const data = props.data;
	// console.log('data / USerDescription Label : ', props.data.user_introduction);
	const onClickLabel = () => {
		props.onClickLabel(props.data);
	};

	return (
		// <View style={{flexDirection: 'row', alignItems: 'center', width: props.width != null ? props.width : null}}>
		<TouchableOpacity onPress={onClickLabel}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				{data.user_profile_uri != undefined ? (
					<Image source={{uri: data.user_profile_uri}} style={[styles.img_round_94]} />
				) : (
					<ProfileDefaultImg size={styles.img_round_94} />
				)}

				<View style={{marginLeft: 30 * DP}}>
					<View style={{flexDirection: 'row'}}>
						<Text style={(txt.roboto28b, {color: userGlobalObject.userInfo._id == data._id ? APRI10 : BLACK})} numberOfLines={1} ellipsizeMode="tail">
							{data.user_nickname || ''}
						</Text>
						{data.showStatus ? <Text style={[txt.noto22, {color: APRI10, alignSelf: 'center', paddingLeft: 10 * DP}]}> STATUS</Text> : null}
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
									// backgroundColor: 'yellow',
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
};

export default UserDescriptionLabel;
