import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {BLACK} from 'Root/config/color';
import ProfileImageMedium140 from 'Molecules/image/ProfileImageMedium140';
<<<<<<< HEAD:src/component/organism/listitem/ShelterVerticalLabel.js
import {shelterLabel} from 'Organism/style_organism';
=======
import {shelterLabel} from 'Organism/style_organism copy';
>>>>>>> ae42471661ac0f83f330ce6624523fa3e1b07aca:src/component/organism_ksw/ShelterVerticalLabel.js

export default ShelterVerticalLabel = props => {
	// console.log('props', props.data);
	const data = props.data;
	return (
		<View style={[shelterLabel.container]}>
			<TouchableOpacity style={[shelterLabel.profileImageMedium]} onPress={() => props.onLabelClick()}>
				<ProfileImageMedium140 data={data} />
			</TouchableOpacity>
			<View style={[shelterLabel.shelterInfo]}>
				<Text style={[txt.noto28, {color: BLACK, textAlign: 'center'}]}>{data.shelter_name}</Text>
				<Text style={[txt.noto24, {color: GRAY10, width: 160 * DP, textAlign: 'center'}]} numberOfLines={1}>
					{data.shelter_address.brief}
				</Text>
			</View>
		</View>
	);
};

ShelterVerticalLabel.defaultProps = {
	onLabelClick: e => console.log(e),
};
