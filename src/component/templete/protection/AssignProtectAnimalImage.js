import React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {btn_w226} from 'Atom/btn/btn_style';
import {login_style, btn_style, temp_style, progressbar_style, assignProtectAnimal_style} from 'Templete/style_templete';
import {useNavigation} from '@react-navigation/core';
import Stagebar from 'Molecules/info/Stagebar';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {PLEASE_UPLOAD_PIC} from 'Root/i18n/msg';
import SelectedMediaList from 'Organism/list/SelectedMediaList';
import {AddItem64, Camera54} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import {styles} from 'Atom/image/imageStyle';
import {stagebar_style} from 'Organism/style_organism';
import {launchImageLibrary} from 'react-native-image-picker';

export default AssignProtectAnimalImage = props => {
	const navigation = useNavigation();

	const [imageList, setImageList] = React.useState([]); //PhotoSelect에서 선택된 사진List

	const [data, setData] = React.useState({
		protect_animal_photo_uri_list: [],
	});

	//SelectedMedia 아이템의 X마크를 클릭
	const onDelete = index => {
		let copy = [...imageList];
		copy.splice(index, 1);
		setData({...data, protect_animal_photo_uri_list: copy});
		setImageList(copy);
	};

	//다음 클릭
	const gotoNextStep = () => {
		// console.log('data', data.protect_animal_photo_uri_list);
		navigation.push('AssignProtectAnimalDate', data);
	};

	const gotoSelectPicture = () => {
		// navigation.push('SinglePhotoSelect', route.name);
		launchImageLibrary(
			{
				mediaType: 'photo',
				selectionLimit: 5,
				maxHeight: 1500,
				maxWidth: 1500,
				quality: 0.8,
			},
			responseObject => {
				console.log('선택됨', responseObject);
				if (!responseObject.didCancel) {
					let photoList = [...imageList];
					responseObject.assets.map((v, i) => {
						console.log('v', i, v.uri);
						photoList.push(v.uri);
					});
					setImageList(photoList);
					setData({...data, protect_animal_photo_uri_list: photoList || data.protect_animal_photo_uri_list});
				}
			},
		);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<ScrollView contentContainerStyle={[assignProtectAnimal_style.container]}>
				{/* (M)StageBar	 */}
				<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
					<Stagebar
						backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
						insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
						current={1} //현재 단계를 정의
						maxstage={4} //전체 단계를 정의
						width={600 * DP} //bar의 너비
						textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					/>
				</View>

				<View style={[assignProtectAnimal_style.textMsg]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>{PLEASE_UPLOAD_PIC}</Text>
				</View>

				<View style={[assignProtectAnimal_style.selectedMediaList]}>
					{imageList.length == 0 ? (
						<TouchableOpacity onPress={gotoSelectPicture} style={[assignProtectAnimal_style.addPhoto]}>
							<AddItem64 />
							<Text style={[txt.noto30, assignProtectAnimal_style.addPhotoText]}>{'  '}사진 추가</Text>
						</TouchableOpacity>
					) : (
						<SelectedMediaList items={imageList} layout={styles.img_square_round_410} onDelete={index => onDelete(index)} />
					)}
				</View>

				<View
					style={[
						assignProtectAnimal_style.btn_w226_view_image,
						imageList.length > 0 ? {justifyContent: 'space-between'} : {justifyContent: 'flex-end'},
					]}>
					{imageList.length > 0 ? (
						<View style={[assignProtectAnimal_style.pic]}>
							<Camera54 onPress={gotoSelectPicture} />
							<TouchableOpacity onPress={gotoSelectPicture}>
								<Text style={[txt.noto24, assignProtectAnimal_style.addpic, {textAlignVertical: 'center'}]}>사진추가</Text>
							</TouchableOpacity>
						</View>
					) : (
						<></>
					)}
					<View style={[assignProtectAnimal_style.btn_w226]}>
						<AniButton btnTitle={'다음'} disable={data.protect_animal_photo_uri_list.length == 0} btnLayout={btn_w226} onPress={gotoNextStep} />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
