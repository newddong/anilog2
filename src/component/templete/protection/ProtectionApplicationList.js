import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {getAnimalListWithApplicant} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import UserDescriptionLabel from 'Root/component/molecules/label/UserDescriptionLabel';
import {EmptyIcon, Star50_Border, Star50_Filled} from 'Root/component/atom/icon';
import Loading from 'Root/component/molecules/modal/Loading';
import {followUser, getChekingFollow, unFollowUser} from 'Root/api/userapi';

//ShelterMenu => 신청서 조회 [Nav명 - ProtectionAplicationList]
export default ProtectionApplicationList = ({route, navigation}) => {
	const [adoptionList, setAdoptionList] = React.useState('false');
	const [protectList, setProtectList] = React.useState('false');

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		getAnimalListWithApplicant(
			{},
			result => {
				// console.log('result / getAnimalListWithApplicant / ProtectApplyList', JSON.stringify(result.msg.adopt));
				let filtered_adopt = result.msg.adopt.filter(e => e.protect_act_status == 'wait'); //완료 목록도 출력되던 오류 수정 22.03.18
				let filtered_protect = result.msg.protect.filter(e => e.protect_act_status == 'wait');
				setAdoptionList(filtered_adopt);
				setProtectList(filtered_protect);
			},
			err => {
				console.log('err / getAnimalListWithApplicant', err);
				setAdoptionList([]);
				setProtectList([]);
			},
		);
	};

	//입양 신청 건 클릭
	const onClickAdoptionItem = i => {
		navigation.push('ProtectApplyForm', {data: adoptionList[i], route: route.name});
	};

	//임시 보호 신청 건 클릭
	const onClickProtectItem = i => {
		// console.log('protectList', protectList[i]);
		navigation.push('ProtectApplyForm', {data: protectList[i], route: route.name});
	};

	const onCliclFollow = (id, bool) => {
		console.log('onClickFollow', id, bool);
		if (bool) {
			followUser(
				{
					follow_userobject_id: id,
				},
				result => {
					console.log('followUser / ProtectionApplicationList :  ', result.msg);
					fetchData();
				},
				err => {
					console.log(' err / ProtectionApplicationList : ', err);
				},
			);
		} else {
			unFollowUser(
				{
					follow_userobject_id: id,
				},
				result => {
					console.log('followUser / ProtectionApplicationList : ', result.msg);
					fetchData();
				},
				err => {
					console.log(' err / ProtectionApplicationList : ', err);
				},
			);
		}
	};

	const listItem = (v, i, isAdopt) => {
		return (
			<View style={[style.listItem]} key={i}>
				<UserDescriptionLabel
					data={v.protect_act_applicant_id}
					width={360}
					onClickLabel={() => (isAdopt ? onClickAdoptionItem(i) : onClickProtectItem(i))}
				/>
				{v.is_follow ? (
					<Star50_Filled onPress={() => onCliclFollow(v.protect_act_applicant_id._id, false, i)} />
				) : (
					<Star50_Border onPress={() => onCliclFollow(v.protect_act_applicant_id._id, true, i)} />
				)}
			</View>
		);
	};

	const whenEmpty = type => {
		return (
			<View style={[{marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<EmptyIcon />
				<Text style={[txt.roboto30b, {marginTop: 15 * DP}]}> {type}건이 없습니다.</Text>
			</View>
		);
	};

	const isLoaded = protectList == 'false' || adoptionList == 'false';

	if (isLoaded) {
		return <Loading isModal={false} />;
	} else {
		return (
			<View style={[style.container]}>
				{/* 입양신청 */}
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>입양 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{adoptionList.length == 0 ? '' : adoptionList.length}</Text>
					</View>
					<View style={[style.list]}>
						<FlatList data={adoptionList} renderItem={({item, index}) => listItem(item, index, true)} ListEmptyComponent={whenEmpty('입양신청')} />
					</View>
				</View>
				{/* 임시보호신청 */}
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>임시 보호 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{protectList.length == 0 ? '' : protectList.length}</Text>
					</View>
					<View style={[style.list]}>
						<FlatList
							data={protectList}
							renderItem={({item, index}) => listItem(item, index, false)}
							ListEmptyComponent={whenEmpty('임시 보호 신청')}
						/>
					</View>
				</View>
			</View>
		);
	}
};

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		// backgroundColor: 'red',
		flex: 1,
	},
	listContainer: {
		marginTop: 40 * DP,
	},
	listTitle: {
		alignSelf: 'flex-start',
	},
	list: {
		width: 654 * DP,
		marginTop: 40 * DP,
		// backgroundColor: 'lightblue',
	},
	listItem: {
		marginBottom: 30 * DP,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		// backgroundColor: 'pink',
	},
});
