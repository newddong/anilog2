import React from 'react';
import {txt} from 'Root/config/textstyle';
import {ActivityIndicator, Image, Linking, LogBox, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10} from 'Root/config/color';
import {FavoriteTag46_Filled, FavoriteTag48_Border, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import WebView from 'react-native-webview';
import Loading from 'Root/component/molecules/modal/Loading';
import {styles} from 'Root/component/atom/image/imageStyle';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {(bool:boolean)=>void)} props.onPressFavorite - 좋아요 클릭
 * @param {()=>void} props.onPressMeatball - 미트볼 클릭
 * @param {()=>void} props.onPressArticle - 내용 클릭
 * @param {string} props.route - 부모 컴포넌트 이름
 */
const ArticleContent = props => {
	LogBox.ignoreAllLogs();

	const [data, setData] = React.useState(props.data);
	const [load, setLoad] = React.useState(false);
	const [height, setHeight] = React.useState(0); // 게시글 내용의 Dynamic Height 수치

	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	const onPressMeatball = () => {
		props.onPressMeatball();
	};

	const onPressFavorite = bool => {
		setData({...data, community_is_favorite: bool});
		props.onPressFavorite(bool);
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

	const onPressImage = uri => {
		Modal.popPhotoListViewModal([uri]);
	};

	const getContents = () => {
		let contents = data.contents;
		console.log('contents', contents);
		return contents.map((v, i) => {
			if (v && v.image == null) {
				const r1 = v.replace(/&nbsp;/g, '');
				const r2 = r1.replace(/<br>/g, '');
				return (
					<Text key={i} style={[txt.noto28]}>
						{r2}
					</Text>
				);
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
				if (parseInt(event.nativeEvent.data) < 100 * DP) {
					setHeight(100 * DP);
				} else {
					height >= 100 * DP ? false : setHeight(parseInt(event.nativeEvent.data));
					console.log('height and : ', parseInt(event.nativeEvent.data));
				}
			}, 150);
		} else {
			if (parseInt(event.nativeEvent.data) < 100 * DP) {
				setHeight(100 * DP * DP);
			} else {
				height >= 100 * DP ? false : setHeight(parseInt(event.nativeEvent.data));
				console.log('parseInt(event.nativeEvent.data)', parseInt(event.nativeEvent.data));
			}
		}
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
			<View style={[style.profile]}>
				<UserLocationTimeLabel data={data.community_writer_id} time={data.community_date} time_expression={'full'} />
			</View>
			<View style={{width: 654 * DP, marginTop: 20 * DP}}>{getContents()}</View>

			{/* <View style={[{width: 700 * DP, marginTop: 20 * DP, opacity: height >= 99 * DP ? 1 : 1}]}>
				{Platform.OS == 'ios' ? (
					<WebView
						originWhitelist={['*']}
						onMessage={onWebViewMessage}
						injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)" //Dynamic Height 수치 설정
						onLoadEnd={() => setLoad(true)}
						contentMode={'mobile'}
						scrollEnabled={false}
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
					//안드로이드
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
							height: height == 0 ? 100 * DP : height,
							opacity: 0.99,
						}}
					/>
				)}
			</View> */}
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
