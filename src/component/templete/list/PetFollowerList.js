import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followerList} from 'Templete/style_templete';
import {unFollowUser, followUser, getFollowers} from 'Root/api/userapi';
import InputWithSearchIcon from 'Root/component/molecules/input/InputWithSearchIcon';
import {useNavigation} from '@react-navigation/core';
import Loading from 'Root/component/molecules/modal/Loading';
import userGlobalObject from 'Root/config/userGlobalObject';
import Modal from 'Root/component/modal/Modal';

/**
 * 팔로워 팔로우 목록
 * @param {object} props - Props Object
 * @param {object} props.followers - 팔로워 리스트
 * @param {object} props.follows - 팔로우 리스트
 * @param {void} props.resetProfileInfo - 프로필 정보 갱신
 * @param {(text:string)=>void} props.onChangeSearchInput - 프로필 정보 갱신
 * @param {boolean} props.loading - 로딩 여부
 */
export default PetFollowerList = props => {
	const navigation = useNavigation();
	const [loading, setLoading] = React.useState(false);
	const [follower, setFollower] = React.useState('false');
	const [followerInput, setFollowerInput] = React.useState('');
	const isPreView = userGlobalObject.userInfo.isPreviewMode;
	const params = props.route.params;

	React.useEffect(() => {
		// getFollower();
		navigation.setOptions({title: params.title + ' 팔로워'});
	}, []);

	React.useEffect(() => {
		setLoading(true);
		getFollower();
	}, [followerInput]);

	//팔로워 목록 받아오기
	const getFollower = text => {
		getFollowers(
			{
				userobject_id: params.userobject._id,
				user_nickname: followerInput,
			},
			result => {
				// console.log('result / getFollowers / ', result.msg[0]);
				let filtered = result.msg;
				filtered.map((v, i) => {
					v.follow_id = {...v.follow_id, follow: v.follow};
				});
				setFollower(filtered.map(v => v.follow_id));
				setLoading(false);
			},
			err => {
				console.log('getFollowers / error / FollwerList : ', err);
				setFollower([]);
				setLoading(false);
			},
		);
	};

	const onClickFollowBtn = item => {
		if (isPreView) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
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
		if (isPreView) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('LoginRequired');
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

	const onChangeSearchInput = text => {
		setFollowerInput(text);
	};

	const onClickAccount = item => {
		navigation.push('UserProfile', {userobject: item});
	};

	if (follower == 'false') {
		return (
			<View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	} else
		return (
			<View style={[followerList.container]}>
				<ScrollView style={[{flex: 0}]}>
					<View style={[followerList.inputWitchSearch, {alignSelf: 'center'}]}>
						<InputWithSearchIcon value={followerInput} onChange={onChangeSearchInput} placeholder={'검색어를 입력해주세요.'} />
					</View>
					{loading ? (
						<Loading isModal={false} />
					) : (
						<View style={[{alignItems: 'center'}]}>
							<ControllableAccountList
								items={follower}
								showButtons={true}
								onClickAccount={onClickAccount}
								onClickFollowBtn={onClickFollowBtn}
								onClickUnFollowBtn={onClickUnFollowBtn}
								showFollowStatusText={false}
								width={400}
							/>
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