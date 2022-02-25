import moment from 'moment';
import React from 'react';
import {Text, View} from 'react-native';
import {GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ShelterLabel from 'Molecules/label/ShelterLabel';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import {volunteerItem} from 'Organism/style_organism copy';
import {getUserInfoById} from 'Root/api/userapi';
import userGlobalObject from 'Root/config/userGlobalObject';

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
	// console.log('props.type', data.volunteer_wish_date, props.type, data.volunteer_status);

	const getStatusText_notDone = () => {
		let text = '활동 예정';
		data.volunteer_status == 'waiting' ? (text = '수락 대기중') : (text = '활동 예정');
		return text;
	};

	const getStatusText_done = () => {
		//활동완료(done) : 봉사활동이 완료된 상태 [App에서의 표기 : '활동 완료']
		//신청거절(notaccept) : 보호소에서 거절 [App에서의 표기 : '취소(보호소)']
		//신청승인(accept) : 보호소에서 승인 [App에서의 표기 : '활동 예정' - 참여 인원은 본인이 승인했을 경우임. 거절하면 '활동 거절'로 표기]
		//보호소승인대기(waiting) : 참여 리더가 신청한 직후 상태   [App에서의 표기 : '승인 대기']
		//신청취소(cancel) : 참여 리더가 신청취소한 상태 [App에서의 표기 : '활동 취소']
		let text = '활동 완료';
		if (props.isShelterUser) {
			switch (data.volunteer_status) {
				case 'accept':
				case 'done':
				case 'waiting':
					text = '만료';
					break;
				case 'notaccept':
					text = '신청거절';
					break;
				case 'cancel':
					text = '신청취소';
					break;
				default:
					break;
			}
		} else {
			switch (data.volunteer_status) {
				case 'accept':
				case 'done':
				case 'waiting':
					text = '만료';
					break;
				case 'cancel':
					text = '활동 취소';
					break;
				case 'notaccept':
					text = '활동 거절';

				default:
					break;
			}
		}
		return text;
	};

	return (
		<View style={[volunteerItem.container]}>
			<View style={[volunteerItem.labelContainer]}>
				{/* user_type이 shelter일 경우 ShelterLabel. 아닐 경우 UserDescriptionLabel */}
				{!props.isShelterUser ? (
					<ShelterLabel data={data} onClickLabel={() => props.onClickLabel()} />
				) : (
					<UserDescriptionLabel width={388} data={data.volunteer_accompany[0].member} onClickLabel={() => props.onClickLabel()} />
				)}
			</View>
			{props.nvName != 'ProtectApplicant' && (
				<View style={[volunteerItem.expected_activityDate]}>
					<Text style={[txt.roboto22, {color: GRAY20}]}>{parsing_wish_date()}</Text>
					<Text style={[txt.roboto24, {color: GRAY20, marginTop: 5}]}>{props.type == 'done' ? getStatusText_done() : getStatusText_notDone()}</Text>
				</View>
			)}
		</View>
	);
};

VolunteerItem.defaultProps = {
	onClickLabel: e => console.log(e),
};
