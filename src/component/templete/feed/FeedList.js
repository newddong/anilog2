import React from 'react';
import {StyleSheet, View, FlatList, RefreshControl, Platform} from 'react-native';
import {WHITE} from 'Root/config/color';
import {Write94} from 'Atom/icon';
import Feed from 'Organism/feed/Feed';
import {getSuggestFeedList} from 'Root/api/feedapi';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';
import {getFeedListByUserId} from 'Root/api/feedapi';
import {getFeedsByHash} from 'Root/api/hashapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {login_style, buttonstyle} from 'Templete/style_templete';
import {getStringLength, getLinesOfString} from 'Root/util/stringutil';
import propTypes from 'prop-types';

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
						},
						({msg}) => {
							// setIndex(msg.findIndex(v => v._id == route.params?.selected._id));
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										return {...v, height: (1060 + (lines > 3 ? 2 * 54 + 48 : lines * 54)) * DP};
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
				default:
					getSuggestFeedList(
						{},
						({msg}) => {
							// console.log('msg', msg);
							// setFeedList(msg);
							setFeedList(
								msg
									.map((v, i, a) => {
										let lines = getLinesOfString(v.feed_content, Platform.OS == 'android' ? 48 : 50);
										return {...v, height: (1060 + (lines > 3 ? 2 * 54 + 48 : lines * 54)) * DP};
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

	React.useEffect(() => {
		if (feedList.length > 0) {
			let indx = feedList.findIndex(v => v._id == route.params?.selected._id);
			console.log('인덱스', indx);
			if(route.name=='UserFeedList'){
				setTimeout(()=>{
					flatlist.current.scrollToIndex({
						animated: false,
						index: indx>0?indx:0,
					});
				},0)
			}else{
				setTimeout(()=>{
					flatlist.current.scrollToOffset({
						offset: userGlobalObject.t.y,
						animated:false
					})
				},0)
			}
		}
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

		wait(1000).then(() => setRefreshing(false));
	};

	const rememberScroll = e=>{
		if(e.nativeEvent.contentOffset.y>0){
		userGlobalObject.t = e.nativeEvent.contentOffset;
		}
	}

	return (
		<View style={(login_style.wrp_main, {flex: 1, backgroundColor: WHITE})}>
			<FlatList
				data={feedList}
				renderItem={renderItem}
				keyExtractor={(item, index) => {
					let key = item._id + item.feed_update_date;
					return key;
				}}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				getItemLayout={(data, index) => {
					if (!data[index]) return {length: 0, offset: 0, index: index};
					return {length: data[index].height, offset: data[index].offset, index: index};
				}}
				ref={flatlist}
				refreshing
				onScroll={rememberScroll}
			/>
			{userGlobalObject.userInfo && (
				<View style={[{position: 'absolute', bottom: 40 * DP, right: 30 * DP}, buttonstyle.shadow]}>
					<Write94 onPress={moveToFeedWrite} />
				</View>
			)}
		</View>
	);
};
