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
	Animated,
} from 'react-native';
import {APRI10, BLACK, GRAY10, RED10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';
import Tag from 'Root/component/molecules/tag/Tag';
import {styles} from 'Atom/image/imageStyle';
import {Tag70, VideoPause, VideoMute66, VideoPlay, VideoSound66} from 'Atom/icon';
import Video from 'react-native-video';

export default PhotoTagItem = ({
	isVideo,
	onShow,
	uri,
	data,
	taglist,
	onMakeTag,
	onDeleteTag,
	viewmode,
	feedType,
	onPressPhoto,
	onTagMoveStart,
	onEndTagMove,
}) => {
	const [tags, setTags] = React.useState(taglist ? taglist : []);
	const [showTags, setShowTags] = React.useState(!viewmode);
	const nav = useNavigation();
	const route = useRoute();
	const clickedPost = React.useRef({x: -1, y: -1});
	const tagBackground = React.useRef();
	const [mute, setMute] = React.useState(true);
	const [play, setPlay] = React.useState(false);

	//피드가 수정될 시 피드 갱신
	React.useEffect(() => {
		setTags(taglist);
	}, [taglist]);

	const makeTag = e => {
		clickedPost.current = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY};
		console.log(clickedPost.current);
		if (viewmode) {
			onPressPhoto(uri);
		} else {
			!viewmode && nav.navigate({name: 'UserList'});
		}
	};

	const deleteTag = user => {
		console.log('deletetag', user);
		setTags(tags.filter(v => v.user._id != user._id));
		onDeleteTag && onDeleteTag(user, uri);
	};

	React.useEffect(() => {
		if (viewmode) return;
		if (clickedPost.current.x < 0 || clickedPost.current.y < 0) return;
		if (!route.params.taggedAccount) return;
		console.log('계정 선택함', route);
		if (route.params.taggedAccount) {
			let newTag = {pos: {x: clickedPost.current.x, y: clickedPost.current.y}, user: route.params.taggedAccount};
			console.log('taggedAccount', route.params.taggedAccount);
			console.log('newTag', newTag, tags);
			setTags(tags.filter(v => v.user._id != route.params.taggedAccount._id).concat(newTag));
			clickedPost.current = {x: -1, y: -1};
			onMakeTag && onMakeTag(newTag, uri);
		}
	}, [route.params]);

	React.useEffect(() => {
		return () => {};
	}, []);

	const showTag = () => {
		setShowTags(!showTags);
	};

	const endTagmove = endTag => {
		// console.log('tag move end',endTag,tags);
		let tagInfo = {
			pos: {x: endTag.x, y: endTag.y},
			position_x: endTag.x,
			position_y: endTag.y,
			tag_user_id: endTag.user._id,
			user: endTag.user,
		};
		setTags(
			tags.map(tag => {
				if (tag.user._id == endTag.user._id) {
					return tagInfo;
				} else {
					return tag;
				}
			}),
		);
		onEndTagMove(tagInfo, uri);
	};
	const [backgroundLayout, setBackgroundLayout] = React.useState({width: 750 * DP, height: 750 * DP});

	const getTags = () => {
		if (tags.length < 1) return false;
		return tags.map((v, i) => (
			<Tag
				pos={v.pos}
				key={v.user._id + v.pos.x + v.pos.y}
				user={v.user}
				onDelete={deleteTag}
				onEndTagMove={endTagmove}
				viewmode={viewmode}
				backgroundLayout={backgroundLayout}
				onTagMoveStart={onTagMoveStart} //태그가 움직이는중(Swipe가 작동하지 않도록 함)
			/>
		));
	};

	const toggleMute = () => {
		setMute(!mute);
	};

	const togglePlay = () => {
		setPlay(!play);
	};

	const fadePlayDuration = 100;
	const fadePauseDuration = 100;
	const fadeAnimPlay = React.useRef(new Animated.Value(1)).current;
	const fadeAnimPause = React.useRef(new Animated.Value(0)).current;

	const videoplay = () => {
		Animated.timing(fadeAnimPlay, {
			toValue: 0,
			duration: fadePlayDuration,
			useNativeDriver: true,
		}).start();
		setTimeout(() => {
			setPlay(true);
			fadeAnimPlay.setValue(1);
		}, fadePlayDuration);
	};
	const videoPause = () => {
		Animated.sequence([
			Animated.timing(fadeAnimPause, {
				toValue: 1,
				duration: fadePauseDuration / 3,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnimPause, {
				toValue: 0,
				duration: fadePauseDuration / 3,
				useNativeDriver: true,
			}),
		]).start();
		setTimeout(() => {
			setPlay(false);
		}, fadePauseDuration + 100);
	};

	React.useEffect(() => {
		if (!onShow) {
			setPlay(false);
		}
	}, [onShow]);

	const video = () => {
		return (
			<View style={{justifyContent: 'center', alignItems: 'center'}}>
				{onShow ? (
					<Video
						style={[styles.img_square_round_694, {backgroundColor: '#000'}]}
						source={{uri: uri}}
						paused={!play && viewmode}
						muted={mute}
						useTextureView={Platform.OS != 'android'}
						repeat={true}
						resizeMode="contain"
						maxBitRate={2000000}
						disableDisconnectError={true}
						selectedVideoTrack={{type: 'resolution', value: 720}}
						bufferConfig={{
							minBufferMs: 15000,
							maxBufferMs: 50000,
							bufferForPlaybackMs: 2500,
							bufferForPlaybackAfterRebufferMs: 5000,
							maxHeapAllocationPercent: 0.1,
							minBackBufferMemoryReservePercent: 0.1,
							minBufferMemoryReservePercent: 0.6,
						}}
					/>
				) : (
					<View style={[styles.img_square_round_694, {backgroundColor: '#000'}]} />
				)}
				{viewmode && (
					<View style={{position: 'absolute'}}>
						{!play ? (
							<TouchableWithoutFeedback onPress={videoplay}>
								<Animated.View
									style={{
										width: 750 * DP,
										height: 750 * DP,
										justifyContent: 'center',
										alignItems: 'center',
										opacity: fadeAnimPlay,
									}}>
									<VideoPlay />
								</Animated.View>
							</TouchableWithoutFeedback>
						) : (
							<TouchableWithoutFeedback onPress={videoPause}>
								<Animated.View
									style={{
										width: 750 * DP,
										height: 750 * DP,
										justifyContent: 'center',
										alignItems: 'center',
										opacity: fadeAnimPause,
									}}>
									<VideoPause />
								</Animated.View>
							</TouchableWithoutFeedback>
						)}
					</View>
				)}
				<View style={{position: 'absolute', top: 20 * DP, left: 20 * DP}}>
					{mute ? <VideoMute66 onPress={toggleMute} /> : <VideoSound66 onPress={toggleMute} />}
				</View>
			</View>
		);
	};

	const render = () => (
		<View style={[style.container, style.adjustCenter]}>
			{data.is_video || isVideo ? video() : <FastImage style={[styles.img_square_round_694]} source={{uri: uri}} ref={tagBackground} />}
			{showTags && getTags()}
			{tags.length > 0 && viewmode && (
				<TouchableWithoutFeedback onPress={showTag}>
					<View style={{bottom: 50 * DP, left: 60 * DP, position: 'absolute'}}>
						<Tag70 />
					</View>
				</TouchableWithoutFeedback>
			)}
		</View>
	);
	return <TouchableWithoutFeedback onPress={makeTag}>{render()}</TouchableWithoutFeedback>;
};

PhotoTagItem.defaultProps = {
	style: {},
	data: {},
	index: 0,
	viewmode: false,
};

const style = StyleSheet.create({
	adjustCenter: {
		alignItems: 'center',
	},
	container: {
		width: 750 * DP,
		paddingVertical: 20 * DP,
		backgroundColor: '#FFF',
	},
});
