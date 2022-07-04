import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';

const OpenSourceDetail = route => {
	const data = route.route.params.item;
	console.log('routeaaaa', data);
	const navigation = useNavigation();
	// navigation.setOptions({title: data.libraryName});
	return (
		<ScrollView style={[{backgroundColor: WHITE}]}>
			<View style={[styles.container]}>
				<Text>libraryName : {data?.libraryName}</Text>
				<Text>version : {data?.version || 'unknwon'}</Text>
				<Text>license : {data?._license || 'unknwon'}</Text>
				<Text>description : {data?._description || 'unknwon'}</Text>
				<Text>homepage : {data?.homepage || 'unknwon'}</Text>
				<Text>repository : {data.repository?.url || 'unknwon'}</Text>
				<Text>licenseContent : {data?._licenseContent || 'unknwon'}</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: WHITE,
		flex: 1,
		paddingHorizontal: 28 * DP,
		paddingTop: 20 * DP,
	},
});
export default OpenSourceDetail;
