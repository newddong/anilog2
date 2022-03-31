import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, LocationGray, LocationMarker, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import {GRAY10} from 'Root/config/color';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/core';
import WebView from 'react-native-webview';
/**
 * 후기 세부 페이지
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressFavorite - 즐겨찾기 클릭
 * @param {()=>void)} props.onPressMeatball - 미트볼 클릭
 */
const ReviewContent = props => {
	const navigation = useNavigation();
	const data = props.data;
	const [height, setHeight] = React.useState(0); // 게시글 내용의 Dynamic Height 수치
	let arr = [];
	const interests = arr.concat(
		data.community_interests.interests_etc,
		data.community_interests.interests_hospital,
		data.community_interests.interests_interior,
		data.community_interests.interests_review,
		data.community_interests.interests_trip,
	);

	const category = v => {
		return (
			<TouchableOpacity onPress={() => onPressCategory(v)} activeOpacity={0.7} style={[style.category]}>
				<Text style={[txt.noto24]}>{v}</Text>
			</TouchableOpacity>
		);
	};

	const gg = {
		__v: 0,
		_id: '624592de06cdc2f33c14cfdd',
		community_address: {
			_id: '624592de06cdc2f33c14cfde',
			normal_address: {_id: '624592de06cdc2f33c14cfe0', address_name: '', city: '', district: ''},
			region: {_id: '624592de06cdc2f33c14cfe1', latitude: '', longitude: ''},
			road_address: {_id: '624592de06cdc2f33c14cfdf', address_name: '', city: '', district: ''},
		},
		community_animal_type: 'cat',
		community_comment_count: 0,
		community_content:
			'<div>4년을 함께</div><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648726746166_1473A70E-78E5-4B2D-893E-18B35E2BD4C8.jpg" id="image" height="450px" width="300px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><br></p>',
		community_date: '2022-03-30T05:57:16.687Z',
		community_favorite_count: 0,
		community_free_type: '',
		community_interests: {
			interests_etc: [],
			interests_hospital: [],
			interests_interior: ['노즈워크/장난감'],
			interests_location: {city: '', district: ''},
			interests_review: [],
			interests_trip: ['펫 숙소', '놀이터'],
		},
		community_is_attached_file: true,
		community_is_delete: false,
		community_is_recomment: false,
		community_is_temporary: false,
		community_like_count: 0,
		community_title: '사진1개요',
		community_type: 'review',
		community_update_date: '2022-03-30T05:57:16.687Z',
		community_writer_id: {
			_id: '623b17ed400ac30b877dd7d9',
			user_nickname: '자네는고양이어딘가',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648045670715_812A892F-3DE8-4C38-96D8-2F6A6BC78091.jpg',
		},
		type: 'CommunityObject',
	};

	const onPressCategory = category => {
		alert(category);
	};

	const onWebViewMessage = event => {
		if (parseInt(event.nativeEvent.data) < 300) {
			setHeight(300 * DP);
		} else {
			setHeight(parseInt(event.nativeEvent.data));
		}
	};

	const x = 126.937125; //초기값 더미
	const y = 37.548721; //초기값 더미

	const category_dummy = ['애견카페', '애견호텔', '애견놀이터'];

	return (
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={[style.header, {}]}>
				<View style={[style.header_title]}>
					<Text style={[txt.noto32b]}>{data.community_title} </Text>
				</View>
				<View style={[style.header_icon]}>
					<FavoriteTag46_Filled onPress={() => props.onPressFavorite()} />
					<Meatball50_GRAY20_Horizontal onPress={() => props.onPressMeatball()} />
				</View>
			</View>
			<View style={[style.profile]}>
				<UserLocationTimeLabel data={data.community_writer_id} time={data.community_update_date} />
			</View>
			<View>
				<View style={[{width: 700 * DP, marginTop: 20 * DP}]}>
					{Platform.OS == 'ios' ? (
						<WebView
							originWhitelist={['*']}
							onMessage={onWebViewMessage}
							injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)" //Dynamic Height 수치 설정
							source={{
								html: `
        	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
			${data.community_content} 
        `,
							}}
							style={[
								style.webview,
								{
									height: height,
									opacity: 0.99,
								},
							]}
						/>
					) : (
						<ScrollView>
							<WebView
								originWhitelist={['*']}
								scalesPageToFit={true}
								onMessage={onWebViewMessage}
								injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)" //Dynamic Height 수치 설정
								source={{
									html: `
        	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
			${data.community_content} 
        `,
								}}
								style={{
									width: 690 * DP,
									// minHeight: 500 * DP,
									height: height == 0 ? 500 * DP : height,
								}}
							/>
						</ScrollView>
					)}
				</View>
			</View>
			<View style={[style.footer]}>
				{data.community_address.region.latitude == '' ? (
					<></>
				) : (
					<>
						<MapView
							provider={null} // remove if not using Google Maps
							style={[style.mapContainer]}
							customMapStyle={mapStyle2}
							zoomEnabled
							zoomControlEnabled
							showsUserLocation={true}
							// showsMyLocationButton={true}
							followsUserLocation={true}
							region={{
								longitude: parseFloat(data.community_address.region.longitude),
								latitude: parseFloat(data.community_address.region.latitude),
								latitudeDelta: 0.00002, //지도의 초기줌 수치
								longitudeDelta: 0.0023, //지도의 초기줌 수치
							}}>
							{/* 현재 선택된 위도 경도의 마커 */}
							<MapView.Marker
								coordinate={{
									longitude: parseFloat(data.community_address.region.longitude),
									latitude: parseFloat(data.community_address.region.latitude),
								}}
								key={`${x}${Date.now()}`} // 현재 마커의 위치가 바뀌어도 타이틀 및 description이 최신화 되지 않던 현상 발견 -> 키 값 부여
							>
								<View style={[{alignItems: 'center', marginBottom: 20 * DP}]}>
									<Text style={[txt.noto22b, style.locationText]}>
										{' '}
										{data.community_address.road_address.address_name != ''
											? data.community_address.road_address.address_name
											: data.community_address.normal_address.address_name}
									</Text>
									<View style={[style.triangle]}></View>
									<LocationMarker />
								</View>
							</MapView.Marker>
						</MapView>
						<View style={[style.location]}>
							<LocationGray />
							<Text style={[txt.noto26b, {color: GRAY10, marginLeft: 10 * DP}]}>
								{data.community_address.road_address.address_name != ''
									? data.community_address.road_address.address_name
									: data.community_address.normal_address.address_name}
							</Text>
						</View>
					</>
				)}
				<View style={[style.categoryList]}>
					{interests.map((v, i) => {
						return <View key={i}>{category(v)}</View>;
					})}
				</View>
			</View>
		</View>
	);
};

