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

export default PhotoTagItem = ({uri, data, taglist, onMakeTag, onDeleteTag, viewmode}) => {
	const [tags, setTags] = React.useState(taglist ? taglist : []);
	const [showTags, setShowTags] = React.useState(!viewmode);
	const nav = useNavigation();
	const route = useRoute();
	const clickedPost = React.useRef({x: -1, y: -1});

	const makeTag = e => {
		clickedPost.current = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY};
		console.log(clickedPost.current);
		!viewmode && nav.navigate({name: 'UserList'});
	};

	const deleteTag = user => {
		onDeleteTag && onDeleteTag(user, uri);
		setTags(tags.filter(v => v.user._id !== user._id));
	};

	React.useEffect(() => {
		if (viewmode) return;
		if (clickedPost.current.x < 0 || clickedPost.current.y < 0) return;
		if (!route.params.taggedAccount) return;
		console.log('계정 선택함', route);
		if (route.params.taggedAccount) {
			let newTag = {pos: {x: clickedPost.current.x, y: clickedPost.current.y}, user: route.params.taggedAccount};
			setTags(tags.filter(v => v.user._id !== route.params.taggedAccount._id).concat(newTag));
			clickedPost.current = {x: -1, y: -1};
			onMakeTag && onMakeTag(newTag, uri);
		}
	}, [route.params]);

	const showTag = () => {
		console.log(tags);
		setShowTags(!showTags);
	};

	const endTagmove = e => {
		tags.forEach((v, i, a) => {
			if (v.user._id === e.user._id) a.splice(i, 1, e);
		});
	};
	const [backgroundLayout, setBackgroundLayout] = React.useState({width: 750 * DP, height: 750 * DP});

	const getTags = () => {
		if (tags.length < 1) return <></>;
		return tags.map((v, i) => (
			<Tag
				pos={v.pos}
				key={v.user._id}
				user={v.user}
				onDelete={deleteTag}
				onEnd={endTagmove}
				viewmode={viewmode}
				backgroundLayout={backgroundLayout}
			/>
		));
	};

	return (
		<TouchableWithoutFeedback onPress={makeTag}>
			<View style={styles.img_square_750x750}>
				<Image style={styles.img_square_750x750} source={{uri: uri}} />
				{showTags && getTags()}
				{tags.length > 0 && viewmode && (
					<TouchableWithoutFeedback onPress={showTag}>
						<View style={{bottom: 20 * DP, left: 20 * DP, position: 'absolute'}}>
							<Tag70 />
						</View>
					</TouchableWithoutFeedback>
				)}
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
