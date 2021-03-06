import React from 'react';
import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {SETTING_COMMENT, SETTING_OWN_COMMENT} from 'Root/i18n/msg';
import {Heart30_Border, Heart30_Filled, Meatball50_GRAY20_Vertical} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import MeatBallDropdown from 'Molecules/dropdown/MeatBallDropdown';
import UserTimeLabel from 'Molecules/label/UserTimeLabel';
import {useNavigation} from '@react-navigation/native';
import userGlobalObject from 'Root/config/userGlobalObject';

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
		setIsMyComment(userGlobalObject.userInfo._id == data.like_comment_id);
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

export const childComment = StyleSheet.create({
	container: {
		width: 574 * DP,
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	profileContainer: {
		width: 574 * DP,
		height: 50 * DP,
		flexDirection: 'row',
	},
	commentMark: {
		width: 14 * DP,
		height: 14 * DP,
		borderLeftWidth: 2 * DP,
		borderBottomWidth: 2 * DP,
		borderLeftColor: GRAY10,
		borderBottomColor: GRAY10,
	},
	userTimeLabel: {
		width: 442 * DP,
		height: 46 * DP,
		marginLeft: 10 * DP,
	},
	meatBall50_vertical: {
		width: 50 * DP,
		height: 50 * DP,
		marginLeft: 58 * DP,
	},
	img_square_round_484: {
		alignSelf: 'flex-end',
		marginBottom: 12 * DP,
	},
	commentContainer: {
		width: 484 * DP,
		marginLeft: 90 * DP,
		marginVertical: 20 * DP,
	},
	commentText: {},
	likeReplyButton: {
		width: 222 * DP,
		height: 34 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	heart30: {
		width: 30 * DP,
		height: 30 * DP,
	},
	likeCount: {
		width: 50 * DP,
		height: 30 * DP,
		marginLeft: 12 * DP,
	},
	likeCountText: {
		color: GRAY10,
		textAlignVertical: 'center',
		textAlign: 'center',
		lineHeight: 30 * DP,
	},
	writeComment: {
		width: 130 * DP,
		height: 34 * DP,
	},
	writeCommentText: {
		color: GRAY20,
		includeFontPadding: false,
	},
});