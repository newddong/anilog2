import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TextInput, Platform, StatusBar, Keyboard, StyleSheet, Image} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10, GRAY40, BLACK, MAINBLACK, GRAY50, GRAY30} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP, {isNotch} from 'Root/config/dp';
import {Camera54, Location54, LocationGray, LocationMarker, NextMark} from 'Root/component/atom/icon/index';
import Modal from 'Component/modal/Modal';
import {useNavigation} from '@react-navigation/native';
import {changeLocalPathToS3Path} from 'Root/api/community';
import {RichEditor} from 'react-native-pell-rich-editor';
import AnimalButton from 'Root/component/molecules/button/AnimalButton';
import {WRITE_FREE_INFO, WRITE_REVIEW_INFO} from 'Root/i18n/msg';
import MapView from 'react-native-maps';
import {KeyBoardEvent} from 'Root/component/molecules/input/usekeyboardbottom';

export default CommunityWrite = props => {
	const navigation = useNavigation();
	const isReview = props.route.params.isReview; //후기 게시글 여부 boolean
	const [data, setData] = React.useState({
		community_title: '',
		community_content: '',
		community_is_attached_file: true,
		community_type: isReview ? 'review' : 'free',
		community_free_type: isReview ? '' : 'talk',
		community_animal_type: '',
		community_avatar_id: '',
		community_is_temporary: false,
		community_interests: {
			// interests_trip: [],
			// interests_hospital: [],
			// interests_interior: [],
			// interests_review: [],
			interests_group1: [],
			interests_group2: [],
			interests_group3: [],
			interests_etc: [],
			interests_location: {city: '', district: ''},
		},
		community_address: {
			road_address: {
				address_name: '',
				city: '',
				district: '',
			},
			normal_address: {
				address_name: '',
				city: '',
				district: '',
			},
			region: {
				latitude: '',
				longitude: '',
			},
		},
	});

	const [animalType, setAnimalType] = React.useState({
		dog: false,
		cat: false,
		etc: false,
	});
	const [cursor, setCursor] = React.useState(0);
	const richText = React.useRef('');
	const scrollRef = React.useRef('');
	const article_type = ['talk', 'question', 'meeting'];

	React.useEffect(() => {
		props.navigation.setParams({data: data, nav: 'CommunityWrite'});
	}, [data]);

	React.useEffect(() => {
		isReview ? navigation.setOptions({title: '리뷰 글쓰기'}) : navigation.setOptions({title: '자유게시글 쓰기'});
	}, []);

	React.useEffect(() => {
		const param = props.route.params;
		// console.log('param', param.community_address);
		if (param?.data && data.community_address.region.latitude != param?.data.community_address.region.latitude) {
			//다른 주소 검색 결과값 적용
			setData(param.data);
			scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
			// richText.current?.focusContentEditor();
		}
	}, [props.route.params?.data]);

	//내용 입력
	const onChange = editorData => {
		// console.log('editorData', editorData);
		if (editorData != data.community_content) {
			// console.log('editorData.replace(/<[^>]*>/g,).length ', editorData.replace(/<[^>]*>/g, '').length);
			if (editorData.replace(/<[^>]*>/g, '').length > 1500) {
				// 1500자 이하
				Modal.alert('1500자 이하로 작성이 가능합니다!');
				richText.current?.setContentHTML(data.community_content);
			} else {
				setData({...data, community_content: editorData});
				scrollRef.current.scrollTo({y: cursor - 50, duration: 100, animated: true});
			}
		}
	};

	//제목 입력
	const onChangeTitle = title => {
		// console.log('title', title);
		setData({...data, community_title: title});
	};

	//개 고양이 그외 필터 클릭
	const onPressAnimalFilter = kind => {
		switch (kind) {
			case 'dog':
				setAnimalType({...animalType, dog: !animalType.dog, cat: false, etc: false});
				setData({...data, community_animal_type: 'dog'});
				// data.filter.includes('dog') ? false : temp.push('dog')
				break;
			case 'cat':
				setAnimalType({...animalType, dog: false, cat: !animalType.cat, etc: false});
				setData({...data, community_animal_type: 'cat'});
				break;
			case 'etc':
				setAnimalType({...animalType, dog: false, cat: false, etc: !animalType.etc});
				setData({...data, community_animal_type: 'etc'});
				break;
			default:
				break;
		}
	};

	// fill	기본값. 주어진 너비와 높이에 딱 맞도록 사이즈를 조절합니다. 이미지의 가로세로 비율은 유지되지 않아요.
	// contain	가로세로 비율을 유지한 채로 사이즈가 조절되지만, 이미지와 컨테이너 간의 비율이 맞지 않는 경우엔 자리가 남게 됩니다.
	// cover	가로세로 비율을 유지한 채로 사이즈가 조절되며, 비율이 맞지 않더라도 이미지를 확대해 컨테이너를 완전히 채웁니다.
	// none	아무것도 하지 않고 본래의 이미지 사이즈를 유지합니다. 그래도 이미지 가운데가 보여지도록 하는 센스가 있어요.
	// scale-down	none 또는 contain 중에 더 적절한 방향으로 이미지 사이즈를 조절합니다.

	//이미지 입력
	const insertImage = imageList => {
		console.log('imageList', imageList);
		setTimeout(() => {
			Modal.popLoading(true);
			setTimeout(() => {
				data != 'false' ? richText.current?.insertHTML('<p><br/></p></div>') : false; //이미지를 넣을 시 바로 다음줄로 이동하도록 처리
				// const result = await changePath(imageList);
				changeLocalPathToS3Path(
					{
						s3path_uri: imageList,
					},
					result => {
						result.msg.map((v, i) => {
							richText.current?.insertHTML('<p><br/></p></div>');
							richText.current?.insertHTML(
								`<div><img src="${v.location}" id="image" onclick="_.sendEvent('ImgClick');" \n
								  style="height:auto; width:${694 * DP}px; border-radius:15px; margin:5px 0px 5px 0px; "/></div>`,
							);
							if (i == result.msg.length - 1) {
								setTimeout(() => {
									richText.current?.insertHTML('<p id="toDelete"><br/></p>');
									Modal.close();
								}, 1000);
							}
						});
						// richText.current?.focusContentEditor();
					},
					err => {
						console.log('err', err);
						Modal.close();
					},
				);
			}, 100);
		}, 100);
	};

	const onPressAddVideo = () => {
		const example = 'https://media.fmkorea.com/files/attach/new2/20220330/486616/2949542227/4478562221/a0729cce75f3e4a1cd32cf074066543d.mp4?d';
		richText.current?.insertHTML(
			`<div style="padding:10px 0;" contentEditable="false">
		        <iframe  width="100%" height="220"  src="${example}" frameborder="0" allow="accelerometer; controls; sandbox; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
		    </div>`,
		);
	};

	React.useEffect(() => {
		if (props.route.params.selectedPhoto && props.route.params.selectedPhoto.length > 0) {
			let selected = props.route.params.selectedPhoto;
			insertImage(
				selected.map(v => {
					return v.cropUri ?? v.uri;
				}),
			);
		}
	}, [props.route.params?.selectedPhoto]);

	//사진 불러오기
	const onPressPhotoSelect = key => {
		if (key) {
			//키보드가 올라와있으며 가려진 버튼일 경우 사진추가 이벤트로 연결X
			!showBtn ? navigation.navigate('MultiPhotoSelect', {prev: {name: props.route.name, key: props.route.key}}) : false;
		} else {
			navigation.navigate('MultiPhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
		}
	};

	const isInterestsEmpty = () => {
		if (isReview) {
			if (data.community_interests.hasOwnProperty('interests_group1')) {
				return (
					data.community_interests.interests_etc.length == 0 &&
					data.community_interests.interests_group1.length == 0 &&
					data.community_interests.interests_group2 == 0 &&
					data.community_interests.interests_group3 == 0
				);
			} else
				return (
					data.community_interests.interests_etc.length == 0 &&
					data.community_interests.interests_trip.length == 0 &&
					data.community_interests.interests_hospital == 0 &&
					data.community_interests.interests_review == 0
				);
		} else return false;
	};

	const onPressFilter = () => {
		// console.log('data.community_interests', data.community_interests);
		richText.current?.dismissKeyboard(); //일반적인 input과 달리 RichText에서는 이와같이 키보드를 hide
		Modal.popReviewFilterModal(
			'ReviewWrite',
			// data.community_interests == '카테고리 선택' ? [] : data.community_interests,
			data.community_interests,
			() => Modal.close(),
			() => Modal.close(),
			arg => {
				console.log('arg', arg);
				setData({...data, community_interests: arg.userInterestReview});
				Modal.close();
			},
		);
	};

	const onDeleteImage = () => {
		console.log('onDeleteImage');
	};

	const onPressTempSave = () => {
		richText.current?.dismissKeyboard(); //일반적인 input과 달리 RichText에서는 이와같이 키보드를 hide
		alert('onPressTempSave');
	};

	const onCursorPosition = scrollY => {
		setCursor(scrollY); //현재 커서가 최신화 되지 않던 현상 수정
		scrollRef.current.scrollTo({y: scrollY - 50, duration: 100, animated: true});
	};

	const [KeyboardY, setKeyboardY] = React.useState(0);
	const [showBtn, setShowBtn] = React.useState(false);

	const KeyboardBorderLine = (() => {
		if (Platform.OS === 'ios') {
			return isNotch ? -34 : 0;
		} else if (Platform.OS === 'android') {
			return isNotch ? StatusBar.currentHeight : 0;
		}
	})();

	KeyBoardEvent(
		e => {
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine);
			// Platform.OS == 'android' ? setShowBtn(true) : setShowBtn(true);
		},
		e => {
			setKeyboardY(0);
		},
	);

	const onFocus = () => {
		setShowBtn(true);
	};

	const onBlur = () => {
		setShowBtn(false);
	};

	//선택한 카테고리 목록 Stringify 함수
	const getReviewCategory = list => {
		let category_text = '';
		const getText = array => {
			array.map((v, i) => {
				category_text = category_text + v + ' / ';
			});
		};
		if (list.hasOwnProperty('interests_group1')) {
			getText(list.interests_etc);
			getText(list.interests_group1);
			getText(list.interests_group2);
			getText(list.interests_group3);
		} else {
			getText(list.interests_trip);
			getText(list.interests_review);
			getText(list.interests_interior);
			getText(list.interests_hospital);
			getText(list.interests_etc);
		}

		return category_text;
	};

	const onPressType = select => {
		richText.current?.dismissKeyboard(); //일반적인 input과 달리 RichText에서는 이와같이 키보드를 hide
		setData({...data, community_free_type: select});
	};

	const article_type_box = type => {
		let text = '';
		switch (type) {
			case 'talk':
				text = '잡담';
				break;
			case 'question':
				text = '질문';
				break;
			case 'meeting':
				text = '모임';
				break;
			default:
				break;
		}
		return (
			<TouchableOpacity
				key={type}
				onPress={() => onPressType(type)}
				activeOpacity={0.6}
				style={[style.category_item_free, {backgroundColor: data.community_free_type == type ? MAINBLACK : GRAY40}]}>
				<Text style={[txt.noto28, {color: data.community_free_type == type ? WHITE : GRAY10}]}>{text}</Text>
			</TouchableOpacity>
		);
	};

	//리뷰글쓰기 버튼 아이콘 컨테이너
	const getReviewButtonContainer = key => {
		return (
			<>
				<TouchableOpacity activeOpacity={0.6} onPress={() => onPressPhotoSelect(key)}>
					<View style={[style.buttonItem_review]}>
						<Camera54 />
					</View>
				</TouchableOpacity>
				<View style={{height: 38 * DP, width: 2 * DP, backgroundColor: GRAY10, alignSelf: 'center', marginHorizontal: 30 * DP}}></View>
				<TouchableOpacity activeOpacity={0.6} onPress={() => moveToLocationPicker(key)}>
					<View style={[style.buttonItem_review, {}]}>
						<Location54 fill={'black'} />
					</View>
				</TouchableOpacity>
			</>
		);
	};

	//자유글쓰기 버튼 아이콘 컨테이너
	const getArticleButtonContainer = key => {
		return (
			<TouchableOpacity activeOpacity={0.6} onPress={() => onPressPhotoSelect(key)}>
				<View style={[style.buttonItem, {}]}>
					<Camera54 />
					<Text style={[txt.noto28b, {marginLeft: 10 * DP}]}>사진추가</Text>
				</View>
			</TouchableOpacity>
		);
	};

	//붙여넣기 콜백 함수
	const onPaste = paste => {
		console.log('paste', paste);
		if (paste == '') {
			Modal.alert('이미지 붙여넣기는 불가합니다.');
		}
	};

	//키보드 종료 기능
	const removeEditor = () => {
		richText.current.dismissKeyboard();
	};

	const moveToLocationPicker = key => {
		if (key) {
			//키보드가 올라와있으며 가려진 버튼일 경우 사진추가 이벤트로 연결X
			!showBtn ? navigation.navigate('CommunityLocationPicker', {data: data, isReview: isReview}) : false;
		} else {
			navigation.navigate('CommunityLocationPicker', {data: data, isReview: isReview});
		}
	};

	const getMap = () => {
		const getLocation =
			data.community_address.road_address.address_name.includes('도로명 주소가 없는 위치입니다. ') ||
			data.community_address.road_address.address_name == 'undefined '
				? data.community_address.normal_address.address_name
				: data.community_address.road_address.address_name;
		return (
			<View style={{height: 694 * DP, marginTop: 30 * DP}}>
				<View style={[style.mapOutCont]}>
					<MapView
						style={[style.mapContainer]}
						// provider={PROVIDER_GOOGLE}
						customMapStyle={mapStyle2}
						zoomEnabled
						zoomControlEnabled
						scrollEnabled={false}
						toolbarEnabled={false}
						mapType="standard"
						region={{
							longitude: parseFloat(data.community_address.region.longitude),
							latitude: parseFloat(data.community_address.region.latitude),
							latitudeDelta: 0.00012, //지도의 초기줌 수치
							longitudeDelta: 0.00856, //지도의 초기줌 수치
						}}>
						{/* 현재 선택된 위도 경도의 마커 */}
						<MapView.Marker
							coordinate={{
								longitude: parseFloat(data.community_address.region.longitude),
								latitude: parseFloat(data.community_address.region.latitude),
							}}
							key={`${Date.now()}`} // 현재 마커의 위치가 바뀌어도 타이틀 및 description이 최신화 되지 않던 현상 발견 -> 키 값 부여
						>
							<View style={[{alignItems: 'center', marginBottom: 20 * DP}]}>
								<Text style={[txt.noto22b, style.locationText]}> {getLocation}</Text>
								<View style={[style.triangle]}></View>
								<LocationMarker />
							</View>
						</MapView.Marker>
					</MapView>
				</View>
				<View style={[style.location, {}]}>
					<LocationGray />
					<Text style={[txt.noto26, {paddingHorizontal: 12 * DP, width: 600 * DP, backgroundColor: WHITE}]} numberOfLines={2}>
						{getLocation}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={[style.container, {}]}>
			<ScrollView contentContainerStyle={[style.insideScrollView, {}]} ref={scrollRef} showsVerticalScrollIndicator={false}>
				{/* //제목 및 카테고리 선택 */}
				{isReview ? (
					<>
						<TouchableOpacity activeOpacity={0.6} onPress={onPressFilter} style={[style.category]}>
							<Text style={[txt.noto28, style.categoryText]} ellipsizeMode={'tail'} numberOfLines={1}>
								{isInterestsEmpty() ? '카테고리 선택' : getReviewCategory(data.community_interests)}
							</Text>
							<View style={[style.nextMark]}>
								<NextMark />
							</View>
						</TouchableOpacity>
					</>
				) : (
					<View style={[style.category_free]}>
						{article_type.map((v, i) => {
							return article_type_box(v);
						})}
					</View>
				)}
				<TextInput
					onChangeText={onChangeTitle}
					maxLength={30}
					style={[txt.noto28, style.title_text]}
					placeholder={'제목 입력(최대 30자)'}
					placeholderTextColor={GRAY20}
				/>
				{/* 텍스트 입력 박스 */}
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity onPress={removeEditor} activeOpacity={1} style={{width: 48 * DP}}></TouchableOpacity>
					<View style={[style.content, {}]}>
						{Platform.OS == 'android' ? (
							<ScrollView onTouchEnd={() => richText.current?.focusContentEditor()} style={{}}>
								<RichEditor
									ref={richText}
									editorStyle={{contentCSSText: `font-size:${28 * DP}px;`, backgroundColor: '#FAFAFA'}}
									onChange={onChange}
									keyboardDisplayRequiresUserAction={true}
									style={{width: '100%', opacity: 0.99, flex: 1, minHeight: 500 * DP}}
									placeholder={isReview ? WRITE_REVIEW_INFO : WRITE_FREE_INFO}
									onCursorPosition={onCursorPosition}
									onPaste={onPaste}
									pasteAsPlainText={true}
									onFocus={onFocus}
									onBlur={onBlur}
								/>
							</ScrollView>
						) : (
							<ScrollView onTouchEnd={() => richText.current?.focusContentEditor()} style={{}}>
								<RichEditor
									ref={richText}
									editorStyle={{contentCSSText: `font-size:${28 * DP}px;`, backgroundColor: '#FAFAFA'}}
									onChange={onChange}
									keyboardDisplayRequiresUserAction={true}
									style={{width: '100%', opacity: 0.99, flex: 1, minHeight: 500 * DP}}
									contentMode={'mobile'}
									placeholder={isReview ? WRITE_REVIEW_INFO : WRITE_FREE_INFO}
									onCursorPosition={onCursorPosition}
									onPaste={onPaste}
									pasteAsPlainText={true}
									onFocus={onFocus}
									onBlur={onBlur}
								/>
							</ScrollView>
						)}
					</View>
					<TouchableOpacity activeOpacity={1} onPress={removeEditor} style={{width: 48 * DP}}></TouchableOpacity>
				</View>
				{data.community_address.normal_address.address_name != '' ? getMap() : <></>}
				{/* 하단 버튼 컴포넌트  */}
				{isReview ? (
					<View style={[style.animalFilter_container]}>
						<View style={[style.animalFilter]}>
							<View style={[style.buttonContainer_review, {opacity: showBtn == true ? 0 : 1, zIndex: 1}]}>{getReviewButtonContainer(true)}</View>
							<View style={{flexDirection: 'row', width: 398 * DP, justifyContent: 'space-between'}}>
								<View style={[]}>
									{!animalType.dog ? (
										<AnimalButton type={'dog'} on={false} onPress={() => onPressAnimalFilter('dog')} />
									) : (
										<AnimalButton type={'dog'} on={true} onPress={() => onPressAnimalFilter('dog')} />
									)}
								</View>
								<View style={[]}>
									{!animalType.cat ? (
										<AnimalButton type={'cat'} on={false} onPress={() => onPressAnimalFilter('cat')} />
									) : (
										<AnimalButton type={'cat'} on={true} onPress={() => onPressAnimalFilter('cat')} />
									)}
								</View>
								<View style={[]}>
									{!animalType.etc ? (
										<AnimalButton type={'another'} on={false} onPress={() => onPressAnimalFilter('etc')} />
									) : (
										<AnimalButton type={'another'} on={true} onPress={() => onPressAnimalFilter('etc')} />
									)}
								</View>
							</View>
						</View>
					</View>
				) : (
					<></>
				)}

				{isReview ? <></> : <View style={[style.buttonContainer, {opacity: showBtn == true ? 0 : 1}]}>{getArticleButtonContainer(true)}</View>}
				<View style={{height: 100}} />
			</ScrollView>
			{isReview ? (
				//키보드 영역 올라올 시 출력되야 하는 버튼 컨테이너 - 스타일 별도의 처리가 필요하여 분리 처리하였음
				<View
					style={[
						style.buttonContainer_keyboard_review,
						{
							bottom: Platform.OS == 'android' ? 0 : KeyboardY,
							opacity: showBtn == false ? 0 : 1,
							zIndex: showBtn ? 3 : -1,
						},
					]}>
					{getReviewButtonContainer(false)}
				</View>
			) : (
				<View style={[style.buttonContainer_keyboard, {bottom: Platform.OS == 'android' ? 0 : KeyboardY, opacity: showBtn ? 1 : 0}]}>
					{getArticleButtonContainer(false)}
				</View>
			)}
			{/* ios에서 키보드가 가려지는 현상 방지를 위한 keyBoard패딩 컴포넌트 */}
			<View style={{height: Platform.OS == 'ios' ? KeyboardY - 40 : null}} />
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		borderTopWidth: 2 * DP,
		borderTopColor: GRAY40,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	insideScrollView: {
		backgroundColor: '#fff',
		alignItems: 'center',
		width: 750 * DP,
		paddingBottom: 20 * DP,
	},
	title_text: {
		width: 694 * DP,
		height: 104 * DP,
		paddingHorizontal: 30 * DP,
		borderRadius: 30 * DP,
		backgroundColor: GRAY50,
		marginBottom: 30 * DP,
		// borderBottomColor: APRI10,
		// borderBottomWidth: 2 * DP,
	},
	category: {
		width: 694 * DP,
		height: 104 * DP,
		paddingLeft: 24 * DP,
		marginTop: 30 * DP,
		backgroundColor: GRAY50,
		borderRadius: 30 * DP,
		paddingVertical: 18 * DP,
		marginBottom: 30 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	category_free: {
		marginVertical: 30 * DP,
		width: 694 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
	},
	category_item_free: {
		width: 222 * DP,
		height: 82 * DP,
		borderRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: APRI10,
	},
	category_item_text: {
		color: GRAY10,
	},
	categoryText: {
		width: 530 * DP,
	},
	nextMark: {
		marginLeft: (654 - 558) * DP,
	},
	content: {
		width: 694 * DP,
		minHeight: 500 * DP,
		borderRadius: 30 * DP,
		backgroundColor: GRAY50,
		// borderWidth: 2 * DP,
		// borderColor: APRI10,
		padding: 17 * DP,
		paddingVertical: 20 * DP,
	},
	buttonContainer: {
		paddingVertical: 18 * DP,
		paddingHorizontal: 24 * DP,
		flexDirection: 'row',
		width: 694 * DP,
		justifyContent: 'flex-start',
	},
	buttonContainer_review: {
		// paddingVertical: 40 * DP,
		paddingHorizontal: 24 * DP,
		flexDirection: 'row',
		// width: 694 * DP,
		// backgroundColor: 'yellow',
		justifyContent: 'space-between',
	},
	buttonContainer_keyboard: {
		width: 694 * DP,
		backgroundColor: 'white',
		paddingVertical: 15 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'flex-start',
		position: 'absolute',
	},
	buttonContainer_keyboard_review: {
		width: 694 * DP,
		backgroundColor: 'white',
		paddingVertical: 15 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		// justifyContent: 'flex-start',
		position: 'absolute',
	},
	buttonItem: {
		width: 160 * DP,
		height: 54 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonItem_review: {
		width: 54 * DP,
		height: 54 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentInput: {
		// flex: 1,
		// backgroundColor: 'yellow',
		minHeight: 150 * DP,
	},
	location: {
		width: 694 * DP,
		position: 'absolute',
		height: 100 * DP,
		bottom: 0,
		borderBottomRightRadius: 30 * DP,
		borderBottomLeftRadius: 30 * DP,
		paddingHorizontal: 20 * DP,
		backgroundColor: 'white',
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 1,
	},
	animalFilter_container: {
		width: 694 * DP,
	},
	animalFilter: {
		width: 694 * DP,
		marginTop: 30 * DP,
		flexDirection: 'row',
		// alignSelf: 'flex-end',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
		backgroundColor: 'white',
		borderRadius: 22 * DP,
	},
	shadow_filter: {
		width: 60 * DP,
		height: 60 * DP,
		backgroundColor: 'white',
		shadowOpacity: 0.5,
		elevation: 2,
		shadowOffset: {
			height: 4 * DP,
		},
		borderRadius: 20 * DP,
	},
	mapOutCont: {
		height: 594 * DP,
		zIndex: -1,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	mapContainer: {
		flex: 1,
		height: 594 * DP,
		width: 690 * DP,
		borderRadius: 30 * DP,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	locationText: {
		maxWidth: 520 * DP,
		// height: 60 * DP,
		borderRadius: 20 * DP,
		padding: 10 * DP,
		borderWidth: 2 * DP,
		textAlign: 'center',
		backgroundColor: 'white',
	},
	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 15 * DP,
		borderRightWidth: 15 * DP,
		borderBottomWidth: 15 * DP,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'black',
		transform: [{rotate: '180deg'}],
	},
	webview: {
		width: 694 * DP,
		// backgroundColor: 'yellow',
		// minHeight: 500 * DP,
	},
	currentLocationIcon: {
		position: 'absolute',
		right: 50 * DP,
		bottom: 100 * DP,
		width: 60 * DP,
		height: 60 * DP,
		// backgroundColor: 'red',
		zIndex: 1,
	},
});

const mapStyle2 = [
	{
		featureType: 'poi.business',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'transit',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
];
