import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image, ImageBackground, Platform, Dimensions,Animated, Keyboard} from 'react-native';
import DP, {isNotch} from 'Screens/dp';
import {LikeIcon, LikeUncheckedIcon, CommentIcon, SearchIcon, ShareIcon, BtnX, DownBracketGray, HeartBtnIcon, MeIcon, GliderIcon} from 'Asset/image';
import MovieItem from './movieItem';
import Comments from './comments';
import {TouchableWithoutFeedback} from 'react-native';
import {TabContext} from 'tabContext';

import {TextInput} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
// import YoutubePlayer from 'react-native-youtube-iframe';

import dummydata from '../moviedata.json';
import SvgWrapper from 'Screens/svgwrapper';

import MoviePlayInfo from './movieplayinfo';
import {useKeyboardBottom} from 'Root/screens/feed/home/post/usekeyboardbottom';


// export default MoviePlay = props => {
// 	return <TabContext.Consumer>{({tabVisible}) => <InnerComponent tabVisible={tabVisible} {...props} />}</TabContext.Consumer>;
// };


export default MoviePlay = props => {
	const tab = React.useContext(TabContext);
	useEffect(() => {
		const unsubscribe = props.navigation.addListener('blur', e => {
			tab.tabVisible(true);
			
		});
		return unsubscribe;
	}, [props.navigation]);

	const windowheight = Dimensions.get('window').height;

	const keyboardY = useKeyboardBottom();

	const {data} = props.route.params;
	const [screenH, setScreenH] = useState({h: windowheight, c: 0});
	const [android_shadow, setShadow] = useState(true);

	const bottomTabHeight = 140 * DP;
	const videoHeight = 422*DP;

	
	const openComment = () => {
		if (android_shadow) {
			setShadow(!android_shadow);
			
		}

		tab.tabVisible(false);
	};
	
	const closeComment = () => {
		setShadow(!android_shadow);
		
		tab.tabVisible(true);
	};
	return (
		<View
			style={movplay.wrp_play}
			onLayout={e => {
				if (screenH.c === 0) {
					setScreenH({h: e.nativeEvent.layout.height, c: screenH.c + 1});
				}
			}}>
			<View style={movplay.video}>
				{/* <YoutubePlayer height={300} play={true} videoId={data.movie_id} /> */}
			</View>

			<MoviePlayInfo data={data} />

			<View style={movplay.cntr_scrl}>
				<ScrollView>
					<TouchableWithoutFeedback onPress={openComment}>
						<View style={[movplay.cntr_comment, android_shadow ? movplay.shadowEffect : {}]}>
							<View style={movplay.grp_comment_info}>
								<Text style={[movplay.txt_comment_info, txt.noto24b]}>댓글 모두 보기</Text>
								<Text style={[txt.noto24rcjk, txt.gray]}>{data.count_comment}</Text>
							</View>
							<View style={movplay.grp_comment_txt}>
								<Text style={[movplay.commenter_id, txt.roboto24r, txt.gray]}>{data.comments[0].user_id}</Text>
								<Text style={[movplay.comment_txt, txt.noto24rcjk]}>{data.comments[0].contents.slice(0, 25)}...</Text>
								<DownBracketGray {...{width: 20 * DP, height: 12 * DP}} />
							</View>
						</View>
					</TouchableWithoutFeedback>
					{dummydata.movies.map((e, i) => {
						return <MovieItem data={e} key={i} />;
					})}
				</ScrollView>
			</View>
			
				<Animated.View style={[{height: screenH.h + bottomTabHeight, ...movplay.pop_cntr_comment}]}>
					<TouchableWithoutFeedback onPress={closeComment}>
						<View style={movplay.pop_margin}></View>
					</TouchableWithoutFeedback>

					<Animated.View style={[{...movplay.pop_sctn_comment,height: screenH.h - videoHeight + bottomTabHeight}]}>
						<View style={[pop_comment.header,pop_comment.shadowEffect]}>
							<View style={pop_comment.grp_txt}>
								<Text style={[txt.noto24b, {marginRight: 20 * DP}]}>댓글</Text>
								<Text style={[txt.gray, txt.noto24rcjk]}>{data.count_comment}</Text>
							</View>
							<TouchableWithoutFeedback onPress={closeComment}>
								<View style={pop_comment.btnx_hitbox}>
									<SvgWrapper style={pop_comment.btnx_size} svg={<BtnX fill="#191919" />} />
								</View>
							</TouchableWithoutFeedback>
						</View>
						<View style={pop_comment.cntr_scrl}>
							<ScrollView contentContainerStyle={{paddingTop: 40 * DP}}>
								{data.comments.map((e, i) => {
									return <Comments data={e} key={i} />;
								})}
							</ScrollView>
						</View>
					</Animated.View>

					<View style={{...pop_comment.cntr_input,...pop_comment.shadowEffect,bottom: keyboardY}}>
						<TextInput style={[txt.noto24r, txt.dimmergray, pop_comment.form_input]} placeholder={'댓글 쓰기'}></TextInput>
						<View style={pop_comment.btn_comit_comment}>
							<SvgWrapper svg={<GliderIcon fill="#FFB6A5" />} />
						</View>
					</View>
				</Animated.View>
			
				
			
		</View>
	);
};



