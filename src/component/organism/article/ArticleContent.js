import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY10, FavoriteTag46_Filled, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import {dummy_userObject} from 'Root/config/dummyDate_json';
import WebView from 'react-native-webview';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressFavorite - 좋아요 클릭
 * @param {()=>void} props.onPressMeatball - 미트볼 클릭
 * @param {()=>void} props.onPressArticle - 내용 클릭
 * @param {string} props.route - 부모 컴포넌트 이름
 */
const ArticleContent = props => {
	const data = props.data;
	// console.log('ArticleContent', props.data);
	const gg = {
		__v: 0,
		_id: '6243286dd34407f688757229',
		community_address: {
			_id: '6243286dd34407f68875722a',
			normal_address: {_id: '6243286dd34407f68875722c', address_name: '서울 마포구 신수동 89-60 203', city: '서울', district: '마포구'},
			region: {_id: '6243286dd34407f68875722d', latitude: '37.549085703390965', longitude: '126.93715645305367'},
			road_address: {_id: '6243286dd34407f68875722b', address_name: '서울특별시 마포구 광성로4길 10-7 203', city: '서울', district: '마포구'},
		},
		community_animal_type: '',
		community_comment_count: 0,
		community_content:
			'<div>심화과정 하하</div><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648568424275_405E7F8C-4303-4141-B53C-446EF7325ABD.jpg" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648568424483_04EC65EE-5B13-4E6E-9A79-2E3D0907A050.jpg" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><br></p>',
		community_date: '2022-03-29T15:31:14.495Z',
		community_favorite_count: 0,
		community_free_type: 'talk',
		community_interests: {interests_etc: [], interests_hospital: [], interests_interior: [], interests_review: [], interests_trip: []},
		community_is_attached_file: true,
		community_is_delete: false,
		community_is_recomment: false,
		community_is_temporary: false,
		community_like_count: 0,
		community_title: '잡담 1',
		community_type: 'free',
		community_update_date: '2022-03-29T15:31:14.495Z',
		community_writer_id: {
			__v: 9,
			_id: '623b17ed400ac30b877dd7d9',
			pet_family: [],
			type: 'UserObject',
			user_address: {city: '강원도', district: '원주시', neighbor: '소초면'},
			user_agreement: {
				is_donation_info: true,
				is_location_service_info: true,
				is_marketting_info: true,
				is_over_fourteen: true,
				is_personal_info: true,
				is_service: true,
			},
			user_denied: false,
			user_follow_count: 7,
			user_follower_count: 5,
			user_interests: {
				interests_activity: [Array],
				interests_beauty: [Array],
				interests_food: [Array],
				interests_health: [Array],
				interests_location: [Array],
			},
			user_introduction: '',
			user_is_verified_email: false,
			user_is_verified_phone_number: true,
			user_mobile_company: 'SK텔레콤',
			user_my_pets: [
				'623b4533400ac30b877de347',
				'6242801ed1eff95f7778bdff',
				'6242805dd1eff95f7778be0e',
				'624280fdd1eff95f7778be5b',
				'6242814fd1eff95f7778beb4',
				'6242817ad1eff95f7778bedf',
				'624281bad1eff95f7778bf47',
				'62428271d1eff95f7778bf8f',
				'62428289d1eff95f7778bf9e',
			],
			user_name: 'Kims',
			user_nickname: '자네는고양이어딘가',
			user_password: '12',
			user_phone_number: '33',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648045670715_812A892F-3DE8-4C38-96D8-2F6A6BC78091.jpg',
			user_register_date: '2022-03-23T12:51:57.812Z',
			user_type: 'user',
			user_update_date: '2022-03-23T12:51:57.812Z',
			user_upload_count: 9,
		},
		type: 'CommunityObject',
	};

	const onPressArticle = () => {
		props.onPressArticle();
	};

	const onPressMeatball = () => {
		props.onPressMeatball();
	};

	const onPressFavorite = () => {
		props.onPressFavorite();
	};

	const getArticleType = () => {
		switch (data.community_free_type) {
			case 'talk':
				return '잡담';
			case 'question':
				return '질문';
			case 'meeting':
				return '모임';
			default:
				break;
		}
	};
	const [height, setHeight] = React.useState(500);

	React.useEffect(() => {
		console.log('he', height);
	}, [height]);

	const onWebViewMessage = event => {
		setHeight(parseInt(event.nativeEvent.data));
	};

	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<View style={[style.header_title]}>
					<Text style={[txt.noto32b, {color: APRI10}]}>
						{getArticleType()}
						{'  '}
					</Text>
					<Text style={[txt.noto32b]}>우리 강아지 매기</Text>
				</View>
				<View style={[style.header_icon]}>
					<FavoriteTag46_Filled onPress={onPressFavorite} />
					<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
				</View>
			</View>
			<View style={[style.profile]}>
				<UserLocationTimeLabel data={data.community_writer_id} time={data.community_update_date} />
			</View>
			<TouchableOpacity activeOpacity={1} onPress={onPressArticle}>
				<View style={[{width: 700 * DP, marginTop: 20 * DP}]}>
					<WebView
						originWhitelist={['*']}
						onMessage={onWebViewMessage}
						injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
						source={{
							html: `
        	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
			${data.community_content} 
        `,
						}}
						style={[
							style.webview,
							{
								height: height,
							},
						]}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};

ArticleContent.defaultProps = {
	onPressFavorite: () => {},
	onPressMeatball: () => {},
	onPressArticle: () => {},
};
export default ArticleContent;

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		alignSelf: 'center',
	},
	header: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 50 * DP,
		justifyContent: 'space-between',
	},
	header_title: {
		width: 544 * DP,
		flexDirection: 'row',
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	profile: {
		marginTop: 12 * DP,
	},
	hashText: {
		width: 634 * DP,
		marginTop: 10 * DP,
	},
	footer: {
		// flex: 1,
		width: 150 * DP,
		alignSelf: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	webview: {
		width: 700 * DP,
		// minHeight: 500 * DP,
	},
});
