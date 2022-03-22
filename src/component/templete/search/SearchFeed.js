import React from 'react';
import {Text, View} from 'react-native';
import {login_style, searchFeed, temp_style, temp_txt} from 'Templete/style_templete';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
<<<<<<< HEAD:src/component/templete/search/SearchFeed.js
import {dummy_FeedObject} from 'Root/config/dummyDate_json';
=======
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/templete/SearchFeed.js
import ListEmptyInfo from 'Molecules/info/ListEmptyInfo';
import {getSuggestFeedList} from 'Root/api/feedapi';
import {useNavigation} from '@react-navigation/core';
import searchContext from 'Root/config/searchContext';

export default SearchFeed = React.memo((props, ref) => {
	const navigation = useNavigation();
	const [feedList, setFeedList] = React.useState([]);

	const onClickThumnail = (index, feed) => {
		navigation.navigate('UserFeedList', {userobject: feed.feed_writer_id, selected: feed});
	};

	const [showOnlyProtect, setShowOnlyProtect] = React.useState(false);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			searchContext.searchInfo.routeName = props.route.name;
			getSuggestFeedList(
				{},
				res => {
					console.log('getSuggestFeedList');
					//임시보호 일기 게시글만 보기
					if (showOnlyProtect) {
						let filtered = [];
						res.msg.map((v, i) => {
							v.feed_is_protect_diary ? filtered.push(v) : false;
						});
						setFeedList(filtered);
					} else {
						setFeedList(res.msg);
					}
				},
				err => console.log('err', err),
			);
		});
		return unsubscribe;
	}, [navigation]);

	const onSwtichOn = () => {
		console.log('임시보호 게시글만 보기');
		setShowOnlyProtect(true);
	};

	const onSwtichOff = () => {
		console.log('임시보호 게시글만 보기 OFF');
		setShowOnlyProtect(false);
	};

	return (
		<View style={[login_style.wrp_main, searchFeed.container]}>
			<View style={[searchFeed.stateView]}>
				<View style={[searchFeed.showStateView]}>
					<View style={[searchFeed.showStateView.text]}>
						<Text style={[txt.noto20, {color: GRAY10}]}>임시보호 게시글만 보기</Text>
					</View>
					<View style={[temp_style.onOffSwitch, searchFeed.showStateView.onOffSwitch]}>
						<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
					</View>
				</View>
				<View style={[searchFeed.postState]}>
					<Text style={[temp_txt.small]}>추천 게시글</Text>
				</View>
			</View>
			{/* 썸네일 리스트 */}
			<View style={[temp_style.feedThumbnailList]}>
				<FeedThumbnailList items={feedList} onClickThumnail={onClickThumnail} whenEmpty={<ListEmptyInfo text={'피드 게시글이 없습니다'} />} />
			</View>
		</View>
	);
});
