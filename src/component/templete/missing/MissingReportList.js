import React from 'react';
import {ScrollView, Text, View, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import {feedWrite, login_style, missingReportList, searchProtectRequest, temp_style, temp_txt} from 'Templete/style_templete';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import {GRAY10, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {Urgent_Write1, Urgent_Write2} from 'Atom/icon';
import {useNavigation} from '@react-navigation/core';
import FilterButton from 'Molecules/button/FilterButton';
import {PET_KIND, PET_PROTECT_LOCATION} from 'Root/i18n/msg';
import {getMissingReportList} from 'Root/api/feedapi.js';
import {getPettypes} from 'Root/api/userapi';
import {btn_w306_h68} from 'Component/atom/btn/btn_style';
import ArrowDownButton from 'Root/component/molecules/button/ArrowDownButton';
export default MissingReportList = props => {
	const navigation = useNavigation();
	const [showUrgentBtns, setShowUrgentBtns] = React.useState(true); //긴급버튼목록
	const [showActionButton, setShowActionButton] = React.useState(false); // 긴급게시(하얀버전) 클릭 시 - 실종/제보 버튼 출력 Boolean
	const [refreshing, setRefreshing] = React.useState(false);

	const [data, setData] = React.useState([]);
	const [filterData, setFilterData] = React.useState({
		city: '',
		missing_animal_species: '',
		feedobject_id: '',
		request_number: 10,
	});
	const [petTypes, setPetTypes] = React.useState(['동물종류']);

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

	// 실종 데이터 불러오기 (아직 API 미작업 )
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getList();
		});

		console.log('MissingReportList:feedlist of missing', filterData);
		const getList = () => {
			getMissingReportList(
				filterData,
				data => {
					// console.log('getMissingReportList data', data.msg);
					setData(data.msg);
				},
				err => {
					console.log('getMissingReportList Error', err);
					if (err == '검색 결과가 없습니다.') {
						setData([]);
					}
				},
			);
		};
		getList();
		return unsubscribe;
	}, [refreshing, filterData]);

	//제보 게시글 쓰기 클릭
	const moveToReportForm = () => {
		navigation.push('FeedWrite', {feedType: 'Report'});
	};

	//실종 게시글 쓰기 클릭
	const moveToMissingForm = () => {
		navigation.push('FeedWrite', {feedType: 'Missing'});
	};

	//실종제보 게시글의 좋아요 태그 클릭
	const onOff_FavoriteTag = (value, index) => {
		console.log('즐겨찾기=>' + value + ' ' + index);
	};

	const onClickLabel = (status, id, item) => {
		// console.log(`\nMissingReportList:onLabelClick() - status=>${status} id=>${id} item=>${JSON.stringify(item)}`);
		let sexValue = '';
		switch (status) {
			case 'missing':
				switch (item.missing_animal_sex) {
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
				const titleValue = item.missing_animal_species + '/' + item.missing_animal_species_detail + '/' + sexValue;
				navigation.push('MissingAnimalDetail', {title: titleValue, _id: id});
				break;
			case 'report':
				navigation.push('ReportDetail', {_id: id});
				break;
		}
	};
	//제보게시글의 제보자 닉네임 클릭
	const onPressReporter = item => {
		console.log('item', item.feed_writer_id);
		navigation.push('UserProfile', {userobject: item.feed_writer_id});
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
	const onSelectKind = kind => {
		Modal.popSelectScrollBoxModal(
			[petTypes],
			'동물 종류 선택',
			selected => {
				selected == '동물종류'
					? setFilterData({...filterData, missing_animal_species: ''})
					: setFilterData({...filterData, missing_animal_species: selected});

				Modal.close();
			},
			() => {
				Modal.close();
			},
		);
	};

	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 목록이 없습니다.</Text>
			</View>
		);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<ScrollView style={{flex: 1}}>
				<View style={[searchProtectRequest.filterView]}>
					<View style={[searchProtectRequest.filterView.inside]}>
						<View style={{flexDirection: 'row'}}>
							<View style={[temp_style.filterBtn]}>
								{/* <FilterButton menu={PET_PROTECT_LOCATION} btnLayout={btn_w306_h68} onSelect={onSelectLocation} width={306} height={700} /> */}
								<ArrowDownButton
									onPress={onSelectLocation}
									btnTitle={filterData.city || '지역'}
									btnLayout={btn_w306_h68}
									btnStyle={'border'}
									btnTheme={'gray'}
								/>
							</View>
							<View style={[temp_style.filterBtn]}>
								{/* <FilterButton menu={petTypes} btnLayout={btn_w306_h68} onSelect={onSelectKind} width={306} /> */}
								<ArrowDownButton
									onPress={onSelectKind}
									btnTitle={filterData.missing_animal_species || '동물 종류'}
									btnLayout={btn_w306_h68}
									btnStyle={'border'}
									btnTheme={'gray'}
								/>
							</View>
						</View>
					</View>
				</View>
				<View style={[searchProtectRequest.animalNeedHelpList]}>
					{/* 플랫리스트 부분 */}
					<AnimalNeedHelpList
						// data={dummy_MissingReportList}
						data={data}
						onFavoriteTag={(e, index) => onOff_FavoriteTag(e, index)}
						onClickLabel={(status, id, item) => onClickLabel(status, id, item)}
						whenEmpty={whenEmpty()}
					/>
				</View>
			</ScrollView>
			{showUrgentBtns ? (
				<View style={[temp_style.floatingBtn, feedWrite.urgentBtnContainer]}>
					{showActionButton ? (
						<View>
							<View style={[feedWrite.urgentBtnItemContainer]}>
								<TouchableWithoutFeedback onPress={moveToMissingForm}>
									<Text style={[txt.noto32, {color: WHITE}]}>실종</Text>
								</TouchableWithoutFeedback>
							</View>
							<View style={[feedWrite.urgentBtnItemContainer]}>
								<TouchableWithoutFeedback onPress={moveToReportForm}>
									<Text style={[txt.noto32, {color: WHITE}]}>제보</Text>
								</TouchableWithoutFeedback>
							</View>
						</View>
					) : null}
					<View style={[feedWrite.urgentActionButton]}>
						{showActionButton ? (
							<Urgent_Write2 onPress={() => setShowActionButton(!showActionButton)} />
						) : (
							<Urgent_Write1 onPress={() => setShowActionButton(!showActionButton)} />
						)}
					</View>
				</View>
			) : (
				false
			)}
		</View>
	);
};
