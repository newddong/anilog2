import React from 'react';
import {Text, View, TouchableWithoutFeedback, FlatList, ScrollView, RefreshControl} from 'react-native';
import {WHITE} from 'Root/config/color';
import {Write94} from '../atom/icon';
import Feed from '../organism/Feed';
import {feedList, login_style, missingAnimalDetail, temp_style} from './style_templete';
import {getSuggestFeedList} from 'Root/api/feedapi';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';
import {getFeedListByUserId} from 'Root/api/feedapi';
import {getFeedsByHash} from 'Root/api/hashapi';
import userGlobalObject from 'Root/config/userGlobalObject';

export default FeedList = ({route, navigation}) => {
	const ITEM_HEIGHT = 1222*DP;
	const [feedList, setFeedList] = React.useState([]);
	const [refreshing, setRefreshing] = React.useState(false);
	const [index, setIndex] = React.useState(0);
	//피드썸네일 클릭 리스트일 경우
	React.useEffect(() => {
		// console.log('userobject', route.params?.userobject);
		switch (route.name) {
			case 'UserFeedList':
				navigation.setOptions({title: route.params?.userobject.user_nickname + '님의 게시글'});
				break;
			case 'HashFeedList':
				navigation.setOptions({title: '#'+route.params?.hashtag_keyword});
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
							userobject_id : route.params?.userobject._id,
							request_number: 9999
						},
						({msg})=>{
							setIndex(msg.findIndex(v=>v._id==route.params?.selected._id));
							setFeedList(msg);
						},
						errormsg => {
							Modal.popOneBtn(errormsg, '확인', () => Modal.close());
						},
					)
					break;
				case 'HashFeedList':
					getFeedsByHash(
						{hashtag_keyword: route.params?.hashtag_keyword},
						({msg})=>{
							setIndex(msg.feeds.findIndex(v=>v.hashtag_feed_id._id==route.params?.selected._id));
							
							setFeedList(msg.feeds.map(v=>v.hashtag_feed_id));
						},
						error => {
							Modal.popOneBtn(error,'확인',()=>{setTimeout(()=>{navigation.goBack(),300})})
						},
					);
				break;
				default:
					getSuggestFeedList(
						{},
						({msg}) => {
							// console.log('msg', msg);
							setFeedList(msg);
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
	}, [refreshing]);

	const moveToFeedWrite = () => {
		userGlobalObject.userInfo && navigation.push('FeedWrite', {feedType: 'Feed'});
	};

	const renderItem = item => {
		return <Feed data={item} />;
	};

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = () => {
		setRefreshing(true);

		wait(2000).then(() => setRefreshing(false));
	};
	
	return (
		<View style={[login_style.wrp_main, {flex: 1, backgroundColor: WHITE}]}>
			<FlatList
				data={feedList}
				renderItem={({item}) => renderItem(item)}
				keyExtractor={(item, index) => index}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				getItemLayout={(data, index) => (
					{length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
				)}
				initialScrollIndex={index}
			/>
			{userGlobalObject.userInfo && (
				<View style={{position: 'absolute', bottom: 40 * DP, right: 30 * DP}}>
					<Write94 onPress={moveToFeedWrite} />
				</View>
			)}
		</View>
	);
};
