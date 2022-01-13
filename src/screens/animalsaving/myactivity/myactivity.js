import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import {lo, btn, txt} from './style_myactivity';
import BtnBackground from './btnbackground.svg';
import RequestBtn from './requestbtn';
import FlipSection from './flipsection';
import ActivityRequestItem from './activityrequestitem';
import DP from 'Root/screens/dp';
import {ScrollView} from 'react-native';

export default MyActivity = () => {
	const svg_size = {width: '100%', height: '100%'};
	return (
		<View style={lo.wrp_main}>
			<ScrollView style={{flex: 1}}>
				<View style={lo.cntr_btn}>
					<RequestBtn />
				</View>
				<FlipSection title="임시보호 활동" defaultH={290 * DP}>
					{/* <VolunteerItem
						source={{uri: 'https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg'}}
					/>
					<VolunteerItem
						source={{uri: 'https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg'}}
					/> */}
					
				</FlipSection>
				<FlipSection title="후원 현황" defaultH={290 * DP}>
					{/* <VolunteerItem
						source={{uri: 'https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg'}}
					/>
					<VolunteerItem
						source={{uri: 'https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg'}}
					/> */}
				</FlipSection>
				<FlipSection title="진행중인 신청 건">
					{/* <ActivityRequestItem />
					<ActivityRequestItem />
					<ActivityRequestItem />
					<ActivityRequestItem />
					<ActivityRequestItem />
					<ActivityRequestItem />
					<ActivityRequestItem />
					<ActivityRequestItem /> */}
				</FlipSection>
			</ScrollView>
		</View>
	);
};
