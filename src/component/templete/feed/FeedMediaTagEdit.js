import React from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Platform,
	PermissionsAndroid,
	SafeAreaView,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Image,
	Alert,
} from 'react-native';
import FeedMedia from 'Molecules/media/FeedMedia';
import {login_style, temp_style, feedMediaTagEdit} from 'Templete/style_templete';
import {APRI10, BLACK, GRAY10, RED10, WHITE} from 'Root/config/color';
import {useNavigationState} from '@react-navigation/native';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';
import Tag from 'Root/component/molecules/tag/Tag';
import Swiper from 'react-native-swiper';

export default FeedMediaTagEdit = props => {
	const navState = useNavigationState(state => state);
	// console.log(props.route.params);
	console.log('네비게이션', navState);

	const feedData = navState.routes[navState.index - 1].params;

	const onMakeTag = (tag, uri) => {
		console.log(uri + '   make   ' + JSON.stringify(tag));
		feedData.media_uri.forEach((v, i, a) => {
			let newtag = {x: tag.x, y: tag.y, user: tag.user};
			if (v.uri === uri) {
				a[i].tags ? a[i].tags.push(newtag) : (a[i].tags = [newtag]);
			}
		});
	};
	const onDeleteTag = (user, uri) => {
		console.log(uri + '   del   ' + JSON.stringify(user));
		feedData.media_uri.forEach((v, i, a) => {
			if (v.uri === uri) {
				v.tags.forEach((v, i, a) => {
					if (v.user._id === user._id) {
						a.splice(i, 1);
					}
				});
			}
		});
	};

	const renderItems = () => {
		if (!feedData) return false;
		return feedData.media_uri.map((v, i) => (
			<PhotoTagItem style={lo.box_img} uri={v} data={v} key={i} onMakeTag={onMakeTag} onDeleteTag={onDeleteTag} viewmode={false} />
		));
	};
	return (
		<View style={lo.wrp_main}>
			<View style={lo.box_img_tag}>
				<Swiper
					activeDotColor={APRI10}
					showsButtons={false}
					autoplay={false}
					loop={false}
					removeClippedSubviews={false}
					scrollEventThrottle={16}
					renderPagination={(index, total, context) => {
						// console.log('context', context);
						if(!feedData)return false;
						return feedData.media_uri.length == 1 ? (
							<></>
						) : (
							<View
								style={{
									bottom: -50 * DP,
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'space-between',
									width: 28 * feedData.media_uri.length * DP,
									height: 24 * DP,
									// backgroundColor: 'green',
									flexDirection: 'row',
									position: 'absolute',
								}}>
								{feedData.media_uri.map((data, idx) => {
									return (
										<View
											key={idx}
											style={[
												{
													alignSelf: 'center',
													width: 14 * DP,
													height: 14 * DP,
													backgroundColor: index == idx ? APRI10 : GRAY10,
													borderRadius: 50 * DP,
												},
											]}></View>
									);
								})}
							</View>
						);
					}}
					horizontal={true}>
					{renderItems()}
				</Swiper>
			</View>
			<View style={lo.box_explain}>
				<Text style={txt.noto28r}>사진 속 인물이나 동물을 눌러 태그하세요</Text>
				<Text style={txt.noto28r}>다시 눌러 삭제가 가능합니다.</Text>
				<Text style={txt.noto28r}>누른 상태에서 움직이면 위치가 이동합니다.</Text>
				{/* <TouchableWithoutFeedback onPress={test}>
				<View style={{height:80*DP,width:80*DP,backgroundColor:'green'}}></View>
				</TouchableWithoutFeedback> */}
			</View>
		</View>
	);
};

const PhotoTagItem = ({style, uri, data, onMakeTag, onDeleteTag, viewmode}) => {
	const [tags, setTags] = React.useState(data.tags ? data.tags : []);
	const [showTags, setShowTags] = React.useState(!viewmode);
	const nav = useNavigation();
	const route = useRoute();
	const clickedPost = React.useRef({x: -1, y: -1});

	const makeTag = e => {
		clickedPost.current = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY};
		console.log(clickedPost.current);
		!viewmode && nav.push('UserList', {navfrom: route.name});
	};

	const deleteTag = user => {
		onDeleteTag && onDeleteTag(user, uri);
		setTags(tags.filter(v => v.user._id !== user._id));
	};

	React.useEffect(() => {
		if (clickedPost.current.x < 0 || clickedPost.current.y < 0) return;

		if (route.params?.selectedUser) {
			let newTag = {x: clickedPost.current.x, y: clickedPost.current.y, user: route.params.selectedUser};
			setTags(tags.filter(v => v.user._id !== route.params.selectedUser._id).concat(newTag));
			clickedPost.current = {x: -1, y: -1};
			onMakeTag && onMakeTag(newTag, uri);
		}
	}, [route]);

	const test = async () => {
		console.log(tags);
		setShowTags(!showTags);
		// let a =  await axios.post(serveruri + '/user/test', {array: tags});
		// console.log(a);
	};

	const endTagmove = e => {
		// console.log(e);
		tags.forEach((v, i, a) => {
			if (v.user._id === e.user._id) a.splice(i, 1, e);
		});
	};
	const [backgroundLayout, setBackgroundLayout] = React.useState({width: 750 * DP, height: 750 * DP});
	const onLayout = e => {
		setBackgroundLayout(e.nativeEvent.layout);
	};

	return (
		<TouchableWithoutFeedback onPress={makeTag}>
			<View style={style} onLayout={onLayout}>
				{Platform.OS === 'ios' ? <Image style={style} source={{uri: uri}} /> : <FastImage style={style} source={{uri: uri}} />}
				{tags?.map(
					(v, i) =>
						showTags && (
							<Tag pos={v} key={i} user={v.user} onDelete={deleteTag} onEnd={endTagmove} viewmode={viewmode} backgroundLayout={backgroundLayout} />
						),
				)}
				<TouchableWithoutFeedback onPress={test}>
					<View style={{width: 100 * DP, height: 100 * DP, backgroundColor: 'red', position: 'absolute'}} />
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	);
};

PhotoTagItem.defaultProps = {
	style: {},
	data: {},
	index: 0,
	viewmode: false,
};

const lo = StyleSheet.create({
	wrp_main: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	box_img_tag: {
		height: 750 * DP,
		backgroundColor: 'gray',
	},
	box_img: {
		height: 750 * DP,
		backgroundColor: 'gray',
	},
	box_explain: {
		// height: 102 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 48 * DP,
		flex: 1,
		// backgroundColor:'yellow'
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 4,
	},
});
