import React from 'react';
import {Text, View, FlatList, RefreshControl} from 'react-native';
import {searchProtectRequest} from 'Templete/style_templete';
import {GRAY10} from 'Root/config/color';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {NETWORK_ERROR, ONLY_CONTENT_FOR_ADOPTION, PET_KIND, PROTECT_LOCATION} from 'Root/i18n/msg';
import {getProtectRequestList} from 'Root/api/shelterapi.js';
import Modal from 'Root/component/modal/Modal';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';
import {Filter60Border, Filter60Filled} from 'Root/component/atom/icon';
import moment from 'moment';

export default ProtectRequestList = ({navigation, route}) => {
	const today = moment();
	const current_date = moment().format('YY.MM.DD');
	const one_month_before = today.clone().subtract(1, 'month').format('YY.MM.DD');
	const [data, setData] = React.useState('false');

	const [filterData, setFilterData] = React.useState({
		from: '',
		to: '',
		city: '',
		protect_animal_species: '',
		shelter_list: [],
		dog: false,
		cat: false,
		etc: false,
	});
	const [onlyAdoptable, setOnlyAdoptable] = React.useState(false);
	const filterRef = React.useRef(false);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getList();
		});
		getList(); //필터가 바뀔 때마다 호출되도록 설정
		return unsubscribe;
	}, [filterData]);

	//보호요청리스트 목록 받기
	const getList = () => {
		const filter = {...filterData, request_number: 100, protect_request_object_id: ''};
		getProtectRequestList(
			{...filter},
			result => {
				console.log('result / getProtectRequestList / ProtectRequestList : ', result.msg.length);
				let res = result.msg;
				res.filter(e => e != null);
				res.map((v, i) => {
					v.protect_animal_sex = v.protect_animal_id.protect_animal_sex;
					v.protect_animal_status = v.protect_animal_id.protect_animal_status;
				});
				setData(res);
				Modal.close();
			},
			err => {
				console.log(`errcallback:${JSON.stringify(err)}`);
				if (err == '검색 결과가 없습니다.') {
					setData([]);
				} else if (err.includes('code 500')) {
					Modal.alert(NETWORK_ERROR);
				}
				Modal.close();
			},
		);
	};

	//보호요청게시글 클릭
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

	//입양 가능한 게시글만 보기 On
	const filterOn = () => {
		// setFilterData({...filterData, adoptable_posts: 'true'});
		setOnlyAdoptable(true);
	};

	//입양 가능한 게시글만 보기 Off
	const filterOff = () => {
		// setFilterData({...filterData, adoptable_posts: 'false'});
		setOnlyAdoptable(false);
	};

	//별도의 API 사용 예정.
	const onOff_FavoriteTag = (bool, index) => {
		setFavoriteEtc(
			{
				collectionName: 'protectrequestobjects',
				target_object_id: getData()[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ProtectRequestList : ', result.msg.favoriteEtc);
				let prevData = [...getData()]; //
				prevData[index].is_favorite = bool;
				setData(prevData);
			},
			err => {
				console.log('err / favoriteEtc / PRotectRequestList : ', err);
			},
		);
	};

	//지역 필터
	const onSelectLocation = () => {
		Modal.popSelectScrollBoxModal(
			[PROTECT_LOCATION],
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
		petKind.splice(0, 0, '동물종류');
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

	//좌상단 필터 모달 호출
	const onPressFilter = () => {
		// console.log('filter', JSON.stringify(filterData));
		Modal.popProtectRequestFilterModal(
			{...filterData},
			arg => {
				if (
					!arg.cat &&
					!arg.dog &&
					!arg.etc &&
					arg.city == '' &&
					arg.from == one_month_before &&
					arg.to == current_date &&
					arg.shelter_list.length == 0
				) {
					console.log('arg', arg);
					setFilterData(arg);
					getList();
					filterRef.current = false;
				} else {
					console.log('arg', arg);
					setFilterData(arg);
					getList();
					filterRef.current = true;
				}
				Modal.close();
			},
			() => {
				Modal.close();
			},
		);
	};

	//검색결과가 없을 경우
	const whenEmpty = () => {
		return <ListEmptyInfo text={'목록이 없습니다..'} />;
	};

	//필터가 적용된 상태의 데이터
	const getData = () => {
		// console.log('data result ', data[0]);
		let filtered = [];
		// console.log('data', data[0]);
		if (filterData.dog) {
			const getDogType = data.filter(e => e.protect_animal_species == '개');
			getDogType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (filterData.cat) {
			const getCatType = data.filter(e => e.protect_animal_species == '고양이');
			getCatType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (filterData.etc) {
			const getEtcType = data.filter(e => e.protect_animal_species != '개' && e.protect_animal_species != '고양이');
			getEtcType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (!filterData.dog && !filterData.cat && !filterData.etc) {
			filtered = data;
		}
		if (onlyAdoptable) {
			filtered = filtered.filter(v => v.protect_request_status == 'rescue');
		}
		// console.log('시작', filterData.from == today.clone().subtract(1, 'month').format('YY.MM.DD'));
		// console.log('종료', filterData.to == current_date);
		if (!(filterData.from == '') || !(filterData.to == '')) {
			// console.log('디폴트 기간이 아님!!');
			let temp = [];
			console.log(filtered.length);
			filtered.map((v, i) => {
				let split_to = filterData.to.split('.');
				let split_from = filterData.from.split('.');
				let fromDate = new Date(parseInt(split_from[0]), split_from[1] - 1, split_from[2]);
				let toDate = new Date(parseInt(split_to[0]), split_to[1] - 1, split_to[2]);
				toDate.setFullYear(toDate.getFullYear() + 100);
				fromDate.setFullYear(fromDate.getFullYear() + 100);
				const register = moment(v.protect_request_date).valueOf();
				const from = fromDate.getTime();
				const to = toDate.getTime();
				// console.log('register ', moment(register), 'time', v.protect_request_date);
				// console.log('종료일보단 적다', register <= to);
				// console.log('시작일보단 이후다', register >= from);
				if (register <= to && register >= from) {
					temp.push(v);
				}
			});
			console.log('temp ', temp.length);
			filtered = temp;
		}
		return filtered;
	};

	const renderItem = ({item, index}) => {
		return <ProtectRequestItem item={item} index={index} />;
	};

	class ProtectRequestItem extends React.PureComponent {
		render() {
			return (
				<>
					<ProtectRequest
						data={getData()[this.props.index]}
						onClickLabel={(status, id) => onClickLabel(status, id, this.props.item)}
						onFavoriteTag={e => onOff_FavoriteTag(e, this.props.index)}
						onPressProtectRequest={() => onPressProtectRequest(this.props.item)}
					/>
				</>
			);
		}
	}

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};
	const onRefresh = () => {
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	const ITEM_HEIGHT = 244 * DP;
	const [refreshing, setRefreshing] = React.useState(false);
	const keyExtractor = React.useCallback(item => item._id.toString(), []);
	const getItemLayout = React.useCallback(
		(data, index) =>
			!data[index]
				? {length: 0, offset: 0, index: index}
				: {
						length: ITEM_HEIGHT,
						offset: ITEM_HEIGHT * index,
						index,
				  },
		[],
	);

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else {
		return (
			<View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
				<View style={[searchProtectRequest.filterView]} key={'header'}>
					<View style={[searchProtectRequest.inside]}>
						<View style={[searchProtectRequest.shadow_filter]}>
							{filterRef.current ? <Filter60Filled onPress={onPressFilter} /> : <Filter60Border onPress={onPressFilter} />}
						</View>
						<View style={[searchProtectRequest.onOffBtnView]}>
							<View style={[searchProtectRequest.onOffBtnMsg]}>
								<Text style={[txt.noto20, {color: GRAY10}]}>{ONLY_CONTENT_FOR_ADOPTION}</Text>
							</View>
							<View style={[searchProtectRequest.onOffSwitch]}>
								<OnOffSwitch onSwtichOn={filterOn} onSwtichOff={filterOff} />
							</View>
						</View>
						{/* <View style={{flexDirection: 'row'}}>
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
						</View> */}
					</View>
				</View>
				<FlatList
					data={getData()}
					style={{backgroundColor: '#fff'}}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					keyExtractor={keyExtractor}
					getItemLayout={getItemLayout}
					refreshing
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					ListEmptyComponent={whenEmpty}
					// https://reactnative.dev/docs/optimizing-flatlist-configuration
					// removeClippedSubviews={true}
					extraData={refreshing}
					// maxToRenderPerBatch={5} // re-render를 막는군요.
					windowSize={11}
					// https://reactnative.dev/docs/optimizing-flatlist-configuration
				/>
			</View>
		);
	}
};

ProtectRequestList.defaultProps = {};
