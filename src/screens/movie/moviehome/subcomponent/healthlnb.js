import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import DP from 'Screens/dp';
import {
	HeartIcon,
	HeartFocusedIcon,
	RespiratoryIcon,
	RespiratoryFocusedIcon,
	DigestiveIcon,
	DigestiveFocusedIcon,
	UrinaryIcon,
	UrinaryFocusedIcon,
	BrainIcon,
	BrainFocusedIcon,
	SecretionIcon,
	SecretionFocusedIcon,
	MusculoskeletalIcon,
	MusculoskeletalFocusedIcon,
	SkinIcon,
	SkinFocusedIcon,
	InfectionIcon,
	InfectionFocusedIcon,
	FaceIcon,
	FaceFocusedIcon,
	MiscIcon,
	MiscFocusedIcon,
} from 'Asset/image/iconHealth';

import HealthLnbItem from './healthlnbitem';

export default HealthLnb = props => {

	return (
		<View style={{...props.style}}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<HealthLnbItem label="심장/혈액" size={{width:92*DP,height:120*DP}} icon={<HeartIcon/>} focused={<HeartFocusedIcon/>}/>
				<HealthLnbItem label="호흡기" size={{width:112*DP,height:100*DP}} icon={<RespiratoryIcon/>} focused={<RespiratoryFocusedIcon/>}/>
				<HealthLnbItem label="소화기" size={{width:100 * DP,height:120 * DP}} icon={<DigestiveIcon />} focused={<DigestiveFocusedIcon />}/>
				<HealthLnbItem label="비뇨기/생식기" size={{width:108 * DP,height:72 * DP}} icon={<UrinaryIcon />} focused={<UrinaryFocusedIcon />}/>
				<HealthLnbItem label="뇌/신경" size={{width:104 * DP,height:96 * DP}} icon={<BrainIcon />} focused={<BrainFocusedIcon />}/>
				<HealthLnbItem label="내분비" size={{width:104 * DP,height:104 * DP}} icon={<SecretionIcon />} focused={<SecretionFocusedIcon />}/>
				<HealthLnbItem label="근골격계" size={{width:48 * DP,height:108 * DP}} icon={<MusculoskeletalIcon />} focused={<MusculoskeletalFocusedIcon />}/>
				<HealthLnbItem label="피부" size={{width:108 * DP,height:100 * DP}} icon={<SkinIcon />} focused={<SkinFocusedIcon />}/>
				<HealthLnbItem label="감염성" size={{width:116 * DP,height:104 * DP}} icon={<InfectionIcon />} focused={<InfectionFocusedIcon />}/>
				<HealthLnbItem label="눈/귀/코/구강" size={{width:104 * DP,height:88 * DP}} icon={<FaceIcon />} focused={<FaceFocusedIcon />}/>
				<HealthLnbItem label="기타" size={{width:104 * DP,height:104 * DP}} icon={<MiscIcon />} focused={<MiscFocusedIcon />}/>
			</ScrollView>
		</View>
	);
};
