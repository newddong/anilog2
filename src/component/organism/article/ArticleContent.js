import React from 'react';
import {txt} from 'Root/config/textstyle';
import {ActivityIndicator, Linking, LogBox, Platform, StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10} from 'Root/config/color';
import {FavoriteTag46_Filled, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import WebView from 'react-native-webview';
import Loading from 'Root/component/molecules/modal/Loading';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressFavorite - 좋아요 클릭
 * @param {()=>void} props.onPressMeatball - 미트볼 클릭
 * @param {()=>void} props.onPressArticle - 내용 클릭
 * @param {string} props.route - 부모 컴포넌트 이름
 */
const ArticleContent = props => {
	LogBox.ignoreAllLogs();

	const data = props.data;
	const [height, setHeight] = React.useState(0); // 게시글 내용의 Dynamic Height 수치
	// console.log('ArticleContent', props.data);

	const onPressMeatball = () => {
		props.onPressMeatball();
	};

	const onPressFavorite = () => {
		props.onPressFavorite();
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

	const onWebViewMessage = async event => {
		if (Platform.OS == 'android') {
			setTimeout(() => {
				if (parseInt(event.nativeEvent.data) < 300) {
					setHeight(300 * DP);
				} else {
					height >= 300 ? false : setHeight(parseInt(event.nativeEvent.data));
					console.log('height and : ', parseInt(event.nativeEvent.data));
				}
			}, 300);
		} else {
			if (parseInt(event.nativeEvent.data) < 300) {
				setHeight(300 * DP);
			} else {
				height >= 300 ? false : setHeight(parseInt(event.nativeEvent.data));
				console.log('parseInt(event.nativeEvent.data)', parseInt(event.nativeEvent.data));
			}
		}
	};

	const [load, setLoad] = React.useState(false);

	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<View style={[style.header_title]}>
					<Text style={[txt.noto32b, {color: APRI10}]}>
						{getArticleType()}
						{'  '}
					</Text>
					<View>
						<Text numberOfLines={2} style={[txt.noto32b, {width: 450 * DP, height: 100 * DP}]}>
							{data.community_title}
						</Text>
					</View>
				</View>
				<View style={[style.header_icon]}>
					<FavoriteTag46_Filled onPress={onPressFavorite} />
					<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
				</View>
			</View>
			<View style={[style.profile]}>
				<UserLocationTimeLabel data={data.community_writer_id} time={data.community_date} />
			</View>
			<View style={[{width: 700 * DP, marginTop: 20 * DP, opacity: height >= 300 * DP ? 1 : 0}]}>
				{Platform.OS == 'ios' ? (
					<WebView
						originWhitelist={['*']}
						onMessage={onWebViewMessage}
						injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)" //Dynamic Height 수치 설정
						onLoadEnd={() => setLoad(true)}
						contentMode={'mobile'}
						source={{
							html: `
        	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
			${data.community_content} 
        `,
						}}
						style={[
							style.webview,
							{
								height: height,
								opacity: load ? 1 : 0,
							},
						]}
					/>
				) : (
					<WebView
						originWhitelist={['*']}
						scalesPageToFit={true}
						onLoadEnd={() => setLoad(true)}
						onMessage={onWebViewMessage}
						injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)" //Dynamic Height 수치 설정
						source={{
							html: `
        	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
			${data.community_content} 
        `,
						}}
						style={{
							width: 670 * DP,
							height: height == 0 ? 300 * DP : height,
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
