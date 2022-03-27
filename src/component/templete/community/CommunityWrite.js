import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TextInput, Platform, StatusBar, Keyboard, StyleSheet} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10, GRAY40, BLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP, {isNotch} from 'Root/config/dp';
import {Camera54, Location54_APRI10, Location54_Filled, NextMark_APRI, Save54} from 'Root/component/atom/icon/index';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'Component/modal/Modal';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {changeLocalPathToS3Path} from 'Root/api/community';
import {actions, RichEditor} from 'react-native-pell-rich-editor';
import {Animal_another_off, Animal_cat_off, Animal_dog_off, Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';

export default CommunityWrite = props => {
	const navigation = useNavigation();
	const [data, setData] = React.useState({
		community_title: '',
		community_interests: '카테고리 선택',
		community_content: '',
		community_location: '',
		community_is_temporary: false,
		community_type: '',
	});
	const [animalType, setAnimalType] = React.useState({
		dog: false,
		cat: false,
		other: false,
	});
	const [cursor, setCursor] = React.useState(0);
	const richText = React.useRef('');
	const scrollRef = React.useRef('');

	React.useEffect(() => {
		props.navigation.setParams({data: data, nav: props.route.name});
	}, [data]);

	React.useEffect(() => {
		const param = props.route.params;
		if (param?.data) {
			//다른 주소 검색 결과값 적용
			// console.log('ddddd', JSON.stringify(param.data));
			const er = {
				community_title: 'Asd',
				community_interests: ['관광지', '펫카페', '놀이터'],
				community_content: '<div>asdsadsda</div>',
				community_location: false,
				community_type: '',
				location: {
					addr: {
						road_address: {
							address_name: '서울특별시 마포구 광성로4길 22-12',
							region_1depth_name: '서울',
							region_2depth_name: '마포구',
							region_3depth_name: '',
							road_name: '광성로4길',
							underground_yn: 'N',
							main_building_no: '22',
							sub_building_no: '12',
							building_name: '',
							zone_no: '04096',
						},
						address: {
							address_name: '서울 마포구 신수동 89-77',
							region_1depth_name: '서울',
							region_2depth_name: '마포구',
							region_3depth_name: '신수동',
							mountain_yn: 'N',
							main_address_no: '89',
							sub_address_no: '77',
							zip_code: '',
						},
						detailAddr: '',
					},
					region: {latitude: 37.54872100000001, longitude: 126.93712499999995},
				},
			};
			setData(param.data);
			// richText.current?.focusContentEditor();
		}
	}, [props.route.params]);

	const onChange = editorData => {
		console.log('editorData', editorData);
		setData({...data, community_content: editorData});
		scrollRef.current.scrollTo({y: cursor - 50, duration: 100, animated: true});
	};

	const onChangeTitle = title => {
		setData({...data, community_title: title});
	};

	const onPressAnimalFilter = kind => {
		switch (kind) {
			case 'dog':
				setAnimalType({...animalType, dog: !animalType.dog});
				let temp = data.filter;
				// data.filter.includes('dog') ? false : temp.push('dog')
				break;
			case 'cat':
				setAnimalType({...animalType, cat: !animalType.cat});
				break;
			case 'another':
				setAnimalType({...animalType, other: !animalType.other});
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

	//이미지 입력
	const insertImage = async imageList => {
		// console.log('imageList', imageList);
		data != 'false' ? richText.current?.insertHTML('<p><br/></p></div>') : false; //이미지를 넣을 시 바로 다음줄로 이동하도록 처리
		const result = await changePath(imageList);
		result.map((v, i) => {
			// richText.current?.insertImage(v.location, 'margin: 0.2em auto 0.2em; border-radius: 15px; width:150px; height:150px;');
			richText.current?.insertHTML('<p><br/></p></div>');
			richText.current?.insertHTML(
				`<img src="${v.location}" onclick="_.sendEvent('ImgClick')" \n
				contenteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "/>`,
			);
			richText.current?.insertHTML('<p><br/></p></div>');
		});
		// lineId = `line${lineNumber}`;
		// richText.current?.insertHTML(
		// 	`<div style="padding:10px 0;" contentEditable="false">
		//         <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/6FrNXgXlCGA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		//     </div>`,
		// );

		richText.current?.focusContentEditor();
	};

	let handleMessage = React.useCallback(({type, id, data}) => {
		let index = 0;
		switch (type) {
			case 'ImgClick':
				console.log('ddddd');
				break;
			case 'TitleClick':
				const color = ['red', 'blue', 'gray', 'yellow', 'coral'];
				richText.current?.commandDOM(`$('#${id}').style.color='${color[XMath.random(color.length - 1)]}'`);
				break;
			case 'SwitchImage':
				break;
		}
		// console.log('onMessage', type, id, data);
	}, []);

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

	const onPressFilter = () => {
		Modal.popInterestTagModal(
			'ReviewWrite',
			data.community_interests == '카테고리 선택' ? [] : data.community_interests,
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
		alert('onPressTempSave');
	};

	const onCursorPosition = scrollY => {
		setCursor(scrollY); //현재 커서가 최신화 되지 않던 현상 수정
		scrollRef.current.scrollTo({y: scrollY - 50, duration: 100, animated: true});
	};

	const onFocus = () => {
		console.log('cursor', cursor);
		// scrollRef.current.scrollTo({y: cursor - 30, duration: 100, animated: true});
	};

	React.useEffect(() => {
		let didshow = Keyboard.addListener('keyboardDidShow', e => {
			// console.log('keyboarddidshow');
			scrollRef.current.scrollTo({y: cursor - 30, duration: 100, animated: true});
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			// console.log('keyboarddidhide');
		});
		let willshow = Keyboard.addListener('keyboardWillShow', e => {
			// console.log('keyboardwillshow');
		});
		let willhide = Keyboard.addListener('keyboardWillHide', e => {
			// console.log('keyboardwillhide');
		});
		return () => {
			didshow.remove();
			didhide.remove();
			willshow.remove();
			willhide.remove();
		};
	});

	//선택한 카테고리 목록 Stringify 함수
	const getReviewCategory = list => {
		let category_text = '';
		list.map((v, i) => {
			category_text = category_text + v + ' / ';
		});
		return category_text;
	};

	const moveToLocationPicker = () => {
		props.navigation.push('SearchMap', data);
	};

	return (
		<View style={[style.container]}>
			<ScrollView contentContainerStyle={[style.insideScrollView, {}]} ref={scrollRef} showsVerticalScrollIndicator={false}>
				{/* //제목 및 카테고리 선택 */}
				<>
					<TextInput onChangeText={onChangeTitle} style={[txt.noto30, style.title_text]} placeholder={'제목 입력...'} placeholderTextColor={GRAY20} />
					<TouchableOpacity activeOpacity={0.6} onPress={onPressFilter} style={[style.category]}>
						<Text style={[txt.noto28, style.categoryText]} ellipsizeMode={'tail'} numberOfLines={1}>
							{data.community_interests == '카테고리 선택' ? data.community_interests : getReviewCategory(data.community_interests)}
						</Text>
						<View style={[style.nextMark]}>
							<NextMark_APRI />
						</View>
					</TouchableOpacity>
				</>
				{/* 텍스트 입력 박스 */}
				<View style={[style.content]}>
					{data.community_location != '' ? (
						<View style={[style.location]}>
							<Location54_Filled />
							<Text style={[txt.noto26b, {color: APRI10, marginLeft: 10 * DP}]}>
								{data.community_location.addr.road_address.address_name + ' / ' + data.community_location.addr.detailAddr}
							</Text>
							{/* location.addr.road_address.address_name + ' / ' + location.addr.detailAddr */}
						</View>
					) : (
						<></>
					)}
					<RichEditor
						ref={richText}
						editorStyle={{backgroundColor: WHITE, color: 'black'}}
						// initialContentHTML={'<p></p>'}
						onChange={onChange}
						initialHeight={500 * DP}
						style={{
							width: '100%',
						}}
						placeholder={'서비스, 가성비, 위생, 특이사항, 위치등의 내용을 적어주세요! 후기는 자세할수록 좋아요.'}
						geolocationEnabled={true}
						onCursorPosition={onCursorPosition}
						onMessage={handleMessage}
						onFocus={onFocus}
					/>
				</View>
				{/* 하단 버튼 컴포넌트  */}
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
							{!animalType.other ? (
								<Animal_another onPress={() => onPressAnimalFilter('another')} />
							) : (
								<Animal_another_off onPress={() => onPressAnimalFilter('another')} />
							)}
						</View>
					</View>
				</View>
				<View style={[style.buttonContainer]}>
					<TouchableOpacity activeOpacity={0.6} onPress={onPressTempSave}>
						<View style={[style.buttonItem]}>
							<Save54 />
							<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>임시저장</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} onPress={onPressPhotoSelect}>
						<View style={[style.buttonItem]}>
							<Camera54 />
							<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>사진추가</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} onPress={moveToLocationPicker}>
						<View style={[style.buttonItem, {}]}>
							<Location54_APRI10 />
							<Text style={[txt.noto24, {color: APRI10, alignSelf: 'center', marginLeft: 10 * DP}]}>위치추가</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
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
	categoryText: {
		color: APRI10,
		width: 500 * DP,
	},
	nextMark: {
		marginLeft: (654 - 558) * DP,
	},
	content: {
		width: 654 * DP,
		borderRadius: 24 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		padding: 17 * DP,
		paddingVertical: 20 * DP,
	},
	buttonContainer: {
		// backgroundColor: 'yellow',
		paddingVertical: 20 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		width: 654 * DP,
		justifyContent: 'space-between',
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
