import React from 'react';
import {ScrollView, View} from 'react-native';
import {dummy_userObject} from 'Root/config/dummyDate_json';
import {Write94} from 'Atom/icon';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {linkedAccountList} from 'Templete/style_templete';
import {getFollows, getFollowers} from 'Root/api/userapi';
import Modal from 'Component/modal/Modal';

export default LinkedAccountList = props => {
	const onWrite = () => {
		console.log('Onwrite');
	};

	const [myFollower, setMyFollower] = React.useState(); // 팔로워리스트 현재 빈 값
	const [recommendedList, setRecommendedList] = React.useState(); // 추천리스트 현재 빈 값

	// console.log('초기 파라메터', props.route.params);

	React.useEffect(() => {
		getFollowers(
			{
				userobject_id: props.route.params.userobject._id,
			},
			result => {
				setMyFollower(result.msg.map(v => v.follower_id));
			},
			err => {
				// Modal.alert(err);
			},
		);
	}, []);

	return (
		<View style={[linkedAccountList.container]}>
			<ScrollView style={[{flex: 0}]}>
				<View style={[linkedAccountList.insideContainer]}>
					<View style={[linkedAccountList.accountList_step1]}>
						<ControllableAccountList items={myFollower} title={'팔로워'} />
					</View>

					<View style={[linkedAccountList.accountList_step1]}>
						<ControllableAccountList items={recommendedList} title={'추천'} showCrossMark={true} />
					</View>
				</View>
			</ScrollView>
			<View style={[linkedAccountList.floatingBtn]}>
				<Write94 onPress={onWrite} />
			</View>
		</View>
	);
};
LinkedAccountList.defaultProps = {};
