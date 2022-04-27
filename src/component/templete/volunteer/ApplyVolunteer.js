import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {BLACK, GRAY10, GRAY20, RED10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {AddItem64, Calendar48_Filled, Cross46, Cross48, Person48, Phone48} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import ShelterInfo from 'Organism/info/ShelterInfo';
import {applyVolunteer, btn_style, login_style} from 'Templete/style_templete';
import DatePicker from 'Molecules/select/DatePicker';
import Input24 from 'Molecules/input/Input24';
import Modal from 'Component/modal/Modal';
import {getUserInfoById} from 'Root/api/userapi';
import {assignVolunteerActivity, setVolunteerActivityAcceptByMember, setVolunteerActivityStatus} from 'Root/api/volunteerapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import UserDescriptionLabel from 'Root/component/molecules/label/UserDescriptionLabel';
import {useKeyboardBottom} from 'Root/component/molecules/input/usekeyboardbottom';

//관련 DB테이블 - VolunteerActivityApplicantObject
export default ApplyVolunteer = ({route, navigation}) => {
	// console.log('route.params / ApplyVolunteer  : ', route.params);
	const param = route.params;
	const [loading, setLoading] = React.useState(true);
	const [shelter_data, setShelter_data] = React.useState(route.params); //선택한 보호소프로필의 userObject가 담겨있음
	const [contactNumCheck, setContactNumCheck] = React.useState(false);
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
		volunteer_accompany_number: '',
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

				assignVolunteerActivity(
					{
						shelter_userobject_id: param.token,
						volunteer_wish_date_list: data.volunteer_wish_date,
						accompany_userobject_id_list: getAccompaniesId,
						volunteer_delegate_contact: data.volunteer_delegate_contact,
						volunteer_accompany_number: data.volunteer_accompany_number,
					},
					result => {
						console.log('result / assignVolunteerAct / ApplyVolunteer   :  ', result);
						Modal.popNoBtn('봉사활동 신청이 완료되었습니다.');
						setVolunteerConfirmStatus(result.msg._id);
					},
					err => {
						console.log('err / assignVolunteerAct  / ApplyVolunteer  :  ', err);
					},
				);
				Modal.close();
			},
		);
	};

	//봉사활동을 신청 후, 신청자 본인은 자동으로 참여 확정으로 바꿔주는 함수
	const setVolunteerConfirmStatus = async id => {
		setVolunteerActivityAcceptByMember(
			{
				volunteer_activity_object_id: id,
				confirm: 'accept',
			},
			result => {
				console.log('result / setVolunteerActivityAcceptByMember / ', result.msg);
				setTimeout(() => {
					Modal.close();
					navigation.goBack();
				}, 1000);
			},
			err => {
				console.log('err / setVolunteerActivityAcceptByMember ', err);
				Modal.alert('오류 발생!!');
			},
		);
	};

	//계정추가 버튼 클릭
	const addVolunteer = () => {
		console.log('::', data.volunteer_accompany_number - data.volunteer_accompany.length);
		if (data.volunteer_accompany_number - data.volunteer_accompany.length <= 0) {
			Modal.popOneBtn('참여인원보다 많은 봉사자를\n 추가하실 수 없습니다.', '확 인', () => Modal.close());
		} else {
			navigation.push('AddVolunteers');
		}
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

	//희망날짜가 3일 이상 선택된 경우 달력 모달이 열리지 않음
	const canOpenCalendar = () => {
		let result = true;
		if (data.volunteer_wish_date.length == 3) {
			Modal.popOneBtn('희망날짜는 3일 이상 \n 선택이 불가능합니다.', '확인', () => Modal.close());
			result = false;
		} else {
			result = true;
		}
		return result;
	};

	//봉사활동자 연락처 변경 콜백
	const onChangePhoneNumber = num => {
		setData({...data, volunteer_delegate_contact: num});
		let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		let regHomePhone = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/;
		regPhone.test(num) || regHomePhone.test(num) ? setContactNumCheck(true) : setContactNumCheck(false);
	};

	//봉사활동 날짜 Item 우측 지우기마크 클릭 시 해당 Item 삭제 및 View도 삭제
	const onDeleteVolunteerDate = index => {
		let copy = [...data.volunteer_wish_date];
		copy.splice(index, 1);
		setData({...data, volunteer_wish_date: copy});
	};

	//애니로그 계정 봉사활동 참여인원 List에서 지우기 클릭
	const onDeleteAccount = index => {
		let copy = [...data.volunteer_accompany];
		if (copy[index]._id == userGlobalObject.userInfo._id) {
			Modal.alert('신청자 본인은 삭제할 수 없습니다.');
		} else {
			copy.splice(index, 1);
			setData({...data, volunteer_accompany: copy});
		}
	};

	//봉사활동 참여인원 선택 모달
	const onPressAccompanyNumber = () => {
		const numberArray = ['1명', '2명', '3명', '4명', '5명'];
		Modal.popSelectScrollBoxModal(
			[numberArray],
			'봉사활동 인원수(최대 5인)',
			selected => {
				const findIndex = numberArray.findIndex(e => e == selected);
				console.log('findIndex', findIndex);
				setData({...data, volunteer_accompany_number: findIndex + 1});
				Modal.close();
			},
			() => Modal.close(),
		);
	};

	const phoneValidate = num => {
		// console.log('num', num);
		let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		let regHomePhone = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/;
		return regPhone.test(num) || regHomePhone.test(num);
	};

	const keyboardY = useKeyboardBottom(0 * DP);

	if (loading) {
		return <></>;
	} else {
		return (
			<View style={[login_style.wrp_main, applyVolunteer.container, {bottom: keyboardY}]}>
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
								<Text style={[txt.noto28, {color: RED10}]}> *</Text>
							</View>
						</View>
						<DatePicker
							width={590}
							canOpenCalendar={canOpenCalendar}
							onDateChange={onDateChange}
							past={false}
							multiple={true}
							previous={data.volunteer_wish_date}
							maxLength={3}
						/>
						{/* 봉사활동 희망날짜 리스트 */}
						{data.volunteer_wish_date.map((v, i) => {
							return (
								<View key={i} style={[applyVolunteer.volunteerDateList]}>
									<Text style={[txt.roboto28, applyVolunteer.volunteerDateList_text]}>{v}</Text>
									<View style={[applyVolunteer.volunteerDateList_cross]}>
										<Cross46 onPress={() => onDeleteVolunteerDate(i)} />
									</View>
								</View>
							);
						})}
					</View>
					{/* 참여인원 */}
					<View style={[applyVolunteer.participants]}>
						<View style={[applyVolunteer.participants_step1]}>
							<View style={[applyVolunteer.icon48]}>
								<Person48 />
							</View>
							<View style={[applyVolunteer.title]}>
								<Text style={[txt.noto24b, {color: GRAY10}]}>참여 인원</Text>
								<Text style={[txt.noto22, {color: GRAY20}]}>(총 인원 수 기입 - 최대 5인)</Text>
							</View>
						</View>
						<View style={[applyVolunteer.number_of_volunteerers]}>
							<Text
								onPress={onPressAccompanyNumber}
								style={[
									txt.noto30,
									applyVolunteer.volunteerListInput,
									{
										color: data.volunteer_accompany_number != '' ? BLACK : GRAY20,
									},
								]}>
								{data.volunteer_accompany_number != '' ? data.volunteer_accompany_number + '명' : '애니로그 계정 유무 상관없는 총 인원수'}
							</Text>
							{data.volunteer_accompany_number != '' ? <></> : <Text style={[txt.noto32]}> {'  '} 명</Text>}
						</View>
						{/* 봉활참여인원 FlatList 여기 */}
						<View style={[applyVolunteer.participants_step2]}>
							{/* <AccountList items={data.volunteer_accompany} width={446} onDelete={onDeleteAccount} makeBorderMode={false} /> */}
							{data.volunteer_accompany.map((v, i) => {
								return (
									<View style={[applyVolunteer.participants_container]} key={i}>
										<View style={[applyVolunteer.participants_list_container]}>
											<UserDescriptionLabel data={v} />
										</View>
										<Cross48 onPress={() => onDeleteAccount(i)} />
									</View>
								);
							})}
							<TouchableOpacity onPress={addVolunteer} style={[applyVolunteer.addParticipantBtn]}>
								<AddItem64 />
								<Text style={[txt.noto28, applyVolunteer.addParticipantTxt]}>애니로그 계정인 봉사자 추가</Text>
							</TouchableOpacity>
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
								<Text style={[txt.noto28, {color: RED10}]}> *</Text>
							</View>
						</View>
						<View style={[applyVolunteer.participants_contact_text]}>
							<Input24
								width={654}
								placeholder={'연락처를 적어주세요.'}
								keyboardType={'phone-pad'}
								onChange={onChangePhoneNumber}
								value={data.volunteer_delegate_contact}
								alert_msg={'전화번호는 - 을 제외하고 10~11자로 작성해주세요'}
								showMsg
								confirm_msg={'올바른 전화번호 양식입니다.'}
								validator={phoneValidate}
							/>
						</View>
					</View>
					{/* 신청 버튼 */}
					<View style={[btn_style.btn_w226, applyVolunteer.btn_w226]}>
						<AniButton
							onPress={onRegister}
							btnTitle={'신청'}
							disable={data.volunteer_accompany_number != '' && contactNumCheck && data.volunteer_wish_date.length > 0 ? false : true}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
};

ApplyVolunteer.defaultProps = {};
