import React, {useRef} from 'react';
import {Image, TouchableOpacity, FlatList, TouchableWithoutFeedback, Platform, PermissionsAndroid} from 'react-native';
import {Text, View} from 'react-native';
import {reportDetail, temp_style, missingAnimalDetail} from 'Templete/style_templete';
import FeedContent from 'Organism/feed/FeedContent';
import {useNavigation} from '@react-navigation/core';
import {favoriteFeed, getFeedDetailById, getMissingReportList} from 'Root/api/feedapi';
import {deleteComment, getCommentListByFeedId} from 'Root/api/commentapi';
import moment from 'moment';
import {txt} from 'Root/config/textstyle';
import ViewShot from 'react-native-view-shot';
import Modal from 'Root/component/modal/Modal';
import {PosterSave} from 'Component/atom/icon';
import {phoneFomatter} from 'Root/util/stringutil';
import userGlobalObject from 'Root/config/userGlobalObject';
import {GRAY10} from 'Root/config/color';
import Loading from 'Root/component/molecules/modal/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimalNeedHelpList from 'Root/component/organism/list/AnimalNeedHelpList';
import {setFavoriteEtc} from 'Root/api/favoriteetc';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import MissingReportItem from 'Root/component/organism/listitem/MissingReportItem';
import {NETWORK_ERROR} from 'Root/i18n/msg';
import CameraRoll from 'Root/module/CameraRoll';

