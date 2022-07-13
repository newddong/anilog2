import React from 'react';
import {Text, View, FlatList, TouchableOpacity, RefreshControl, StyleSheet, ActivityIndicator} from 'react-native';
import {feedWrite, login_style, searchProtectRequest, temp_style} from 'Templete/style_templete';
import {APRI10, GRAY10, GRAY30, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {Check42, Check50, EmptyIcon, Rect42_Border, Rect50_Border, Urgent_Write1, Urgent_Write2, Urgent_Write3} from 'Atom/icon';
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
import feed_obj from 'Root/config/feed_obj';

export default MissingReportList = props => {
	const navigation = useNavigation();

	const [data, setData] = React.useState('false');
	const [offset, setOffset] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const [filterData, setFilterData] = React.useState({city: ''});
	const [onlyMissing, setOnlyMissing] = React.useState(false); //실종글만 보기
	const [onlyReport, setOnlyReport] = React.useState(false); // 제보글만 보기
	const urgentBtnRef = React.useRef();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (feed_obj.deleted_obj) {
				//삭제된 실종,제보 반영
				setData(data.filter(e => e._id != feed_obj.deleted_obj._id));
				feed_obj.deleted_obj = {};
			}
		});
		getList();
		return unsubscribe;
	}, []);

	React.useEffect(() => {
		if (data != 'false' && data.length) {
			data.map((v, i) => {
				const find = feed_obj.list.findIndex(e => e._id == v._id);
				if (find == -1) {
					//현 메모리에 저장되어 있지않은 피드아이템만 추가
					feed_obj.list.push(v);
				}
			});
			console.log('feed_obj.list at MissingReportList', feed_obj.list.length);
		}
	}, [data]);

	const getList = refresh => {
		// setLoading(true);
		// console.log('filterData', filterData);
		// console.log('offset', offset, refresh);
		getMissingReportList(
			{...filterData, limit: PROTECT_REQUEST_MAIN_LIMIT, page: refresh ? 1 : offset},
			result => {
				console.log('getMissingReportList length', result.msg.length);
				const res = result.msg;
				if (data != 'false' && !refresh) {
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
		if (filterData && filterData.city != '') {
			console.log('filterData', filterData);
			getList();
			setData('false');
			setOffset(1);
		}
	}, [filterData]);

	//제보 게시글 쓰기 클릭
	const moveToReportForm = () => {
		navigation.navigate('FeedWrite', {feedType: 'Report', tab: 'Protection'});
	};

	//실종 게시글 쓰기 클릭
	const moveToMissingForm = () => {
		navigation.navigate('FeedWrite', {feedType: 'Missing', tab: 'Protection'});
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
				console.log('result / FavoriteFeed / MissingReportList : ', result.msg.targetFeed);
				let temp = [...feed_obj.list];
				const findIndex = temp.findIndex(e => e._id == result.msg.targetFeed._id); //현재 보고 있는 피드게시글이 저장된 리스트에서 몇 번째인지
				temp[findIndex].is_favorite = !temp[findIndex].is_favorite;
				feed_obj.list = temp;
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
				navigation.navigate('MissingAnimalDetail', {title: titleValue, _id: id});
				break;
			case 'report':
				navigation.navigate('ReportDetail', {_id: id});
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
		return filtered;
	};

	const whenEmpty = () => {
		return <ListEmptyInfo text={'목록이 없습니다..'} />;
	};

	const onPressShowActionButton = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			// setShowActionButton(!showActionButton);
			Modal.popUrgentBtnModal(moveToReportForm, moveToMissingForm, urgentBtnRef.current);
		}
	};

	const renderItem = ({item, index}) => {
		return <MissingReport key={index} item={item} index={index} />;
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

	const [refreshing, setRefreshing] = React.useState(false);

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};
	const onRefresh = () => {
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	React.useEffect(() => {
		refreshing ? getList(true) : false;
	}, [refreshing]);

	const ITEM_HEIGHT = 266 * DP;
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

	const header = () => {
		return (
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
						<TouchableOpacity onPress={onPressShowReport} style={[styles.kindFilterItem]}>
							{onlyReport ? <Check42 /> : <Rect42_Border />}
							<Text style={[txt.noto28, {marginRight: 10 * DP}]}>{'  '}실종</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onPressShowMissing} style={[styles.kindFilterItem]}>
							{onlyMissing ? <Check42 /> : <Rect42_Border />}
							<Text style={[txt.noto28, {marginRight: 10 * DP}]}>{'  '}제보</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={{alignItems: 'center'}}>
				{data == 'false' ? (
					<Loading isModal={false} />
				) : (
					<FlatList
						data={getData()}
						contentContainerStyle={{backgroundColor: '#fff', alignItems: 'center'}}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						keyExtractor={keyExtractor}
						getItemLayout={getItemLayout}
						refreshing
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
						ListEmptyComponent={whenEmpty}
						ListHeaderComponent={header()}
						onEndReached={onEndReached} //Flatlist 페이징
						onEndReachedThreshold={0.6} //페이징을 하는 타이밍
						// https://reactnative.dev/docs/optimizing-flatlist-configuration
						// removeClippedSubviews={true}
						extraData={refreshing}
						initialNumToRender={5}
						// maxToRenderPerBatch={5} // re-render를 막는군요.
						windowSize={5}
						// https://reactnative.dev/docs/optimizing-flatlist-configuration
					/>
				)}
			</View>

			<View style={[feedWrite.urgentBtnContainer]}>
				<View style={[styles.urgentActionButton, {}]} onLayout={e => (urgentBtnRef.current = e.nativeEvent.layout)}>
					<TouchableOpacity onPress={onPressShowActionButton}>
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
		marginRight: 10 * DP,
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
		width: 98 * DP,
		height: 86 * DP,
		alignSelf: 'flex-end',
		// backgroundColor: 'white',
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		borderRadius: 40 * DP,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowRadius: 4.65 * DP,
		// shadowOffset: {
		// 	width: 2 * DP,
		// 	height: 1 * DP,
		// },
		// elevation: 1,
	},
});
