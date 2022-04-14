import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AidRequestList from 'Root/component/organism/list/AidRequestList';
import {login_style} from 'Templete/style_templete';
import {getShelterProtectAnimalList} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10} from 'Root/config/color';
import {AddItem64} from 'Root/component/atom/icon';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';

//ShelterMenu => 보호요청 게시글 작성하기 버튼 클릭
//연관 테이블 : ShelterProtectAnimalObject
export default AidRequestAnimalList = ({route, navigation}) => {
	const [hasPostAnimalList, setHasPostAnimalList] = React.useState('false');
	const [noPostAnimalList, setNoPostAnimalList] = React.useState('false');

	React.useEffect(() => {
		// 토큰을 토대로 해당 보호소의 보호동물 목록을 서버로부터 가져옴.
		getShelterProtectAnimalList(
			{
				shelter_protect_animal_object_id: '',
				request_number: '',
			},
			result => {
				// console.log('result.msg', result.msg);
				let hasPostList = result.msg.hasRequest.filter(e => e.protect_animal_status != 'adopt');
				let noPostList = result.msg.noRequest.filter(e => e.protect_animal_status != 'adopt');
				setHasPostAnimalList(hasPostList);
				setNoPostAnimalList(noPostList);
			},
			err => {
				console.log('err / getShelterProtectAnimalList / AidRequestAnimalList   :  ', err);
				setHasPostAnimalList([]);
				setNoPostAnimalList([]);
			},
		);
	}, []);

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
		navigation.navigate('AnimalProtectRequestDetail', {
			id: data.protect_animal_protect_request_id,
			title: titleValue,
			writer: userGlobalObject.userInfo._id,
		});
	};

	const onSelectHasPostList = index => {
		Modal.popAdoptionInfoModal(
			hasPostAnimalList[index],
			'이 동물은 이미 보호 요청글 게시가  완료되었습니다.',
			'다시 게시하기',
			'게시글 보기',
			() => moveToProtectRequest(hasPostAnimalList[index]),
			() => navigation.push('WriteAidRequest', {data: hasPostAnimalList[index]}),
		);
	};

	const onSelectNoPostList = index => {
		console.log('onSelectNoPostList / index', index);
		Modal.popAdoptionInfoModalWithOneBtn(noPostAnimalList[index], '보호요청 글쓰기', () =>
			navigation.push('WriteAidRequest', {data: noPostAnimalList[index]}),
		);
	};

	const onPressAddProtectAnimal = () => {
		navigation.push('AssignProtectAnimalImage');
	};

	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, width: '100%', marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 보호 중인 동물이 없습니다.</Text>
			</View>
		);
	};

	//API 접속 이전 상태인 false가 단 하나라도 없으면 이미 로딩완료
	const isLoaded = hasPostAnimalList == 'false' || noPostAnimalList == 'false';

	if (isLoaded) {
		return <Loading isModal={false} />;
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
