import React from 'react';
import {Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Modal from 'Root/component/modal/Modal';
import {APRI10, BLACK, BLUE10, BLUE20, GRAY10, GRAY30, GRAY40, WHITE} from 'Root/config/color';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useWindowDimensions} from 'react-native';
import WebView from 'react-native-webview';

// Manual - https://github.com/wxik/react-native-rich-editor
// 1. 가능한 기능 - 이미지 넣기, 글자 Bold, 글자 기울기, 링크추가, 글자 가운데줄 추가, 언더라인 추가, 비디오 추가, 라디오박스 추가, 작업되돌리기, 작업 앞으로 돌리기
// 2. 데이터 형태 Dom
//  - 예시)  <b>World</b> <p>this is a newe</p><br><div style="width: 127px; height: 299px">
//          <video src="http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" poster="http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny-thumbnail"
//          controls=""><source src="http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" type="video/mp4">No video tag support</video></div><div>ㄴㅇㅇdasdd
//          <i>dssdda</i>asd</div><p>&nbsp;paragraph</p> <p>this is another new paragraph</p>
// 3. 커스텀 아이콘 및 이벤트 가능
// 4. 사진은 사이즈 스타일 가능, 비디오는 사이즈 스타일링 불가능(마진은 가능)
// 5. 텍스트칼라는 변경이 가능하지만 DOM에 적용이 되질 않음 즉 모든 텍스트의 칼라가 바뀜.

const WriteEditorTest = () => {
	const richText = React.useRef();
	const scrollRef = React.useRef();
	const [data, setData] = React.useState('false');

	const onChange = editorData => {
		console.log('editorData', editorData);

		setData(editorData);
	};

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
						let tempContainer = [...selectedImg];
						tempContainer.push(images.path);
						insertImage(tempContainer.slice(-5));
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
							insertImage(tempContainer.slice(-5));
							Modal.close();
						}
					},
				);
			},
		);
	};

	const insertImage = imageList => {
		const sec = 'https://ichef.bbci.co.uk/news/660/cpsprodpb/DCE1/production/_104454565_mary-mcgowan_caught-in-the-act_00001294.jpg';
		data != 'false' ? richText.current?.insertHTML('<p><br/></p></div>') : false; //이미지를 넣을 시 바로 다음줄로 이동하도록 처리

		//이미지 입력
		// console.log('imageList', imageList);
		// imageList.map((v, i) => {
		// 	richText.current?.insertImage(v, 'margin: 0.2em auto 0.2em; ');
		// });
		// richText.current?.insertImage(sec, 'margin: 0.2em auto 0.2em; width:200px; height:200px;  ');
		const er = [
			'file:///Users/sangwoo/Library/Developer/CoreSimulator/Devices/CF9EEFF7-5DB8-4052-B8E3-F7C49AD98B82/data/Containers/Data/Application/D879842E-A155-4CBF-8F59-B1D69F7B8C71/tmp/FAFA055F-AA9D-4F2B-B34E-C9F9DC1B1C25.jpg',
		];
		richText.current?.insertImage(er[1], 'margin: 0.2em auto 0.2em; width:200px; height:200px; ');
		richText.current?.insertImage(sec, 'margin: 0.2em auto 0.2em; width:200px; height:200px; ');

		data != 'false' ? richText.current?.insertHTML('<p><br/></p></div>') : false; //이미지를 넣을 시 바로 다음줄로 이동하도록 처리
		richText.current?.focusContentEditor();
	};

	const insertVideo = () => {
		// richText.current?.insertVideo('http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', 'margin: 0.5em auto 0.5em; width: 299px; height: 299px');
		richText.current?.insertVideo('http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', 'margin: 0.5em auto 0.5em;');
		richText.current?.insertHTML('<p><br/></p>'); //비디오를 넣을 시 바로 다음줄로 이동하도록 처리
		richText.current?.focusContentEditor();
	};

	//현재 스크롤의 상태를 반영
	const onCursorPosition = scrollY => {
		scrollRef.current.scrollTo({y: scrollY - 30, duration: 100, animated: true});
	};
	const [selectedImg, setSelectedImg] = React.useState([]); //사진 uri리스트

	return (
		<View style={{flex: 1, backgroundColor: '#fff'}}>
			<RichToolbar
				editor={richText}
				actions={[
					actions.insertImage, //이미지
					actions.setBold, //굵기
					actions.setItalic, // 기울임
					actions.insertBulletsList, //점추가
					actions.insertOrderedList, //번호추가
					actions.insertLink, // 링크 추가
					actions.setStrikethrough, //가운데 줄 추가
					actions.setUnderline, //언더라인
					actions.removeFormat, //
					actions.insertVideo, // 비디오 추가
					actions.checkboxList, //라디오박스 추가
					actions.undo, // 작업 되돌리기
					actions.redo, // 작업 앞으로 돌리기
					'customAction',
				]}
				iconSize={15}
				style={[{backgroundColor: 'white'}]}
				iconMap={{
					['customAction']: ({}) => (
						<View>
							<Image
								source={{uri: 'https://icon-library.com/images/font-color-icon/font-color-icon-4.jpg'}}
								style={[{width: 42 * DP, height: 42 * DP}]}></Image>
						</View>
					),
					//커스텀 아이콘
					[actions.insertVideo]: ({tintColor}) => (
						<TouchableOpacity onPress={insertVideo}>
							<Image source={require('../../atom/icon/video.png')} style={[{width: 64 * DP, height: 64 * DP, backgroundColor: 'lightgray'}]}></Image>
						</TouchableOpacity>
					),
				}}
				customAction={handleCustomAction}
				//커스텀 툴바
				// renderAction={(action, selected) => {
				//     // console.log('action', action);
				//     // console.log('selected', selected);
				//     return (
				//         <View>
				//             <Text>[{action}]</Text>
				//         </View>
				//     );
				// }}
				onPressAddImage={insertImage}
				selectedIconTint={APRI10}
			/>
			<ScrollView contentContainerStyle={{backgroundColor: '#fff', alignItems: 'center'}} ref={scrollRef} showsVerticalScrollIndicator={false}>
				<RichEditor
					// useContainer={false}
					editorStyle={{backgroundColor: GRAY40, color: 'black'}}
					initialContentHTML={'<p></p>'}
					onChange={onChange}
					initialHeight={500 * DP}
					style={{
						paddingHorizontal: 20 * DP,
						minHeight: 500 * DP,
						width: '100%',
					}}
					placeholder={'place'}
					geolocationEnabled={true}
					onCursorPosition={onCursorPosition}
					ref={richText}></RichEditor>
				<View style={[{width: 700 * DP, marginTop: 20}]}>
					<WebView
						originWhitelist={['*']}
						source={{
							html: `
        	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
			${data} 
        `,
						}}
						style={styles.webview}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default WriteEditorTest;

const styles = StyleSheet.create({
	webview: {
		width: 700 * DP,
		height: 1000 * DP,
		backgroundColor: 'yellow',
	},
});
