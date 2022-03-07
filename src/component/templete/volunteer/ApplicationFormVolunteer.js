import React from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Linking} from 'react-native';
import {APRI10, BLUE20, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {Calendar48_Filled, Person48, Phone48} from 'Atom/icon';
import Modal from 'Root/component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import ShelterInfo from 'Organism/info/ShelterInfo';
import AccountList from 'Organism/list/AccountList';
import {login_style, applicationFormVolunteer, btn_style} from 'Templete/style_templete';
import moment from 'moment';
import {getUserInfoById} from 'Root/api/userapi';
import {setVolunteerActivityAcceptByMember, setVolunteerActivityStatus} from 'Root/api/volunteerapi';
import {hyphened} from 'Root/util/dateutil';
import userGlobalObject from 'Root/config/userGlobalObject';
import {btn_w654} from 'Root/component/atom/btn/btn_style';
import dp from 'Root/config/dp';
import UserDescriptionLabel from 'Root/component/molecules/label/UserDescriptionLabel';

//ApplicationFormVolunteer (봉사활동 신청서 폼) 호출 네비게이트
// ==> ManageVolunteer에서 더보기 클릭, 혹은 AppliesRecord(신청내역)에서 보호소 라벨 클릭 <==

export default ApplicationFormVolunteer = ({route, navigation}) => {
	// console.log('route / ApplicationFormVolunteer', route.params);

	const data = route.params; // 봉사활동 Object
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const isShelterOwner = route.name == 'ShelterVolunteerForm'; // 보호소 계정의 봉사활동 신청관리 루트로 들어왔는지 여부
	// console.log('data', data);
	//봉사활동 지원자 프로필 라벨 채우기 위한 API 접속(차후 한 번에 받아오는 방식으로 전환 필요)
	React.useEffect(() => {
		if (route.name == 'UserVolunteerForm') {
			// console.log('BeforeSplice', data);
			let accompanyList = [];
			data.volunteer_accompany.map((v, i) => {
				accompanyList.push(v.member);
			});
			setTimeout(() => {
				setLoading(false);
			}, 500);
		} else {
			//ShelterVolunteerForm
			// console.log('ShelterVolunteerForm Recieved params', data);
			let accompanyList = [];
			data.volunteer_accompany.map((v, i) => {
				accompanyList.push(v.member);
			});
			setTimeout(() => {
				setLoading(false);
			}, 500);
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
							navigation.navigate('UserMenu');
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
				//활동완료(done) : 봉사활동이 완료된 상태 [App에서의 표기 : '활동 완료']
				//신청거절(notaccept) : 보호소에서 거절 [App에서의 표기 : '취소(보호소)']
				//신청승인(accept) : 보호소에서 승인 [App에서의 표기 : '활동 예정' - 참여 인원은 본인이 승인했을 경우임. 거절하면 '활동 거절'로 표기]
				//보호소승인대기(waiting) : 참여 리더가 신청한 직후 상태   [App에서의 표기 : '승인 대기']
				//신청취소(cancel) : 참여 리더가 신청취소한 상태 [App에서의 표기 : '활동 취소']
				setVolunteerActivityStatus(
					{volunteer_activity_object_id: data._id, volunteer_status: 'accept'},
					result => {
						console.log('result / setVolunteerActivityStatus / 활동 승인', result);
						Modal.popNoBtn('활동 승인이 완료되었습니다!');
						setTimeout(() => {
							Modal.close();
							navigation.navigate('ShelterMenu');
						}, 1000);
					},
					err => {
						console.log('err / acceptVolunteer', err);
					},
				);
			},
		);
	};

	//보호소 계정이 봉사활동 신청서 활동거절을 눌렀을 때
	const onPressReject = () => {
		console.log('before press confirm', data);
		Modal.popOneBtnSelectModal(
			['보호소 사정으로 해당 날짜는 봉사가 불가합니다.', '해당 날짜에는 이미 봉사활동 인원이 다 찼습니다', '해당 날짜는 보호소 휴일입니다.'],
			'활동 거절을 하시겠습니까? \n  거절 사유를 선택해주세요.',
			selected => {
				// alert(selected);
				setVolunteerActivityStatus(
					{
						volunteer_activity_object_id: data._id,
						volunteer_status: 'notaccept',
						volunteer_reason_of_notaccept: selected,
					},
					result => {
						console.log('result / setVolunteerActivityStatus / 활동 거절', result);
						Modal.popNoBtn('봉사활동이 거절 되었습니다.');
						setTimeout(() => {
							Modal.close();
							navigation.navigate('ShelterMenu');
						}, 1000);
					},
					err => {
						console.log('err / acceptVolunteer', err);
					},
				);
			},
			'확인',
			30,
		);
	};

	const onPressPhoneCall = () => {
		Linking.openURL(`tel:${data.volunteer_delegate_contact}`);
	};

	//참여 인원 라벨 클릭
	const onClickLabel = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	const parsing_wish_date = v => {
		let date = moment(v).format('YYYY.MM.DD');
		return date;
	};

	const onPressAccept = () => {
		setVolunteerActivityAcceptByMember(
			{
				volunteer_activity_object_id: data._id,
				confirm: 'accept',
			},
			result => {
				console.log('result / setVolunteerActivityAcceptByMember / :', result.msg);
				Modal.popNoBtn('참여 확정되었습니다!');
				setTimeout(() => {
					Modal.close();
					navigation.navigate('UserMenu');
				}, 500);
			},
			err => {
				console.log('err /setVolunteerActivityAcceptByMember Accept / err : ', err);
			},
		);
	};

	const onPressNotAccept = () => {
		setVolunteerActivityAcceptByMember(
			{
				volunteer_activity_object_id: data._id,
				confirm: 'notaccept',
				// volunteer_reason_of_notaccept:
			},
			result => {
				console.log('result / setVolunteerActivityAcceptByMember / :', result.msg);
				Modal.popNoBtn('참여 거절되었습니다.');
				setTimeout(() => {
					Modal.close();
					navigation.navigate('UserMenu');
				}, 500);
			},
			err => {
				console.log('err /setVolunteerActivityAcceptByMember / err : ', err);
			},
		);
	};

	const getAccompanyItem = (v, i) => {
		let status = '';
		if (v.confirm == 'accept') {
			status = '참여 확정';
		} else if (v.confirm == 'notaccept') {
			status = '참여 불가';
		} else {
			status = '수락 대기중';
		}
		return (
			<View style={[applicationFormVolunteer.accompanyItem]} key={i}>
				<View style={[applicationFormVolunteer.accompanyItemLabel]}>
					<UserDescriptionLabel data={v.member} onClickLabel={onClickLabel} width={300} />
				</View>
				<Text style={[txt.noto24, {color: GRAY10}]}>{status}</Text>
			</View>
		);
	};

	const onPressAlreadyConfirm = () => {
		Modal.alert('이미 참여 확정된 봉사활동입니다. \n 혹시 참여가 어려우실 경우 \n 대표자 혹은 대상 보호소에 연락 요청드립니다.');
	};
	const onPressAlreadyRejected = () => {
		Modal.alert('이미 참여 불가된 봉사활동은 대표자 \n 혹은 대상 보호소에 문의 부탁드립니다.');
	};

	//보호소의 봉사활동 신청서 관리일 경우
	const getButtonWhenShelter = () => {
		let wishdate = moment(data.volunteer_wish_date[0]).toDate(); //봉사활동 희망날짜 배열에서 첫번째 값을 받아와 Date타입으로 치환
		let thisTime = new Date().getTime(); // 현재 시간
		if (wishdate < thisTime) {
			//봉사활동 날짜가 이미 지난 경우
			const volunteerDate = moment(data.volunteer_wish_date[0]).format('YY.MM.DD');
			let title = '활동 완료';
			switch (data.volunteer_status) {
				case 'accept':
				case 'done':
					title = volunteerDate + ' / 활동 완료';
					break;
				case 'notaccept':
					title = volunteerDate + ' / 활동 거절';
					break;
				case 'cancel':
					title = volunteerDate + ' / 활동 취소';
					break;
				case 'waiting':
					title = volunteerDate + ' / 만  료';
					break;

				default:
					break;
			}
			return <AniButton btnLayout={btn_w654} titleFontStyle={32} btnTitle={title} btnStyle={'border'} />;
		} else {
			//보호소 계정이며 봉사활동까지 시간이 남아있는 경우
			console.log('data.volunteer_status', data.volunteer_status);
			if (data.volunteer_status == 'accept') {
				return (
					<View style={[applicationFormVolunteer.notAcceptText]}>
						<Text style={[txt.roboto28, {color: APRI10}]}>이미 신청 승락하신 봉사활동입니다.</Text>
					</View>
				);
			} else if (data.volunteer_status == 'notaccept') {
				//보호소가 거절한 경우
				const notAcceptTitle = '(사유 - ' + data.volunteer_reason_of_notaccept + ')';
				return (
					<View style={[applicationFormVolunteer.notAcceptText]}>
						<Text style={[txt.roboto32, {color: APRI10}]}>다음의 사유로 신청거절 하셨습니다.</Text>
						<Text style={[txt.roboto24, {color: APRI10}]}>{notAcceptTitle}</Text>
					</View>
				);
			} else if (data.volunteer_status == 'cancel') {
				//봉사활동신청자가 취소한 경우
				return (
					<View style={[applicationFormVolunteer.notAcceptText]}>
						<Text style={[txt.roboto28, {color: APRI10}]}>봉사활동 신청자가 해당 건을 취소하였습니다.</Text>
					</View>
				);
			} else if (data.volunteer_status == 'waiting') {
				//보호소 승락 대기 상태 중인 경우
				return (
					<View style={[applicationFormVolunteer.btnContainer]}>
						<AniButton onPress={onPressReject} btnStyle={'border'} btnTitle={'활동 거절'} />
						<AniButton onPress={onPressConfirm} btnStyle={'border'} btnTitle={'활동 승인'} />
					</View>
				);
			}
		}
	};

	//유저 계정일 경우 페이지 하단 출력되는 버튼 분기 처리
	const getButtonWhenUser = () => {
		//활동승인(accept) : 참여인원이 승인 [App에서 표기 : '참여 확정']
		//활동거절(notaccept) : 참여인원이 거절 [App에서 표기 : '참여 불가']
		//활동승인대기(waiting) : 참여인원 수락 대기중 [App에서 표기 : '수락 대기중']
		let find = data.volunteer_accompany.find(e => e.member._id == userGlobalObject.userInfo._id);
		// console.log('find', find);
		let wishdate = moment(data.volunteer_wish_date[0]).toDate(); //봉사활동 희망날짜 배열에서 첫번째 값을 받아와 Date타입으로 치환
		let thisTime = new Date().getTime(); // 현재 시간
		if (wishdate < thisTime) {
			//현재 시간보다 이전인 모든 봉사활동 신청서는 넓은 버튼에 내역을 담는다
			const volunteerDate = moment(data.volunteer_wish_date[0]).format('YY.MM.DD');
			let title = '활동 완료';
			switch (data.volunteer_status) {
				case 'accept':
				case 'done': //활동완료
					title = volunteerDate + ' / 활동 완료';
					break;
				case 'notaccept': //보호소거절
					title = volunteerDate + ' / 활동 거절';
					break;
				case 'cancel': //유저취소
					title = volunteerDate + ' / 활동 취소';
					break;
				case 'waiting': //미처리상태로 시간이 지남
					title = volunteerDate + ' / 만  료';
					break;
				default:
					break;
			}
			return (
				<View style={[applicationFormVolunteer.notAcceptText]}>
					<Text style={[txt.roboto28, {color: APRI10}]}>{title}</Text>
				</View>
			);
		} else {
			//봉사활동까지 시간이 남아있는 경우
			if (data.volunteer_status == 'notaccept') {
				//보호소로부터 거절 당한 경우
				const notAcceptTitle = '(사유 - ' + data.volunteer_reason_of_notaccept + ')';
				return (
					<View style={[applicationFormVolunteer.notAcceptText]}>
						<Text style={[txt.roboto32, {color: APRI10}]}>활동 거절</Text>
						<Text style={[txt.roboto24, {color: APRI10}]}>{notAcceptTitle}</Text>
					</View>
				);
			} else if (data.volunteer_status == 'cancel') {
				//봉사활동신청자가 취소한 경우
				let canceledText = '';
				data.volunteer_accompany[0].member._id == userGlobalObject.userInfo._id
					? (canceledText = '해당 건을 이미 취소하셨습니다.') //신청자 본인
					: (canceledText = '봉사활동 신청자가 해당 건을 취소하였습니다.'); //참여자
				return (
					<View style={[applicationFormVolunteer.notAcceptText]}>
						<Text style={[txt.roboto28, {color: APRI10}]}>{canceledText}</Text>
					</View>
				);
			} else if (data.volunteer_status == 'waiting' || data.volunteer_status == 'accept') {
				//봉사활동 신청이 수락되었거나 보호소 승락 대기 상태 중인 경우
				if (data.volunteer_accompany[0].member._id == userGlobalObject.userInfo._id) {
					//봉사활동 신청 당사자인 경우
					return <AniButton onPress={onPressCancel} btnTitle={'신청 취소'} btnStyle={'border'} />;
				} else if (find.confirm == 'accept') {
					//accept(참여 확정 상태일 경우 )
					return <AniButton onPress={onPressAlreadyConfirm} btnTitle={'참여 확정 상태'} btnStyle={'border'} />;
				} else if (find.confirm == 'notaccept') {
					return <AniButton onPress={onPressAlreadyRejected} btnTitle={'참여 거절 상태'} btnStyle={'border'} />;
				} else {
					return (
						<View style={[applicationFormVolunteer.btnContainer]}>
							<AniButton onPress={onPressNotAccept} btnStyle={'border'} btnTitle={'참여 불가'} />
							<AniButton onPress={onPressAccept} btnStyle={'border'} btnTitle={'참여 확정'} />
						</View>
					);
				}
			}
		}
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
							<ShelterInfo data={data} route={route.name} />
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
								<Text style={[txt.roboto28, {marginLeft: 5, marginTop: 2}]}>
									{data.volunteer_accompany_number ? data.volunteer_accompany_number : '0'}
								</Text>
							</View>
						</View>
						{/* 참여 리스트 */}
						<View style={[applicationFormVolunteer.participants_step2]}>
							{/* <AccountList items={applicant} onClickLabel={onClickLabel} makeBorderMode={false} showCrossMark={false} /> */}
							{data.volunteer_accompany.map((v, i) => {
								return getAccompanyItem(v, i);
							})}
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
									<Text style={[txt.roboto28, {color: BLUE20, textDecorationLine: 'underline'}]}>
										{hyphened(data.volunteer_delegate_contact) || ''}
									</Text>
								</TouchableOpacity>
							) : (
								<Text style={[txt.roboto28]}>{hyphened(data.volunteer_delegate_contact) || ''}</Text>
							)}
						</View>
					</View>
					{isShelterOwner ? (
						<View style={[applicationFormVolunteer.buttonContainer, {justifyContent: 'center'}]}>{getButtonWhenShelter()}</View>
					) : (
						<View style={[applicationFormVolunteer.buttonContainer, {justifyContent: 'center'}]}>{getButtonWhenUser()}</View>
					)}
				</ScrollView>
			</View>
		);
	}
};
