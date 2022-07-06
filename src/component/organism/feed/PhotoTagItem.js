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
import {Tag70} from 'Atom/icon';
import Modal from 'Root/component/modal/Modal';

export default PhotoTagItem = ({uri, data, taglist, onMakeTag, onDeleteTag, viewmode, feedType, onPressPhoto, onTagMoveStart, onEndTagMove}) => {
	const [tags, setTags] = React.useState(taglist ? taglist : []);
	const [showTags, setShowTags] = React.useState(!viewmode);
	const nav = useNavigation();
	const route = useRoute();
	const clickedPost = React.useRef({x: -1, y: -1});
	const tagBackground = React.useRef();

	const makeTag = e => {
		clickedPost.current = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY};
		console.log(clickedPost.current);
		if (viewmode) {
			onPressPhoto();
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

	const showTag = () => {
		console.log(tags);
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
	const measureBackground = e => {
		console.log('PhotoTag onLayout', e.nativeEvent.layout);
		tagBackground.current.measure((x, y, width, height, pageX, pageY) => console.log('measure', x, y, width, height, pageX, pageY));
	};

	const render = () => (
		<View style={[style.container, style.adjustCenter]}>
			<FastImage style={styles.img_square_round_694} source={{uri: uri}} ref={tagBackground} onLayout={measureBackground} />
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
	
	return (
		<TouchableWithoutFeedback onPress={makeTag}>
			{render()}
		</TouchableWithoutFeedback>
	);
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
