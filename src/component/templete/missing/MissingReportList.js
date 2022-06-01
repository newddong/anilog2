import React from 'react';
import {Text, View, FlatList, TouchableOpacity, RefreshControl, StyleSheet, ActivityIndicator} from 'react-native';
import {feedWrite, login_style, searchProtectRequest, temp_style} from 'Templete/style_templete';
import {APRI10, GRAY10, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {Check42, Check50, EmptyIcon, Rect42_Border, Rect50_Border, Urgent_Write1, Urgent_Write2} from 'Atom/icon';
import {useNavigation} from '@react-navigation/core';
import {PET_KIND, PET_PROTECT_LOCATION, PROTECT_REQUEST_MAIN_LIMIT} from 'Root/i18n/msg';
import {favoriteFeed, getMissingReportList} from 'Root/api/feedapi.js';
import {btn_w306_h68} from 'Component/atom/btn/btn_style';
import ArrowDownButton from 'Root/component/molecules/button/ArrowDownButton';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import MissingReportItem from 'Root/component/organism/listitem/MissingReportItem';
import Modal from 'Root/component/modal/Modal';

export default MissingReportList = props => {
	const navigation = useNavigation();

	const [data, setData] = React.useState('false');
	const [offset, setOffset] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const [filterData, setFilterData] = React.useState({
		city: '',
		missing_animal_species: '',
		feedobject_id: '',
		request_number: 10,
	});
	const [onlyMissing, setOnlyMissing] = React.useState(false); //실종글만 보기
	const [onlyReport, setOnlyReport] = React.useState(false); // 제보글만 보기
	const [showActionButton, setShowActionButton] = React.useState(false); // 긴급게시(하얀버전) 클릭 시 - 실종/제보 버튼 출력 Boolean
	const urgentBtnRef = React.useRef();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setShowActionButton(false);
			getList();
		});
		return unsubscribe;
		userGlobalObject.protectionTab.t = false;
	}, []);

	const getList = () => {
		// setLoading(true);
		console.log('filterData', filterData);
		getMissingReportList(
			{...filterData, limit: PROTECT_REQUEST_MAIN_LIMIT, page: offset},
			result => {
				console.log('getMissingReportList length', result.msg.length);
				const res = result.msg;
				if (data != 'false') {
					let temp = [...data];
					res.map((v, i) => {
						temp.push(v);
					});
					console.log('temp lenth', temp.length);
					setData(temp);
				} else {
					setData(res);
				}
				setOffset(offset + 1);
				setLoading(false);
			},
			err => {
				console.log('getMissingReportList Error', err);
				if (err == '검색 결과가 없습니다.') {
					setData([]);
				}
				setLoading(false);
			},
		);
	};

	// 실종 데이터 불러오기 (아직 API 미작업 )
	React.useEffect(() => {
		getList();
		setData('false');
		setOffset(1);
	}, [filterData]);

	//제보 게시글 쓰기 클릭
	const moveToReportForm = () => {
		navigation.push('FeedWrite', {feedType: 'Report', tab: 'Protection'});
	};

	//실종 게시글 쓰기 클릭
	const moveToMissingForm = () => {
		navigation.push('FeedWrite', {feedType: 'Missing', tab: 'Protection'});
	};

	//실종제보 게시글의 좋아요 태그 클릭
	const onOff_FavoriteTag = (value, index) => {
		// console.log('getData()[index]', getData()[index]);
		favoriteFeed(
			{
				feedobject_id: getData()[index]._id,
				userobject_id: userGlobalObject.userInfo._id,
				is_favorite: value,
			},
			result => {
				console.log('result / FavoriteFeed / MissingReportList : ', result.msg.targetFeed.missing_animal_features);
			},
			err => {
				console.log('err / FavoriteFeed / MissingReportList : ', err);
			},
		);
	};

	const onClickLabel = (status, id, item) => {
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
					case 'unknown':
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

	//지역 필터
	const onSelectLocation = () => {
		Modal.popSelectScrollBoxModal(
			[PET_PROTECT_LOCATION],
			'보호 지역 선택',
			selected => {
				selected == '실종/제보 지역' ? setFilterData({...filterData, city: ''}) : setFilterData({...filterData, city: selected});
				setData('false');
				setOffset(1);
				Modal.close();
			},
			() => {
				Modal.close();
			},
		);
	};

	//동물종류 필터
	const onSelectKind = async kind => {
		const fetchPetKindData = await PET_KIND();
		let petKind = fetchPetKindData.map((v, i) => v.pet_species);
		petKind.splice(0, 0, '동물종류');
		Modal.popSelectScrollBoxModal(
			[petKind],
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

	const onPressShowMissing = () => {
		setOnlyMissing(!onlyMissing);
		setOnlyReport(false);
	};

	const onPressShowReport = () => {
		setOnlyReport(!onlyReport);
		setOnlyMissing(false);
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('EndReached', getData().length % PROTECT_REQUEST_MAIN_LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		if (getData().length % PROTECT_REQUEST_MAIN_LIMIT == 0) {
			getList();
		}
	};

	const getData = () => {
		let filtered = data;
		if (onlyMissing) {
			filtered = filtered.filter(v => v.feed_type != 'missing');
		} else if (onlyReport) {
			filtered = filtered.filter(v => v.feed_type != 'report');
		}
		// if (filterData.city != '') {
		// 	let temp = [];
		// 	filtered.map((v, i) => {
		// 		if (v.report_witness_location) {
		// 			let split = v.report_witness_location.split(' ');
		// 			if (split[0].includes(filterData.city)) {
		// 				temp.push(v);
		// 			}
		// 		} else {
		// 			let address = v.missing_animal_lost_location;
		// 			let splitAddress = address.split('"');
		// 			let newMissingLocation = splitAddress[3] + ' ' + splitAddress[7] + ' ' + splitAddress[11];
		// 			let split = newMissingLocation.split(' ');
		// 			if (split[0].includes(filterData.city)) {
		// 				temp.push(v);
		// 			}
		// 		}
		// 	});
		// 	filtered = temp;
		// }
		return filtered;
	};

	const whenEmpty = () => {
		return <ListEmptyInfo text={'목록이 없습니다..'} />;
	};

	const onPressShowActionButton = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			// setShowActionButton(!showActionButton);
			Modal.popUrgentBtnModal(moveToReportForm, moveToMissingForm, urgentBtnRef.current);
		}
	};

	const renderItem = ({item, index}) => {
		return <MissingReport item={item} index={index} />;
	};

	class MissingReport extends React.PureComponent {
		render() {
			return (
				<MissingReportItem
					data={getData()[this.props.index]}
					onClickLabel={(status, id) => onClickLabel(status, id, this.props.item)}
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

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={{alignItems: 'center'}}>
				<View style={[styles.filterView]}>
					<View style={[styles.inside, {flexDirection: 'row', justifyContent: 'space-between'}]}>
						<View style={[temp_style.filterBtn, {}]}>
							<ArrowDownButton
								onPress={onSelectLocation}
								btnTitle={filterData.city || '실종/제보 지역'}
								btnLayout={btn_w306_h68}
								btnStyle={'border'}
								btnTheme={'gray'}
							/>
						</View>
						<View style={[styles.kindFilter, {}]}>
							<View style={[styles.kindFilterItem]}>
								{onlyReport ? <Check42 onPress={onPressShowReport} /> : <Rect42_Border onPress={onPressShowReport} />}
								<Text style={[txt.noto26, {color: GRAY10, marginRight: 10 * DP}]}> 실종</Text>
							</View>
							<View style={[styles.kindFilterItem]}>
								{onlyMissing ? <Check42 onPress={onPressShowMissing} /> : <Rect42_Border onPress={onPressShowMissing} />}
								<Text style={[txt.noto26, {color: GRAY10, marginRight: 10 * DP}]}> 제보</Text>
							</View>
						</View>
					</View>
				</View>

				{data == 'false' ? (
					<Loading isModal={false} />
				) : (
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
						onEndReached={onEndReached} //Flatlist 페이징
						onEndReachedThreshold={0.6} //페이징을 하는 타이밍
						// https://reactnative.dev/docs/optimizing-flatlist-configuration
						// removeClippedSubviews={true}
						extraData={refreshing}
						initialNumToRender={5}
						// maxToRenderPerBatch={5} // re-render를 막는군요.
						windowSize={11}
						// https://reactnative.dev/docs/optimizing-flatlist-configuration
					/>
				)}
			</View>

			<View style={[temp_style.floatingBtn, feedWrite.urgentBtnContainer]}>
				<View style={[styles.urgentActionButton, {}]} onLayout={e => (urgentBtnRef.current = e.nativeEvent.layout)}>
					<TouchableOpacity activeOpacity={0.8} onPress={onPressShowActionButton}>
						<Urgent_Write1 />
					</TouchableOpacity>
				</View>
			</View>
			{loading ? (
				<View style={styles.indicatorCont}>
					<ActivityIndicator size="large" color={APRI10} />
				</View>
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	filterView: {
		width: 750 * DP,
		// height: 68 * DP,
		backgroundColor: '#fff',
		marginTop: 18 * DP,
		marginBottom: 30 * DP,
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
	onOffSwitch: {
		// position: 'absolute',
		// right: 0,
	},
	kindFilter: {
		// width: 330 * DP,
		marginTop: 10 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
	},
	kindFilterItem: {
		width: 110 * DP,
		// backgroundColor: 'red',
		marginLeft: 20 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	indicatorCont: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	urgentActionButton: {
		width: 110 * DP,
		height: 110 * DP,
		alignSelf: 'flex-end',
		// backgroundColor: 'white',
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		borderRadius: 40 * DP,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 2 * DP,
		// 	height: 1 * DP,
		// },
		// elevation: 1,
	},
});