export default MissingAnimalDetail = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [comments, setComments] = React.useState(); //더보기 클릭 State
	const [missingList, setMissingList] = React.useState('false');
	const viewShotRef = useRef();
	const flatlist = useRef();

	//api 실제 작업 후 하단에 있는 data로 변경 예정 (현재는 에러 방지 코드)

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchFeedData();
			getCommnetList();
		});
		return unsubscribe;
	}, []);

	const fetchFeedData = () => {
		getFeedDetailById(
			{
				feedobject_id: props.route.params._id,
			},
			data => {
				let result = data.msg;
				result.feed_writer_id.is_favorite = result.is_favorite;
				setData(result);
				// console.log('data', data.msg);
				navigation.setParams({writer: data.msg.feed_writer_id._id, isMissingOrReport: true, feed_object: data.msg});
				fetchMissingPostList(result._id);
			},
			errcallback => {
				console.log(`errcallback:${JSON.stringify(errcallback)}`);
			},
		);
	};

	const fetchMissingPostList = data_id => {
		getMissingReportList(
			{
				city: '',
				missing_animal_species: '',
				request_number: 4,
				feedobject_id: '',
			},
			result => {
				console.log('getMissingReportList result', result.msg.length);
				const filter = result.msg.filter(e => e.feed_type == 'missing');
				// console.log('dataID', data_id);
				const removeMine = filter.filter(e => e._id != data_id);
				const slice = removeMine.slice(0, 4);
				setMissingList(slice);
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
		Modal.popLoading();
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
					commentdata.msg[i].feed_type = 'missing';
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
				Modal.close();
			},
			errcallback => {
				console.log(`Comment errcallback:${JSON.stringify(errcallback)}`);
				if (errcallback == '검색 결과가 없습니다.') {
					setComments([]);
				}
			},
		);
	};

	//실종 게시글 즐겨찾기 아이콘 클릭
	const onOff_FavoriteTag = (value, index) => {
		console.log('value', value);
		favoriteFeed(
			{
				feedobject_id: missingList[index]._id,
				userobject_id: userGlobalObject.userInfo._id,
				is_favorite: value,
			},
			result => {
				console.log('result / FavoriteFeed / MissingReportList : ', result.msg.targetFeed.missing_animal_features);
			},
			err => {
				console.log('err / FavoriteFeed / MissingReportList : ', err);
				if (err.includes('error')) {
					Modal.alert(NETWORK_ERROR);
				}
			},
		);
	};

	const onPressFavoriteWriter = bool => {
		console.log('bool', bool);
		const isMyMissingFeed = data.feed_writer_id._id == userGlobalObject.userInfo._id;
		if (isMyMissingFeed) {
			Modal.popOneBtn('본인 계정의 즐겨찾기는 \n 불가능합니다.', '확 인', () => Modal.close());
		} else {
			setFavoriteEtc(
				{
					collectionName: 'userobjects',
					target_object_id: data.feed_writer_id._id,
					is_favorite: bool,
				},
				result => {
					console.log('result / favoriteEtc / missingAnimalDetail : ', result.msg.favoriteEtc);
					fetchFeedData();
				},
				err => {
					console.log('err / favoriteEtc / missingAnimalDetail : ', err);
				},
			);
		}
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

	//전단지 저장
	async function captureScreenShot() {
		try {
			const imageURI = await viewShotRef.current.capture();
			if (Platform.OS === 'android') {
				// const granted = await getPermissionAndroid();
				const granted = await getPerMission();
				if (!granted) {
					console.log('not granted');
					return;
				}
			}
			const image = await CameraRoll.saveImage(imageURI);
			if (image) {
				// Alert.alert('', 'Image saved successfully.', [{text: 'OK', onPress: () => {}}], {cancelable: false});
				Modal.popOneBtn('전단지가 저장되었습니다.', '확인', Modal.close);
			}
			// Share.share({title: 'Image', url: imageURI});
		} catch (error) {
			console.log('error', error);
		}
	}

	// get permission on android
	const getPermissionAndroid = async () => {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
				title: 'Image Download Permission',
				message: 'Your permission is required to save images to your device',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			});
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			}
			Alert.alert('', '전단지를 저장하기 위해서는 권한이 필요합니다.', [{text: 'OK', onPress: () => {}}], {cancelable: false});
		} catch (err) {
			// handle error as you please
			console.log('err', err);
		}
	};

	function capture() {
		console.log('log pressed');
		try {
			captureScreenShot();
		} catch (err) {
			console.log('Screenshot Error', err);
		}
	}

	async function getPerMission() {
		let confirmed = false;
		try {
			confirmed = await getPermissionAndroid();
		} catch (err) {
			console.log('Android Image Permisson Failed', err);
		}
		return confirmed;
	}

	//댓글 대댓글 삭제
	const onPressDelete = id => {
		console.log('id', id);
		deleteComment(
			{
				commentobject_id: id,
			},
			result => {
				console.log('result / delectComment / ProtectCommentList : ', result.msg.comment_is_delete);
				getCommnetList();
			},
			err => {
				console.log(' err / deleteComment / ProtectCommentList : ', err);
			},
		);
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

	//댓글 이동
	const onPressReply = comment => {
		if (userGlobalObject.userInfo.isPreviewMode && comments.length == 0) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			const findParentIndex = comments.findIndex(e => e._id == comment._id); // 수정 댓글의 parentComment id , 대댓글일 경우에도 parentComment id
			let comment_obj = comment;
			comment_obj.comment_index = findParentIndex;
			navigation.push('FeedCommentList', {feedobject: data, showAllContents: true, reply: comment_obj});
		}
	};

	//댓글 모두보기 클릭
	const moveToCommentPage = () => {
		navigation.push('FeedCommentList', {feedobject: data, showAllContents: true, showKeyboard: true});
	};

	//답글 더보기 클릭
	const showChild = index => {
		console.log('showChild', index);
		scrollToReply(index);
	};

	//댓글 수정 클릭
	const onEdit = (comment, parent) => {
		// console.log('comment', comment);
		// navigation.push('FeedCommentList', {feedobject: data, edit: comment});
		let comment_obj = comment; //수정할 댓글의 오브젝트 정보
		const findParentIndex = comments.findIndex(e => e._id == parent); // 수정 댓글의 parentComment id , 대댓글일 경우에도 parentComment id
		const isChild = comments.findIndex(e => e._id == comment._id) == -1; // 수정하려는 댓글이 자식댓글인지 여부
		comment_obj.isChild = isChild;
		comment_obj.comment_index = findParentIndex;
		navigation.push('FeedCommentList', {feedobject: data, edit: comment}); // 수정하려는 댓글 정보를 포함해서 보냄
	};

	const whenEmpty = () => {
		return <></>;
	};

	const header = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<View>
					<ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 1.0}}>
						<View style={[missingAnimalDetail.poster]}>
							<View style={missingAnimalDetail.title}>
								<MissingAnimalTitle data={data} />
							</View>
							<MissingAnimalPicture data={data} />
							<MissingAnimalText data={data} />
							<MissingAnimalPhone data={data} />
							<Text style={missingAnimalDetail.missingText18}>반려동물 커뮤니티 애니로그</Text>
						</View>
					</ViewShot>
					<TouchableWithoutFeedback onPress={capture}>
						<View style={missingAnimalDetail.floatingBtnMissingReport}>
							<PosterSave />
							<Text style={[txt.noto20, {color: 'red'}, {fontWeight: 'bold'}]}>전단지 저장</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>

				<View style={[temp_style.feedContent]}>
					<FeedContent data={data} />
				</View>

				<View style={[reportDetail.basic_separator]}>
					<View style={[reportDetail.separator]}></View>
				</View>

				{comments && comments.length > 0 ? (
					<TouchableOpacity
						onPress={onPressReply}
						style={[
							{
								width: 654 * DP,
								alignItems: 'flex-end',
								alignSelf: 'center',
							},
						]}>
						<Text style={[txt.noto26, {color: GRAY10, marginBottom: 10 * DP}]}> 댓글 {comments.length}개 모두 보기</Text>
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
					onPressProtectRequest={() => onPressProtectRequest(item)}
				/>
			);
		};
		return (
			<View style={{alignItems: 'center'}}>
				<ReplyWriteBox onPressReply={moveToCommentPage} onWrite={moveToCommentPage} isProtectRequest={true} />
				<View style={[{paddingVertical: 20 * DP}]}>
					<Text style={[txt.noto24, {paddingVertical: 20 * DP, width: 684 * DP, alignSelf: 'center'}]}>실종글 더보기</Text>
					{/* <AnimalNeedHelpList
						data={missingList}
						onFavoriteTag={(e, index) => onOff_FavoriteTag(e, index)}
						onClickLabel={(status, id, item) => onClickLabel(status, id, item)}
						whenEmpty={whenEmpty()}
					/> */}
					<FlatList data={missingList} renderItem={renderMissingReport} />
				</View>
			</View>
		);
	};

	//로딩중일때 출력
	if (data == 'false' || missingList == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[reportDetail.wrp_main]}>
				<FlatList
					ref={flatlist}
					contentContainerStyle={[reportDetail.container]}
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

