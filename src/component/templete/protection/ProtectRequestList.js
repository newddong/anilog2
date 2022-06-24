import React from 'react';
import {Text, View, FlatList, RefreshControl, ActivityIndicator, StyleSheet} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_ANIMAL_PROFILE, NETWORK_ERROR, ONLY_CONTENT_FOR_ADOPTION, PROTECT_REQUEST_MAIN_LIMIT} from 'Root/i18n/msg';
import Modal from 'Root/component/modal/Modal';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';
import {Filter60Border, Filter60Filled} from 'Root/component/atom/icon';
import moment from 'moment';
import {getSearchResultProtectRequest, getSearchResultProtectRequestImprovingV1} from 'Root/api/protectapi';
import protect_obj from 'Root/config/protect_obj';
import {useNavigation} from '@react-navigation/core';
import DP from 'Root/config/dp';
import ProtectedThumbnail from 'Root/component/molecules/media/ProtectedThumbnail';
import {ScrollView} from 'native-base';

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
				setData(protect_obj.protect);
			}
		});
		navigation.setOptions({title: ' '});
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		getList(); //필터가 바뀔 때마다 호출되도록 설정
	}, [filterData]);

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
		let params = {
			...filter,
			page: isRefresh ? 1 : offset,
			limit: PROTECT_REQUEST_MAIN_LIMIT,
		};
		// if (data != 'false') {
		// 	params.target_protect_desertion_no = data[data.length - 1].protect_desertion_no;
		// 	params.target_protect_request_date = moment(data[data.length - 1].protect_request_date).format('YYYYMMDD');
		// }
		console.log('params', params);
		getSearchResultProtectRequest(
			params,
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
					list = [...data, ...res];
				}
				console.log('getSearchResultProtectRequest length', list.length);
				setData(list);
				protect_obj.protect = list;
				Modal.close();
				setOffset(offset + 1); //데이터를 추가한 뒤 페이지 ++
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
	const onClickLabel = item => {
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
				// setData(prevData); //useState로 View를 다시 그리면 UI Thread가 멈추는 현상 발견 임시 주석 처리
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
	const getData = React.useCallback(() => {
		let filtered = [...data];
		if (onlyAdoptable) {
			filtered = filtered.filter(v => v.protect_request_status == 'rescue');
		}
		return filtered;
	},[data]);

	//리스트 페이징 작업
	const onEndReached = ({distanceFromEnd}) => {
		console.log('distanceFromEnd', distanceFromEnd);
		console.log('EndReached', getData().length % PROTECT_REQUEST_MAIN_LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요

		// if (getData().length % PROTECT_REQUEST_MAIN_LIMIT == 0) {
		// 	getList();
		// }
	};

	const [closePaging, setClosePaging] = React.useState(true);

	const onScroll = e => {
		// let y = e.nativeEvent.contentOffset.y;
		const To = PROTECT_REQUEST_MAIN_LIMIT * (offset - 1) - 20;
		// console.log('offset', offset, 'e', y);
		// console.log('to', To * ITEM_HEIGHT);
		// if (y > ITEM_HEIGHT * To && closePaging) {
			// console.log('offset * PROTECT_REQUEST_MAIN_LIMIT', offset * PROTECT_REQUEST_MAIN_LIMIT);
			// console.log('getData().length', getData().length);
			if (getData().length % PROTECT_REQUEST_MAIN_LIMIT == 0) {
				getList();
				// setClosePaging(false);
			}
		// }
	};

	React.useEffect(() => {
		setClosePaging(true);
	}, [offset]);

	const moveToTop = () => {
		flatlist.current.scrollToOffset({animated: true, offset: 0});
	};

	const renderItem = React.useCallback(({item, index}) => {
		// return <ProtectRequestItem key={index} item={item} index={index} />;
		return (
			<ProtectRequest
				data={item}
				index={index}
				onClickLabel={(status, id) => onClickLabel(item)}
				onFavoriteTag={e => onOff_FavoriteTag(e, index)}
				onPressProtectRequest={() => onPressProtectRequest(item)}
			/>
		);
	},[]);

	class ProtectRequestItem extends React.PureComponent {
		render() {
			return (
				<ProtectRequest
					data={getData()[this.props.index]}
					index={this.props.index}
					onClickLabel={(status, id) => onClickLabel(this.props.item)}
					onFavoriteTag={e => onOff_FavoriteTag(e, this.props.index)}
					onPressProtectRequest={() => onPressProtectRequest(this.props.item)}
				/>
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

	const ITEM_HEIGHT = 265 * DP;
	const [refreshing, setRefreshing] = React.useState(false);
	const keyExtractor = React.useCallback((item,index)=>item._id+":"+index, []);
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

	const header = () => {
		return (
			<View style={[style.filterView]} key={'header'}>
				<View style={[style.inside]}>
					<View style={[style.shadow_filter, filterRef.current ? style.shadow : false]}>
						{filterRef.current ? <Filter60Filled onPress={onPressFilter} /> : <Filter60Border onPress={onPressFilter} />}
					</View>
					<View style={[style.onOffBtnView, {alignItems: 'center'}]}>
						<View style={[style.onOffBtnMsg]}>
							<Text style={[txt.noto26, {color: GRAY10, marginBottom: 6 * DP}]}>{ONLY_CONTENT_FOR_ADOPTION} </Text>
						</View>
						<View style={[style.onOffSwitch]}>
							<OnOffSwitch onSwtichOn={filterOn} onSwtichOff={filterOff} />
						</View>
					</View>
				</View>
			</View>
		);
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else {
		return (
			<View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
				<FlatList
					data={getData()}
					style={{backgroundColor: '#fff'}}
					renderItem={renderItem}
					ListHeaderComponent={header()}
					ListFooterComponent={loading && <ActivityIndicator size={'large'} />}
					showsVerticalScrollIndicator={false}
					keyExtractor={keyExtractor}
					getItemLayout={getItemLayout}
					refreshing
					// onMomentumScrollEnd={onScroll}
					onEndReachedThreshold={0.5} //페이징을 하는 타이밍
					onEndReached={onScroll} //Flatlist 페이징
					// onEndReached={onEndReached} //Flatlist 페이징
					// onScroll={e => console.log('e', e.nativeEvent.contentOffset)}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					ListEmptyComponent={whenEmpty}
					// decelerationRate={1}
					extraData={refreshing}
					windowSize={50}
					maxToRenderPerBatch={20}
					updateCellsBatchingPeriod={0}
					initialNumToRender={15}
					ref={flatlist}
				/>
			</View>
		);
	}
};

ProtectRequestList.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	filterView: {
		width: 750 * DP,
		// height: 68 * DP,
		backgroundColor: '#fff',
		marginVertical: 20 * DP,
		// marginBottom: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inside: {
		width: 694 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	onOffBtnView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	onOffBtnMsg: {},
	onOffSwitch: {},
	kindFilter: {
		// width: 330 * DP,
		marginTop: 10 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		// marginRight: 48 * DP,
		// backgroundColor: 'yellow',
		// justifyContent: 'space-between',
	},
	kindFilterItem: {
		width: 110 * DP,
		// backgroundColor: 'red',
		marginLeft: 20 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	animalNeedHelpList: {
		marginTop: 80 * DP,
		width: 750 * DP,
		alignSelf: 'center',
		// backgroundColor: '#FF00FF',
	},
	animalMissingReportList: {
		marginTop: 30 * DP,
		width: 750 * DP,
		alignSelf: 'center',
		// backgroundColor: '#FF00FF',
	},
	shadow_filter: {
		height: 60 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',

		borderRadius: 20 * DP,
	},
	shadow: {
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		elevation: 2,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
	},
	indicatorCont: {},
});
