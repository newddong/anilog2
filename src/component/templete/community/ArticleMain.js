import React from 'react';
import {ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {APRI10, BLACK, GRAY10, GRAY20} from 'Root/config/color';
import {Arrow48, Check50, EmptyIcon, Rect50_Border, WriteBoard} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {useNavigation} from '@react-navigation/core';
import {getCommunityList} from 'Root/api/community';
import Modal from 'Root/component/modal/Modal';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import {FREE_LIMIT, NETWORK_ERROR} from 'Root/i18n/msg';
import {searchProtectRequest} from '../style_templete';

export default ArticleMain = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [offset, setOffset] = React.useState(1);
	const [refreshing, setRefreshing] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// fetchData(); //포커스마다 새로 fetch를 시도하면 상세글을 갔다가 메인페이지로 돌아와도 기존의 스크롤로 이동을 하지 않음
		});
		fetchData(1); //
		return unsubscribe;
	}, []);

	//리프레싱 시도(페이지 상단으로 스크롤) => 데이터 최신화 및 페이징 초기화
	React.useEffect(() => {
		if (offset == 1) {
			refreshing ? fetchData(1) : false;
		}
	}, [refreshing]);

	const fetchData = page => {
		getCommunityList(
			{
				limit: FREE_LIMIT, //50
				page: page,
				community_type: 'free',
			},
			result => {
				console.log('result / getCommunityList / ArticleMain :', result.msg.free.length);
				const res = result.msg.free;
				//  if (data != 'false') {
				// 	console.log('temp lenth', [...data, ...res].length);
				// 	setData([...data, ...res]);
				// } else {
				// 	setData(res);
				// }
				// setOffset(offset + 1);
				setData(res);
				setLoading(false);
			},
			err => {
				console.log('err / getCommunityList / ArticleMain : ', err);
				if (err.includes('code 500')) {
					setData([]);
					setTimeout(() => {
						Modal.alert(NETWORK_ERROR);
					}, 500);
				} else if (err.includes('없습니다')) {
					setData([]);
				}
				setLoading(false);
			},
		);
	};

	//리스트 페이징 작업
	const onEndReached = () => {
		console.log('EndReached', getData().length % FREE_LIMIT);
		//페이지당 출력 개수인 LIMIT로 나눴을 때 나머지 값이 0이 아니라면 마지막 페이지 => api 접속 불필요
		if (getData().length % FREE_LIMIT == 0) {
			// fetchData();
		}
	};

	// 게시글 내용 클릭
	const onPressArticle = index => {
		navigation.push('ArticleDetail', {community_object: getData()[index]});
	};

	//글쓰기
	const onPressWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			navigation.navigate('CommunityWrite', {isReview: false});
			// navigation.push('WriteEditorTest');
		}
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

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};
	const onRefresh = () => {
		setOffset(1); //리프레싱 시도 시, 데이터 및 페이징 초기화
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
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
		let text = '목록이 없습니다..';
		if (onlyTalk || onlyQuestion || onlyMeeting) {
			text = '검색 결과가 없습니다..';
		}
		return <ListEmptyInfo text={text} />;
	};

	const onPressPage = page => {
		console.log('same', page + 1 == offset);
		if (page + 1 == offset) {
			console.log('현재 페이지');
		} else {
			setLoading(true);
			getCommunityList(
				{
					limit: FREE_LIMIT, //50
					page: page + 1,
					community_type: 'free',
				},
				result => {
					console.log('result / getCommunityList / ArticleMain :', result.msg.free.length);
					const res = result.msg.free;
					setData(res);
					setOffset(page + 1);
					setLoading(false);
				},
				err => {
					console.log('err / getCommunityList / ArticleMain : ', err);
					if (err.includes('code 500')) {
						setData([]);
						setTimeout(() => {
							Modal.alert(NETWORK_ERROR);
						}, 500);
					} else if (err.includes('없습니다')) {
						setData([]);
					}
					setLoading(false);
				},
			);
		}
	};

	const header = () => {
		return (
			<View style={{width: 694 * DP, alignSelf: 'center'}}>
				<View style={[style.kindFilter]}>
					<View style={[style.kindFilterItem]}>
						{onlyTalk ? <Check50 onPress={() => onPressFilter('잡담')} /> : <Rect50_Border onPress={() => onPressFilter('잡담')} />}
						<Text style={[txt.noto28, {marginLeft: 6 * DP}]}> 잡담</Text>
					</View>
					<View style={[style.kindFilterItem]}>
						{onlyQuestion ? <Check50 onPress={() => onPressFilter('질문')} /> : <Rect50_Border onPress={() => onPressFilter('질문')} />}
						<Text style={[txt.noto28, {marginLeft: 6 * DP}]}> 질문</Text>
					</View>
					<View style={[style.kindFilterItem]}>
						{onlyMeeting ? <Check50 onPress={() => onPressFilter('모임')} /> : <Rect50_Border onPress={() => onPressFilter('모임')} />}
						<Text style={[txt.noto28, {marginLeft: 6 * DP}]}> 모임</Text>
					</View>
				</View>
			</View>
		);
	};

	const paging = () => {
		const dummyPage = [1, 2, 3, 4, 5];
		return (
			<View
				style={{
					width: 634 * DP,
					paddingVertical: 60 * DP,
					paddingBottom: 180 * DP,
					flexDirection: 'row',
					alignSelf: 'center',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<View style={{transform: [{rotate: '180deg'}]}}>
					<Arrow48 />
				</View>
				{dummyPage.map((v, i) => {
					return (
						<TouchableOpacity activeOpacity={0.8} onPress={() => onPressPage(i)} style={{paddingHorizontal: 40 * DP}} key={i}>
							<Text style={[txt.noto32, {color: offset - 1 == i ? BLACK : GRAY20}]}>{v}</Text>
						</TouchableOpacity>
					);
				})}
				<Arrow48 />
			</View>
		);
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={[{}]}
					refreshing
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					extraData={refreshing}
					renderItem={({item, index}) => {
						return (
							<>
								<ArticleList
									items={getData()}
									onPressArticle={onPressArticle} //게시글 내용 클릭
									whenEmpty={whenEmpty}
									onEndReached={onEndReached}
								/>
							</>
						);
					}}
					showsVerticalScrollIndicator={false}
					listKey={({item, index}) => index}
					ListHeaderComponent={header()}
					ListFooterComponent={paging()}
				/>

				<TouchableOpacity onPress={onPressWrite} activeOpacity={0.8} style={[style.write, style.shadow]}>
					<WriteBoard />
				</TouchableOpacity>
				{loading ? (
					<View style={searchProtectRequest.indicatorCont}>
						<ActivityIndicator size="large" color={APRI10} />
					</View>
				) : (
					<></>
				)}
			</View>
		);
};

ArticleMain.defaultProps = {};

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
	},
	kindFilterItem: {
		width: 116 * DP,
		marginLeft: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: 'red',
		// justifyContent: 'space-between',
	},
});
