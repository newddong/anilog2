import React from 'react';
import {Image, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native';
import {Text, View} from 'react-native';
import {reportDetail, temp_style} from 'Templete/style_templete';
import FeedContent from 'Organism/feed/FeedContent';
import {useNavigation} from '@react-navigation/core';
import {favoriteFeed, getFeedDetailById, getMissingReportList} from 'Root/api/feedapi';
import {deleteComment, getCommentListByFeedId} from 'Root/api/commentapi';
import moment from 'moment';
import {txt} from 'Root/config/textstyle';
import userGlobalObject from 'Root/config/userGlobalObject';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from 'Root/component/molecules/modal/Loading';
import AnimalNeedHelpList from 'Root/component/organism/list/AnimalNeedHelpList';
import {GRAY10} from 'Root/config/color';
import Modal from 'Root/component/modal/Modal';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
export default ReportDetail = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [commentDataList, setCommentDataList] = React.useState('false'); //더보기 클릭 State
	const [reportList, setReportList] = React.useState('false');
	const [editComment, setEditComment] = React.useState(false); //답글 작성란 View 보이기 T/F
	// 제보 데이터 불러오기 (아직 API 미작업 )
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchFeedDetail();
			getCommnetList();
		});
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
			errcallback => {
				console.log(`errcallback:${JSON.stringify(errcallback)}`);
			},
		);
	};

	const fetchReportList = data_id => {
		getMissingReportList(
			{
				city: '',
				missing_animal_species: '',
				request_number: 4,
				feedobject_id: '',
			},
			result => {
				// console.log('getMissingReportList result', result.msg[0]);
				const filter = result.msg.filter(e => e.feed_type == 'report');
				const removeMine = filter.filter(e => e._id != data_id);
				const slice = removeMine.slice(0, 4);
				setReportList(slice);
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
				setCommentDataList(commentArray.filter(e => e.comment_is_delete != true));
			},
			errcallback => {
				console.log(`Comment errcallback:${JSON.stringify(errcallback)}`);
				setCommentDataList([]);
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
			},
			err => {
				console.log('err / FavoriteFeed / MissingReportList : ', err);
			},
		);
	};

	//실종 게시글 리스트의 아이템 클릭
	const onClickLabel = (status, id, item) => {
		// console.log(`\nMissingReportList:onLabelClick() - status=>${status} id=>${id} item=>${JSON.stringify(item)}`);
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
				navigation.push('MissingAnimalDetail', {title: titleValue, _id: id});
				break;
			case 'report':
				navigation.push('ReportDetail', {_id: id});
				break;
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

	//댓글 클릭
	const onPressReply = async () => {
		if (userGlobalObject.userInfo.isPreviewMode && commentDataList.length == 0) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			navigation.push('FeedCommentList', {feedobject: data, showAllContents: true});
		}
	};

	// 자식 답글에서 답글쓰기 버튼 클릭 콜백함수
	const onChildReplyBtnClick = comment => {
		setEditComment(!editComment);
	};

	//댓글 대댓글 삭제
	const onPressDelete = id => {
		console.log('id', id);
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				console.log('result / delectComment / ReportDetail : ', result.msg.comment_is_delete);
				getCommnetList();
			},
			err => {
				console.log(' err / deleteComment / ReportDetail : ', err);
			},
		);
	};

	//댓글 수정 클릭
	const onEdit = (comment, parent) => {
		let comment_obj = comment; //수정할 댓글의 오브젝트 정보
		const findParentIndex = commentDataList.findIndex(e => e._id == parent); // 수정 댓글의 parentComment id , 대댓글일 경우에도 parentComment id
		const isChild = commentDataList.findIndex(e => e._id == comment._id) == -1; // 수정하려는 댓글이 자식댓글인지 여부
		comment_obj.isChild = isChild;
		comment_obj.comment_index = findParentIndex;
		navigation.push('FeedCommentList', {feedobject: data, edit: comment}); // 수정하려는 댓글 정보를 포함해서 보냄
	};

	//댓글 더보기 클릭
	const moveToCommentList = () => {
		navigation.push('FeedCommentList', {feedobject: data, showAllContents: true});
	};

	//로딩중일때 출력
	if (data == 'false' || reportList == 'false' || commentDataList == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[reportDetail.wrp_main]}>
				<FlatList
					contentContainerStyle={[reportDetail.container]}
					data={[{}]}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={
						<View style={{alignItems: 'center'}}>
							<View style={[temp_style.img_square_750, reportDetail.img_square_750]}>
								{/* 제보사진 */}
								<Image
									source={{
										uri: data.feed_thumbnail,
									}}
									style={[temp_style.img_square_750]}
								/>
							</View>
							<View style={[temp_style.feedContent]}>
								{/* DB에서 가져오는 제보 피드글 데이터를 FeedContent에 넘겨준다. */}
								<FeedContent data={data} onPressFavorite={onPressFavoriteWriter} />
							</View>

							<View style={[reportDetail.basic_separator]}>
								<View style={[reportDetail.separator]}></View>
							</View>
						</View>
					}
					renderItem={({item, index}) => (
						<View style={{paddingVertical: 10 * DP, alignItems: 'center'}}>
							{commentDataList && commentDataList.length > 0 ? (
								<TouchableOpacity
									onPress={onPressReply}
									style={[
										{
											width: 654 * DP,
											alignItems: 'flex-end',
											alignSelf: 'center',
										},
									]}>
									<Text style={[txt.noto26, {color: GRAY10, marginBottom: 20 * DP}]}> 댓글 {commentDataList.length}개 모두 보기</Text>
								</TouchableOpacity>
							) : (
								<></>
							)}
							<CommentList
								items={commentDataList.length > 2 ? commentDataList.slice(0, 2) : commentDataList}
								onPressReplyBtn={moveToCommentList}
								onPress_ChildComment_ReplyBtn={comment => onChildReplyBtnClick(comment)}
								onPressDelete={onPressDelete}
								onPressDeleteChild={onPressDelete}
								onEdit={onEdit}
							/>
							<View style={{marginTop: 20 * DP}}>
								<ReplyWriteBox onPressReply={onPressReply} onWrite={onPressReply} isProtectRequest={true} />
							</View>
							<View style={[{paddingVertical: 20 * DP}]}>
								<Text style={[txt.noto24, {paddingVertical: 20 * DP, width: 684 * DP, alignSelf: 'center'}]}>제보글 더보기</Text>
								<AnimalNeedHelpList
									data={reportList}
									onFavoriteTag={(e, index) => onOff_FavoriteTag(e, index)}
									onClickLabel={(status, id, item) => onClickLabel(status, id, item)}
									whenEmpty={() => {
										return <></>;
									}}
								/>
							</View>
						</View>
					)}
				/>
			</View>
		);
};
