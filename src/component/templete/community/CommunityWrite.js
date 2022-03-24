import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TextInput, Platform, StatusBar, Keyboard, StyleSheet} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10, GRAY40} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP, {isNotch} from 'Root/config/dp';
import {Camera54, Location54_APRI10, Location54_Filled, NextMark_APRI, Save54} from 'Root/component/atom/icon/index';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'Component/modal/Modal';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {changeLocalPathToS3Path} from 'Root/api/community';
import {actions, RichEditor} from 'react-native-pell-rich-editor';

export default CommunityWrite = props => {
	const navigation = useNavigation();
	const isReview = props.route.params.isReview; //후기 게시글 여부 boolean
	const [data, setData] = React.useState('false');
	const [category, setCategory] = React.useState('카테고리 선택'); // 카테고리 선택 컨테이너
	const [location, setLocation] = React.useState(''); //위치 추가
	const [cursor, setCursor] = React.useState(0);
	const richText = React.useRef('');
	const scrollRef = React.useRef('');
	isReview ? navigation.setOptions({title: '후기 게시글'}) : navigation.setOptions({title: '자유 게시글'});

	React.useEffect(() => {
		const param = props.route.params;
		if (param?.addr) {
			//다른 주소 검색 결과값 적용
			setLocation(param.addr.road_address.address_name + ' / ' + param.addr.detailAddr); //다른 주소 검색 결과값 적용
		}
	}, [props.route.params]);

	const onChange = editorData => {
		console.log('editorData', editorData);
		setData(editorData);
		scrollRef.current.scrollTo({y: cursor - 30, duration: 100, animated: true});
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
		console.log('imageList', imageList);
		data != 'false' ? richText.current?.insertHTML('<p><br/></p></div>') : false; //이미지를 넣을 시 바로 다음줄로 이동하도록 처리
		const result = await changePath(imageList);
		result.map((v, i) => {
			richText.current?.insertImage(v.location, 'margin: 0.2em auto 0.2em; border-radius: 15px; width:200px; height:200px;');
			richText.current?.insertHTML('<p>&nbsp;<br/></p></div>');
		});
		richText.current?.focusContentEditor();
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

	const moveToLocationPicker = async () => {
		navigation.push('SearchMap');
	};

	const onPressFilter = () => {
		Modal.popInterestTagModal(
			'Review',
			category == '카테고리 선택' ? [] : category.userInterestReview,
			() => Modal.close(),
			() => Modal.close(),
			arg => {
				console.log('arg', arg);
				setCategory(arg);
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
		scrollRef.current.scrollTo({y: scrollY - 30, duration: 100, animated: true});
	};

	const onFocus = () => {
		console.log('cursor', cursor);
		// scrollRef.current.scrollTo({y: cursor - 30, duration: 100, animated: true});
	};

	React.useEffect(() => {
		let didshow = Keyboard.addListener('keyboardDidShow', e => {
			console.log('keyboarddidshow');
			scrollRef.current.scrollTo({y: cursor - 30, duration: 100, animated: true});
		});
		let didhide = Keyboard.addListener('keyboardDidHide', e => {
			console.log('keyboarddidhide');
		});
		let willshow = Keyboard.addListener('keyboardWillShow', e => {
			console.log('keyboardwillshow');
		});
		let willhide = Keyboard.addListener('keyboardWillHide', e => {
			console.log('keyboardwillhide');
		});
		return () => {
			didshow.remove();
			didhide.remove();
			willshow.remove();
			willhide.remove();
		};
	});

	return (
		<View style={[style.container]}>
			<ScrollView contentContainerStyle={[style.insideScrollView, {}]} ref={scrollRef} showsVerticalScrollIndicator={false}>
				{isReview ? (
					<></>
				) : (
					//제목 및 카테고리 선택
					<>
						<TextInput style={[txt.noto30, style.title_text]} placeholder={'제목 입력...'} placeholderTextColor={GRAY20} />
						<TouchableOpacity activeOpacity={0.6} onPress={onPressFilter} style={[style.category]}>
							<Text style={[txt.noto28, style.categoryText]} ellipsizeMode={'tail'} numberOfLines={1}>
								{category == '카테고리 선택'
									? category
									: category.selectedCity + ' / ' + category.selectedDistrict + ' / ' + category.userInterestReview.toString()}
							</Text>
							<View style={[style.nextMark]}>
								<NextMark_APRI />
							</View>
						</TouchableOpacity>
					</>
				)}
				{/* 텍스트 입력 박스 */}
				<View style={[style.content]}>
					{location != '' ? (
						<View style={[style.location]}>
							<Location54_Filled />
							<Text style={[txt.noto26b, {color: APRI10, marginLeft: 10 * DP}]}>{location}</Text>
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
							// maxHeight: 1000 * DP,
						}}
						placeholder={'서비스, 가성비, 위생, 특이사항, 위치등의 내용을 적어주세요! 후기는 자세할수록 좋아요.'}
						geolocationEnabled={true}
						onCursorPosition={onCursorPosition}
						onFocus={onFocus}
					/>
				</View>
				{/* 하단 버튼 컴포넌트  */}
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
});
