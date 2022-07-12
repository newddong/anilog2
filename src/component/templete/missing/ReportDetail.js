import React from 'react';
import {Image, TouchableOpacity, FlatList, Platform, StyleSheet, BackHandler} from 'react-native';
import {Text, View} from 'react-native';
import {temp_style} from 'Templete/style_templete';
import FeedContent from 'Organism/feed/FeedContent';
import {useNavigation} from '@react-navigation/core';
import {favoriteFeed, getFeedDetailById, getMissingReportList} from 'Root/api/feedapi';
import {deleteComment, getCommentListByFeedId} from 'Root/api/commentapi';
import moment from 'moment';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import Loading from 'Root/component/molecules/modal/Loading';
import {GRAY10, GRAY30, WHITE} from 'Root/config/color';
import Modal from 'Root/component/modal/Modal';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import ParentComment from 'Root/component/organism/comment/ParentComment';
import Swiper from 'react-native-swiper';
import MissingReportItem from 'Root/component/organism/listitem/MissingReportItem';
import {NETWORK_ERROR} from 'Root/i18n/msg';
import {styles} from 'Root/component/atom/image/imageStyle';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';
export default ReportDetail = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [comments, setComments] = React.useState('false'); //더보기 클릭 State
	const [reportList, setReportList] = React.useState('false');
	const [pressed, setPressed] = React.useState(false);

	const flatlist = React.useRef();
	// 제보 데이터 불러오기 (아직 API 미작업 )
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchFeedDetail();
			getCommnetList();
			setPressed(false);
		});
		navigation.setOptions({title: '제보'});
		return unsubscribe;
	}, []);

	const fetchFeedDetail = () => {
		getFeedDetailById(
			{
				feedobject_id: props.route.params._id,
			},
			data => {
				let result = data.msg;
				result.feed_writer_id.is_favorite = result.is_favorite;
				setData(data.msg);
				navigation.setParams({writer: data.msg.feed_writer_id._id, isMissingOrReport: true, feed_object: data.msg});
				fetchReportList(result._id);
			},
			err => {
				console.log('err / getFeedDetailById : ', err);
				if (err.includes('code 500')) {
					Modal.popOneBtn(NETWORK_ERROR, '확인', () => {
						navigation.goBack();
					});
				} else if (err.includes('Network')) {
					Modal.popOneBtn(NETWORK_ERROR, '확인', () => {
						navigation.goBack();
					});
				} else {
					Modal.popOneBtn(NETWORK_ERROR, '확인', () => {
						navigation.goBack();
					});
				}
			},
		);
	};

	const fetchReportList = data_id => {
		getMissingReportList(
			{
				limit: 1000,
				city: '',
				missing_animal_species: '',
				feedobject_id: '',
			},
			result => {
				// console.log('getMissingReportList result', result.msg[0]);
				const res = result.msg;
				const findIndex = res.findIndex(e => e._id == props.route.params._id);
				console.log('findIndex', findIndex);
				let temp = [];
				if (res.length < 5) {
					setReportList(res);
				} else if (res.length - findIndex < 5) {
					for (let ind = findIndex + 1; ind < res.length - 1; ind++) {
						temp.push(res[ind]);
					}
					setReportList(temp);
				} else {
					for (let ind = findIndex + 1; ind < findIndex + 5; ind++) {
						temp.push(res[ind]);
					}
					setReportList(temp);
				}
				// const removeMine = res.filter(e => e._id != data_id);
				// const slice = removeMine.slice(0, 4);
				// setReportList(slice);
			},
			err => {
				console.log('getMissingReportList Error', err);
				if (err == '검색 결과가 없습니다.') {
					setData([]);
				}
			},
		);
	};

	const getCommnetList = () => {
		getCommentListByFeedId(
			{
				feedobject_id: props.route.params._id,
				// commentobject_id: '61c2c0de7be07611b0094ffd',
				request_number: 10,
				login_userobject_id: userGlobalObject.userInfo._id,
			},
			commentdata => {
				// console.log('commentdata', commentdata.msg);
				commentdata.msg.map((v, i) => {
					//1depth를 올려준다.
					commentdata.msg[i].user_address = commentdata.msg[i].comment_writer_id.user_address;
					commentdata.msg[i].user_profile_uri = commentdata.msg[i].comment_writer_id.user_profile_uri;
					commentdata.msg[i].user_nickname = commentdata.msg[i].comment_writer_id.user_nickname;
					commentdata.msg[i].comment_date = moment(JSON.stringify(commentdata.msg[i].comment_date).replace(/\"/g, '')).format('YYYY.MM.DD hh:mm:ss');
					//일반 피드글과 구분하기 위해 feed_type 속성 추가 (다른 템플릿들과 시간 표기가 달라서 실종/제보에만 feed_type을 추가하고 시간 표기시 해당 속성 존재 여부만 판단)
					commentdata.msg[i].feed_type = 'report';
				});

				//댓글과 대댓글 작업 (부모 댓글과 자식 댓글 그룹 형성- 부모 댓글에서 부모의 childArray 속성에 자식 댓글 속성들을 추가)
				//부모 댓글은 실제 삭제불가하며 필드로 삭제 여부 값 형성 필요. (네이버나 다음 까페에서도 대댓글 존재시 댓글은 삭제해도 댓글 자리는 존재하고 그 밑으로 대댓글 그대로 노출됨)
				let commentArray = [];
				let tempComment = commentdata.msg;
				tempComment.map((v, i) => {
					// comment_parent가 없으면 일반 댓글
					if (v.comment_parent == undefined) {
						commentArray.push(v);
						//push한 JSON에 대댓글이 달릴 수 있으므로 childArray 배열 속성을 추가.
						commentArray[commentArray.length - 1].childArray = [];
					} else if (v.comment_parent != undefined && v.comment_parent != '') {
						//부모 댓글값이 존재할 경우 대댓글임, 원래 댓글의 childArray 배열에 push 함.
						for (let j = 0; j < commentArray.length; j++) {
							if (commentArray[j]._id == v.comment_parent) {
								commentArray[j].childArray.push(v);
								break;
							}
						}
					}
				});
				let res = commentArray.filter(e => !e.comment_is_delete || e.children_count != 0);
				setComments(res);
			},
			errcallback => {
				console.log(`Comment errcallback:${JSON.stringify(errcallback)}`);
				setComments([]);
			},
		);
	};

	//실종 게시글 즐겨찾기 아이콘 클릭
	const onOff_FavoriteTag = (value, index) => {
		favoriteFeed(
			{
				feedobject_id: reportList[index]._id,
				userobject_id: userGlobalObject.userInfo._id,
				is_favorite: value,
			},
			result => {
				console.log('result / FavoriteFeed / MissingReportList : ', result.msg.targetFeed);
				let temp = [...feed_obj.list];
				const findIndex = temp.findIndex(e => e._id == result.msg.targetFeed._id); //현재 보고 있는 피드게시글이 저장된 리스트에서 몇 번째인지
				temp[findIndex].is_favorite = !temp[findIndex].is_favorite;
				feed_obj.list = temp;
			},
			err => {
				console.log('err / FavoriteFeed / MissingReportList : ', err);
			},
		);
	};

	//실종 게시글 리스트의 아이템 클릭
	const onClickLabel = (status, id, item) => {
		setPressed(true);
		if (!pressed) {
			let sexValue = '';
			switch (status) {
				case 'missing':
					switch (item.missing_animal_sex) {
						case 'male':
							sexValue = '남';
							break;
						case 'female':
							sexValue = '여';
							break;
						case 'male':
							sexValue = '성별모름';
							break;
					}
					const titleValue = item.missing_animal_species + '/' + item.missing_animal_species_detail + '/' + sexValue;
					// navigation.push('MissingAnimalDetail', {title: titleValue, _id: id});
					navigation.navigate({key: item._id + new Date().getTime(), name: 'MissingAnimalDetail', params: {title: titleValue, _id: id}});

					break;
				case 'report':
					navigation.navigate({key: item._id + new Date().getTime(), name: 'ReportDetail', params: {_id: id}});
					break;
			}
		}
	};

	const onPressFavoriteWriter = bool => {
		const isMyReportFeed = data.feed_writer_id._id == userGlobalObject.userInfo._id;
		if (isMyReportFeed) {
			Modal.popOneBtn('본인 계정의 즐겨찾기는 \n 불가능합니다.', '확 인', () => Modal.close());
		} else {
			setFavoriteEtc(
				{
					collectionName: 'userobjects',
					target_object_id: data.feed_writer_id._id,
					is_favorite: bool,
				},
				result => {
					console.log('result / favoriteEtc / profileInfo : ', result.msg.favoriteEtc);
					fetchFeedDetail();
				},
				err => {
					console.log('err / favoriteEtc / profileInfo : ', err);
				},
			);
		}
	};

	//특정 댓글로 스크롤 이동 함수
	const scrollToReply = i => {
		if (Platform.OS == 'ios') {
			setTimeout(() => {
				flatlist.current.scrollToIndex({animated: true, index: i, viewPosition: 0});
			}, 200);
		} else {
			flatlist.current.scrollToIndex({animated: true, index: i, viewPosition: 0});
		}
	};

	//댓글 클릭
	const onPressReply = comment => {
		if (userGlobalObject.userInfo.isPreviewMode && comments.length == 0) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			navigation.navigate('FeedCommentList', {feedobject: data, showAllContents: true, reply: comment});
		}
	};

	//댓글 더보기 클릭
	const moveToCommentList = () => {
		navigation.navigate('FeedCommentList', {feedobject: data, showAllContents: true, showKeyboard: true});
	};

	//댓글 대댓글 삭제
	const onPressDelete = id => {
		deleteComment(
			{commentobject_id: id},
			result => {
				console.log('result / delectComment / ReportDetail : ', result.msg.comment_is_delete);
				getCommnetList();
			},
			err => {
				console.log(' err / deleteComment / ReportDetail : ', err);
			},
		);
	};

	//답글 더보기 클릭
	const showChild = index => {
		console.log('showChild', index);
		scrollToReply(index);
	};

	//댓글 수정 클릭
	const onEdit = (comment, parent, child) => {
		// console.log('comment', comment);
		// navigation.push('FeedCommentList', {feedobject: data, edit: comment});
		let comment_obj = comment; //수정할 댓글의 오브젝트 정보
		const findParentIndex = comments.findIndex(e => e._id == parent._id); // 수정 댓글의 parentComment id , 대댓글일 경우에도 parentComment id
		const isChild = comments.findIndex(e => e._id == comment._id) == -1; // 수정하려는 댓글이 자식댓글인지 여부
		let viewOffset = 0; //자식댓글이 존재할 경우 내려갈 offSet 수치
		console.log('childIndex', child);
		if (child.findIndex != undefined && child.findIndex != -1) {
			//대댓글의 수정 분기
			viewOffset = 160 * (child.findIndex + 1) * DP; //수정할 대상 대댓글의 인덱스만큼 scrollOffset 조정
			viewOffset = viewOffset + 540 * child.hasPhoto * DP; //수정할 대상 대댓글 이전에 사진을 포함한 대댓글이 있을 경우 사진 개수 및 크기만큼 scrollOffSet 조정
			comment.comment_photo_uri ? (viewOffset = viewOffset + 360 * DP) : false; //수정할 대상 대댓글이 사진을 포함한 경우 사진 크기만큼 scrollOffSet 조정
		}
		if (parent.comment_photo_uri) {
			//대상 대댓글의 부모댓글이 사진을 포함한 경우 사진 크기만큼 scrollOffset 조정
			Platform.OS == 'android' ? (viewOffset = viewOffset + 340 * DP) : (viewOffset = viewOffset + 406 * DP);
		}
		comment_obj.isChild = isChild;
		comment_obj.comment_index = findParentIndex;
		comment_obj.viewOffset = viewOffset;
		navigation.navigate('FeedCommentList', {feedobject: data, edit: comment}); // 수정하려는 댓글 정보를 포함해서 보냄
	};

	const onPressReqeustPhoto = () => {
		Modal.popPhotoListViewModal(
			data.feed_medias.map(v => v.media_uri),
			() => Modal.close(),
		);
	};

	const ITEM_HEIGHT = 266 * DP;
	const keyExtractor = React.useCallback(item => item._id.toString(), []);
	const getItemLayout = React.useCallback(
		(data, index) =>
			!data[index]
				? {length: 0, offset: 0, index: index}
				: {
						length: ITEM_HEIGHT,
						offset: ITEM_HEIGHT * index,
						index,
				  },
		[],
	);

	const header = () => {
		return (
			<View style={{alignItems: 'center'}}>
				{/* 제보사진 */}
				<View style={[styles.img_square_round_694, {marginTop: 20 * DP}]}>
					<Swiper showsPagination={false} autoplay={false} loop={false} horizontal={true}>
						{data.feed_medias != undefined &&
							data.feed_medias.map((val, idx) => (
								<TouchableOpacity onPress={onPressReqeustPhoto} activeOpacity={0.8} key={idx}>
									<FastImage source={{uri: val.media_uri}} style={[styles.img_square_round_694]} />
									<View style={[style.swiper_index]}>
										<Text style={[txt.roboto24, {color: WHITE}]}>
											{idx + 1}/{data.feed_medias.length}
										</Text>
									</View>
								</TouchableOpacity>
							))}
					</Swiper>
				</View>
				<View style={[style.feedContent]}>
					<FeedContent data={data} onPressFavorite={onPressFavoriteWriter} showMedia={false} />
				</View>

				<View style={[style.basic_separator]}>
					<View style={[style.separator]}></View>
				</View>
				{comments && comments.length > 0 ? (
					<TouchableOpacity onPress={moveToCommentList} style={[{width: 694 * DP, alignItems: 'flex-end', alignSelf: 'center'}]}>
						<Text style={[txt.noto26, {color: GRAY10, marginBottom: 20 * DP}]}> 댓글 {comments.length}개 모두 보기</Text>
					</TouchableOpacity>
				) : (
					<></>
				)}
			</View>
		);
	};

	const renderItem = ({item, index}) => {
		return (
			<ParentComment
				writer={data.feed_writer_id}
				parentComment={item}
				onPressReplyBtn={onPressReply} // 부모 댓글의 답글쓰기 클릭 이벤트
				onEdit={onEdit}
				onPressDelete={onPressDelete}
				onPressDeleteChild={onPressDelete}
				showChild={() => showChild(index)}
			/>
		);
	};

	const footer = () => {
		const renderMissingReport = ({item, index}) => {
			return (
				<MissingReportItem
					data={item}
					onClickLabel={(status, id) => onClickLabel(status, id, item)}
					onFavoriteTag={e => onOff_FavoriteTag(e, index)}
				/>
			);
		};
		return (
			<View style={{alignItems: 'center'}}>
				<View style={{marginTop: 20 * DP}}>
					<ReplyWriteBox onPressReply={moveToCommentList} onWrite={moveToCommentList} isProtectRequest={true} />
				</View>
				<View style={[{paddingVertical: 50 * DP}]}>
					<Text style={[txt.noto24, {width: 694 * DP, alignSelf: 'center'}]}>실종/제보 더보기</Text>
					<FlatList data={reportList} renderItem={renderMissingReport} keyExtractor={keyExtractor} getItemLayout={getItemLayout} windowSize={5} />
				</View>
			</View>
		);
	};

	//로딩중일때 출력
	if (data == 'false' || reportList == 'false' || comments == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.wrp_main]}>
				<FlatList
					ref={flatlist}
					contentContainerStyle={[style.container]}
					data={comments.length > 2 ? comments.slice(0, 2) : comments}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={header()}
					renderItem={renderItem}
					ListFooterComponent={footer()}
					ListEmptyComponent={<Text style={[txt.roboto28b, {color: GRAY10, paddingVertical: 40 * DP, textAlign: 'center'}]}>댓글이 없습니다.</Text>}
				/>
			</View>
		);
};

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	img_square_750: {
		marginTop: 20 * DP,
		// backgroundColor: 'yellow',
	},
	commentList: {
		flex: 1,
	},
	basic_separator: {
		width: 694 * DP,
		height: 60 * DP,
	},
	separator: {
		width: 694 * DP,
		height: 2 * DP,
		backgroundColor: GRAY30,
		marginTop: 30 * DP,
	},
	wrp_main: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	swiper_index: {
		position: 'absolute',
		borderRadius: 24 * DP,
		width: 76 * DP,
		height: 50 * DP,
		backgroundColor: 'black',
		opacity: 0.6,
		right: 20 * DP,
		bottom: 20 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	feedContent: {
		width: 694 * DP,
		marginTop: 20 * DP,
		// height: 260 * DP,
		// backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
