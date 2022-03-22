import React from 'react';
import {ActivityIndicator, ScrollView, Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {getAnimalListWithApplicant} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import UserDescriptionLabel from 'Root/component/molecules/label/UserDescriptionLabel';
import {Star50_Border} from 'Root/component/atom/icon';

//ShelterMenu => 신청서 조회 [Nav명 - ProtectionAplicationList]
export default ProtectionApplicationList = ({route, navigation}) => {
	const [adoptionList, setAdoptionList] = React.useState('false');
	const [protectList, setProtectList] = React.useState('false');

	React.useEffect(() => {
		getAnimalListWithApplicant(
			{},
			result => {
				console.log('result / getAnimalListWithApplicant / ProtectApplyList', JSON.stringify(result.msg.adopt));
				const filtered_adopt = result.msg.adopt.filter(e => e.protect_act_status == 'wait'); //완료 목록도 출력되던 오류 수정 22.03.18
				const filtered_protect = result.msg.protect.filter(e => e.protect_act_status == 'wait');
				setAdoptionList(filtered_adopt);
				setProtectList(filtered_protect);
			},
			err => {
				console.log('err / getAnimalListWithApplicant', err);
				setAdoptionList([]);
				setProtectList([]);
			},
		);
	}, []);

	const whenEmpty = () => {
		return (
			<View style={[{height: 100 * DP, width: '100%', marginVertical: 30 * DP, alignItems: 'center', justifyContent: 'center'}]}>
				<Text style={[txt.roboto30b, {color: GRAY10}]}> 목록이 없습니다.</Text>
			</View>
		);
	};

	//입양 신청 건 클릭
	const onClickAdoptionItem = i => {
		navigation.push('ProtectApplyForm', {data: adoptionList[i], route: route.name});
	};

	//임시 보호 신청 건 클릭
	const onClickProtectItem = i => {
		console.log('protectList', protectList[i]);
		navigation.push('ProtectApplyForm', {data: protectList[i], route: route.name});
	};

	const listItem = (v, i, isAdopt) => {
		return (
			<View style={[style.listItem]} key={i}>
				<UserDescriptionLabel
					data={v.protect_act_applicant_id}
					width={360}
					onClickLabel={() => (isAdopt ? onClickAdoptionItem(i) : onClickProtectItem(i))}
				/>
				<Star50_Border />
			</View>
		);
	};

	const isLoaded = protectList == 'false' || adoptionList == 'false';

	if (isLoaded) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	} else {
		return (
			<View style={[style.container]}>
				{/* 입양신청 */}
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>입양 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{adoptionList.length}</Text>
					</View>
					<View style={[style.list]}>
						<FlatList data={adoptionList} renderItem={({item, index}) => listItem(item, index, true)} ListEmptyComponent={whenEmpty()} />
					</View>
				</View>
				{/* 임시보호신청 */}
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>임시 보호 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{protectList.length}</Text>
					</View>
					<View style={[style.list]}>
						<FlatList data={protectList} renderItem={({item, index}) => listItem(item, index, false)} ListEmptyComponent={whenEmpty()} />
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