// 포스터 제목 컴포넌트
const MissingAnimalTitle = props => {
	// const [animalSpecies, setAnimalSpecies] = React.useState('');
	//포스터 타이틀 동물 종류
	const data = props.data;
	if (!data) return false;
	let animalSpecies = '';
	switch (data.missing_animal_species) {
		case '개':
			animalSpecies = '강아지를';
			break;
		case '고양이':
			animalSpecies = '고양이를';
			break;
		case '기타 포유류':
			animalSpecies = '반려동물을';
			break;
		case '조류':
			animalSpecies = data.missing_animal_species_detail.toString() + '를';
			break;
		case '수중생물':
			animalSpecies = '물고기를';

			break;
		case '기타':
			animalSpecies = data.missing_animal_species_detail.toString() + '를';
			break;
		default:
			animalSpecies = '반려동물을';
			break;
	}

	return <Text style={missingAnimalDetail.titleText}>{animalSpecies} 찾습니다</Text>;
};

//포스터 동물 정보 View 컴포넌트
const MissingAnimalText = props => {
	const data = props.data;
	if (!data.missing_animal_date) return false;
	let newText = data.missing_animal_date;
	let splitedNewText = newText.split('-');
	let animalSex = '';
	let newYearText = splitedNewText[0] + '년 ';
	let newDayText = splitedNewText[1] + '월 ' + '월 ' + splitedNewText[2].toString().substring(0, 2) + '일';
	let splitAddress = data.missing_animal_lost_location.split('"');
	let newMissingAddress = splitAddress[3] + ' ' + splitAddress[7] + ' ' + splitAddress[11];

	if (data.missing_animal_sex == 'male') {
		animalSex = '/ 남';
	} else if (data.missing_animal_sex == 'female') {
		animalSex = '/ 여';
	} else {
		animalSex = '';
	}
	return (
		<View style={missingAnimalDetail.textBox}>
			<Text style={missingAnimalDetail.missingText38}>
				{data.missing_animal_species} / {data.missing_animal_species_detail} / {data.missing_animal_age}살 {animalSex}
			</Text>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Text style={missingAnimalDetail.missingBlackText32}>{newYearText}</Text>
				<Text style={missingAnimalDetail.missingRedText32}>{newDayText} </Text>
				<Text style={missingAnimalDetail.missingBlackText32}>실종</Text>
			</View>
			{/* <Text>{data.missing_animal_date} 실종</Text> */}
			<View style={{paddingTop: 4}}>
				<Text style={missingAnimalDetail.missingText26}>{newMissingAddress}</Text>
			</View>
			<View style={missingAnimalDetail.oneLine} />

			{/* <Text numberOfLines={1}>___________________________________</Text> */}

			<Text style={missingAnimalDetail.missingText22}>ㆍ{data.missing_animal_features}</Text>
		</View>
	);
};

// 포스터 전화번호 View 컴포넌트
const MissingAnimalPhone = props => {
	const data = props.data;
	let phoneNumber = phoneFomatter(data.missing_animal_contact);
	return (
		<View style={missingAnimalDetail.phoneNumberBox}>
			<Text style={missingAnimalDetail.missingTextWhite18}>동물을 찾으면 직접 전단지를 수거하겠습니다. 전단지를 떼지 말아주세요!!</Text>
			<View style={missingAnimalDetail.yellowNumberBox}>
				{/* <Text style={missingAnimalDetail.missingTextYellow50}>{data.missing_animal_contact}</Text> */}
				<Text style={missingAnimalDetail.missingTextYellow50}>{phoneNumber}</Text>
			</View>
		</View>
	);
};

//-------------------- 강아지를 찾습니다 컴포넌트 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 포스터 동물 사진2개 View 컴포넌트
const MissingAnimalPicture = props => {
	const data = props.data;
	const feed_medias = data.feed_medias;
	if (!feed_medias) return false;
	if (feed_medias.length < 2) {
		return (
			<View style={missingAnimalDetail.picture}>
				<Image
					source={{
						uri: data.feed_medias[0].media_uri,
					}}
					style={[missingAnimalDetail.img_squre_284]}
				/>
			</View>
		);
	} else {
		return (
			<View style={missingAnimalDetail.picture}>
				<Image
					source={{
						uri: data.feed_medias[0].media_uri,
					}}
					style={[missingAnimalDetail.img_squre_284]}
				/>
				<Image
					source={{
						uri: data.feed_medias[1].media_uri,
					}}
					style={[missingAnimalDetail.img_squre_284]}
				/>
			</View>
		);
	}
};
