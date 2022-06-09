import React from 'react';
import {ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY40} from 'Root/config/color';
import {Arrow48, Arrow48_GRAY, Check50, EmptyIcon, Rect50_Border, WriteBoard} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {useNavigation} from '@react-navigation/core';
import {getCommunityList, getCommunityListFreeByPageNumber} from 'Root/api/community';
import Modal from 'Root/component/modal/Modal';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import {FREE_LIMIT, NETWORK_ERROR} from 'Root/i18n/msg';
import {searchProtectRequest} from '../style_templete';
import DP from 'Root/config/dp';

export default ArticleMain = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [offset, setOffset] = React.useState(0); //현재 페이지
	const [page, setPage] = React.useState(0); //전체 페이지
	const [refreshing, setRefreshing] = React.useState(false); //리프레싱
	const [loading, setLoading] = React.useState(false);
	const [type, setType] = React.useState([]);
	const [total, setTotal] = React.useState();

	React.useEffect(() => {
		fetchData(1);
	}, []);

	//리프레싱 시도(페이지 상단으로 스크롤) => 데이터 최신화 및 페이징 초기화
	React.useEffect(() => {
		if (offset == 1) {
			//첫페이지에서만 리프레싱 작동
			refreshing ? fetchData(1) : false;
		}
	}, [refreshing]);

	const fetchData = (page, category) => {
		let params = {
			limit: FREE_LIMIT, //50
			page: page,
		};
		//자유글 타입 파라미터 추가 여부, 미선택 상태일 경우 파라미터 자체를 보내선 안됨
		if (category && category.length > 0) {
			params.community_free_type = category;
		}
		console.log('params.community_free_type ', params.community_free_type);
		getCommunityListFreeByPageNumber(
			params,
			result => {
				// console.log('result / getCommunityListFreeByPageNumber / ArticleMain :', result.msg.length);
				setTotal(result.total_count);
				const res = result.msg;
				setOffset(page);
				setData(res);
				setLoading(false);
			},
			err => {
				console.log('err / getCommunityListFreeByPageNumber / ArticleMain : ', err);
				if (err.includes('code 500')) {
					setData('false');
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

	// 게시글 내용 클릭
	const onPressArticle = index => {
		navigation.push('ArticleDetail', {community_object: data[index], type: type});
	};

	//글쓰기
	const onPressWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			navigation.navigate('CommunityWrite', {isReview: false});
		}
	};

	const onPressFilter = category => {
		let temp = [...type];
		switch (category) {
			case '잡담':
				type.includes('talk') ? (temp = temp.filter(e => e != 'talk')) : temp.push('talk');
				break;
			case '질문':
				type.includes('question') ? (temp = temp.filter(e => e != 'question')) : temp.push('question');
				break;
			case '모임':
				type.includes('meeting') ? (temp = temp.filter(e => e != 'meeting')) : temp.push('meeting');
				break;
			default:
				break;
		}
		setType(temp);
		setPage(0);
		fetchData(1, temp);
	};

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};
	const onRefresh = () => {
		setOffset(1); //리프레싱 시도 시, 데이터 및 페이징 초기화
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	const whenEmpty = () => {
		let text = '목록이 없습니다..';
		return <ListEmptyInfo text={text} />;
	};

	const onPressPage = page => {
		if (page != offset) {
			setLoading(true);
			fetchData(page, type);
		}
	};

	const header = () => {
		return (
			<View style={{width: 694 * DP, alignSelf: 'center'}}>
				<View style={[style.kindFilter]}>
					<View style={[style.kindFilterItem]}>
						{type.includes('talk') ? <Check50 onPress={() => onPressFilter('잡담')} /> : <Rect50_Border onPress={() => onPressFilter('잡담')} />}
						<Text style={[txt.noto28, {marginLeft: 6 * DP}]}> 잡담</Text>
					</View>
					<View style={[style.kindFilterItem]}>
						{type.includes('question') ? <Check50 onPress={() => onPressFilter('질문')} /> : <Rect50_Border onPress={() => onPressFilter('질문')} />}
						<Text style={[txt.noto28, {marginLeft: 6 * DP}]}> 질문</Text>
					</View>
					<View style={[style.kindFilterItem]}>
						{type.includes('meeting') ? <Check50 onPress={() => onPressFilter('모임')} /> : <Rect50_Border onPress={() => onPressFilter('모임')} />}
						<Text style={[txt.noto28, {marginLeft: 6 * DP}]}> 모임</Text>
					</View>
				</View>
			</View>
		);
	};

	const paging = () => {
		if (data != 'false' || data.length != 0) {
			let totalPage = Array(Math.floor(total / FREE_LIMIT) + 1)
				.fill()
				.map((_, i) => i + 1);
			const perPageNum = 5;
			let slicedPage = [];
			if (total % FREE_LIMIT === 0) {
				totalPage.length--;
			}
			console.log('page', page);
			console.log('total', total);
			console.log('totalPage', totalPage.length);
			console.log('Math.floor(totalPage.length / perPageNum)', Math.floor(totalPage.length / perPageNum));
			let isLastPage = page == Math.floor(totalPage.length / perPageNum);
			isLastPage = (page + 1) * FREE_LIMIT * perPageNum >= total;
			console.log('isLastPage', isLastPage);
			console.log('(page + 1) * FREE_LIMIT * perPageNum', (page + 1) * FREE_LIMIT * perPageNum);
			if (isLastPage) {
				for (let i = page * perPageNum + 1; i <= totalPage.length; i++) {
					slicedPage.push(i);
				}
			} else {
				slicedPage = [page * perPageNum + 1, page * perPageNum + 2, page * perPageNum + 3, page * perPageNum + 4, page * perPageNum + 5];
			}
			return (
				<View style={[style.pagingCont]}>
					<View style={{transform: [{rotate: '180deg'}], marginTop: 2 * DP}}>
						{page == 0 ? (
							<Arrow48_GRAY />
						) : (
							<TouchableOpacity onPress={() => setPage(page - 1)} style={{padding: 14 * DP}}>
								<Arrow48 />
							</TouchableOpacity>
						)}
					</View>
					<View style={{width: 500 * DP, flexDirection: 'row'}}>
						{slicedPage.map((v, i) => {
							return (
								<TouchableOpacity activeOpacity={0.8} onPress={() => onPressPage(v)} style={{width: 100 * DP, alignItems: 'center'}} key={i}>
									<Text style={[txt.noto32, {color: offset == v ? BLACK : GRAY20}]}>{v}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
					{isLastPage ? (
						<></>
					) : (
						<TouchableOpacity onPress={() => setPage(page + 1)} style={{padding: 14 * DP, marginTop: 2 * DP}}>
							<Arrow48 />
						</TouchableOpacity>
					)}
				</View>
			);
		}
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={[{}]}
					refreshing
					refreshControl={offset == 1 ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : <></>}
					extraData={refreshing}
					renderItem={({item, index}) => {
						return (
							<>
								<View style={{width: 694 * DP, height: 2 * DP, backgroundColor: GRAY40, alignSelf: 'center'}} />
								<ArticleList
									items={data}
									onPressArticle={onPressArticle} //게시글 내용 클릭
									whenEmpty={whenEmpty}
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
	pagingCont: {
		width: 634 * DP,
		paddingVertical: 60 * DP,
		paddingBottom: 180 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		// justifyContent: 'space-between',
		alignItems: 'center',
	},
});
