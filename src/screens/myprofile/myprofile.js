import React, {useState} from 'react';
import {Text, TextInput, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import DP, {svg_size} from 'Screens/dp';
import {LikeIcon, Bracket, SettingIcon, PawIcon} from 'Asset/image';

import Dog from './icon_dog.svg';
import Cat from './icon_cat.svg';

import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serveruri, cookieReset} from 'Screens/server';

export default MyProfile = () => {
	const [data, setData] = useState();
	React.useEffect(() => {
		const loadfn = async () => {
			await cookieReset(await AsyncStorage.getItem('token'));
			let profile = await axios.get(serveruri + '/user/getMyProfile');
			setData(profile.data.msg);
			console.log('profiledata');
			console.log(profile.data);
		};
		loadfn();
	}, []);

	return (
		<View style={profile.wrp_main}>
			<View style={[profile.cntr_profile, profile.shadow]}>
				<View style={profile.cntr_info}>
					<View style={profile.img_profile}>
						<Image
							style={profile.img_profile}
							source={{
								uri: data
									? data.profileImgUri
									: 'https://image-notepet.akamaized.net/resize/620x-/seimage/20190222%2F88df4645d7d2a4d2ed42628d30cd83d0.jpg',
							}}
						/>
					</View>

					<View style={profile.info_personal}>
						<Text style={txt.roboto36b}>{data ? data.nickname : ''}</Text>
						<Text style={txt.noto24r}>우리 귀요미 쥬쥬랑 죠죠를 소개합니당 애교 덩어리 쥬쥬&시크 존멋탱 죠죠</Text>
						<View>
							<View style={profile.stat_icon}>
								<View style={profile.icon_profile}>
									<Dog {...svg_size} />
								</View>
								<View style={profile.icon_profile}>
									<Cat {...svg_size} />
								</View>

								<View
									style={{
										width: 64 * DP,
										height: 38 * DP,
										borderRadius: 10 * DP,
										borderBottomRightRadius: 0,
										backgroundColor: '#FFB6A5',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Text style={[txt.noto24r, txt.white]}>임보</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				<View style={profile.cntr_social}>
					<View style={profile.item_social}>
						<Text style={txt.roboto36b}>20</Text>
						<Text style={[txt.noto24r, txt.gray]}>업로드</Text>
					</View>
					<View style={profile.item_social}>
						<Text style={txt.roboto36b}>4.5k</Text>
						<Text style={[txt.noto24r, txt.gray]}>팔로워</Text>
					</View>
					<View style={profile.item_social}>
						<Text style={txt.roboto36b}>20</Text>
						<Text style={[txt.noto24r, txt.gray]}>팔로잉</Text>
					</View>
					<View style={profile.item_social}>
						<Text style={txt.roboto36b}>20</Text>
						<Text style={[txt.noto24r, txt.gray]}>후원</Text>
					</View>
				</View>

				<View style={profile.cntr_btn}>
					<View style={[profile.btn_myprofile, profile.shadow]}>
						<Text style={[txt.noto24b, txt.white]}>내정보 수정</Text>
					</View>
					<View style={[profile.btn_myprofile, profile.shadow]}>
						<Text style={[txt.noto24b, txt.white]}>반려동물 정보 수정</Text>
					</View>
				</View>
			</View>

			<View style={profile.cntr_details}>
				<View style={profile.title_details}>
					<View style={profile.icon_detail}>
						<LikeIcon {...svg_size} />
					</View>

					<Text style={[txt.noto28b, txt.gray]}>즐겨찾기</Text>
				</View>
				<View style={profile.column_detail}>
					<View style={[profile.row_detail, profile.vertical_border]}>
						<Text style={[txt.noto24r, txt.gray]}>친구</Text>
						<View style={[profile.bracket, {marginRight: 30 * DP}]}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
					<View style={profile.row_detail}>
						<Text style={[txt.noto24r, txt.gray, {marginLeft: 30 * DP}]}>영상</Text>
						<View style={profile.bracket}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
				</View>
				<View style={profile.column_detail}>
					<View style={[profile.row_detail, profile.vertical_border]}>
						<Text style={[txt.noto24r, txt.gray]}>보호요청</Text>
						<View style={[profile.bracket, {marginRight: 30 * DP}]}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
				</View>
			</View>
			<View style={profile.cntr_details}>
				<View style={profile.title_details}>
					<View style={profile.icon_detail}>
						<PawIcon {...svg_size} fill="#FFB6A5" />
					</View>

					<Text style={[txt.noto28b, txt.gray]}>나의 활동</Text>
				</View>
				<View style={profile.column_detail}>
					<View style={[profile.row_detail, profile.vertical_border]}>
						<Text style={[txt.noto24r, txt.gray]}>내 게시글</Text>
						<View style={[profile.bracket, {marginRight: 30 * DP}]}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
					<View style={profile.row_detail}>
						<Text style={[txt.noto24r, txt.gray, {marginLeft: 30 * DP}]}>나를 태그한 글</Text>
						<View style={profile.bracket}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
				</View>
				<View style={profile.column_detail}>
					<View style={[profile.row_detail, profile.vertical_border]}>
						<Text style={[txt.noto24r, txt.gray]}>신청 내역</Text>
						<View style={[profile.bracket, {marginRight: 30 * DP}]}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
					<View style={profile.row_detail}>
						<Text style={[txt.noto24r, txt.gray, {marginLeft: 30 * DP}]}>동물 보호</Text>
						<View style={profile.bracket}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
				</View>
			</View>
			<View style={profile.cntr_details}>
				<View style={profile.title_details}>
					<View style={profile.icon_detail}>
						<SettingIcon {...svg_size} fill="#FFB6A5" />
					</View>

					<Text style={[txt.noto28b, txt.gray]}>설정</Text>
				</View>
				<View style={profile.column_detail}>
					<View style={[profile.row_detail, profile.vertical_border]}>
						<Text style={[txt.noto24r, txt.gray]}>정보 / 문의</Text>
						<View style={[profile.bracket, {marginRight: 30 * DP}]}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
					<View style={profile.row_detail}>
						<Text style={[txt.noto24r, txt.gray, {marginLeft: 30 * DP}]}>계정</Text>
						<View style={profile.bracket}>
							<Bracket {...svg_size} fill="gray" />
						</View>
					</View>
				</View>
			</View>

			<View>{/*popuparea*/}</View>
		</View>
	);
};

const profile = StyleSheet.create({
	wrp_main: {
		flex: 1,
		// backgroundColor: '#FFF',
	},
	wrp_contens: {
		paddingHorizontal: 48 * DP,
	},
	cntr_profile: {
		flexBasis: 508 * DP,
		backgroundColor: '#FFF',
	},
	cntr_info: {
		paddingHorizontal: 48 * DP,
		marginTop: 40 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	img_profile: {
		width: 192 * DP,
		height: 192 * DP,
		borderRadius: 96 * DP,
		marginRight: 40 * DP,
	},
	stat_icon: {
		flexDirection: 'row',
	},
	icon_profile: {
		width: 38 * DP,
		height: 38 * DP,
		marginRight: 10 * DP,
	},
	info_personal: {
		flex: 1,
	},
	cntr_social: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingHorizontal: 48 * DP,
		marginTop: 50 * DP,
	},
	item_social: {
		alignItems: 'center',
	},
	cntr_btn: {
		paddingHorizontal: 72 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 30 * DP,
	},
	btn_myprofile: {
		backgroundColor: '#FFB6A5',
		height: 60 * DP,
		width: 278 * DP,
		borderRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 3,
	},
	cntr_details: {
		marginBottom: 10 * DP,
		backgroundColor: '#FFF',
	},
	title_details: {
		flexBasis: 92 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: '#EDEDED',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 48 * DP,
	},
	column_detail: {
		flexBasis: 76 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: '#EDEDED',
		flexDirection: 'row',
		paddingHorizontal: 48 * DP,
	},
	row_detail: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	vertical_border: {
		borderRightColor: '#EDEDED',
		borderRightWidth: 2 * DP,
	},
	icon_detail: {
		width: 30 * DP,
		height: 30 * DP,
		marginRight: 10 * DP,
	},
	bracket: {
		width: 48 * DP,
		height: 48 * DP,
	},
});

const txt = StyleSheet.create({
	roboto36b: {
		fontFamily: 'Roboto-Bold',
		fontSize: 36 * DP,
		lineHeight: 46 * DP,
	},
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 41 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
	},
	white: {
		color: '#fff',
	},
	gray: {
		color: '#767676',
	},
});
