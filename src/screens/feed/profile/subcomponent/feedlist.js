import React, {useState, useRef} from 'react';
import {Text, View, Image, ScrollView, TouchableWithoutFeedback, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {layout, text, button} from '../style_profile';
import {VideoPlayIcon, PhotoListIcon} from 'Asset/image';
import {SvgWrap} from 'Screens/svgwrapper';
import DP from 'Root/screens/dp';
import FastImage from 'react-native-fast-image';

export default FeedList = ({onScrollBeginDrag, onScroll, data}) => {
	return (
		// <ScrollView style={layout.photoListContainer}>
		// 	<View style={layout.photoListPage}>
		// 		{data.map((e,i)=><FeedItem data={e} key={i}/>)}
		// 	</View>
		// </ScrollView>

		<FlatList
			style={layout.photoListContainer}
			// contentContainerStyle={layout.photoListPage}
			data={data}
			horizontal={false}
			renderItem={({item, index}) => <FeedItem data={item} />}
			numColumns={3}
			keyExtractor={item => item._id}
			onScroll={onScroll}
			onScrollBeginDrag={onScrollBeginDrag}
		/>
	);
};

FeedList.defaultProps = {
	onScroll: e => {},
	onScrollBeginDrag: e => {
		0;
	},
};


const FeedItem = React.memo(({data}) => {
	const navigation = useNavigation();
	const moveToPost = () => {
		console.log(data);
		navigation.navigate('FeedListUser', {user_nickname: data.user_nickname, user_id: data.user, post_id: data._id});
	};
	const PHOTO =0;
	const PHOTOLIST = 1;
	const VIDEO = 2;
	const itemStatus = React.useMemo(()=>{
			if(data.images?.length>1)return PHOTOLIST;
			if(data.images?.length==1)return PHOTO;
	},[data]);

	const imgUri = data.images[0] ? data.images[0].uri:'https://image.shutterstock.com/image-vector/no-image-available-icon-template-600w-1036735678.jpg';

	return (
		<TouchableWithoutFeedback onPress={moveToPost}>
			<View>
				<FastImage
					source={{
						uri: imgUri,
					}}
					style={layout.photoListItems}
				/>
				<View style={{position:'absolute',top:20*DP,left:20*DP,width:48*DP,height:48*DP}}>
					{itemStatus===VIDEO&&<SvgWrap style={{width:48*DP,height:48*DP}} svg={<VideoPlayIcon fill='#fff'/>}/>}
					{itemStatus===PHOTOLIST&&<SvgWrap style={{width:48*DP,height:48*DP}} svg={<PhotoListIcon fill='#fff'/>}/>}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
});
