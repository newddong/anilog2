import React from 'react';
import {StyleSheet, View, FlatList, RefreshControl, Platform, NativeModules, Text, TextInput, Dimensions, PixelRatio} from 'react-native';
import {GRAY10, GRAY20, WHITE} from 'Root/config/color';
import {Write94, Camera54} from 'Atom/icon';
import Feed from 'Organism/feed/Feed';
import {deleteFeed, getMissingReportList, getSuggestFeedList} from 'Root/api/feedapi';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';
import {getFeedListByUserId, getFavoriteFeedListByUserId, getUserTaggedFeedList} from 'Root/api/feedapi';
import {getFeedsByHash} from 'Root/api/hashapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {login_style, buttonstyle} from 'Templete/style_templete';
import {getStringLength, getLinesOfString} from 'Root/util/stringutil';
import {GRAY30} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useScrollToTop} from '@react-navigation/native';
import NewMissingReportList from '../list/NewMissingReportList';
import {getUserInfoById} from 'Root/api/userapi';
import {NETWORK_ERROR} from 'Root/i18n/msg';

export default FeedList = ({route, navigation}) => {
	const [feedList, setFeedList] = React.useState([]);
	const [refreshing, setRefreshing] = React.useState(false);
	const [index, setIndex] = React.useState(0);
	const [toTop, setToTop] = React.useState(0);
	const [topList, setTopList] = React.useState([]);
	const flatlist = React.useRef();
	const requestNum = 99;
	//피드썸네일 클릭 리스트일 경우

	React.useEffect(() => {
		if (route.params?.pressed != 0) {
			moveToTop();
		}
	}, [route.params]);
	React.useEffect(() => {
		// console.log('userobject', route.params?.userobject);
		switch (route.name) {
			case 'UserFeedList':
				navigation.setOptions({title: route.params?.userobject.user_nickname + '님의 게시글'});
				break;
			case 'UserTagFeedList':
				navigation.setOptions({title: route.params?.userobject.user_nickname + '님이 태그된 게시글'});
				break;
			case 'HashFeedList':
				navigation.setOptions({title: '#' + route.params?.hashtag_keyword});
				break;
			default:
				break;
		}
	}, [route.params?.userobject]);

	React.useEffect(() => {
		if (route.name == 'MainHomeFeedList') {
			getMissingReportList(
				{request_number: 10},
				result => {
					console.log('result', result.msg[0]);
					setTopList(result.msg);
				},
				err => {
					console.log('getMissingReportList err', err);
				},
			);
		}
		const getList = () => {
			switch (route.name) {
				case 'UserFeedList':
					getFeedListByUserId(
						{
							userobject_id: route.params?.userobject._id,
							request_number: requestNum,
							login_userobject_id: userGlobalObject.userInfo._id,
						},
						({msg}) => {
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										lines = lines > 3 ? 3 : lines;
										if (v.feed_recent_comment) {
											return {...v, height: (750 + 200 + 120 + 2 + lines * 54) * DP};
										} else {
											return {...v, height: (750 + 72 + 120 + 2 + lines * 54) * DP};
										}
									})
									.map((v, i, a) => {
										let offset = a.slice(0, i).reduce((prev, current) => {
											return current.height + prev;
										}, 0);
										return {
											...v,
											offset: offset,
										};
									}),
							);
						},
						errormsg => {
							Modal.popOneBtn(errormsg, '확인', () => Modal.close());
						},
					);

					break;
				case 'TagMeFeedList':
					getUserTaggedFeedList(
						{
							userobject_id: userGlobalObject.userInfo._id,
							request_number: requestNum,
						},
						({msg}) => {
							console.log(
								'태그',
								msg.findIndex(v => v._id == route.params?.selected._id),
							);
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										lines = lines > 3 ? 3 : lines;
										if (v.feed_recent_comment) {
											return {...v, height: (750 + 200 + 120 + 2 + lines * 54) * DP};
										} else {
											return {...v, height: (750 + 72 + 120 + 2 + lines * 54) * DP};
										}
									})
									.map((v, i, a) => {
										let offset = a.slice(0, i).reduce((prev, current) => {
											return current.height + prev;
										}, 0);
										return {
											...v,
											offset: offset,
										};
									}),
							);
						},
						errormsg => {
							Modal.alert(errormsg);
						},
					);
					break;
				case 'UserTagFeedList':
					getUserTaggedFeedList(
						{
							userobject_id: route.params?.userobject._id,
							request_number: requestNum,
						},
						({msg}) => {
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										lines = lines > 3 ? 3 : lines;
										if (v.feed_recent_comment) {
											return {...v, height: (750 + 200 + 120 + 2 + lines * 54) * DP};
										} else {
											return {...v, height: (750 + 72 + 120 + 2 + lines * 54) * DP};
										}
									})
									.map((v, i, a) => {
										let offset = a.slice(0, i).reduce((prev, current) => {
											return current.height + prev;
										}, 0);
										return {
											...v,
											offset: offset,
										};
									}),
							);
						},
						errormsg => {
							Modal.popOneBtn(errormsg, '확인', () => Modal.close());
						},
					);
					break;
				case 'HashFeedList':
					getFeedsByHash(
						{hashtag_keyword: route.params?.hashtag_keyword},
						({msg}) => {
							// setIndex(msg.feeds.findIndex(v => v.hashtag_feed_id._id == route.params?.selected._id));
							// setFeedList(msg.feeds.map(v => v.hashtag_feed_id));
							setFeedList(
								msg.feeds
									.map(v => v.hashtag_feed_id)
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										lines = lines > 3 ? 3 : lines;
										if (v.feed_recent_comment) {
											return {...v, height: (750 + 200 + 120 + 2 + lines * 54) * DP};
										} else {
											return {...v, height: (750 + 72 + 120 + 2 + lines * 54) * DP};
										}
									})
									.map((v, i, a) => {
										let offset = a.slice(0, i).reduce((prev, current) => {
											return current.height + prev;
										}, 0);
										return {
											...v,
											offset: offset,
										};
									}),
							);
						},
						error => {
							Modal.popOneBtn(error, '확인', () => {
								setTimeout(() => {
									navigation.goBack(), 300;
								});
							});
						},
					);
					break;
				case 'FavoriteFeedList':
					getFavoriteFeedListByUserId(
						{userobject_id: userGlobalObject.userInfo._id},
						({msg}) => {
							// setIndex(msg.feeds.findIndex(v => v.hashtag_feed_id._id == route.params?.selected._id));
							// setFeedList(msg);
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										lines = lines > 3 ? 3 : lines;
										if (v.feed_recent_comment) {
											return {...v, height: (750 + 200 + 120 + 2 + lines * 54) * DP};
										} else {
											return {...v, height: (750 + 72 + 120 + 2 + lines * 54) * DP};
										}
									})
									.map((v, i, a) => {
										let offset = a.slice(0, i).reduce((prev, current) => {
											return current.height + prev;
										}, 0);
										return {
											...v,
											offset: offset,
										};
									}),
							);

							console.log('즐겨찾기 리스트', msg);
						},
						error => {
							Modal.popOneBtn(error, '확인', () => {
								setTimeout(() => {
									navigation.goBack(), 300;
								});
							});
						},
					);
					break;
				default:
					getSuggestFeedList(
						{
							login_userobject_id: userGlobalObject.userInfo._id,
						},
						({msg}) => {
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										if (v.feed_recent_comment) {
											return {...v, height: (750 + 200 + 44 + 128 + 2 + (lines > 3 ? 2 * 54 + 48 : lines * 54)) * DP};
										} else {
											return {...v, height: (750 + 72 + 44 + 2 + (lines > 3 ? 2 * 54 + 48 : lines * 54)) * DP};
										}
									})
									.map((v, i, a) => {
										let offset = a.slice(0, i).reduce((prev, current) => {
											return current.height + prev;
										}, 0);
										return {
											...v,
											offset: offset,
										};
									}),
							);
						},
						errormsg => {
							Modal.popOneBtn(errormsg, '확인', () => Modal.close());
						},
					);
					break;
			}
		};
		//FeedList 스크린 이동시 피드리스트 갱신
		const unsubscribe = navigation.addListener('focus', () => {
			getList();
		});
		//Refreshing 요청시 피드리스트 다시 조회
		refreshing ? getList() : false;
		return unsubscribe;
	}, [refreshing, route]);
	const [refresh, setRefresh] = React.useState(false);
	React.useEffect(() => {
		if (feedList.length > 0) {
			let indx = feedList.findIndex(v => v._id == route.params?.selected?._id);
			if (route.params?.selected) {
				setTimeout(() => {
					flatlist.current.scrollToItem({
						animated: false,
						item: feedList[indx],
					});
				}, 0);
			}
		}
		setRefresh(!refresh);
	}, [feedList]);

	const deleteFeedItem = id => {
		Modal.close();
		setTimeout(() => {
			Modal.popLoading(true);
			deleteFeed(
				{feed_object_id: id},
				result => {
					console.log('result / DeleteFeed / FeedContent : ', result.msg);
					onRefresh();
					Modal.close();
				},
				err => {
					console.log('err / DeleteFeed / FeedContent : ', err);
					Modal.alert(NETWORK_ERROR);
				},
			);
		}, 100);
	};

	const moveToFeedWrite = () => {
		// navigation.push('LocationPicker');
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate({name: 'Login', merge: true});
			});
		} else if (userGlobalObject.userInfo.user_type == 'user') {
			Modal.popAvatarSelectFromWriteModal(obj => {
				userGlobalObject.userInfo && navigation.push('FeedWrite', {feedType: 'Feed', feed_avatar_id: obj});
			});
		} else {
			userGlobalObject.userInfo && navigation.push('FeedWrite', {feedType: 'Feed'});
		}
	};

	const renderItem = ({item}) => {
		return <Feed data={item} deleteFeed={deleteFeedItem} />;
	};

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = () => {
		setRefreshing(true);

		wait(0).then(() => setRefreshing(false));
	};

	const rememberScroll = e => {
		if (e.nativeEvent.contentOffset.y > 0) {
			userGlobalObject.t = e.nativeEvent.contentOffset;
		}
	};
	const moveToTop = () => {
		flatlist.current.scrollToOffset({animated: true, offset: 0});
	};

	const movetoCamera = () => {
		// NativeModules.CalendarModule.createCalendarEvent('네이티브 테스트','스터디카페')
		Modal.popTwoBtn(
			'카메라롤 모드(임시)',
			'단일선택',
			'다중선택',
			() => {
				Modal.close();
				navigation.push("SinglePhotoSelect",{prev:{name:route.name,key:route.key}});
				// navigation.push('Crop');
			},
			() => {
				Modal.close();
				navigation.push('MultiPhotoSelect',{prev:{name:route.name,key:route.key}});
			},
		);
	};

	const [tl, setTl] = React.useState({});
	const [cl, setCl] = React.useState({});
	const [fontSize, setSize] = React.useState(16);
	const [testTx, setTx] = React.useState('한');
	const [code, setCode] = React.useState(62);
	return (
		<View
			style={
				(login_style.wrp_main,
				{
					flex: 1,
					backgroundColor: WHITE,
					// borderTopWidth: 2 * DP,
					// borderTopColor: GRAY30
				})
			}>
			<FlatList
				data={feedList}
				renderItem={renderItem}
				keyExtractor={(item, index) => {
					let key = item._id + item.feed_update_date + item.feed_is_like;
					return key;
				}}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				getItemLayout={(data, index) => {
					if (!data[index]) return {length: 0, offset: 0, index: index};
					return {length: data[index].height, offset: data[index].offset, index: index};
				}}
				ListHeaderComponent={route.name == 'MainHomeFeedList' ? MissingReport : <></>}
				ref={flatlist}
				refreshing
				extraData={refresh}
				onScroll={rememberScroll}
				ItemSeparatorComponent={({highlited}) => (
					<View style={{alignItems: 'center'}}>
						<View style={{height: 2 * DP, backgroundColor: GRAY30, width: 654 * DP}}></View>
					</View>
				)}
			/>
			{userGlobalObject.userInfo && (
				<View style={[{position: 'absolute', bottom: 40 * DP, right: 30 * DP}]}>
					{/* <View
						style={[
							{
								height: 94 * DP,
								width: 94 * DP,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: '#FFF',
								borderRadius: 30 * DP,
								marginBottom: 20 * DP,
							},
							buttonstyle.shadow,
						]}>
						<Camera54 onPress={movetoCamera} />
					</View> */}
					<View
						style={[
							{
								height: 94 * DP,
								width: 94 * DP,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: '#ff9888',
								borderRadius: 35 * DP,
								marginBottom: 20 * DP,
							},
							buttonstyle.shadow,
						]}>
						<Write94 onPress={moveToFeedWrite} />
					</View>
				</View>
			)}

			{false && (
				<View style={{backgroundColor: 'red', width: 750 * DP, top: 0, position: 'absolute'}}>
					<View style={{backgroundColor: 'yellow', marginBottom: 20}}>
						<Text style={{fontSize: 12}}>
							텍스트 사이즈 테스트용
							{'\n'}기기 레이아웃 {Dimensions.get('window').width} DP,해상도{Dimensions.get('window').width * PixelRatio.get()}px
							{'\n'}컨테이너 높이 : {cl.height}, {'\n'}너비 : {cl.width} {'\n'}W/H : {cl.width / cl.height}
							{'\n\n'}ascender : {tl.ascender}, rPx:{PixelRatio.roundToNearestPixel(tl.ascender)} {'\n'}baseline : {tl.baseline}, rPx:
							{PixelRatio.roundToNearestPixel(tl.baseline)} {'\n'}capheight : {tl.capHeight}, rPx:{PixelRatio.roundToNearestPixel(tl.capHeight)}
							{'\n'}descender: {tl.descender}, rPx:{PixelRatio.roundToNearestPixel(tl.descender)}
							{'\n'}height: {tl.height}, rPx:{PixelRatio.roundToNearestPixel(tl.height)}
							{'\n'}xHeight: {tl.xHeight}, rPx:{PixelRatio.roundToNearestPixel(tl.xHeight)}
							{'\n'}width:{tl.width}, rPx:{PixelRatio.roundToNearestPixel(tl.width)}
							{'\n'} W/H : {tl.width / tl.height}
							{'\n'}픽셀비 : {PixelRatio.get()}, 폰트스케일 : {PixelRatio.getFontScale()}
							{'\n\n'}추정 텍스트 사이즈 pt는? {}
							{'\n'}글자 높이 px : {tl.height * PixelRatio.get()}, 폰트사이즈: {fontSize}
							{'\n'}글자 높이 인치 (445ppi안드로이드) : {Math.round(tl.height * 3) / 445}
							{'\n'}글자 높이와 폰트 사이즈 비 : {tl.height / fontSize}
							{'\n'}글자 너비와 폰트 사이즈 비 : {tl.width / fontSize}
							{'\n'}글자 포인트(1pt는 1/72인치) : {Math.round(tl.capHeight * 3)}
							{'\n'}dp당 픽셀 : {1 / PixelRatio.get()}
							{'\n'}dp당 픽셀2 : {2 / PixelRatio.get()}
							{'\n'}dp당 픽셀3 : {3 / PixelRatio.get()}
							{'\n'}dp당 픽셀4 : {4 / PixelRatio.get()}
							{'\n'}dp당 픽셀5 : {5 / PixelRatio.get()}
							{'\n'}
						</Text>
						<View style={{flexDirection: 'row'}}>
							<Text style={{backgroundColor: 'gold', height: '100%'}}>폰트 사이즈 : </Text>
							<TextInput
								style={{backgroundColor: 'white', fontSize: 12, includeFontPadding: false, padding: 0}}
								onChange={e => {
									console.log(e.nativeEvent.text);
									setSize(parseFloat(e.nativeEvent.text) > 0 ? parseFloat(e.nativeEvent.text) : 16);
								}}></TextInput>
						</View>
						<View style={{flexDirection: 'row', backgroundColor: 'gold'}}>
							<Text style={{backgroundColor: 'gold', height: '100%'}}>측정할 문자 : </Text>
							<TextInput
								style={{backgroundColor: 'white', fontSize: 12, includeFontPadding: false, padding: 0}}
								onChange={e => {
									console.log(e.nativeEvent.text);
									e.nativeEvent.text.length > 0 ? setTx(e.nativeEvent.text) : setTx(' ');
								}}></TextInput>
							<Text>문자코드번호 {testTx.codePointAt(0)}</Text>
						</View>
						<View style={{flexDirection: 'row'}}>
							<Text style={{backgroundColor: 'gold', height: '100%'}}>코드번호 입력 : </Text>
							<TextInput
								style={{backgroundColor: 'white', fontSize: 12, includeFontPadding: false, padding: 0}}
								onChange={e => {
									console.log(e.nativeEvent.text);
									setCode(parseInt(e.nativeEvent.text));
								}}></TextInput>
							<Text>해당 코드의 문자 : {String.fromCodePoint(code > 0 ? code : 1)}</Text>
						</View>
					</View>
					<View
						style={{backgroundColor: 'green', position: 'absolute', bottom: -100000000, left: '50%'}}
						onLayout={e => {
							console.log('컨테이너', e.nativeEvent.layout);
							setCl(e.nativeEvent.layout);
							navigation.setOptions({header: props => false});
						}}>
						<Text
							onLayout={e => {
								console.log('글', e.nativeEvent.layout);
							}}
							onTextLayout={e => {
								console.log('텍스트레이아웃', e.nativeEvent);
								setTl(e.nativeEvent.lines[0]);
							}}
							// style={{fontFamily:'NotoSansKR-Regular',fontSize:fontSize,includeFontPadding:false,padding:0}}
							style={{fontFamily: 'NotoSansKR-Bold', fontSize: fontSize, includeFontPadding: false, padding: 0}}
							// style={{fontFamily:'Roboto-Regular',fontSize:fontSize,includeFontPadding:false,padding:0}}
							// style={{fontFamily:'Roboto-Bold',fontSize:fontSize,includeFontPadding:false,padding:0}}
							// style={{fontFamily:'NotoSansKR-Regular',fontSize:fontSize}}
							// style={{fontSize:fontSize,includeFontPadding:false,padding:0}}
							// style={{fontSize:fontSize}}
						>
							{testTx}
						</Text>
					</View>
					<TouchableWithoutFeedback
						onPress={() => {
							NativeModules.TextMeasureModule.getTextWidthTable({
								fontFamily: 'NotoSansKR-Bold',
								fontSize: fontSize,
							}).then(r => console.log('폰트정보', r));
						}}>
						<View style={{backgroundColor: 'blue', width: 100, height: 100, bottom: 0, left: 0}} />
					</TouchableWithoutFeedback>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 654 * DP,
		// height: 496 * DP,
		alignContent: 'center',
		alignSelf: 'center',
		marginBottom: 22 * DP,
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 40 * DP,
	},
});
