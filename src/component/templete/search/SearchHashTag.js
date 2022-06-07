import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import Loading from 'Root/component/molecules/modal/Loading';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import DP from 'Root/config/dp';

export default SearchHashTag = React.memo((props, ref) => {
	// console.log('searchInput / SearchHashTag : ', props.search.searchInput);

	const [findList, setFindList] = React.useState([]);

	const onClickHashTag = e => {
		console.log('onClickHashTag', e);
	};

	const hashSelect = e => {
		props.navigation.push('FeedListForHashTag', e);
	};

	const whenEmpty = () => {
		return <ListEmptyInfo paddingVertical={600 * DP} text={'검색 결과가 없습니다..'} />;
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
							<>
								{/* // 검색 내역이 존재할 경우 API를 통해 받아온 내역 출력 */}
								<View style={{marginTop: 12 * DP, width: 694 * DP, alignSelf: 'center'}}>
									<Text style={[txt.noto24, {color: GRAY10}]}>검색 결과 {props.data.length}개</Text>
								</View>
								{props.data.length != 0 ? (
									<View style={[style.hashTagList]}>
										<AccountHashList data={props.data} showFollowBtn={false} onClickLabel={onClickHashTag} onClickHash={hashSelect} />
									</View>
								) : (
									<>{whenEmpty()}</>
								)}
							</>
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
	hashTagList: {
		width: 750 * DP,
		marginTop: 10 * DP,
	},
});
