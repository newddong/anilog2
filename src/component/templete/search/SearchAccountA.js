import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {searchAccountA} from 'Templete/style_templete';
import {followUser, unFollowUser} from 'Root/api/userapi';
import Modal from 'Root/component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import dp from 'Root/config/dp';

export default SearchAccountA = React.memo((props, ref) => {
	// console.log('SearchAccountA', props.data);

	//계정 클릭 콜백
	const onClickAccount = (item, index) => {
		let sendUserobject = {_id: item._id};
		props.onClickUser(sendUserobject);
	};

	const onClickFollowBtn = userObject => {
		console.log('onClickFollowBtn');
		followUser(
			{
				follow_userobject_id: userObject._id,
			},
			result => {
				console.log('result / followUser / SearchAccountA : ', result.msg);
				getList();
			},
			err => {
				console.log('err / followUser / SearchAccountA : ', err);
				Modal.close();
			},
		);
	};

	const onClickUnFollowBtn = userObject => {
		console.log('onClickunfoolow');
		unFollowUser(
			{
				follow_userobject_id: userObject._id,
			},
			result => {
				console.log('result / unFollowUser / SearchAccountA : ', result.msg);
				getList();
			},
			err => {
				console.log('err / unFollowUser / SearchAccountA : ', err);
			},
		);
	};

	return (
		<View style={[searchAccountA.container]}>
			{props.data == 'false' ? (
				<View style={[{alignItems: 'flex-start', width: 654 * dp, marginTop: 20 * dp}]}>
					<Text style={[txt.noto24]}>최근 본 계정</Text>
				</View>
			) : (
				<ScrollView>
					<ControllableAccountList
						items={props.data}
						onClickAccount={onClickAccount}
						showButtons={false}
						onClickFollowBtn={onClickFollowBtn}
						onClickUnFollowBtn={onClickUnFollowBtn}
					/>
				</ScrollView>
			)}
		</View>
	);
});
