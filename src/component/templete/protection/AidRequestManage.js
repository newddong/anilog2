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

//ShelterMenu => 보호중인 동물 [Nav명 - ShelterProtectAnimalList]
export default AidRequestManage = ({route, navigation}) => {
	// console.log('AidRequestManage');
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [hasPostAnimalList, setHasPostAnimalList] = React.useState([]);
	const [noPostAnimalList, setNoPostAnimalList] = React.useState([]);

	React.useEffect(() => {
		getShelterProtectAnimalList(
			{
				shelter_protect_animal_object_id: '',
				request_number: '',
			},
			result => {
				// console.log('result / getShelterProtectAnimalList / ShelterProtectAnimalList', result.msg);
				const protectAnimalList = result.msg.filter(e => e.protect_animal_status != 'adopt'); //입양 완료 건에 대해서만 제외()
				let hasPostList = [];
				let noPostList = [];
				protectAnimalList.map((v, i) => {
					// console.log('v', v.protect_animal_protect_request_id);
					v.protect_animal_protect_request_id != null ? hasPostList.push(v) : noPostList.push(v);
				});
				setTimeout(() => {
					setHasPostAnimalList(hasPostList);
					setNoPostAnimalList(noPostList);
					setLoading(false);
				}, 500);
			},
			err => {
				console.log('err / getShelterProtectAnimalList', err);
				setTimeout(() => {
					setLoading(false);
				}, 500);
				// setData(err);
			},
		);
	}, []);

	const addProtectAnimal = () => {
		navigation.push('AssignProtectAnimalImage');
	};

	const moveToProtectRequest = data => {
		let sexValue = '';
		switch (data.protect_animal_sex) {
			case 'male':
				sexValue = '남';
				break;
			case 'female':
				sexValue = '여';
				break;
			case 'male':
				sexValue = '성별모름';
				break;
		}
		const titleValue = data.protect_animal_species + '/' + data.protect_animal_species_detail + '/' + sexValue;
		// navigation.navigate('AnimalProtectRequestDetail', {item: data, title: titleValue});
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
			() => moveToProtectRequest(hasPostAnimalList[index]),
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
