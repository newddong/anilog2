import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import FeedContent from './FeedContent';
import {Comment48_Border, Like48_Border, Like48_Filled} from 'Atom/icon';
import FeedMedia from 'Molecules/media/FeedMedia';
import {useNavigation} from '@react-navigation/core';
import {txt} from 'Root/config/textstyle';
import {GRAY10, WHITE} from 'Root/config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'Component/modal/Modal';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { likeFeed } from 'Root/api/feedapi';
import userGlobalObj from 'Root/config/userGlobalObject';

export default Feed = React.memo(props => {
	// console.log('Feed', props.data);
	const navigation = useNavigation();
	const {
		feed_content,
		feed_thumbnail,
		feed_medias,
		feed_location,
		feed_date,
		feed_update_date,
		feed_type,
		feed_is_protect_diary,
		feed_recent_comment,
		feed_is_like,
		missing_animal_species,
		missing_animal_species_detail,
		missing_animal_sex,
		missing_animal_age,
		missing_animal_lost_location,
		missing_animal_contact,
		missing_animal_features,
		missing_animal_date,
		report_witness_date,
		report_witness_location,
		report_animal_species,
		report_animal_species_detail,
		report_animal_sex,
		report_animal_age,
		report_animal_contact,
		report_animal_features,
		feed_like_count,
		feed_favorite_count,
		feed_comment_count,
		feed_writer_id,
		feed_avatar_id,
	} = props.data;
	const [isLike, setLike] = React.useState(false);
	const [likeCount, setLikeCount] = React.useState(0);
	const moveToCommentList = async () => {
		AsyncStorage.getItem('sid', (err, res) => {
			console.log('res', res);
			if (res == null && feed_comment_count == 0) {
				Modal.popNoBtn('로그인이 필요합니다.');
				setTimeout(() => {
					Modal.close();
				}, 1500);
			} else {
				navigation.push('FeedCommentList', {feedobject: props.data});
			}
		});
	};

	const toggleFeedLike = () => {
		if(isLike){
			setLike(false);
		}else{
			setLike(true);
		}
		likeFeed({
			feedobject_id: props.data._id,
			userobject_id: userGlobalObj.userInfo._id,
			is_like: !isLike
		},(result)=>{
			setLikeCount(result.msg.targetFeed.feed_like_count);
		},
		error=>console.log(error))

	}

	React.useEffect(()=>{
		setLike(feed_is_like);
		setLikeCount(feed_like_count);
	},[props.data])


	return (
		<View style={[feed_templete_style.feed]} removeClippedSubviews>
			<FeedContent data={props.data} />
			{/* 270DP */}
			<View style={[feed_templete_style.feedMedia_feed]}>
				<FeedMedia data={props.data} />
			</View>
			<View style={[feed_templete_style.comment_feed_view]}>
				<View style={[feed_templete_style.likeCommentButtons_view]}>
					<View style={[feed_templete_style.likeCommentInfo_view_feed]}>
						<TouchableWithoutFeedback onPress={toggleFeedLike}>
							<View style={feed_templete_style.likeButtonWrapper}>
								<View style={[feed_templete_style.like48]}>
									{isLike?<Like48_Filled />:<Like48_Border />}
								</View>
								<View style={feed_templete_style.like_count_view_feed}>
									<View style={[feed_templete_style.like_count_feed, feed_style.like_count]}>
										<Text style={[txt.roboto24]}>{likeCount}</Text>
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
						{/* <TouchableOpacity onPress={moveToCommentList}>
							<View style={{flexDirection: 'row'}}>
								<View style={organism_style.like48}>
									<Comment48_Border />
								</View>
								<View style={organism_style.comment_count_view_feed}>
									<View style={[organism_style.comment_count_feed, feed_style.comment_count]}>
										<Text style={[txt.roboto24]}>{feed_comment_count}</Text>
									</View>
								</View>
							</View>
						</TouchableOpacity> */}
					</View>

					{/* 댓글 comment_count개 모두 보기 */}
					<View style={[feed_templete_style.allCommentCount]}>
						<TouchableOpacity onPress={moveToCommentList}>
							<View style={{height: 80 * DP}}>
								<Text style={[txt.noto24]}>{feed_comment_count > 0 ? `댓글 ${feed_comment_count}개 모두 보기` : '댓글 쓰기'}</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				{/* RecentComment */}
				{feed_recent_comment&&<View style={[feed_templete_style.recentComment_view]}>
					<View style={[feed_templete_style.writerID_feed_view]}>
						<View style={[feed_templete_style.writerID_feed, {flex: 1}, {alignItems: 'flex-start'}]}>
							<Text style={[txt.roboto24, feed_style.recent_comment_user, {color: GRAY10}]}>{feed_recent_comment?.comment_user_nickname}</Text>
						</View>
						<View style={(feed_templete_style.commentText_view, {flex: 3})}>
							<Text style={[txt.noto24]} numberOfLines={2} ellipsizeMode="tail">
								{feed_recent_comment?.comment_contents}
							</Text>
						</View>
					</View>
				</View>}
			</View>
		</View>
	);
});


const feed_templete_style = StyleSheet.create({
	feed: {
		alignItems: 'center',
		width: 750 * DP,
	},
	feedMedia_feed: {
		width: 750 * DP,
		height: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	comment_feed_view: {
		width: 750 * DP,
		// height: 200 * DP,
		alignItems: 'center',
		// backgroundColor:'green'
	},
	likeButtonWrapper: {
		flexDirection:'row',
		height:'100%',
		alignItems:'center',
	},
	likeCommentButtons_view: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 72 * DP,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	likeCommentInfo_view_feed: {
		flexDirection: 'row',
		width: 256 * DP,
		height: 72 * DP,
		alignItems: 'center',
		// justifyContent: 'center',
	},
	recentComment_view: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 128 * DP,
		justifyContent: 'space-between',
		paddingVertical:24*DP,
	},
	like48: {
		width: 48 * DP,
		height: 48 * DP,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	like_count_view_feed: {
		width: 92 * DP,
		height: 48 * DP,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	like_count_feed: {
		width: 56 * DP,
		height: 30 * DP,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	comment_count_view_feed: {
		width: 68 * DP,
		height: 48 * DP,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	comment_count_feed: {
		width: 56 * DP,
		height: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#F8DDDD',
	},
	writerID_feed_view: {
		// width: 116 * DP,
		// height: 76 * DP,
		height: 114 * DP,
		// backgroundColor: '#FF00FF',
	},
	writerID_feed: {
		// width: 96 * DP,
		height: 36 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#AAE8B6',
	},
	commentText_view: {
		width: 538 * DP,
		height: 76 * DP,
		marginLeft: 20 * DP,
		// backgroundColor: '#AAE8B6',
	},
	allCommentCount: {
		width: 360 * DP,
		height: 44 * DP,
		alignItems: 'flex-end',
		// backgroundColor: '#F8DDDD',
	},
});

const feed_style = StyleSheet.create({
	like_count: {
		marginLeft: 12 * DP,
		marginTop: 9 * DP,
	},
	recentComment_view: {
		marginVertical: 24 * DP,
	},
	likeCommentButtons_view: {
		marginTop: 24 * DP,
	},
	comment_count: {
		marginLeft: 12 * DP,
	},
	recent_comment_user: {
		height: 38 * DP, //특정 디바이스에서 Feed Recent Comment User Nickname 텍스트가 잘리던 현상 수정
		// backgroundColor: 'red',
	},
});