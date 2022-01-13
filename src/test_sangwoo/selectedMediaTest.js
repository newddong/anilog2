import React from 'react';
import {Text, View} from 'react-native';
import SelectedMedia410 from 'Root/component/molecules/SelectedMedia410';
import SelectedMedia190 from 'Root/component/molecules/SelectedMedia190';
import LocalMedia from 'Root/component/molecules/LocalMedia';
import {ScrollView} from 'react-native';
import CameraLink from 'Root/component/molecules/CameraLink';
export default SelectedMediaTest = () => {

	const mediaInfo = {
		img_uri: 'https://image.fmkorea.com/files/attach/new/20201207/3842645/2930567375/3244995220/a1088d8425a7870a66d4503b07c83b48.jpg',
		isVideo: true,
		duration: '03:10',
	};

	const photoInfo = {
		img_uri: 'https://image.fmkorea.com/files/attach/new/20201207/3842645/2930567375/3244995220/a1088d8425a7870a66d4503b07c83b48.jpg',
		isVideo: false,
		duration: '03:10',
	};

	const [selectedList, setSelectedList] = React.useState([]);
	const getSelectedListIndex = () => {
		
	}
	return (
		<ScrollView>
			{/* SelectedMedia 410 , 190 */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> SelectedMedia 410/ 190 </Text>

			<View style={{flexDirection: 'row'}}>
				<SelectedMedia410
					media_uri={'https://image.fmkorea.com/files/attach/new/20201207/3842645/2930567375/3244995220/a1088d8425a7870a66d4503b07c83b48.jpg'}
				/>
				<SelectedMedia190
					media_uri={'https://image.fmkorea.com/files/attach/new/20201207/3842645/2930567375/3244995220/a1088d8425a7870a66d4503b07c83b48.jpg'}
				/>
			</View>

			{/* Local Media */}
			{/* Photo Thumnail */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> LocalMedia - Photo Thumbnail </Text>
			<LocalMedia data={photoInfo} onSelect={e => alert(e)} />
			{/* Photo 1 selected */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> LocalMedia - Photo - selected 1 photo </Text>
			<LocalMedia data={photoInfo} isSingleSelection={true} onSelect={e => alert(e)} />
			{/* Photo multiple selected */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> LocalMedia - PHoto - selected 5 photos </Text>
			<View style={{flexDirection: 'row'}}>
				<LocalMedia
					data={photoInfo}
					isSingleSelection={false}
					onSelect={e => {
						alert(e);
						setSelectedList(prevList => [...prevList, mediaInfo]);
					}}
					index={selectedList.length}
				/>
				<LocalMedia
					data={photoInfo}
					isSingleSelection={false}
					onSelect={e => {
						alert(e);
						setSelectedList(prevList => [...prevList, mediaInfo]);
					}}
					index={selectedList.length}
				/>
				<LocalMedia
					data={photoInfo}
					isSingleSelection={false}
					onSelect={e => {
						alert(e);
						setSelectedList(prevList => [...prevList, mediaInfo]);
					}}
					index={selectedList.length}
				/>
				<LocalMedia
					data={photoInfo}
					isSingleSelection={false}
					onSelect={e => {
						alert(e);
						setSelectedList(prevList => [...prevList, mediaInfo]);
					}}
					index={selectedList.length}
				/>
			</View>
			{/* isVideo=true Thumbnail */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> LocalMedia186 - Video(Thumbnail) </Text>
			<LocalMedia
				data={mediaInfo}
				onSelect={e => {
					alert(e);
				}}
			/>
			{/* isVideo True 1 video Selected */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> LocalMedia186 - isSingleSelection </Text>
				<LocalMedia
					data={mediaInfo}
					isSingleSelection={true}
					onSelect={e => {
						alert(e);
					}}
				/>
				<LocalMedia/>
			{/* isVideo True multiple selected */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> LocalMedia186 -Video multiple </Text>
			<View style={{flexDirection: 'row'}}>
				<LocalMedia
					data={mediaInfo}
					isSingleSelection={false}
					onSelect={e => {
						setSelectedList(prevList => [...prevList, mediaInfo]);
						alert(e);
					}}
					index={selectedList.length}
				/>
				<LocalMedia
					data={mediaInfo}
					isSingleSelection={false}
					onSelect={e => {
						setSelectedList(prevList => [...prevList, mediaInfo]);
						alert(e);
					}}
					index={selectedList.length}
				/>
				<LocalMedia
					data={mediaInfo}
					isSingleSelection={false}
					onSelect={e => {
						setSelectedList(prevList => [...prevList, mediaInfo]);
						alert(e);
					}}
					index={selectedList.length}
				/>
				<LocalMedia
					data={mediaInfo}
					isSingleSelection={false}
					onSelect={e => {
						setSelectedList(prevList => [...prevList, mediaInfo]);
						alert(e);
					}}
					index={selectedList.length}
				/>
			</View>

			{/* CameraLink */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}>CameraLink </Text>
			<View>
				<CameraLink onClick={() => alert('Onclick')} />
			</View>
		</ScrollView>
	);
};
