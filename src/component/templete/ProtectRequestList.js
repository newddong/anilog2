import React from 'react';
import {ScrollView, Text, View, ActivityIndicator} from 'react-native';
import {login_style, protectRequestList, searchProtectRequest, temp_style} from './style_templete';
import AnimalNeedHelpList from '../organism_ksw/AnimalNeedHelpList';
import {GRAY10} from 'Root/config/color';
import OnOffSwitch from '../molecules/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {ONLY_CONTENT_FOR_ADOPTION, PET_KIND, PET_PROTECT_LOCATION} from 'Root/i18n/msg';
import FilterButton from '../molecules/FilterButton';
import {getProtectRequestList, getProtectRequestListByShelterId} from 'Root/api/shelterapi.js';
import {getPettypes} from 'Root/api/userapi';

export default ProtectRequestList = ({navigation, route}) => {
	const [data, setData] = React.useState([]);
	const [showAdoptable, setShowAdoptable] = React.useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [loading, setLoading] = React.useState(true); //로딩상태
	const [filterData, setFilterData] = React.useState({
		city: '',
		protect_animal_species: '',
		adoptable_posts: false,
		protect_request_object_id: '',
		request_number: 10,
	});
	const [petTypes, setPetTypes] = React.useState(['동물종류']);
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getList();
		});

		const getList = () => {
			getProtectRequestList(
				filterData,
				data => {
					// console.log('data' + JSON.stringify(`data${data}`));
					// console.log('보호요청 ', data.msg[0]);
					// data.msg.forEach(e => console.log('forEach', e.protect_animal_id.protect_animal_sex, e.protect_animal_id.protect_animal_status));
					let filtered = [...data.msg];
					data.msg.forEach(each => {
						each.protect_animal_sex = each.protect_animal_id.protect_animal_sex;
						each.protect_animal_status = each.protect_animal_id.protect_animal_status;
					});
					// setData(data.msg);
					//아직 입양 완료된 목록을 제외하고 조회하는 API가 없음. 수동 처리
					if (filterData.adoptable_posts) {
						filtered = data.msg.filter(e => e.protect_request_status != 'complete');
						setData(filtered);
						setTimeout(() => {
							setLoading(false);
						}, 1500);
						// console.log('length', filtered.length);
					} else {
						setData(data.msg);
						setTimeout(() => {
							setLoading(false);
						}, 1500);
					}
				},
				err => {
					console.log(`errcallback:${JSON.stringify(err)}`);
					if (err == '검색 결과가 없습니다.') {
						setData([]);
					}
					setTimeout(() => {
						setLoading(false);
					}, 1500);
				},
			);
		};
		getList();
		return unsubscribe;
	}, [filterData]);

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

	const onClickLabel = (status, id, item) => {
		//data에는 getProtectRequestList(어떠한 필터도 없이 모든 보호요청게시글을 출력)의 결과값이 담겨있음
		//따라서 출력할 것을 해당 게시글의 작성자(보호소)가 작성한 보호요청게시글로 좁혀야함
		// console.log('item:', item);
		let sexValue = '';
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: item.protect_request_writer_id._id,
				protect_request_status: 'all',
				protect_request_object_id: null,
				request_number: 10,
			},
			result => {
				switch (item.protect_animal_sex) {
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
				const titleValue = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + sexValue;
				navigation.navigate('AnimalProtectRequestDetail', {item: item, list: result.msg, title: titleValue});
			},
			err => {
				console.log('err / getProtectRequestListByShelterId / ProtectRequestList   : ', err);
			},
		);
	};

	const filterOn = () => {
		// alert('입양 가능한 게시글만 보기');
		console.log('입양 가능한 게시글만 보기');
		setFilterData({...filterData, adoptable_posts: true});
	};
	const filterOff = () => {
		// alert('입양 가능한 게시글만 보기 끄기');
		console.log('입양 가능한 게시글만 OFF');
		setFilterData({...filterData, adoptable_posts: false});
	};
	//별도의 API 사용 예정.
	const onOff_FavoriteTag = (value, index) => {
		console.log('즐겨찾기=>' + value + ' ' + index);
	};
	//지역 필터
	const onSelectLocation = location => {
		location == '지역' ? setFilterData({...filterData, city: ''}) : setFilterData({...filterData, city: location});
	};
	//동물종류 필터
	const onSelectKind = kind => {
		kind == '동물종류' ? setFilterData({...filterData, protect_animal_species: ''}) : setFilterData({...filterData, protect_animal_species: kind});
	};
	//검색결과가 없을 경우
	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 검색결과가 없습니다.</Text>
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
					<View style={[searchProtectRequest.filterView]}>
						<View style={[searchProtectRequest.filterView.inside]}>
							<View style={{flexDirection: 'row'}}>
								<View style={[temp_style.filterBtn]}>
									<FilterButton menu={PET_PROTECT_LOCATION} onSelect={onSelectLocation} width={306} height={700} />
								</View>
								<View style={[temp_style.filterBtn]}>
									<FilterButton menu={petTypes} onSelect={onSelectKind} width={306} />
								</View>
							</View>
							{/* 입양 가능한 게시물만 보기 */}
							<View style={[searchProtectRequest.filterView.onOffBtnView]}>
								<View style={[searchProtectRequest.filterView.onOffBtnMsg]}>
									<Text style={[txt.noto20, {color: GRAY10}]}>{ONLY_CONTENT_FOR_ADOPTION}</Text>
								</View>
								<View style={[temp_style.onOffSwitch, searchProtectRequest.filterView.onOffSwitch]}>
									<OnOffSwitch onSwtichOn={filterOn} onSwtichOff={filterOff} />
								</View>
							</View>
						</View>
					</View>
					<View style={[searchProtectRequest.animalNeedHelpList]}>
						{/* <AnimalNeedHelpList data={data} onClickLabel={onClickLabel} onFavoriteTag={onOff_FavoriteTag} /> */}
						{/* <ActivityIndicator  */}
						<AnimalNeedHelpList data={data} onClickLabel={onClickLabel} onFavoriteTag={onOff_FavoriteTag} whenEmpty={whenEmpty()} />
					</View>
				</ScrollView>
			</View>
		);
	}
};

ProtectRequestList.defaultProps = {};
