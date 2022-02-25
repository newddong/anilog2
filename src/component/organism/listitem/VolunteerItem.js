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
	React.useEffect(() => {
		if (props.isShelterUser) {
			getUserInfoById(
				{
					userobject_id: data.volunteer_accompany[0].member,
				},
				result => {
					// console.log('result /getUserInfoById / VolunteerItem ', result.msg);
					setVolunteer(result.msg);
					setTimeout(() => {
						setLoading(false);
					}, 200);
				},
				err => {
					console.log('err / getUserInfoById / err', JSON.stringify(err));
				},
			);
		}
	}, [data]);

	const parsing_wish_date = () => {
		let date = data.volunteer_wish_date[0];
		date = moment(date).format('YY.MM.DD');
		return date;
	};

	if (loading) {
		return <></>;
	} else
		return (
			<View style={[volunteerItem.container]}>
				<View style={[volunteerItem.labelContainer, {}]}>
					{/* user_type이 shelter일 경우 ShelterLabel. 아닐 경우 UserDescriptionLabel */}
					{props.data.user_type === 'shelter' ? (
						<ShelterLabel data={data} onClickLabel={() => props.onClickLabel()} />
					) : (
						<UserDescriptionLabel data={volunteer} onClickLabel={() => props.onClickLabel()} />
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
