import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {login_style, animalFromShelter_style} from 'Templete/style_templete';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import {getProtectRequestListByShelterId, getShelterProtectAnimalList} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';

//ShelterMenu => 나의 보호소 출신 동물
export default AnimalFromShelter = ({route}) => {
	const token = route.params;
	const navigation = useNavigation();
	const [data, setData] = React.useState([]); //AnimalNeedHelpList에 보낼 리스트정보
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정

	React.useEffect(() => {
		getProtectRequestListByShelterId(
			//현재 로그인한 보호소의 고유 _id를 파라미터로 보내고
			//_id를 통해 얻어온 보호소의 보호 요청 게시글 리스트를 출력
			{
				shelter_userobject_id: token,
				protect_request_status: 'complete',
				protect_request_object_id: null,
				request_number: '',
			},
			result => {
				// console.log('result / getProtectRequestListByShelterId / AnimalFromShelter', result);
				setData(result.msg);
				Modal.close();
				setTimeout(() => {
					setLoading(false);
				}, 500);
				// 받아온 protect_animal_protect_Request_id로 해당 게시글 좋아요 여부도 판별해야함
			},
			err => {
				console.log('err / getProtectRequestListByShelterId / AnimalFromShelter', err);
				setTimeout(() => {
					setLoading(false);
				}, 500);
				Modal.close();
			},
		);
	}, [route]);

	//라벨 클릭
	const onClickLabel = (status, user_id, protectAnimalObject) => {
		// console.log('status , id => ' + status + '_' + user_id);
		// console.log('item', item._id);
		console.log(protectAnimalObject);
		Modal.popAnimalInfoModal(
			protectAnimalObject,
			() => navigation.push('ProtectRequestManage', {item: protectAnimalObject, list: data}),
			() => navigation.push('AdoptorInformation', protectAnimalObject),
		);
	};

	//테두리 모드 On 상태에서 입양처 보기 클릭
	const onPressAdoptorInfo = data => {
		console.log('item / onPressAdoptorInfo', data);
		// 61c7104c10b3b3bf4acbd20b
		navigation.push('AdoptorInformation', data);
	};

	// 테두리 모드 On 상태에서 게시글보기 클릭 => AnimapProtectRequestDetail == ProtectRequestManage
	const onPressProtectRequest = item => {
		// console.log('item', item);
		navigation.push('ProtectRequestManage', {item: item, list: data});
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
				<View style={[animalFromShelter_style.container]}>
					{data.length == 0 ? (
						<Text style={[txt.roboto28b, {marginTop: 200}]}>아직 입양 완료된 보호소 출신의 보호 동물이 없네요.</Text>
					) : (
						<AnimalNeedHelpList
							data={data}
							// borderMode={true}
							onClickLabel={onClickLabel}
							onPressAdoptorInfo={onPressAdoptorInfo}
							onPressProtectRequest={onPressProtectRequest}
						/>
					)}
				</View>
			</View>
		);
	}
};

AnimalFromShelter.defaultProps = {
	data: [],
};
