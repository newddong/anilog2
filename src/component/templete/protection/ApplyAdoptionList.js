import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, Text, View} from 'react-native';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import {login_style, temp_style, baseInfo_style} from 'Templete/style_templete';
import {getUserAdoptProtectionList} from 'Root/api/protectapi';
import AnimalNeedHelp from 'Root/component/organism/listitem/AnimalNeedHelp';

// UserMenu => 신청 내역 => 입양 신청 더보기 클릭
export default ApplyAdoptionList = props => {
	// console.log('ApplyAdoptionList', props);
	const navigation = useNavigation();
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(true); // 화면 출력 여부 결정

	const onOff_FavoriteTag = (value, index) => {
		// console.log('즐겨찾기=>' + value + ' ' + index);
	};
	const onLabelClick = item => {
		// console.log('onLabelClick !!');
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
				// console.log(`ApplyAdoptionList getUserAdoptProtectionList: ${JSON.stringify(result.msg)}`);
				//1depth 올려줌.
				for (let index = 0; index < result.msg.length; index++) {
					result.msg[index].protect_request_photo_thumbnail = result.msg[index].protect_act_request_article_id.protect_request_photos_uri[0];
					result.msg[index].protect_animal_rescue_location =
						result.msg[index].protect_act_request_article_id.protect_animal_id.protect_animal_rescue_location;
					result.msg[index].protect_request_date = result.msg[index].protect_act_request_article_id.protect_animal_id.protect_animal_rescue_date;
					result.msg[index].protect_animal_species = result.msg[index].protect_act_request_article_id.protect_animal_species;
					result.msg[index].protect_animal_species_detail = result.msg[index].protect_act_request_article_id.protect_animal_species_detail;
					result.msg[index].shelter_name = result.msg[index].protect_act_request_article_id.protect_request_writer_id.shelter_name;
					result.msg[index].protect_animal_sex = result.msg[index].protect_act_request_article_id.protect_animal_id.protect_animal_sex;
					result.msg[index].protect_animal_status = result.msg[index].protect_act_request_article_id.protect_animal_id.protect_animal_status;
				}
				setData(result.msg);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			},
			err => {
				console.log('err / getAppliesRecord / AppliesRecord', err);
			},
		);
	}, []);

	if (loading) {
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
							<AnimalNeedHelpList
								data={data}
								onItemClick={
									props.route.name == 'ApplyTempProtectList'
										? () => navigation.push('ApplyTempProtectDetails', props.route.params)
										: () => navigation.push('ApplyAdoptionDetails', props.route.params)
								}
								onFavoriteTag={(e, index) => onOff_FavoriteTag(e, index)}
								onClickLabel={(status, id, item) => onLabelClick(item)}
								callFrom={props.route.name}
							/>
						</View>
					</ScrollView>
				</ScrollView>
			</View>
		);
	}
};
