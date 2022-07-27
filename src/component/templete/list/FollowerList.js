import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followerList} from 'Templete/style_templete';
import {unFollowUser, followUser} from 'Root/api/userapi';
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
	const [loading, setLoading] = React.useState(false);
	const [follower, setFollower] = React.useState([]);
	const [follow, setFollow] = React.useState([]);
	const [pressed, setPressed] = React.useState(false);
	const isPreView = userGlobalObject.userInfo.isPreviewMode;
	const isFollowing = props.route.name != 'FollowingList';

	React.useEffect(() => {
		const subscribe = navigation.addListener('focus', () => {
			setPressed(false);
		});
		return subscribe;
	}, []);

	React.useEffect(() => {
		navigation.navigate(props.screen);
	}, [props.screen]);

	React.useEffect(() => {
		setFollower(props.followers);
		setLoading(false);
	}, [props.followers]);

	React.useEffect(() => {
		setFollow(props.follows);
		setLoading(false);
	}, [props.follows]);

	const onClickFollowBtn = (item, index, bool) => {
		if (isPreView) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
			});
		} else {
			if (!isFollowing) {
				let temp = [...follow];
				temp[index].follow = !temp[index].follow;
				setFollow(temp);
			} else {
				let temp = [...follower];
				temp[index].follow = !temp[index].follow;
				setFollower(temp);
			}

			if (bool) {
				followUser(
					{follow_userobject_id: item._id},
					result => {
						console.log('result / followUser / FollwerList :', result.msg);
						if (isFollowing) {
							props.resetProfileInfo();
						}
					},
					err => {
						console.log('err / followUser / FollwerList : ', err);
					},
				);
			} else {
				unFollowUser(
					{follow_userobject_id: item._id},
					result => {
						// console.log('result / onClickUnFollowBtn / FollwerList : ', result.msg);
						if (isFollowing) {
							props.resetProfileInfo();
						}
					},
					err => {
						console.log('err / onClickUnFollowBtn / FollwerList', err);
					},
				);
			}
		}
	};

	const onClickAccount = item => {
		setPressed(true);
		if (!pressed) {
			navigation.navigate({key: new Date().getTime(), name: 'UserProfile', params: {userobject: item}});
		}
	};

	if (props.loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size={'large'} color={APRI10} />
			</View>
		);
	} else
		return (
			<View style={[followerList.container]}>
				<ScrollView style={[{flex: 0}]}>
					{loading ? (
						<Loading isModal={false} />
					) : (
						<View style={[{alignItems: 'center'}]}>
							{props.route.name != 'FollowingList' ? (
								<ControllableAccountList
									items={follower}
									showButtons={isPreView ? false : true}
									onClickAccount={onClickAccount}
									onClickFollowBtn={(item, index) => onClickFollowBtn(item, index, true)}
									onClickUnFollowBtn={(item, index) => onClickFollowBtn(item, index, false)}
									showFollowStatusText={false}
									width={400}
								/>
							) : (
								<ControllableAccountList
									items={follow}
									showButtons={isPreView ? false : true}
									onClickAccount={onClickAccount}
									onClickFollowBtn={(item, index) => onClickFollowBtn(item, index, true)}
									onClickUnFollowBtn={(item, index) => onClickFollowBtn(item, index, false)}
									showFollowStatusText={false}
									width={400}
								/>
							)}
						</View>
					)}
				</ScrollView>
			</View>
		);
};

FollowerList.defaultProps = {
	resetProfileInfo: () => {},
	onChangeSearchInput: () => {},
};
