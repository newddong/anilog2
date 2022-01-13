import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {lnb, lo, sctn, txt} from '../style_moviehome';

import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import {EyeIcon, ShareIcon} from 'Asset/image';
import { TouchableWithoutFeedback } from 'react-native';


export default MovieItem = ({data}) => {
	const nav = useNavigation();
	const handlePress = () => {
		// nav.push("MoviePlay",{title:'재생',data:data});
		nav.push('MainScreen',{screen:'movie',params:{screen:'MoviePlay',params:{title:'재생',data:data}}});
	};

	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<View style={lo.sctn}>
				<View style={sctn.img_thumb}>
					<Image
						style={sctn.img_thumb}
						source={{
							uri: data.thumbnail,
						}}
					/>
					<View style={sctn.cntr_playtime}>
						<Text style={[txt.roboto22r, txt.white]}>{data.playtime}</Text>
					</View>
				</View>
				<View style={sctn.cntr_info}>
					<View style={sctn.cntr_userimg}>
						<Image
							style={sctn.cntr_userimg}
							source={{uri: data.user_photo}}
						/>
					</View>

					<View style={sctn.wrp_txt}>
						<View style={sctn.cntr_title}>
							<Text style={txt.noto30b}>
								{data.title}
							</Text>
						</View>
						<View style={sctn.cntr_userid}>
							<Text style={[txt.noto24rcjk, txt.gray]}>{data.user_id}</Text>
						</View>
						<View style={sctn.cntr_popularity}>
							<Text style={[txt.noto24rcjk, txt.gray]}>{data.view}</Text>
							<SvgWrapper style={[sctn.cntr_icon, {width: 28 * DP, height: 18 * DP}]} svg={<EyeIcon/>}/>
							<Text style={[txt.noto24rcjk, txt.gray]}>{data.link}</Text>
							<SvgWrapper style={[sctn.cntr_icon, {width: 24 * DP, height: 28 * DP}]} svg={<ShareIcon/>}/>
						</View>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};
