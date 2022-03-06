import React from 'react';
import {ActivityIndicator, ScrollView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {login_style, temp_style, baseInfo_style} from 'Templete/style_templete';
import AidRequestList from 'Root/component/organism/list/AidRequestList';
import {getAnimalListWithApplicant, getShelterProtectAnimalList} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10} from 'Root/config/color';
import {getApplyDetailById} from 'Root/api/protectapi';
import DP from 'Root/config/dp';
import {AddItem64} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import {lo} from '../style_address';

//ShelterMenu => 신청서 조회 [Nav명 - ProtectApplyList]
//ShelterMenu => 보호중인 동물 [Nav명 - ShelterProtectAnimalList]
export default AidRequestManage = ({route, navigation}) => {
	const token = route.params.token;
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [data, setData] = React.useState([]);
	const [hasPostAnimalList, setHasPostAnimalList] = React.useState([]);
	const [noPostAnimalList, setNoPostAnimalList] = React.useState([]);
	const [notFilteredData, setNotFilteredData] = React.useState([]);
	const isShelterProtect = route.name == 'ShelterProtectAnimalList';

	React.useEffect(() => {
		if (isShelterProtect) {
			// 보호중인 동물이므로 입양 및 임시보호가 완료된 보호동물들은 출력이 되어서는 안됨
			//protect_animal_status !='adopt' or 'protect'일 경우 제외되어야 함
			//차후 API 다듬는 과정에서 추가 필요
			getShelterProtectAnimalList(
				{
					// shelter_protect_animal_object_id: '',
					request_number: 10,
				},
				result => {
					// console.log('result / getShelterProtectAnimalList / ShelterProtectAnimalList', result.msg[0]);
					//현재 protect_animal_status 를 바꾸는 API가 없는 상태이므로 신청 및 확정이 완료된 동물이더라도
					//모든 보호소의 보호동물들은 protect_animal_status == 'rescue' 상태로 온다
					//우선 해당 보호동물에 대한 입양 및 보호 신청 _id를 토대로 getApplyDetailById 접속
					// 만약 status가 단 하나라도 'accept' 인 것이 있다면 출력을 시키지 말아야함
					// 모든 것은 API가 도착하면 개선이 가능
					//api 에서 hasRequest와 noRequest로 오지만 hasRequest에는 noRequest obejct도 추가되어있어 그걸 리스트에서 빼주는 과정
					setData(result.msg);
					const hasList = result.msg.hasRequest;
					const noList = result.msg.noRequest;
					const stringhasList = [];
					const stringNoList = [];
					const newHasList = [];

					const loop = hasList.map((value, idx) => {
						stringhasList.push(JSON.stringify(value));
					});
					const loop2 = noList.map((value, idx) => {
						stringNoList.push(JSON.stringify(value));
					});
					let difference = stringhasList.filter(x => !stringNoList.includes(x));
					const loop3 = difference.map((value, index) => {
						newHasList.push(JSON.parse(value));
					});

					setHasPostAnimalList(newHasList);
					setNoPostAnimalList(noList);
					setLoading(false);
					console.log('noList', newHasList);
					// notFiltered = [];
					// protectAnimalList.map((value, index) => {
					// console.log('map', value);
					// const protectActivities_id = value.protect_act_applicants;
					// protectActivities_id.map((protect_activity_value, protect_activity_index) => {
					// console.log('v', index, protect_activity_value);
					// getApplyDetailById(
					// 	{
					// 		protect_act_object_id: protect_activity_value,
					// 	},
					// 	res => {
					// 		// console.log('result / getApplyDetailById / AidRequestManage  ', protect_activity_index, res.msg);
					// 		const protect_activity_object = res.msg;
					// 		protect_activity_object.protect_animal_id = index;

					// 		notFiltered.push(res.msg);
					// 		// const isAccepted = protect_activity_object.protect_act_status == 'accept';
					// 		// console.log('isAccepted', index, protect_activity_index, isAccepted);
					// 		// isAccepted ? shelterProtectAnimalList_notAccepted.push(protectAnimalList[index]) : null;
					// 		// setNotFilteredData(shelterProtectAnimalList_notAccepted);
					// 		// // setData(result.msg);
					// 	},
					// 	err => {
					// 		console.log('err / getApplyDetailById / AidRequestManage   ', err);
					// 	},
					// );
					// });
					// });
				},
				err => {
					console.log('err / getShelterProtectAnimalList', err);
					setTimeout(() => {
						setLoading(false);
					}, 500);
					// setData(err);
				},
			);
		} else {
			//token(id)를 토대로 보호소 계정이 등록한 보호요청 게시글 중 신청서가 들어와 있는 목록을 조회
			console.log('ProtectApplyList');
			getAnimalListWithApplicant(
				{},
				result => {
					console.log('result / getAnimalListWithApplicant / ProtectApplyList', result.msg);
					let merged = []; //페이지 이동 후 입양 신청한
					result.msg.map((data, i) => {
						data.shelter_name = route.params.shelter_name;
						// console.log('data', i, data);
						//출력된 보호요청게시글들이 가지는 지원신청서가 혹시 accept 상태인 것이 있는 경우 ( == 입양/임보가 확정-취소-신청취소 된 상태 )
						// ==> 출력되어서는 안됨
						const hasApplicantsWaitng = data.protect_act_applicants.some(
							e => e.protect_act_status == 'accept' || e.protect_act_status == 'denied' || e.protect_act_status == 'cancel',
						);
						!hasApplicantsWaitng ? merged.push(data) : false;
					});
					setData(merged);
					setTimeout(() => {
						setLoading(false);
					}, 500);
				},
				err => {
					console.log('err / getAnimalListWithApplicant', err);
					setTimeout(() => {
						setLoading(false);
					}, 500);
					// setData(err);
				},
			);
			onSelect;
		}
	}, []);

	// React.useEffect(() => {
	// 	// 보호소의 모든 보호동물이 담겨 있는 notFilteredData
	// 	// 해당 보호동물에 대한 [입양/지원] 신청서가 있을 경우 해당 신청서들을 탐색
	// 	// 탐색의 목적 => 신청서들 중 상태가 'accept'된 항목이 있을 경우 이미 보호소를 떠난 동물로 판단
	// 	if (notFilteredData != null) {
	// 		// const isNotProtect = notFilteredData.filter(e => e.protect_act_type == 'protect');
	// 		// console.log('isNotProtect', isNotProtect);
	// 		console.log('waiting');

	// 		const filtered_by_status = notFilteredData.filter(e => e.protect_act_status == 'accept');
	// 		let index_of_acceptItem = [];
	// 		filtered_by_status.map((v, i) => {
	// 			index_of_acceptItem.push(v.protect_animal_id);
	// 		});
	// 		const index_dup_deleted = Array.from(new Set(index_of_acceptItem));
	// 		let protect_animal_list_copy = [...data];
	// 		index_dup_deleted.map((v, i) => {
	// 			protect_animal_list_copy.splice(v, 1);
	// 		});
	// 		// setData(protect_animal_list_copy);
	// 		let hasPostList = [];
	// 		let noPostList = [];
	// 		protect_animal_list_copy.map((v, i) => {
	// 			console.log('v', v.protect_animal_protect_request_id);
	// 			if (v.protect_animal_protect_request_id != null) {
	// 				hasPostList.push(v);
	// 			} else {
	// 				noPostList.push(v);
	// 			}
	// 		});
	// 		setTimeout(() => {
	// 			setHasPostAnimalList(hasPostList);
	// 			setNoPostAnimalList(noPostList);
	// 			setLoading(false);
	// 		}, 1500);
	// 	} else {
	// 		console.log('waiting');
	// 		let hasPostList = [];
	// 		let noPostList = [];
	// 		data.map((v, i) => {
	// 			console.log('v', v.protect_animal_protect_request_id);
	// 			if (v.protect_animal_protect_request_id != null) {
	// 				hasPostList.push(v);
	// 			} else {
	// 				noPostList.push(v);
	// 			}
	// 		});

	// 		setTimeout(() => {
	// 			setHasPostAnimalList(hasPostList);
	// 			setNoPostAnimalList(noPostList);
	// 			setLoading(false);
	// 		}, 1000);
	// 	}
	// }, [notFilteredData]);

	//선택 시 이동
	const onSelect = index => {
		console.log('index', data[index]);
		!isShelterProtect
			? navigation.push('ProtectApplicant', data[index])
			: console.log('ShelterProtectAnimalList에서는 네비게이션 정의가 안됨', data[index]);
	};

	const addProtectAnimal = () => {
		navigation.push('AssignProtectAnimalImage');
		// navigation.push('WriteAidRequest');
	};

	const onSelectHasPostList = index => {
		//SendHeader에 보내는 파라미터 - 선택된 요청게시글의 protect_animal_protect_request_id , 네비게이션 네임
		// navigation.setParams({data: data[index], nav: route.name});
		console.log('onSelectNoPostList / index', index);
		Modal.popAdoptionInfoModal(
			hasPostAnimalList[index],
			'이 동물은 이미 보호 요청글 게시가  완료되었습니다.',
			'다시 게시하기',
			'게시글 보기',
			// ()=> navigation.navigate('AnimalProtectRequestDetail', {item: item, list: protectActList, title: titleValue}),
			() => alert('게시글보기'),
			//현재 보호요청게시글에 접근하기 위해서 API 3가지를 별개로 접근하고 파라미터를 보내줘야 하는 상황
			// AnimalProtectRequestDetail의 API 접근방식이 개선된 이후 처리 필요
			() => navigation.push('WriteAidRequest', {data: hasPostAnimalList[index]}),
		);
	};

	const onSelectNoPostList = index => {
		console.log('onSelectNoPostList / index', index);
		Modal.popAdoptionInfoModalWithOneBtn(noPostAnimalList[index], '보호요청 글쓰기', () =>
			navigation.push('WriteAidRequest', {data: noPostAnimalList[index]}),
		);
	};

	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, width: '100%', marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 목록이 없습니다.</Text>
			</View>
		);
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView style={{flex: 1}}>
					<View style={[style.container]}>
						<TouchableOpacity onPress={addProtectAnimal} style={[style.addItemContainer]}>
							<AddItem64 />
							<Text style={[txt.noto30, style.addProtectedPetText]}>보호중인 동물 추가하기</Text>
						</TouchableOpacity>
						<Text style={[txt.noto24, style.text]}>보호 요청글 게시 필요</Text>
						<View style={[style.aidRequestList]}>
							<AidRequestList
								items={noPostAnimalList}
								onSelect={onSelectNoPostList}
								needPost={true}
								whenEmpty={whenEmpty}
								selectBorderMode={false}
								callFrom={route.name}
							/>
						</View>
						<Text style={[txt.noto24, style.text]}>보호 요청글 게시 완료</Text>
						<View style={[style.aidRequestList]}>
							<AidRequestList
								items={hasPostAnimalList}
								onSelect={onSelectHasPostList}
								whenEmpty={whenEmpty}
								selectBorderMode={false}
								callFrom={route.name}
							/>
						</View>
					</View>
					{/* <View style={[temp_style.aidRequestList_aidRequestManage, baseInfo_style.list]}>
						{data.length == 0 ? (
							<Text style={[txt.noto30, {alignSelf: 'center', marginTop: 130, color: GRAY10}]}>목록이 비어있습니다.</Text>
						) : (
							<AidRequestList
								items={data}
								onPressAddProtectAnimal={addProtectAnimal}
								onSelect={onSelect}
								callFrom={route.name}
								selectBorderMode={false}
							/>
						)}
					</View> */}
				</ScrollView>
			</View>
		);
	}
};
// 61c1cc107be07611b00945f9

const style = StyleSheet.create({
	container: {
		// width: 654 * DP,
		alignItems: 'center',
	},
	addItemContainer: {
		width: 654 * DP,
		height: 174 * DP,
		borderRadius: 30 * DP,
		marginRight: 14 * DP,
		borderColor: APRI10,
		borderWidth: 2 * DP,
		marginTop: 30 * DP,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	aidRequestList: {
		// backgroundColor: 'yellow',
	},
	addProtectedPetText: {
		marginLeft: 10 * DP,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: APRI10,
	},
	text: {
		marginTop: 40 * DP,
		width: 654 * DP,
		marginBottom: -10 * DP,
	},
	shareDropDown: {
		width: 384 * DP,
		height: 184 * DP,
		position: 'absolute',
		right: 0,
		top: 80 * DP,
		flexDirection: 'row',
		borderRadius: 40 * DP,
		borderTopEndRadius: 0,
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		opacity: 0.9,
		paddingLeft: 60 * DP,
		shadowOffset: {
			height: 5 * DP,
		},
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 4.67,
		elevation: 3,
	},
});
