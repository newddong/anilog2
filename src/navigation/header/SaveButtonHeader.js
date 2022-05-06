import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import {WHITE, APRI10} from 'Root/config/color';
import Modal from 'Root/component/modal/Modal';
import {updatePetDetailInformation, updateUserDetailInformation} from 'Root/api/userapi';
export default SaveButtonHeader = ({navigation, route, options, back}) => {
	const [data, setData] = React.useState();
	const [save, setSaved] = React.useState(false); // 저장 버튼 클릭 한 번이라도 했는지 여부
	const Saved = Boolean(data);
	// console.log('saveButton Header', save);
	// console.log(route);
	//SaveButtonHeader를 가지는 모든 템플릿들에게서 params가 들어올 때마다 setData를 실시
	React.useEffect(() => {
		setData(route.params);
		// console.log(route.params);
	}, [route.params]);

	React.useEffect(() => {
		//저장이 한 번이라도 됐다면 API적용
		if (save) {
			// console.log('Save Pressed data received  :  ', route.params.data);
			// const received = data;
			received = route.params.data;
			setData(received);
			//일반 유저의 상세정보 수정

			if (route.params.route_name == 'UserInfoDetailSetting') {
				console.log('data!!!', data.data);
				console.log('저장 버튼 param', data.data._id, data.data.user_birthday, data.data.user_interests, data.data.user_address, data.data.user_sex),
					console.log('data.data', typeof data.data.user_interests);
				updateUserDetailInformation(
					{
						// userobject_id: received._id,
						// user_birthday: received.user_birthday,
						// user_interests: received.user_interests,
						// user_address: received.user_address,
						// user_sex: received.user_sex,
						userobject_id: data.data._id,
						user_birthday: '',
						user_interests: data.data.user_interests,
						// user_interests: {
						// 	interests_activity: ['의류'],
						// 	interests_beauty: ['미용'],
						// 	interests_food: ['독스포츠'],
						// 	interests_health: ['노환'],
						// 	interests_location: ['서울 특별시'],
						// },
						user_address: data.data.user_address,
						user_sex: data.data.user_sex,
					},

					result => {
						console.log('result / updateUserDetailInformation / SaveButtonHeader   : ', result);
						Modal.popOneBtn('저장되었습니다.', '확인', Modal.close);
						navigation.goBack();
					},
					err => {
						console.log('err / updateUserDetailInformation / SaveButtonHeader    :  ', err);
						Modal.popOneBtn('저장실패 하였습니다.' + err, '확인', Modal.close);
					},
				);
			} else if (route.params.route_name == 'SetPetInformation') {
				//펫 유저의 상세정보 수정
				updatePetDetailInformation(
					{
						userobject_id: received._id,
						pet_birthday: received.pet_birthday,
						pet_neutralization: received.pet_neutralization,
						pet_sex: received.pet_sex,
						pet_weight: received.pet_weight,
					},
					result => {
						console.log('result / updatePetDetailInfo / SaveButtonHeader   : ', result.msg);
					},
					err => {
						console.log('err / updatePetDetailInfo / SaveButtonHeader   :  ', err);
					},
				);
			}
		}
	}, [save]);

	React.useEffect(
		() =>
			navigation.addListener('beforeRemove', e => {
				if (save) {
					// If we don't have unsaved changes, then we don't need to do anything
					return;
				}

				// Prevent default behavior of leaving the screen
				e.preventDefault();

				Modal.popTwoBtn(
					'저장하지 않고 나가시겠습니까?',
					'저장 후 나감',
					'나가기',
					() => {
						setSaved(true); //save State true로 하여 상단의 useEffect가 수행되도록 설정
						Modal.close();
						// navigation.goBack();
						// navigation.dispatch(e.data.action, data); // 뒤로가기 이제 실시
					},
					() => {
						Modal.close();
						// navigation.goBack();
						navigation.dispatch(e.data.action, data);
					},
				);
			}),
		[navigation, save],
	);
	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={navigation.goBack} />
				</View>
			</TouchableOpacity>
			<View style={style.titleContainer}>
				<Text style={txt.noto40b}>{options.title}</Text>
			</View>
			<TouchableOpacity onPress={() => setSaved(true)}>
				<View style={style.buttonContainer}>
					<Text style={[txt.noto36b, {color: APRI10, lineHeight: 56 * DP}]}>저장</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		height: 135 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
	},
	titleContainer: {
		marginBottom: 20 * DP,
	},
	buttonContainer: {
		// width: 67 * DP,
		marginBottom: 22 * DP,
		// backgroundColor: 'red',
	},
	shadow: {
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 4,
		// },
		// elevation: 4,
	},
	backButtonContainer: {
		width: 80 * DP,
		height: 66 * DP,
		justifyContent: 'center',
		// backgroundColor:'red',
		marginBottom: 18 * DP,
	},
});

SaveButtonHeader.defaultProps = {};
