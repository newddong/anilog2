import React from 'react';
import {txt} from 'Root/config/textstyle';
import {LogBox, Platform, StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY40} from 'Root/config/color';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import WebView from 'react-native-webview';
import Modal from 'Root/component/modal/Modal';
import {useNavigation} from '@react-navigation/core';
import AutoHeightWebView from 'Root/module/AutoHeightWebview';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {(bool:boolean)=>void)} props.onPressFavorite - 좋아요 클릭
 * @param {()=>void} props.onPressMeatball - 미트볼 클릭
 * @param {()=>void} props.onPressArticle - 내용 클릭
 * @param {string} props.route - 부모 컴포넌트 이름
 * @param {string} props.searchInput - 검색 키워드
 */
const ArticleContent = props => {
	LogBox.ignoreAllLogs();
	const navigation = useNavigation();
	const [data, setData] = React.useState(props.data);
	const [height, setHeight] = React.useState(0); // 게시글 내용의 Dynamic Height 수치

	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	const showImg = src => {
		Modal.popPhotoListViewModal([src], () => Modal.close());
	};

	const onWebViewMessage = async event => {
		if (Platform.OS == 'android') {
			setTimeout(() => {
				if (event.nativeEvent.data.includes('amazonaws.com')) {
					// console.log('event.nativeEvent.data', event.nativeEvent.data);
					showImg(event.nativeEvent.data);
				} else if (parseInt(event.nativeEvent.data) < 100 * DP) {
					setHeight(100 * DP);
				} else {
					height >= 100 * DP ? false : setHeight(parseInt(event.nativeEvent.data));
					// console.log('height and : ', parseInt(event.nativeEvent.data));
				}
			}, 150);
		} else {
			// console.log('event IOS : ', JSON.stringify(event._dispatchInstances._debugOwner.memoizedProps));
			console.log('event.nativeEvent.data', event.nativeEvent.data);
			if (event.nativeEvent.data.includes('amazonaws.com')) {
				// console.log('event.nativeEvent.data', event.nativeEvent.data);
				showImg(event.nativeEvent.data);
			} else if (parseInt(event.nativeEvent.data) < 100 * DP) {
				setHeight(100 * DP);
			} else {
				height >= 100 * DP ? false : setHeight(parseInt(event.nativeEvent.data));
				// console.log('parseInt(event.nativeEvent.data)', parseInt(event.nativeEvent.data));
			}
		}
	};

	const runFirst = `
	window.ReactNativeWebView.postMessage(document.body.scrollHeight);
    true; 
    `;

	const webviewRef = React.useRef();

	const changeHtmlTag = () => {
		// console.log('community_content', data.community_content);
		let result = data.community_content;
		result = data.community_content.replace(
			/<img /g,
			`<img onclick="image(this)"  style="height:auto; width:${
				Platform.OS == 'android' ? 694 * DP : 694 * DP
			};  border-radius:15px; object-fit:contain; margin:5px 0px 0px 0px; " `,
		);
		// console.log('data Content', data.community_content);
		// console.log('result', result);
		return `
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
        <script>
            function image(img){
                window.ReactNativeWebView.postMessage(img.src);
				// alert(img.src)
            }
        </script>
        ${result}
    `;
	};

	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<View style={[style.header_title]}>
					<Text numberOfLines={2} style={[txt.noto32b, {width: 694 * DP, maxHeight: 100 * DP, marginBottom: 20 * DP}]}>
						{data.community_title}
					</Text>
				</View>
			</View>
			<View style={[style.separator]}></View>

			{data.community_writer_id ? (
				<View style={[style.profile]}>
					<UserLocationTimeLabel data={data.community_writer_id} time={data.community_date} time_expression={'full'} />
				</View>
			) : (
				<View style={[style.profile]}>
					<UserLocationTimeLabel empty={true} time={data.community_date} />
				</View>
			)}
			<View style={[{width: 700 * DP, marginTop: 20 * DP, opacity: height >= 99 * DP ? 1 : 1, flex: 1}]}>
				{/* IOS환경에서 Height가 최신화 되지 않던 현상 발견. 관련 라이브러리 참조하여 커스텀 컴포넌트 활용  */}
				{Platform.OS == 'ios' ? (
					// <WebView
					// 	originWhitelist={['*']}
					// 	ref={webviewRef}
					// 	onMessage={onWebViewMessage}
					// 	injectedJavaScript={runFirst} //Dynamic Height 수치 설정
					// 	scrollEnabled={false}
					// 	source={{html: changeHtmlTag()}}
					// 	style={[style.webview, {height: height}]}
					// />
					<AutoHeightWebView
						style={{width: 694 * DP, marginTop: 30 * DP}}
						customScript={runFirst}
						scrollEnabled={false}
						// onSizeUpdated={size => console.log('size.height', size.height)}
						files={[{href: 'cssfileaddress', type: 'text/css', rel: 'stylesheet'}]}
						onMessage={onWebViewMessage}
						ref={webviewRef}
						source={{html: changeHtmlTag()}}
						scalesPageToFit={true}
						viewportContent={'width=device-width, user-scalable=no'}
					/>
				) : (
					//안드로이드
					<WebView
						originWhitelist={['*']}
						ref={webviewRef}
						onMessage={onWebViewMessage}
						injectedJavaScript={runFirst} //Dynamic Height 수치 설정
						source={{html: changeHtmlTag()}}
						style={{
							width: 724 * DP,
							left: -14 * DP,
							height: height == 0 ? 100 * DP : height,
							opacity: 0.99,
							// backgroundColor: 'yellow',
						}}
					/>
					// <AutoHeightWebView
					// 	style={{width: 670 * DP, marginTop: 30 * DP}}
					// 	customScript={runFirst}
					// 	scrollEnabled={false}
					// 	onSizeUpdated={size => console.log('size.height', size.height)}
					// 	files={[{href: 'cssfileaddress', type: 'text/css', rel: 'stylesheet'}]}
					// 	onMessage={onWebViewMessage}
					// 	ref={webviewRef}
					// 	source={{html: changeHtmlTag()}}
					// 	scalesPageToFit={true}
					// 	viewportContent={'width=device-width, user-scalable=no'}
					// />
				)}
			</View>
		</View>
	);
};

ArticleContent.defaultProps = {
	onPressFavorite: () => {},
	onPressMeatball: () => {},
	onPressArticle: () => {},
};
export default ArticleContent;

const style = StyleSheet.create({
	container: {
		width: 694 * DP,
		alignSelf: 'center',
	},
	header: {
		flexDirection: 'row',
		width: 694 * DP,
		justifyContent: 'space-between',
	},
	header_title: {
		width: 694 * DP,
		flexDirection: 'row',
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	separator: {
		width: 694 * DP,
		height: 2 * DP,
		backgroundColor: GRAY40,
	},
	profile: {
		marginTop: 18 * DP,
	},
	webview: {
		width: 670 * DP,
		backgroundColor: 'red',
		// minHeight: 500 * DP,
	},
});