ReviewContent.defaultProps = {
	onPressFavorite: () => {},
	onPressMeatball: () => {},
};

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

export default ReviewContent;

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		// paddingVertical: 24 * DP,
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	header: {
		// width: 654 * DP,
		// header: 50 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'pink',
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 8 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 510 * DP,
		marginTop: 12 * DP,
		flexDirection: 'row',
	},
	header_title: {
		width: 544 * DP,
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	profile: {
		alignSelf: 'center',
		width: 654 * DP,
		marginTop: 12 * DP,
	},
	content: {
		width: 654 * DP,
	},
	footer: {
		marginTop: 20 * DP,
		width: 654 * DP,
		// height: 88 * DP,
		// backgroundColor: 'palegreen',
	},
	location: {
		width: 654 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 8 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 510 * DP,
		marginTop: 12 * DP,
		flexDirection: 'row',
	},

	mapContainer: {
		width: 654 * DP,
		height: 654 * DP,
		borderRadius: 30 * DP,
		borderColor: GRAY10,
		borderWidth: 2 * DP,
		marginVertical: 15 * DP,
	},
	locationText: {
		maxWidth: 520 * DP,
		height: 60 * DP,
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
	webview: {
		width: 670 * DP,
		// minHeight: 500 * DP,
	},
});
