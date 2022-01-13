import React from 'react';
import {SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity} from 'react-native';
import {styles} from 'Root/component/atom/image/imageStyle';
import DP from 'Screens/dp';
import {useNavigation} from '@react-navigation/core';
export default ImageStyleTest = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{flexDirection:'row'}}>
				<TouchableOpacity onPress={() => navigation.navigate('Icon')}>
					<Text style={{width:100, height:50, backgroundColor:'yellow', textAlign:'center', fontSize:30}}>Icon</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('Label')}>
					<Text style={{width:100, height:50, backgroundColor:'yellow', textAlign:'center', fontSize:30}}>Label</Text>
				</TouchableOpacity>
				</View>

				<Text style={{backgroundColor: 'blue', color: 'white'}}> TagView </Text>

				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_round_606 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_round_606} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_round_574 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_round_574} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_round_410 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_round_410} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_round_240 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_round_240} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_round_214 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_round_214} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_round_190 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_round_190} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_round_178 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_round_178} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_246 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_246} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_square_186 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_square_186} />
				</View>

				{/* 직사각형 스타일 */}
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_rect_654x542 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_rect_654x542} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_rect_654x400 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_rect_654x400} />
				</View>

				{/* 불규칙 스타일 */}
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_irregular_174 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_irregular_174} />
				</View>

				{/* Circle ImageStyle */}

				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_522 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_522} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_294 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_294} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_194 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_194} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_180 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_180} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_160 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_160} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_140 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_140} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_120 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_120} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_94 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_94} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_70 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_70} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_60 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_60} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}> img_round_56 </Text>
					<Image source={{uri: 'https://i.ytimg.com/vi/ERAMkP92arE/maxresdefault.jpg'}} style={styles.img_round_56} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
