import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import ControllableAccountList from 'Organism/list/ControllableAccountList';
import {followUser, unFollowUser} from 'Root/api/userapi';
import Modal from 'Root/component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Loading from 'Root/component/molecules/modal/Loading';
import {GRAY10, WHITE} from 'Root/config/color';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';

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
			},
			err => {
				console.log('err / unFollowUser / SearchAccountA : ', err);
			},
		);
	};

	const renderItem = ({item, index}) => {
		return (
			<ControllableAccount
				data={item}
				showCrossMark={false}
				showButtons={false}
				onClickLabel={() => onClickAccount(item, index)}
				// onClickFollowBtn={() => onClickFollowBtn(item)}
				// onClickUnFollowBtn={() => onClickUnFollowBtn(item)}
			/>
		);
	};

	const ITEM_HEIGHT = (94 + 40) * DP;

	if (props.loading) {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[searchAccountA.container]}>
				{props.data == 'false' ? (
					<></>
				) : (
					// <ScrollView contentContainerStyle={{alignItems: 'center'}}>
					// 	<ControllableAccountList
					// 		items={props.data}
					// 		onClickAccount={onClickAccount}
					// 		showButtons={false}
					// 		onClickFollowBtn={onClickFollowBtn}
					// 		onClickUnFollowBtn={onClickUnFollowBtn}
					// 		listEmptyText={'검색 결과가 없습니다..'}
					// 	/>
					// </ScrollView>
					<FlatList
						data={props.data}
						renderItem={renderItem}
						contentContainerStyle={{width: 750 * DP, alignItems: 'center', marginTop: 0 * DP}}
						keyExtractor={item => item._id}
						getItemLayout={(data, index) => {
							if (!data[index]) return {length: 0, offset: 0, index: index};
							return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index: index};
						}}
						ListHeaderComponent={
							<View style={{marginTop: 12 * DP, marginBottom: 20 * DP, width: 694 * DP}}>
								<Text style={[txt.noto24, {color: GRAY10}]}>검색 결과 {props.data.length}개</Text>
							</View>
						}
						ListEmptyComponent={<ListEmptyInfo paddingVertical={540 * DP} text={props.listEmptyText} />}
						windowSize={5}
					/>
				)}
			</View>
		);
});

SearchAccountA.defaultProps = {
	loading: false,
};

const searchAccountA = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WHITE,
		alignItems: 'center',
	},
	listContainer: {
		width: 750 * DP,
		alignSelf: 'center',
	},
	title: {
		marginLeft: 48 * DP,
		height: 42 * DP,
		marginBottom: 16 * DP,
	},
	no_selectedItem: {},
	selectedItem: {
		// borderColor: APRI10,
		borderRadius: 40 * DP,
		// borderWidth: 2 * DP,
	},
});
