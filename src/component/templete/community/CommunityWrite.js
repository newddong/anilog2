import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, TouchableWithoutFeedback, TextInput, Platform, Keyboard, StyleSheet} from 'react-native';
import {APRI10, WHITE, GRAY20, GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Arrow_Down_APRI10, Camera54, Location54_APRI10, NextMark, NextMark_APRI, Paw54_Border} from 'Root/component/atom/icon/index';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'Component/modal/Modal';
import userGlobalObj from 'Root/config/userGlobalObject';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getPettypes} from 'Root/api/userapi';
import ImagePicker from 'react-native-image-crop-picker';
import HashInput from 'Molecules/input/HashInput';
import InputBalloon from 'Root/component/molecules/input/InputBalloon';

export default CommunityWrite = props => {
	const inputRef = React.useRef();
	const isReview = props.route.params.isReview; //후기 게시글 여부 boolean
	const navigation = useNavigation();

	const onPressFilter = () => {
		Modal.popInterestTagModal(
			'Review',
			[],
			() => Modal.close(),
			() => Modal.close(),
			() => alert('setstate'),
		);
	};

	const moveToLocationPicker = () => {
		// console.log('moveToLocationPicker');
		navigation.push('AddressSearchPage', {prevRoute: props.route.name});
	};

	return (
		<View style={[style.container]}>
			{isReview ? (
				<></>
			) : (
				<>
					<View style={[style.title]}>
						<TextInput style={[txt.noto30, style.title_text]} placeholder={'제목 입력...'} placeholderTextColor={GRAY20} />
					</View>
					<TouchableOpacity activeOpacity={0.6} onPress={onPressFilter} style={[style.category]}>
						<Text style={[txt.noto28, style.categoryText]}>카테고리 선택</Text>
						<View style={[style.nextMark]}>
							<NextMark_APRI />
						</View>
					</TouchableOpacity>
				</>
			)}

			<View style={[style.content]}>
				<InputBalloon
					ref={inputRef}
					title={''}
					placeholder={'서비스, 가성비, 위생, 특이사항, 위치등의 내용을 적어주세요! 후기는 자세할수록 좋아요.'}
				/>
			</View>
			<View style={[style.buttonContainer]}>
				<TouchableWithoutFeedback onPress={onPressFilter}>
					<View style={[style.buttonItem]}>
						<Camera54 />
						<Text style={[txt.noto24, {color: APRI10, marginLeft: 10 * DP}]}>사진추가</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={moveToLocationPicker}>
					<View style={[style.buttonItem, {marginLeft: 40 * DP}]}>
						<Location54_APRI10 />
						<Text style={[txt.noto24, {color: APRI10, alignSelf: 'center', marginLeft: 10 * DP}]}>위치추가</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	title: {
		//
	},
	title_text: {
		width: 654 * DP,
		height: 82 * DP,
		paddingLeft: 24 * DP,
		// backgroundColor: 'pink',
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
	},
	category: {
		width: 654 * DP,
		height: 82 * DP,
		paddingLeft: 24 * DP,
		marginTop: 30 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		paddingVertical: 18 * DP,
		marginBottom: 30 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	categoryText: {
		color: APRI10,
		width: 500 * DP,
	},
	nextMark: {
		marginLeft: (654 - 558) * DP,
	},
	content: {
		// marginTop: 30 * DP,
	},
	buttonContainer: {
		// backgroundColor: 'yellow',
		marginTop: 30 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		marginRight: 48 * DP,
	},
	buttonItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
