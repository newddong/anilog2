import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView, ActivityIndicator, RefreshControl} from 'react-native';
import {WHITE} from 'Root/config/color';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MissingReportBox from 'Root/component/organism/listitem/MissingReportBox ';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const NewMissingReportList = props => {
	const renderItem = ({item, index}) => {
		return <MissingReportBox index={index} data={item} />;
	};
	// if (loading) {
	// 	return (
	// 		<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
	// 			<ActivityIndicator size={'large'}></ActivityIndicator>
	// 		</View>
	// 	);
	// } else {
	return (
		<View style={[styles.container]}>
			<FlatList data={props.data} renderItem={renderItem} showsHorizontalScrollIndicator={false} horizontal={true} />
		</View>
	);
	// }
};

const styles = StyleSheet.create({
	container: {
		width: 643 * DP,
		// height: 396 * DP,
		// alignItems: 'center',
		backgroundColor: WHITE,
		marginTop: 20 * DP,
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 40 * DP,
	},
});

NewMissingReportList.defaultProps = {
	items: [],
	// onClickLabel: e => console.log(e),
};

export default React.memo(NewMissingReportList);
