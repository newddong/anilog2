import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import {getAllAnnouncement} from 'Root/api/announcement';
import {FlatList} from 'react-native-gesture-handler';
import {MainLogo} from 'Root/component/atom/icon';
import AniButton from 'Root/component/molecules/button/AniButton';
import {getHelpByCategoryDynamicQuery, getSearchHelpByCategoryList} from 'Root/api/helpbycategory';
import OneNotice from 'Organism/listitem/OneNotice';
import {getCommonCodeDynamicQuery} from 'Root/api/commoncode';
import searchContext, {SearchContext} from 'Root/config/searchContext';
//카테고리별 도움말 화면
const CategoryHelp = ({route, props}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(false);
	const [categoryList, setCategoryList] = React.useState([]);
	var categoryName = route.params?.category;
	const [categoryLoad, setCategoryLoaded] = React.useState(false);
	const [searchInput, setSearchInput] = React.useState('');
	const [searchedData, setSearchedData] = React.useState();
	const [isSearchedData, setIsSearchedData] = React.useState(false);
	React.useEffect(() => {
		getHelpByCategoryDynamicQuery(
			{},
			result => {
				console.log('all the list', result.msg);
				setData(result.msg);
				setLoading(false);
			},
			err => {
				console.log('all help list err', err);
			},
		);
	}, []);

	React.useEffect(() => {
		// console.log('categoryHelp', route);
		getCommonCodeDynamicQuery(
			{common_code_c_name: 'helpbycategoryobjects'},
			result => {
				// console.log('111', result.msg);
				setCategoryList(result.msg.slice(1));
				setCategoryLoaded(true);
			},
			err => {
				console.log(err);
			},
		);
	}, [route]);
	React.useEffect(() => {
		if (categoryName == '전체') {
			getHelpByCategoryDynamicQuery(
				{},
				result => {
					// console.log('all the list', result.msg);
					setData(result.msg);
					setLoading(false);
				},
				err => {
					console.log('all help list err', err);
				},
			);
		}

		if (categoryLoad) {
			for (var i in categoryList) {
				// console.log('list', categoryList[i]);
				if (categoryList[i].common_code_msg_kor == categoryName && categoryName != '전체') {
					getHelpByCategoryDynamicQuery(
						{help_by_category_common_code_id: categoryList[i]._id},
						result => {
							setData(result.msg);
							setLoading(false);
						},
						err => {
							console.log('getHelpByCategoryDynamicQuery err', err);
						},
					);
				}
			}
		}
	}, [categoryList]);

	React.useEffect(() => {
		console.log('serach', searchContext.searchInfo.searchInput);
		setSearchInput(searchContext.searchInfo.searchInput);
		// if (categoryLoad) {
		// 	getSearchHelpByCategoryList(
		// 		{searchKeyword: searchContext.searchInfo.searchInput},
		// 		result => {
		// 			console.log('result', result.msg);
		// 		},
		// 		err => {
		// 			console.log('category search err', err);
		// 			setData();
		// 		},
		// 	);
		// }
	}, [searchContext.serachInfo?.searchInput]);

	React.useEffect(() => {
		getSearchHelpByCategoryList(
			{searchKeyword: searchContext.searchInfo.searchInput},
			result => {
				console.log('result', result.msg);
				setSearchedData(result.msg);
				setIsSearchedData(true);
			},
			err => {
				console.log('category search err', err);
				setSearchedData();
				setIsSearchedData(false);
			},
		);
	}, [searchInput]);
	const renderItem = ({item, index}) => {
		// console.log('item', item);
		return (
			<OneNotice
				uptitle={item.common_code_msg_kor}
				downtitle={item.help_by_category_title}
				contents={item.help_by_category_contents.replace(/\\n/g, `\n`)}
			/>
		);
	};

	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		if (searchedData) {
			return (
				<View>
					{isSearchedData ? (
						<View>
							<Text>데이터 있음</Text>
						</View>
					) : (
						<View>
							<Text>데이터 없음</Text>
						</View>
					)}
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					<FlatList data={data} keyExtractor={item => item._id} renderItem={renderItem} showsVerticalScrollIndicator={false} />
				</View>
			);
		}
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	serviceCenterContainer: {
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
		height: 596 * DP,
	},
	topContainer: {
		marginTop: 60 * DP,
		flexDirection: 'row',
		width: 428 * DP,
		alignItems: 'flex-end',
		marginLeft: 48 * DP,
	},
	btnLayout: {
		borderColor: APRI10,
		width: 654 * DP,
		height: 132 * DP,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		marginLeft: 48 * DP,
	},
	btnTitle: {
		marginHorizontal: 40 * DP,
		marginVertical: 36 * DP,
	},
	miniTitleTextContainer: {
		height: 84 * DP,
		justifyContent: 'center',
		// marginVertical: 20 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	oftenAskedQuestion: {
		height: 440 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
	},
});

export default CategoryHelp;