export const pop_comment = StyleSheet.create({
	header: {
		flexBasis: 76 * DP,
		backgroundColor: '#FFF',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
	},
	grp_txt: {
		flexDirection: 'row',
	},
	btnx_hitbox: {
		width: 50 * DP,
		height: 50 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnx_size: {
		width: 22 * DP,
		height: 22 * DP,
	},
	cntr_scrl: {
		paddingHorizontal: 48 * DP,
		flex: 1,
	},
	cntr_input: {
		// flexBasis: 136 * DP,
		height: 136 * DP,
		width: '100%',
		// bottom: 0,
		backgroundColor: '#FFF',
		flexDirection: 'row',
		paddingHorizontal: 48 * DP,
		alignItems: 'center',
		position: 'absolute',
		// zIndex:100
	},
	btn_comit_comment: {
		width: 30 * DP,
		height: 28 * DP,
	},
	form_input: {
		width: 592 * DP,
		height: 80 * DP,
		borderWidth: 0 * DP,
		paddingLeft: 20 * DP,
		paddingVertical: 0 * DP,
		marginRight: 20 * DP,
		includeFontPadding: false,
	},
	shadowEffect: {
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

export const movplay = StyleSheet.create({
	wrp_play: {
		flex: 1,
		backgroundColor: '#FFF',
		alignItems: 'center',
		zIndex: 1,
	},
	video: {
		width: '100%',
		height: 422 * DP,
	},
	cntr_comment: {
		borderTopColor: '#DBDBDB',
		backgroundColor: '#FFFFFF',
		borderTopWidth: 2 * DP,
		height: 160 * DP,
		width: '100%',
		paddingLeft: 48 * DP,
	},
	shadowEffect: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 8,
	},
	grp_comment_info: {
		width: 654 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10 * DP,
		marginTop: 30 * DP,
	},
	txt_comment_info: {
		marginRight: 20 * DP,
	},
	grp_comment_txt: {
		width: 654 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	commenter_id: {
		width: 120 * DP,
		marginRight: 16 * DP,
	},
	comment_txt: {
		width: 494 * DP,
		marginRight: 14 * DP,
	},
	btn_allcomment: {},
	cntr_scrl: {
		flex: 1,
		width: '100%',
	},
	pop_cntr_comment: {
		position: 'absolute',
		width: '100%',
		// backgroundColor: 'green',
		// opacity: 0.7,
	},
	pop_margin: {
		height: 422 * DP,
	},
	pop_sctn_comment: {
		backgroundColor: '#FFF',
		// flex: 1,
	},
});

const txt = StyleSheet.create({
	noto24rcjk: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 36 * DP,
	},
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		lineHeight: 46 * DP,
	},
	noto24b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 24 * DP,
		lineHeight: 35 * DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24 * DP,
		lineHeight: 30 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 36 * DP,
	},
	link: {
		color: '#007EEC',
	},
	gray: {
		color: '#767676',
	},
	dimmergray: {
		color: '#999999',
	},
	white: {
		color: '#FFFFFF',
	},
});
