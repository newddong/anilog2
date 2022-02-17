import React, {useEffect, useRef} from 'react';
import {LogBox, ScrollView, Image, ActivityIndicator, TouchableOpacity, FlatList, TouchableWithoutFeedback} from 'react-native';
import {Text, View} from 'react-native';
import {login_style, reportDetail, temp_style, missingAnimalDetail} from 'Templete/style_templete';
import FeedContent from 'Organism/feed/FeedContent';
import {useNavigation} from '@react-navigation/core';
// import {_dummy_MissingReportDetail} from 'Root/config/dummy_data_hjs';
import {_dummy_ReportDetail} from 'Root/config/dummy_data_hjs';
import {dummy_CommentObject} from 'Root/config/dummyDate_json';
import {getFeedDetailById} from 'Root/api/feedapi';
import {getCommentListByFeedId, createComment} from 'Root/api/commentapi';
import moment from 'moment';
import {create} from 'react-test-renderer';
import {launchImageLibrary} from 'react-native-image-picker';
import {txt} from 'Root/config/textstyle';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Modal from 'Root/component/modal/Modal';
import MissingReportInfo from 'Organism/info/MissingReportInfo';
import {PosterSave} from 'Component/atom/icon';

export default MissingAnimalDetail = props => {
	const navigation = useNavigation();
	React.useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, []);

	const [photo, setPhoto] = React.useState(props.route.params != null ? props.route.params : []); //PhotoSelect에서 사진 선택이 됐을 경우 photo에 담김
	const [editComment, setEditComment] = React.useState(false); //답글 작성란 View 보이기 T/F
	const [privateComment, setPrivateComment] = React.useState(false); // 공개 설정 클릭 state
	const [replyText, setReplyText] = React.useState(); //댓글 텍스트 state
	const [showMore, setShowMore] = React.useState(false); //더보기 클릭 State
	const [commentDataList, setCommentDataList] = React.useState(); //더보기 클릭 State
	const [writeCommentData, setWriteCommentData] = React.useState(); //더보기 클릭 State
	const [replyPressed, setReplyPressed] = React.useState(false);
	const debug = true;
	const [loading, setLoading] = React.useState(true); //로딩상태
	const [animalSpecies, setAnimalSpecies] = React.useState(''); //포스터 타이틀 동물 종류
	const viewShotRef = useRef();
	React.useEffect(() => {
		setPhoto(props.route.params);
	}, [props.route.params]);

	React.useEffect(() => {
		navigation.addListener('blur', () => {
			setPhoto([]);
		});
	});

	//api 실제 작업 후 하단에 있는 data로 변경 예정 (현재는 에러 방지 코드)
	const [data, setData] = React.useState({});

	// 제보 데이터 불러오기 (아직 API 미작업 )
	React.useEffect(() => {
		console.log(' - MissingAnimalDetail -');
		getFeedDetailById(
			{
				feedobject_id: props.route.params._id,
			},
			data => {
				debug && console.log(`MissingAnimalDetail data:${JSON.stringify(data.msg)}`);
				setData(data.msg);
			},
			errcallback => {
				console.log(`errcallback:${JSON.stringify(errcallback)}`);
			},
		);
	}, []);

	//댓글 불러오기 (상단의 useEffect와 합칠지는 추후 결정)
	React.useEffect(() => {
		console.log(' - MissingAnimalDetail Comment -');
		getCommnetList();
		setLoading(false);

	}, []);

	// React.useEffect(() => {
	// 	console.log('WriteCommnetData changed', writeCommentData);
	// }, [writeCommentData]);

	React.useEffect(() => {
		if (replyPressed == true) {
			createComment(
				{...writeCommentData},

				callback => {
					// console.log('write commnet success', callback);
					getCommnetList();
				},
				err => {
					console.log('write comment error', err);
				},
			);
			// setWriteCommentData();
			delete writeCommentData.comment_photo_uri;
			onDeleteImage();
			setEditComment(!editComment);
			setReplyPressed(false);
		}
	}, [replyPressed]);

	const getCommnetList = () => {
		getCommentListByFeedId(
			{
				feedobject_id: props.route.params._id,
				// commentobject_id: '61c2c0de7be07611b0094ffd',
				request_number: 10,
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
				setCommentDataList(commentArray);
			},
			errcallback => {
				console.log(`Comment errcallback:${JSON.stringify(errcallback)}`);
			},
		);
	};

	//답글 쓰기 => Input 작성 후 보내기 클릭 콜백 함수
	const onWrite = () => {
		debug && console.log('onWrite', replyText);
		debug && console.log('writeCommentData=>' + writeCommentData.comment_contentsdsf);
		// setWriteCommentData({...writeCommentData, comment_contents: replyText, comment_is_secure: privateComment, comment_feed_id: ''});
		setWriteCommentData({...writeCommentData, comment_contents: replyText, comment_is_secure: privateComment});
		console.log('wirteCommentData', writeCommentData);
		setReplyPressed(true);
	};

	// 답글 쓰기 -> 자물쇠버튼 클릭 콜백함수
	const onLockBtnClick = () => {
		setPrivateComment(!privateComment);
		!privateComment ? alert('비밀댓글로 설정되었습니다.') : alert('댓글이 공개설정되었습니다.');
	};

	// 답글 쓰기 -> 이미지버튼 클릭 콜백함수
	const onAddPhoto = () => {
		// navigation.push('SinglePhotoSelect', props.route.name);
		launchImageLibrary(
			{
				mediaType: 'photo',
				selectionLimit: 1,
			},
			responseObject => {
				console.log('선택됨', responseObject);
				setPhoto(responseObject.assets[responseObject.assets.length - 1].uri);
				setWriteCommentData({...writeCommentData, comment_photo_uri: responseObject.assets[responseObject.assets.length - 1].uri});
			},
		);
	};

	// 답글 쓰기 -> Input value 변경 콜백함수
	const onChangeReplyInput = text => {
		setReplyText(text);
		console.log(replyText);
	};

	// 답글 쓰기 텍스트 버튼 클릭 콜백함수
	const onReplyBtnClick = parent_id => {
		setEditComment(!editComment);
		console.log('onReplayBtnClick', parent_id);
		setWriteCommentData({...writeCommentData, commentobject_id: parent_id, feedobject_id: props.route.params._id});
	};

	// 자식 답글에서 답글쓰기 버튼 클릭 콜백함수
	const onChildReplyBtnClick = comment => {
		setEditComment(!editComment);
	};

	// 답글 이미지 등록 후 지우기 버튼 클릭 콜백함수
	const onDeleteImage = () => {
		setPhoto([]);
	};

	//더보기 클릭
	const onPressShowMore = () => {
		setShowMore(!showMore);
	};
	// 01010041004 -> 010-1004-1004 포맷 정규식 함수
	const phoneFomatter = num => {
		var formatNum = '';
		if(!num)return;
		if (num.length == 11) {
			formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		} else if (num.length == 8) {
			formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
		} else {
			if (num.indexOf('02') == 0) {
				formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
			} else {
				formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			}
		}
		console.log(formatNum, 'formatNum');
		return formatNum;
	};
	async function captureScreenShot() {
		try {
			const imageURI = await viewShotRef.current.capture();
			if (Platform.OS === 'android') {
				const granted = await getPermissionAndroid();
				if (!granted) {
					return;
				}
			}
			const image = CameraRoll.save(imageURI, 'photo');
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
	//-------------------- 강아지를 찾습니다 컴포넌트 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
	// 포스터 동물 사진2개 View 컴포넌트
	const MissingAnimalPicture = () => {
		console.log('data.feed_media length', data.feed_medias);
		if (data.feed_medias.length < 2) {
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
	//포스터 동물 정보 View 컴포넌트
	const MissingAnimalText = () => {
		var newText = data.missing_animal_date;
		var splitedNewText = newText.split('-');
		var animalSex = '';
		console.log('newDateDate', newText.split('-'));
		var newYearText = splitedNewText[0] + '년 ';
		var newDayText = splitedNewText[1] + '월 ' + '월 ' + splitedNewText[2].toString().substring(0, 2) + '일';
		var splitAddress = data.missing_animal_lost_location.split('"');
		var newMissingAddress = splitAddress[3] + ' ' + splitAddress[7] + ' ' + splitAddress[11];

		if (data.missing_animal_sex == 'male') {
			animalSex = '/ 남';
		} else if (data.missing_animal_sex == 'female') {
			animalSex = '/ 여';
		} else {
			animalSex = '';
		}

		console.log('missing_animal_lost_location', data.missing_animal_lost_location.split('"'));
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
	const MissingAnimalPhone = () => {
		var phoneNumber = phoneFomatter(data.missing_animal_contact);
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
	// 포스터 제목 컴포넌트
	const MissingAnimalTitle = () => {
		useEffect(() => {
			switch (data.missing_animal_species) {
				case '개':
					setAnimalSpecies('강아지를');
					break;
				case '고양이':
					setAnimalSpecies('고양이를');
					break;
				case '기타 포유류':
					setAnimalSpecies('반려동물을');
					break;
				case '조류':
					setAnimalSpecies(data.missing_animal_species_detail.toString() + '를');
					break;
				case '수중생물':
					setAnimalSpecies('물고기를');
					break;
				case '기타':
					setAnimalSpecies(data.missing_animal_species_detail.toString() + '를');
					break;
				default:
					setAnimalSpecies('반려동물을');
					break;
			}
		}, []);

		return <Text style={missingAnimalDetail.titleText}>{animalSpecies} 찾습니다</Text>;
	};
	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	}

	const moveToCommentList = () => {
		let feedobject = {};
		feedobject._id = props.route.params._id;
		navigation.push('FeedCommentList', {feedobject: data, showAllContents: true});
	};

	return (
		<View style={[reportDetail.wrp_main]}>
			<FlatList
				contentContainerStyle={[reportDetail.container]}
				data={[{}]}
				ListHeaderComponent={
					<View style={{alignItems: 'center'}}>
						<View>
							<ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 1.0}}>
								<View style={[missingAnimalDetail.poster]}>
									<View style={missingAnimalDetail.title}>
										<MissingAnimalTitle />
									</View>
									{/* <Image
								source={{
									uri: data.feed_thumbnail,
								}}
								style={[temp_style.img_square_750]}
							/> */}
									<MissingAnimalPicture />
									<MissingAnimalText />
									<MissingAnimalPhone />
									<Text style={missingAnimalDetail.missingText18}>반려동물 커뮤니티 애니로그</Text>
								</View>
							</ViewShot>
							{/* <TouchableWithoutFeedback onPress={captureScreenShot}> */}
							<TouchableWithoutFeedback onPress={captureScreenShot}>
								<View style={missingAnimalDetail.floatingBtnMissingReport}>
									<PosterSave />
									<Text style={[txt.noto20, {color: 'red'}, {fontWeight: 'bold'}]}>전단지 저장</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>

						<View style={[temp_style.feedContent]}>
							{/* <MissingReportInfo data={data} /> */}
							{/* DB에서 가져오는 제보 피드글 데이터를 FeedContent에 넘겨준다. */}
							<FeedContent data={data} />
						</View>
						<View style={[reportDetail.allCommentCount]}>
							<TouchableOpacity onPress={moveToCommentList}>
								<Text style={[txt.noto24]}>댓글 쓰기</Text>
							</TouchableOpacity>
						</View>
						<View style={[reportDetail.basic_separator]}>
							<View style={[reportDetail.separator]}></View>
						</View>
					</View>
				}
				renderItem={({item, index}) => (
					// <View style={[reportDetail.commentList]}>
					<CommentList
						items={commentDataList}
						onPressReplyBtn={onReplyBtnClick}
						onPress_ChildComment_ReplyBtn={comment => onChildReplyBtnClick(comment)}
					/>
					// </View>
				)}
			/>
			<View>
				{editComment ? (
					<ReplyWriteBox
						onAddPhoto={onAddPhoto}
						onChangeReplyInput={text => onChangeReplyInput(text)}
						onLockBtnClick={onLockBtnClick}
						onWrite={onWrite}
						privateComment={privateComment}
						// isPhotoAdded={isPhotoAdded}
						photo={photo}
						onDeleteImage={onDeleteImage}
					/>
				) : null}
			</View>
		</View>
	);
};
