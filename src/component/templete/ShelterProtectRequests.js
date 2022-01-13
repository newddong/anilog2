import React from 'react';
import {Text, View} from 'react-native';
import {login_style, temp_style, protectRequestList_style, baseInfo_style} from './style_templete';
import AnimalNeedHelpList from '../organism_ksw/AnimalNeedHelpList';
import {dummy_AnimalNeedHelpList_various_status} from 'Root/config/dummyDate_json';
import {PET_KIND, PROTECT_STATUS} from 'Root/i18n/msg';
import FilterButton from '../molecules/FilterButton';
import MeatBallDropdown from '../molecules/MeatBallDropdown';
import {getProtectRequestList, getProtectRequestListByShelterId} from 'Root/api/shelterapi';
import Modal from '../modal/Modal';
import {txt} from 'Root/config/textstyle';
import {getPettypes} from 'Root/api/userapi';

// ShelterMenu - 보호요청 올린 게시글 클릭
// params - 로그인한 보호소 유저의 _id
export default ShelterProtectRequests = ({route, navigation}) => {
	const [protectAnimalList, setProtectAnimalList] = React.useState([]); // AnimalNeedHelpList 내가 올린 보호요청 게시글 목록 리스트
	const [filterStatus, setFilterStatus] = React.useState('all');
	const [filterSpecies, setFilterSpecies] = React.useState('');
	const [petTypes, setPetTypes] = React.useState(['동물종류']);

	React.useEffect(() => {
		Modal.popNoBtn('잠시만 기다려주세요.');
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: route.params,
				protect_request_status: filterStatus,
				protect_request_object_id: null,
				request_number: 10,
			},
			result => {
				// console.log('result / getProtectRequestList / ShelterProtectRequests', result.msg[3].protect_animal_id.protect_animal_sex);
				const e = {
					__v: 0,
					_id: '61cd6fe807a02d82987e89e2',
					protect_animal_id: {
						__v: 0,
						_id: '61cd6fc307a02d82987e89d9',
						protect_act_applicants: [],
						protect_animal_belonged_shelter_id: '61cbcbfdb6fcf452771af939',
						protect_animal_estimate_age: '5개월',
						protect_animal_neutralization: 'unknown',
						protect_animal_photo_uri_list: [
							'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1640853443151_rn_image_picker_lib_temp_8059e82d-13be-403f-b279-da9676708c7e.jpg',
						],
						protect_animal_protect_request_id: '61cd6fe807a02d82987e89e2',
						protect_animal_protector_discussion_id: [],
						protect_animal_rescue_date: '2021-04-26T00:00:00.000Z',
						protect_animal_rescue_location: '사바나',
						protect_animal_sex: 'male',
						protect_animal_species: '기타 포유류',
						protect_animal_species_detail: '기타',
						protect_animal_status: 'rescue',
						protect_animal_weight: 3,
					},
					protect_animal_species: '기타 포유류',
					protect_animal_species_detail: '기타',
					protect_request_comment_count: 0,
					protect_request_content: '정말 얌전해요원숭이가 들어도 가만히 있을 정도로 예의바르답니다',
					protect_request_date: '2021-12-30T08:38:00.590Z',
					protect_request_favorite_count: 0,
					protect_request_hit: 0,
					protect_request_photos_uri: [
						'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1640853443151_rn_image_picker_lib_temp_8059e82d-13be-403f-b279-da9676708c7e.jpg',
					],
					protect_request_status: 'rescue',
					protect_request_title: '미래의 왕과 만나보세요',
					protect_request_update_date: '2021-12-30T08:38:00.590Z',
					protect_request_writer_id: {
						__v: 0,
						_id: '61cbcbfdb6fcf452771af939',
						pet_family: [],
						shelter_address: {
							brief: '경상남도 함안군 오곡로 121',
							city: '경상남도',
							detail: '후문',
							district: '함안군 칠원읍 1423-171',
							neighbor: '',
						},
						shelter_delegate_contact_number: '01012345678',
						shelter_foundation_date: '2021-12-01T00:00:00.000Z',
						shelter_homepage: '홓',
						shelter_name: '귀리보호소',
						type: 'UserObject',
						user_agreement: {
							is_donation_info: false,
							is_location_service_info: false,
							is_marketting_info: false,
							is_over_fourteen: false,
							is_personal_info: false,
							is_service: false,
						},
						user_denied: false,
						user_email: 'Ogok343@ogok.com',
						user_follow_count: 0,
						user_follower_count: 0,
						user_interests: [],
						user_introduction: '전 오곡보호소입미다',
						user_is_verified_email: false,
						user_is_verified_phone_number: false,
						user_my_pets: [],
						user_name: '오곡보호소',
						user_nickname: '귀리보호소',
						user_password: 'ppppppp0',
						user_phone_number: '0101',
						user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1640745981674_9e37bed2-5122-443f-917e-522a406457d0.jpg',
						user_register_date: '2021-12-29T02:46:21.869Z',
						user_type: 'shelter',
						user_upload_count: 1,
					},
				};
				if (filterSpecies) {
					const filtered = result.msg.filter(e => e.protect_animal_species == filterSpecies);
					// console.log('SEX : ', filtered[3].protect_animal_id);
					// filtered.protect_animal_sex = filtered.protect_animal_id.protect_animal_sex;
					setProtectAnimalList(filtered);
				} else {
					setProtectAnimalList(result.msg);
				}
				Modal.close();
			},
			err => {
				console.log('err / getProtectReqeustListByShelterId / ShelterProtectRequest', err);
				if (err == '검색 결과가 없습니다.') {
					setProtectAnimalList([]);
				}
				Modal.close();
			},
		);
	}, [filterSpecies, filterStatus]);

	React.useEffect(() => {
		getPettypes(
			{},
			types => {
				const species = [...petTypes];
				types.msg.map((v, i) => {
					species[i + 1] = v.pet_species;
				});
				setPetTypes(species);
			},
			err => Modal.alert(err),
		);
	}, []);

	//보호 게시글 목록의 라벨 클릭 콜백
	const onClickLabel = (status, user_id, item) => {
		navigation.push('ProtectRequestManage', {item: item, list: protectAnimalList});
	};

	//보호게시글 목록의 즐겨찾기 태그
	const onFavoriteTag = (state, index) => {
		console.log('state Favorite Tag', state); //state
	};

	//화면 좌측 상단 필터드롭다운
	const onSelectFilter = (v, i) => {
		let filter = v;
		i == 0 ? setFilterSpecies('') : setFilterSpecies(filter);
	};

	//화면 우측상단 요청게시글 상태 선택 드롭다운
	const onSelectMeatball = (v, i) => {
		//입양가능 , 협의중 , 완료
		switch (i) {
			case 0:
				setFilterStatus('rescue');
				break;
			case 1:
				setFilterStatus('discuss');
				break;
			case 2:
				setFilterStatus('complete');
				break;
			default:
				break;
		}
	};

	const whenEmpty = () => {
		return <Text style={[txt.roboto28b, {marginTop: 50, textAlign: 'center'}]}>보호 요청 게시목록이 없습니다. </Text>;
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.filterbutton_view, protectRequestList_style.filterbutton_view]}>
				<View style={[temp_style.filterbutton]}>
					<FilterButton menu={petTypes} width={306} onSelect={onSelectFilter} />
				</View>
				<View style={[temp_style.meatball50]}>
					<MeatBallDropdown menu={PROTECT_STATUS} onSelect={onSelectMeatball} />
				</View>
			</View>
			<View style={[temp_style.baseFlatList_protectRequestList, baseInfo_style.list]}>
				<AnimalNeedHelpList data={protectAnimalList} onClickLabel={onClickLabel} onFavoriteTag={onFavoriteTag} whenEmpty={whenEmpty()} />
			</View>
		</View>
	);
};
