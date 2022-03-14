import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {FavoriteTag46_Filled, LocationGray, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import {GRAY10} from 'Root/config/color';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import {dummy_userObject} from 'Root/config/dummyDate_json';
import {styles} from 'Root/component/atom/image/imageStyle';
/**
 * 후기 세부 페이지
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressFavorite - 즐겨찾기 클릭
 * @param {()=>void)} props.onPressMeatball - 미트볼 클릭
 */
const ReviewContent = props => {
	const category = v => {
		return (
			<TouchableOpacity onPress={() => onPressCategory(v)} activeOpacity={0.7} style={[style.category]}>
				<Text style={[txt.noto24]}>{v}</Text>
			</TouchableOpacity>
		);
	};
	const onPressCategory = category => {
		alert(category);
	};

	const category_dummy = ['애견카페', '애견호텔', '애견놀이터'];

	return (
		<View style={[style.container]}>
			{/* 리뷰 헤더  */}
			<View style={[style.header, {}]}>
				<View style={[style.header_title]}>
					<Text style={[txt.noto32b]}>해양 돌고래 핀핀이 </Text>
				</View>
				<View style={[style.header_icon]}>
					<FavoriteTag46_Filled onPress={props.onPressFavorite} />
					<Meatball50_GRAY20_Horizontal onPress={props.onPressMeatball} />
				</View>
			</View>
			<View style={[style.profile]}>
				<UserLocationTimeLabel onClickLabel={() => alert('dd')} data={dummy_userObject[0]} />
			</View>
			<View style={[style.content]}>
				<Text style={[txt.noto28, {marginBottom: 8 * DP}]}>
					우리 유니 오늘 성동구에 있는 돌고래 쇼에 다녀왔어요! 신설이라 그런지 시설도 깨끗하고 상주하는 돌고래들도 사회성이 좋고 매너 좋아서 우리
					지환이가 무서워하지 않았어요!
				</Text>
				<Image
					source={{uri: 'https://www.sciencetimes.co.kr/wp-content/uploads/2021/08/Low-Res_Dolphin-Research-Center_Louie.jpeg-480x320.png'}}
					style={[styles.img_square_round_654]}
				/>
			</View>
			<View style={[style.footer]}>
				<View style={[style.location]}>
					<LocationGray />
					<Text style={[txt.noto26b, {color: GRAY10, marginLeft: 10 * DP}]}>서울시 성동구 115-64 멍멍동 왈왈길 멍멍존</Text>
				</View>
				<View style={[style.categoryList]}>
					{category_dummy.map((v, i) => {
						return <View key={i}>{category(v)}</View>;
					})}
				</View>
			</View>
		</View>
	);
};

ReviewContent.defaultProps = {
	onPressFavorite: () => {},
	onPressMeatball: () => {},
};

export default ReviewContent;

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		paddingVertical: 24 * DP,
		alignSelf: 'center',
		// backgroundColor: 'yellow',
	},
	header: {
		// width: 654 * DP,
		header: 50 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'pink',
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 8 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 510 * DP,
		marginTop: 12 * DP,
		flexDirection: 'row',
	},
	header_title: {
		width: 544 * DP,
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	profile: {
		alignSelf: 'center',
		width: 654 * DP,
		marginTop: 12 * DP,
	},
	content: {
		width: 654 * DP,
	},
	footer: {
		marginTop: 20 * DP,
		width: 654 * DP,
		height: 88 * DP,
		// backgroundColor: 'palegreen',
	},
	location: {
		width: 654 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 8 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 510 * DP,
		marginTop: 12 * DP,
		flexDirection: 'row',
	},
});
