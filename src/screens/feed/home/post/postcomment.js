import React from 'react';
import {
	Text,
	View,
	StyleSheet,
   TouchableWithoutFeedback
} from 'react-native';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import { LikeIcon, LikeUncheckedIcon ,CommentIcon, CommentReplyIcon} from 'Asset/image';
import {txt} from 'Screens/textstyle';
import { useNavigation } from '@react-navigation/native';


export default PostComment = props => {
   const navigation = useNavigation();
	return (
		<View style={comment.commentContainer}>
            {props.comment?.map((e,i)=>{
               return <Comment {...e} key={i}/>
            })}
				{/* <Text style={[txt.noto24, txt.gray, comment.viewAll]}>
					더보기
				</Text> */}
		</View>
		
	);
};

const Comment = props => {
   const isReply = props.level === 2;
   const nickname = props.nickname?.length>0?props.nickname:'anonymous';
	return (
	
			<View style={[isReply?comment.reply:null,comment.comment]}>
				{isReply&&<SvgWrapper style={comment.replyicon} svg={<CommentReplyIcon />} />}
				<Text style={[txt.roboto24, txt.gray, comment.userId]}>
					{nickname}
				</Text>
				<Text style={[txt.noto24, {lineHeight:38*DP,flex: 1}]}>{props.comment}</Text>
			</View>
	);
};

const comment = StyleSheet.create({
   buttonContainer:{
      alignItems:'center',
      height:60*DP,
      flexDirection:'row',
      // backgroundColor:'yellow'
      
   },
   commentContainer:{
      height:130*DP,
      // backgroundColor:'gold',
      marginTop:24*DP,
      paddingHorizontal:48*DP,
   },
   comment:{
      width:558*DP,
      flexDirection:'row',
   },
   userId:{
      // paddingTop:6*DP,
      lineHeight:36*DP,
      marginRight: 20*DP,
   },
   viewAll:{
      justifyContent:'flex-end',
      right:0,
   },
   reply:{
      paddingLeft:114*DP
   },
   replyicon:{
      width:14*DP,
      height:14*DP,
      marginTop:14*DP,
      marginRight:8*DP,
   }
})