import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followerList} from 'Templete/style_templete';
import {unFollowUser, followUser} from 'Root/api/userapi';
import InputWithSearchIcon from 'Root/component/molecules/input/InputWithSearchIcon';
import {useNavigation} from '@react-navigation/core';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';
import {styles} from 'Root/component/atom/image/imageStyle';
import {APRI10} from 'Root/config/color';

/**
 * 팔로워 팔로우 목록
 * @param {object} props - Props Object
 * @param {object} props.followers - 팔로워 리스트
 * @param {object} props.follows - 팔로우 리스트
 * @param {void} props.resetProfileInfo - 프로필 정보 갱신
 * @param {(text:string)=>void} props.onChangeSearchInput - 프로필 정보 갱신
 * @param {boolean} props.loading - 로딩 여부
 */
export default FollowerList = props => {
	const navigation = useNavigation();
	const isFollowing = props.route.name != 'FollowingList';
	const [input, setInput] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [follower, setFollower] = React.useState([]);
	const [follow, setFollow] = React.useState([]);

	React.useEffect(() => {
		setFollower(props.followers);
		setLoading(false);
	}, [props.followers]);

	React.useEffect(() => {
		setFollow(props.follows);
		setLoading(false);
	}, [props.follows]);

	const onClickFollowBtn = item => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			followUser(
				{follow_userobject_id: item._id},
				result => {
					console.log('result / followUser / FollwerList :', result.msg);
					props.resetProfileInfo();
				},
				err => {
					console.log('err / followUser / FollwerList : ', err);
				},
			);
		}
	};

	const onClickUnFollowBtn = item => {
		// console.log('onClickUnFollowBtn', item);
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			unFollowUser(
				{follow_userobject_id: item._id},
				result => {
					// console.log('result / onClickUnFollowBtn / FollwerList : ', result.msg);
					props.resetProfileInfo();
				},
				err => {
					console.log('err / onClickUnFollowBtn / FollwerList', err);
				},
			);
		}
	};

	const onClickAccount = item => {
		navigation.push('UserProfile', {userobject: item});
	};

	if (props.loading) {
		// return <Loading isModal={false} />;
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size={'large'} color={APRI10} />
			</View>
		);
	} else
		return (
			<View style={[followerList.container]}>
				<ScrollView style={[{flex: 0}]}>
					{/* <View style={[followerList.inputWitchSearch, {alignSelf: 'center'}]}>
						<InputWithSearchIcon value={input} onChange={onChangeSearchInput} onSearch={onSearch} placeholder={'검색어를 입력해주세요.'} />
					</View> */}
					{loading ? (
						<Loading isModal={false} />
					) : (
						<View style={[{alignItems: 'center'}]}>
							{props.route.name != 'FollowingList' ? (
								<ControllableAccountList
									items={follower}
									showButtons={true}
									onClickAccount={onClickAccount}
									onClickFollowBtn={onClickFollowBtn}
									onClickUnFollowBtn={onClickUnFollowBtn}
									showFollowStatusText={false}
									width={400}
								/>
							) : (
								<ControllableAccountList
									items={follow}
									showButtons={true}
									onClickAccount={onClickAccount}
									onClickUnFollowBtn={onClickUnFollowBtn}
									onClickFollowBtn={onClickFollowBtn}
									showFollowStatusText={false}
									width={400}
								/>
							)}
						</View>
					)}
				</ScrollView>
				{/* <View style={[followerList.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View> */}
				{/* <Loading isModal={false} /> */}
			</View>
		);
};

FollowerList.defaultProps = {
	resetProfileInfo: () => {},
	onChangeSearchInput: () => {},
};
