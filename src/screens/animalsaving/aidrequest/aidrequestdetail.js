import React, {useState, useRef} from 'react';
import {ScrollView} from 'react-native';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Animated
} from 'react-native';
import {
	HeartBtnIcon,
	HeartBtnFocusedIcon,
	ShareFocusedIcon,
	Kakao,
	CopylinkIcon,
	MessageIcon,
	Bracket,
	GliderIcon,
} from 'Asset/image';
import LostAnimal from './lostanimal';
import DP, {svg_size} from 'Root/screens/dp';
import {Shadow} from 'react-native-shadow-2';
import Adoption from './btn_adoption.svg';
import TemporalProtection from './btn_temporalProtection.svg';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Comments from 'Screens/movie/moviehome/subcomponent/comments';


export default AidRequestDetail = props => {
	const nav = useNavigation();
	const [location, setlocation] = useState(0);
	const [isApply, setApply] = useState(false);
	const [isPop, setPop] = useState(false);
	const iP = useRef(false);
	const onShareBtn = () => {
		if (!iP.current) {
			// setPop(true);
			iP.current = true;
		}
		console.log('onShare : ' + iP.current);
	};
	const closePop = () => {
		// setPop(false);
		iP.current = false;
		console.log('closePop : ' + iP.current);
	};

	return (
		<View style={detail.wrp_main}>
			<ScrollView>
				<View style={detail.wrp_content}>
					{/* <View style={detail.cntr_img}> */}
						<Swiper showsButtons style={detail.cntr_img} activeDotColor='#FFB6A5' showsButtons={false}>
							<Image
								style={detail.img_size}
								source={{
									uri: 'https://flexible.img.hani.co.kr/flexible/normal/930/620/imgdb/original/2019/1120/20191120501989.jpg',
								}}
							/>
							<Image
								style={detail.img_size}
								source={{
									uri: 'https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg',
								}}
							/>
							<Image
								style={detail.img_size}
								source={{
									uri: 'https://image.dongascience.com/Photo/2018/12/2d5efe44bdd02f3e2ec4e99189d89d18.jpg',
								}}
							/>
						</Swiper>
					{/* </View> */}
					<View style={detail.bar_title}>
						<Text style={[txt.noto24r, txt.gray]}>보호요청</Text>
						<Text style={[txt.noto28b]}>
							논두렁에서 구조한 믹스견, 햐얀 솜사탕같은 아기 강아지의 보호자를 찾습니다.
						</Text>
					</View>
					<View
						style={detail.bar_shelter}
						onLayout={e => {
							setlocation(e.nativeEvent.layout.y + e.nativeEvent.layout.height);
						}}>
						<View style={detail.info_shelter}>
							<View style={detail.img_shelter}>
								<Image
									style={detail.img_shelter}
									source={{
										uri: 'https://flexible.img.hani.co.kr/flexible/normal/930/620/imgdb/original/2019/1120/20191120501989.jpg',
									}}
								/>
							</View>
							<View style={detail.grp_txt_shelter}>
								<Text style={[txt.noto24b, txt.gray]}>딩동댕 보호소 / 경상남도 진주시</Text>
								<Text style={[txt.roboto24r, txt.gray]}>2021.05.28</Text>
							</View>
						</View>
						<View style={detail.cntr_btn_sns}>
							<TouchableWithoutFeedback onPress={onShareBtn}>
								<View style={detail.info_sns}>
									<View style={detail.wrap_icon}>
										<ShareFocusedIcon {...svg_size} />
									</View>
									<Text>공유</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</View>
					<View style={detail.cntr_card}></View>

					<View style={detail.cntr_content}>
						<Text style={[txt.noto24r, {color: 'black'}]}>
							경남 가좌동 인근 논두렁에서 구출한 말티즈 믹스 귀요미예요!{'\n'}
							사람 손을 많이 탔는지 순하고 얌전해요. 중성화는 아직 안 되어있고, 1차 접종까지
							되어있는 상태입니다. 이쁜 솜사탕같은 아가 임보나 입양 원하시는 분들은 바로 신청
							가능합니다!
						</Text>
					</View>

					<View style={detail.cntr_comment}>
						<Text style={[txt.noto24b, txt.gray, {marginBottom: 10 * DP}]}>
							댓글 <Text style={txt.noto24r}>5</Text>
						</Text>
						{/* <Comments />
						<Comments />
						<Comments />
						<Comments />
						<Comments /> */}

						<View style={detail.cntr_btn_more}>
							<Text style={[txt.noto24r, txt.gray]}>더보기</Text>

							<View style={detail.bracket_more}>
								<Bracket {...svg_size} fill="gray" />
							</View>
						</View>

						<View style={detail.write_comment}>
							<TextInput
								multiline
								placeholder="댓글 쓰기"
								style={[detail.write_input, txt.noto24r]}></TextInput>
							<View style={detail.icon_write}>
								<GliderIcon {...svg_size} fill="#FFB6A5" />
							</View>
						</View>
					</View>

					<View style={detail.cntr_lostanimal}>
						<Text style={txt.noto24r}>보호요청 더보기</Text>
						<LostAnimal />
						<LostAnimal />
						<LostAnimal />
						<LostAnimal />
						<LostAnimal />
						<LostAnimal />
						<LostAnimal />
					</View>
				</View>
			</ScrollView>
         <View style={detail.bar_bottom_float}>
				<Shadow distance={8} startColor={'#00000018'} offset={[0, 0]}>
					{!isApply && (
						<View style={detail.bottom_contents}>
							<View style={detail.bottom_icon}>
								<View style={{width: 40 * DP, height: 38 * DP}}>
									<HeartBtnFocusedIcon {...svg_size} />
								</View>
								<Text style={[txt.roboto28r, txt.gray]}>101</Text>
							</View>
							<TouchableWithoutFeedback
								onPress={() => {
									setApply(true);
								}}>
								<View style={[detail.btn_apply, detail.shadow]}>
									<Text style={[txt.noto24b, txt.white]}>임보/입양 신청하기</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					)}
					{isApply&&<View style={detail.bottom_apply_btns}>
               <TouchableWithoutFeedback
								onPress={() => {
									setApply(false);
									nav.push('보호 활동 신청');
								}}>
						<View style={[detail.btn_apply2, detail.shadow]}>
							<TemporalProtection {...svg_size} />
						</View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
								onPress={() => {
									setApply(false);
									nav.push('보호 활동 신청');
								}}>
						<View style={[detail.btn_apply2, detail.shadow]}>
							<Adoption {...svg_size} />
						</View></TouchableWithoutFeedback>
					</View>}
				</Shadow>
			</View>
			<Animated.View
				style={[detail.wrp_pop]}
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => false}
				onMoveShouldSetResponderCapture={() => false}
				onResponderGrant={closePop}>
				<Animated.View
					style={[detail.pop_sns, detail.shadow, {top: location}]}
					onStartShouldSetResponder={() => true}
					onMoveShouldSetResponder={() => false}
					onMoveShouldSetResponderCapture={() => false}>
					<View style={detail.pop_cntr_icon}>
						<View style={detail.pop_icon}>
							<Kakao {...svg_size} />
						</View>
						<Text style={[txt.noto22r, txt.gray]}>카카오톡</Text>
					</View>
					<View style={detail.pop_cntr_icon}>
						<View style={detail.pop_icon}>
							<CopylinkIcon {...svg_size} />
						</View>
						<Text style={[txt.noto22r, txt.gray]}>링크복사</Text>
					</View>
					<View style={detail.pop_cntr_icon}>
						<View style={detail.pop_icon}>
							<MessageIcon {...svg_size} />
						</View>
						<Text style={[txt.noto22r, txt.gray]}>메시지</Text>
					</View>
				</Animated.View>
			</Animated.View>

			
		</View>
	);
};
ParticipationItem.defaultProps = {
	title: '제목을 입력하세요',
};

