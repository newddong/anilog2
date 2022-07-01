import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {login_style, animalFromShelter_style} from 'Templete/style_templete';
import {getProtectRequestListByShelterId} from 'Root/api/shelterapi';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';

//ShelterMenu => 나의 보호소 출신 동물
export default AnimalFromShelter = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false'); //AnimalNeedHelpList에 보낼 리스트정보

	React.useEffect(() => {
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: userGlobalObject.userInfo._id,
				protect_request_status: 'complete',
				protect_request_object_id: null,
				request_number: '',
			},
			result => {
				// console.log('result / getProtectRequestListByShelterId / AnimalFromShelter', result.msg[0]);
				setData(result.msg);
			},
			err => {
				console.log('err / getProtectRequestListByShelterId / AnimalFromShelter', err);
				setData([]);
			},
		);
	}, [route]);

	//라벨 클릭
	const onClickLabel = (status, user_id, protectAnimalObject) => {
		// console.log('protectAnimalObject', protectAnimalObject);
		Modal.popAnimalInfoModal(
			protectAnimalObject,
			() => {
				let gender = '';
				console.log('protectAnimalObject.protect_animal_sex', protectAnimalObject);
				const err = {
					__v: 0,
					_id: '628c6dbbf5726aaaa72f4537',
					is_favorite: false,
					protect_animal_id: {
						__v: 0,
						_id: '626bc6705c3a6c8f3777eeec',
						protect_act_applicants: [],
						protect_animal_belonged_shelter_id: '6256bf50d6ffa0fefe0387c9',
						protect_animal_estimate_age: '1개월',
						protect_animal_neutralization: 'no',
						protect_animal_photo_uri_list: [
							'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1651230320758_rn_image_picker_lib_temp_2cec9b02-da25-4ab9-ac7c-2450ff3676ae.jpg',
						],
						protect_animal_protect_request_id: '628c6dbbf5726aaaa72f4537',
						protect_animal_protector_discussion_id: [],
						protect_animal_rescue_date: '2022-04-05T00:00:00.000Z',
						protect_animal_rescue_location: '둘준',
						protect_animal_sex: 'unknown',
						protect_animal_species: '개',
						protect_animal_species_detail: '믹스견',
						protect_animal_status: 'rescue',
						protect_animal_weight: '1',
					},
					protect_animal_species: '개',
					protect_animal_species_detail: '믹스견',
					protect_recent_comment: {},
					protect_request_comment_count: 0,
					protect_request_content: 'Dz',
					protect_request_date: '2022-05-24T05:31:39.015Z',
					protect_request_favorite_count: 0,
					protect_request_hit: 0,
					protect_request_is_delete: false,
					protect_request_photos_uri: [
						'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1651230320758_rn_image_picker_lib_temp_2cec9b02-da25-4ab9-ac7c-2450ff3676ae.jpg',
					],
					protect_request_status: 'complete',
					protect_request_title: 'dz',
					protect_request_update_date: '2022-05-24T05:31:39.016Z',
				};

				switch (protectAnimalObject.protect_animal_sex) {
					case 'male':
						gender = '/남';
						break;
					case 'female':
						gender = '/여';
						break;
					default:
						gender = '';
						break;
				}
				const title = protectAnimalObject.protect_animal_species + '/' + protectAnimalObject.protect_animal_species_detail + gender;
				navigation.push('AnimalProtectRequestDetail', {
					id: protectAnimalObject._id,
					title: title,
					writer: protectAnimalObject.protect_request_writer_id._id,
				});
			},
			() => navigation.push('AdoptorInformation', protectAnimalObject.protect_animal_id._id),
		);
	};

	const render = ({item, index}) => {
		return (
			<ProtectRequest data={item} onClickLabel={(status, id) => onClickLabel(status, id, item)} onFavoriteTag={e => onPressFavoriteTag(e, index)} />
		);
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView horizontal={false}>
					<ScrollView horizontal={true} scrollEnabled={false}>
						<View style={[animalFromShelter_style.container]}>
							{data.length == 0 ? (
								<ListEmptyInfo text={'아직 입양 완료된 보호소 출신의 보호 동물이 없네요.'} />
							) : (
								// <AnimalNeedHelpList data={data} onClickLabel={onClickLabel} />
								<FlatList data={data} renderItem={render} showsVerticalScrollIndicator={false} />
							)}
						</View>
					</ScrollView>
				</ScrollView>
			</View>
		);
	}
};

AnimalFromShelter.defaultProps = {
	data: [],
};
