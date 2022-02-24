import moment from 'moment';
import React from 'react';
import {Text, View} from 'react-native';
import {GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ShelterLabel from 'Molecules/label/ShelterLabel';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import {volunteerItem} from 'Organism/style_organism copy';
import {getUserInfoById} from 'Root/api/userapi';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 * @param {(data:object)=>void} props.onClickLabel - 프로필 라벨 클릭
 */
export default VolunteerItem = props => {
	const data = props.data;
	const [loading, setLoading] = React.useState(true);
	const [volunteer, setVolunteer] = React.useState();
	// console.log('data', JSON.stringify(data.volunteer_accompany[0].member));
	const q = {
		user_address: {city: '경기도', district: '수원시 팔달구', neighbor: '지동'},
		_id: '61d2e5d3c0f179ccd5ba6241',
		type: 'UserObject',
		user_type: 'user',
		user_name: '권상우2',
		user_nickname: '고르곤졸라',
		user_phone_number: '01096450420',
		user_mobile_company: 'SK텔레콤',
		user_is_verified_phone_number: true,
		user_is_verified_email: false,
		user_password: 'tkddn123',
		user_introduction: '',
		user_upload_count: 1,
		user_follow_count: 0,
		user_follower_count: 0,
		user_denied: false,
		user_my_pets: [],
		pet_family: [],
		user_register_date: '2022-01-03T12:02:27.964Z',
		__v: 0,
		user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1645672195976_2a9f1986-9848-43f9-8b9a-49b5de5f821d.jpg',
	};
	React.useEffect(() => {
		// if (props.isShelterUser) {
		// 	getUserInfoById(
		// 		{
		// 			userobject_id: data.volunteer_accompany[0].member,
		// 		},
		// 		result => {
		// 			// console.log('result /getUserInfoById / VolunteerItem ', result.msg);
		// 			setVolunteer(result.msg);
		// 			setTimeout(() => {
		// 				setLoading(false);
		// 			}, 200);
		// 		},
		// 		err => {
		// 			console.log('err / getUserInfoById / err', JSON.stringify(err));
		// 		},
		// 	);
		// }
	}, [data]);

	const parsing_wish_date = () => {
		let date = data.volunteer_wish_date[0];
		date = moment(date).format('YY.MM.DD');
		return date;
	};

	const e = {
		_id: '62171a9b35dd87f36daaba25',
		volunteer_target_shelter: '6203aff5c0f179ccd5bb8054',
		volunteer_wish_date: ['2022-03-03T00:00:00.000Z'],
		volunteer_accompany_number: 5,
		volunteer_accompany: [
			{
				member: {
					user_address: {city: '경기도', district: '수원시 팔달구', neighbor: '지동'},
					_id: '61d2e5d3c0f179ccd5ba6241',
					type: 'UserObject',
					user_type: 'user',
					user_name: '권상우2',
					user_nickname: '고르곤졸라',
					user_phone_number: '01096450420',
					user_mobile_company: 'SK텔레콤',
					user_is_verified_phone_number: true,
					user_is_verified_email: false,
					user_password: 'tkddn123',
					user_introduction: '',
					user_upload_count: 1,
					user_follow_count: 0,
					user_follower_count: 0,
					user_denied: false,
					user_my_pets: [],
					pet_family: [],
					user_register_date: '2022-01-03T12:02:27.964Z',
					__v: 0,
					user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1645672195976_2a9f1986-9848-43f9-8b9a-49b5de5f821d.jpg',
				},
				confirm: 'waiting',
				_id: '62171a9b35dd87f36daaba26',
			},
			{
				member: {
					user_address: {city: '서울특별시', district: '마포구', neighbor: '신수동'},
					_id: '61d2de63c0f179ccd5ba5887',
					type: 'UserObject',
					user_type: 'user',
					user_name: '권상우',
					user_nickname: '권상우',
					user_phone_number: '01096450422',
					user_mobile_company: 'SK텔레콤',
					user_is_verified_phone_number: true,
					user_is_verified_email: false,
					user_password: 'tkddn123',
					user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209443215_0CF8CF7C-DA9E-4F9D-9F6D-2C19C7144A45.jpg',
					user_introduction: '아이에\n그라긋\nDd1',
					user_upload_count: 21,
					user_follow_count: 15,
					user_follower_count: 4,
					user_denied: false,
					user_my_pets: ['61d2de8ac0f179ccd5ba58a6', '61d2ff57c0f179ccd5ba6e72', '61e0f9c0c0f179ccd5bb06c3', '6200fa6fc0f179ccd5bb69be'],
					pet_family: [],
					user_register_date: '2022-01-03T11:30:43.310Z',
					__v: 4,
				},
				confirm: 'waiting',
				_id: '62171a9b35dd87f36daaba27',
			},
		],
		volunteer_delegate_contact: '1313324',
		volunteer_status: 'waiting',
		__v: 0,
	};

	// console.log('props.isShelterUser', props.isShelterUser);
	if (loading) {
		return <></>;
	} else
		return (
			<View style={[volunteerItem.container]}>
				<View style={[volunteerItem.labelContainer, {}]}>
					{/* user_type이 shelter일 경우 ShelterLabel. 아닐 경우 UserDescriptionLabel */}
					{!props.isShelterUser ? (
						<ShelterLabel data={data} onClickLabel={() => props.onClickLabel()} />
					) : (
						<UserDescriptionLabel data={data.volunteer_accompany[0].member} onClickLabel={() => props.onClickLabel()} />
					)}
				</View>
				{props.nvName != 'ProtectApplicant' && (
					<View style={[volunteerItem.expected_activityDate]}>
						<Text style={[txt.roboto22, {color: GRAY20}]}>{parsing_wish_date()}</Text>
						<Text style={[txt.roboto24, {color: GRAY20}]}>{props.type != 'done' ? '활동 예정' : '활동 완료'}</Text>
					</View>
				)}
			</View>
		);
};

VolunteerItem.defaultProps = {
	onClickLabel: e => console.log(e),
};
