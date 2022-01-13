import React from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import TagView from 'Root/component/molecules/TagView';
import TagEdit from 'Root/component/molecules/TagEdit';
import AddPet from 'Root/component/molecules/AddPet';
import RescueImage from 'Root/component/molecules/RescueImage';
export default TagTest = props => {
	const onDelete = () => {
		console.log("ondelete")
	}
	return (
		<View>
			<Text style={{backgroundColor: 'blue', color: 'white'}}> TagView </Text>
			<TagView />
            <Text style={{backgroundColor: 'blue', color: 'white'}}> TagEdit </Text>
			<TagEdit onDelete={onDelete}/>
			<Text style={{backgroundColor: 'blue', color: 'white'}}> Add Pet  </Text>
			<AddPet/>
			<Text style={{backgroundColor: 'blue', color: 'white'}}> Rescue Image 654 542 </Text>
			<RescueImage
				img_uri={"https://img.animalplanet.co.kr/news/2021/01/18/700/01ha1fp66d8129r387g1.jpg"}
				rescueText={"꽁꽁얼었습니다"}
			/>
		</View>
	);
};
