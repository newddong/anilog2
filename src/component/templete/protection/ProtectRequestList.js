import React from 'react';
import {Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {searchProtectRequest} from 'Templete/style_templete';
import {APRI10, GRAY10} from 'Root/config/color';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {NETWORK_ERROR, ONLY_CONTENT_FOR_ADOPTION, PET_KIND, PROTECT_LOCATION} from 'Root/i18n/msg';
import Modal from 'Root/component/modal/Modal';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';
import {Filter60Border, Filter60Filled} from 'Root/component/atom/icon';
import moment from 'moment';
import {getSearchResultProtectRequest} from 'Root/api/protectapi';

export default ProtectRequestList = ({navigation, route}) => {
	const today = moment();
	const current_date = moment().format('YY.MM.DD');
	const one_month_before = today.clone().subtract(1, 'month').format('YY.MM.DD');
	const [data, setData] = React.useState('false');
	const [offset, setOffset] = React.useState(1);
	const LIMIT = 50;
	const [loading, setLoading] = React.useState(false);
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
			if (data != 'false') {
				//처음 페이지 진입시 두번 호출안하도록
				getList();
			}
		});
		getList(); //필터가 바뀔 때마다 호출되도록 설정
		return unsubscribe;
	}, [filterData]);

	//보호요청리스트 목록 받기
	const getList = () => {
		setLoading(true);
		let filter = {protect_animal_species: []}; // api 필터 데이터
		let sdt = ''; //시작일
		let edt = ''; //종료일
		//필터에서 시작일이 선택된 경우
		if (filterData.from != '') {
			let split = filterData.from.split('.'); //시작일 날짜 포맷 일치화 작업
			sdt = '20' + split[0] + split[1] + split[2];
		} else {
			//초기 상태는 현재 날짜에서 한달 이전으로
			sdt = today.clone().subtract(1, 'month').format('YYYYMMDD');
		}
		//필터에서 종료일이 선택된 경우
		if (filterData.to != '') {
			let split = filterData.to.split('.'); //종료일 날짜 포맷 일치화 작업
			edt = '20' + split[0] + split[1] + split[2];
		} else {
			//초기 상태는 현재 날짜
			edt = moment().format('YYYYMMDD');
		}
		//필터에서 보호소 목록이 선택됐을 경우 filter에 추가
		if (filterData.shelter_list.length != 0) {
			filter.shelter_object_id_list = filterData.shelter_list.map(v => v._id);
		}
		//필터에서 지역이 선택됐을 경우 filter에 추가
		if (filterData.city != '' && filterData.city != '모든 지역') {
			filter.city = filterData.city;
		}
		// 개, 고양이, 그 외 선택 상태가 true일 경우 protect_animal_species 배열에 push
		filterData.dog ? filter.protect_animal_species.push('개') : false;
		filterData.cat ? filter.protect_animal_species.push('고양이') : false;
		filterData.etc ? filter.protect_animal_species.push('그 외') : false;
		filter.protect_request_notice_sdt = sdt;
		filter.protect_request_notice_edt = edt;
		// console.log('filterData', filterData);
		// console.log('filter', filter);
		//api 접속
		console.log('offset', offset);
		console.log('data Lenth', data.length);
		// console.log('')
		getSearchResultProtectRequest(
			{
				...filter,
				page: offset,
				limit: LIMIT,
			},
			result => {
				// console.log('result 첫값 :', result.msg[0].protect_animal_id.protect_animal_rescue_location);
				console.log('result length  ', result.msg.length);
				let res = result.msg;
				res.filter(e => e != null);
				res.map((v, i) => {
					v.protect_animal_sex = v.protect_animal_id.protect_animal_sex;
					v.protect_animal_status = v.protect_animal_id.protect_animal_status;
				});
				if (data != 'false') {
					let temp = [...data];
					res.map((v, i) => {
						console.log('i', i, v.protect_animal_id.protect_animal_rescue_location);
						temp.push(v);
					});
					console.log('temp lenth', temp.length);
					setData(temp);
					// setData([...data, ...res.slice(offset * LIMIT, offset * LIMIT + 1)]);
				} else {
					res.map((v, i) => {
						console.log('첫값 : ', i, v.protect_animal_id.protect_animal_rescue_location);
					});
					setData(res);
				}
				setOffset(offset + 1);
				Modal.close();
				setLoading(false);
			},
			err => {
				console.log('err / getSearchResultProtectRequest / ProtectRequestList  ', err);
				if (err.includes('code 500')) {
					Modal.popNetworkErrorModal('서버로부터 보호요청 게시글을 받아오지 못했습니다. 잠시후 다시 시도해주세요.');
				}
				setLoading(false);
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
					setData('false');
					setOffset(1);
					setFilterData(arg);
					filterRef.current = false;
				} else {
					console.log('arg', arg);
					setData('false');
					setOffset(1);
					setFilterData(arg);
					filterRef.current = true;
				}
				Modal.close();
			},
			() => {
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
		setOnlyAdoptable(true);
	};

	//입양 가능한 게시글만 보기 Off
	const filterOff = () => {
		setOnlyAdoptable(false);
	};

	//즐겨찾기 onOff
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

	//검색결과가 없을 경우
	const whenEmpty = () => {
		return <ListEmptyInfo text={'목록이 없습니다..'} />;
	};

	//필터가 적용된 상태의 데이터
	const getData = () => {
		let filtered = [...data];
		if (onlyAdoptable) {
			filtered = filtered.filter(v => v.protect_request_status == 'rescue');
		}
		return filtered;
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('EndReached', getData().length % LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요

		if (getData().length % LIMIT == 0) {
			getList();
		}
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
					onEndReached={onEndReached} //Flatlist 페이징
					onEndReachedThreshold={0.6} //페이징을 하는 타이밍
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					ListEmptyComponent={whenEmpty}
					// https://reactnative.dev/docs/optimizing-flatlist-configuration
					// removeClippedSubviews={true}
					extraData={data}
					// maxToRenderPerBatch={5} // re-render를 막는군요.
					windowSize={11}
					// https://reactnative.dev/docs/optimizing-flatlist-configuration
				/>
				{loading ? (
					<View style={searchProtectRequest.indicatorCont}>
						<ActivityIndicator size="large" color={APRI10} />
					</View>
				) : (
					<></>
				)}
			</View>
		);
	}
};

ProtectRequestList.defaultProps = {};
