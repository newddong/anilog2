import React from 'react';
import {Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {searchProtectRequest} from 'Templete/style_templete';
import {APRI10, GRAY10} from 'Root/config/color';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {NETWORK_ERROR, ONLY_CONTENT_FOR_ADOPTION, PROTECT_REQUEST_MAIN_LIMIT} from 'Root/i18n/msg';
import Modal from 'Root/component/modal/Modal';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';
import {Filter60Border, Filter60Filled} from 'Root/component/atom/icon';
import moment from 'moment';
import {getSearchResultProtectRequest} from 'Root/api/protectapi';
import protect_obj from 'Root/config/protect_obj';
import {useNavigation} from '@react-navigation/core';
import userGlobalObject from 'Root/config/userGlobalObject';

export default ProtectRequestList = ({route}) => {
	const navigation = useNavigation();
	const today = moment();
	const current_date = moment().format('YY.MM.DD');
	const one_month_before = today.clone().subtract(1, 'month').format('YY.MM.DD');
	const [data, setData] = React.useState('false');
	const [offset, setOffset] = React.useState(1);
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
	const flatlist = React.useRef();
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// filterRef.current ? false : fetchData(); //포커스마다 새로 fetch를 시도하면 상세글을 갔다가 메인페이지로 돌아와도 기존의 스크롤로 이동을 하지 않음
			// console.log('리뷰 게시글 전역변수 길이 :  ', community_obj.review.length);
			console.log('protect_obj.protect.length : ', protect_obj.protect.length);
			if (protect_obj.protect.length > 0) {
				// let temp = [...data];
				console.log('protect_obj. on Focus :: ', protect_obj.protect[0].is_favorite);
				setData(protect_obj.protect);
			}
		});
		return unsubscribe;
		userGlobalObject.protectionTab.t = true;
	}, []);

	React.useEffect(() => {
		getList(); //필터가 바뀔 때마다 호출되도록 설정
	}, [filterData]);

	// React.useEffect(() => {
	// 	if (route.params?.pressed != 0) {
	// 		moveToTop();
	// 		// console.log('represseddddd');
	// 	}
	// }, [route.params]);
	//보호요청리스트 목록 받기
	const getList = isRefresh => {
		isRefresh ? false : setLoading(true);
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
		//api 접속
		console.log('offset', offset);
		console.log('data Lenth', data.length);
		getSearchResultProtectRequest(
			{
				...filter,
				page: isRefresh ? 1 : offset,
				limit: PROTECT_REQUEST_MAIN_LIMIT,
			},
			result => {
				// console.log('result 첫값 :', result.msg[0].protect_animal_id.protect_animal_rescue_location);
				console.log('result length  ', result.msg.length);
				let res = result.msg;
				res.filter(e => e != null); //간헐적으로 오는 null 익셉션 처리
				//오브젝트 뎁스 일치화 작업
				res.map((v, i) => {
					v.protect_animal_sex = v.protect_animal_id.protect_animal_sex;
					v.protect_animal_status = v.protect_animal_id.protect_animal_status;
				});
				//data=='false'라면 첫 페이지 호출임
				let list = [];
				if (isRefresh || data == 'false') {
					list = res;
				} else {
					// 페이징 호출 분기
					let temp = [...data];
					res.map((v, i) => {
						temp.push(v);
					});
					console.log('temp lenth', temp.length);
					list = temp;
				}
				setData(list);
				protect_obj.protect = list;
				setOffset(offset + 1); //데이터를 추가한 뒤 페이지 ++
				Modal.close();
				setLoading(false); //로딩 Indicator 종료
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
				//필터에 변동사항이 없을 경우 필터 처리 미적용
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
					filterRef.current = false; //필터에 변동사항이 없을 경우 필터 처리 미적용
					setData('false');
					setOffset(1);
					setFilterData(arg);
				} else {
					console.log('arg', arg);
					setData('false');
					setOffset(1);
					setFilterData(arg);
					filterRef.current = true; //필터에 변동사항이 존재할시 필터 처리 적용
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
		console.log('EndReached', getData().length % PROTECT_REQUEST_MAIN_LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요

		if (getData().length % PROTECT_REQUEST_MAIN_LIMIT == 0) {
			getList();
		}
	};
	const moveToTop = () => {
		flatlist.current.scrollToOffset({animated: true, offset: 0});
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
		// setData('false');
		setOffset(1);
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

	React.useEffect(() => {
		refreshing ? getList(true) : false;
	}, [refreshing]);

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
					extraData={refreshing}
					// maxToRenderPerBatch={5} // re-render를 막는군요.
					windowSize={11}
					ref={flatlist}
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
