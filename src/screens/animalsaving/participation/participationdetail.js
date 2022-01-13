import React, {useState,useRef} from 'react';
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
import {HeartBtnIcon, ShareFocusedIcon, Kakao, CopylinkIcon, MessageIcon} from 'Asset/image';


import DP, {svg_size} from 'Root/screens/dp';

export default ParticipationDetail = props => {
	const [location, setlocation] = useState(0);

	const [isPop, setPop] = useState(false);
	const iP=useRef(false);
	const onShareBtn = () => {
		
		if(!iP.current){
			// setPop(true);
			iP.current = true;
		}
		console.log('onShare : '+iP.current);
	}
	const closePop = () =>{
		// setPop(false);
		iP.current = false;
		console.log('closePop : '+iP.current);
	}

	return (
		<View style={detail.wrp_main}>
			<View style={detail.wrp_content}>
				<View style={detail.cntr_img}></View>

				<View
					style={detail.bar_title}
					onLayout={e => {
						setlocation(e.nativeEvent.layout.y + e.nativeEvent.layout.height);
					}}>
					<Text style={[txt.noto36r]}>임시보호 참여하기</Text>
					<View style={detail.cntr_btn_sns}>
						<View style={detail.info_sns}>
							<View style={detail.wrap_icon}>
								<HeartBtnIcon {...svg_size} />
							</View>
							<Text>105</Text>
						</View>
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

				<View style={detail.cntr_content}>
					<Text style={[txt.noto24r, txt.gray]}>
						임시보호를 참여하기 위해서는 어떤 것부터 해야 할까? 의욕만 가지고 시작하기에는 너무 먼
						임시보호..ㅠ 지식 쌓기부터 시작하는 임시보호 참여하기! 함께 그 방법을 알아볼까요??
					</Text>
				</View>
			</View>
			<Animated.View style={[detail.wrp_pop]}
				onStartShouldSetResponder={()=>true}
				onMoveShouldSetResponder={()=>false}
				onMoveShouldSetResponderCapture={()=>false}
				onResponderGrant={closePop}
			>
				<Animated.View style={[detail.pop_sns, detail.shadow, {top: location}]}
					onStartShouldSetResponder={()=>true}
					onMoveShouldSetResponder={()=>false}
					onMoveShouldSetResponderCapture={()=>false}
				>
					<View style={detail.pop_cntr_icon}>
						<View style={detail.pop_icon}>
							<Kakao {...svg_size} />
						</View>
						<Text style={[txt.noto22r,txt.gray]}>카카오톡</Text>
					</View>
					<View style={detail.pop_cntr_icon}>
						<View style={detail.pop_icon}>
							<CopylinkIcon {...svg_size} />
						</View>
						<Text style={[txt.noto22r,txt.gray]}>링크복사</Text>
					</View>
					<View style={detail.pop_cntr_icon}>
						<View style={detail.pop_icon}>
							<MessageIcon {...svg_size} />
						</View>
						<Text style={[txt.noto22r,txt.gray]}>메시지</Text>
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
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cntr_img: {
		backgroundColor: '#EDEDED',
		marginTop: 70 * DP,
		flexBasis: 654 * DP,
	},
	cntr_btn_sns: {
		flexDirection: 'row',
	},
	info_sns: {
		marginLeft: 40 * DP,
	},
	wrap_icon: {
		height: 48 * DP,
		width: 48 * DP,
	},
	cntr_content: {
		marginTop: 11 * DP,
	},
	wrp_pop: {
		// backgroundColor: 'gray',
		transform:[{scale:0}],
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
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 4,
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
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 42 * DP,
	},
	noto22r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 22 * DP,
		lineHeight: 32 * DP,
	},
	gray: {
		color: '#767676',
	},
});
