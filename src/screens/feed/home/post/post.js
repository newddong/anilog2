import React from 'react';
import {Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {LikeIcon, LikeUncheckedIcon, CommentIcon, CommentReplyIcon} from 'Asset/image';
import {IconComment, IconLikeBorder, IconLikeFilled} from 'Asset/image_v2';
import DP from 'Screens/dp';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import {lo, userinfo, btn, comment} from './style_post';
import {txt} from 'Screens/textstyle';
import PostComment from './postcomment';
import PostContents from './postcontents';
import {likePost, dislikePost} from 'Root/api/feedapi';
import FastImage from 'react-native-fast-image';
import {updatePostData, removeLike, addLike} from '../feeddata';
import {loginInfo} from 'Screens/login/login';
import PhotoTagItem from 'Screens/feed/write/phototagitem';
import {MAINCOLOR, GRAY, GRAY_LIKE} from 'Root/screens/color';

export default React.memo(
	(Post = props => {
		const nav = useNavigation();
		const [showAllContents, setShowAllContents] = React.useState(false);
		const showWholeContents = () => {
			setShowAllContents(true);
		};
		const isMe = loginInfo.user_id === props.data.user;
		const moveToProfile = () => {
			nav.push('Profile', {user_id: props.data.user_id, user: props.data.user});
		};

	

		const moveToCommentList = () => {
			nav.push('CommentList', {data: props.data}); //댓글 리스트로 이동
		};

		const [like, setLike] = React.useState({isLike: props.isLike, count: props.data.like_count});
		const clickLikeBtn = () => {
			if (like.isLike) {
				//dislike

				dislikePost(
					{
						post_id: props.data._id,
					},
					() => {
						props.data.like_count--;
						// console.log(props.data.like_count);
						removeLike(props.data);
						updatePostData(props.data);
						setLike({...like, isLike: false, count: like.count - 1});
						// props.extraData = props.extraData.filter((v)=>props.data._id!==v);
						// props.likedPosts.splice(props.likedPosts.indexOf(props.data._id),1);
					},
				);
			} else {
				//like

				likePost(
					{
						post_id: props.data._id,
					},
					() => {
						props.data.like_count++;
						addLike(props.data);
						updatePostData(props.data);
						setLike({...like, isLike: true, count: like.count + 1});
						// !props.likedPosts.includes(props.data._id)&&props.likedPosts.push(props.data._id);
						// console.log(props.data.like_count);
						// props.extraData = props.extraData.map((v,i)=>v);
					},
				);
			}
		};

		// React.useEffect(()=>{
		// 	setLike({count:props.data.like_count,isLike:props.isLike});
		// 	console.log('postrefresh '+ props.isLike);
		// 	console.log(props.data.like_count);
		// },[props.refresh])

		const test = () => {
			console.log(props.data);
		};

		return (
			<View style={lo.cntr_contents} onLayout={props.onLayout}>
				{/* <TouchableWithoutFeedback onPress={test}>
					<View style={{width: 80 * DP, height: 80 * DP, backgroundColor: 'green', position: 'absolute', left: 300, zIndex: 999}}></View>
				</TouchableWithoutFeedback> */}
				<PostContents data={props.data} />
				<Swiper showsButtons style={lo.cntr_photo} activeDotColor="#FFB6A5" showsButtons={false} autoplay={false} loop={false}>
					{/* {props.data.images.map((data, idx) => (
						<FastImage style={lo.photo} source={{uri: ''}} key={idx} />
					))} */}
					{props.data.images.map((data, idx) => (
						<PhotoTagItem style={lo.photo} data={data} key={idx} viewmode={true} />
					))}
				</Swiper>

				<View style={lo.cntr_comment}>
					<View style={comment.buttonContainer}>
						<View style={comment.infoContainer}>
							<SvgWrap
								style={comment.iconContainer}
								svg={like.isLike ? <IconLikeFilled fill={MAINCOLOR} /> : <IconLikeBorder fill={GRAY_LIKE} />}
								onPress={clickLikeBtn}
							/>
							{/* <Text style={txt.roboto24r}>{props.data.like}</Text> */}
							<Text style={txt.roboto24r}>{like.count}</Text>
							<SvgWrap style={comment.iconContainer} svg={<IconComment fill={GRAY_LIKE} />} onPress={moveToCommentList} />
							<Text style={txt.roboto24r}>{props.data.count_comment}</Text>
						</View>
						<TouchableWithoutFeedback onPress={moveToCommentList}>
							<View style={{width: 360 * DP, height: 44 * DP, alignItems: 'flex-end'}}>
								<Text style={[txt.noto24, txt.gray, {lineHeight: 44 * DP}]}>
									댓글 {props.data.count_comment}개 모두 보기{true}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					{/*댓글 리스트로 이동하기전 간략하게 보이는 댓글들*/}
					<PostComment comment={props.data.comment} like={props.data.like_count} count_comment={props.data.count_comment} />
				</View>
			</View>
		);
		// };
	}),
);

Post.defaultProps = {
	onLayout: e => {},
	contentRef: ref => {},
	isLike: false,
};

const TxtContainHash = props => {
	let arr = parseData(props.data);
	return (
		<Text style={[txt.noto24, txt.gray]}>
			{arr.map((e, i) => (
				<Text style={{color: e[1].charAt(0) === '#' ? '#007EEC' : '#767676'}} key={i}>
					{e[1]}
				</Text>
			))}
		</Text>
	);
};

function parseData(string) {
	const regexp = />(.*?)</g;
	return [...string.matchAll(regexp)];
}
