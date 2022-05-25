import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, LogBox, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLACK} from 'Root/config/color';
import {FavoriteTag46_Filled, FavoriteTag48_Border, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import {styles} from 'Root/component/atom/image/imageStyle';
import WebView from 'react-native-webview';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {useNavigation} from '@react-navigation/core';
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

	const onPressMeatball = () => {
		props.onPressMeatball();
	};

	const onPressFavorite = bool => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			setData({...data, community_is_favorite: bool});
			props.onPressFavorite(bool);
		}
	};

	const getArticleType = () => {
		switch (data.community_free_type) {
			case 'talk':
				return '잡담';
			case 'question':
				return '질문';
			case 'meeting':
				return '모임';
			default:
				break;
		}
	};

	const getContents = () => {
		let contents = data.contents;
		// console.log('contents', contents);
		return contents.map((v, i) => {
			if (v && v.image == null) {
				const r1 = v.replace(/&nbsp;/g, '');
				const r2 = r1.replace(/<br>/g, '');
				if (props.searchInput == undefined) {
					return (
						<Text key={i} style={[txt.noto28]}>
							{r2}
						</Text>
					);
				} else if (props.searchInput.length > 1) {
					console.log(props.searchInput);
					let split = r2.split(new RegExp(`(${props.searchInput})`, 'gi'));
					// console.log('split', split);
					return (
						<Text key={i} style={[txt.noto28]}>
							{split.map((part, ind) =>
								part.toLowerCase() === props.searchInput.toLowerCase() ? (
									// <View style={{backgroundColor: 'red'}}>{part}</View>
									<Text key={ind} style={[txt.noto28b, {color: APRI10, marginRight: 10 * DP}]}>
										{part + ''}
									</Text>
								) : (
									<Text key={ind} style={[txt.noto28, {marginRight: 10 * DP}]}>
										{part + ''}
									</Text>
								),
							)}
						</Text>
					);
				}
			} else if (v == undefined) {
				return <></>;
			} else {
				return (
					<TouchableOpacity key={i} activeOpacity={0.8} onPress={() => onPressImage(v.image)}>
						<Image style={[styles.img_square_round_654, {marginVertical: 10 * DP}]} source={{uri: v.image}} resizeMode={'stretch'} />
					</TouchableOpacity>
				);
			}
		});
	};

	const onWebViewMessage = async event => {
		if (Platform.OS == 'android') {
			setTimeout(() => {
				if (event.nativeEvent.data.includes('pinefriend.s3')) {
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
			// console.log('event.nativeEvent.data', event.nativeEvent.data);
			if (event.nativeEvent.data.includes('pinefriend.s3')) {
				// console.log('event.nativeEvent.data', event.nativeEvent.data);
				showImg(event.nativeEvent.data);
			} else if (parseInt(event.nativeEvent.data) < 100 * DP) {
				setHeight(100 * DP * DP);
			} else {
				height >= 100 * DP ? false : setHeight(parseInt(event.nativeEvent.data));
				// console.log('parseInt(event.nativeEvent.data)', parseInt(event.nativeEvent.data));
			}
		}
	};

	const runFirst = `
	  window.ReactNativeWebView.postMessage(document.body.scrollHeight);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

	const webviewRef = React.useRef();

	const changeHtmlTag = () => {
		let result = data.community_content;
		result = data.community_content.replace(/<img /g, '<img onclick="image(this)" ');
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

	const showImg = src => {
		Modal.popPhotoListViewModal([src]);
	};

	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<View style={[style.header_title]}>
					<Text style={[txt.noto32b, {color: APRI10}]}>
						{getArticleType()}
						{'  '}
					</Text>
					<Text numberOfLines={2} style={[txt.noto32b, {width: 485 * DP, height: 100 * DP}]}>
						{data.community_title}
					</Text>
				</View>
				<View style={[style.header_icon]}>
					{data.community_is_favorite ? (
						<FavoriteTag46_Filled onPress={() => onPressFavorite(false)} />
					) : (
						<FavoriteTag48_Border onPress={() => onPressFavorite(true)} />
					)}
					<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
				</View>
			</View>
			{data.community_writer_id ? (
				<View style={[style.profile]}>
					<UserLocationTimeLabel data={data.community_writer_id} time={data.community_date} time_expression={'full'} />
				</View>
			) : (
				<View style={[style.profile]}>
					<UserLocationTimeLabel empty={true} time={data.community_date} />
				</View>
			)}
			<View style={[{width: 700 * DP, marginTop: 20 * DP, opacity: height >= 99 * DP ? 1 : 1}]}>
				{Platform.OS == 'ios' ? (
					<WebView
						originWhitelist={['*']}
						onMessage={onWebViewMessage}
						ref={webviewRef}
						injectedJavaScript={runFirst} //Dynamic Height 수치 설정
						scrollEnabled={false}
						injectedJavaScriptBeforeContentLoaded={runFirst}
						source={{
							html: changeHtmlTag(),
						}}
						style={[
							style.webview,
							{
								height: height,
								// opacity: load ? 1 : 0,
							},
						]}
					/>
				) : (
					//안드로이드
					<WebView
						originWhitelist={['*']}
						ref={webviewRef}
						onMessage={onWebViewMessage}
						injectedJavaScript={runFirst} //Dynamic Height 수치 설정
						source={{
							html: changeHtmlTag(),
						}}
						style={{
							width: 670 * DP,
							height: height == 0 ? 100 * DP : height,
							opacity: 0.99,
						}}
					/>
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
		width: 654 * DP,
		alignSelf: 'center',
	},
	header: {
		flexDirection: 'row',
		width: 654 * DP,
		justifyContent: 'space-between',
	},
	header_title: {
		width: 544 * DP,
		flexDirection: 'row',
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	profile: {
		marginTop: 12 * DP,
	},
	hashText: {
		width: 634 * DP,
		marginTop: 10 * DP,
	},
	footer: {
		// flex: 1,
		width: 150 * DP,
		alignSelf: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	webview: {
		width: 670 * DP,
		// minHeight: 500 * DP,
	},
});
