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
import {getAppliesRecord} from 'Root/api/protectapi';
import {getFaq} from 'Root/api/faq';
// 필요한 데이터 - 로그인 유저 제반 데이터, 나의 반려동물 관련 데이터(CompanionObject 참조)
const FrequentAsked = ({route}) => {
	console.log('faq', route.params.item);
	const data = route.params.item;
	const text = data.faq_contents.replace(/\\n/g, `\n`);
	return (
		<View style={styles.container}>
			<View style={[styles.titleContainer]}>
				<Text style={[txt.noto30b, styles.titleText]}>{data.faq_title.slice(2)}</Text>
			</View>
			<Text style={[txt.noto28, styles.contentText]}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	titleContainer: {
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		height: 114 * DP,
	},
	titleText: {
		marginLeft: 48 * DP,
		marginTop: 38 * DP,
		marginBottom: 30 * DP,
	},
	contentText: {
		marginHorizontal: 48 * DP,
		marginTop: 40 * DP,
	},
});

export default FrequentAsked;
