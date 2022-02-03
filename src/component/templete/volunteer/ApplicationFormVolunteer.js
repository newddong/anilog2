import React from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BLUE20, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {Calendar48_Filled, Person48, Phone48} from 'Atom/icon';
import Modal from 'Component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import ShelterInfo from 'Organism/info/ShelterInfo';
import AccountList from 'Organism/list/AccountList';
import {login_style, applicationFormVolunteer, btn_style} from 'Templete/style_templete';
import {_dummy_ApplicationFormVolunteer_shelter} from 'Root/config/dummy_data_hjs';
import {Linking} from 'react-native';
import moment from 'moment';
import {getUserInfoById} from 'Root/api/userapi';
import {setVolunteerActivityStatus} from 'Root/api/volunteerapi';

//ApplicationFormVolunteer (봉사활동 신청서 폼) 호출 네비게이트
// ==> ManageVolunteer에서 더보기 클릭, 혹은 AppliesRecord(신청내역)에서 보호소 라벨 클릭 <==

export default ApplicationFormVolunteer = ({route, navigation}) => {
	// console.log('route / ApplicationFormVolunteer', route.params);
	const [data, setData] = React.useState(route.params); // 봉사활동 Object
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [applicant, setApplicant] = React.useState([]); // 봉사활동 지원자 배열 (Object배열)
	const isShelterOwner = route.name == 'ShelterVolunteerForm'; // 보호소 계정의 봉사활동 신청관리 루트로 들어왔는지 여부

	//봉사활동 지원자 프로필 라벨 채우기 위한 API 접속(차후 한 번에 받아오는 방식으로 전환 필요)
	React.useEffect(() => {
		if (route.name == 'UserVolunteerForm') {
			// console.log('BeforeSplice', data.volunteer_accompany);
			const isNull = data.volunteer_accompany.findIndex(e => e == null); //이유는 모르겠지만 volunteer_accompany 필드에 널값이 지속적으로 들어옴
			isNull != null ? data.volunteer_accompany.splice(isNull, 1) : false; // 널 값은 배열에서 삭제
			const dupRemoved = new Set(data.volunteer_accompany); // 중복값도 삭제
			let accompanies = [...dupRemoved];
			let copy = [...applicant];
			//중복 및 널값이 삭제된 봉사활동 지원자들의 유저Object를 acc State에 담기
			accompanies.map((v, i) => {
				getUserInfoById(
					{
						userobject_id: v,
					},
					result => {
						// console.log('result / getUserInfoById / UserVolunteerForm  ', i, result.msg);
						copy.push(result.msg);
						setApplicant(copy);
					},
					err => {
						console.log('err / getUserInfoById / USerVolunteerForm  ', err);
					},
				);
			});
			// console.log('[...dup]', acc);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		} else {
			//ShelterVolunteerForm
			console.log('ShelterVolunteerForm Recieved params', route.params.volunteer_accompany);
			setApplicant(data.volunteer_accompany);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, []);

	//일반 봉사활동 신청자 계정이 신청 취소 버튼을 눌렀을 때
	const onPressCancel = () => {
		Modal.popTwoBtn(
			'봉사활동 신청을 취소하시겠습니까? ',
			'아니오',
			'그래요',
			() => Modal.close(),
			() => {
				Modal.close();
				//봉사활동 신청 취소 - 대상 봉사활동의 고유 아이디를 보내고 해당 봉사활동의 봉사활동자 목록(volunteer_accompany)에서 현재 유저를 제외.
				//만약 현재 봉사활동자 목록이 단 한명이 남은 상태(로그인 유저)라면 봉사활동 자체가 취소 상태로 되는 로직 구현 필요
				setVolunteerActivityStatus(
					{
						volunteer_activity_object_id: data._id,
						volunteer_status: 'cancel',
					},
					result => {
						console.log('result / setVolunteerActivity / Cancel  : ', result);
						Modal.popNoBtn('봉사활동이 취소되었습니다.');
						setTimeout(() => {
							Modal.close();
							navigation.goBack();
						}, 500);
					},
					err => {
						console.log('err', err);
					},
				);
			},
		);
	};

	// 해당 보호소 계정이 봉사활동 신청서 활동승인 버튼을 눌렀을 때
	const onPressConfirm = () => {
		console.log('before press confirm', data);
		Modal.popTwoBtn(
			'활동 승인을 하시겠습니까? \n 추가 안내는 개별 연락이 필요합니다.',
			'취소',
			'승인',
			() => Modal.close(),
			() => {
				Modal.close();
				setVolunteerActivityStatus(
					{volunteer_activity_object_id: data._id, volunteer_status: 'accept'},
					result => {
						console.log('result / setVolunteerActivityStatus / 활동 승인', result);
						Modal.popNoBtn('활동 승인이 완료되었습니다!');
						setTimeout(() => {
							Modal.close();
							navigation.goBack();
						}, 1000);
					},
					err => {
						console.log('err / acceptVolunteer', err);
					},
				);
			},
		);
	};

	const onPressPhoneCall = () => {
		Linking.openURL(`tel:${data.volunteer_delegate_contact}`);
	};

	const onClickLabel = data => {
		// console.log('data', data);
		navigation.push('UserProfile', {userobject: data});
	};

	const parsing_wish_date = v => {
		let date = moment(v).format('YYYY.MM.DD');
		return date;
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView contentContainerStyle={[applicationFormVolunteer.container]} showsVerticalScrollIndicator={false}>
					{/* 보호소 정보 박스 (보호소 계정 본인이면 안보여야한다) */}
					{isShelterOwner ? (
						<></>
					) : (
						<View style={[applicationFormVolunteer.shelterInfo]}>
							<ShelterInfo data={data} />
						</View>
					)}
					{/* 봉사활동 희망날짜 */}
					<View style={[applicationFormVolunteer.viewForm]}>
						<View style={[applicationFormVolunteer.viewForm_step1]}>
							<View style={[applicationFormVolunteer.icon48]}>
								<Calendar48_Filled />
							</View>
							<View style={[applicationFormVolunteer.title]}>
								<Text style={[txt.noto24b, {color: GRAY10}]}>봉사활동 희망 날짜</Text>
							</View>
						</View>
						<View style={{}}>
							{Array(data.volunteer_wish_date.length / data.volunteer_wish_date.length >= 3 ? 3 : 1) //페이징 3개 단위로 나눔
								.fill(1) // undefined면 값이 호출되지 않으니 1로 일괄 추가
								.map((v, pagingNumber) => {
									return (
										<View key={pagingNumber} style={[applicationFormVolunteer.wish_date_separator]}>
											{data.volunteer_wish_date.map((v, i) => {
												if (Math.floor(i / 3) == pagingNumber)
													// 페이징 기준인 3으로 나눈 몫이 각 pagingNumber값과 일치하는 경우만 출력
													return (
														<Text key={i} style={[txt.roboto28, {paddingLeft: 5}]}>
															{parsing_wish_date(v)} {' / '}
														</Text>
													);
											})}
										</View>
									);
								})}
						</View>
					</View>
					{/* 참여인원 */}
					<View style={[applicationFormVolunteer.participants]}>
						<View style={[applicationFormVolunteer.participants_step1]}>
							<View style={[applicationFormVolunteer.icon48]}>
								<Person48 />
							</View>
							<View style={[applicationFormVolunteer.title]}>
								<Text style={[txt.noto24b, {color: GRAY10}]}>참여 인원</Text>

								<Text style={[txt.roboto28, {marginLeft: 5, marginTop: 2}]}>{data.volunteer_accompany ? applicant.length : '0'}</Text>
							</View>
						</View>
						{/* 참여 리스트 */}
						<View style={[applicationFormVolunteer.participants_step2]}>
							<AccountList items={applicant} onClickLabel={onClickLabel} makeBorderMode={false} showCrossMark={false} />
						</View>
					</View>
					{/* 봉사활동자 연락처 */}
					<View style={[applicationFormVolunteer.participants_contact]}>
						<View style={[applicationFormVolunteer.viewForm_step1]}>
							<View style={[applicationFormVolunteer.icon48]}>
								<Phone48 />
							</View>
							<View style={[applicationFormVolunteer.title]}>
								<Text style={[txt.noto24b, {color: GRAY10}]}>봉사 활동자 연락처</Text>
							</View>
						</View>
						<View style={[applicationFormVolunteer.participants_contact_text]}>
							{isShelterOwner ? (
								<TouchableOpacity onPress={onPressPhoneCall}>
									<Text style={[txt.roboto28, {color: BLUE20, textDecorationLine: 'underline'}]}>{data.volunteer_delegate_contact || ''}</Text>
								</TouchableOpacity>
							) : (
								<Text style={[txt.roboto28]}>{data.volunteer_delegate_contact || ''}</Text>
							)}
						</View>
					</View>
					<View style={[btn_style.btn_w226, applicationFormVolunteer.btn_w226]}>
						{isShelterOwner ? (
							<AniButton onPress={onPressConfirm} btnTitle={'활동 승인'} />
						) : (
							<AniButton onPress={onPressCancel} btnTitle={'신청 취소'} btnStyle={'border'} />
						)}
					</View>
				</ScrollView>
			</View>
		);
	}
};
