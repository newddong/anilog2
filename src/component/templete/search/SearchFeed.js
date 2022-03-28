import React from 'react';
import {Text, View} from 'react-native';
import {login_style, searchFeed, temp_style, temp_txt} from 'Templete/style_templete';
import FeedThumbnailList from 'Organism/feed/FeedThumbnailList';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';
import {txt} from 'Root/config/textstyle';
import {GRAY10} from 'Root/config/color';
import ListEmptyInfo from 'Molecules/info/ListEmptyInfo';
import {getSuggestFeedList} from 'Root/api/feedapi';
import {useNavigation} from '@react-navigation/core';
import searchContext from 'Root/config/searchContext';
import Modal from 'Root/component/modal/Modal';
import Loading from 'Root/component/molecules/modal/Loading';

export default SearchFeed = React.memo((props, ref) => {
	const navigation = useNavigation();
	const [feedList, setFeedList] = React.useState('');
	const [showOnlyProtect, setShowOnlyProtect] = React.useState(false);

	React.useEffect(() => {
		searchContext.searchInfo.routeName = props.route.name;
		async function fetchData() {
			const feed = await getFeedList();
			setFeedList(feed);
		}
		fetchData(); // effect Hook에서 async await 구문을 쓰기 위한 처리
	}, [navigation]);

	//임보일기 글만 보기 여부
	const getOnlyProtect = () => {
		let filtered = feedList.filter(e => e.feed_is_protect_diary == true);
		return filtered;
	};

	const getFeedList = async () => {
		return new Promise(async function (resolve, reject) {
			try {
				getSuggestFeedList(
					{},
					res => {
						resolve(res.msg);
					},
					err => console.log('err / getSuggestFeedList / SearchFeed', err),
				);
			} catch (error) {
				console.log('error getRoadAddr  :  ', error.message);
			}
		});
	};

	const onSwtichOn = () => {
		console.log('임시보호 게시글만 보기');
		setShowOnlyProtect(true);
	};

	const onSwtichOff = () => {
		console.log('임시보호 게시글만 보기 OFF');
		setShowOnlyProtect(false);
	};

	//피드 클릭
	const onClickThumnail = (index, feed) => {
		navigation.navigate('UserFeedList', {userobject: feed.feed_writer_id, selected: feed});
	};

	if (feedList == '') {
		return <Loading isModal={false} />;
	} else
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
					<FeedThumbnailList
						items={showOnlyProtect ? getOnlyProtect() : feedList}
						onClickThumnail={onClickThumnail}
						whenEmpty={<ListEmptyInfo text={'피드 게시글이 없습니다'} />}
					/>
				</View>
			</View>
		);
});
