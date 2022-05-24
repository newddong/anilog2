import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, Text, View} from 'react-native';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import {login_style, baseInfo_style} from 'Templete/style_templete';
import {getUserAdoptProtectionList} from 'Root/api/protectapi';
import AnimalNeedHelp from 'Root/component/organism/listitem/AnimalNeedHelp';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';

// UserMenu => 신청 내역 => 입양 신청 더보기 클릭
export default ApplyAdoptionList = props => {
	// console.log('ApplyAdoptionList', props);
	const navigation = useNavigation();
	const [data, setData] = React.useState(false);

	const onLabelClick = item => {
		// console.log('itme data', item);
		navigation.push('ApplyAdoptionDetails', item);
	};

	// 입양신청 및 임시보호 신청 리스트 데이터 불러오기
	React.useEffect(() => {
		let actType = '';
		console.log('- ApplyAdoptionList - ');
		//입양 및 임시보호 구분
		props.route.name == 'ApplyAdoptionList' ? (actType = 'adopt') : (actType = 'protect');
		getUserAdoptProtectionList(
			{
				protect_act_type: actType,
				request_number: 100,
				protect_act_object_id: '', //페이징을 위한 오브젝트 객체 아이디
			},
			result => {
				// console.log(`ApplyAdoptionList getUserAdoptProtectionList: `, result.msg[0]);
				let res = result.msg;
				let temp = [];
				res.map((v, i) => {
					let value = {
						...v,
						_id: v._id,
						protect_request_status: v.protect_act_request_article_id.protect_request_status,
						protect_request_photos_uri: v.protect_act_request_article_id.protect_request_photos_uri,
						protect_animal_sex: v.protect_act_request_article_id.protect_animal_sex,
						protect_request_date: v.protect_act_request_article_id.protect_request_date,
						protect_request_writer_id: v.protect_act_request_article_id.protect_request_writer_id,
						protect_animal_species: v.protect_act_request_article_id.protect_animal_species,
						protect_animal_species_detail: v.protect_act_request_article_id.protect_animal_species_detail,
						protect_animal_id: v.protect_act_request_article_id.protect_animal_id,
					};
					temp.push(value);
				});
				setData(temp);
			},
			err => {
				console.log('err / getAppliesRecord / AppliesRecord', err);
				setData([]);
			},
		);
	}, []);

	const render = ({item, index}) => {
		return <ProtectRequest data={item} callFrom={props.route.name} showFavorite={false} onClickLabel={() => onLabelClick(item)} />;
	};

	if (data == '') {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<ScrollView horizontal={false}>
					<ScrollView horizontal={true} scrollEnabled={false}>
						<View style={[baseInfo_style.list]}>
							{/* <AnimalNeedHelpList
								data={data}
								onItemClick={
									props.route.name == 'ApplyTempProtectList'
										? () => navigation.push('ApplyTempProtectDetails', props.route.params)
										: () => navigation.push('ApplyAdoptionDetails', props.route.params)
								}
								onFavoriteTag={(e, index) => onOff_FavoriteTag(e, index)}
								onClickLabel={(status, id, item) => onLabelClick(item)}
								callFrom={props.route.name}
								showFavorite={false}
							/> */}
							<FlatList data={data} renderItem={render} />
						</View>
					</ScrollView>
				</ScrollView>
			</View>
		);
	}
};
