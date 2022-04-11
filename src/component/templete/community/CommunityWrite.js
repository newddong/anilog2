import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TextInput, Platform, StatusBar, Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10, GRAY40, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP, {isNotch} from 'Root/config/dp';
import {Camera54, Location54_APRI10, Location54_Filled, NextMark_APRI, Save54} from 'Root/component/atom/icon/index';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'Component/modal/Modal';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {changeLocalPathToS3Path} from 'Root/api/community';
import {RichEditor} from 'react-native-pell-rich-editor';
import {Animal_another_off, Animal_cat_off, Animal_dog_off} from 'Root/component/atom/icon';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import Geolocation from '@react-native-community/geolocation';

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
			interests_trip: [],
			interests_hospital: [],
			interests_interior: [],
			interests_etc: [],
			interests_review: [],
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
	const [editorLayout, setEditorLayout] = React.useState({
		//Rich Editor 레이아웃
		height: 345,
		width: 310,
		x: 0,
		y: 0,
	});

	React.useEffect(() => {
		props.navigation.setParams({data: data, nav: 'CommunityWrite'});
	}, [data]);

	React.useEffect(() => {
		isReview ? navigation.setOptions({title: '리뷰'}) : navigation.setOptions({title: '자유 게시글'});
		if (Platform.OS === 'ios') {
			Geolocation.requestAuthorization('always');
		}
	}, []);

	React.useEffect(() => {
		const param = props.route.params;
		if (param?.data && data.community_address.region.latitude != param?.data.community_address.region.latitude) {
			//다른 주소 검색 결과값 적용
			setData(param.data);
			// richText.current?.focusContentEditor();
		}
	}, [props.route.params?.data]);

	//내용 입력
	const onChange = editorData => {
		console.log('editorData', editorData);

		setData({...data, community_content: editorData});
		scrollRef.current.scrollTo({y: cursor - 50, duration: 100, animated: true});
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

	async function changePath(src) {
		return new Promise(async function (resolve, reject) {
			try {
				changeLocalPathToS3Path(
					{
						s3path_uri: src,
					},
					result => {
						// console.log('result / s3path / Write ', result.msg);
						resolve(result.msg);
					},
					err => {
						console.log('err', err);
					},
				);
			} catch (error) {
				console.log('error changePath  :  ', error.message);
				Modal.close(); //오류발생 시 Modal 종료
			}
		});
	}

	//Rich Editor 레이아웃
	const onLayout = e => {
		setEditorLayout(e.nativeEvent.layout);
	};

	//이미지 입력
	const insertImage = async imageList => {
		// console.log('imageList', imageList);
		data != 'false' ? richText.current?.insertHTML('<p><br/></p></div>') : false; //이미지를 넣을 시 바로 다음줄로 이동하도록 처리
		const result = await changePath(imageList);
		result.map((v, i) => {
			richText.current?.insertHTML('<p><br/></p></div>');
			richText.current?.insertHTML(
				`<div><img src="${v.location}" id="image" onclick="_.sendEvent('ImgClick')" \n
				 height="320px;" width="${editorLayout.width};" style="border-radius:15px; margin: 0 auto 4px;    "/></div>`,
			);
			// richText.current?.insertHTML(
			// 	`<div  style="padding : 8px 10px 8px 0px; " ><img src="${v.location}" id="image" onclick="_.sendEvent('ImgClick')" \n
			// 	 height="320px;" width="${editorLayout.width};" style="border-radius:15px; margin: 0 auto 4px;    "/></div>`,
			// );
			// richText.current?.insertHTML('<p><br/></p></div>');
		});

		richText.current?.focusContentEditor();
	};

	const onPressAddVideo = () => {
		const example = 'https://media.fmkorea.com/files/attach/new2/20220330/486616/2949542227/4478562221/a0729cce75f3e4a1cd32cf074066543d.mp4?d';
		richText.current?.insertHTML(
			`<div style="padding:10px 0;" contentEditable="false">
		        <iframe  width="100%" height="220"  src="${example}" frameborder="0" allow="accelerometer; controls; sandbox; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
		    </div>`,
		);
	};

	//사진 불러오기
	const onPressPhotoSelect = () => {
		Modal.popTwoBtn(
			'사진 선택 모드를 선택하세요',
			'하나씩선택',
			'여러개선택',
			() => {
				ImagePicker.openPicker({
					compressImageQuality: 0.8,
					width: 750,
					height: 750,
					cropping: true,
				})
					.then(images => {
						insertImage(images.path);
						Modal.close();
					})
					.catch(err => console.log(err + ''));
				Modal.close();
			},
			() => {
				launchImageLibrary(
					{
						mediaType: 'photo',
						selectionLimit: 5, //다중선택 모드일 경우 상시 5개면 4개 상태에서 최대 5개를 더해 9개가 가능해짐
						maxHeight: 750,
						maxWidth: 750,
						quality: 0.8,
					},
					responseObject => {
						if (!responseObject.didCancel) {
							insertImage(responseObject.assets.map(v => v.uri));
							Modal.close();
						}
					},
				);
			},
		);
	};

	const isInterestsEmpty =
		data.community_interests.interests_etc.length == 0 &&
		data.community_interests.interests_hospital.length == 0 &&
		data.community_interests.interests_interior == 0 &&
		data.community_interests.interests_review == 0 &&
		data.community_interests.interests_trip == 0;

	const onPressFilter = () => {
		// console.log('data.community_interests', data.community_interests);
		richText.current?.dismissKeyboard(); //일반적인 input과 달리 RichText에서는 이와같이 키보드를 hide
		Modal.popInterestTagModal(
			'ReviewWrite',
			// data.community_interests == '카테고리 선택' ? [] : data.community_interests,
			data.community_interests,
			() => Modal.close(),
			() => Modal.close(),
			arg => {
				// console.log('arg', arg);
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

	React.useEffect(() => {
		let didshow = Keyboard.addListener('keyboardDidShow', e => {
			scrollRef.current.scrollTo({y: cursor - 30, duration: 100, animated: true});
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine);
			Platform.OS == 'android' ? setShowBtn(true) : false;
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			setKeyboardY(0);
			Platform.OS == 'android' ? setShowBtn(false) : false;
		});
		return () => {
			didshow.remove();
			didhide.remove();
		};
	});

	//선택한 카테고리 목록 Stringify 함수
	const getReviewCategory = list => {
		let category_text = '';
		list.interests_trip.map((v, i) => {
			category_text = category_text + v + ' / ';
		});
		list.interests_review.map((v, i) => {
			category_text = category_text + v + ' / ';
		});
		list.interests_interior.map((v, i) => {
			category_text = category_text + v + ' / ';
		});
		list.interests_hospital.map((v, i) => {
			category_text = category_text + v + ' / ';
		});
		list.interests_etc.map((v, i) => {
			category_text = category_text + v + ' / ';
		});
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
				style={[
					style.category_item_free,
					{
						backgroundColor: data.community_free_type == type ? APRI10 : GRAY40,
					},
				]}>
				<Text
					style={[
						txt.noto28,
						style.category_item_text,
						{
							color: data.community_free_type == type ? WHITE : GRAY10,
						},
					]}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	};

	const getReviewButtonContainer = () => {
		return (
			<>
				{/* <TouchableOpacity activeOpacity={0.6} onPress={onPressTempSave}>
					<View style={[style.buttonItem]}>
						<Save54 />
						<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>임시저장</Text>
					</View>
				</TouchableOpacity> */}
				<TouchableOpacity activeOpacity={0.6} onPress={onPressPhotoSelect}>
					<View style={[style.buttonItem]}>
						<Camera54 />
						<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>사진추가</Text>
					</View>
				</TouchableOpacity>
				{/* <TouchableOpacity activeOpacity={0.6} onPress={onPressAddVideo}>
							<View style={[style.buttonItem]}>
								<Camera54 />
								<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>영상 추가</Text>
							</View>
						</TouchableOpacity> */}
				<TouchableOpacity activeOpacity={0.6} onPress={moveToLocationPicker}>
					<View style={[style.buttonItem, {}]}>
						<Location54_APRI10 />
						<Text style={[txt.noto24, {color: APRI10, alignSelf: 'center', marginLeft: 10 * DP}]}>위치추가</Text>
					</View>
				</TouchableOpacity>
			</>
		);
	};

	const getArticleButtonContainer = () => {
		return (
			<TouchableOpacity activeOpacity={0.6} onPress={onPressPhotoSelect}>
				<View style={[style.buttonItem]}>
					<Camera54 />
					<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>사진추가</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const onPaste = paste => {
		console.log('paste', paste);
	};

	const moveToLocationPicker = () => {
		props.navigation.push('SearchMap', {data: data, isReview: isReview});
	};

	return (
		<View style={[style.container, {}]}>
			<ScrollView contentContainerStyle={[style.insideScrollView, {}]} ref={scrollRef} showsVerticalScrollIndicator={false}>
				{/* //제목 및 카테고리 선택 */}
				<TextInput onChangeText={onChangeTitle} style={[txt.noto30, style.title_text]} placeholder={'제목 입력...'} placeholderTextColor={GRAY20} />
				{isReview ? (
					<>
						<TouchableOpacity activeOpacity={0.6} onPress={onPressFilter} style={[style.category]}>
							<Text style={[txt.noto28, style.categoryText]} ellipsizeMode={'tail'} numberOfLines={1}>
								{isInterestsEmpty ? '카테고리 선택' : getReviewCategory(data.community_interests)}
							</Text>
							<View style={[style.nextMark]}>
								<NextMark_APRI />
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
				{/* 텍스트 입력 박스 */}
				<View style={[style.content, {}]}>
					{data.community_address.normal_address.address_name != '' ? (
						<View style={[style.location]}>
							<Location54_Filled />
							<Text style={[txt.noto26b, {color: APRI10, marginLeft: 10 * DP, width: 550 * DP}]}>
								{data.community_address.road_address.address_name.includes('도로명 주소가 없는 위치입니다') ||
								data.community_address.road_address.address_name == ''
									? data.community_address.normal_address.address_name
									: data.community_address.road_address.address_name}
							</Text>
						</View>
					) : (
						<></>
					)}
					{Platform.OS == 'android' ? (
						<ScrollView>
							<RichEditor
								ref={richText}
								editorStyle={{
									contentCSSText: 'font-size:14px;',
								}}
								onChange={onChange}
								onLayout={onLayout}
								style={{
									width: '100%',
									opacity: 0.99,
								}}
								placeholder={'서비스, 가성비, 위생, 특이사항, 위치등의 내용을 적어주세요! 후기는 자세할수록 좋아요.'}
								onCursorPosition={onCursorPosition}
								onPaste={onPaste}
								// onMessage={handleMessage}
							/>
						</ScrollView>
					) : (
						<>
							<RichEditor
								ref={richText}
								showSoftInputOnFocus={false}
								onFocus={() => setShowBtn(true)}
								onBlur={() => setShowBtn(false)}
								keyboardDisplayRequiresUserAction={true}
								editorStyle={{
									contentCSSText: 'font-size:14px;',
								}}
								onChange={onChange}
								style={{
									width: '100%',
									opacity: 0.99,
								}}
								placeholder={'서비스, 가성비, 위생, 특이사항, 위치등의 내용을 적어주세요! 후기는 자세할수록 좋아요.'}
								onCursorPosition={onCursorPosition}
								onPaste={onPaste}
								// onMessage={handleMessage2}
							/>
						</>
					)}
				</View>
				{/* 하단 버튼 컴포넌트  */}
				{isReview ? (
					<View style={[style.animalFilter_container]}>
						<View style={[style.animalFilter]}>
							<View style={[style.shadow]}>
								{!animalType.dog ? (
									<Animal_dog onPress={() => onPressAnimalFilter('dog')} />
								) : (
									<Animal_dog_off onPress={() => onPressAnimalFilter('dog')} />
								)}
							</View>
							<View style={[style.shadow]}>
								{!animalType.cat ? (
									<Animal_cat onPress={() => onPressAnimalFilter('cat')} />
								) : (
									<Animal_cat_off onPress={() => onPressAnimalFilter('cat')} />
								)}
							</View>
							<View style={[style.shadow]}>
								{!animalType.etc ? (
									<Animal_another onPress={() => onPressAnimalFilter('etc')} />
								) : (
									<Animal_another_off onPress={() => onPressAnimalFilter('etc')} />
								)}
							</View>
						</View>
					</View>
				) : (
					<></>
				)}
				{isReview ? (
					<View style={[style.buttonContainer, {opacity: showBtn == true ? 0 : 1}]}>{getReviewButtonContainer()}</View>
				) : (
					<View style={[style.buttonContainer, {justifyContent: 'flex-end', opacity: showBtn == true ? 0 : 1}]}>{getArticleButtonContainer()}</View>
				)}
			</ScrollView>
			{isReview ? (
				//키보드 영역 올라올 시 출력되야 하는 버튼 컨테이너 - 스타일 별도의 처리가 필요하여 분리 처리하였음
				<View
					style={[
						style.buttonContainer_keyboard,
						{justifyContent: 'space-between', bottom: Platform.OS == 'android' ? 0 : KeyboardY - 50, opacity: showBtn == false ? 0 : 1},
					]}>
					{getReviewButtonContainer()}
				</View>
			) : (
				<View style={[style.buttonContainer_keyboard, {bottom: Platform.OS == 'android' ? 0 : KeyboardY - 50, opacity: showBtn == false ? 0 : 1}]}>
					{getArticleButtonContainer()}
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
		width: 654 * DP,
		height: 82 * DP,
		paddingLeft: 24 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
	},
	category: {
		width: 654 * DP,
		height: 82 * DP,
		paddingLeft: 24 * DP,
		marginTop: 30 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		paddingVertical: 18 * DP,
		marginBottom: 30 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	category_free: {
		marginVertical: 30 * DP,
		width: 654 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
	},
	category_item_free: {
		width: 210 * DP,
		height: 82 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: APRI10,
	},
	category_item_text: {
		color: GRAY10,
	},
	categoryText: {
		color: APRI10,
		width: 500 * DP,
	},
	nextMark: {
		marginLeft: (654 - 558) * DP,
	},
	content: {
		width: 654 * DP,
		minHeight: 500 * DP,
		borderRadius: 24 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		padding: 17 * DP,
		paddingVertical: 20 * DP,
	},
	buttonContainer: {
		// backgroundColor: 'yellow',
		paddingVertical: 30 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		marginRight: 48 * DP,
		width: 442 * DP,
		justifyContent: 'space-between',
	},
	buttonContainer_keyboard: {
		// backgroundColor: 'yellow',
		paddingVertical: 15 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		width: 654 * DP,
		backgroundColor: 'white',
		justifyContent: 'flex-end',
		position: 'absolute',
	},
	buttonItem: {
		width: 160 * DP,
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
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15 * DP,
	},
	animalFilter_container: {
		width: 654 * DP,
	},
	animalFilter: {
		width: 396 * DP,
		marginTop: 20 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		justifyContent: 'space-between',
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
});
