import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {searchHashTag, temp_style} from 'Templete/style_templete';
import Modal from 'Root/component/modal/Modal';
import Loading from 'Root/component/molecules/modal/Loading';

export default SearchHashTag = React.memo((props, ref) => {
	// console.log('searchInput / SearchHashTag : ', props.search.searchInput);

	const [findList, setFindList] = React.useState([]);

	const onClickHashTag = e => {
		console.log('onClickHashTag', e);
	};

	const hashSelect = e => {
		props.navigation.push('FeedListForHashTag', e);
	};

	const dummy = [
		{
			__v: 0,
			_id: '61d3094cce5bd4c9dba4b7b5',
			hashtag_date: '2022-01-03T14:33:48.354Z',
			hashtag_feed_count: 1,
			hashtag_keyword: '고양이',
			hashtag_update_date: '2022-01-03T14:33:48.354Z',
			type: 'HashTagObject',
		},
	];
	if (props.loading) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[searchHashTag.container, {backgroundColor: 'white'}]}>
				{/* // 검색 내역이 존재할 경우 API를 통해 받아온 내역 출력 */}

				{props.data.length != 0 ? (
					<ScrollView horizontal={false} contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}>
						<ScrollView horizontal={true} scrollEnabled={false}>
							<View style={[temp_style.hashTagList]}>
								<AccountHashList data={props.data} showFollowBtn={false} onClickLabel={onClickHashTag} onClickHash={hashSelect} />
							</View>
						</ScrollView>
					</ScrollView>
				) : (
					// {/* 검색내역이 없을 경우 최근 검색한 태그를 출력 */}
					<ScrollView contentContainerStyle={{}}>
						<View style={[temp_style.controllableHashTagList]}>
							<Text style={[txt.noto24, {color: GRAY20}]}>최근 검색한 태그</Text>
						</View>
						<ScrollView horizontal={false} contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}>
							<ScrollView horizontal={true} scrollEnabled={false}>
								<View style={[temp_style.hashTagList]}>
									<AccountHashList data={dummy} showFollowBtn={false} onClickLabel={onClickHashTag} onClickHash={hashSelect} />
								</View>
							</ScrollView>
						</ScrollView>
					</ScrollView>
				)}
			</View>
		);
});
