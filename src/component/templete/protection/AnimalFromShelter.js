import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {login_style, animalFromShelter_style} from 'Templete/style_templete';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import {getProtectRequestListByShelterId} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import {EmptyIcon} from 'Root/component/atom/icon';
import DP from 'Root/config/dp';
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
				let gender = '남';
				switch (protectAnimalObject.protect_animal_sex) {
					case 'male':
						gender = '남';
						break;
					case 'female':
						gender = '여';
						break;
					case 'male':
						gender = '성별모름';
						break;
				}
				const title = protectAnimalObject.protect_animal_species + '/' + protectAnimalObject.protect_animal_species_detail + '/' + gender;
				navigation.push('AnimalProtectRequestDetail', {
					id: protectAnimalObject._id,
					title: title,
					writer: protectAnimalObject.protect_request_writer_id._id,
				});
				// navigation.push('ProtectRequestManage', {id: protectAnimalObject._id})
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
