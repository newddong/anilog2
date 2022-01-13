import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {APRI10, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Heart48_Border, Heart48_Filled, Share48_Border, Share48_Filled} from '../atom/icon';
import {activationDetail, login_style, temp_txt} from './style_templete';

// 각각 뷰에 컴포넌트 삽입시 style의 첫번째 index 삭제할 것. 두번째 index는 상.하 간격 style이라서 이 컴포넌트에만 해당 됨.
//ex) 변경 전: <View style={[btn_style.btn_w654, findAccount_style.btn_w654]}>   변경 후:  <View style={[findAccount_style.btn_w654]}>

export default ActivationDetail = props => {
	// console.log(props.route.params);
	const [data, setData] = React.useState(props.route.params);

	const [likeState, setLikeState] = React.useState(false);
	const [shareState, setShareState] = React.useState(false);

	const onPressShare = () => {
		setShareState(!shareState);
		console.log('공유 클릭');
	};
	const onPressHeart = () => {
		setLikeState(!likeState);
		console.log('좋아요 클릭');
	};

	const count_to_K = cnt => {
		if (cnt > 1000000) {
			let count = (cnt / 1000000).toFixed(0) + 'm';
			return count;
		} else if (cnt > 1000) {
			let count = (cnt / 1000).toFixed(1) + 'k';
			return count;
		} else {
			return cnt;
		}
	};

	return (
		<View style={[login_style.wrp_main, activationDetail.container]}>
			<ScrollView>
				<View style={[activationDetail.insideContainer]}>
					<View style={[activationDetail.imageContainer]}>
						<Image source={{uri: data.image || DEFAULT_PROFILE}} style={{flex: 1}} />
					</View>
					<View style={[activationDetail.titleContainer]}>
						<View style={[activationDetail.titleText]}>
							<Text style={[txt.noto36]}>{data.title || ''}</Text>
						</View>
						<View style={[activationDetail.heartContainer]}>
							{likeState ? <Heart48_Filled onPress={onPressHeart} /> : <Heart48_Border onPress={onPressHeart} />}
							<Text style={[txt.roboto24, {color: GRAY10, textAlign: 'center'}]}>{count_to_K(data.like_count)}</Text>
						</View>
						<View style={[activationDetail.shareContainer]}>
							{shareState ? <Share48_Filled onPress={onPressShare} /> : <Share48_Border onPress={onPressShare} />}

							<Text style={[txt.roboto24, {color: shareState ? APRI10 : GRAY10}]}>공유</Text>
						</View>
					</View>
					<View style={[activationDetail.contentContainer]}>
						<Text style={[txt.noto24, {color: GRAY10}]}>{data.content || ''}</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
