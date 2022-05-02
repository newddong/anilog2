import React from 'react';
import {Text, View, TouchableWithoutFeedback, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {feedWrite, login_style, searchProtectRequest, temp_style} from 'Templete/style_templete';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import {GRAY10, WHITE} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {Check50, EmptyIcon, Rect50_Border, Urgent_Write1, Urgent_Write2} from 'Atom/icon';
import {useNavigation} from '@react-navigation/core';
import {PET_KIND, PET_PROTECT_LOCATION} from 'Root/i18n/msg';
import {favoriteFeed, getMissingReportList} from 'Root/api/feedapi.js';
import {btn_w306_h68} from 'Component/atom/btn/btn_style';
import ArrowDownButton from 'Root/component/molecules/button/ArrowDownButton';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import AnimalNeedHelp from 'Root/component/organism/listitem/AnimalNeedHelp';
import MissingReportItem from 'Root/component/organism/listitem/MissingReportItem';

export default MissingReportList = props => {
	const navigation = useNavigation();
	const [showUrgentBtns, setShowUrgentBtns] = React.useState(true); //긴급버튼목록
	const [showActionButton, setShowActionButton] = React.useState(false); // 긴급게시(하얀버전) 클릭 시 - 실종/제보 버튼 출력 Boolean

	const [data, setData] = React.useState('false');
	const [filterData, setFilterData] = React.useState({
		city: '',
		missing_animal_species: '',
		feedobject_id: '',
		request_number: 10,
	});
	const [onlyMissing, setOnlyMissing] = React.useState(false);
	const [onlyReport, setOnlyReport] = React.useState(false);

	// 실종 데이터 불러오기 (아직 API 미작업 )
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getList();
		});

		const getList = () => {
			getMissingReportList(
				filterData,
				data => {
					// console.log('getMissingReportList data', data.msg[0]);
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
	}, [filterData]);

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

	const getData = () => {
		let filtered = data;
		if (onlyMissing) {
			// console.log('data', data.slice(0, 2));
			filtered = filtered.filter(v => v.feed_type != 'missing');
		} else if (onlyReport) {
			filtered = filtered.filter(v => v.feed_type != 'report');
		}
		return filtered;
	};

	const whenEmpty = () => {
		return <ListEmptyInfo text={'목록이 없습니다..'} />;
	};

	const onPressShowActionButton = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setShowActionButton(!showActionButton);
		}
	};

	const renderItem = ({item, index}) => {
		return <MissingReport item={item} index={index} />;
	};

	class MissingReport extends React.PureComponent {
		render() {
			return (
				<MissingReportItem
					data={data[this.props.index]}
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
			<View style={{}}>
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
				<View style={[searchProtectRequest.kindFilter]}>
					<View style={[searchProtectRequest.kindFilterItem]}>
						<Text style={[txt.noto26, {color: GRAY10}]}> 제보글만 보기</Text>
						{onlyMissing ? <Check50 onPress={onPressShowMissing} /> : <Rect50_Border onPress={onPressShowMissing} />}
					</View>
					<View style={[searchProtectRequest.kindFilterItem]}>
						<Text style={[txt.noto26, {color: GRAY10}]}> 실종글만 보기</Text>
						{onlyReport ? <Check50 onPress={onPressShowReport} /> : <Rect50_Border onPress={onPressShowReport} />}
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
						// https://reactnative.dev/docs/optimizing-flatlist-configuration
						removeClippedSubviews={true}
						extraData={refreshing}
						initialNumToRender={15}
						// maxToRenderPerBatch={5} // re-render를 막는군요.
						windowSize={11}
						// https://reactnative.dev/docs/optimizing-flatlist-configuration
					/>
				)}
			</View>

			{showUrgentBtns ? (
				<View style={[temp_style.floatingBtn, feedWrite.urgentBtnContainer]}>
					{showActionButton ? (
						<View>
							<TouchableOpacity onPress={moveToMissingForm} activeOpacity={0.8} style={[feedWrite.urgentBtnItemContainer]}>
								<Text style={[txt.noto32, {color: WHITE}]}>실종</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={moveToReportForm} activeOpacity={0.8} style={[feedWrite.urgentBtnItemContainer]}>
								<Text style={[txt.noto32, {color: WHITE}]}>제보</Text>
							</TouchableOpacity>
						</View>
					) : null}
					<View style={[feedWrite.urgentActionButton]}>
						{showActionButton ? <Urgent_Write2 onPress={onPressShowActionButton} /> : <Urgent_Write1 onPress={onPressShowActionButton} />}
					</View>
				</View>
			) : (
				false
			)}
		</View>
	);
};
