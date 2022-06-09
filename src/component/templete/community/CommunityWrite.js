import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TextInput, Platform, StatusBar, Keyboard, StyleSheet, Image} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10, GRAY40, BLACK, MAINBLACK, GRAY50} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP, {isNotch} from 'Root/config/dp';
import {Camera54, Location54, Location54_APRI10, Location54_Filled, NextMark, NextMark_APRI, Save54} from 'Root/component/atom/icon/index';
import Modal from 'Component/modal/Modal';
import {useNavigation} from '@react-navigation/native';
import {changeLocalPathToS3Path} from 'Root/api/community';
import {RichEditor} from 'react-native-pell-rich-editor';
import AnimalButton from 'Root/component/molecules/button/AnimalButton';
import {WRITE_FREE_INFO, WRITE_REVIEW_INFO} from 'Root/i18n/msg';

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
		width: 630 * DP,
		x: 0,
		y: 0,
	});

	React.useEffect(() => {
		props.navigation.setParams({data: data, nav: 'CommunityWrite'});
	}, [data]);

	React.useEffect(() => {
		isReview ? navigation.setOptions({title: '리뷰'}) : navigation.setOptions({title: '자유 게시글'});
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

	//Rich Editor 레이아웃
	const onLayout = e => {
		setEditorLayout(e.nativeEvent.layout);
	};

	// fill	기본값. 주어진 너비와 높이에 딱 맞도록 사이즈를 조절합니다. 이미지의 가로세로 비율은 유지되지 않아요.
	// contain	가로세로 비율을 유지한 채로 사이즈가 조절되지만, 이미지와 컨테이너 간의 비율이 맞지 않는 경우엔 자리가 남게 됩니다.
	// cover	가로세로 비율을 유지한 채로 사이즈가 조절되며, 비율이 맞지 않더라도 이미지를 확대해 컨테이너를 완전히 채웁니다.
	// none	아무것도 하지 않고 본래의 이미지 사이즈를 유지합니다. 그래도 이미지 가운데가 보여지도록 하는 센스가 있어요.
	// scale-down	none 또는 contain 중에 더 적절한 방향으로 이미지 사이즈를 조절합니다.

	//이미지 입력
	const insertImage = imageList => {
		console.log('imageList', imageList);
		console.log('editorLayout.width', editorLayout.width);
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
							  style="height:auto; width:${editorLayout.width};  border-radius:15px; object-fit:contain;  margin:5px 0px 5px 0px; "/></div>`,
							);
							if (i == result.msg.length - 1) {
								setTimeout(() => {
									richText.current?.insertHTML('<p><br/></p></div>');
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
	const onPressPhotoSelect = () => {
		props.navigation.push('MultiPhotoSelect', {prev: {name: props.route.name, key: props.route.key}});
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
		Modal.popReviewFilterModal(
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
		let willshow = Keyboard.addListener('keyboardWillShow', e => {
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine);
			Platform.OS == 'android' ? setShowBtn(true) : setShowBtn(true);
		});
		let didshow = Keyboard.addListener('keyboardDidShow', e => {
			setKeyboardY(e.endCoordinates.height + KeyboardBorderLine);
			Platform.OS == 'android' ? setShowBtn(true) : setShowBtn(true);
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			setKeyboardY(0);
			Platform.OS == 'android' ? setShowBtn(false) : setShowBtn(false);
		});
		let willhide = Keyboard.addListener('keyboardWillHide', e => {
			setKeyboardY(0);
			Platform.OS == 'android' ? setShowBtn(false) : setShowBtn(false);
		});
		return () => {
			willshow.remove();
			willhide.remove();
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
				style={[style.category_item_free, {backgroundColor: data.community_free_type == type ? MAINBLACK : GRAY40}]}>
				<Text style={[txt.noto28, {color: data.community_free_type == type ? WHITE : GRAY10}]}>{text}</Text>
			</TouchableOpacity>
		);
	};

	const getReviewButtonContainer = () => {
		return (
			<>
				<TouchableOpacity activeOpacity={0.6} onPress={onPressPhotoSelect}>
					<View style={[style.buttonItem_review]}>
						<Camera54 />
						{/* <Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>사진추가</Text> */}
					</View>
				</TouchableOpacity>
				{/* <TouchableOpacity activeOpacity={0.6} onPress={onPressAddVideo}>
							<View style={[style.buttonItem]}>
								<Camera54 />
								<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>영상 추가</Text>
							</View>
						</TouchableOpacity> */}
				<View style={{height: 38 * DP, width: 2 * DP, backgroundColor: GRAY10, alignSelf: 'center', marginHorizontal: 30 * DP}}></View>
				<TouchableOpacity activeOpacity={0.6} onPress={moveToLocationPicker}>
					<View style={[style.buttonItem_review, {}]}>
						<Location54 />
						{/* <Text style={[txt.noto24, {color: APRI10, alignSelf: 'center', marginLeft: 10 * DP}]}>위치추가</Text> */}
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
					<Text style={[txt.noto28b, {marginLeft: 10 * DP}]}>사진추가</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const onPaste = paste => {
		console.log('paste', paste);
		if (paste == '') {
			Modal.alert('이미지 붙여넣기는 불가합니다.');
		}
	};

	const removeEditor = () => {
		richText.current.dismissKeyboard();
	};

	const moveToLocationPicker = () => {
		props.navigation.push('CommunityLocationPicker', {data: data, isReview: isReview});
	};

	return (
		<View style={[style.container, {}]}>
			<ScrollView contentContainerStyle={[style.insideScrollView, {}]} ref={scrollRef} showsVerticalScrollIndicator={false}>
				{/* //제목 및 카테고리 선택 */}
				{isReview ? (
					<>
						<TouchableOpacity activeOpacity={0.6} onPress={onPressFilter} style={[style.category]}>
							<Text style={[txt.noto28, style.categoryText]} ellipsizeMode={'tail'} numberOfLines={1}>
								{isInterestsEmpty ? '카테고리 선택' : getReviewCategory(data.community_interests)}
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
					placeholder={'제목 입력'}
					placeholderTextColor={GRAY20}
				/>
				{/* 텍스트 입력 박스 */}
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity onPress={removeEditor} activeOpacity={1} style={{width: 48 * DP}}></TouchableOpacity>
					<View style={[style.content, {}]}>
						{data.community_address.normal_address.address_name != '' ? (
							<View style={[style.location]}>
								<Location54 />
								<Text style={[txt.noto26b, {color: MAINBLACK, marginLeft: 10 * DP, width: 580 * DP}]}>
									{data.community_address.road_address.address_name.includes('도로명 주소가 없는 위치입니다') ||
									data.community_address.road_address.address_name == 'undefined '
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
									editorStyle={{contentCSSText: 'font-size:14px;', backgroundColor: '#FAFAFA'}}
									onChange={onChange}
									onLayout={onLayout}
									keyboardDisplayRequiresUserAction={true}
									style={{width: '100%', opacity: 0.99}}
									placeholder={isReview ? WRITE_REVIEW_INFO : WRITE_FREE_INFO}
									onCursorPosition={onCursorPosition}
									onPaste={onPaste}
									pasteAsPlainText={true}
								/>
							</ScrollView>
						) : (
							<View style={{flexDirection: 'row'}}>
								<RichEditor
									ref={richText}
									keyboardDisplayRequiresUserAction={true}
									editorStyle={{contentCSSText: 'font-size:14px;', backgroundColor: '#FAFAFA'}}
									onChange={onChange}
									style={{width: '100%', opacity: 0.99}}
									contentMode={'mobile'}
									placeholder={isReview ? WRITE_REVIEW_INFO : WRITE_FREE_INFO}
									onCursorPosition={onCursorPosition}
									onPaste={onPaste}
									pasteAsPlainText={true}
								/>
							</View>
						)}
					</View>
					<TouchableOpacity activeOpacity={1} onPress={removeEditor} style={{width: 48 * DP}}></TouchableOpacity>
				</View>
				{/* 하단 버튼 컴포넌트  */}
				{isReview ? (
					<View style={[style.animalFilter_container]}>
						<View style={[style.animalFilter]}>
							<View style={[style.buttonContainer_review, {opacity: showBtn == true ? 0 : 1, zIndex: 1}]}>{getReviewButtonContainer()}</View>
							<View style={{flexDirection: 'row', width: 399 * DP, justifyContent: 'space-between'}}>
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
				{isReview ? (
					<></>
				) : (
					<View style={[style.buttonContainer, {justifyContent: 'flex-start', opacity: showBtn == true ? 0 : 1}]}>{getArticleButtonContainer()}</View>
				)}
				<View style={{height: 100}} />
			</ScrollView>
			{isReview ? (
				//키보드 영역 올라올 시 출력되야 하는 버튼 컨테이너 - 스타일 별도의 처리가 필요하여 분리 처리하였음
				<View
					style={[
						style.buttonContainer_keyboard_review,
						{
							// justifyContent: 'space-between',
							bottom: Platform.OS == 'android' ? 0 : KeyboardY,
							opacity: showBtn == false ? 0 : 1,
							zIndex: showBtn ? 3 : -1,
						},
					]}>
					{getReviewButtonContainer()}
				</View>
			) : (
				<View style={[style.buttonContainer_keyboard, {bottom: Platform.OS == 'android' ? 0 : KeyboardY, opacity: showBtn == false ? 0 : 1}]}>
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
		paddingLeft: 30 * DP,
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
		paddingVertical: 40 * DP,
		paddingHorizontal: 24 * DP,
		flexDirection: 'row',
		width: 694 * DP,
		// backgroundColor: 'yellow',
		justifyContent: 'space-between',
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
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15 * DP,
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
});
