import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {temp_style} from 'Templete/style_templete';
import Loading from 'Root/component/molecules/modal/Loading';
import {EmptyIcon} from 'Root/component/atom/icon';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';

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

	const whenEmpty = () => {
		return <ListEmptyInfo text={'검색 결과가 없습니다..'} />;
	};

	if (props.loading) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={[{}]}
					renderItem={({item, index}) => {
						return (
							<View style={[style.listContainer]}>
								{/* // 검색 내역이 존재할 경우 API를 통해 받아온 내역 출력 */}
								{props.data.length != 0 ? (
									<View style={[temp_style.hashTagList]}>
										<AccountHashList data={props.data} showFollowBtn={false} onClickLabel={onClickHashTag} onClickHash={hashSelect} />
									</View>
								) : (
									<>
										{/* <View style={[temp_style.controllableHashTagList]}>
											<Text style={[txt.noto24, {color: GRAY20}]}>최근 검색한 태그</Text>
										</View>
										<View style={[temp_style.hashTagList]}>
											<AccountHashList data={dummy} showFollowBtn={false} onClickLabel={onClickHashTag} onClickHash={hashSelect} />
										</View> */}
										{whenEmpty()}
									</>
								)}
							</View>
						);
					}}
					showsVerticalScrollIndicator={false}
					listKey={({item, index}) => index}
				/>
			</View>
		);
});

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	filter: {
		width: 676 * DP,
		paddingTop: 15 * DP,
		paddingBottom: 10 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	filter_community_type: {
		flexDirection: 'row',
	},
	shadow_filter: {
		// width: 140 * DP,
		height: 60 * DP,
		justifyContent: 'space-between',
		flexDirection: 'row',
		shadowOpacity: 0.5,
		elevation: 2,
		shadowOffset: {
			height: 4 * DP,
		},
		borderRadius: 20 * DP,
	},
	listContainer: {},
});
