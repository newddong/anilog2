import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {getAdoptInfo} from 'Root/api/shelterapi';
import AnimalProtectDetail from 'Organism/info/AnimalProtectDetail';
import {login_style, btn_style, temp_style, baseInfo_style} from 'Templete/style_templete';
import Modal from 'Root/component/modal/Modal';

// ShelterMenu - 나의 보호소 출신동물 - 입양처 보기
// 연관 테이블 - PRotectionActivityApplicantObject , ProtectRequestObject, ShelterProtectAnimalObject
export default AdoptorInformation = ({route, navigation}) => {
	// console.log('AdoptorInformation request', route.params);
	const [data, setData] = React.useState('');

	React.useEffect(() => {
		getAdoptInfo(
			{
				// protect_animal_object_id: route.params,
				protect_animal_object_id: route.params,
			},
			result => {
				// console.log('result / getAdoptorInfo / AdoptorInformation  : ', result.msg);
				let res = result.msg;
				res.adoptorObject = res.protect_act_applicant_id; //AnimalProtectDetail 컴포넌트의 변수명과 일치시키기 작업
				res = Object.assign(res, res.protect_act_request_article_id); //AnimalProtectDetail 컴포넌트의 변수명과 일치시키기 작업
				res.protect_request_writer_id = res.protect_act_request_shelter_id; //AnimalProtectDetail 컴포넌트의 변수명과 일치시키기 작업
				setData(res);
			},
			err => {
				console.log('err / getAdoptorInfo / AdoptorInformation  : ', err);
				Modal.popOneBtn('오류 발생!', '뒤로 가기', () => navigation.goBack());
			},
		);
	}, []);

	const onClickAdoptor = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	if (data == '') {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<View style={[temp_style.animalProtectDetails_adoptorInformation, baseInfo_style.list]}>
					<AnimalProtectDetail data={data} onClickLabel={onClickAdoptor} nav={route.name} />
				</View>
			</View>
		);
	}
};
