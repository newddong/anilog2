import React from 'react';
import {Text, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
import {feedListForHashTag, login_style, temp_style} from 'Templete/style_templete';
import {useNavigation} from '@react-navigation/core';
import HashLabel from 'Molecules/label/HashLabel';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import {getFeedsByHash} from 'Root/api/hashapi';
import Modal from 'Component/modal/Modal';

export default FeedListForHashTag = props => {
	console.log('FeedListForHashTag Props.route.params : ', props.route.params);
	const [hashInfo, setHashInfo] = React.useState(props.route.params);
	const [feeds, setFeeds] = React.useState([]);
	const navigation = useNavigation();
	const moveToHashFeedList = (index, item) => {
		navigation.push('HashFeedList', {selected: item, hashtag_keyword: hashInfo.hashtag_keyword});
	};
	const [showRecent, setShowRecent] = React.useState(true);

	//최근 게시글 버튼 클릭
	const showRecentFeed = () => {
		setShowRecent(true);
	};
	//추천 게시글 버튼 클릭
	const showRecommendedFeed = () => {
		setShowRecent(false);
	};

	React.useEffect(() => {
		navigation.setOptions({title: '#' + hashInfo.hashtag_keyword});
	}, []);

	React.useEffect(() => {
		if (hashInfo && hashInfo.hashtag_keyword) {
			getFeedsByHash(
				{hashtag_keyword: hashInfo.hashtag_keyword},
				result => {
					console.log('해쉬 피드리스트', result);
					setFeeds(result.msg.feeds.map(v => v.hashtag_feed_id));
					setHashInfo(result.msg.hash);
					// setFeeds(result.msg.feeds.map(v=>v.hashtag_feed_id));
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
		<View style={[login_style.wrp_main, feedListForHashTag.container]}>
			{/* HashTagInfo */}
			<View style={[feedListForHashTag.hashTagInfo]}>
				<View style={[feedListForHashTag.hashLabel]}>
					<HashLabel keyword={hashInfo.hashtag_keyword} keywordBold={hashInfo.keywordBold} count={hashInfo.hashtag_feed_count} />
				</View>
				{/* 최근 게시글 / 추천 게시글 */}
				<View style={[feedListForHashTag.postCategory]}>
					<TouchableOpacity onPress={showRecentFeed}>
						<Text style={[txt.noto24, {color: showRecent ? APRI10 : 'black'}]}>최근게시글 </Text>
					</TouchableOpacity>
					<Text style={{}}> | </Text>
					<TouchableOpacity onPress={showRecommendedFeed}>
						<Text style={[txt.noto24, {color: !showRecent ? APRI10 : 'black'}]}> 추천게시글</Text>
					</TouchableOpacity>
				</View>
			</View>
			{/* FeedThumbnailList */}
			<View style={[temp_style.feedThumbnailList]}>
				<FeedThumbnailList items={feeds} onClickThumnail={moveToHashFeedList} />
			</View>
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
