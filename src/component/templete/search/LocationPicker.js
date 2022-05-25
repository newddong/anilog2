import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import InputWithSearchIcon from 'Molecules/input/InputWithSearchIcon';
import {locationPicker} from 'Templete/style_templete';
import {BLACK, GRAY10, GRAY20, GRAY30} from 'Root/config/color';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import MapView from 'react-native-maps';
import {LocationGray, LocationMarker} from 'Root/component/atom/icon';

export default LocationPicker = props => {
	const [places, setPlaces] = React.useState('false');
	const [selected, setSelected] = React.useState({
		address_name: '',
		category_group_code: '',
		category_group_name: '',
		category_name: '',
		distance: '',
		id: '',
		phone: '',
		place_name: '',
		place_url: '',
		road_address_name: '',
		x: '',
		y: '',
	});
	const navigation = useNavigation();
	React.useEffect(() => {
		// callInitialAddress();
	}, []);

	const rr = {
		address_name: '경기 안성시 공도읍 진사리 354',
		category_group_code: '',
		category_group_name: '',
		category_name: '가정,생활 > 복합쇼핑몰',
		distance: '',
		id: '1331103660',
		phone: '1833-9001',
		place_name: '스타필드 안성',
		place_url: 'http://place.map.kakao.com/1331103660',
		road_address_name: '경기 안성시 공도읍 서동대로 3930-39',
		x: '127.14709467672208',
		y: '36.99502539359405',
	};

	//위도 경도를 토대로 주소 받아오
	const searchPlaceByKeyword = async keyword => {
		try {
			let res = await axios
				.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query={}'.${keyword}`, {
					headers: {
						Authorization: 'KakaoAK 27b7c22d57bc044bc63e280b29db100e', // REST API 키
					},
				})
				.then(async res => {
					console.log('res', JSON.stringify(res.data.documents[0]));
					let result = res.data.documents;
					setPlaces(result);
				});
		} catch (error) {
			console.log('error callInitialAddress', error.code, error.message);
			Modal.close();
		}
	};

	const onChangeSearchText = keyword => {
		console.log('keyword', keyword);
		// setSearchState(true);
		setSelected({
			address_name: '',
			category_group_code: '',
			category_group_name: '',
			category_name: '',
			distance: '',
			id: '',
			phone: '',
			place_name: '',
			place_url: '',
			road_address_name: '',
			x: '',
			y: '',
		});
		searchPlaceByKeyword(keyword);
	};

	const confirm = () => {
		console.log('confirm');
	};

	const onClear = () => {
		console.log('onClear');
		setPlaces([]);
	};

	const onPressPlace = item => {
		console.log('item', item);
		setSelected(item);
	};

	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity onPress={() => onPressPlace(item)} activeOpacity={0.6} style={{marginBottom: 26 * DP}}>
				<Text style={[txt.roboto28, {}]}>{item.place_name}</Text>
				<Text style={[txt.roboto26, {color: GRAY20}]}>{item.road_address_name ? item.road_address_name : item.address_name}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={[style.container]}>
			{/* (M)inputWithSearchIcon */}
			<View style={[]}>
				<InputWithSearchIcon
					onClear={onClear}
					placeholder={'검색어를 입력하세요.'}
					width={654}
					onChange={onChangeSearchText}
					onSearch={confirm}
					onClear={onClear}
				/>
			</View>
			{selected.id == '' ? (
				<View style={[style.listContainer]}>
					{places != 'false' ? <FlatList data={places} renderItem={renderItem} showsVerticalScrollIndicator={false} /> : <></>}
				</View>
			) : (
				<MapView
					style={[style.mapContainer]}
					// provider={PROVIDER_GOOGLE}
					customMapStyle={mapStyle2}
					zoomEnabled
					zoomControlEnabled
					showsUserLocation={true}
					toolbarEnabled={false}
					mapType="standard"
					region={{
						longitude: parseFloat(selected.x),
						latitude: parseFloat(selected.y),
						latitudeDelta: 0.00012, //지도의 초기줌 수치
						longitudeDelta: 0.00856, //지도의 초기줌 수치
					}}>
					{/* 현재 선택된 위도 경도의 마커 */}
					<MapView.Marker
						coordinate={{
							longitude: parseFloat(selected.x),
							latitude: parseFloat(selected.y),
						}}
						key={`${selected.x}${Date.now()}`} // 현재 마커의 위치가 바뀌어도 타이틀 및 description이 최신화 되지 않던 현상 발견 -> 키 값 부여
					>
						<View style={[{alignItems: 'center', marginBottom: 20 * DP}]}>
							<Text style={[txt.noto22b, style.locationText]}>
								{' '}
								{selected.road_address_name ? selected.road_address_name : selected.address_name}
							</Text>
							<View style={[style.triangle]}></View>
							<LocationMarker />
						</View>
					</MapView.Marker>
				</MapView>
			)}
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		// height: 2000 * DP,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	listContainer: {
		width: 654 * DP,
		marginVertical: 50 * DP,
	},
	mapContainer: {
		width: 750 * DP,
		height: 750 * DP,
		borderColor: GRAY10,
		borderWidth: 2 * DP,
		marginVertical: 15 * DP,
	},
	locationText: {
		maxWidth: 520 * DP,
		// height: 60 * DP,
		borderRadius: 20 * DP,
		padding: 10 * DP,
		borderWidth: 2 * DP,
		textAlign: 'center',
		backgroundColor: 'white',
	},
	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 15 * DP,
		borderRightWidth: 15 * DP,
		borderBottomWidth: 15 * DP,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'black',
		transform: [{rotate: '180deg'}],
	},
	location: {
		width: 654 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	webview: {
		width: 670 * DP,
		// minHeight: 500 * DP,
	},
	currentLocationIcon: {
		position: 'absolute',
		right: 50 * DP,
		bottom: 100 * DP,
		width: 60 * DP,
		height: 60 * DP,
		// backgroundColor: 'red',
		zIndex: 1,
	},
});

const mapStyle2 = [
	{
		featureType: 'poi.business',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'transit',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
];
