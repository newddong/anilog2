import React, {useCallback} from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, SafeAreaView, ActivityIndicator, RefreshControl} from 'react-native';
import {WHITE} from 'Root/config/color';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MissingReportBox from 'Root/component/organism/listitem/MissingReportBox ';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const NewMissingReportList = props => {
	const [moved, setMoved] = React.useState(false);
	const renderItem = ({item, index}) => {
		return <MissingReportBox index={index} data={item} />;
	};
	const getItemLayout = useCallback(
		(data, index) => ({
			length: 254 * DP,
			offset: 254 * DP * index,
			index,
		}),
		[],
	);
	// if (loading) {
	// 	return (
	// 		<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
	// 			<ActivityIndicator size={'large'}></ActivityIndicator>
	// 		</View>
	// 	);
	// } else {
	return (
		<View style={[styles.container]}>
			<FlatList
				contentContainerStyle={{paddingLeft: 28 * DP}}
				data={props.data}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				//getItemLayout={getItemLayout}
				//keyExtractor={props.data._id}
				keyExtractor={(item, index) => item._id}
				getItemLayout={(data, index) => {
					return {length: 176 * DP, offset: 176 * DP * index, index: index};
				}}
				windowSize={2}
			/>
		</View>
	);
	// }
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		// height: 396 * DP,
		// alignItems: 'center',
		backgroundColor: WHITE,
		marginTop: 28 * DP,
		height: 248 * DP,
		// paddingLeft: 28 * DP,
		// backgroundColor: 'yellow',
		// marginLeft: 28 * DP,
	},
	userContainer: {
		width: 750 * DP,
		// height: 94 * DP,
		marginBottom: 30 * DP,
	},
});

NewMissingReportList.defaultProps = {
	items: [],
	// onClickLabel: e => console.log(e),
};

export default React.memo(NewMissingReportList);
