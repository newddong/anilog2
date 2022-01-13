import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {GRAY20, BLACK, APRI10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import DP from 'Root/screens/dp';
import {styles} from '../atom/image/imageStyle';

/**
 *  반려동물의 프로필 사진, 유저의 닉네임, 시간 정보를 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.data - UserObejct
 * @param {(data:object)=>void} props.onClickLabel - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const UserTimeLabel = props => {
	const [isLoginUser, setIsLoginUser] = React.useState(false); //현재 접속 중인 아이디와 같다면 닉네임 색깔이 메인색깔

	//현재 접속한 토큰과 출력된 유저라벨의 유저가 같은지 확인
	React.useEffect(() => {
		AsyncStorage.getItem('token', (err, res) => {
			res == props.data.comment_writer_id._id ? setIsLoginUser(true) : setIsLoginUser(false);
		});
	}, [props.data]);

	const getCommentedTime = () => {
		let date = props.data.comment_date.match(/(\d{4})-(\d{1,2})-(\d{1,2}).*?$/);
		let timelapsed = Date.now() - new Date(date[1], date[2] - 1, date[3]);
		return <>{Math.ceil(timelapsed / 1000 / 60 / 60 / 24) - 1} 일 전</>;
	};

	const onClickLabel = e => {
		props.onLabelClick(props.data.comment_writer_id);
	};

	return (
		<View style={{flexDirection: 'row', alignItems: 'center'}}>
			<TouchableOpacity onPress={onClickLabel}>
				<Image source={{uri: props.data.comment_writer_id.user_profile_uri || DEFAULT_PROFILE}} style={styles.img_round_46} />
			</TouchableOpacity>
			<View style={{marginLeft: 20 * DP, flexDirection: 'row', paddingBottom: 10 * DP, height: 36 * DP}}>
				<Text style={[txt.roboto24, {lineHeight: 30 * DP, color: isLoginUser ? APRI10 : BLACK}]} numberOfLines={1} ellipsizeMode="tail">
					{props.data.comment_writer_id.user_nickname || ''}
				</Text>
				<Text style={[txt.noto24, {lineHeight: 30 * DP, color: GRAY20, paddingLeft: 16 * DP}]} numberOfLines={1} ellipsizeMode="tail">
					{props.data.feed_type == undefined ? getCommentedTime() : props.data.comment_date} {/* {getCommentedTime()}일 전 */}
				</Text>
			</View>
		</View>
	);
};
UserTimeLabel.defaultProps = {
	onClickLabel: e => console.log(e),
};
export default UserTimeLabel;
