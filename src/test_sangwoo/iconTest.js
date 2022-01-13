import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View, Button} from 'react-native';
import {
	Heart30_Border,
	Heart30_Filled,
	Paw30_APRI10,
	Paw30_YELL20,
	Paw30_Mixed,
	Private30,
	Public30,
	Cat38,
	Dog38,
	Cross46,
	Shelter46,
	FavoriteTag46_Filled,
	FavoriteTag48_Filled,
	FavoriteTag48_Border,
	Paw46,
	Setting46,
	Search48,
	AlarmBadger48,
	RadioChecked48,
	RadioUnchecked48,
	Public48,
	Private48,
	Like48_Border,
	Like48_Filled,
	Comment48_Border,
	Heart48_Filled,
	Paw48_YELL20,
	Paw48_Mixed,
	House48,
	Paw48_APRI10,
	Telephone48,
	Check48,
	Rect48_APRI10,
	Rect48_GRAY30,
	Calendar48_Filled,
	Share48_Filled,
	Share48_Border,
	Calendar48_Border,
	Cross48,
	Person48,
	Phone48,
	TextBalloon48,
	Male48,
	Female48,
	VideoPlay48,
	Bracket48,
	Star50_Border,
	Star50_Filled,
	Meatball50_GRAY20_Horizontal,
	Meatball50_APRI10_Horizontal,
	Meatball50_GRAY20_Vertical,
	Meatball50_APRI10_Vertical,
	Hash50,
	Rect50_Border,
	Check50,
	Heart52_Border,
	Heart52,
	Eye52_APRI10,
	Eye52_GRAY20,
	Cross52,
	Location54_APRI10,
	Location54_GRAY30,
	Camera54,
	Paw54_Border,
	Location54_Filled,
	Siren58_Red,
	Siren58_White,
	ImageList48,
	Cancel48,
	Star60_Border,
	Star60_Filled,
	Photo60,
	Send60,
	Send60_Big,
	Lock60_Border,
	Lock60_Filled,
	Dog62,
	Cat62,
	Rabbit62,
	Paw62_APRI10,
	Paw62_YELL20,
	Paw62_Mixed,
	Cancel62,
	Private62,
	Public62,
	AddItem64,
	Tag70,
	SocialKakao72,
	Clip72,
	Email72,
	FlashOff72,
	Rotate72,
	FlashOn72,
	AddItem92,
	Write94,
	FloatAddPet_126x92,
	FloatAddArticle_126x92,
	FeedTabBorder,
	AnimalSavingTabBorder,
	CommunityTabBorder,
	MyTabBorder,
	FeedTabFilled,
	AnimalSavingTabFilled,
	CommunityTabFilled,
	MyTabFilled,
} from 'Root/component/atom/icon/index';
import { APRI10, GRAY30 } from 'Root/config/color';
import DP from 'Screens/dp';

