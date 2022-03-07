import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TouchableWithoutFeedback, TextInput, Platform, Keyboard} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Arrow_Down_APRI10, Camera54, Location54_APRI10, Paw54_Border} from 'Root/component/atom/icon/index';
import {Urgent_Write1, Urgent_Write2} from 'Atom/icon';
import {btn_style, feedWrite, login_style, temp_style, buttonstyle} from 'Templete/style_templete';
import AniButton from 'Molecules/button/AniButton';
import {btn_w176, btn_w194} from 'Atom/btn/btn_style';
import ActionButton from 'Molecules/button/ActionButton';
import SelectedMediaList from 'Organism/list/SelectedMediaList';
import {DOG_KIND, PET_KIND, pet_kind, PUBLIC_SETTING} from 'Root/i18n/msg';
import DatePicker from 'Molecules/select/DatePicker';
import TabSelectFilled_Type1 from 'Molecules/tab/TabSelectFilled_Type1';
import Input24 from 'Molecules/input/Input24';
import InputBalloon from 'Molecules/input/InputBalloon';
import LocationButton from 'Molecules/button/LocationButton';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'Component/modal/Modal';
import userGlobalObj from 'Root/config/userGlobalObject';
import NormalDropDown from 'Molecules/dropdown/NormalDropDown';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getPettypes} from 'Root/api/userapi';
import ImagePicker from 'react-native-image-crop-picker';
import HashInput from 'Molecules/input/HashInput';
import {getAddressList} from 'Root/api/address';
import SelectInput from 'Molecules/button/SelectInput';
import {useKeyboardBottom} from 'Molecules/input/usekeyboardbottom';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';

