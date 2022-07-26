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
import {styles} from 'Atom/image/imageStyle';
import PhotoTagItem from 'Organism/feed/PhotoTagItem';

export default FeedMediaTagEdit = props => {
	const navState = useNavigationState(state => state);
	const feedEditIndex = navState.routes.findIndex(v => v.name == 'FeedEdit'||v.name == 'FeedWrite');
	const route = navState.routes[feedEditIndex];
	const feedData = route?route.params:[];
	const [tagScreens, setTagScreens] = React.useState(feedData.feed_medias ?? []);
	const [scroll, setScroll] = React.useState(true);
	const [focused, setFocused] = React.useState(true);
	console.log('feedData', feedData, navState);

	React.useEffect(() => {
		const focus = props.navigation.addListener('focus', () => {
			setFocused(true);
		});
		const blur = props.navigation.addListener('blur', () => {
			//동영상 모두 정지로
			setFocused(false);
			// console.log('feedlist blur');
		});
		return ()=>{
			focus();
			blur();
		}
	}, [props.navigation]);

	const onEndTagMove = (tag, uri) => {
		// console.log('onTagmoveEnd', tag);
		setScroll(true); //태그가 움직이기 시작하면 Swipe가 되지 않도록 설정
		setTagScreens(tagScreens.map((v,i)=>{
			if (v.media_uri == uri) {
				v.tags = v.tags.map(item => {
					if (item.user._id == tag.user._id) {
						return tag;
					} else {
						return item;
					}
				})
			}
			v.is_video = v.is_video
			return v;
		}))



	};
	const onTagMoveStart = isMove => {
		console.log('movestart')
		setScroll(false); //태그의 움직임이 멈추면 Swipe가 가능하도록 설정
	};

	const onMakeTag = (newtag, uri) => {
		console.log(uri, '   make   ', newtag);
		setTagScreens(tagScreens.map((v,i)=>{
			if(v.media_uri == uri){
				v.tags ? v.tags : (v.tags = [newtag]);
				if(v.tags && v.tags.length>0){
					v.tags = v.tags.filter(v => v.user._id != newtag.user._id).concat(newtag);
				}else{
					v.tags = [newtag];
				}
			}
			v.is_video = v.is_video
			return v;
		}))
	};
	const onDeleteTag = (user, uri) => {
		console.log(uri, '   del   ', user);
		setTagScreens(tagScreens.map((v,i)=>{
			if(v.media_uri == uri){
				v.tags = v.tags.filter(v=>v.user._id!=user._id);
			}
			v.is_video = v.is_video
			return v;
		}))

		// feedData.feed_medias?.forEach((v, i, a) => {
		// 	if (v.media_uri === uri) {
		// 		v.tags.forEach((v, i, a) => {
		// 			if (v.user._id === user._id) {
		// 				a.splice(i, 1);
		// 			}
		// 		});
		// 	}
		// });
	};
	const [swiperIndex, setSwiperIndex] = React.useState(0);
	const indexChange = index => {
		console.log('index', index);
		setSwiperIndex(index);
	};

	const renderItems = () => {
		if (tagScreens.length < 1) return false;
		return tagScreens.map((v, idx) => (
			<PhotoTagItem
				style={lo.box_img}
				uri={v.media_uri}
				isVideo={v.is_video}
				taglist={v.tags}
				key={v.tags.reduce((a,c)=>a+c.pos.x+c.pos.y,0)}
				onShow={focused&&idx == swiperIndex}
				onMakeTag={onMakeTag}
				onDeleteTag={onDeleteTag}
				viewmode={false}
				onEndTagMove={onEndTagMove}
				onTagMoveStart={onTagMoveStart}
			/>
		));
	};
	console.log('tagscreen',tagScreens);
	return (
		<View style={lo.wrp_main}>
			<View style={lo.box_img_tag}>
				<Swiper
					activeDotColor={APRI10}
					scrollEnabled={scroll}
					showsButtons={false}
					autoplay={false}
					loop={false}
					removeClippedSubviews={false}
					scrollEventThrottle={16}
					activeDot={false}
					dot={false}
					onIndexChanged={indexChange}
					renderPagination={(index, total, context) => {
						return tagScreens.length == 0 ? (
							<></>
						) : (
							<View
								style={{
									bottom: -50 * DP,
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'space-between',
									width: 28 * (feedData.feed_medias ? feedData.feed_medias.length : 0) * DP,
									height: 24 * DP,
									// backgroundColor: 'green',
									flexDirection: 'row',
									position: 'absolute',
								}}>
								{tagScreens.map((data, idx) => {
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
				{/* <Text style={txt.noto28r}>다시 눌러 삭제가 가능합니다.</Text> */}
				{/* <Text style={txt.noto28r}>누른 상태에서 움직이면 위치가 이동합니다.</Text> */}
				{/* <TouchableWithoutFeedback onPress={test}>
				<View style={{height:80*DP,width:80*DP,backgroundColor:'green'}}></View>
				</TouchableWithoutFeedback> */}
			</View>
		</View>
	);
};

const lo = StyleSheet.create({
	wrp_main: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	box_img_tag: {
		height: 750 * DP,
		backgroundColor: '#FFF',
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
