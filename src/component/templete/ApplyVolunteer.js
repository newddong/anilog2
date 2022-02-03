import React from 'react';
import {Text, View, ScrollView, FlatList, TextInput} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w226} from 'Atom/btn/btn_style';
import {Add_Volunteer, Calendar48_Filled, Cross46, Person48, Phone48} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import AccountList from 'Organism/list/AccountList';
import ShelterInfo from 'Organism/info/ShelterInfo';
import {applyVolunteer, btn_style, login_style} from './style_templete';
import DatePicker from 'Molecules/select/DatePicker';
import Input24 from 'Molecules/input/Input24';
import Modal from '../modal/Modal';
import {getUserInfoById} from 'Root/api/userapi';
import {assignVolunteerActivity} from 'Root/api/volunteerapi';
import userGlobalObject from 'Root/config/userGlobalObject';

//관련 DB테이블 - VolunteerActivityApplicantObject
export default ApplyVolunteer = ({route, navigation}) => {
	// console.log('route.params / ApplyVolunteer  : ', route.params);
	const param = route.params;
	const [loading, setLoading] = React.useState(true);
	const [shelter_data, setShelter_data] = React.useState(route.params); //선택한 보호소프로필의 userObject가 담겨있음
	const userInfo = userGlobalObject.userInfo;
	React.useEffect(() => {
		Modal.popNoBtn('신청 양식을 얻어오고 있습니다.');
		getUserInfoById(
			{
				userobject_id: param.token,
			},
			result => {
				// console.log('result / getUserInfoById / ApplyVolunteer   :  ', result.msg);
				setShelter_data(result.msg);
				setLoading(false);
				Modal.close();
			},
			err => {
				console.log('err / getUserInfoById / ApplyVolunteer    :  ', err);
				Modal.close();
			},
		);
	}, [route.params]);

	React.useEffect(() => {
		getUserInfoById(
			{userobject_id: userInfo._id},
			result => {
				// console.log('result / getUserInfoById / 내 계정 얻기 ', result.msg);
				let copy = [...data.volunteer_accompany];
				copy[0] = result.msg;
				setData({...data, volunteer_accompany: copy});
			},
			err => {
				console.log('err / getUserInfoById / 내 계정 얻기 ', err);
			},
		);
	}, []);

	const [data, setData] = React.useState({
		volunteer_target_shelter: param.token, //대상 보호소는 Profile에서 params로 보내줌
		volunteer_wish_date: [],
		volunteer_accompany: [],
		volunteer_delegate_contact: '',
		volunteer_status: 'waiting',
	});

	//추가된 봉사활동자가 있는 경우 Data에 추가
	React.useEffect(() => {
		if (param.addedVolunteer != undefined) {
			let copy = [...data.volunteer_accompany];
			copy.push(param.addedVolunteer);
			setData({...data, volunteer_accompany: copy});
		}
	}, [param.addedVolunteer]);

	//최종 신청
	const onRegister = () => {
		Modal.popTwoBtn(
			'해당 내용으로 신청하시겠습니까?',
			'취소',
			'신청',
			() => Modal.close(),
			//최종 신청 API WRITE
			() => {
				let getAccompaniesId = [];
				data.volunteer_accompany.map((v, i) => {
					getAccompaniesId.push(v._id);
				});
				console.log('token', param.token);
				assignVolunteerActivity(
					{
						shelter_userobject_id: param.token,
						volunteer_wish_date_list: data.volunteer_wish_date,
						accompany_userobject_id_list: getAccompaniesId,
						volunteer_delegate_contact: data.volunteer_delegate_contact,
					},
					result => {
						console.log('result / assignVolunteerAct / ApplyVolunteer   :  ', result);
						Modal.popNoBtn('봉사활동 신청이 완료되었습니다.');
						setTimeout(() => {
							Modal.close();
							navigation.goBack();
						}, 1000);
					},
					err => {
						console.log('err / assignVolunteerAct  / ApplyVolunteer  :  ', err);
					},
				);
				Modal.close();
			},
		);
	};

	//계정추가 버튼 클릭
	const addVolunteer = () => {
		// navigation.push('Search', {mother: 0, child: 1, prevNav: route.name});
		navigation.push('AddVolunteers');
	};

	//DatePicker로 날짜 지정할 시, 하단에 봉사활동 날짜 Item이 View로 보여짐
	const onDateChange = date => {
		let filteredDates = [...data.volunteer_wish_date];
		date.map((v, i) => {
			const isDup = data.volunteer_wish_date.some(e => e == v);
			isDup ? false : filteredDates.push(v);
		});
		setData({...data, volunteer_wish_date: filteredDates});
	};

	//봉사활동자 연락처 변경 콜백
	const onChangePhoneNumber = num => {
		setData({...data, volunteer_delegate_contact: num});
	};

	//봉사활동 날짜 Item 우측 지우기마크 클릭 시 해당 Item 삭제 및 View도 삭제
	const onDeleteVolunteerDate = index => {
		let copy = [...data.volunteer_wish_date];
		copy.splice(index, 1);
		setData({...data, volunteer_wish_date: copy});
	};

	//봉사활동 참여인원 List에서 지우기 클릭
	const onDeleteAccount = index => {
		let copy = [...data.volunteer_accompany];
		copy.splice(index, 1);
		setData({...data, volunteer_accompany: copy});
	};

	//봉사활동 날짜 item render
	const renderItem = (item, index) => {
		return (
			<View style={[applyVolunteer.volunteerDateList]}>
				<Text style={[txt.roboto28, applyVolunteer.volunteerDateList_text]}>{item}</Text>
				<View style={[applyVolunteer.volunteerDateList_cross]}>
					<Cross46 onPress={() => onDeleteVolunteerDate(index)} />
				</View>
			</View>
		);
	};
	if (loading) {
		return <></>;
	} else {
		return (
			<View style={[login_style.wrp_main, applyVolunteer.container]}>
				<ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
					{/* 보호소 정보 박스 */}
					<View style={[applyVolunteer.shelterInfo]}>
						<ShelterInfo data={shelter_data} />
					</View>
					{/* 봉사활동 희망 날짜 */}
					<View style={[applyVolunteer.viewForm]}>
						<View style={[applyVolunteer.viewForm_step1]}>
							<View style={[applyVolunteer.icon48]}>
								<Calendar48_Filled />
							</View>
							<View style={[applyVolunteer.title]}>
								<Text style={[txt.noto24b, {color: GRAY10}]}>봉사활동 희망 날짜</Text>
							</View>
						</View>
						<DatePicker width={654} onDateChange={onDateChange} past={false} multiple={true} />
						{/* 봉사활동 희망날짜 FlatList */}
						<ScrollView horizontal={false} contentContainerStyle={{flex: 0}}>
							<ScrollView horizontal={true} contentContainerStyle={{flex: 1}}>
								<FlatList data={data.volunteer_wish_date} renderItem={({item, index}) => renderItem(item, index)} />
							</ScrollView>
						</ScrollView>
					</View>
					{/* 참여인원 */}
					<View style={[applyVolunteer.participants]}>
						<View style={[applyVolunteer.participants_step1]}>
							<View style={[applyVolunteer.icon48]}>
								<Person48 />
							</View>
							<View style={[applyVolunteer.title]}>
								<Text style={[txt.noto24b, {color: GRAY10}]}>참여 인원</Text>
								<Text style={[txt.noto22, {color: GRAY20}]}>(비회원 포함 기입 / 계정 추가는 생략 가능)</Text>
							</View>
						</View>
						<TextInput editable={false} style={[applyVolunteer.number_of_volunteerers]} value={data.volunteer_accompany.length + ' 명'} />
						{/* 봉활참여인원 FlatList 여기 */}
						<View style={[applyVolunteer.participants_step2]}>
							<View style={[applyVolunteer.accountList]}>
								<AccountList items={data.volunteer_accompany} width={446} onDelete={onDeleteAccount} makeBorderMode={false} />
							</View>
							<View style={[applyVolunteer.addParticipantBtn]}>
								<Add_Volunteer onPress={addVolunteer} />
								<Text style={[txt.noto28, applyVolunteer.addParticipantTxt]}>계정 추가</Text>
							</View>
						</View>
					</View>
					{/* 봉사활동자 연락처 */}
					<View style={[applyVolunteer.participants_contact]}>
						<View style={[applyVolunteer.viewForm_step1]}>
							<View style={[applyVolunteer.icon48]}>
								<Phone48 />
							</View>
							<View style={[applyVolunteer.title]}>
								<Text style={[txt.noto24b, {color: GRAY10}]}>봉사 활동자 연락처</Text>
							</View>
						</View>
						<View style={[applyVolunteer.participants_contact_text]}>
							<Input24 width={654} placeholder={'연락처를 적어주세요.'} onChange={onChangePhoneNumber} value={data.volunteer_delegate_contact} />
						</View>
					</View>
					{/* 신청 버튼 */}
					<View style={[btn_style.btn_w226, applyVolunteer.btn_w226]}>
						<AniButton
							onPress={onRegister}
							btnTitle={'신청'}
							disable={
								data.volunteer_accompany.length > 0 && data.volunteer_delegate_contact.length > 0 && data.volunteer_wish_date.length > 0
									? false
									: true
							}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
};

ApplyVolunteer.defaultProps = {};
