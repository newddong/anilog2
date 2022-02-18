import React from 'react';
import {Text, View} from 'react-native';
import {GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import PetImageLabel from 'Molecules/label/PetImageLabel';
import {animalInfo} from 'Organism/style_organism copy';
import DP from 'Root/config/dp';
export default AnimalInfo = props => {
	const [data, setData] = React.useState(props.data);
	console.log('AnimalInfo', props.data);
	React.useEffect(() => {
		let register_date = data.user_register_date;
		const date = new Date(register_date);
		// const pro_date = new Date(split[0], split[1] - 1, split[2]); //String의 날짜 정보를 Date로 전환
		const diff_date_time = (new Date().getTime() - date.getTime()) / 1000; // 오늘 getTime과 임보 시작 날짜 getTime의 차이 계산
		let diff_date = Math.floor(diff_date_time / 86400); // 하루 86400초로 나눠서 몇 일이 경과되었는지 계산
		if (diff_date == 0) {
			diff_date = '0';
		}
		setData({...props.data, protect_animal_date: diff_date});
	}, [props.data]);

	return (
		<View style={[animalInfo.container]}>
			<PetImageLabel data={data} onPressLabel={() => props.onPressLabel()} showNickname={false} />
			<View style={[animalInfo.infoContainer]}>
				<Text style={[animalInfo.infoContainer_petNickname, txt.noto32b]}>{data.user_nickname || ''}</Text>
				<Text style={[animalInfo.infoContainer_petDetail, txt.noto28, {marginTop: 12 * DP}]}>
					{data.pet_species || ''}/{data.pet_species_detail || ''}
				</Text>
				<Text style={[animalInfo.infoContainer_petDetail, txt.noto28, {color: GRAY20}]}>임시보호 {data.protect_animal_date || ''}일 째</Text>
			</View>
		</View>
	);
};

AnimalInfo.defaultProps = {
	onPressLabel: e => {},
};