export default IconTest = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity onPress={() => navigation.navigate('ImageStyle')} style={{backgroundColor:APRI10 ,width: 100, height: 40, justifyContent: 'center'}}>
						<Text>Imagesetyle</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Label')} style={{backgroundColor:GRAY30, width: 100, height: 40, justifyContent: 'center'}}>
						<Text>Label</Text>
					</TouchableOpacity>
				</View>

				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					{/* <SvgWrap style={{backgroundColor:'yellow'}}  svg={<Meatball50h fill='black'/>}/> */}
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 30, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 30 Size Icon : </Text>
						<View style={{width: 30 * DP, height: 30 * DP, backgroundColor: 'red'}} />
						<Heart30_Filled />
						<Heart30_Border />
						<Paw30_APRI10 />
						<Paw30_YELL20 />
						<Paw30_Mixed />
						<Private30 />
						<Public30 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 38, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 38 Size Icon : </Text>
						<View style={{width: 38 * DP, height: 38 * DP, backgroundColor: 'red'}} />
						<Cat38 />
						<Dog38 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 46, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 46 Size Icon : </Text>
						<View style={{width: 46 * DP, height: 46 * DP, backgroundColor: 'red'}} />
						<Cross46 />
						<Shelter46 />
						<FavoriteTag46_Filled />
						<Paw46 />
						<Setting46 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 48, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 48 Size Icon : </Text>
						<View style={{width: 48 * DP, height: 48 * DP, backgroundColor: 'red'}} />
						<Search48 />
						<AlarmBadger48 />
						<RadioChecked48 />
						<RadioUnchecked48 />
						<Public48 />
						<Private48 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 48, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 48 Size Icon : </Text>
						<View style={{width: 48 * DP, height: 48 * DP, backgroundColor: 'red'}} />
						<Like48_Border />
						<Like48_Filled />
						<Comment48_Border />
						<Heart48_Filled />
						<Paw48_YELL20 />
						<Paw48_Mixed />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 48, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 48 Size Icon : </Text>
						<View style={{width: 48 * DP, height: 48 * DP, backgroundColor: 'red'}} />
						<House48 />
						<Paw48_APRI10 />
						<Telephone48 />
						<Check48 />
						<Rect48_APRI10 />
						<Rect48_GRAY30 />
						<Calendar48_Filled />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 48, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 48 Size Icon : </Text>
						<View style={{width: 48 * DP, height: 48 * DP, backgroundColor: 'red'}} />
						<Share48_Filled />
						<Share48_Border />
						<FavoriteTag48_Filled />
						<FavoriteTag48_Border />
						<Calendar48_Border />
						{/* <Cross46/>  */}
						<Cross48 />
						<Person48 />
						<Phone48 />
						<TextBalloon48 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 48, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 48 Size Icon : </Text>

						<View style={{width: 48 * DP, height: 48 * DP, backgroundColor: 'red'}} />
						<Male48 />
						<Female48 />
						{/* 파란 배경은 확인용입니다*/}
						<View style={{backgroundColor: 'blue', flexDirection: 'row'}}>
							<VideoPlay48 />
							<ImageList48 />
							<Cancel48 />
						</View>
						<Bracket48 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 50, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 50 Size Icon : </Text>
						<View style={{width: 50 * DP, height: 50 * DP, backgroundColor: 'red'}} />
						<Star50_Border />
						<Star50_Filled />
						<Meatball50_GRAY20_Horizontal />
						<Meatball50_GRAY20_Vertical />
						<Hash50 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 50, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 50 Size Icon : </Text>
						<View style={{width: 50 * DP, height: 50 * DP, backgroundColor: 'red'}} />
						<Rect50_Border />
						<Check50 />

						<Meatball50_APRI10_Horizontal />
						<Meatball50_APRI10_Vertical />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 52, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 52 Size Icon : </Text>
						<View style={{width: 52 * DP, height: 52 * DP, backgroundColor: 'red'}} />
						<Heart52_Border />
						<Heart52 />
						<Eye52_APRI10 />
						<Eye52_GRAY20 />
						<Cross52 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 54, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 54 Size Icon : </Text>
						<View style={{width: 54 * DP, height: 54 * DP, backgroundColor: 'red'}} />
						<Location54_APRI10 />
						<Location54_GRAY30 />
						<Camera54 />
						<Paw54_Border />
						<Location54_Filled />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 58, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 58 Size Icon : </Text>
						<View style={{width: 58 * DP, height: 58 * DP, backgroundColor: 'red'}} />
						<Siren58_Red />
						<View style={{backgroundColor: 'blue', flexDirection: 'row'}}>
							<Siren58_White />
						</View>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 60, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 60 Siz </Text>
						<View style={{width: 60 * DP, height: 60 * DP, backgroundColor: 'red'}} />
						<Star60_Border />
						<Star60_Filled />
						<Photo60 />
						<Send60 />
						<Send60_Big />

						<Lock60_Border />
						<Lock60_Filled />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 62, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 62 Size Icon : </Text>
						<View style={{width: 62 * DP, height: 62 * DP, backgroundColor: 'red'}} />
						<Dog62 />
						<Cat62 />
						<Rabbit62 />
						<Paw62_APRI10 />
						<Paw62_YELL20 />
						<Paw62_Mixed />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 62, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 62 Size Icon : </Text>
						<View style={{width: 62 * DP, height: 62 * DP, backgroundColor: 'red'}} />
						{/* 화면 분간용*/}
						<View style={{backgroundColor: 'blue', flexDirection: 'row'}}>
							<Cancel62 />
						</View>
						<Private62 />
						<Public62 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 64, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 64 Size Icon : </Text>
						<View style={{width: 64 * DP, height: 64 * DP, backgroundColor: 'red'}} />

						<AddItem64 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 70, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 70 Size Icon : </Text>
						<View style={{width: 70 * DP, height: 70 * DP, backgroundColor: 'red'}} />

						<Tag70 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 72, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 72 Size Icon : </Text>
						<View style={{width: 72 * DP, height: 72 * DP, backgroundColor: 'red'}} />
						<SocialKakao72 />
						<Clip72 />
						<Email72 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 72, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 72 Size Icon : </Text>
						<View style={{width: 72 * DP, height: 72 * DP, backgroundColor: 'red'}} />
						{/* 화면 분간용*/}
						<View style={{backgroundColor: 'blue', flexDirection: 'row'}}>
							<FlashOff72 />
							<Rotate72 />
							<FlashOn72 />
						</View>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 92, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 92 Size Icon : </Text>
						<View style={{width: 92 * DP, height: 92 * DP, backgroundColor: 'red'}} />

						{/* 화면 분간용*/}
						<View style={{backgroundColor: 'blue', flexDirection: 'row'}}>
							<AddItem92 />
						</View>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 100, height: 94, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}> 94 Size Icon : </Text>
						<View style={{width: 94 * DP, height: 94 * DP, backgroundColor: 'red'}} />
						<Write94 />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 126, height: 92, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}>
							{' '}
							126 * 92 Size Icon :{' '}
						</Text>
						<View style={{width: 126 * DP, height: 92 * DP, backgroundColor: 'red'}} />
						<FloatAddPet_126x92 />
						<FloatAddArticle_126x92 />
					</View>
					<View style={{backgroundColor: 'yellow', height: 12, width: 400}} />
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 126, height: 30, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}>
							{' '}
							Not yet classified:{' '}
						</Text>
						<FeedTabBorder />
						<AnimalSavingTabBorder />
						<CommunityTabBorder />
						<MyTabBorder />
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{width: 126, height: 30, marginHorizontal: 10, textAlign: 'center', textAlignVertical: 'center'}}>
							{' '}
							Not yet classified:{' '}
						</Text>
						<FeedTabFilled />
						<AnimalSavingTabFilled />
						<CommunityTabFilled />
						<MyTabFilled />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
