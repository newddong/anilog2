import React from 'react';
import {Text, View, FlatList, RefreshControl} from 'react-native';
import {searchProtectRequest, temp_style} from 'Templete/style_templete';
import {GRAY10} from 'Root/config/color';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {ONLY_CONTENT_FOR_ADOPTION, PET_KIND, PET_PROTECT_LOCATION} from 'Root/i18n/msg';
import {getProtectRequestList} from 'Root/api/shelterapi.js';
import {btn_w306_h68} from 'Component/atom/btn/btn_style';
import ArrowDownButton from 'Root/component/molecules/button/ArrowDownButton';
import Modal from 'Root/component/modal/Modal';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';

export default ProtectRequestList = ({navigation, route}) => {
	const [data, setData] = React.useState('false');
	const [filterData, setFilterData] = React.useState({
		city: '',
		protect_animal_species: '',
		// adoptable_posts: 'false', // 입양 가능한 게시글만 보기 필터는 굳이 api에 한 번 더 접속할 필요가 없으므로 제외처리
		protect_request_object_id: '',
		request_number: 1000,
	});
	const [onlyAdoptable, setOnlyAdoptable] = React.useState(false);
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getList();
		});
		getList(); //필터가 바뀔 때마다 호출되도록 설정
		return unsubscribe;
	}, [filterData]);

	const getList = () => {
		getProtectRequestList(
			{...filterData},
			result => {
				// console.log('result / getProtectRequestList / ProtectRequestList : ', result.msg[0]);
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
	const onOff_FavoriteTag = (bool, index) => {
		console.log(' data[index]._id', data[index]._id);
		console.log('bool', bool);
		setFavoriteEtc(
			{
				collectionName: 'protectrequestobjects',
				target_object_id: data[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ProtectRequestList : ', result.msg.favoriteEtc);
				let prevData = [...data]; //
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

	//검색결과가 없을 경우
	const whenEmpty = () => {
		return <ListEmptyInfo text={'목록이 없습니다..'} />;
	};

	const getData = () => {
		return onlyAdoptable ? data.filter(v => v.protect_request_status == 'rescue') : data;
	};

	const renderItem = ({item, index}) => {
		return <ProtectRequestItem item={item} index={index} />;
		// return (
		// 	<ProtectRequest
		// 		data={data[index]}
		// 		onClickLabel={(status, id) => onClickLabel(status, id, item)}
		// 		onFavoriteTag={e => onOff_FavoriteTag(e, index)}
		// 		onPressProtectRequest={() => onPressProtectRequest(item)}
		// 	/>
		// );
	};

	class ProtectRequestItem extends React.PureComponent {
		render() {
			return (
				<>
					<ProtectRequest
						data={data[this.props.index]}
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
			</View>
		);
	}
};

ProtectRequestList.defaultProps = {};
