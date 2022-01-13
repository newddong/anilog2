import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import FeedThumnail from 'Root/component/molecules/FeedThumnail';
import ProtectedThumbnail from 'Root/component/molecules/ProtectedThumbnail';

export default FeedThumbnailTest = props => {
	const rand1 = Math.floor(Math.random() * 100);
	const rand2 = Math.floor(Math.random() * 100);
	const rand3 = Math.floor(Math.random() * 100);
	const mediaList = ['1', '2', 'Video', '4'];
	const mediaList2 = ['1', '2', '3'];
	const mediaList3 = ['1'];
	const feedInfo = {
		feed_id: 'Feed _id',
		isVideo: rand1 > 50 ? true : false,
		alert_title: rand1 > 50 ? 'Alert Title' : null,
		medias: mediaList3,
	};
	const feedInfo2 = {
		feed_id: 'Feed _id',
		isVideo: rand2 > 50 ? true : false,
		alert_title: rand2 > 50 ? 'Alert Title' : null,
		medias: mediaList2,
	};
	const feedInfo3 = {
		feed_id: 'Feed _id',
		isVideo: rand3 > 50 ? true : false,
		alert_title: rand3 > 50 ? 'Alert Title' : null,
		medias: mediaList,
	};
	const _protectedThumbnail = {
		img_uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJnMtf3hxsk1F_4zdgzjjlP-wnyiXLcdbR7w&usqp=CAU',
		gender: 'male',
		status: 'protected',
	};
	const _protectedThumbnail2 = {
		img_uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJnMtf3hxsk1F_4zdgzjjlP-wnyiXLcdbR7w&usqp=CAU',
		gender: 'female',
		status: 'protected',
	};
	const _protectedThumbnail3 = {
		img_uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJnMtf3hxsk1F_4zdgzjjlP-wnyiXLcdbR7w&usqp=CAU',
		gender: 'male',
		status: 'emergency',
	};
	return (
		<ScrollView>
			<Text style={{backgroundColor: 'blue', color: 'white'}}>Feed Thumbnail - only photo </Text>

			<ScrollView horizontal={true} style={{flexDirection: 'row'}}>
				<FeedThumnail img_uri={'http://ojsfile.ohmynews.com/STD_IMG_FILE/2019/0603/IE002505411_STD.jpg'} data={feedInfo} onSelect={ (e) => console.log(e)} />
				<FeedThumnail img_uri={'http://ojsfile.ohmynews.com/STD_IMG_FILE/2019/0603/IE002505411_STD.jpg'} data={feedInfo2} />
				<FeedThumnail data={feedInfo3} />
			</ScrollView>
			<Text style={{backgroundColor: 'blue', color: 'white'}}> ProtectedThumbnail </Text>
			<ScrollView horizontal={true} style={{flexDirection: 'row'}}>
				<ProtectedThumbnail data={_protectedThumbnail} />
				<ProtectedThumbnail data={_protectedThumbnail2} />
				<ProtectedThumbnail data={_protectedThumbnail3} />
				<ProtectedThumbnail />
			</ScrollView>
		</ScrollView>
	);
};
