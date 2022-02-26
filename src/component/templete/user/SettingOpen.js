import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import {GRAY10, GRAY40, APRI10, GRAY20, TEXTBASECOLOR} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {userLogout} from 'Root/api/userapi';
import DP from 'Root/config/dp';
import userGlobalObject from 'Root/config/userGlobalObject';
import OnOffSwitch from 'Molecules/select/OnOffSwitch';

export default SettingOpen = ({route}) => {
	const onSwtichOn = () => {};

	//계정 공개 여부 변경 Switch Off
	const onSwtichOff = () => {};

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.openFullyContainer}>
					<View style={{width: 550 * DP}}>
						<Text style={[txt.noto32b, {color: APRI10}]}>전체 공개</Text>
					</View>
					<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
				</View>
				<View style={[styles.openDetailContainer]}>
					<View style={{flexDirection: 'row'}}>
						<View style={styles.openDetailEachContainer}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>내 피드 비공개</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
					<View style={{flexDirection: 'row'}}>
						<View style={[styles.openDetailEachContainer, {marginTop: 24 * DP}]}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>내 태그 게시글 비공개</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
					<View style={{flexDirection: 'row'}}>
						<View style={[styles.openDetailEachContainer, {marginTop: 24 * DP}]}>
							<View style={[{width: 550 * DP}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
								<Text style={[txt.noto28, {color: GRAY10}]}>내 커뮤니티 게시글 비공개</Text>
							</View>
							<OnOffSwitch onSwtichOff={onSwtichOff} onSwtichOn={onSwtichOn} />
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 390 * DP,
		marginTop: 10 * DP,
		backgroundColor: '#FFFFFF',
	},
	openFullyContainer: {
		height: 128 * DP,
		paddingLeft: 48 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 2 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	openDetailContainer: {
		height: 260 * DP,
		paddingLeft: 48 * DP,
		justifyContent: 'center',
	},
	openDetailEachContainer: {
		width: 654 * DP,
		height: 44 * DP,
		flexDirection: 'row',
	},
});
