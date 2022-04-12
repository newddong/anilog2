import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {BLACK, GRAY10} from 'Root/config/color';
import {Check50, EmptyIcon, Rect50_Border, WriteBoard} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {useNavigation} from '@react-navigation/core';
import Loading from 'Root/component/molecules/modal/Loading';
import {styles} from 'Root/component/atom/image/imageStyle';
import community_obj from 'Root/config/community_obj';
import searchContext from 'Root/config/searchContext';

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
			console.log('props.data.free', props.data.free.length);
			setData(props.data.free);
		}
	}, [props.data]);

	// 게시글 내용 클릭
	const onPressArticle = index => {
		// community_obj.object = data[index];
		// community_obj.pageToMove = 'ArticleDetail';
		// community_obj.initial = false;
		// console.log('community_obj.current / SearchArticle : ', community_obj.current);
		// if (community_obj.current == '') {
		// 	//탭 간의 이동을 간편히 하기 위해 만든 community_obj의 current 값이 빈값 == 현재 보고 있는 ArticleDetail이 없음
		// 	//우선 ArticleMain의 스택을 쌓기 위해 ArticleMain으로 먼저 보낸 뒤 바로 이동되어야 할 상세 자유 게시글을 여기서 선언 => Parameter로 보냄
		// 	console.log('community_object: data[index]', data[index].community_title);
		// 	navigation.navigate('COMMUNITY', {screen: 'ArticleMain', initial: false, params: {community_object: data[index], pageToMove: 'ArticleDetail'}});
		// } else {
		// 	//이미 보고 있는 ArticleDetail이 존재하므로 ArticleDetail 템플릿을 덮어씌우고 봐야할 상세 자유 게시글은 Parameter로 송신
		// 	navigation.navigate('COMMUNITY', {
		// 		screen: 'ArticleDetail',
		// 		initial: false,
		// 		params: {community_object: data[index], reset: true},
		// 	});
		// }
		navigation.push('ArticleDetail', {community_object: data[index], searchInput: searchInput});
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
		return (
			<View style={{paddingVertical: 150 * DP, alignItems: 'center'}}>
				<EmptyIcon />
				<Text style={[txt.noto28]}>검색 결과가 없습니다..</Text>
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={[{}]}
				renderItem={({item, index}) => {
					return (
						<>
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
							{props.loading ? (
								<Loading isModal={false} />
							) : (
								<ArticleList
									items={getData()}
									onPressArticle={onPressArticle} //게시글 내용 클릭
									whenEmpty={whenEmpty}
									isSearch={searchInput}
								/>
							)}
						</>
					);
				}}
				showsVerticalScrollIndicator={false}
				listKey={({item, index}) => index}
			/>

			{/* <View style={[style.write, style.shadow]}>
				<WriteBoard onPress={onPressWrite} />
			</View> */}
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
	kindFilter: {
		width: 420 * DP,
		backgroundColor: 'white',
		marginVertical: 30 * DP,
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
