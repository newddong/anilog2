import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {searchAccountA} from 'Templete/style_templete';
import {followUser, unFollowUser} from 'Root/api/userapi';
import Modal from 'Root/component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Loading from 'Root/component/molecules/modal/Loading';
import {GRAY10} from 'Root/config/color';

export default SearchAccountA = React.memo((props, ref) => {
	// console.log('SearchAccountA', props.data);

	//계정 클릭 콜백
	const onClickAccount = (item, index) => {
		props.navigation.navigate('UserProfile', {userobject: item});
	};

	const onClickFollowBtn = userObject => {
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

	if (props.loading) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[searchAccountA.container]}>
				{props.data == 'false' ? (
					<View style={[{alignItems: 'flex-start', width: 694 * DP, marginTop: 20 * DP}]}>
						<Text style={[txt.noto24]}>최근 본 계정</Text>
					</View>
				) : (
					<ScrollView contentContainerStyle={{alignItems: 'center'}}>
						<View style={{marginTop: 12 * DP, width: 694 * DP}}>
							<Text style={[txt.noto24, {color: GRAY10}]}>검색 결과 {props.data.length}개</Text>
						</View>
						<ControllableAccountList
							items={props.data}
							onClickAccount={onClickAccount}
							showButtons={false}
							onClickFollowBtn={onClickFollowBtn}
							onClickUnFollowBtn={onClickUnFollowBtn}
							listEmptyText={'검색 결과가 없습니다.'}
						/>
					</ScrollView>
				)}
			</View>
		);
});

SearchAccountA.defaultProps = {
	loading: false,
};
