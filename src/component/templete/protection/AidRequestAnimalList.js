import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AidRequestList from 'Root/component/organism/list/AidRequestList';
import {temp_style, baseInfo_style, login_style} from 'Templete/style_templete';
import {getShelterProtectAnimalList} from 'Root/api/shelterapi';
import {getApplyDetailById} from 'Root/api/protectapi';
import {aidRequestList} from 'Organism/style_organism copy';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10} from 'Root/config/color';
import {AddItem64} from 'Root/component/atom/icon';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';

//ShelterMenu => 보호요청 게시글 작성하기 버튼 클릭
//연관 테이블 : ShelterProtectAnimalObject
export default AidRequestAnimalList = ({route, navigation}) => {
	const [data, setData] = React.useState([]);
	const [hasPostAnimalList, setHasPostAnimalList] = React.useState([]);
	const [noPostAnimalList, setNoPostAnimalList] = React.useState([]);
	const [notFilteredData, setNotFilteredData] = React.useState('');
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정

	React.useEffect(() => {
		// 토큰을 토대로 해당 보호소의 보호동물 목록을 서버로부터 가져옴.
		getShelterProtectAnimalList(
			{
				shelter_protect_animal_object_id: '',
				request_number: '',
			},
			result => {
				// console.log('result.msg', result.msg);
				setData(result.msg);
				const protectAnimalList = result.msg;
				let notFiltered = [];

				protectAnimalList.map((value, index) => {
					// console.log('v.protectActApplicants', value.protect_act_applicants);
					const protectActivities_id = value.protect_act_applicants;
					protectActivities_id.map((protect_activity_value, protect_activity_index) => {
						// console.log('v', index, protect_activity_value);
						//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
						//현재 protect_animal_status(보호동물 오브젝트 테이블을 update) 를 바꾸는 API가 없는 상태이므로 신청 및 확정이 완료된 동물이더라도
						//getShelterProtectAnimalList API를 통해 들어오는 모든 보호동물들의 protect_animal_status 는 'rescue' 상태로 온다
						//우선 해당 보호동물에 대한 입양 및 보호 신청서들의 _id 배열로 map 을 실행  => getApplyDetailById(신청서 상세조회) 접속
						// 만약 신청서 배열값들중 status=='accept'인 것이 단 하나라도 존재한다면 보호소를 떠난 동물로 취급하고 출력을 시키지 말아야함
						// 모든 것은 API가 도착하면 개선이 가능
						//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
						getApplyDetailById(
							{
								protect_act_object_id: protect_activity_value,
							},
							res => {
								console.log('result / getApplyDetailById / AidRequestManage  ', protect_activity_index, res.msg);
								const protect_activity_object = res.msg;
								protect_activity_object.protect_animal_id = index;
								notFiltered.push(res.msg);
							},
							err => {
								console.log('err / getApplyDetailById / AidRequestManage   ', err);
							},
						);
					});
				});
				setTimeout(() => {
					setNotFilteredData(notFiltered);
				}, 1500);
			},
			err => {
				console.log('err / getShelterProtectAnimalList / AidRequestAnimalList   :  ', err);
				// setData(err);
				setTimeout(() => {
					setLoading(false);
				}, 1500);
			},
		);
	}, []);

	React.useEffect(() => {
		// console.log('notFltered', notFilteredData);
		if (notFilteredData != '') {
			const filtered_by_status = notFilteredData.filter(e => e.protect_act_status == 'accept');
			let index_of_acceptItem = [];
			filtered_by_status.map((v, i) => {
				index_of_acceptItem.push(v.protect_animal_id);
			});
			const index_dup_deleted = Array.from(new Set(index_of_acceptItem));
			let protect_animal_list_copy = [...data];
			index_dup_deleted.map((v, i) => {
				protect_animal_list_copy.splice(v, 1);
			});
			// console.log('protect_animal_list_copy', protect_animal_list_copy);
			setData(protect_animal_list_copy);
			setTimeout(() => {
				setLoading(false);
			}, 1500);
		} else {
			console.log('waiting');
			let hasPostList = [];
			let noPostList = [];
			data.map((v, i) => {
				if (v.protect_animal_protect_request_id != null) {
					hasPostList.push(v);
				} else {
					noPostList.push(v);
				}
			});

			setTimeout(() => {
				setHasPostAnimalList(hasPostList);
				setNoPostAnimalList(noPostList);
				setLoading(false);
			}, 1500);
		}
	}, [notFilteredData]);

	const onSelectHasPostList = index => {
		//SendHeader에 보내는 파라미터 - 선택된 요청게시글의 protect_animal_protect_request_id , 네비게이션 네임
		// navigation.setParams({data: data[index], nav: route.name});
		console.log('onSelectNoPostList / index', index);

		// Modal.popAdoptionInfoModal();
	};

	const onSelectNoPostList = index => {
		console.log('onSelectNoPostList / index', index);
	};

	const onPressAddProtectAnimal = () => {
		navigation.push('AssignProtectAnimalImage');
		// navigation.push('WriteAidRequest');
	};

	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, width: '100%', marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 보호 중인 동물이 없습니다.</Text>
			</View>
		);
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
				<ScrollView style={{flex: 1}}>
					<View style={[style.container]}>
						<TouchableOpacity onPress={onPressAddProtectAnimal} style={[style.addItemContainer]}>
							<AddItem64 />
							<Text style={[txt.noto30, style.addProtectedPetText]}>보호중인 동물 추가하기</Text>
						</TouchableOpacity>
						<Text style={[txt.noto24, style.text]}>보호 요청글 게시 필요</Text>
						<View style={[style.aidRequestList]}>
							<AidRequestList items={noPostAnimalList} onSelect={onSelectNoPostList} selectBorderMode={false} whenEmpty={whenEmpty} needPost={true} />
						</View>
						<Text style={[txt.noto24, style.text]}>보호 요청글 게시 완료</Text>
						<View style={[style.aidRequestList]}>
							<AidRequestList items={hasPostAnimalList} onSelect={onSelectHasPostList} selectBorderMode={false} whenEmpty={whenEmpty} />
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
};

const style = StyleSheet.create({
	container: {
		// width: 654 * DP,
		// width: 654 * DP,
		// width: 654 * DP,
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
});
