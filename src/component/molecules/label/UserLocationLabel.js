import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {styles} from 'Root/component/atom/image/imageStyle';
import {APRI10, BLACK} from 'Root/config/color';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {getUserInfoById} from 'Root/api/userapi';
import Modal from 'Component/modal/Modal';
import {ProfileDefaultImg1, ProfileDefaultImg1_70, Paw30_APRI10, Paw30_Mixed, Paw30_YELL20, Private30, Public30} from 'Atom/icon';
import {profiledefault2} from 'Atom/icon/profiledefault2.svg';
import userGlobalObject from 'Root/config/userGlobalObject';

/**
 * 유저의 프로필 사진, 닉네임, 사는지역을 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.data - UserObejct
 * @param {(data:object)=>void} props.onClickLabel - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const UserLocationLabel = props => {
	// const [isLoginUser, setIsLoginUser] = React.useState(false); //현재 접속 중인 아이디와 같다면 닉네임 색깔이 메인색깔
	const isLoginUser = userGlobalObject.userInfo?._id == props.data._id;

	// console.log('UserLocationLabel', props.data.user_profile_uri);
	//현재 접속한 토큰과 출력된 유저라벨의 유저가 같은지 확인
	// React.useEffect(()=>{
	// 	getUserInfoById({userobject_id:userId},
	// 		({msg})=>{
	// 			console.log('ddsadsf',msg);
	// 			setData(msg);
	// 		},
	// 		(err)=>{
	// 			// Modal.popOneBtn(err,'확인',()=>Modal.close());
	// 		}

	// 	)
	// })

	// React.useEffect(() => {
	// 	AsyncStorage.getItem('token', (err, res) => {
	// 		res == userId ? setIsLoginUser(true) : setIsLoginUser(false);
	// 	});
	// }, [props.data]);

	// React.useEffect(() => {
	// 	if (props.data.user_profile_uri === undefined) {
	// 		props.data.user_profile_uri = ProfileDefaultImg1;
	// 		console.log('UserLocationLabel', props.data.user_profile_uri);
	// 	}
	// }, []);
	const onClickLabel = e => {
		props.onLabelClick(props.data);
	};
	const usertypeIcon = () => {
		switch (props.data.user_type) {
			case 'pet':
				return (
					<View style={{position: 'absolute', top: 0, left: 0}}>
						{props.data.pet_status == 'companion' ? <Paw30_APRI10 /> : props.data.pet_status == 'protect' ? <Paw30_YELL20 /> : <Paw30_Mixed />}
					</View>
				);
				break;
			case 'shelter':
				return (
					<View style={{position: 'absolute', bottom: 0, left: 40 * DP}}>{props.data.shelter_type == 'public' ? <Public30 /> : <Private30 />}</View>
				);
				break;
			default:
				return false;
				break;
		}
	};

	return (
		<TouchableOpacity onPress={onClickLabel}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				{props.data.user_profile_uri === undefined ? (
					<ProfileDefaultImg1_70 data={props.data} style={styles.img_round_70} />
				) : (
					<Image source={{uri: props.data.user_profile_uri}} style={styles.img_round_70} />
				)}

				<View style={{marginLeft: 20 * DP}}>
					<Text style={[txt.roboto28b, {color: isLoginUser ? APRI10 : BLACK}]} numberOfLines={1} ellipsizeMode="tail">
						{props.data.user_nickname}
					</Text>
					{/* <Text style={[txt.noto24, {lineHeight: 36 * DP}]} numberOfLines={1} ellipsizeMode="tail">
						{props.location}
					</Text> */}
				</View>
				{usertypeIcon()}
			</View>
		</TouchableOpacity>
	);
};
UserLocationLabel.defaultProps = {
	onClickLabel: e => console.log(e),
	data: {
		user_nickname: '찾을수 없는 유저',
		user_profile_uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',
	},
};
export default UserLocationLabel;
