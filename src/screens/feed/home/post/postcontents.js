import React from 'react';
import {Text, View, Image, TouchableWithoutFeedback, Animated} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {DropdownMeatball, BracketDown} from 'Asset/image_v2';
import {GRAY_MEATBALL, GRAY, MAINCOLOR} from 'Screens/color';
import DP from 'Screens/dp';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';
import {lo, userinfo, btn} from './style_post';
import {txt} from 'Screens/textstyle';
import PostComment from './postcomment';
import FastImage from 'react-native-fast-image';
import {loginInfo} from 'Screens/login/login';
import Dropdown from 'Screens/common/dropdown';

export default PostContents = props => {
	// export default Post = props => {
	const isMe = loginInfo.user_id === props.data.user;
	const nav = useNavigation();
	const route = useRoute();
	const [isMeatballOpen, setMeatballOpen] = React.useState(false);
	const [showAllContents, setShowAllContents] = React.useState(false);
	const showWholeContents = () => {
		setShowAllContents(true);
	};

	const moveToProfile = () => {
		console.log(props.data);
		nav.push('Profile', {user_id: props.data.user, user_nickname: props.data.user_nickname});
	};


	const selectMeatBall = e => {
		switch (e) {
			case '수정':
				nav.navigate('WriteFeed', {
					screen: 'editFeed',
					params: {navfrom: route.name, editData: props.data, content: props.data.content},
					merge: true,
				});
				break;
		}
		console.log(e);
	};

	return (
		<>
			<View style={[lo.cntr_info_user]}>
				<TouchableWithoutFeedback onPress={moveToProfile}>
					<View style={userinfo.cntr_info_user}>
						<FastImage
							style={userinfo.photo}
							source={{
								uri: props.data.photo_user,
							}}
						/>
						<View style={userinfo.grp_info}>
							<Text style={[txt.roboto28b, {lineHeight: 42 * DP}]}>{props.data.user_nickname}</Text>
							<Text style={[txt.noto24, txt.gray, {lineHeight: 36 * DP}]}>{props.data.location}에서</Text>
						</View>
						{isMe && (
							<View style={userinfo.memark}>
								<Text style={[txt.roboto20b, txt.white, {lineHeight: 26 * DP}]}>me</Text>
							</View>
						)}
					</View>
				</TouchableWithoutFeedback>

				<View style={userinfo.temp_shelter}>
					<Text style={[txt.noto24, {lineHeight: 38 * DP, color: MAINCOLOR}]}>임보</Text>
				</View>

				<Dropdown
					style={userinfo.meatBallMenu}
					dropdownContainerStyle={[
						{height: (isMe ? 360 : 160) * DP},
						userinfo.shadow,
						userinfo.meatballDropdown,
						{backgroundColor: '#FFF'},
					]}
					data={isMe ? ['링크복사', '공유하기', '댓글 기능 해제', '수정', '삭제'] : ['링크복사', '공유하기']}
					renderItem={({item}) => (
						<Animated.View style={{marginVertical: 3 * DP, paddingHorizontal: 0 * DP}}>
							<Animated.Text style={[txt.noto30, {lineHeight: 48 * DP}, item === '삭제' && txt.red]}>{item}</Animated.Text>
						</Animated.View>
					)}
					listBackgroundStyle={[{height: isMe ? 300 * DP : 110 * DP}, userinfo.meatballListBackGround]}
					listContainerStyle={[{height: isMe ? 300 * DP : 110 * DP}, userinfo.meatballListContainer]}
					onSelect={selectMeatBall}
					onSelectNotClose={true}
					onOpen={() => {
						setMeatballOpen(true);
					}}
					onClose={() => {
						setMeatballOpen(false);
					}}
					animation
					component={
						<SvgWrapper style={{width: 30 * DP, height: 80 * DP}} svg={<DropdownMeatball fill={isMeatballOpen ? MAINCOLOR : GRAY_MEATBALL} />} />
					}
				/>
			</View>

			<View style={[lo.cntr_txt, showAllContents ? {} : {height: 60 * DP}]}>
				<Text style={[txt.noto28, {lineHeight: 43 * DP}, txt.gray]}>{props.data.content}</Text>
				{/* <TxtContainHash data={props.data.content}/> */}
			</View>
			<View style={lo.cntr_txt_footer}>
				<Text style={[txt.noto24, {lineHeight: 36 * DP}, txt.gray]}>{props.data.time}</Text>

				{!showAllContents && (
					<TouchableWithoutFeedback onPress={showWholeContents}>
						<View style={btn.btn_moreContent}>
							<Text style={[txt.noto22, txt.gray, {marginRight: 14 * DP, lineHeight: 36 * DP}]}>더보기</Text>
							<SvgWrap style={{height: 12 * DP, width: 20 * DP}} svg={<BracketDown fill={GRAY} />} />
						</View>
					</TouchableWithoutFeedback>
				)}
			</View>
		</>
	);
};

PostContents.defaultProps = {
	onLayout: e => {},
	contentRef: ref => {},
};
