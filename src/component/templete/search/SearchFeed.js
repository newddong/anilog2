import React from 'react';
import {Text, View} from 'react-native';
import {login_style, searchFeed, temp_style, temp_txt} from 'Templete/style_templete';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
import {dummy_FeedObject} from 'Root/config/dummyDate_json';
import ListEmptyInfo from 'Molecules/info/ListEmptyInfo';
import {getSuggestFeedList} from 'Root/api/feedapi';

export default SearchFeed = ({route, navigation}) => {
	const [feedList, setFeedList] = React.useState([]);

	const onClickThumnail = (index, feed) => {
		navigation.navigate('UserFeedList', {userobject: feed.feed_writer_id, selected: feed});
	};

	const [showOnlyProtect, setShowOnlyProtect] = React.useState(false);

	React.useEffect(() => {
		getSuggestFeedList(
			{},
			res => {
				// console.log('res', res.msg[0]);
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
	}, [showOnlyProtect]);

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
};
