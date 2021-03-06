import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLUE20, GRAY10} from 'Root/config/color';
import ProfileImageSmall from 'Molecules/image/ProfileImageSmall';
import {hyphened} from 'Root/util/dateutil';

/**
 * 보호소 Object 정보 박스
 * @param {object} props - Props Object
 * @param {object} props.data - 보호소 UserObject
 */
const ShelterInfo = props => {
	const data = props.data;
	// console.log('data', data);
	const onPressPhoneNum = () => {
		Linking.openURL(`tel:${data.shelter_delegate_contact_number}`);
	};
	return (
		<View style={[styles.container]}>
			<View style={[styles.profile_container]}>
				<ProfileImageSmall data={data} />
				<Text style={[txt.noto28b, styles.shelter_name_text]}>{data.shelter_name || ''}</Text>
			</View>
			<View style={[styles.text_container]}>
				<Text style={[txt.noto24, {alignSelf: 'flex-end', color: GRAY10}]}>
					{data ? data.shelter_address.brief : ''} {data.shelter_address.detail || ''}
				</Text>
				<TouchableOpacity onPress={onPressPhoneNum}>
					<Text style={[txt.noto24, {alignSelf: 'flex-end', color: BLUE20, textDecorationLine: 'underline'}]}>
						{/* {data.shelter_delegate_contact_number || ''} */}
						{hyphened(data.shelter_delegate_contact_number) || ''}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 654 * DP,
		height: 246 * DP,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		padding: 24 * DP,
	},
	profile_container: {
		width: 654 * DP,
		height: 94 * DP,
		flexDirection: 'row',
	},
	text_container: {
		width: 606 * DP,
		height: 72 * DP,
		marginTop: 10 * DP,
	},
	shelter_name_text: {
		marginLeft: 24 * DP,
		paddingVertical: 26 * DP,
		justifyContent: 'center',
	},
});

export default ShelterInfo;
