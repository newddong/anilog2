import React from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	RefreshControl,
	NativeModules,
	Text,
	TextInput,
	Dimensions,
	PixelRatio,
	ActivityIndicator,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native';
import {APRI10, WHITE} from 'Root/config/color';
import {Write94, Camera54} from 'Atom/icon';
import Feed from 'Organism/feed/Feed';
import {deleteFeed, getMissingReportList, getSuggestFeedList} from 'Root/api/feedapi';
import Modal from 'Component/modal/Modal';
import DP from 'Root/config/dp';
import {getFeedListByUserId, getFavoriteFeedListByUserId, getUserTaggedFeedList} from 'Root/api/feedapi';
import {getFeedsByHash} from 'Root/api/hashapi';
import userGlobalObject from 'Root/config/userGlobalObject';
import {login_style, buttonstyle} from 'Templete/style_templete';
import {getStringLength, getLinesOfString} from 'Root/util/stringutil';
import {GRAY30} from 'Root/config/color';
import NewMissingReportList from '../list/NewMissingReportList';
import {FEED_LIMIT, NETWORK_ERROR, PROTECT_REQUEST_MAIN_LIMIT} from 'Root/i18n/msg';
import {useNavigation} from '@react-navigation/core';
import feed_obj from 'Root/config/feed_obj';

