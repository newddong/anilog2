import React from 'react';
import {ActivityIndicator, ScrollView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {getAnimalListWithApplicant} from 'Root/api/shelterapi';
import {txt} from 'Root/config/textstyle';
import {APRI10, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import UserDescriptionLabel from 'Root/component/molecules/label/UserDescriptionLabel';
import {Star50_Border} from 'Root/component/atom/icon';

//ShelterMenu => 신청서 조회 [Nav명 - ProtectionAplicationList]
export default ProtectionApplicationList = ({route, navigation}) => {
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정
	const [adoptionList, setAdoptionList] = React.useState([]);
	const [protectList, setProtectList] = React.useState([]);

	React.useEffect(() => {
		getAnimalListWithApplicant(
			{},
			result => {
				// console.log('result / getAnimalListWithApplicant / ProtectApplyList', JSON.stringify(result.msg.adopt));
				const filtered_adopt = result.msg.adopt.filter(e => e.protect_act_status != 'accept');
				const filtered_protect = result.msg.protect.filter(e => e.protect_act_status != 'accept');
				setAdoptionList(filtered_adopt);
				setProtectList(filtered_protect);
				setTimeout(() => {
					setLoading(false);
				}, 500);
			},
			err => {
				console.log('err / getAnimalListWithApplicant', err);
				setTimeout(() => {
					setLoading(false);
				}, 500);
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

	if (loading) {
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
						{adoptionList.length == 0
							? whenEmpty()
							: adoptionList.map((v, i) => {
									return listItem(v, i, true);
							  })}
					</View>
				</View>
				{/* 임시보호신청 */}
				<View style={[style.listContainer]}>
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start'}]}>
						<Text style={[txt.noto26, style.listTitle]}>임시 보호 신청 </Text>
						<Text style={[txt.noto26, {color: GRAY10}]}>{protectList.length}</Text>
					</View>
					<View style={[style.list]}>
						{protectList.length == 0
							? whenEmpty()
							: protectList.map((v, i) => {
									return listItem(v, i, false);
							  })}
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
