import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import DP from 'Screens/dp';
import {LikeIcon, LikeUncheckedIcon, CommentIcon, ShareIcon } from 'Asset/image';


export default MoviePlayInfo = props => {
	const data = props.data;
	const icon_size = {width: 48 * DP, height: 48 * DP};

	return (
		<>
			<View style={movplay.cntr_hash}>
				{data.hashes.map((e,i)=>{
					return <Text style={[txt.noto24rcjk, txt.link,{marginRight:10*DP,height:38*DP}]} key={i}>#{e}</Text>
				})}
			</View>

			<View style={movplay.cntr_title}>
				<Text style={txt.noto30b}>{data.title}</Text>
				<Text style={[txt.roboto24r, txt.gray]}>조회수 {data.view}</Text>
			</View>

			<View style={movplay.cntr_channel}>
				<View style={movplay.sctn_channelinfo}>
					<View style={movplay.channelimg}>
						<Image style={movplay.channelimg} source={{uri: 'https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg'}} />
					</View>
					<View style={movplay.grp_channelid}>
						<Text style={[txt.noto28b, txt.gray]}>{data.user_id}</Text>
						<Text style={[txt.noto24rcjk, txt.gray]}>구독자 {data.user_subscribe}</Text>
					</View>
				</View>

				<View style={movplay.sctn_popularity}>
					<View style={movplay.icon}>
						<LikeUncheckedIcon {...icon_size} />
						<Text style={txt.roboto24r}>{data.view}</Text>
					</View>
					<View style={movplay.icon}>
						<CommentIcon {...icon_size} />
						<Text style={txt.roboto24r}>{data.count_comment}</Text>
					</View>
					<View style={movplay.icon}>
						<ShareIcon {...icon_size} />
						<Text style={txt.roboto24r}>공유</Text>
					</View>
				</View>
			</View>
		</>
	);
};

export const movplay = StyleSheet.create({
	cntr_hash: {
		width: 654 * DP,
		// height:280*DP,
		marginTop: 10 * DP,
		marginBottom: 11 * DP,
		flexDirection:'row',
		flexWrap:'wrap',
	},
	cntr_title: {
		width: 654 * DP,
		marginBottom: 10 * DP,
	},
	cntr_channel: {
		width: 654 * DP,
		height: 84 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 18 * DP,
	},
	sctn_channelinfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	channelimg: {
		height: 60 * DP,
		width: 60 * DP,
		borderRadius: 60 * DP,
		marginRight: 20 * DP,
	},

	grp_channelid: {
		width: 310 * DP,
	},
	sctn_popularity: {
		height: 84 * DP,
		width: 224 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	icon: {
		width: 48 * DP,
		height: '100%',
		justifyContent: 'space-between',
	},
});

const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24*DP,
		lineHeight: 36 * DP,
		includeFontPadding:false,

	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30*DP,
		lineHeight: 46 * DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24*DP,
		lineHeight: 30 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28*DP,
		lineHeight: 36 * DP,
	},
	link: {
		color: '#007EEC',
	},
	gray: {
		color: '#767676',
	},
	white: {
		color: '#FFFFFF',
	},
});
