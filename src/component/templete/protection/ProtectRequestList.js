import React from 'react';
import {Text, View, ActivityIndicator, FlatList} from 'react-native';
import {login_style, searchProtectRequest, temp_style} from 'Templete/style_templete';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import {GRAY10} from 'Root/config/color';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {ONLY_CONTENT_FOR_ADOPTION, PET_KIND, PET_PROTECT_LOCATION} from 'Root/i18n/msg';
import {getProtectRequestList} from 'Root/api/shelterapi.js';
import {getPettypes} from 'Root/api/userapi';
import {btn_w306_h68} from 'Component/atom/btn/btn_style';
import ArrowDownButton from 'Root/component/molecules/button/ArrowDownButton';
import Modal from 'Root/component/modal/Modal';

export default ProtectRequestList = ({navigation, route}) => {
	const [data, setData] = React.useState('false');
	const [filterData, setFilterData] = React.useState({
		city: '',
		protect_animal_species: '',
		// adoptable_posts: 'false', // 입양 가능한 게시글만 보기 필터는 굳이 api에 한 번 더 접속할 필요가 없으므로 제외처리
		protect_request_object_id: '',
		request_number: 10000,
	});
	const [onlyAdoptable, setOnlyAdoptable] = React.useState(false);

	const getList = () => {
		getProtectRequestList(
			filterData,
			result => {
				// console.log('result / getProtectRequestList / ProtectRequestList : ', result.msg);
				result.msg.forEach(each => {
					each.protect_animal_sex = each.protect_animal_id.protect_animal_sex;
					each.protect_animal_status = each.protect_animal_id.protect_animal_status;
				});
				setData(result.msg);
				Modal.close();
			},
			err => {
				console.log(`errcallback:${JSON.stringify(err)}`);
				if (err == '검색 결과가 없습니다.') {
					setData([]);
				}
				Modal.close();
			},
		);
	};

	React.useEffect(() => {
		Modal.popLoading();
		const unsubscribe = navigation.addListener('focus', () => {
			getList();
		});
		getList(); //필터가 바뀔 때마다 호출되도록 설정
		return unsubscribe;
	}, [filterData]);

	const onClickLabel = (status, id, item) => {
		let sexValue = '';
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
		navigation.navigate('AnimalProtectRequestDetail', {id: item._id, title: titleValue, writer: item.protect_request_writer_id._id});
	};

	const filterOn = () => {
		console.log('입양 가능한 게시글만 보기');
		// setFilterData({...filterData, adoptable_posts: 'true'});
		setOnlyAdoptable(true);
	};
	const filterOff = () => {
		console.log('입양 가능한 게시글만 OFF');
		// setFilterData({...filterData, adoptable_posts: 'false'});
		setOnlyAdoptable(false);
	};

	//별도의 API 사용 예정.
	const onOff_FavoriteTag = (value, index) => {
		console.log('즐겨찾기=>' + value + ' ' + index);
	};

	//지역 필터
	const onSelectLocation = () => {
		Modal.popSelectScrollBoxModal(
			[PET_PROTECT_LOCATION],
			'보호 지역 선택',
			selected => {
				selected == '지역' ? setFilterData({...filterData, city: ''}) : setFilterData({...filterData, city: selected});
				Modal.close();
			},
			() => {
				Modal.close();
			},
		);
	};

	//동물종류 필터
	const onSelectKind = async () => {
		const fetchPetKindData = await PET_KIND();
		let petKind = fetchPetKindData.map((v, i) => v.pet_species);
		Modal.popSelectScrollBoxModal(
			[petKind],
			'동물 종류 선택',
			selected => {
				selected == '동물종류'
					? setFilterData({...filterData, protect_animal_species: ''})
					: setFilterData({...filterData, protect_animal_species: selected});

				Modal.close();
			},
			() => {
				Modal.close();
			},
		);
	};

	//검색결과가 없을 경우
	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 검색결과가 없습니다.</Text>
			</View>
		);
	};

	const getData = () => {
		return onlyAdoptable ? data.filter(v => v.protect_request_status == 'rescue') : data;
	};

	if (data == 'false') {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<FlatList
					horizontal={false}
					data={[{}]}
					listKey={({item, index}) => index}
					renderItem={({item, index}) => (
						<View style={{}}>
							<View style={[searchProtectRequest.filterView]}>
								<View style={[searchProtectRequest.filterView.inside]}>
									<View style={{flexDirection: 'row'}}>
										<View style={[temp_style.filterBtn]}>
											<ArrowDownButton
												onPress={onSelectLocation}
												btnTitle={filterData.city || '지역'}
												btnLayout={btn_w306_h68}
												btnStyle={'border'}
												btnTheme={'gray'}
											/>
										</View>
										<View style={[temp_style.filterBtn]}>
											<ArrowDownButton
												onPress={onSelectKind}
												btnTitle={filterData.protect_animal_species || '동물 종류'}
												btnLayout={btn_w306_h68}
												btnStyle={'border'}
												btnTheme={'gray'}
											/>
										</View>
									</View>
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
								<AnimalNeedHelpList data={getData()} onClickLabel={onClickLabel} onFavoriteTag={onOff_FavoriteTag} whenEmpty={whenEmpty()} />
							</View>
						</View>
					)}
				/>
			</View>
		);
	}
};

ProtectRequestList.defaultProps = {};
