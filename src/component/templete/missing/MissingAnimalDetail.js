import React, {useRef} from 'react';
import {Image, TouchableOpacity, FlatList, TouchableWithoutFeedback, Platform, PermissionsAndroid, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import FeedContent from 'Organism/feed/FeedContent';
import {useNavigation} from '@react-navigation/core';
import {favoriteFeed, getFeedDetailById, getMissingReportList} from 'Root/api/feedapi';
import {deleteComment, getCommentListByFeedId} from 'Root/api/commentapi';
import moment from 'moment';
import {txt} from 'Root/config/textstyle';
import ViewShot from 'react-native-view-shot';
import Modal from 'Root/component/modal/Modal';
import {phoneFomatter} from 'Root/util/stringutil';
import userGlobalObject from 'Root/config/userGlobalObject';
import {GRAY10, GRAY30, GRAY40, WHITE} from 'Root/config/color';
import Loading from 'Root/component/molecules/modal/Loading';
import ReplyWriteBox from 'Root/component/organism/input/ReplyWriteBox';
import MissingReportItem from 'Root/component/organism/listitem/MissingReportItem';
import {NETWORK_ERROR} from 'Root/i18n/msg';
import CameraRoll from 'Root/module/CameraRoll';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';

export default MissingAnimalDetail = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [comments, setComments] = React.useState(); //더보기 클릭 State
	const [missingList, setMissingList] = React.useState('false');
	const [pressed, setPressed] = React.useState(false);
	const viewShotRef = useRef();
	const flatlist = useRef();

	//페이지 진입 시 실종게시글 상세 데이터 및 댓글 목록 api 접속
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchFeedData();
			getCommnetList();
			setPressed(false);
		});
		return unsubscribe;
	}, []);

	//게시글 상세데이터 api
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
				if (props.route.params && props.route.params.from == 'feedList') {
					// console.log('result', result);
					const getGender = () => {
						switch (result.missing_animal_sex) {
							case 'male':
								return '남아';
							case 'female':
								return '여아';
							case 'unknown':
								return '';
							default:
								break;
						}
					};
					navigation.setOptions({
						title: `${result.missing_animal_species}/${result.missing_animal_species_detail}${getGender() ? '/' + getGender() : ''}`,
					});
				}
				fetchMissingPostList(result._id);
			},
			err => {
				console.log('getFeedDetailById / Error / MissingAnimalDetail : ', err);
				if (err.includes('code 500')) {
					setData('false');
					setTimeout(() => {
						Modal.popOneBtn(NETWORK_ERROR, '확인', () => navigation.goBack());
					}, 500);
				} else if (err.includes('없습니다')) {
					setData('false');
					setTimeout(() => {
						Modal.popOneBtn(NETWORK_ERROR, '확인', () => navigation.goBack());
					}, 500);
				}
			},
		);
	};

	const fetchMissingPostList = data_id => {
		getMissingReportList(
			{
				city: '',
				missing_animal_species: '',
				feedobject_id: '',
				limit: 1000,
			},
			result => {
				console.log('getMissingReportList result', result.msg.length);
				const res = result.msg;
				const findIndex = res.findIndex(e => e._id == props.route.params._id);
				console.log('findIndex', findIndex);
				let temp = [];
				if (res.length < 5) {
					setMissingList(res);
				} else if (res.length - findIndex < 5) {
					for (let ind = findIndex + 1; ind < res.length - 1; ind++) {
						temp.push(res[ind]);
					}
					setMissingList(temp);
				} else {
					for (let ind = findIndex + 1; ind < findIndex + 5; ind++) {
						temp.push(res[ind]);
					}
					setMissingList(temp);
				}
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
				request_number: 9999,
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

	//실종 게시글 리스트의 아이템 클릭
	const onClickLabel = (status, id, item) => {
		// console.log(`\nMissingReportList:onLabelClick() - status=>${status} id=>${id} item=>${JSON.stringify(item)}`);
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
					navigation.navigate({key: item._id + new Date().getTime(), name: 'MissingAnimalDetail', params: {title: titleValue, _id: id}});
					break;
				case 'report':
					navigation.navigate({key: item._id + new Date().getTime(), name: 'ReportDetail', params: {_id: id}});
					break;
			}
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

			// if (image) {
			// 	// Alert.alert('', 'Image saved successfully.', [{text: 'OK', onPress: () => {}}], {cancelable: false});
			// 	Modal.popOneBtn('전단지가 저장되었습니다.', '확인', Modal.close);
			// }
			// Share.share({title: 'Image', url: imageURI});
		} catch (error) {
			console.log('error', error);
		} finally {
			// if (image) {
			// Alert.alert('', 'Image saved successfully.', [{text: 'OK', onPress: () => {}}], {cancelable: false});
			Modal.popOneBtn('전단지가 저장되었습니다.', '확인', Modal.close);
			// }
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
		Modal.popTwoBtn(
			'전단지를 저장하시겠습니까?',
			'아니오',
			'네',
			() => Modal.close(),
			() => {
				Modal.close();
				setTimeout(() => {
					try {
						captureScreenShot();
					} catch (err) {
						console.log('Screenshot Error', err);
					}
				}, 100);
			},
			Modal.close,
		);
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
				navigation.navigate('LoginRequired');
			});
		} else {
			navigation.navigate('FeedCommentList', {feedobject: data, showAllContents: true, reply: comment});
		}
	};

	//댓글 모두보기 클릭
	const moveToCommentPage = () => {
		navigation.navigate('FeedCommentList', {feedobject: data, showAllContents: true, showKeyboard: true});
	};

	//답글 더보기 클릭
	const showChild = index => {
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

	const header = () => {
		return (
			<View style={{alignItems: 'center'}}>
				<TouchableOpacity onLongPress={capture} activeOpacity={0.4}>
					<Text style={[txt.noto26, {color: GRAY10, marginTop: 20 * DP}]}>전단지를 꾹 눌러 저장해주세요.</Text>
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
				</TouchableOpacity>
				<View style={[style.feedContent]}>
					<FeedContent data={data} showMedia={false} />
				</View>
				<View style={[style.basic_separator]}>
					<View style={[style.separator]}></View>
				</View>
				{comments && comments.length > 0 ? (
					<TouchableOpacity onPress={moveToCommentPage} style={[{width: 694 * DP, alignItems: 'flex-end', alignSelf: 'center'}]}>
						<Text style={[txt.noto26, {marginBottom: 10 * DP}]}> 댓글 {comments.length}개 모두 보기</Text>
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
			<View style={{alignItems: 'center', paddingTop: 10 * DP}}>
				<ReplyWriteBox onPressReply={moveToCommentPage} onWrite={moveToCommentPage} isProtectRequest={true} />
				<View style={[{paddingVertical: 50 * DP}]}>
					<Text style={[txt.noto24, {width: 694 * DP, alignSelf: 'center'}]}>실종/제보 더보기</Text>
					<FlatList data={missingList} renderItem={renderMissingReport} keyExtractor={item => item._id} windowSize={5} />
				</View>
			</View>
		);
	};

	//로딩중일때 출력
	if (data == 'false' || missingList == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.wrp_main, {}]}>
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

	return <Text style={[txt.noto26b, {fontSize: 62 * DP, color: WHITE}]}>{animalSpecies} 찾습니다</Text>;
};

//포스터 동물 정보 View 컴포넌트
const MissingAnimalText = props => {
	const data = props.data;
	if (!data.missing_animal_date) return false;
	let splitAddress = data.missing_animal_lost_location.split('"');
	let newMissingAddress = splitAddress[3] + ' ' + splitAddress[7] + ' ' + splitAddress[11];
	return (
		<View style={missingAnimalDetail.textBox}>
			<View style={{paddingTop: 4}}>
				<Text style={missingAnimalDetail.missingText26}>{newMissingAddress}</Text>
			</View>
			<View style={missingAnimalDetail.oneLine} />
			<Text style={missingAnimalDetail.missingText22} numberOfLines={5}>
				ㆍ{data.missing_animal_features}
			</Text>
		</View>
	);
};

const getAge = date => {
	let yr = date;
	let month = Math.floor((yr - Math.floor(yr)) * 12);
	let missingAnimalAge = '';
	if (yr >= 1) {
		missingAnimalAge = Math.floor(yr) + '살' + (month > 0 ? ' ' + month + '개월' : '');
	} else {
		missingAnimalAge = month + '개월';
	}
	return missingAnimalAge;
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
	let newText = data.missing_animal_date;
	let splitedNewText = newText.split('-');
	let animalSex = '';
	let newYearText = splitedNewText[0] + '년 ';
	let newDayText = splitedNewText[1] + '월 ' + splitedNewText[2].toString().substring(0, 2) + '일';
	if (data.missing_animal_sex == 'male') {
		animalSex = '/ 남';
	} else if (data.missing_animal_sex == 'female') {
		animalSex = '/ 여';
	} else {
		animalSex = '';
	}
	if (!feed_medias) return false;
	else {
		return (
			<View>
				<Text style={[missingAnimalDetail.missingText38, {alignSelf: 'center'}]}>
					{data.missing_animal_species} / {data.missing_animal_species_detail} / {getAge(data.missing_animal_age)} {animalSex}
				</Text>
				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<Text style={missingAnimalDetail.missingBlackText32}>{newYearText}</Text>
					<Text style={missingAnimalDetail.missingRedText32}>{newDayText} </Text>
					<Text style={missingAnimalDetail.missingBlackText32}>실종</Text>
				</View>
				{feed_medias.length > 1 ? (
					<View style={missingAnimalDetail.picture}>
						<FastImage source={{uri: data.feed_medias[0].media_uri}} style={[missingAnimalDetail.img_squre_284]} />
						<FastImage source={{uri: data.feed_medias[1].media_uri}} style={[missingAnimalDetail.img_squre_284]} />
					</View>
				) : (
					<View style={missingAnimalDetail.picture}>
						<FastImage source={{uri: data.feed_medias[0].media_uri}} style={[missingAnimalDetail.img_squre_284]} />
					</View>
				)}
			</View>
		);
	}
};

const style = StyleSheet.create({
	wrp_main: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: '#FFF',
	},
	container: {
		alignItems: 'center',
	},
	feedContent: {
		width: 694 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	basic_separator: {
		width: 694 * DP,
		height: 60 * DP,
		// backgroundColor: '#fff',
	},
	separator: {
		width: 694 * DP,
		height: 2 * DP,
		backgroundColor: GRAY40,
		marginTop: 30 * DP,
	},
});

const missingAnimalDetail = StyleSheet.create({
	container: {},
	insideContainer: {
		width: 750 * DP,
		alignItems: 'center',
	},
	poster: {
		width: 618 * DP,
		// height: 872 * DP,
		marginVertical: 20 * DP,
		paddingVertical: 10 * DP,
		backgroundColor: '#FFFFFF',
		// backgroundColor: 'lightblue',
		...Platform.select({
			ios: {
				borderColor: 'black',
				shadowColor: '#4F4F4F',
				shadowOffset: {
					width: 4,
					hegiht: 6,
				},
				shadowOpacity: 0.25,
				// shadowRadius: 2.62,
			},
			android: {
				elevation: 4,
			},
		}),
		alignItems: 'center',
	},
	feedContent: {
		marginTop: 40 * DP,
	},
	horizontal_separator: {
		width: '95%',
		marginVertical: 30 * DP,
		backgroundColor: GRAY30,
		height: 2,
	},
	title: {
		width: 578 * DP,
		height: 112 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF0000',
		borderRadius: 10,
		marginTop: 10 * DP,
	},
	titleText: {
		fontSize: 62 * DP,
		fontWeight: 'bold',
		color: 'white',
	},
	picture: {
		marginTop: 10 * DP,
		width: 578 * DP,
		height: 284 * DP,
		// backgroundColor: 'yellow',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	img_squre_284: {
		width: 284 * DP,
		height: 284 * DP,
		backgroundColor: '#B0C7D8',
	},
	textBox: {
		marginTop: 10 * DP,
		height: 200 * DP, //유동적인 텍스트 크기에 대해서 좌우 간격이 좁아짐에 따라 늘어나는 height에 관한 처리 필요
		width: 578 * DP,
		alignItems: 'center',
	},
	phoneNumberBox: {
		width: 578 * DP,
		height: 106 * DP,
		backgroundColor: '#FF0000',
		alignItems: 'center',
	},
	missingTextWhite18: {
		marginTop: 8 * DP,
		fontSize: 18 * DP,
		color: 'white',
	},
	missingText18: {
		fontSize: 18 * DP,
		color: '#191919',
	},
	missingText38: {
		fontSize: 38 * DP,
		fontWeight: 'bold',
		color: '#FF0000',
		marginTop: 10 * DP,
	},
	missingBlackText32: {
		fontSize: 32 * DP,
		fontWeight: 'bold',
		color: '#191919',
	},
	missingRedText32: {
		fontSize: 32 * DP,
		fontWeight: 'bold',
		color: '#FF0000',
	},
	missingText26: {
		fontSize: 26 * DP,
		fontWeight: 'bold',
		color: '#191919',
	},
	missingText22: {
		paddingTop: 10 * DP,
		fontSize: 22 * DP,
		color: '#191919',
	},
	missingTextYellow50: {
		fontSize: 50 * DP,
		color: '#FFEE00',
		fontWeight: 'bold',
		fontFamily: 'Roboto',
	},
	yellowNumberBox: {
		height: 62 * DP,
		width: 452 * DP,
		marginBottom: 8 * DP,
		alignItems: 'center',
	},
	oneLine: {
		borderBottomColor: 'black',
		borderBottomWidth: 2 * DP,
		width: 578 * DP,
		marginTop: 10 * DP,
		color: '#191919',
	},
	floatingBtnMissingReport: {
		width: 118 * DP,
		height: 110 * DP,
		borderRadius: 45 * DP,
		borderColor: '#FF0000',
		borderWidth: 2,
		// marginBottom: 20 * DP,
		// marginRight: 12 * DP,
		alignItems: 'center',
		bottom: 20 * DP,
		right: 12 * DP,
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		opacity: 0.8,
	},

	commentList: {},
});
