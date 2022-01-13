import React, {useState, useRef} from 'react';
import {Text, View, Image, ScrollView, TouchableWithoutFeedback, SafeAreaView, StyleSheet,Animated} from 'react-native';

import {DownBracketBlack, DownBracket, BtnWriteFeed} from 'Asset/image';
import {BracketDown, FloatBtnWrite} from 'Asset/image_v2';

import BelongedPetList from './subcomponent/belongedPetList';
import ProfileInfo from './subcomponent/profileInfo';

import DP from 'Screens/dp';
import SvgWrapper, {SvgWrap} from 'Screens/svgwrapper';

import Dropdown from 'Screens/common/dropdown';
import FeedList from './subcomponent/feedlist';
import VolunteerList from './subcomponent/volunteerList';
import profiledata from './profiledata.json';
import {getUserProfile, getUserPetList} from 'Root/api/userapi';
import {MAINCOLOR, WHITE} from 'Root/screens/color';
import {txt} from 'Screens/textstyle';
import {layout, text, button, float_btn} from './style_profile';

export default Profile = ({navigation, route}) => {
	const [data, setData] = React.useState({user: {}, postList: [], isFollowed: false});
	const FEED = 1;
	const TAG = 2;
	const ACTIVITY = 3;

	React.useEffect(() => {
		navigation.setOptions({
			title: route.params ? route.params.user_nickname : '존재하지 않는 유저입니다.',
		});
		setData({...data, isFollowed: false});
	}, []);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', e => {
			getUserProfile(
				{
					user_id: route.params?.user_id,
				},
				result => {
					// console.log(result);
					setData(result);
				},
			);
		});
		return unsubscribe;
	}, [navigation, route]);

	const [tab, setTab] = useState(FEED);

	const [petList, setPetList] = React.useState([]);

	const test = () => {
		// console.log(route.params);
		console.log(route.name);
		console.log(data.user);

		// getUserPetList({user_id: data.user}, pets => {
		// 	console.log('pets'+ JSON.stringify(pets));
		// 	// setPetList(pets.belonged_pets);
		// });
	};

	const moveToWrite = () => {
		navigation.navigate('WriteFeed', {screen: 'writeFeed', params: {navfrom: 'Profile'}, merge: true});
	};

	const petListClose = () => {
		setAnimal(!animal);
	};

	const petListOpen = () => {
		if (petList.length === 0) {
			getUserPetList({user_id: data.user._id}, pets => {
				// console.log('pets'+ JSON.stringify(pets));
				setPetList(pets.belonged_pets);
			});
		}
		setAnimal(!animal);
	};

	const petBtnClick = () => {
		if (!animal) {
			petListOpen();
		} else {
			petListClose();
		}
	};

	const onTabFeed = () => {
		if (FEED !== tab) setTab(FEED);
		petListClose();
	};

	const onTabTag = () => {
		if (TAG !== tab) setTab(TAG);
		petListClose();
	};

	const onTabActivity = () => {
		if (ACTIVITY !== tab) setTab(ACTIVITY);
		petListClose();
	};

	const onFeedScroll = () => {
		if (animal) petListClose();
	};

	const followUser = () => {
		alert(route.params.user_nickname + '을 팔로우합니다.');
	};
	//animation setting

	const [animal, setAnimal] = useState(false);


	return (
		<View style={layout.container}>
			<ProfileInfo data={data.user} />
			<TouchableWithoutFeedback onPress={test}>
				<View style={{backgroundColor: 'red', width: 80 * DP, height: 80 * DP, position: 'absolute', top: 0, left: 30}} />
			</TouchableWithoutFeedback>
			<View style={[layout.profileButtonContainer]}>
				{!data.isFollowed ? (
					<TouchableWithoutFeedback onPress={followUser}>
						<View style={[button.followButton_not_followed, button.shadow]}>
							<Text style={[txt.noto24, {color: MAINCOLOR, lineHeight: 36 * DP}]}>팔로우</Text>
						</View>
					</TouchableWithoutFeedback>
				) : (
					<Dropdown
						style={button.followButton}
						dropdownContainerStyle={[
							button.followButtonDropDown,
							// !data.isFollowed?button.shadow:{},
							// !data.isFollowed?{elevation:3}:{},
							
						]}
						data={['즐겨찾기 추가', '소식받기', '차단', '팔로우 취소']}
						dropItemStyle={{marginVertical: 3 * DP, paddingHorizontal: 30 * DP}}
						dropItemTxtStyle={[txt.noto30, {lineHeight: 48 * DP}, txt.white]}
						listBackgroundStyle={[{height: 240 * DP, marginTop: 60 * DP}]}
						listContainerStyle={{height: 240 * DP, justifyContent: 'space-between', alignItems: 'center'}}
						onSelect={e => {
							alert(e);
						}}
						onSelectNotClose={true}
						onOpen={() => {
						}}
						onClose={() => {
						}}
						animation
						component={
							<>
								<Text style={[txt.noto24, {lineHeight: 36 * DP}, txt.white]}>{'팔로우 중'}</Text>
								<SvgWrapper style={[button.followButtonBracketsize]} svg={<BracketDown fill={WHITE} />} />
							</>
						}
					/>
				)}
				<TouchableWithoutFeedback onPress={petBtnClick}>
					<View style={[button.profileButton, button.shadow]}>
						<Text style={[txt.noto24,{color: MAINCOLOR, lineHeight: 36 * DP}]}>반려 동물</Text>
						<SvgWrapper style={[button.profileButtonBracketsize]} svg={<BracketDown fill={MAINCOLOR} />} />
					</View>
				</TouchableWithoutFeedback>
			</View>

			<Animated.View style={[]}>
				<BelongedPetList data={petList} />
			</Animated.View>

			<View style={layout.tabarea}>
				<TabMenu onPress={onTabFeed} label="피드" selected={tab === FEED} />
				<TabMenu onPress={onTabTag} label="테그된 피드" selected={tab === TAG} />
				<TabMenu onPress={onTabActivity} label="보호활동" selected={tab === ACTIVITY} />
			</View>

			<Animated.View style={[layout.volunteeractivity]}>
				<VolunteerList data={profiledata.profile.volunteeractivity} />
			</Animated.View>

			<FeedList data={data.postList} onScrollBeginDrag={onFeedScroll} />

			<View style={[float_btn.btn_write_shadow]} />

			<TouchableWithoutFeedback onPress={moveToWrite}>
				<View style={float_btn.btn_write}>
					<SvgWrapper style={{width: 70 * DP, height: 70 * DP}} svg={<BtnWriteFeed fill="#fff" />} />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const TabMenu = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={[layout.tabItem, props.selected ? layout.tabcolor : layout.white]}>
				<Text style={props.selected ? [text.bold28, text.white] : [text.regular28cjk, text.gray]}>{props.label}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

