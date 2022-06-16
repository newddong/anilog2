import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {GRAY20, BLACK, APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE, IS_LEAVE_USER} from 'Root/i18n/msg';
import DP from 'Root/config/dp';
import {styles} from 'Atom/image/imageStyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import {getTimeLapsed} from 'Root/util/dateutil';
import {ProfileDefaultImg} from 'Root/component/atom/icon';
import FastImage from 'react-native-fast-image';

/**
 *  반려동물의 프로필 사진, 유저의 닉네임, 시간 정보를 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.data - UserObejct
 * @param {(data:object)=>void} props.onClickLabel - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const UserTimeLabel = props => {
	const [isLoginUser, setIsLoginUser] = React.useState(false); //현재 접속 중인 아이디와 같다면 닉네임 색깔이 메인색깔
	const data = props.data ? props.data.comment_writer_id : {};

	//현재 접속한 토큰과 출력된 유저라벨의 유저가 같은지 확인
	React.useEffect(() => {
		data && userGlobalObject.userInfo._id == data._id ? setIsLoginUser(true) : setIsLoginUser(false);
	}, [props.data]);

	const getCommentedTime = () => {
		let date = getTimeLapsed(props.data.comment_date);
		return date;
	};

	const onClickLabel = e => {
		if (!data) {
			Modal.alert(IS_LEAVE_USER);
		} else {
			props.onLabelClick(data);
		}
	};

	return (
		<View style={{flexDirection: 'row', alignItems: 'center'}}>
			<TouchableOpacity onPress={onClickLabel}>
				{data ? (
					data.user_profile_uri ? (
						<FastImage source={{uri: data.user_profile_uri}} style={styles.img_round_46} />
					) : (
						<ProfileDefaultImg size={styles.img_round_46} />
					)
				) : (
					<ProfileDefaultImg size={styles.img_round_46} />
				)}
			</TouchableOpacity>
			<View style={{marginLeft: 20 * DP, flexDirection: 'row', paddingBottom: 10 * DP}}>
				<Text style={[txt.roboto24, {maxWidth: 320 * DP, color: isLoginUser ? APRI10 : GRAY10}]} numberOfLines={1}>
					{data ? data.user_nickname : IS_LEAVE_USER}
				</Text>
				<Text style={[txt.noto24, {lineHeight: 30 * DP, color: GRAY20, paddingLeft: 16 * DP}]} numberOfLines={1}>
					·{getCommentedTime()}
				</Text>
			</View>
		</View>
	);
};
UserTimeLabel.defaultProps = {
	onLabelClick: e => console.log(e),
};
export default UserTimeLabel;
