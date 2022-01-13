import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {SETTING_COMMENT, SETTING_OWN_COMMENT} from 'Root/i18n/msg';
import {Heart30_Border, Heart30_Filled, Meatball50_GRAY20_Vertical} from '../atom/icon';
import {styles} from '../atom/image/imageStyle';
import MeatBallDropdown from 'Molecules/dropdown/MeatBallDropdown';
import UserTimeLabel from '../molecules/UserTimeLabel';
import {useNavigation} from '@react-navigation/native';
import {childComment} from './style_organism';
/**
 *
 * @param {{
 * data : Object,
 * onPressReplyBtn : void,
 * }} props
 */
export default ChildComment = props => {
	// console.log('ChildComment', props.data);
	const [data, setData] = React.useState(props.data);
	const [isMyComment, setIsMyComment] = React.useState(false);
	const [likeState, setLikeState] = React.useState(false);
	console.log('ChildCommnet Data', props);
	const navigation = useNavigation();
	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

	React.useEffect(() => {
		AsyncStorage.getItem('token', (err, res) => {
			res == data.like_comment_id ? setIsMyComment(true) : setIsMyComment(false);
		});
	}, []);

	const onCLickHeart = () => {
		setLikeState(!likeState);
	};

	//대댓글 클릭
	const onPressReplyBtn = () => {
		props.onPressReplyBtn(props.data.comment_parent);
	};

	return (
		<View style={[childComment.container]}>
			<View style={[childComment.profileContainer]}>
				<View style={[childComment.userTimeLabel]}>
					<UserTimeLabel data={data || null} onLabelClick={userobject => navigation.push('UserProfile', {userobject: userobject})} />
				</View>
				<View style={[childComment.meatBall50_vertical]}>
					<MeatBallDropdown menu={isMyComment ? SETTING_OWN_COMMENT : SETTING_COMMENT} horizontal={false} />
				</View>
			</View>
			{/* 해당 대댓글이 photo_uri를 가지고 있는 경우만 IMage 출력 */}
			{data.comment_photo_uri != null ? (
				<View style={[childComment.img_square_round_484]}>
					<Image style={[styles.img_square_round_484]} source={{uri: data ? data.comment_photo_uri : DEFAULT_PROFILE}} />
				</View>
			) : (
				<></>
			)}
			{/* 댓글 텍스트 */}
			<View style={[childComment.commentContainer]}>
				<Text style={[txt.noto24, {color: GRAY10}]}>{data ? data.comment_contents : ''}</Text>
			</View>
			{/* 좋아요 버튼, 좋아요 숫자 , 답글쓰기 컨테이너 */}
			<View style={[childComment.likeReplyButton]}>
				<View style={[childComment.heart30]}>
					{likeState ? <Heart30_Filled onPress={onCLickHeart} /> : <Heart30_Border onPress={onCLickHeart} />}
				</View>
				<View style={[childComment.likeCount]}>
					<Text style={(txt.roboto24, childComment.likeCountText)}>{data ? data.comment_like_count : ''}</Text>
				</View>
				{/* <TouchableOpacity style={[childComment.writeComment]} onPress={onPressReplyBtn}>
					<Text style={(txt.noto22, childComment.writeCommentText)} numberOfLines={1}>
						· 답글 쓰기
					</Text>
				</TouchableOpacity> */}
			</View>
		</View>
	);
};

ChildComment.defaultProps = {
	data: {
		img: false,
		comment: '개',
		likecount: 80,
	},
	onPressReplyBtn: e => console.log(e),
};
