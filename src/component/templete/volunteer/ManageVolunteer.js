import React from 'react';
import {ScrollView, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
<<<<<<< HEAD:src/component/templete/volunteer/ManageVolunteer.js
import {GRAY20} from 'Root/config/color';
=======
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/templete/ManageVolunteer.js
import {txt} from 'Root/config/textstyle';
import {Arrow_Down_GRAY20, Arrow_Up_GRAY20} from 'Atom/icon';
import VolunteerItemList from 'Organism/list/VolunteerItemList';
import {login_style, manageVolunteer} from 'Templete/style_templete';
<<<<<<< HEAD:src/component/templete/volunteer/ManageVolunteer.js
import {_dummy_userObject_user, _dummy_VolunteerActivityApplicant} from 'Root/config/dummy_data_hjs';
=======
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/templete/ManageVolunteer.js
import {getShelterVolunteerActivityList, getUserVolunteerActivityList} from 'Root/api/volunteerapi';

export default ManageVolunteer = ({route}) => {
	// console.log('route.name', route.name);
	const navigation = useNavigation();
	const isShelterUser = route.name == 'ManageShelterVolunteer';

	const [notDoneList, setNotDoneList] = React.useState('false'); //활동 예정중인 신청
	const [doneList, setDoneList] = React.useState('false'); // 지난 신청
	const [showMoreHistory, setShowMoreHistory] = React.useState(false); //지난 내역 더보기

	React.useEffect(() => {
		if (!isShelterUser) {
			console.log('ManageUserVolunteer');
			getUserVolunteerActivityList(
				{},
				result => {
					// console.log('success / getUserVolunterItemList / ManageVolunteer', result.msg[0]);
					let doneList = []; //지난 내역을 담을 컨테이너
					let notDoneList = []; //활동 예정 중인 신청을 담을 컨테이너
					result.msg.map((v, i) => {
						let wishdate = moment(v.volunteer_wish_date[0]).toDate(); //봉사활동 희망날짜 배열에서 첫번째 값을 받아와 Date타입으로 치환
						let thisTime = new Date().getTime(); // 현재 시간
						//ShelterLabel을 채우기 위한 필드명 1depth 올리기 작업
						v.shelter_address = v.volunteer_target_shelter.shelter_address;
						v.shelter_name = v.volunteer_target_shelter.shelter_name;
						v.user_type = v.volunteer_target_shelter.user_type;
						v.user_profile_uri = v.volunteer_target_shelter.user_profile_uri;
						// 비교 후 '지난 내역' / '활동 예정' 각 배열에 푸쉬
						if (wishdate.getTime() < thisTime) {
							// console.log('v.volunteer_status', i, v.volunteer_status);
							doneList.push(v);
						} else if (v.volunteer_status == 'waiting' || v.volunteer_status == 'accept') {
							// console.log('v.volunteer_status', i, v.volunteer_status);
							notDoneList.push(v);
						} else {
							// console.log('v.volunteer_status', i, v.volunteer_wish_date);
							doneList.push(v);
						}
					});
					setDoneList(doneList); //API로 받아온 지난 내역 값 setState
					setNotDoneList(notDoneList); //이하동문
				},
				err => {
					console.log('err', err);
					setDoneList([]);
					setNotDoneList([]);
				},
			);
		} else {
			//ShelterMenu => 봉사활동 신청관리
			console.log(' - ManageShelterVolunteer -');
			let notDoneList = [];
			let doneList = [];
			getShelterVolunteerActivityList(
				{
					volunteer_activity_object_id: '',
					volunteer_status: '',
					request_number: 30,
				},
				data => {
					// console.log('success / getUserVolunterItemList / ManageShelterVolunteer', data.msg[1]);
					data.msg.map((v, i) => {
						let wishdate = moment(v.volunteer_wish_date[0]).toDate(); //봉사활동 희망날짜 배열에서 첫번째 값을 받아와 Date타입으로 치환
						let thisTime = new Date().getTime(); // 현재 시간
						if (wishdate.getTime() < thisTime) {
							// 시간이 지난 신청서는 우선 지난 신청서로 푸쉬
							doneList.push(v);
						} else if (v.volunteer_status == 'waiting' || v.volunteer_status == 'accept') {
							// 시간이 지나지 않았고, 수락 대기 중 혹은 수락이 된 신청서는 제외하고는 모두 지난 신청서로 푸쉬
							notDoneList.push(v);
						} else {
							// 결국 남는 건 done / notaccept / cancel 일 경우에 대해서는 지난 신청서로 푸쉬
							doneList.push(v);
						}
					});
					setDoneList(doneList);
					setNotDoneList(notDoneList);
				},
				errcallback => {
					console.log(`getShelterVolunteerActivityList errcallback:${JSON.stringify(errcallback)}`);
					setDoneList([]);
					setNotDoneList([]);
				},
			);
		}
	}, []);

	// 지난 신청 더보기 클릭
	const showMore = () => {
		setShowMoreHistory(!showMoreHistory);
	};

	// 봉사활동 아이템 클릭 => 봉사활동 신청서 필요 데이터 : 보호소 정보 / 해당 봉사활동 데이터
	const goToAssignVolunteer = shelterData => {
		isShelterUser ? navigation.push('ShelterVolunteerForm', shelterData) : navigation.push('UserVolunteerForm', shelterData);
	};

	const onClickLabel = shelterData => {
		isShelterUser ? navigation.push('ShelterVolunteerForm', shelterData) : navigation.push('UserVolunteerForm', shelterData);
	};

	const whenEmpty = () => {
		return <Text style={[txt.roboto28b, manageVolunteer.whenEmpty]}>신청 내역이 없습니다. </Text>;
	};
	const isLoaded = doneList == 'false' || notDoneList == 'false'; //활동 예정 및 지난 신청 중 단 하나라도 false(API 적용 이전값)가 있다면 아직 로딩중

	if (isLoaded) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView contentContainerStyle={manageVolunteer.container}>
					{/* 활동 예정 중인 신청 */}
					<View style={[manageVolunteer.title]}>
						<Text style={[txt.noto24]}>{isShelterUser ? '최근 신청서' : '활동 예정중인 신청'} </Text>
					</View>
					<View style={[manageVolunteer.volunteerList]}>
						<VolunteerItemList
							items={notDoneList}
							type={'notDone'}
							onClickItem={goToAssignVolunteer}
							onClickLabel={onClickLabel}
							whenEmpty={whenEmpty()}
							isShelterUser={isShelterUser}
						/>
					</View>

					<View style={[manageVolunteer.separator]}></View>

					{/* 지난 신청 */}
					<View style={[manageVolunteer.title]}>
						<Text style={[txt.noto24]}>{isShelterUser ? '지난 신청서' : '지난 신청'}</Text>
					</View>
					<View style={[showMoreHistory ? manageVolunteer.previous_volunteerList_expanded : manageVolunteer.previous_volunteerList]}>
						<VolunteerItemList
							items={doneList}
							type={'done'}
							isShelterUser={isShelterUser}
							onClickLabel={onClickLabel}
							onClickItem={goToAssignVolunteer}
							whenEmpty={whenEmpty()}
						/>
					</View>

					{/* 지난 내역 더보기 --> [클릭] => 지난 내역 더보기 Container는 사라짐 */}
					{doneList.length > 4 ? (
						<TouchableOpacity style={[manageVolunteer.showMoreContainer]} onPress={showMore}>
							<Text style={[txt.noto22, manageVolunteer.showMoreContainer_text]}>지난 내역 더보기</Text>
							{showMoreHistory ? <Arrow_Up_GRAY20 /> : <Arrow_Down_GRAY20 />}
						</TouchableOpacity>
					) : null}
				</ScrollView>
			</View>
		);
	}
};
