import React from 'react';
import {Text, TouchableOpacity, View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10, GRAY30, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Arrow_Down_APRI10, Camera54, Location54_APRI10, Paw54_Border,Location54} from 'Root/component/atom/icon/index';
import {Urgent_Write1, Urgent_Write2} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import {btn_w194} from 'Atom/btn/btn_style';
import {PUBLIC_SETTING} from 'Root/i18n/msg';
import Modal from 'Component/modal/Modal';
import userGlobalObj from 'Root/config/userGlobalObject';
import HashInput from 'Molecules/input/HashInput';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import {FlatList} from 'react-native-gesture-handler';
import userGlobalObject from 'Root/config/userGlobalObject';
import MissingForm from 'Templete/feed/MissingForm';
import ReportForm from 'Templete/feed/ReportForm';
import RadioBox from 'Root/component/molecules/select/RadioBox';
import RadioBoxItem from 'Molecules/select/RadioBoxItem';
import RadioBoxGroup from 'Molecules/select/RadioBoxGroup';
import CheckBox from 'Root/component/molecules/select/CheckBox';

export default FeedWrite = props => {
	const [showPetAccountList, setShowPetAccountList] = React.useState(false); //PetAccount 계정
	const [showUrgentBtns, setShowUrgentBtns] = React.useState(true); //긴급버튼목록
	const [showLostAnimalForm, setShowLostAnimalForm] = React.useState(false); //실종버튼
	const [showReportForm, setShowRepotForm] = React.useState(false); //제보버튼
	const [showActionButton, setShowActionButton] = React.useState(false); // 긴급게시(하얀버전) 클릭 시 - 실종/제보 버튼 출력 Boolean
	const [isDiary, setDiary] = React.useState(props.route.params.feed_is_protect_diary); //임보일기여부
	const [feedText, setFeedText] = React.useState(
		props.route.params.feed_content ? props.route.params.feed_content.replace(/(&@|&#){2}(.*?)%&%.*?(&@|&#){2}/gm, '$2') : '',
	); //피드 TextInput Value
	const [selectedImg, setSelectedImg] = React.useState([]); //사진 uri리스트
	const [previousPhotoList, setPreviousPhotoList] = React.useState([]);
	const [photoToDelete, setPhotoToDelete] = React.useState([]); // 삭제된 사진 인덱스 리스트
	const [isSearchTag, setSearchTag] = React.useState(false);
	const [publicSetting, setPublicSetting] = React.useState('전체 공개'); //공개 여부

	const keyboardArea = useKeyboardBottom(0 * DP);
	const scrollref = React.useRef();
	const scrolloffset = React.useRef(0);
	const lastTouchY = React.useRef(0);
	const container = React.useRef();
	const [editText, setEditText] = React.useState(
		props.route.params.feed_content ? props.route.params.feed_content.replace(/(&@|&#){2}(.*?)%&%.*?(&@|&#){2}/gm, '$2') : '',
	);

	React.useEffect(() => {
		console.log('정보 변경',props.route);
		if (props.route.name != 'FeedEdit') {
			const param = props.route.params;
			console.log('param', param);
			// console.log('param.feed_avatar_id', param.feed_avatar_id);
			param.feed_avatar_id //피드 글쓰기 클릭시 즉시 작성자 아바타 계정을 선택하는 절차가 추가됨에 따라 분기처리가 필요해짐
				? // - 유저 계정에서 피드글쓰기를 누른 경우
				  props.navigation.setParams({
						...props.route.params,
						media_uri: selectedImg,
						feed_medias: selectedImg.map(v => (v?{media_uri: v.cropUri??v.uri, is_video: false, duration: 0, tags: []}:false)),
						feed_avatar_id: param.feed_avatar_id._id
							? param.feed_avatar_id._id
							: param.feed_avatar_id
							? param.feed_avatar_id
							: userGlobalObject.userInfo._id,
				  })
				: // - 보호소 계정에서 피드 글쓰기를 누른 경우
				  props.navigation.setParams({
						...props.route.params,
						media_uri: selectedImg.map(v=>v.cropUri??v.uri),
						feed_medias: selectedImg.map(v => ({media_uri: v.cropUri??v.uri, is_video: false, duration: 0, tags: []})),
						// feed_avatar_id: props.route.params.feed_avatar_id ? props.route.params.feed_avatar_id?._id : userGlobalObject.userInfo._id,
				  });
		} else {
			props.navigation.setParams({
				...props.route.params,
				media_uri: selectedImg.filter(v => !v.uri.includes('http')),
				feed_medias: selectedImg.map(img => {
					let uri = img.cropUri??img.uri
					let media = props.route.params.feed_medias.find(v => v.media_uri == uri);
					return {media_uri: uri, is_video: false, duration: 0, tags: media ? media.tags : []};
				}),
				photoToDelete: photoToDelete,
			});
			// console.log('첨부 이미지 변화', selectedImg);
		}
	}, [selectedImg]); //네비게이션 파라메터에 이미지 리스트를 넣음(헤더에서 처리하도록)

	React.useEffect(() => {
		if (props.route.name == 'FeedEdit') {
			// console.log('feedEdit 진입', props.route.params);
			if (props.route.params?.feed_type == 'missing') {
				onPressMissingWrite();
			}
			if (props.route.params?.feed_type == 'report') {
				onPressReportWrite();
			}
			setSelectedImg(props.route.params.feed_medias.map(v =>({uri:v.media_uri})));
			setPreviousPhotoList(props.route.params.feed_medias.map(v => ({uri:v.media_uri})));
			let regEx = new RegExp(`&#&#(.*?)%&%&`, `gm`);
			let hashes = [];
			let match = [];
			while ((match = regEx.exec(props.route.params.feed_content)) !== null) {
				hashes.push(match[1]);
			}
			props.navigation.setParams({...props.route.params, hashtag_keyword: hashes});
		}
		if (props.route.params?.feedType == 'Feed') {
			//피드 글쓰기 클릭하면 즉시 작성자 아바타 계정을 선택하는 절차가 추가됨에 따라 분기처리가 필요해짐
			props.route.params.feed_avatar_id
				? props.navigation.setOptions({title: props.route.params.feed_avatar_id.user_nickname})
				: props.navigation.setOptions({title: userGlobalObj.userInfo?.user_nickname});
			props.navigation.setParams({...props.route.params, feedType: 'Feed'});
			// props.navigation.setOptions({title: userGlobalObj.userInfo?.user_nickname});
			// props.navigation.setOptions({title: props.route.params.feed_avatar_id.user_nickname});
		}
		if (props.route.params?.feedType == 'Missing') {
			onPressMissingWrite();
		}
		if (props.route.params?.feedType == 'Report') {
			onPressReportWrite();
		}
	}, []); //처음 로딩시 유저 닉네임 표시

	//긴급 게시 버튼 관련 분기 처리
	React.useEffect(() => {
		// 실종버튼, 제보버튼, pet목록이 작동 중이지 않을 때는 긴급버튼목록이 출력
		showLostAnimalForm || showReportForm || showPetAccountList ? setShowUrgentBtns(false) : setShowUrgentBtns(true);
	}, [showLostAnimalForm, showReportForm]);

	React.useEffect(() => {
		props.navigation.setParams({...props.route.params, feed_content: feedText});
	}, [feedText]);

	const param = props.route.params;

	//위치추가 결과
	React.useEffect(() => {
		if (param?.feed_location) {
			// console.log('param', JSON.stringify(param));
			const location = param.feed_location;
			console.log('address', location);
		}

	}, [props.route.params?.feed_location]);

	React.useEffect(()=>{
		if(props.route.params.selectedPhoto&&props.route.params.selectedPhoto.length>0){
			if(props.route.name=='FeedWrite'){
				setSelectedImg(props.route.params.selectedPhoto);
			}
			if(props.route.name=='FeedEdit'){
				console.log('이미지 추가',selectedImg);
				setSelectedImg(
					selectedImg.map(v=>({uri:v.uri})).concat(props.route.params.selectedPhoto)
				);
			}
			// setSelectedImg(props.route.params.selectedPhoto);
		}
	},[props.route.params?.selectedPhoto]);

	const onPressMissingWrite = () => {
		setShowLostAnimalForm(true);
		props.navigation.setParams({...props.route.params, feedType: 'Missing'});
		props.navigation.setOptions({title: '실종 게시물'});
	};

	//긴급버튼 중 - 제보 클릭
	const onPressReportWrite = () => {
		setShowRepotForm(true);
		props.navigation.setParams({...props.route.params, feedType: 'Report'});
		props.navigation.setOptions({title: '제보 게시물'});
	};

	//사진 추가
	const moveToMultiPhotoSelect = () => {
		if (selectedImg.length > 4) {
			Modal.alert('첨부파일은 5개까지만 가능합니다');
			return;
		}
		props.navigation.push("MultiPhotoSelect",{prev:{name:props.route.name,key:props.route.key},selectedPhoto:selectedImg});
	};

	//사진 삭제
	const deletePhoto = index => {
		setSelectedImg(selectedImg.filter((v, i) => i != index));
		const findIndex = previousPhotoList.findIndex(e => e.uri == selectedImg[index].uri);
		console.log('findIndex', findIndex);
		let temp = [...photoToDelete];
		temp.push(findIndex);
		setPhotoToDelete(temp);
	};

	const onMissingForm = missing => {
		props.navigation.setParams({...props.route.params, ...missing});
	};

	const onReportForm = report => {
		props.navigation.setParams({...props.route.params, ...report});
	};

	const onSetDiary = () => {
		let diary = false;
		if (isDiary) {
			setDiary(false);
			diary = false;
		} else {
			setDiary(true);
			diary = true;
		}
		props.navigation.setParams({...props.route.params, feed_is_protect_diary: diary});
	};

	//위치추가
	const moveToLocationPicker = () => {
		console.log('route name', props.route.name);
		// props.navigation.push('FeedSearchMap', {routeName: props.route.name});
		props.navigation.push('FeedLocationPicker', {routeName: props.route.name});
	};

	//태그 추가
	const moveToFeedMediaTagEdit = () => {
		props.navigation.push('FeedMediaTagEdit');
	};
	const inputFeedTxt = (feedInput, hashtag_keyword) => {
		props.navigation.setParams({...props.route.params, feed_content: feedText, hashtag_keyword: hashtag_keyword, isEdit: true});
		setFeedText(feedInput);
	};

	//긴급 버튼 - '제보' '실종' 중 하나 클릭 시 변동되는 View 분기 처리
	const setUrgBtnsClickedView = () => {
		//긴급 버튼 중 '제보' 클릭한 경우
		if (showReportForm) {
			return (
				<ReportForm
					onDataChange={onReportForm}
					data={props.route.params}
					routeName={props.route.name}
					container={container}
					scrollref={scrollref}
					currentScrollOffset={scrolloffset.current}
				/>
			);
		} // 긴급 게시 버튼 중 '실종' 클릭한 경우
		else
			return showLostAnimalForm ? (
				<MissingForm
					onDataChange={onMissingForm}
					data={props.route.params}
					routeName={props.route.name}
					container={container}
					scrollref={scrollref}
					currentScrollOffset={scrolloffset.current}
				/>
			) : (
				false
			);
	};

	//태그 검색중 리스트 외의 다른화면 가리기
	const onFindTag = isFind => {
		setSearchTag(isFind);
	};

	const onPressPublicSetting = () => {
		Modal.popSelectScrollBoxModal([PUBLIC_SETTING], '취소', selectedItem => {
			setPublicSetting(selectedItem);
			Modal.close();
		});
	};

	const onPressIn = e => {
		console.log('pressIn', e.nativeEvent);
		// lastTouchY.current=e.pageY;
		scrollref.current.scrollToOffset({offset: e.nativeEvent.pageY});
		// scrollref.current.scrollToEnd()
	};

	const setWriteModeState = () => {
		return (
			<>
				{/* 사진추가 / 위치추가 / 태그하기 */}
				<View style={[feedWrite.buttonContainer]}>
					<TouchableWithoutFeedback onPress={moveToMultiPhotoSelect}>
						<View style={[feedWrite.btnItemContainer, {marginBottom: 5 * DP}]}>
							<Camera54/>
							<Text style={[txt.noto28b, {color: BLACK, marginLeft: 12 * DP}]}>사진추가</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={!showReportForm && !showLostAnimalForm ? moveToLocationPicker : () => {}}>
						<View style={[feedWrite.btnItemContainer]}>
							{!showReportForm && !showLostAnimalForm ? (
								<>
									<Location54 fill='black'/>
									<Text style={[txt.noto28b, {color: BLACK, alignSelf: 'center', marginLeft: 10 * DP}]}>위치추가</Text>
								</>
							) : (
								<>
									{/* <Location54_GRAY30 />
									<Text style={[txt.noto24, {color: GRAY30, alignSelf: 'center', marginLeft: 10 * DP}]}>위치추가</Text> */}
								</>
							)}
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={!showReportForm && !showLostAnimalForm ? moveToFeedMediaTagEdit : () => {}}>
						<View style={[feedWrite.btnItemContainer]}>
							{!showReportForm && !showLostAnimalForm ? (
								<>
									<Paw54_Border fill='black'/>
									<Text style={[txt.noto28b, {color: BLACK, alignSelf: 'center', marginLeft: 10 * DP}]}>태그하기</Text>
								</>
							) : (
								<View style={[{width: 200 * DP}]}>
									{/* <Paw54_Gray />
									<Text style={[txt.noto24, {color: GRAY30, alignSelf: 'center', marginLeft: 10 * DP}]}>태그하기</Text> */}
								</View>
							)}
						</View>
					</TouchableWithoutFeedback>
				</View>
				{!showReportForm && !showLostAnimalForm && (
					<View style={[feedWrite.btn_w194_container]}>
						<View style={[btn_style.btn_w194, feedWrite.btn_w194]}>
							<AniButton
								btnTitle={'임보일기'}
								btnStyle={isDiary ? 'filled' : 'border'}
								titleFontStyle={24}
								btnLayout={btn_w194}
								onPress={onSetDiary}
							/>
						</View>
						{/* 기능 개발되면 다시 열릴 공개 설정 버튼 */}
						{/* <TouchableOpacity onPress={onPressPublicSetting} style={[feedWrite.public_setting_btn]}> */}
						{/* <ActionButton btnTitle={'전체 공개'} onOpen={() => alert('dd')} btnStyle={'border'} titleFontStyle={24} btnLayout={btn_w194} /> */}
						{/* <Text style={[txt.noto24, {color: APRI10}]}>{publicSetting}</Text> */}
						{/* <Arrow_Down_APRI10 /> */}
						{/* </TouchableOpacity> */}
					</View>
				)}
				{/* {selectedImg.length > 0 && (
					<View style={[temp_style.selectedMediaList, feedWrite.selectedMediaList]}>
						<SelectedMediaList items={selectedImg} onDelete={deletePhoto} />
					</View>
				)} */}
				{/* 긴급 게시 관련 버튼 클릭 시 출력되는 View */}
				{setUrgBtnsClickedView()}
			</>
		);
	};
	const test = () => {
		console.log(props.route);
	};

	const getCurrentScrollOffset = e => {
		scrolloffset.current = e.nativeEvent.contentOffset.y;
	};

	return (
		<View style={{flex: 1, backgroundColor: '#FFF'}}>
			{/* <TouchableWithoutFeedback onPress={test}>
				<View style={{backgroundColor: 'red', width: 50, height: 50}}></View>
			</TouchableWithoutFeedback> */}
			<FlatList
				renderItem={({item, index}) => {
					return (
						<View contentContainerStyle={[login_style.wrp_main]} ref={container}>
							<View style={{flexDirection:'row',backgroundColor:'yellow'}}>
								<CheckBox txtSize={28} value='임보일기'></CheckBox>
								
								<RadioBoxGroup style={{width:474*DP,flexDirection:'row',justifyContent:'space-between'}} onSelect={(item,index)=>console.log(item,index)}>
									<RadioBoxItem>전체공개</RadioBoxItem>
									<RadioBoxItem>비공개</RadioBoxItem>
									<RadioBoxItem style={{backgroundColor:'blue'}}>팔로워공개</RadioBoxItem>
								</RadioBoxGroup>
								{/* <View style={{width:474*DP,backgroundColor:'red'}}>
									<RadioBoxItem items={['전체공개','비공개','팔로워공개']} width={160*DP}/>
								</View> */}
							</View>
							<HashInput
								containerStyle={[temp_style.feedTextEdit, {minHeight: showLostAnimalForm || showReportForm ? 214 * DP : 316 * DP}]}
								textAlignVertical={'top'}
								multiline={true}
								placeholder="게시물을 작성하세요 (150자)"
								onChangeText={inputFeedTxt}
								// onChangeText={inputMissingTxt}
								maxLength={150}
								onFind={onFindTag}
								selectedImg={selectedImg.map(v=>v?v.cropUri??v.uri:undefined)}
								onDelete={deletePhoto}
								value={editText}
								// value={feedText}
								location={!showReportForm && !showLostAnimalForm ? param.feed_location : undefined}
							/>
							{!isSearchTag && setWriteModeState()}
						</View>
					);
				}}
				data={[{}]}
				keyboardShouldPersistTaps={'handled'}
				ref={scrollref}
				onScroll={getCurrentScrollOffset}></FlatList>
			{showUrgentBtns && !isSearchTag ? (
				<View style={[temp_style.floatingBtn, feedWrite.urgentBtnContainer]}>
					{showActionButton ? (
						<View>
							<TouchableWithoutFeedback onPress={onPressMissingWrite}>
								<View style={[feedWrite.urgentBtnItemContainer, buttonstyle.shadow]}>
									<Text style={[txt.noto32, {color: WHITE}]}>실종</Text>
								</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback onPress={onPressReportWrite}>
								<View style={[feedWrite.urgentBtnItemContainer, buttonstyle.shadow]}>
									<Text style={[txt.noto32, {color: WHITE}]}>제보</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					) : (
						false
					)}
					{props.route.name == 'FeedEdit' ? (
						<></>
					) : (
						<TouchableWithoutFeedback onPress={() => setShowActionButton(!showActionButton)}>
							<View style={[feedWrite.urgentActionButton]}>{showActionButton ? <Urgent_Write2 /> : <Urgent_Write1 />}</View>
						</TouchableWithoutFeedback>
					)}
				</View>
			) : (
				false
			)}
		</View>
	);
};

export const feedWrite = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		paddingHorizontal: 28 * DP,
		height: 54 * DP,
		marginTop: 40 * DP,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	btnItemContainer: {
		width:182*DP,
		height:54*DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn_w194_container: {
		paddingHorizontal: 48 * DP,
		marginTop: 40 * DP,
		flexDirection: 'row',
	},
	btn_w194: {
		marginRight: 266 * DP,
	},
	urgentBtnContainer: {
		width: 158 * DP,
		// width: 110 * DP,
		height: 332 * DP,
		// height: 110 * DP,
		position: 'absolute',
		right: 30 * DP,
		bottom: 40 * DP,
		justifyContent: 'flex-end',
	},
	urgentActionButton: {
		width: 110 * DP,
		height: 110 * DP,
		alignSelf: 'flex-end',
		// backgroundColor: 'white',
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		borderRadius: 40 * DP,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 2 * DP,
		// 	height: 1 * DP,
		// },
		// elevation: 1,
	},
	urgentBtnItemContainer: {
		width: 158 * DP,
		height: 90 * DP,
		borderRadius: 40 * DP,
		marginBottom: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
	},
});


export const btn_style = StyleSheet.create({
	btn_w194: {
		width: 194 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const login_style = StyleSheet.create({
	wrp_main: {
		// flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: '#FFF',
	},
});

export const temp_style = StyleSheet.create({
	floatingBtn: {
		flexDirection: 'column',

		width: 110 * DP,
		height: 110 * DP,
	},
	feedTextEdit: {
		width: 694 * DP,
		minHeight: 376 * DP,
		marginTop: 40 * DP,
		backgroundColor: '#FAFAFA',
		alignSelf: 'center',
		// borderWidth: 2 * DP,
		// borderColor: APRI10,
		borderRadius: 24 * DP,
		padding: 24 * DP,
	},
});

export const buttonstyle = StyleSheet.create({
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		elevation: 4,
	},
});