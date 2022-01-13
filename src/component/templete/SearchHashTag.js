import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {GRAY20} from 'Root/config/color';
import {dummy_hashTagListObject} from 'Root/config/dummyDate_json';
import {txt} from 'Root/config/textstyle';
import HashTagList from '../organism_ksw/HashTagList';
import {login_style, searchHashTag, temp_style} from './style_templete';

export default SearchHashTag = props => {
	const [tagList, setTagList] = React.useState([]);
	const searched_tagList = tagList; //검색 후 받아올 데이터 더미
	return (
		<View style={[login_style.wrp_main, searchHashTag.container]}>
			<ScrollView style={{flex: 1}}>
				{/* 검색내역이 없을 경우 최근 검색한 태그를 출력 */}
				{tagList.length == 0 ? (
					<View>
						<View style={[temp_style.controllableHashTagList]}>
							<Text style={[txt.noto24, {color: GRAY20}]}>최근 검색한 태그</Text>
						</View>
						<View style={[temp_style.hashTagList]}>
							<HashTagList items={[]} />
						</View>
					</View>
				) : (
					// 검색 내역이 존재할 경우 API를 통해 받아온 내역 출력
					<View style={[temp_style.hashTagList]}>
						<HashTagList items={searched_tagList} />
					</View>
				)}
			</ScrollView>
		</View>
	);
};
