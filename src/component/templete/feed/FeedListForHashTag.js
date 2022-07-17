import React from 'react';
import {Text, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
import {feedListForHashTag, login_style, temp_style} from 'Templete/style_templete';
import {useNavigation} from '@react-navigation/core';
import HashLabel from 'Molecules/label/HashLabel';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import {getFeedsByHash} from 'Root/api/hashapi';
import Modal from 'Component/modal/Modal';

export default FeedListForHashTag = props => {
	// console.log('FeedListForHashTag Props.route.params : ', props.route.params);
	const [hashInfo, setHashInfo] = React.useState(props.route.params);
	const [feeds, setFeeds] = React.useState([]);
	const navigation = useNavigation();
	const [focused, setFocused] = React.useState(true);

	const moveToHashFeedList = (index, item) => {
		console.log('item', item._id);
		navigation.navigate({key: item._id, name: 'HashFeedList', params: {selected: item, hashtag_keyword: hashInfo.hashtag_keyword, index: index}});
	};
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setFocused(true);
		});
		return unsubscribe;
	}, [navigation]);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('blur', () => {
			setFocused(false);
		});
		return unsubscribe;
	}, [navigation]);

	React.useEffect(() => {
		navigation.setOptions({title: '#' + hashInfo.hashtag_keyword});
	}, []);

	React.useEffect(() => {
		if (hashInfo && hashInfo.hashtag_keyword) {
			getFeedsByHash(
				{hashtag_keyword: hashInfo.hashtag_keyword},
				result => {
					// console.log('해쉬 피드리스트', result);
					setFeeds(
						result.msg.feeds
							.filter(e => e.hashtag_feed_id != null && e.hashtag_feed_id.feed_is_delete != true)
							.map(v => {
								if (v.hashtag_feed_id) {
									return v.hashtag_feed_id;
								}
							}),
					);
					setHashInfo(result.msg.hash);
				},
				error => {
					Modal.popOneBtn(error, '확인', () => {
						setTimeout(() => {
							navigation.goBack(), 300;
						});
					});
				},
			);
		}
	}, []);

	return (
		<View style={[feedListForHashTag.container, {}]}>
			{/* HashTagInfo */}
			<View style={[feedListForHashTag.hashTagInfo, {}]}>
				<View style={[feedListForHashTag.hashLabel]}>
					<HashLabel keyword={hashInfo.hashtag_keyword} keywordBold={hashInfo.keywordBold} count={hashInfo.hashtag_feed_count} />
				</View>
			</View>
			<ScrollView horizontal={false} contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}>
				<ScrollView horizontal={true} scrollEnabled={false}>
					<View style={[feedListForHashTag.feedThumbnailList]}>
						<FeedThumbnailList items={feeds} onClickThumnail={moveToHashFeedList} focused={focused} />
					</View>
				</ScrollView>
			</ScrollView>
		</View>
	);
};

FeedListForHashTag.defaultProps = {
	route: {
		params: {
			hashtag_keyword: 'KEyword',
			keywordBold: true,
			hashtag_feed_count: 0,
		},
	},
};
// HashLabel.defaultProps = {
// 	keyword: '#KEYWORD',
// 	keywordBold: true,
// 	count: 'Count한 게시물',
// };
