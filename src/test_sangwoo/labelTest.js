import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import PetLabel from 'Root/component/molecules/PetLabel';
import UserDescriptionLabel from 'Root/component/molecules/UserDescriptionLabel';
import UserLocationLabel from 'Root/component/molecules/UserLocationLabel';
import UserLocationTimeLabel from 'Root/component/molecules/UserLocationTimeLabel';
import UserPetLabel from 'Root/component/molecules/UserPetLabel';
import UserTimeLabel from 'Root/component/molecules/UserTimeLabel';
import HashLabel from 'Root/component/molecules/HashLabel';
import {APRI10, GRAY30} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import ShelterLabel from 'Root/component/molecules/ShelterLabel';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PetImageLabel from 'Root/component/molecules/PetImageLabel';
import ShelterSmallLabel from 'Root/component/molecules/ShelterSmallLabel';
import ShelterInfo from 'Root/component/molecules/ShelterInfo';
const LabelTest = () => {
	//세션아이디의 일치여부에 따른 스타일 적용 테스트용 토큰
	AsyncStorage.setItem('token','user_id')
	const navigation = useNavigation();
	
	//Test용 데이터
	const data = {
		user_nickname: 'user_nickname',
		user_id: 'user_id',
		user_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		location: 'location',
		text_intro: 'Text/Intro',
	};
	const data2 = {
		user_nickname: 'user_nickname',
		user_id: 'user_id2',
		user_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		location: 'location',
		text_intro: 'Text/Intro',
	};
	const data3 = {
		user_nickname: 'user_nickname',
		user_id: 'user_id3',
		user_image: null,
		location: 'location',
		text_intro: 'Text/Intro',
	};
	
	const _userLocationTimeLabel_dummy = {
		user_nickname: 'user_nickname',
		user_id: 'user_id',
		user_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		time: 'time',
		location : 'location'
	};
	const _userLocationTimeLabel_dummy2 = {
		user_nickname: 'user_nickname',
		user_id: 'user_id2',
		user_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		time: 'time',
		location : 'location'
	};
	const _userLocationTimeLabel_dummy3 = {
		user_nickname: 'user_nickname',
		user_id: 'user_id3',
		time: 'time',
		location : 'location'
	};
	const _userTimeLabel_dummy = {
		user_nickname: 'user_nickname',
		user_id: 'user_id',
		user_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		time: 'time',
	};
	const _petLabel_dummy = {
		user_nickname: 'user_nickname',
		user_id: 'user_id',
		user_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		status : 'normal'
	}
	const _petLabel_dummy2 = {
		user_nickname: 'user_nickname',
		user_id: 'user_id2',
		user_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		status : 'protected'
	}
	const _petLabel_dummy3 = {
		user_nickname: 'user_nickname',
		user_id: 'user_id3',
		status : 'adopted'
	}

	const _userTimeLabel_dummy2 = {
		user_nickname: 'user_nickname',
		user_id: 'user_id2',
		time: 'time',
	};
	const shelter_dummy1 = {
		user_id: 'user_id',
		shelter_name: 'shelter_name',
		shelter_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		location: 'location',
		shelter_type: 'public',
	};
	const shelter_dummy2 = {
		user_id: 'user_id1',
		shelter_name: 'shelter_name',
		shelter_image: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		location: 'location',
		shelter_type: 'private',
	};
	const shelter_dummy3 = {
		user_id: 'user_id3',
		shelter_name: 'shelter_name',
		location: 'location',
		shelter_type: 'private',
	};
	const shelterInfo_dummy1 = {
		user_id: 'user_id',
		shelter_name: 'shelter_name',
		user_image : 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		phone_number : '010-9645-0422',
		address : 'Address',
		location: 'location',
		shelter_type: 'private',
	};
	const shelterInfo_dummy2 = {
		user_id: 'user_id2',
		shelter_name: 'shelter_name',
		user_image : 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg',
		phone_number : '010-9645-0422',
		address : 'Address',
		location: 'location',
		shelter_type: 'public',
	};
	const shelterInfo_dummy3 = {
		user_id: 'user_id3',
		shelter_name: 'shelter_name',
		phone_number : '010-9645-0422',
		address : 'Address',
		location: 'location',
		shelter_type: 'private',
	};
	//Test용 데이터
	return (
		<ScrollView>
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity
					onPress={() => navigation.navigate('ImageStyle')}
					style={{backgroundColor: APRI10, width: 100, height: 40, justifyContent: 'center'}}>
					<Text>Imagesetyle</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('Icon')}
					style={{backgroundColor: GRAY30, width: 100, height: 40, justifyContent: 'center'}}>
					<Text>Label</Text>
				</TouchableOpacity>
			</View>
			<Text style={txt.roboto28b}> roboto28b </Text>
			<Text style={txt.noto24}> noto24 </Text>
			<Text style={{backgroundColor: 'blue', color: 'white'}}>UserLocationLabel </Text>
			<UserLocationLabel data={data} onLabelClick={e => alert(e)} />
			<UserLocationLabel data={data2} onLabelClick={e => alert(e)}  />

			<Text style={{backgroundColor: 'blue', color: 'white'}}>UserDescriptionLabel </Text>
			<UserDescriptionLabel data={data} onLabelClick={e => alert(e)}  />
			<UserDescriptionLabel data={data2} onLabelClick={e => alert(e)} />

			<Text style={{backgroundColor: 'blue', color: 'white'}}>UserPetLabel </Text>
			<UserPetLabel data={data2} onLabelClick={e => alert(e)} />
			<UserPetLabel data={data3} onLabelClick={e => alert(e)} />

			<Text style={{backgroundColor: 'blue', color: 'white'}}>UserLocationTimeLabel</Text>
			<UserLocationTimeLabel data={_userLocationTimeLabel_dummy} onLabelClick={e => alert(e)}  />
			<UserLocationTimeLabel data={_userLocationTimeLabel_dummy2} onLabelClick={e => alert(e)}  />
			<UserLocationTimeLabel data={_userLocationTimeLabel_dummy3} onLabelClick={e => alert(e)} />

			<Text style={{backgroundColor: 'blue', color: 'white'}}>UserTimeLabel</Text>
			<UserTimeLabel data={_userTimeLabel_dummy} onLabelClick={e => alert(e)}  />
			<UserTimeLabel data={_userTimeLabel_dummy2} onLabelClick={e => alert(e)}  />

			<Text style={{backgroundColor: 'blue', color: 'white'}}>PetLabel</Text>
			<PetLabel data={_petLabel_dummy} onLabelClick={e => alert(e)}  />
			<PetLabel data={_petLabel_dummy2} onLabelClick={e => alert(e)}  />
			<PetLabel data={_petLabel_dummy3} onLabelClick={e => alert(e)} />

			<Text style={txt.roboto28b}> roboto28b </Text>
			<Text style={txt.noto24}> KEYWORD - noto24 </Text>
			<Text style={txt.noto30}> KEYWORD - noto30 </Text>
			<Text style={{backgroundColor: 'blue', color: 'white'}}>HashLabel</Text>

			{/* HashLabel :  keyword = Keyword Text  ,  kwywordBold = True일 경우 KeywordText Bold처리 , count = count Text,  Null일 경우 출력안됨  */}
			<HashLabel keyword={'#KEYWORD'} keywordBold={true} />
			<HashLabel keyword={'#KEYWORD'} keywordBold={true} count={'Count한 게시물'} />
			<HashLabel keyword={'#KEYWORD'} keywordBold={false} count={'Count한 게시물'} />

			{/* ShelterLabel의 경우 private - True => [사] 글자 아이콘 / False => [공] 글자 아이콘 */}
			{/* nameColor=Shelter_name 칼라가 바뀐다 */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}>ShelterLAbel</Text>
			<ShelterLabel data={shelter_dummy1} onLabelClick={e => alert(e)} />
			<ShelterLabel data={shelter_dummy2} onLabelClick={e => alert(e)} />
			<ShelterLabel data={shelter_dummy3} onLabelClick={e => alert(e)} />
			<ShelterLabel onLabelClick={e => alert(e)} />
			{/* ShelterSmallLabel */}
			<ShelterSmallLabel data={shelter_dummy1} onLabelClick={e => alert(e)}/>
			<ShelterSmallLabel data={shelter_dummy2} onLabelClick={e => alert(e)}/>
			<ShelterSmallLabel data={shelter_dummy3} onLabelClick={e => alert(e)}/>

			{/* ShelterInfo */}
			<ShelterInfo data={shelterInfo_dummy1} />
			<ShelterInfo data={shelterInfo_dummy2} />
			<ShelterInfo data={shelterInfo_dummy3} />
		</ScrollView>
	);
};
export default LabelTest;
