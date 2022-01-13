import React,{useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image, TouchableWithoutFeedback} from 'react-native';
import CategoryList from 'Screens/movie/moviehome/subcomponent/categorylist';
import HealthLnb from 'Screens/movie/moviehome/subcomponent/healthlnb';
import {BtnX} from 'Asset/image';

import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';


export default HealthMovie = ({route}) => {
     
	return (
		route.params?.test===1?
		<CategoryList />:<MovieRecommendation />
	);
};

const MovieRecommendation = (props) => {

	return (
		<View style={mov.wrap_main}>
			<ScrollView>
				<View style={mov.cntr_prev}>
					<Text style={[txt.noto24r, txt.gray, {marginBottom: 20 * DP}]}>최근 검색어</Text>
					<ScrollView horizontal>
						<View>
							<View style={mov.prev_page}>
								<PrevSearchItem label={''} />
								
									<PrevSearchItem label="고양이사료" />
								
								<PrevSearchItem label="고양이건강관리" />
								<PrevSearchItem label="고양이" />
								<PrevSearchItem label="고양이사료" />
							</View>
							<View style={mov.prev_page}>
								<PrevSearchItem label="고양이건강관리" />
								<PrevSearchItem label="고양이" />
								<PrevSearchItem label="고양이사료" />
								<PrevSearchItem label="고양이" />
								<PrevSearchItem label="고양이사료" />
							</View>
						</View>
					</ScrollView>
				</View>
				<View style={mov.sctn_content}>
                              <TouchableWithoutFeedback onPress={()=>{alert('')}}>
					<Text style={[txt.noto30r, mov.sctn_title]}>카테고리별 영상</Text></TouchableWithoutFeedback>
					<HealthLnb />
				</View>
				<View style={mov.sctn_content}>
					<Text style={[txt.noto30r, mov.sctn_title]}>최근 본 영상</Text>
					<ScrollView horizontal>
						<MovieItem />
						<MovieItem />
						<MovieItem />
					</ScrollView>
				</View>
				<View style={mov.sctn_content}>
					<Text style={[txt.noto30r, mov.sctn_title]}>나중에 볼 영상</Text>
					<ScrollView horizontal>
						<View style={mov.mov_page}>
							<MovieItem />
							<MovieItem />
							<MovieItem />
							<MovieItem />
						</View>
						<View style={mov.mov_page}>
							<MovieItem />
							<MovieItem />
							<MovieItem />
							<MovieItem />
						</View>
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	);
};

const MovieItem = () => {
	return (
		<View style={movitem.wrap_item}>
			<Image style={movitem.img_thumb} source={{uri: 'https://image.dongascience.com/Photo/2019/11/10ed7359329fe87a2dc84921babb17e0.jpg'}} />
			<View style={movitem.playtime}>
				<Text style={[txt.roboto22r, txt.white]}>00:00</Text>
			</View>
			<Text style={txt.noto24r}>강아지 '눈 건강' 집에서 자가 체크 해보자!</Text>
		</View>
	);
};

const PrevSearchItem = props => {
	return (

		<View style={[prev.wrap_item, prev.shadow]}>
			<Text style={[txt.noto28r, txt.gray]}>{props.label}</Text>
			<SvgWrapper style={{width: 23 * DP, height: 23 * DP, marginLeft: 20 * DP}} svg={<BtnX fill="#767676" />} />
		</View>
	);
};

const mov = StyleSheet.create({
	wrap_main: {
		flex: 1,
		backgroundColor: '#fff',
		paddingLeft: 48 * DP,
	},
	mov_page: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: 884 * DP,
	},
	sctn_content: {
		marginBottom: 70 * DP,
	},
	sctn_title: {
		marginBottom: 10 * DP,
	},
	cntr_prev: {
		marginTop: 40 * DP,
		marginBottom: 70 * DP,
	},
	prev_page: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 30 * DP,
	},
});

const movitem = StyleSheet.create({
	wrap_item: {
		height: 284 * DP,
		width: 422 * DP,
		marginRight: 20 * DP,
		marginBottom: 10 * DP,
	},
	img_thumb: {
		height: 238 * DP,
	},
	playtime: {
		backgroundColor: '#000000',
		opacity: 0.6,
		position: 'absolute',
		right: 16 * DP,
		top: 199 * DP,
		width: 70 * DP,
		height: 28 * DP,
		alignItems: 'center',
		borderRadius: 10 * DP,
	},
});

const prev = StyleSheet.create({
	wrap_item: {
		flexDirection: 'row',
		height: 68 * DP,
		borderRadius: 30 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 12 * DP,
		paddingHorizontal: 30 * DP,
		backgroundColor: '#fff',
		marginRight: 30 * DP,
	},
	shadow: {
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

const txt = StyleSheet.create({
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 42 * DP,
	},
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 44 * DP,
	},
	noto30r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 30 * DP,
		lineHeight: 38 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		lineHeight: 42 * DP,
	},
	roboto22r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 22 * DP,
		lineHeight: 28 * DP,
	},
	gray: {
		color: '#767676',
	},
	white: {
		color: '#fff',
	},
});
