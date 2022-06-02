import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {BLACK, GRAY10} from 'Root/config/color';
import {Check50, Rect50_Border} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {useNavigation} from '@react-navigation/core';
import Loading from 'Root/component/molecules/modal/Loading';
import searchContext from 'Root/config/searchContext';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import DP from 'Root/config/dp';

export default SearchArticle = props => {
	// console.log('ArticleMain');
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data.free ? props.data.free : []);
	const [searchInput, setSearchInput] = React.useState('');

	//검색탭 헤더의 인풋값이 바뀔 때마다 계정과 해쉬를 받아오는 api에 접속
	React.useEffect(() => {
		setSearchInput(searchContext.searchInfo.searchInput);
	}, [searchContext.searchInfo.searchInput]);

	React.useEffect(() => {
		if (props.data.free) {
			let temp = props.data.free;
			temp.map((v, i) => {
				v.community_is_favorite = v.is_favorite;
			});
			setData(temp);
		}
	}, [props.data]);

	// 게시글 내용 클릭
	const onPressArticle = index => {
		navigation.push('ArticleDetail', {community_object: getData()[index], searchInput: searchInput});
	};

	const [onlyTalk, setOnlyTalk] = React.useState(false);
	const [onlyQuestion, setOnlyQuestion] = React.useState(false);
	const [onlyMeeting, setOnlyMeeting] = React.useState(false);

	const onPressFilter = type => {
		switch (type) {
			case '잡담':
				setOnlyTalk(!onlyTalk);
				setOnlyQuestion(false);
				setOnlyMeeting(false);
				break;
			case '질문':
				setOnlyTalk(false);
				setOnlyQuestion(!onlyQuestion);
				setOnlyMeeting(false);
				break;
			case '모임':
				setOnlyTalk(false);
				setOnlyQuestion(false);
				setOnlyMeeting(!onlyMeeting);
				break;
			default:
				break;
		}
	};

	const getData = () => {
		let filtered = data;
		if (onlyTalk) {
			filtered = filtered.filter(e => e.community_free_type == 'talk');
		} else if (onlyQuestion) {
			filtered = filtered.filter(e => e.community_free_type == 'question');
		} else if (onlyMeeting) {
			filtered = filtered.filter(e => e.community_free_type == 'meeting');
		}
		return filtered;
	};

	const whenEmpty = () => {
		return <ListEmptyInfo paddingVertical={450 * DP} text={'검색 결과가 없습니다..'} />;
	};

	const header = () => {
		return (
			<View style={[style.filterCont]}>
				<View style={[style.kindFilter]}>
					<View style={[style.kindFilterItem]}>
						<Text style={[txt.noto28, {color: GRAY10}]}> 잡담</Text>
						{onlyTalk ? <Check50 onPress={() => onPressFilter('잡담')} /> : <Rect50_Border onPress={() => onPressFilter('잡담')} />}
					</View>
					<View style={[style.kindFilterItem]}>
						<Text style={[txt.noto28, {color: GRAY10}]}> 질문</Text>
						{onlyQuestion ? <Check50 onPress={() => onPressFilter('질문')} /> : <Rect50_Border onPress={() => onPressFilter('질문')} />}
					</View>
					<View style={[style.kindFilterItem]}>
						<Text style={[txt.noto28, {color: GRAY10}]}> 모임</Text>
						{onlyMeeting ? <Check50 onPress={() => onPressFilter('모임')} /> : <Rect50_Border onPress={() => onPressFilter('모임')} />}
					</View>
				</View>
			</View>
		);
	};

	const renderItem = ({item, index}) => {
		return (
			<ArticleList
				items={getData()}
				onPressArticle={onPressArticle} //게시글 내용 클릭
				whenEmpty={whenEmpty}
				isSearch={searchInput}
			/>
		);
	};

	if (props.loading) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<View style={{marginTop: 12 * DP, width: 694 * DP}}>
					<Text style={[txt.noto24, {color: GRAY10}]}>검색 결과 {getData().length}개</Text>
				</View>
				<FlatList
					data={[{}]}
					listKey={({item, index}) => index}
					renderItem={renderItem}
					ListHeaderComponent={header()}
					showsVerticalScrollIndicator={false}
					stickyHeaderIndices={[0]}
				/>
			</View>
		);
};

SearchArticle.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	write: {
		position: 'absolute',
		width: 94 * DP,
		height: 94 * DP,
		right: 30 * DP,
		bottom: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 5 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
	},
	filterCont: {
		width: 750 * DP,
		paddingVertical: 10 * DP,
		backgroundColor: 'white',
	},
	kindFilter: {
		width: 420 * DP,
		// backgroundColor: 'yellow',
		// margin: 30 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		justifyContent: 'space-between',
		paddingRight: 48 * DP,
	},
	kindFilterItem: {
		width: 120 * DP,
		// backgroundColor: 'red',
		marginLeft: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
