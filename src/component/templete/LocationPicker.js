import React from 'react';
import {FlatList, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import InputWithSearchIcon from '../molecules/InputWithSearchIcon';
import {login_style, temp_style, locationPicker} from './style_templete';

export default LocationPicker = props => {
	const [searchState, setSearchState] = React.useState(false);
	const onSearch = text => {
		setSearchState(true);
		alert(text + '검색 시도');
	};
	const _dummy_searched_data = ['Seoulm Korea', '둔촌역 어딘가', '브리즈번 스프링힐', '필리핀 마닐라시티', '인도네시아 마케드푸어'];
	const renderItem = item => {
		return <Text style={[txt.roboto28, {marginBottom: 20 * DP}]}>{item}</Text>;
	};
	return (
		<View style={[login_style.wrp_main, locationPicker.container]}>
			{/* (M)inputWithSearchIcon */}
			<View style={[temp_style.inputWithSearchIcon, locationPicker.inputWithSearchIcon]}>
				<InputWithSearchIcon onSearch={text => onSearch(text)} />
			</View>
			{/* LocationList */}
			<View style={[locationPicker.locationList]}>
				{searchState ? (
					<View style={{marginLeft: 15 * DP}}>
						<FlatList data={_dummy_searched_data} renderItem={({item}) => renderItem(item)} />
					</View>
				) : null}
			</View>
		</View>
	);
};
