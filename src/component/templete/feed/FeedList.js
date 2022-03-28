import React from 'react';
import {StyleSheet, View, FlatList, RefreshControl, Platform} from 'react-native';
import {WHITE} from 'Root/config/color';
import {Write94, Camera54} from 'Atom/icon';
import Feed from 'Organism/feed/Feed';
import {getSuggestFeedList} from 'Root/api/feedapi';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';
import {getFeedListByUserId, getFavoriteFeedListByUserId, getUserTaggedFeedList} from 'Root/api/feedapi';
import {getFeedsByHash} from 'Root/api/hashapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {login_style, buttonstyle} from 'Templete/style_templete';
import {getStringLength, getLinesOfString} from 'Root/util/stringutil';
import { GRAY30 } from 'Root/config/color';

export default FeedList = ({route, navigation}) => {
	const [feedList, setFeedList] = React.useState([]);
	const [refreshing, setRefreshing] = React.useState(false);
	const [index, setIndex] = React.useState(0);
	const flatlist = React.useRef();
	//피드썸네일 클릭 리스트일 경우
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
		const getList = () => {
			switch (route.name) {
				case 'UserFeedList':
					getFeedListByUserId(
						{
							userobject_id: route.params?.userobject._id,
							request_number: 9999,
							login_userobject_id : userGlobalObject.userInfo._id,
						},
						({msg}) => {
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										lines = lines > 3 ? 3 : lines;
										if(v.feed_recent_comment){
											return {...v, height: (750+ 200+ 120+2+ lines*54) * DP};
										}
										else{
											return {...v, height: (750+  72+ 120+2+ lines*54) * DP};
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
					case 'UserTagFeedList':
						getUserTaggedFeedList(
							{
								userobject_id: route.params?.userobject._id,
								request_number: 9999,
							},
							({msg}) => {
								console.log('태그',msg.findIndex(v => v._id == route.params?.selected._id));
								setFeedList(
									msg
										.map((v, i, a) => {
											let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
											lines = lines > 3 ? 3 : lines;
											if(v.feed_recent_comment){
												return {...v, height: (750+ 200+ 120+2+ lines*54) * DP};
											}
											else{
												return {...v, height: (750+  72+ 120+2+ lines*54) * DP};
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
							setIndex(msg.feeds.findIndex(v => v.hashtag_feed_id._id == route.params?.selected._id));

							setFeedList(msg.feeds.map(v => v.hashtag_feed_id));
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
						{userobject_id : userGlobalObject.userInfo._id},
						({msg}) => {
							// setIndex(msg.feeds.findIndex(v => v.hashtag_feed_id._id == route.params?.selected._id));

							setFeedList(msg);
							console.log('즐겨찾기 리스트', msg)
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
							login_userobject_id : userGlobalObject.userInfo._id
						},
						({msg}) => {
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										if(v.feed_recent_comment){
											return {...v, height: (750+ 200+ 44 +128+2+ (lines > 3 ? 2 * 54 + 48 : lines * 54)) * DP};
										}
										else{
											return {...v, height: (750+ 72+ 44 + 2 + (lines > 3 ? 2 * 54 + 48 : lines * 54)) * DP};
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
	const [refresh,setRefresh] = React.useState(false);
	React.useEffect(() => {
		if (feedList.length > 0) {
			let indx = feedList.findIndex(v => v._id == route.params?.selected._id);
			if(route.params?.selected){
				setTimeout(()=>{
					flatlist.current.scrollToItem({
						animated: false,
						item: feedList[indx]
					})
				},0)
			}
		}
		setRefresh(!refresh);
	}, [feedList]);

	const moveToFeedWrite = () => {
		userGlobalObject.userInfo && navigation.push('FeedWrite', {feedType: 'Feed'});
	};

	const renderItem = ({item}) => {
		return <Feed data={item} />;
	};

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = () => {
		setRefreshing(true);

		wait(0).then(() => setRefreshing(false));
	};

	const rememberScroll = e=>{
		if(e.nativeEvent.contentOffset.y>0){
		userGlobalObject.t = e.nativeEvent.contentOffset;
		}
	}

	const movetoCamera = () => {
		Modal.popTwoBtn('카메라롤 모드(임시)','단일선택','다중선택',
		()=>{
			Modal.close();
			navigation.push('SinglePhotoSelect');
		},
		()=>{
			Modal.close();
			navigation.push('MultiPhotoSelect');
		})
	}
	return (
		<View style={(login_style.wrp_main, {flex: 1, backgroundColor: WHITE})}>
			<FlatList
				data={feedList}
				renderItem={renderItem}
				keyExtractor={(item, index) => {
					let key = item._id + item.feed_update_date+item.feed_is_like;
					return key;
				}}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				getItemLayout={(data, index) => {
					if (!data[index]) return {length: 0, offset: 0, index: index};
					return {length: data[index].height, offset: data[index].offset, index: index};
				}}
				ref={flatlist}
				refreshing
				extraData={refresh}
				onScroll={rememberScroll}
				ItemSeparatorComponent={({highlited})=><View style={{alignItems:'center'}}>
					<View style={{height:2*DP,backgroundColor:GRAY30,width:654*DP}}></View>
				</View>}
			/>
			{userGlobalObject.userInfo && (
				<View style={[{position: 'absolute', bottom: 40 * DP, right: 30 * DP}, buttonstyle.shadow]}>
					<View style={{height: 84*DP, width:84*DP,justifyContent:'center',alignItems:'center',backgroundColor:'#FFF',borderRadius:30*DP,marginBottom:20*DP}}>
						<Camera54 onPress={movetoCamera} /></View>
					<Write94 onPress={moveToFeedWrite} />
				</View>
			)}
		</View>
	);
};
