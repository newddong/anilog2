import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import moment from 'moment';
import DP from 'Root/config/dp';
import {getAllAnnouncement} from 'Root/api/announcement';
import {FlatList} from 'react-native-gesture-handler';
import OneNotice from 'Root/component/organism/listitem/OneNotice';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
const NoticeList = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState();
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		getAllAnnouncement(
			{},
			result => {
				setData(result.msg);
				setLoading(false);
			},
			err => {
				console.log('getAllAccouncement err', err);
			},
		);
	}, []);

	const renderItem = ({item, index}) => {
		console.log('item', item);
		const date = moment(item.announcement_date).format('YYYY.MM.DD');
		return <OneNotice uptitle={date} downtitle={item.announcement_title} contents={item.announcement_contents} />;
	};
	if (loading) {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<FlatList data={data} keyExtractor={item => item._id} renderItem={renderItem} showsVerticalScrollIndicator={false} />
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	noticeContainer: {
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
	},
	dataText: {
		marginTop: 30 * DP,
		marginHorizontal: 48 * DP,
	},
	titleText: {
		marginBottom: 30 * DP,
		marginHorizontal: 48 * DP,
	},
});

export default NoticeList;
