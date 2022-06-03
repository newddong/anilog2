import React from 'react';
import {Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import {APRI10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';
import {Camera54} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import AidRequest from 'Organism/listitem/AidRequest';
import {assignProtectAnimal_style, login_style, writeAidRequest} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {getProtectRequestByProtectRequestId} from 'Root/api/protectapi';
import Loading from 'Root/component/molecules/modal/Loading';

//보호요청 게시글 수정
export default EditAidRequest = ({route, navigation}) => {
	// console.log('route.params :   ', route.params);

	const [data, setData] = React.useState('false'); //ShelterProtectAnimalObject(보호소의 보호동물) 정보가 담겨있음
	const [imageList, setImageList] = React.useState([]); //PhotoSelect에서 선택된 사진List
	const [protectRequestData, setProtectRequestData] = React.useState();
	const [previousPhotoList, setPreviousPhotoList] = React.useState([]);
	const [deletedList, setDeletedList] = React.useState([]);
	const titleRef = React.useRef();
	const contentRef = React.useRef();
	React.useEffect(() => {
		getProtectRequestByProtectRequestId(
			{
				protect_request_object_id: route.params.data,
			},
			result => {
				// console.log('result / getProtectRequestByProtectRequestId / EditAidREquest : ', result.msg);
				const res = result.msg.protect_animal_id;
				setProtectRequestData({
					protect_request_object_id: result.msg._id,
					protect_request_photos_uri: [],
					protect_request_title: result.msg.protect_request_title,
					protect_request_content: result.msg.protect_request_content,
					protect_request_status: 'rescue',
					protect_photos_to_delete: '',
				});
				setImageList(result.msg.protect_request_photos_uri.slice(1, result.msg.protect_request_photos_uri.length));
				setPreviousPhotoList(result.msg.protect_request_photos_uri);
				setData(res);
			},
			err => {
				console.log('err / getProtectRequestByProtectRequestId / EditAidRequest : ', err);
			},
		);
	}, []);

	//헤더로 데이터 보내기
	React.useEffect(() => {
		// console.log('ProtectRequestData / WriteAidRequest ', protectRequestData);
		navigation.setParams({data: protectRequestData, nav: route.name});
	}, [protectRequestData]);


	React.useEffect(()=>{
		if(route.params.selectedPhoto&&route.params.selectedPhoto.length>0){
			console.log(route.params);
			let selected = route.params.selectedPhoto;
			let tempContainer = selected.map(v=>{return v.cropUri??v.uri});
			setImageList(tempContainer);
			setProtectRequestData({...protectRequestData, protect_request_photos_uri: tempContainer});
			setData({...data, protect_request_photos_uri: tempContainer || data.protect_request_photos_uri});
		}
	},[route.params?.selectedPhoto]);


	const gotoSelectPicture = () => {
		if (imageList.length > 4) {
			Modal.alert('첨부파일은 5개까지만 가능합니다');
			return;
		}
		navigation.push("MultiPhotoSelect",{prev:{name:route.name,key:route.key,selectedPhoto:imageList.map(v=>({uri:v}))}});
	};

	//SelectedMedia 아이템의 X마크를 클릭
	const onDelete = index => {
		let copy = [...imageList];
		copy.splice(index, 1);
		setImageList(copy);
		// console.log('deleted uri', previousPhotoList[index]);
		let deleted = [...deletedList];
		deleted.push(previousPhotoList[index]);
		setDeletedList(deleted);
		setProtectRequestData({...protectRequestData, protect_request_photos_uri: copy, protect_photos_to_delete: deleted});
		// setData({...data, protect_request_photos_uri: copy || data.protect_request_photos_uri});
	};

	//보호게시글 내용 값 변경 콜백
	const onChangeContent = text => {
		setProtectRequestData({...protectRequestData, protect_request_content: text});
	};

	//보호게시글 제목 값 변경 콜백
	const onChangeTitle = text => {
		setProtectRequestData({...protectRequestData, protect_request_title: text});
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	}
	return (
		<View style={[login_style.wrp_main, style.container]}>
			<ScrollView style={{flex: 1}} contentContainerStyle={{}}>
				<View style={[style.aidRequestCont]}>
					<AidRequest data={data} selected={true} />
				</View>
				<View style={[style.feedTextEdit]}>
					<View style={[style.titleContainer]}>
						<TextInput
							onChangeText={onChangeTitle}
							placeholder={'제목 입력'}
							placeholderTextColor={GRAY20}
							// numberOfLines={1}
							ref={titleRef}
							defaultValue={protectRequestData.protect_request_title}
							style={[txt.noto30, style.titleInput, {borderBottomColor: APRI10}]}
						/>
					</View>
					<View style={[style.contentContainer]}>
						{/* 피드 글 작성 */}
						<TextInput
							onChangeText={onChangeContent}
							defaultValue={protectRequestData.protect_request_content}
							style={[style.contentInput]}
							maxLength={500}
							ref={contentRef}
							textAlignVertical={'top'}
							multiline={true}
							placeholderTextColor={GRAY20}
							placeholder="내용 입력"
						/>
						<Text style={[txt.noto24, {color: GRAY20, alignSelf: 'flex-end'}]}>{protectRequestData.protect_request_content.length} / 500</Text>
					</View>
				</View>

				<View style={[style.pic, {}]}>
					<Camera54 onPress={gotoSelectPicture} />
					<TouchableOpacity onPress={gotoSelectPicture}>
						<Text style={[txt.noto24, assignProtectAnimal_style.addpic]}>사진추가</Text>
					</TouchableOpacity>
				</View>
				<View style={[style.selectedMediaList]}>
					{imageList.length == 0 ? (
						<></>
					) : (
						<SelectedMediaList items={imageList} layout={styles.img_square_round_190} onDelete={index => onDelete(index)} />
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	aidRequest: {
		marginTop: 40 * DP,
	},
	aidRequestCont: {
		width: 750 * DP,
		alignItems: 'center',
		marginTop: 40 * DP,
	},
	titleContainer: {
		marginBottom: 20 * DP,
	},
	titleInput: {
		paddingHorizontal: 15 * DP,
		marginTop: 10 * DP,
		borderBottomWidth: 2 * DP,
		height: 100 * DP,
	},
	contentInput: {
		width: 606 * DP,
		height: 300 * DP,
	},
	feedTextEdit: {
		marginTop: 40 * DP,
		width: 654 * DP,
		alignSelf: 'center',
		borderRadius: 24 * DP,
	},
	requestContent_underline: {
		width: 654 * DP,
		height: 2 * DP,
		marginVertical: 40 * DP,
		backgroundColor: APRI10,
	},
	contentContainer: {
		width: 654 * DP,
		height: 376 * DP,
		borderRadius: 24 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		padding: 24 * DP,
	},
	addPhotoContainer: {
		width: 160 * DP,
		height: 54 * DP,
		marginLeft: 48 * DP,
		marginTop: 38 * DP,
		alignSelf: 'flex-start',
		flexDirection: 'row',
	},
	addPhotoText: {
		marginLeft: 12 * DP,
		width: 94 * DP,
		height: 38 * DP,
		backgroundColor: 'pink',
		alignSelf: 'center',
	},
	addPhoto: {
		height: 190 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		borderRadius: 40 * DP,
		borderWidth: 7 * DP,
		borderColor: APRI10,
	},
	selectedMediaList: {
		width: 654 * DP,
		alignSelf: 'flex-start',
		marginTop: 30 * DP,
		marginBottom: 40 * DP,
		marginLeft: 48 * DP,
	},
	pic: {
		flexDirection: 'row',
		width: 654 * DP,
		marginTop: 40 * DP,
		alignSelf: 'center',
		justifyContent: 'flex-start',
	},
});
