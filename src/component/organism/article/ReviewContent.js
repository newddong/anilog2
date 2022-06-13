import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {
	CurrentLocation,
	FavoriteTag46_Filled,
	FavoriteTag48_Border,
	LocationGray,
	LocationMarker,
	Meatball50_GRAY20_Horizontal,
} from 'Root/component/atom/icon';
import {APRI10, BLACK, GRAY10, GRAY30, GRAY40, GRAY50, WHITE} from 'Root/config/color';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/core';
import WebView from 'react-native-webview';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';
import {serveruri} from 'Root/config/server';
import AutoHeightWebView from 'Root/module/AutoHeightWebview';
/**
 * 후기 세부 페이지
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {(bool:boolean)=>void)} props.onPressFavorite - 즐겨찾기 클릭
 * @param {()=>void)} props.onPressMeatball - 미트볼 클릭
 * @param {(src:Array)=>void)} props.showImg - 사진 클릭
 * @param {string} props.searchInput - 검색 키워드
 */
const ReviewContent = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);
	const [height, setHeight] = React.useState(0); // 게시글 내용의 Dynamic Height 수치
	let arr = [];
	const interests = arr.concat(
		data.community_interests.interests_etc,
		data.community_interests.interests_hospital,
		data.community_interests.interests_interior,
		data.community_interests.interests_review,
		data.community_interests.interests_trip,
	);

	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	const getCategory = (v, i) => {
		// category_sum_list.push('테스트');
		const page = Math.floor(interests.length / 4) + 1;
		let arr = [];
		arr.length = page;
		arr.fill('a', 0, page);
		if (interests.length < 4) {
			arr = ['a'];
			return arr.map((value, index) => {
				let sliced = interests.slice(0, 4);
				return (
					<View key={index} style={{backgroundColor: 'white', flexDirection: 'row', marginVertical: 5 * DP}}>
						{sliced.map((v, i) => {
							return (
								<View key={i} activeOpacity={0.7} style={[style.category, {backgroundColor: WHITE, borderColor: GRAY30}]}>
									<Text style={[txt.noto24, {color: GRAY10}]}>{v}</Text>
								</View>
							);
						})}
					</View>
				);
			});
		} else
			return arr.map((value, index) => {
				let sliced = interests.slice(index * 4, (index + 1) * 4);
				return (
					<View key={index} style={{backgroundColor: 'white', flexDirection: 'row', marginVertical: 5 * DP}}>
						{sliced.map((v, i) => {
							return (
								<View key={i} activeOpacity={0.7} style={[style.category, {backgroundColor: WHITE, borderColor: GRAY30}]}>
									<Text style={[txt.noto24, {color: GRAY10}]}>{v}</Text>
								</View>
							);
						})}
					</View>
				);
			});
	};

	const x = 126.937125; //초기값 더미
	const y = 37.548721; //초기값 더미

	const onWebViewMessage = async event => {
		if (Platform.OS == 'android') {
			setTimeout(() => {
				if (event.nativeEvent.data.includes('amazonaws.com')) {
					console.log('event.nativeEvent.data', event.nativeEvent.data);
					showImg(event.nativeEvent.data);
				} else if (parseInt(event.nativeEvent.data) < 100 * DP) {
					setHeight(100 * DP);
				} else {
					height >= 100 * DP ? false : setHeight(parseInt(event.nativeEvent.data));
					console.log('height and : ', parseInt(event.nativeEvent.data));
				}
			}, 150);
		} else {
			// console.log('event.nativeEvent.data', event.nativeEvent.data);
			if (event.nativeEvent.data.includes('amazonaws.com')) {
				showImg(event.nativeEvent.data);
			} else if (parseInt(event.nativeEvent.data) < 100 * DP) {
				setHeight(100 * DP * DP);
			} else {
				height >= 100 * DP ? false : setHeight(parseInt(event.nativeEvent.data));
				// console.log('parseInt(event.nativeEvent.data)', parseInt(event.nativeEvent.data));
			}
		}
	};

	//상세글이 처음 마운트 될 때 height를 조정
	const runFirst = `
	  window.ReactNativeWebView.postMessage(document.body.scrollHeight);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

	const webviewRef = React.useRef();

	const changeHtmlTag = () => {
		let result = data.community_content; //기존의 html 코드
		result = data.community_content.replace(
			/<img /g,
			`<img onclick="image(this)"  style="height:auto; width:${
				Platform.OS == 'android' ? 694 * DP : 694 * DP
			};  border-radius:15px; object-fit:contain; margin:5px 0px 0px 0px; " `,
		); //img 태그에 onClick 이벤트 장착
		return `
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
        <script>
            function image(img){
                window.ReactNativeWebView.postMessage(img.src); 
				// alert(img.src)
            }
        </script>
        ${result}
    `;
	};

	const showImg = src => {
		props.showImg(src);
		// Modal.popPhotoListViewModal([src]);
	};

	const getLocation =
		data.community_address.road_address.address_name.includes('도로명 주소가 없는 위치입니다. ') ||
		data.community_address.road_address.address_name == 'undefined '
			? data.community_address.normal_address.address_name
			: data.community_address.road_address.address_name;

	return (
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={[style.header, {}]}>
				<View style={[style.header_title]}>
					<Text style={[txt.noto32, {maxWidth: 694 * DP}]} numberOfLines={1}>
						{data.community_title}{' '}
					</Text>
				</View>
			</View>
			<View style={{width: 694 * DP, backgroundColor: GRAY40, height: 2 * DP, marginTop: 20 * DP}}></View>

			{data.community_writer_id ? (
				<View style={[style.profile]}>
					<UserLocationTimeLabel data={data.community_writer_id} time={data.community_date} />
				</View>
			) : (
				<UserLocationTimeLabel empty={true} time={data.community_date} />
			)}

			{/* <View style={{width: 654 * DP, marginTop: 20 * DP}}>{getContents()}</View> */}
			<View>
				<View style={[{marginTop: 20 * DP}]}>
					{Platform.OS == 'ios' ? (
						// <WebView
						// 	originWhitelist={['*']}
						// 	onMessage={onWebViewMessage}
						// 	ref={webviewRef}
						// 	injectedJavaScript={runFirst} //Dynamic Height 수치 설정
						// 	scrollEnabled={false}
						// 	injectedJavaScriptBeforeContentLoaded={runFirst}
						// 	source={{html: changeHtmlTag()}}
						// 	style={[style.webview, {height: height == 0 ? 100 * DP : height, opacity: 0.99}]}
						// />
						<AutoHeightWebView
							// style={{width: 670 * DP, marginTop: 30 * DP}}
							style={[style.webview, {opacity: 0.99}]}
							customScript={runFirst}
							scrollEnabled={false}
							onSizeUpdated={size => {
								// console.log('size.height', size.height);
								setHeight(size.height);
							}}
							files={[{href: 'cssfileaddress', type: 'text/css', rel: 'stylesheet'}]}
							onMessage={onWebViewMessage}
							ref={webviewRef}
							source={{html: changeHtmlTag()}}
							scalesPageToFit={true}
							viewportContent={'width=device-width, user-scalable=no'}
						/>
					) : (
						<WebView
							originWhitelist={['*']}
							onMessage={onWebViewMessage}
							ref={webviewRef}
							injectedJavaScript={runFirst} //Dynamic Height 수치 설정
							scrollEnabled={false}
							source={{html: changeHtmlTag()}}
							style={{width: 724 * DP, left: -14 * DP, height: height == 0 ? 100 * DP : height, opacity: 0.99}}
						/>
						// <AutoHeightWebView
						// 	style={[style.webview, {opacity: 0.99}]}
						// 	customScript={runFirst}
						// 	scrollEnabled={false}
						// 	onSizeUpdated={size => console.log('size.height', size.height)}
						// 	files={[{href: 'cssfileaddress', type: 'text/css', rel: 'stylesheet'}]}
						// 	onMessage={onWebViewMessage}
						// 	ref={webviewRef}
						// 	source={{html: changeHtmlTag()}}
						// 	viewportContent={'width=device-width, user-scalable=no'}
						// />
					)}
				</View>
			</View>
			<View style={[style.footer]}>
				{data.community_address.region.latitude == '' ? (
					<></>
				) : (
					<View style={{height: 694 * DP}}>
						<View style={[style.mapOutCont]}>
							<MapView
								style={[style.mapContainer]}
								// provider={PROVIDER_GOOGLE}
								customMapStyle={mapStyle2}
								zoomEnabled
								zoomControlEnabled
								scrollEnabled={false}
								// showsUserLocation={true}
								toolbarEnabled={false}
								mapType="standard"
								region={{
									longitude: parseFloat(data.community_address.region.longitude),
									latitude: parseFloat(data.community_address.region.latitude),
									latitudeDelta: 0.00012, //지도의 초기줌 수치
									longitudeDelta: 0.00856, //지도의 초기줌 수치
								}}>
								{/* 현재 선택된 위도 경도의 마커 */}
								<MapView.Marker
									tracksViewChanges={false}
									coordinate={{
										longitude: parseFloat(data.community_address.region.longitude),
										latitude: parseFloat(data.community_address.region.latitude),
									}}
									key={`${x}${Date.now()}`} // 현재 마커의 위치가 바뀌어도 타이틀 및 description이 최신화 되지 않던 현상 발견 -> 키 값 부여
								>
									<View style={[{alignItems: 'center', marginBottom: 20 * DP}]}>
										<Text style={[txt.noto22b, style.locationText]}> {getLocation}</Text>
										<View style={[style.triangle]}></View>
										<LocationMarker />
									</View>
								</MapView.Marker>
							</MapView>
						</View>
						<View style={[style.location]}>
							<LocationGray />
							<Text style={[txt.noto26, {paddingHorizontal: 12 * DP, width: 600 * DP, backgroundColor: 'white'}]} numberOfLines={2}>
								{getLocation}
							</Text>
						</View>
					</View>
				)}

				<View style={[style.categoryList, {}]}>{getCategory()}</View>
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

ReviewContent.defaultProps = {
	onPressFavorite: () => {},
	showImg: () => {},
};

export default ReviewContent;

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		// alignItems: 'center',
		paddingLeft: 28 * DP,
		alignSelf: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 15 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 694 * DP,
		marginTop: 12 * DP,
	},
	header_title: {
		width: 694 * DP,
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	profile: {
		alignSelf: 'center',
		width: 694 * DP,
		marginTop: 20 * DP,
	},
	content: {
		width: 694 * DP,
	},
	footer: {
		marginTop: 20 * DP,
		width: 694 * DP,
	},
	location: {
		width: 694 * DP,
		position: 'absolute',
		height: 100 * DP,
		bottom: 0,
		borderBottomRightRadius: 30 * DP,
		borderBottomLeftRadius: 30 * DP,
		paddingHorizontal: 20 * DP,
		backgroundColor: 'white',
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 1,
	},
	mapOutCont: {
		height: 594 * DP,
		zIndex: -1,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	mapContainer: {
		flex: 1,
		height: 594 * DP,
		width: 690 * DP,
		borderRadius: 30 * DP,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
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
	webview: {
		width: 694 * DP,
		// backgroundColor: 'yellow',
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