export default FeedList = ({route}) => {
	const navigation = useNavigation();
	const [feedList, setFeedList] = React.useState([]);
	const [total, setTotal] = React.useState();
	const [refreshing, setRefreshing] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const flatlist = React.useRef();
	const [focused, setFocused] = React.useState(true);
	//피드썸네일 클릭 리스트일 경우
	React.useEffect(() => {
		if (route.params?.pressed != 0) {
			moveToTop();
		}
	}, [route.params]);
	React.useEffect(() => {
		switch (route.name) {
			case 'UserFeedList':
				navigation.setOptions({title: route.params?.userobject.user_nickname + '님의 게시글'});
				break;
			case 'UserTagFeedList':
				navigation.setOptions({title: route.params?.userobject.user_nickname + '님이 태그된 게시글'});
				break;
			case 'TageMeFeedList':
				navigation.setOptions({title: route.params?.userobject.user_nickname + '님이 태그된 게시글'});
				break;
			case 'HashFeedList':
				navigation.setOptions({title: '#' + route.params?.hashtag_keyword});
				break;
			default:
				break;
		}
	}, [route.params?.userobject]);

	React.useEffect(() => {
		if (feedList.length > 0) {
			let indx = feedList.findIndex(v => v._id == route.params?.selected?._id);
			if (route.params?.selected && !scrollComplete) {
				setTimeout(() => {
					flatlist.current?.scrollToItem({
						animated: false,
						item: feedList[indx],
					});
					setScrollComplete(true); //feedList가 갱신될 때 다시 스크롤되지 않도록 처리
				}, 0);
			}
		}
		//feedList의 댓글수, 최근댓글, 좋아요, 즐겨찾기의 전역관리를 위해 api로 호출된 feedList를 메모리에 저장
		feedList.map((v, i) => {
			const find = feed_obj.list.findIndex(e => e._id == v._id);
			if (find == -1) {
				//현 메모리에 저장되어 있지않은 피드아이템만 추가
				feed_obj.list.push(v);
			}
		});
		console.log('feed_obj.list', feed_obj.list.length);
		if (route.params && route.params.index < 10) return;
	}, [feedList]);

	React.useEffect(() => {
		//페이지 상단 실종,제보 리스트 받아오기
		getList(); //첫 리스트 받아오기
	}, [route]);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setFocused(true);
			if (feed_obj.deleted_list && feed_obj.deleted_list.length) {
				//삭제된 실종,제보 반영
				try {
					//삭제된 실종,제보 반영
					let temp = [...feedList];
					temp = temp.filter(e => !feed_obj.deleted_list.includes(e._id));
					// setFeed(feedList.filter(e => e._id != feed_obj.deleted_obj._id));
					setFeed(temp);
					feed_obj.deleted_obj = {};
				} catch (err) {
					console.log('err', err);
				}
			}
		});
		return unsubscribe;
	}, [feedList]);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('blur', () => {
			//동영상 모두 정지로
			setFocused(false);
			// console.log('feedlist blur');
		});
		return unsubscribe;
	}, [navigation]);

	React.useEffect(() => {
		refreshing ? getList(false, false) : false;
	}, [refreshing]);

	const setFeed = list => {
		try {
			let temp = [];
			temp = list.filter(e => e != null);
			setFeedList(
				temp
					.map((v, i, a) => {
						let lines = getLinesOfString(v.feed_content, 53);
						lines = lines > 2 ? 2 : lines;
						if (v.feed_recent_comment) {
							return {...v, height: (914 + lines * 48 + 10 + 128) * DP};
						} else {
							return {...v, height: (914 + lines * 48 + 10) * DP};
						}
					})
					.map((v, i, a) => {
						let offset = a.slice(0, i).reduce((prev, current) => {
							return current.height + prev;
						}, 0);
						return {
							...v,
							offset: route.name == 'MainHomeFeedList' ? offset + 276 * DP : offset,
						};
					}),
			);
		} catch (err) {
			console.log('err, setFeed', err);
		}
	};

	//스크롤 최하단 도착 콜백 (다음페이지 호출)
	const onEndReached = ({distanceFromEnd}) => {
		// if (distanceFromEnd >= 0) {
		// console.log('distanceFromEnd', distanceFromEnd);
		console.log('onEndReached', feedList.length, total);
		if (feedList.length < total) {
			getList(false, true);
		} else {
			console.log('토탈 초과');
		}
		// }
	};

	//피드리스트 호출
	const getList = (pre, next) => {
		console.log('피드리스트 목록 api 접근');
		switch (route.name) {
			case 'UserFeedList':
				try {
					setLoading(true);
					let params = {
						userobject_id: route.params?.userobject._id,
						login_userobject_id: userGlobalObject.userInfo._id,
						limit: FEED_LIMIT,
					};
					//기본 LIMIT보다 작은 인덱스가 선택됐을 경우 다음 페이지 호출만 요청
					if (route.params && route.params.index < 10) {
						if (!pre && next) {
							console.log('next');
							params.target_object_id = feedList[feedList.length - 1]._id;
							params.order_value = 'next';
						}
					} else {
						route.params ? console.log('selected index', route.params.index) : false;
						//스크롤 최상단 도착 => 타겟은 최상단의 피드id이며 호출은 이전 페이지
						if (pre && !next) {
							params.target_object_id = feedList[0]._id;
							params.order_value = 'pre';
							//스크롤 최하단 도착 => 타겟은 최하단 피드id이며 호출은 다음 페이지
						} else if (!pre && next) {
							params.target_object_id = feedList[feedList.length - 1]._id;
							params.order_value = 'next';
						} else {
							//중간에 인터럽트
							params.target_object_id = route.params.selected._id;
							params.order_value = 'interrupt';
						}
					}
					console.log('최종 param', params);
					getFeedListByUserId(
						params,
						result => {
							console.log('getFeedListByUserId', result.msg.length);
							// console.log('totalCount', result.total_count);
							const res = result.msg;

							setTotal(result.total_count);
							let list = [];
							if (!pre && !next) {
								console.log('첫 호출 getFeedListByUserId');
								list = res;
							} else if (pre && !next) {
								console.log('스크롤 최상단');
								if (route.params.index < 10) return;
								list = [...res, ...feedList];
								//앞 페이지를 받아오는 경우, 합산된 리스트의 0번 인덱스로 저절로 스크롤이 되는 현상 발견
								//기존에 위로 스크롤 하고 있던 상태를 유지시키기 위한 scrollToIndex 처리
								flatlist.current?.scrollToIndex({
									animated: false,
									index: res.length < 10 ? res.length : 10, // 새로 받아온 앞 페이지 리스트가 10개 이하(최상단 페이지라는 증거)일 때 가장 최신의 글로 인덱스 자동 이동
								});
							} else if (!pre && next) {
								console.log('스크롤 최하단');
								list = [...feedList, ...res];
							}
							console.log('최종 list length', list.length);
							setFeed(list);
							setLoading(false);
						},
						errormsg => {
							Modal.popOneBtn(errormsg, '확인', () => Modal.close());
							setLoading(false);
						},
					);
				} catch (err) {
					console.log('err', err);
					setTimeout(() => {
						Modal.popOneBtn(NETWORK_ERROR, '확인', () => navigation.goBack());
					}, 100);
				}
				break;
			case 'UserTagFeedList':
				// console.log('route.params?.userobject._id,', route.params?.userobject._id);
				setLoading(true);
				params = {
					userobject_id: route.params?.userobject._id,
					login_userobject_id: userGlobalObject.userInfo._id,
					limit: FEED_LIMIT,
				};
				//기본 LIMIT보다 작은 인덱스가 선택됐을 경우 다음 페이지 호출만 요청
				if (route.params && route.params.index < 10) {
					// console.log('route.params && route.params.index < 10', route.params && route.params.index < 10);
					if (!pre && next) {
						console.log('next');
						params.target_object_id = feedList[feedList.length - 1]._id;
						params.order_value = 'next';
					}
				} else {
					route.params ? console.log('selected index', route.params.index) : false;
					//스크롤 최상단 도착 => 타겟은 최상단의 피드id이며 호출은 이전 페이지
					if (pre && !next) {
						params.target_object_id = feedList[0]._id;
						params.order_value = 'pre';
						//스크롤 최하단 도착 => 타겟은 최하단 피드id이며 호출은 다음 페이지
					} else if (!pre && next) {
						params.target_object_id = feedList[feedList.length - 1]._id;
						params.order_value = 'next';
					} else {
						//중간에 인터럽트
						params.target_object_id = route.params.selected._id;
						params.order_value = 'interrupt';
					}
				}
				console.log('UserTagFeedList, 최종 param', params);
				getUserTaggedFeedList(
					params,
					result => {
						console.log('result / getUserTaggedFeedList', result.msg);
						const res = result.msg.map((v, i) => v.usertag_feed_id);

						setTotal(result.total_count);
						let list = [];
						if (!pre && !next) {
							console.log('첫 호출');
							list = res;
						} else if (pre && !next) {
							console.log('스크롤 최상단');
							if (route.params.index < 10) return;
							//현재 중복된 값이 오고 있는 것을 발견 임시로 클라이언트에서 필터처리
							let temp = res;
							temp.map((v, i) => {
								feedList.map((v2, i2) => {
									if (v._id == v2._id) {
										temp.splice(i, 1);
									}
								});
							});
							list = [...temp, ...feedList];
							setTimeout(() => {
								console.log('scrollToItem 최상단');
								flatlist.current?.scrollToIndex({
									animated: false,
									index: res.length < 10 ? res.length : 10, // 새로 받아온 앞 페이지 리스트가 10개 이하(최상단 페이지라는 증거)일 때 가장 최신의 글로 인덱스 자동 이동
								});
							}, 0);
							//앞 페이지를 받아오는 경우, 합산된 리스트의 0번 인덱스로 저절로 스크롤이 되는 현상 발견
							//기존에 위로 스크롤 하고 있던 상태를 유지시키기 위한 scrollToIndex 처리
						} else if (!pre && next) {
							console.log('스크롤 최하단');
							list = [...feedList, ...res];
						}
						console.log('최종 list length', list.length);
						setFeed(list);
						setLoading(false);
					},
					errormsg => {
						Modal.popOneBtn(errormsg, '확인', () => Modal.close());
						setLoading(false);
					},
				);
				break;
			case 'TagMeFeedList':
				// console.log('route.params?.userobject._id,', route.params?.userobject._id);
				setLoading(true);
				params = {
					userobject_id: route.params?.userobject._id,
					login_userobject_id: userGlobalObject.userInfo._id,
					limit: FEED_LIMIT,
				};
				//기본 LIMIT보다 작은 인덱스가 선택됐을 경우 다음 페이지 호출만 요청
				if (route.params && route.params.index < 10) {
					console.log('route.params && route.params.index < 10', route.params && route.params.index < 10);
					if (!pre && next) {
						console.log('next');
						params.target_object_id = feedList[feedList.length - 1]._id;
						params.order_value = 'next';
					}
				} else {
					route.params ? console.log('selected index', route.params.index) : false;
					//스크롤 최상단 도착 => 타겟은 최상단의 피드id이며 호출은 이전 페이지
					if (pre && !next) {
						params.target_object_id = feedList[0]._id;
						params.order_value = 'pre';
						//스크롤 최하단 도착 => 타겟은 최하단 피드id이며 호출은 다음 페이지
					} else if (!pre && next) {
						params.target_object_id = feedList[feedList.length - 1]._id;
						params.order_value = 'next';
					} else {
						//중간에 인터럽트
						params.target_object_id = route.params.selected._id;
						params.order_value = 'interrupt';
					}
				}
				console.log('TagMeFeedList 최종 param', params);
				getUserTaggedFeedList(
					params,
					result => {
						// console.log('result / getUserTaggedFeedList', result);
						let res = result.msg.map((v, i) => v.usertag_feed_id);
						result.msg.map((v, i) => {
							res[i].feed_is_like = v.feed_is_like;
							res[i].is_favorite = v.is_favorite;
						});

						setTotal(result.total_count);
						let list = [];
						if (!pre && !next) {
							console.log('첫 호출');
							list = res;
						} else if (pre && !next) {
							console.log('스크롤 최상단');
							if (route.params.index < 10) return;
							//현재 중복된 값이 오고 있는 것을 발견 임시로 클라이언트에서 필터처리
							let temp = res;
							temp.map((v, i) => {
								feedList.map((v2, i2) => {
									if (v._id == v2._id) {
										temp.splice(i, 1);
									}
								});
							});
							list = [...temp, ...feedList];
							//앞 페이지를 받아오는 경우, 합산된 리스트의 0번 인덱스로 저절로 스크롤이 되는 현상 발견
							//기존에 위로 스크롤 하고 있던 상태를 유지시키기 위한 scrollToIndex 처리
							setTimeout(() => {
								console.log('scrollToItem 최상단');
								flatlist.current?.scrollToIndex({
									animated: false,
									index: res.length < 10 ? res.length : 10, // 새로 받아온 앞 페이지 리스트가 10개 이하(최상단 페이지라는 증거)일 때 가장 최신의 글로 인덱스 자동 이동
								});
							}, 0);
						} else if (!pre && next) {
							console.log('스크롤 최하단');
							list = [...feedList, ...res];
						}
						console.log('최종 list length', list.length);
						setFeed(list);
						setLoading(false);
					},
					errormsg => {
						Modal.popOneBtn(errormsg, '확인', () => Modal.close());
						setLoading(false);
					},
				);
				break;
			case 'HashFeedList':
				getFeedsByHash(
					{hashtag_keyword: route.params?.hashtag_keyword},
					({msg}) => {
						// setIndex(msg.feeds.findIndex(v => v.hashtag_feed_id._id == route.params?.selected._id));
						// setFeedList(msg.feeds.map(v => v.hashtag_feed_id));
						setFeed(msg.feeds.map(v => v.hashtag_feed_id));
					},
					error => {
						Modal.popOneBtn(error, '확인', () => {
							setTimeout(() => {
								navigation.goBack(), 300;
							});
						});
					},
				);
				break;
			case 'FavoriteFeedList':
				getFavoriteFeedListByUserId(
					{userobject_id: userGlobalObject.userInfo._id},
					({msg}) => {
						// console.log('msg', msg);
						let temp = msg;
						temp = temp.filter(x => x.favorite_feed_id.feed_is_delete != true);
						temp.map((v, i) => {
							temp[i].favorite_feed_id.feed_is_like = v.feed_is_like;
							temp[i].favorite_feed_id.is_favorite = v.is_favorite;
						});
						temp = temp.map(data => data.favorite_feed_id);
						setFeed(temp);
					},
					error => {
						Modal.popOneBtn(error, '확인', () => {
							setTimeout(() => {
								navigation.goBack(), 300;
							});
						});
					},
				);
				break;
			default:
				let params = {
					login_userobject_id: userGlobalObject.userInfo._id,
					limit: FEED_LIMIT,
				};
				if (feedList.length > 0 && (pre || next)) {
					params.target_object_id = pre ? feedList[0]._id : feedList[feedList.length - 1]._id;
					params.order_value = pre ? 'pre' : 'next';
				}
				console.log('getSuggestFeedList params', params);
				getSuggestFeedList(
					params,
					result => {
						setTotal(result.total_count);
						let list = [];
						if (pre) {
							list = [...result.msg, ...feedList];
						} else if (params.target_object_id) {
							list = [...feedList, ...result.msg];
						} else {
							list = result.msg;
						}
						setFeed(list);
					},
					errormsg => {
						Modal.popOneBtn(NETWORK_ERROR, '확인', () => Modal.close());
					},
				);
				break;
		}
	};

	const [refresh, setRefresh] = React.useState(false);
	const [scrollComplete, setScrollComplete] = React.useState(false); //feedList가 갱신될 때 다시 스크롤되지 않도록 처리

	//피드 삭제
	const deleteFeedItem = id => {
		Modal.close();
		setTimeout(() => {
			Modal.popLoading(true);
			deleteFeed(
				{feed_object_id: id},
				result => {
					console.log('result / DeleteFeed / FeedContent : ', result.msg);
					setFeedList(feedList.filter(e => e._id != result.msg._id));
					// onRefresh();
					Modal.close();
				},
				err => {
					console.log('err / DeleteFeed / FeedContent : ', err);
					Modal.alert(NETWORK_ERROR);
				},
			);
		}, 100);
	};

	const onPressPhoto = e => {
		if (e.feed_type == 'report' || e.feed_type == 'missing') {
			if (e.feed_type == 'report') {
				navigation.navigate('ReportDetail', {_id: e._id});
			} else {
				let sexValue = '';
				switch (e.missing_animal_sex) {
					case 'male':
						sexValue = '남';
						break;
					case 'female':
						sexValue = '여';
						break;
					case 'unknown':
						sexValue = '성별모름';
						break;
				}
				const titleValue = e.missing_animal_species + '/' + e.missing_animal_species_detail + '/' + sexValue;
				navigation.navigate('MissingAnimalDetail', {title: titleValue, _id: e._id});
			}
		}
	};

	// 피드 글쓰기 아이콘 클릭
	const moveToFeedWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate({name: 'LoginRequired', merge: true});
			});
		} else if (userGlobalObject.userInfo.user_type == 'user') {
			Modal.popAvatarSelectFromWriteModal(obj => {
				delete obj.user_avatar; //무한 참조 경고 해결
				userGlobalObject.userInfo && navigation.navigate('FeedWrite', {feedType: 'Feed', feed_avatar_id: obj});
			}, Modal.close);
		} else {
			userGlobalObject.userInfo && navigation.navigate('FeedWrite', {feedType: 'Feed'});
		}
	};

	//피드 상단 새로운 실종/제보
	const MissingReport = () => {
		return (
			<NewMissingReportList
				doubleTab={route.params?.pressed != 0}
				// if (route.params?.pressed != 0) {
				// moveToTop();
				// }
				// data={topList}
			/>
		);
	};
	const [viewIndex, setViewIndex] = React.useState([]);
	const renderItem = ({item, index}) => {
		return <Feed data={item} deleteFeed={deleteFeedItem} isView={focused && viewIndex == index} onPressPhoto={onPressPhoto} />;
		// return (focused&&<View style={{backgroundColor:viewIndex==index?'red':'blue'}}><Feed data={item} deleteFeed={deleteFeedItem} isView={focused&&viewIndex==index}/></View>);
	};

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = () => {
		setRefreshing(true);
		wait(0).then(() => setRefreshing(false));
	};

	const rememberScroll = e => {
		if (e.nativeEvent.contentOffset.y > 0) {
			userGlobalObject.t = e.nativeEvent.contentOffset;
		} else if (route.name != 'MainHomeFeedList' && e.nativeEvent.contentOffset.y == 0) {
			console.log('onReached At top : what is total?', total, 'route.params.index', route.params.index);
			if ((route.params && route.params.index < 10) || feedList.length == total) {
				return;
			} else {
				getList(true, false);
			}
		}
	};
	// console.log('ddsadf',vvvv)
	const moveToTop = () => {
		flatlist.current.scrollToOffset({animated: true, offset: 0});
	};

	const getItemLayout = (data, index) => {
		if (!data[index]) return {length: 0, offset: 0, index: index};
		return {length: data[index].height, offset: data[index].offset, index: index};
	};
	const keyExtractor = (item, index) => {
		let key =
			item._id +
			item.feed_is_like +
			item.feed_medias?.reduce((a, c) => {
				return (
					a +
					c.tags.length +
					c.tags.reduce((a, c) => {
						return a + c.position_x;
					}, 0)
				);
			}, 0);
		return key;
	};
	const [tl, setTl] = React.useState({});
	const [cl, setCl] = React.useState({});
	const [fontSize, setSize] = React.useState(16);
	const [testTx, setTx] = React.useState('한');
	const [code, setCode] = React.useState(62);
	const viewable = React.useCallback(e => {
		setViewIndex(e.viewableItems[0]?.index);
	}, []);
	const separatorComp = React.useCallback(() => {
		return <View style={[{height: 10 * DP, backgroundColor: GRAY30, width: 750 * DP}]} />;
	}, []);

	return (
		<View style={[login_style.wrp_main, {flex: 1, backgroundColor: WHITE}, {borderTopWidth: 2 * DP}, {borderTopColor: GRAY30}]}>
			{
				<FlatList
					data={feedList}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					refreshControl={route.name == 'MainHomeFeedList' ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : <></>}
					getItemLayout={getItemLayout}
					ListHeaderComponent={route.name == 'MainHomeFeedList' ? MissingReport() : false}
					ref={flatlist}
					refreshing
					extraData={refresh}
					onScroll={rememberScroll}
					ItemSeparatorComponent={separatorComp}
					onViewableItemsChanged={viewable}
					viewabilityConfig={{waitForInteraction: false, viewAreaCoveragePercentThreshold: 40, minimumViewTime: 1}}
					windowSize={4}
					decelerationRate={0.9}
					maxToRenderPerBatch={5}
					updateCellsBatchingPeriod={10}
					initialNumToRender={2}
					onEndReachedThreshold={0.3}
					onEndReached={onEndReached}
				/>
			}
			{userGlobalObject.userInfo && (
				<View
					style={[
						{
							position: 'absolute',
							bottom: 40 * DP,
							right: 30 * DP,
							height: 94 * DP,
							width: 94 * DP,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#ff9888',
							borderRadius: 35 * DP,
						},
						buttonstyle.shadow,
					]}>
					<Write94 onPress={moveToFeedWrite} />
				</View>
			)}
			{/*센트리오류 테스트*/}
			{false && (
				<TouchableOpacity
					onPress={() => {
						console.log(androidError);
					}}
					style={{width: 100, height: 100, backgroundColor: 'yellow', position: 'absolute'}}>
					<View style={{width: 100, height: 100, backgroundColor: 'blue', position: 'absolute'}}></View>
				</TouchableOpacity>
			)}
			{false && (
				<View style={{backgroundColor: 'red', width: 750 * DP, top: 0, position: 'absolute'}}>
					<View style={{backgroundColor: 'yellow', marginBottom: 20}}>
						<Text style={{fontSize: 12}}>
							텍스트 사이즈 테스트용
							{'\n'}기기 레이아웃 {Dimensions.get('window').width} DP,해상도{Dimensions.get('window').width * PixelRatio.get()}px
							{'\n'}컨테이너 높이 : {cl.height}, {'\n'}너비 : {cl.width} {'\n'}W/H : {cl.width / cl.height}
							{'\n\n'}ascender : {tl.ascender}, rPx:{PixelRatio.roundToNearestPixel(tl.ascender)} {'\n'}baseline : {tl.baseline}, rPx:
							{PixelRatio.roundToNearestPixel(tl.baseline)} {'\n'}capheight : {tl.capHeight}, rPx:{PixelRatio.roundToNearestPixel(tl.capHeight)}
							{'\n'}descender: {tl.descender}, rPx:{PixelRatio.roundToNearestPixel(tl.descender)}
							{'\n'}height: {tl.height}, rPx:{PixelRatio.roundToNearestPixel(tl.height)}
							{'\n'}xHeight: {tl.xHeight}, rPx:{PixelRatio.roundToNearestPixel(tl.xHeight)}
							{'\n'}width:{tl.width}, rPx:{PixelRatio.roundToNearestPixel(tl.width)}
							{'\n'} W/H : {tl.width / tl.height}
							{'\n'}픽셀비 : {PixelRatio.get()}, 폰트스케일 : {PixelRatio.getFontScale()}
							{'\n\n'}추정 텍스트 사이즈 pt는? {}
							{'\n'}글자 높이 px : {tl.height * PixelRatio.get()}, 폰트사이즈: {fontSize}
							{'\n'}글자 높이 인치 (445ppi안드로이드) : {Math.round(tl.height * 3) / 445}
							{'\n'}글자 높이와 폰트 사이즈 비 : {tl.height / fontSize}
							{'\n'}글자 너비와 폰트 사이즈 비 : {tl.width / fontSize}
							{'\n'}글자 포인트(1pt는 1/72인치) : {Math.round(tl.capHeight * 3)}
							{'\n'}dp당 픽셀 : {1 / PixelRatio.get()}
							{'\n'}dp당 픽셀2 : {2 / PixelRatio.get()}
							{'\n'}dp당 픽셀3 : {3 / PixelRatio.get()}
							{'\n'}dp당 픽셀4 : {4 / PixelRatio.get()}
							{'\n'}dp당 픽셀5 : {5 / PixelRatio.get()}
							{'\n'}
						</Text>
						<View style={{flexDirection: 'row'}}>
							<Text style={{backgroundColor: 'gold', height: '100%'}}>폰트 사이즈 : </Text>
							<TextInput
								style={{backgroundColor: 'white', fontSize: 12, includeFontPadding: false, padding: 0}}
								onChange={e => {
									console.log(e.nativeEvent.text);
									setSize(parseFloat(e.nativeEvent.text) > 0 ? parseFloat(e.nativeEvent.text) : 16);
								}}></TextInput>
						</View>
						<View style={{flexDirection: 'row', backgroundColor: 'gold'}}>
							<Text style={{backgroundColor: 'gold', height: '100%'}}>측정할 문자 : </Text>
							<TextInput
								style={{backgroundColor: 'white', fontSize: 12, includeFontPadding: false, padding: 0}}
								onChange={e => {
									console.log(e.nativeEvent.text);
									e.nativeEvent.text.length > 0 ? setTx(e.nativeEvent.text) : setTx(' ');
								}}></TextInput>
							<Text>문자코드번호 {testTx.codePointAt(0)}</Text>
						</View>
						<View style={{flexDirection: 'row'}}>
							<Text style={{backgroundColor: 'gold', height: '100%'}}>코드번호 입력 : </Text>
							<TextInput
								style={{backgroundColor: 'white', fontSize: 12, includeFontPadding: false, padding: 0}}
								onChange={e => {
									console.log(e.nativeEvent.text);
									setCode(parseInt(e.nativeEvent.text));
								}}></TextInput>
							<Text>해당 코드의 문자 : {String.fromCodePoint(code > 0 ? code : 1)}</Text>
						</View>
					</View>
					<View
						style={{backgroundColor: 'green', position: 'absolute', bottom: -100000000, left: '50%'}}
						onLayout={e => {
							console.log('컨테이너', e.nativeEvent.layout);
							setCl(e.nativeEvent.layout);
							navigation.setOptions({header: props => false});
						}}>
						<Text
							onLayout={e => {
								console.log('글', e.nativeEvent.layout);
							}}
							onTextLayout={e => {
								console.log('텍스트레이아웃', e.nativeEvent);
								setTl(e.nativeEvent.lines[0]);
							}}
							// style={{fontFamily:'NotoSansKR-Regular',fontSize:fontSize,includeFontPadding:false,padding:0}}
							style={{fontFamily: 'NotoSansKR-Bold', fontSize: fontSize, includeFontPadding: false, padding: 0}}
							// style={{fontFamily:'Roboto-Regular',fontSize:fontSize,includeFontPadding:false,padding:0}}
							// style={{fontFamily:'Roboto-Bold',fontSize:fontSize,includeFontPadding:false,padding:0}}
							// style={{fontFamily:'NotoSansKR-Regular',fontSize:fontSize}}
							// style={{fontSize:fontSize,includeFontPadding:false,padding:0}}
							// style={{fontSize:fontSize}}
						>
							{testTx}
						</Text>
					</View>
					<TouchableWithoutFeedback
						onPress={() => {
							NativeModules.TextMeasureModule.getTextWidthTable({
								fontFamily: 'NotoSansKR-Bold',
								fontSize: fontSize,
							}).then(r => console.log('폰트정보', r));
						}}>
						<View style={{backgroundColor: 'blue', width: 100, height: 100, bottom: 0, left: 0}} />
					</TouchableWithoutFeedback>
				</View>
			)}
			{loading ? (
				<View
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<ActivityIndicator size="large" color={APRI10} />
				</View>
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// width: 654 * DP,
		width: 750 * DP,
		// height: 496 * DP,
		height: 278 * DP,
		// alignContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',

		marginBottom: 30 * DP,
		// borderTopWidth: 2 * DP,
		// borderTopColor: GRAY40,
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 40 * DP,
	},
});