export default FeedWrite = props => {
	const [showPetAccountList, setShowPetAccountList] = React.useState(false); //PetAccount 계정
	const [showUrgentBtns, setShowUrgentBtns] = React.useState(true); //긴급버튼목록
	const [showLostAnimalForm, setShowLostAnimalForm] = React.useState(false); //실종버튼
	const [showReportForm, setShowRepotForm] = React.useState(false); //제보버튼
	const [showActionButton, setShowActionButton] = React.useState(false); // 긴급게시(하얀버전) 클릭 시 - 실종/제보 버튼 출력 Boolean
	const [isDiary, setDiary] = React.useState(false); //임보일기여부
	const [feedText, setFeedText] = React.useState(props.route.params.feed_content?props.route.params.feed_content.replace(/(&@|&#){2}(.*?)%&%.*?(&@|&#){2}/gm, '$2'):''); //피드 TextInput Value
	const [selectedImg, setSelectedImg] = React.useState([]); //사진 uri리스트
	const [isSearchTag, setSearchTag] = React.useState(false);
	const [publicSetting, setPublicSetting] = React.useState('전체 공개'); //공개 여부
	const keyboardArea = useKeyboardBottom(0 * DP);
	const scrollref = React.useRef();
	const lastTouchY = React.useRef(0);
	const container = React.useRef();
	const [editText, setEditText] = React.useState(props.route.params.feed_content?props.route.params.feed_content.replace(/(&@|&#){2}(.*?)%&%.*?(&@|&#){2}/gm, '$2'):'');

	React.useEffect(() => {
		if (props.route.name != 'FeedEdit') {
			props.navigation.setParams({
				...props.route.params,
				media_uri: selectedImg,
				feed_medias: selectedImg.map(v => ({media_uri: v, is_video: false, duration: 0, tags: []})),
			});
			
		} else {
			props.navigation.setParams({
				...props.route.params,
				media_uri: selectedImg.filter(v=>!v.includes('http')),
				// feed_medias: selectedImg.map(v => ({media_uri: v, is_video: false, duration: 0, tags: []}))
			});
			console.log('첨부 이미지 변화',selectedImg);
		}
	}, [selectedImg]); //네비게이션 파라메터에 이미지 리스트를 넣음(헤더에서 처리하도록)

	React.useEffect(() => {
		if (props.route.name == 'FeedEdit') {
			console.log('feedEdit 진입', props.route.params);
			if (props.route.params?.feed_type == 'missing') {
				console.log('실종 편집');
				onPressMissingWrite();
			}
			if (props.route.params?.feed_type == 'report') {
				console.log('제보 편집');
				onPressReportWrite();
			}
			setSelectedImg(props.route.params.feed_medias.map(v => v.media_uri));
		}
		if (props.route.params?.feedType == 'Feed') {
			props.navigation.setOptions({title: userGlobalObj.userInfo?.user_nickname});
			props.navigation.setParams({...props.route.params, feedType: 'Feed'});
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
		Modal.popTwoBtn(
			'사진 선택 모드를 선택하세요',
			'하나씩선택',
			'여러개선택',
			() => {
				ImagePicker.openPicker({
					// multiple: true,
					compressImageQuality: 0.8,
					width: 750,
					height: 750,
					cropping: true,
				})
					.then(images => {
						console.log('images', images);
						setSelectedImg(selectedImg.concat(images.path));
						Modal.close();
					})
					.catch(err => console.log(err + ''));
				Modal.close();
			},
			() => {
				launchImageLibrary(
					{
						mediaType: 'photo',
						selectionLimit: 5 - selectedImg.length, //다중선택 모드일 경우 상시 5개면 4개 상태에서 최대 5개를 더해 9개가 가능해짐
						maxHeight: 750,
						maxWidth: 750,
						quality: 0.8,
					},
					responseObject => {
						console.log('선택됨', responseObject);

						if (!responseObject.didCancel) {
							let tempContainer = [...selectedImg];
							responseObject.assets.map(v => tempContainer.push(v.uri));
							setSelectedImg(tempContainer.slice(-5));
							Modal.close();
						}
					},
				);
			},
		);
	};

	//사진 삭제
	const deletePhoto = index => {
		setSelectedImg(selectedImg.filter((v, i) => i != index));
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
		// props.navigation.push('LocationPicker');
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
			return <ReportForm onDataChange={onReportForm} container={container} scrollref={scrollref} />;
		} // 긴급 게시 버튼 중 '실종' 클릭한 경우
		else return showLostAnimalForm ? <MissingForm onDataChange={onMissingForm} container={container} scrollref={scrollref} /> : false;
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
							<Camera54 />
							<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>사진추가</Text>
						</View>
					</TouchableWithoutFeedback>
					{/* <TouchableWithoutFeedback onPress={moveToLocationPicker}>
							<View style={[feedWrite.btnItemContainer]}>
								<Location54_APRI10 />
								<Text style={[txt.noto24, {color: APRI10, alignSelf: 'center', marginLeft: 10 * DP}]}>위치추가</Text>
							</View>
						</TouchableWithoutFeedback> */}
					<TouchableWithoutFeedback onPress={moveToFeedMediaTagEdit}>
						<View style={[feedWrite.btnItemContainer]}>
							<Paw54_Border />
							<Text style={[txt.noto24, {color: APRI10, alignSelf: 'center', marginLeft: 10 * DP}]}>태그하기</Text>
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

						<TouchableOpacity onPress={onPressPublicSetting} style={[feedWrite.public_setting_btn]}>
							{/* <ActionButton btnTitle={'전체 공개'} onOpen={() => alert('dd')} btnStyle={'border'} titleFontStyle={24} btnLayout={btn_w194} /> */}
							<Text style={[txt.noto24, {color: APRI10}]}>{publicSetting}</Text>
							<Arrow_Down_APRI10 />
						</TouchableOpacity>
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
		console.log(selectedImg);
	};
	return (
		<View style={{flex: 1, backgroundColor: '#FFF'}}>
			<TouchableWithoutFeedback onPress={test}>
				<View style={{backgroundColor: 'red', width: 50, height: 50}}></View>
			</TouchableWithoutFeedback>
			<FlatList
				renderItem={({item, index}) => {
					return (
						<View contentContainerStyle={[login_style.wrp_main, {backgroundColor: '#000'}]} ref={container}>
							<HashInput
								containerStyle={[temp_style.feedTextEdit, {minHeight: showLostAnimalForm || showReportForm ? 214 * DP : 316 * DP}]}
								textAlignVertical={'top'}
								multiline={true}
								placeholder="게시물을 작성하세요 (150자)"
								onChangeText={inputFeedTxt}
								maxLength={150}
								onFind={onFindTag}
								selectedImg={selectedImg}
								onDelete={deletePhoto}
								value={editText}
							/>
							{!isSearchTag && setWriteModeState()}
						</View>
					);
				}}
				data={[{}]}
				ref={scrollref}></FlatList>
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
					<TouchableWithoutFeedback onPress={() => setShowActionButton(!showActionButton)}>
						<View style={[feedWrite.urgentActionButton]}>{showActionButton ? <Urgent_Write2 /> : <Urgent_Write1 />}</View>
					</TouchableWithoutFeedback>
				</View>
			) : (
				false
			)}
		</View>
	);
};

//실종 컴포넌트
const MissingForm = props => {
	const route = useRoute();
	console.log('실종 컴포넌트 데이터', route);
	const [types, setTypes] = React.useState([
		{
			pet_species: '개',
			pet_species_detail: DOG_KIND,
		},
	]);
	const [isSpeciesChanged, setIsSpeciesChanged] = React.useState(false);

	const [city, setCity] = React.useState(['광역시, 도']);
	const [district, setDistrict] = React.useState(['구를 선택해 주세요']);
	React.useEffect(() => {
		getAddressList(
			{},
			cities => {
				setCity(cities.msg),
					() => {
						console.log('Get Address Failed');
					};
			},
			err => Modal.alert(err),
		);
	}, []);

	const initData = () => {
		if (route.name == 'FeedEdit') {
			return route.params;
		}else{
			return {
				missing_animal_species: types[0].pet_species,
				missing_animal_species_detail: types[0].pet_species_detail[0],
				missing_animal_sex: 'male',
				missing_animal_age: '',
				missing_animal_lost_location: {
					city: city[0],
					district: '구를 선택',
					detail: '',
				},
				missing_animal_features: '',
				missing_animal_date: '',
				missing_animal_contact: '',
				type: types[0],
			};
		}
	};

	const [data, setData] = React.useState(initData());

	React.useEffect(() => {
		props.onDataChange && props.onDataChange(data);
	}, [data]);

	React.useEffect(() => {
		getPettypes(
			{},
			types => {
				setTypes(types.msg);
			},
			err => Modal.alert(err),
		);
	}, []);

	const onDateChange = date => {
		setData({...data, missing_animal_date: date});
	};

	const onSelectSpecies = () => {
		Modal.popSelectScrollBoxModal(
			[types.map(v => v.pet_species)],
			'동물 종 선택',
			selected => {
				const find = types.find(e => e.pet_species == selected);
				setData({...data, missing_animal_species: selected, missing_animal_species_detail: find.pet_species_detail[0]});
				setIsSpeciesChanged(!isSpeciesChanged);
			},
			() => Modal.close(),
		);
	};

	const onSelectSpeciesDetail = () => {
		const find = types.find(e => e.pet_species == data.missing_animal_species);
		Modal.popSelectScrollBoxModal(
			[find.pet_species_detail],
			'품종 선택',
			selected => {
				setData({...data, missing_animal_species_detail: selected});
			},
			() => Modal.close(),
		);
		// setData({...data, missing_animal_species_detail: data.type.pet_species_detail[i]});
	};

	const selectSex = i => {
		console.log(i);
		switch (i) {
			//male
			case 0:
				setData({...data, missing_animal_sex: 'male'});
				break;
			//female
			case 1:
				setData({...data, missing_animal_sex: 'female'});
				break;
			//unknown
			case 2:
				setData({...data, missing_animal_sex: 'unknown'});
				break;
		}
	};

	const inputAge = age => {
		setData({...data, missing_animal_age: age});
	};
	const inputLocation = location => {
		setData({...data, missing_animal_lost_location: location});
	};
	const inputContact = contact => {
		setData({...data, missing_animal_contact: contact});
	};
	const inputFeature = feature => {
		setData({...data, missing_animal_features: feature});
	};

	const onPressCity = () => {
		Modal.popSelectScrollBoxModal([city], '도, 광역, 특별시', selectedItem => {
			let lost_location_container = data.missing_animal_lost_location;
			lost_location_container.city = selectedItem;

			setData({...data, missing_animal_lost_location: lost_location_container});
			getAddressList(
				{city: selectedItem},
				districts => {
					console.log('districts.msg', districts.msg);
					setDistrict(districts.msg);
				},
				e => console.log('e', e),
			);
			Modal.close();
		});
	};
	const onPressDistrict = () => {
		Modal.popSelectScrollBoxModal([district], '도, 광역, 특별시', selectedItem => {
			let lost_location_container = data.missing_animal_lost_location;
			lost_location_container.district = selectedItem;
			setData({...data, missing_animal_lost_location: lost_location_container});
			Modal.close();
		});
	};

	const onChangeMissingLocationDetail = text => {
		let lost_location_container = data.missing_animal_lost_location;
		lost_location_container.detail = text;
		setData({...data, missing_animal_lost_location: lost_location_container});
	};

	const keyboardArea = useKeyboardBottom(0 * DP);
	const inputAgeRef = React.useRef();
	const inputLocationRef = React.useRef();
	const inputContactRef = React.useRef();
	const inputBalloonRef = React.useRef();
	const currentPosition = React.useRef(0);

	React.useEffect(() => {
		props.scrollref.current.scrollToOffset({offset: currentPosition.current});
		currentPosition.current = 0;
	}, [keyboardArea]);

	const onPressIn = inputRef => () => {
		if (Platform.OS === 'android') return;
		inputRef.current.measureLayout(
			props.container.current,
			(left, top, width, height) => {
				console.log('left:%s,top:%s,width:%s,height:%s', left, top, width, height);
				currentPosition.current = top;
				// props.scrollref.current.scrollToOffset({offset:top})
			},
			() => {
				console.log('measurelayout failed');
			},
		);
	};

	return (
		<View style={[feedWrite.lostAnimalForm]} showsVerticalScrollIndicator={false}>
			{/* DropDownSelect */}
			<View style={[feedWrite.lostAnimalForm_Form]}>
				<View style={[feedWrite.formTitle]}>
					<Text style={[txt.noto24, {color: APRI10}]}>분류</Text>
				</View>
				<View style={[feedWrite.formContentContainer]}>
					<View style={[temp_style.dropdownSelect, feedWrite.dropdownSelect]}>
						{/* <NormalDropDown items={pet_kind} menu={types.map(v => v.pet_species)} width={292} onSelect={onSelectSpecies} defaultIndex={0} /> */}
						<SelectInput onPressInput={onSelectSpecies} width={292} value={data.missing_animal_species} />
					</View>
					<View style={[temp_style.dropdownSelect, feedWrite.dropdownSelect]}>
						<SelectInput onPressInput={onSelectSpeciesDetail} width={292} value={data.missing_animal_species_detail} />
					</View>
				</View>
			</View>
			{/* DatePicker */}
			<View style={[feedWrite.lostAnimalForm_Form]}>
				<View style={[feedWrite.formTitle]}>
					<Text style={[txt.noto24, {color: APRI10}]}>실종된 날짜</Text>
				</View>
				<View style={[feedWrite.formContentContainer]}>
					<View style={[temp_style.datePicker_assignShelterInformation, feedWrite.datePicker]}>
						<DatePicker width={654} onDateChange={onDateChange} />
					</View>
				</View>
			</View>
			{/* tabSelectFilled_Type1 */}
			<View style={[feedWrite.lostAnimalForm_Form]}>
				<View style={[feedWrite.formTitle]}>
					<Text style={[txt.noto24, {color: APRI10}]}>실종 동물의 성별</Text>
				</View>
				<View style={[feedWrite.formContentContainer]}>
					<View style={[temp_style.tabSelectFilled_Type1, feedWrite.tabSelectFilled_Type1]}>
						<TabSelectFilled_Type1 items={['남아', '여아', '모름']} onSelect={selectSex} />
					</View>
				</View>
			</View>
			{/* Input24 */}
			<View style={[temp_style.input24, feedWrite.input24]}>
				<Input24
					title={'실종 동물의 나이'}
					placeholder="실종 동물의 나이를 입력하세요(년단위)"
					width={654}
					descriptionType={'none'}
					onChange={inputAge}
					maxlength={2}
					keyboardType={'number-pad'}
					value={data.missing_animal_age}
					onPressIn={onPressIn(inputAgeRef)}
					ref={inputAgeRef}
				/>
			</View>
			<View style={[temp_style.input24, feedWrite.missing_location_input]}>
				<Text style={[txt.noto24, {color: APRI10}]}>실종된 위치</Text>
				<View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
					<SelectInput onPressInput={onPressCity} width={292} value={data.missing_animal_lost_location.city} />
					<SelectInput onPressInput={onPressDistrict} width={292} value={data.missing_animal_lost_location.district} />
				</View>
				<TextInput
					onChangeText={onChangeMissingLocationDetail}
					style={[feedWrite.missing_location_detail_input]}
					placeholder={'반려동물이 실종된 구체적인 장소를 설명해주세요.'}
					placeholderTextColor={GRAY10}
					onPressIn={onPressIn(inputLocationRef)}
					ref={inputLocationRef}
				/>
			</View>
			<View style={[temp_style.input24, feedWrite.input24]}>
				<Input24
					title={'연락처'}
					placeholder="연락받으실 연락처를 입력하세요"
					width={654}
					descriptionType={'none'}
					onChange={inputContact}
					keyboardType={'number-pad'}
					maxlength={15}
					value={data.missing_animal_contact}
					onPressIn={onPressIn(inputContactRef)}
					ref={inputContactRef}
				/>
			</View>
			<View style={[temp_style.inputBalloon, feedWrite.inputBalloon]}>
				<InputBalloon
					title={'실종 동물의 특징'}
					placeholder="실종된 반려동물의 특징을 알려주세요. ex) 털 색, 겁이 많아서 잡으려고 하지 마시고 바로 연락주세요, 한 쪽귀가 접혀있어요, 등에 회색 점이 있어요..."
					onChange={inputFeature}
					value={data.missing_animal_features}
					maxLength={200}
					onPressIn={onPressIn(inputBalloonRef)}
					ref={inputBalloonRef}
				/>
			</View>
			<View style={{height: keyboardArea, width: '100%', backgroundColor: '#FFF'}}></View>
		</View>
	);
};

//제보 컴포넌트
const ReportForm = props => {
	const navigation = useNavigation();
	const route = useRoute();
	const [addr, setAddr] = React.useState('');
	const [detailAddr, setDetailAddr] = React.useState('');

	const [types, setTypes] = React.useState([
		{
			pet_species: '개',
			pet_species_detail: DOG_KIND,
		},
	]);

	const [city, setCity] = React.useState(['광역시도']); //광역시도 API자료 컨테이너
	const [isCityChanged, setIsCityChanged] = React.useState(false); //광역시도 선택되었는지 여부
	const [district, setDistrict] = React.useState(['시군']); //시군 API자료 컨테이너
	const [isDistrictChanged, setIsDistrictChanged] = React.useState(false); // 시군 선택되었는지 여부
	const [neighbor, setNeighbor] = React.useState(['동읍면']); //동읍면 API 자료 컨테이너
	const [data, setData] = React.useState({
		report_witness_date: '',
		report_witness_location: '',
		report_location: {
			// 필드명 조정 필요 (상우)
			city: city[0], //시,도
			district: district[0], //군,구
			detail: '', //상세 주솧
		},
		report_animal_species: types[0].pet_species,
		report_animal_species_detail: types[0].pet_species_detail[0],
		type: types[0],
	});

	const [isSpeciesChanged, setIsSpeciesChanged] = React.useState(false);

	React.useEffect(() => {
		props.onDataChange && props.onDataChange(data);
	}, [data]);

	// React.useEffect(() => {
	// 	if (route.params.addr) {
	// 		setAddr(route.params.addr.jibunAddr);
	// 		setDetailAddr(route.params.addr.detailAddr);
	// 	}
	// }, [route.params?.addr]);

	// React.useEffect(() => {
	// 	setData({...data, report_witness_location: addr + ' ' + detailAddr});
	// }, [addr, detailAddr]);

	React.useEffect(() => {
		getPettypes(
			{},
			types => {
				setTypes(types.msg);
			},
			err => Modal.alert(err),
		);
		getAddressList(
			{},
			cities => {
				// console.log('result / getAddressList / FeedWrite  ', cities.msg);
				setCity(cities.msg);
			},
			err => {
				console.log('err / getAddress / FeedWrite  : ', err);
			},
		);
	}, []);

	const onSelectCity = (item, index) => {
		// console.log('item', item);
		getAddressList(
			{
				city: item,
			},
			district => {
				// console.log('district  ', district.msg);
				setDistrict(district.msg);
				setData({...data, report_location: {city: item, district: district.msg[0], neighbor: ''}});
				item == data.report_location.city ? false : setIsCityChanged(!isCityChanged);
			},
		);
	};

	React.useEffect(() => {
		console.log('district update -------');
		console.log('data.report_location.district -------', data.report_location.district);
		getAddressList(
			{
				city: data.report_location.city,
				district: data.report_location.district,
			},
			neighbor => {
				console.log('neighbor  ', neighbor.msg);
				if (neighbor.msg.length == 0) {
					setNeighbor(['목록없음']);
				} else {
					setNeighbor(neighbor.msg);
				}
				// setData({...data, report_location: {city: data.report_location.city, district: data.report_location.district, neighbor: neighbor.msg[0]}});
				// data.report_location.district == data.report_location.district ? false : setIsDistrictChanged(!isDistrictChanged);
				setIsDistrictChanged(!isDistrictChanged);
			},
		);
	}, [data.report_location.district]);

	const onSelectDistrict = (item, index) => {
		getAddressList(
			{
				city: data.report_location.city,
				district: item,
			},
			neighbor => {
				console.log('neighbor  ', neighbor.msg);
				if (neighbor.msg.length == 0) {
					setNeighbor(['목록없음']);
				} else {
					setNeighbor(neighbor.msg);
				}
				setData({...data, report_location: {city: data.report_location.city, district: item, neighbor: neighbor.msg[0]}});
				item == data.report_location.district ? false : setIsDistrictChanged(!isDistrictChanged);
			},
		);
	};

	const onSelectNeighbor = (item, index) => {
		setData({
			...data,
			report_location: {city: data.report_location.city, district: data.report_location.district, neighbor: item},
		});
	};

	// const searchAddress = () => {
	// 	navigation.navigate('AddressSearch', {from: route.name, fromkey: route.key});
	// };

	// const onChangeAddr = addr => {
	// 	setAddr(addr);
	// };

	// const onClearAddr = () => {
	// 	setAddr('');
	// };

	const onClearDetailAddr = () => {
		// setDetailAddr('');
		let copied_location = data.report_location;
		copied_location.detailAddr = '';
		setData({...data, report_location: copied_location});
	};

	const onChangeDetailAddr = addr => {
		let copied_location = data.report_location;
		copied_location.detailAddr = addr;
		console.log('addr:', addr);
		console.log('copied_location:', copied_location);
		setData({...data, report_location: copied_location});
		// setDetailAddr(addr);
	};
	const onDateChange = date => {
		setData({...data, report_witness_date: date});
	};
	const inputFeature = feature => {
		setData({...data, report_animal_features: feature});
	};

	const onSelectSpecies = () => {
		Modal.popSelectScrollBoxModal(
			[types.map(v => v.pet_species)],
			'동물 종 선택',
			selected => {
				const find = types.find(e => e.pet_species == selected);
				setData({...data, report_animal_species: selected, report_animal_species_detail: find.pet_species_detail[0]});
				setIsSpeciesChanged(!isSpeciesChanged);
			},
			() => Modal.close(),
		);
	};

	const onSelectSpeciesDetail = () => {
		const find = types.find(e => e.pet_species == data.report_animal_species);
		Modal.popSelectScrollBoxModal(
			[find.pet_species_detail],
			'품종 선택',
			selected => {
				setData({...data, report_animal_species_detail: selected});
			},
			() => Modal.close(),
		);
		// setData({...data, missing_animal_species_detail: data.type.pet_species_detail[i]});
	};

	const onPressCity = () => {
		Modal.popSelectScrollBoxModal([city], '도, 광역, 특별시', selectedItem => {
			let report_location = data.report_location;
			report_location.city = selectedItem;
			setData({...data, report_location: report_location});
			getAddressList(
				{city: selectedItem},
				districts => {
					console.log('districts.msg', districts.msg);
					setDistrict(districts.msg);
				},
				e => console.log('e', e),
			);
			Modal.close();
		});
	};
	const onPressDistrict = () => {
		Modal.popSelectScrollBoxModal([district], '도, 광역, 특별시', selectedItem => {
			let report_location = data.report_location;
			report_location.district = selectedItem;
			setData({...data, report_location: report_location});
			Modal.close();
		});
	};

	const onChangeMissingLocationDetail = text => {
		let report_location = data.report_location;
		report_location.detail = text;

		setData({...data, report_location: report_location});
		console.log('text input :', data.report_location);
	};

	const keyboardArea = useKeyboardBottom(0 * DP);
	const inputLocationRef = React.useRef();
	const currentPosition = React.useRef(0);

	React.useEffect(() => {
		props.scrollref.current.scrollToOffset({offset: currentPosition.current});
		currentPosition.current = 0;
	}, [keyboardArea]);

	const onPressIn = inputRef => () => {
		if (Platform.OS === 'android') return;
		inputRef.current.measureLayout(
			props.container.current,
			(left, top, width, height) => {
				console.log('left:%s,top:%s,width:%s,height:%s', left, top, width, height);
				currentPosition.current = top;
				// props.scrollref.current.scrollToOffset({offset:top})
			},
			() => {
				console.log('measurelayout failed');
			},
		);
	};

	return (
		<View style={[feedWrite.reportForm_container]} showsVerticalScrollIndicator={false}>
			<View style={[feedWrite.reportForm]}>
				<View style={[feedWrite.reportForm_form]}>
					<View style={[feedWrite.lostAnimalForm_Form]}>
						<View style={[feedWrite.formTitle]}>
							<Text style={[txt.noto24, {color: APRI10}]}>분류</Text>
						</View>
						<View style={[feedWrite.formContentContainer]}>
							<View style={[temp_style.dropdownSelect, feedWrite.dropdownSelect]}>
								<SelectInput onPressInput={onSelectSpecies} width={292} value={data.report_animal_species} />
							</View>
							<View style={[temp_style.dropdownSelect, feedWrite.dropdownSelect]}>
								<SelectInput onPressInput={onSelectSpeciesDetail} width={292} value={data.report_animal_species_detail} />
							</View>
						</View>
					</View>
					<View style={[feedWrite.formTitle]}>
						<Text style={[txt.noto24, {color: APRI10}]}>제보 날짜</Text>
					</View>
					<View style={[temp_style.datePicker_assignShelterInformation, feedWrite.datePicker]}>
						<DatePicker width={654} onDateChange={onDateChange} defaultDate={''} />
					</View>
					<View style={[temp_style.input24, feedWrite.report_location]}>
						<Text style={[txt.noto24, {color: APRI10}]}>제보 장소</Text>
						<View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
							<SelectInput onPressInput={onPressCity} width={292} value={data.report_location.city} />
							<SelectInput onPressInput={onPressDistrict} width={292} value={data.report_location.district} />
						</View>
						<TextInput
							onChangeText={onChangeMissingLocationDetail}
							style={[feedWrite.missing_location_detail_input]}
							placeholder={'제보하려는 장소의 위치를 설명해주세요.'}
							placeholderTextColor={GRAY10}
							onPressIn={onPressIn(inputLocationRef)}
							ref={inputLocationRef}
						/>
					</View>
				</View>
			</View>
			<View style={{height: keyboardArea, width: '100%', backgroundColor: '#FFF'}}></View>
		</View>
	);
};