const detail = StyleSheet.create({
	wrp_main: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	wrp_content: {
		paddingHorizontal: 48 * DP,
	},
	bar_title: {
		marginTop: 30 * DP,
	},
	cntr_img: {
		marginTop: 40 * DP,
		height: 542 * DP,
	},
	img_size: {
		// width: 654 * DP,
		flex:1,
	},
	bar_shelter: {
		marginTop: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cntr_btn_sns: {
		flexDirection: 'row',
	},
	info_shelter: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 518 * DP,
	},
	img_shelter: {
		backgroundColor: 'red',
		width: 72 * DP,
		height: 72 * DP,
		borderRadius: 36 * DP,
		marginRight: 10 * DP,
	},
	grp_txt_shelter: {},
	info_sns: {
		// marginLeft: 40 * DP,
	},
	wrap_icon: {
		height: 48 * DP,
		width: 48 * DP,
	},
	cntr_card: {
		borderRadius: 30 * DP,
		marginTop: 30 * DP,
		marginBottom: 80 * DP,
	},
	cntr_content: {
		marginTop: 11 * DP,
	},
	cntr_comment: {
		marginTop: 40 * DP,
	},
	cntr_btn_more: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
	},
	bracket_more: {
		marginLeft: 10 * DP,
		width: 40 * DP,
		height: 40 * DP,
		transform: [{rotate: '90deg'}],
	},
	write_comment: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 2 * DP,
		borderRadius: 40 * DP,
		borderColor: '#DBDBDB',
		paddingHorizontal: 30 * DP,
		marginTop: 30 * DP,
	},
	write_input: {
		width: 496 * DP,
		paddingVertical: 10 * DP,
	},
	icon_write: {
		width: 36 * DP,
		height: 32 * DP,
	},

	cntr_lostanimal: {
		marginTop: 70 * DP,
		borderTopColor: '#DBDBDB',
		borderTopWidth: 2 * DP,
		paddingTop: 70 * DP,
	},
	wrp_pop: {
		// backgroundColor: 'gray',
		transform: [{scale: 0}],
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	pop_sns: {
		width: 368 * DP,
		height: 166 * DP,
		borderRadius: 30 * DP,
		borderTopRightRadius: 0,
		backgroundColor: '#FFF',
		position: 'absolute',
		right: 48 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 46 * DP,
		paddingRight: 45 * DP,
	},
	pop_cntr_icon: {
		alignContent: 'center',
	},
	pop_icon: {
		width: 72 * DP,
		height: 72 * DP,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.1,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 3,
	},
	bar_bottom_float: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
	},
	bottom_contents: {
		backgroundColor: '#FFF',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
		paddingVertical: 30 * DP,
	},
	bottom_apply_btns: {
		backgroundColor: '#FFF',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingHorizontal: 48 * DP,
		paddingVertical: 30 * DP,
	},
	bottom_icon: {
		flexDirection: 'row',
		alignContent: 'center',
	},
	btn_apply: {
		backgroundColor: '#FFB6A5',
		height: 60 * DP,
		width: 278 * DP,
		borderRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn_apply2: {
		backgroundColor: '#FFF',
		borderRadius: 70 * DP,
		width: 224 * DP,
		height: 198 * DP,
	},
});

const txt = StyleSheet.create({
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28*DP,
		lineHeight: 38 * DP,
	},
	noto36r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 36 * DP,
		lineHeight: 54 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 41 * DP,
	},
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		// lineHeight: 42 * DP,
		lineHeight: 42 * DP,
	},
	noto24b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 24 * DP,
		lineHeight: 32 * DP,
	},
	noto22r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 22 * DP,
		lineHeight: 32 * DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24 * DP,
		lineHeight: 30 * DP,
	},
	roboto28r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 28 * DP,
		lineHeight: 38 * DP,
	},
	gray: {
		color: '#767676',
	},
	white: {
		color: '#FFF',
	},
});
