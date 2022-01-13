import React from 'react';
import {View, ScrollView, StyleSheet, Text, TextInput, Image, TouchableWithoutFeedback,Platform,Animated} from 'react-native';

import {CameraIcon, LocationPinIcon, PawIcon, DownBracketGray} from 'Asset/image';
import DP from 'Screens/dp';
import SvgWrapper from 'Screens/svgwrapper';
import {TabContext} from 'tabContext';
import {TextPropTypes} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import BtnCancel from './btn_cancel.svg';
import FastImage from 'react-native-fast-image';

export default WriteFeed = ({navigation, route}) => {
	const context = React.useContext(TabContext);
	const editData = route.params?.editData;
	const initData = () => {
		if(editData){
			console.log('init Edit');
			return {
				images: editData.images,
				content:editData.content,
				_id:editData._id,
			};
		}else{
			console.log('init normal');
			return {
				images:[],content:'',_id:''
			};
		}
	}

	const isFocused = useIsFocused();
	const [data, setData] = React.useState(initData());

	const test = () => {
		console.log('\n\ntest\n')
		route.params.localSelectedImages?.map((v,i)=>console.log(`localselected ${i} ===> ` + v.uri+ '\n   :Tags:    '+JSON.stringify(v.tags)));
		console.log('\n\n');
		data.images?.map((v,i)=>console.log(`DataState ${i} ===> ` + v.uri+ '\n   :Tags:    '+JSON.stringify(v.tags)));
		console.log('\n\n');
		// console.log('localSelectedImages ===>' + JSON.stringify(route.params.localSelectedImages));
		// console.log('DataState ===> ' + JSON.stringify(data.images));
		editData.images?.map((v,i)=>console.log(`editData ${i} ===> ` + v.uri+ '\n   :Tags:    '+JSON.stringify(v.tags)));
		// if (editData) console.log('editData ===> ' + JSON.stringify(editData.images));
		console.log('end of log \n\n')
		navigation.setParams({...route.params,test:''});
	};

	React.useEffect(()=>{
		navigation.setParams({...route.params,editImages:data.images});
	},[data]);

	React.useEffect(() => {
		if(route.params.localSelectedImages){
			setData({...data,images:route.params.localSelectedImages.map(v=>v)});
		}else{
			setData({...data,images:data.images});
		}
	}, [route.params.localSelectedImages]);

	React.useEffect(() => {
		if (isFocused) {
			context.tabVisible(false);
		}
		return () => {
			context.tabVisible(true);
		};
	}, [isFocused]);


	const textInput = React.useRef();

	const [btnPublicClick, setBtnPublicClick] = React.useState(false);

	const cancel_select = (uri, cancel) => () => {
		setData({
			...data,
			images: data.images.filter((v, i, a) => {
				return v.uri !== uri;
			}),
		});
	};

	const input = React.useRef();
	const [search, setSearch] = React.useState(false);
	const textinput = e => {
		let lastchar = e.nativeEvent.text.charAt(e.nativeEvent.eventCount - 1);
		switch (lastchar) {
			case '@':
				setSearch(true);
				console.log(input.current);
				break;
			case '#':
				setSearch(true);
				break;
		}
	};

	const textChange = e => {
		// console.log('텍스트 변경' + JSON.stringify(route.params));
		navigation.setParams({...route.params, content: e.nativeEvent.text});
		// setData({...data, content: e.nativeEvent.text});

	};

	//move to other pages
	const moveToPhotoSelect = () => {
		navigation.push('AddPhoto', {navfrom: route.name,selectedImages:data.images.map(v=>v)});
	};
	const moveToCamera = () => {
		navigation.push('userList');
	};

	const moveToTag = () => {
		navigation.push('photoTag',{navfrom: route.name,selectedImages:data.images});
	};

	//Animation Setting
	const clickbtnPublic = () => {
		if (btnPublicClick) {
			setBtnPublicClick(false);
		} else {
			setBtnPublicClick(true);
		}
		console.log(route.params?.images);
	};
	//end Animation Setting

	return (
		<View style={lo.wrp_main}>
			<TouchableWithoutFeedback
				onPress={() => {
					textInput.current.focus();
				}}>
				<View style={lo.box_txtinput}>
					{/* <TextInput style={lo.input_txt} placeholder="내용 입력..." onChange={textChange} multiline ref={(ref)=>input.current=ref} value={route.params?.content}></TextInput> */}
					<FormTxtInput
						onChange={textChange}
						multiline
						value={route.params.content}
						inputStyle={lo.input_txt}
						placeholder={'내용 입력...'}
						placeholderTextColor={'#767676'}
						ref={textInput}></FormTxtInput>
				</View>
			</TouchableWithoutFeedback>
			{!search ? (
				<View style={[lo.wrp_box, lo.shadow]}>
					<View style={lo.box_btn}>
						<TouchableWithoutFeedback onPress={moveToPhotoSelect}>
							<View style={lo.box_actionbtn}>
								<SvgWrapper style={{width: 62 * DP, height: 56 * DP, marginRight: 10 * DP}} svg={<CameraIcon />} />
								<Text style={[txt.noto24r, txt.pink]}>사진추가</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={moveToCamera}>
							<View style={lo.box_actionbtn}>
								<SvgWrapper style={{width: 46 * DP, height: 56 * DP, marginRight: 10 * DP}} svg={<LocationPinIcon />} />
								<Text style={[txt.noto24r, txt.pink]}>위치추가</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={moveToTag}>
							<View style={lo.box_actionbtn}>
								<SvgWrapper style={{width: 54 * DP, height: 48 * DP, marginRight: 10 * DP}} svg={<PawIcon fill="#FFB6A5" />} />
								<Text style={[txt.noto24r, txt.pink]}>태그하기</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>

					<View style={{marginTop: 40 * DP, paddingLeft: 48 * DP}}>
						<ScrollView horizontal>
							{data.images?.map((v, i) => (
								<SelectedPhoto source={v.uri} key={i} onPress={cancel_select} />
							))}
						</ScrollView>
					</View>

					<View style={btn.cntr_dropdown}>
						<TouchableWithoutFeedback onPress={test}>
							<View style={btn.dropdown}>
								<View style={[btn.size, {...btn.btn_profile, backgroundColor: '#FFB6A5'}, btn.shadow]}>
									<Text style={[txt.noto24b, txt.white]}>임보일기</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
						<View style={btn.dropdown}>
							<View style={[btn.size, btn.btn_profile, btn.shadow]}>
								<Text style={[txt.noto24r, txt.gray]}>댓글기능중지</Text>
							</View>
						</View>
						<View style={btn.dropdown}>
							<Animated.View style={[{...btn.size, ...btn.box_menu}, btn.shadow]}>
								{btnPublicClick && (
									<>
										<Text style={[txt.noto28r, txt.white, {marginTop: 60 * DP}]}>전체공개</Text>
										<Text style={[txt.noto28r, txt.white]}>팔로워공개</Text>
										<Text style={[txt.noto28r, txt.white]}>비공개</Text>
									</>
								)}
							</Animated.View>
							<TouchableWithoutFeedback onPress={clickbtnPublic}>
								<View style={[btn.size, btn.btn_profile, btn.shadow, {position: 'absolute'}]}>
									<Text style={[txt.noto24r, txt.gray]}>공개설정</Text>
									<SvgWrapper style={[btn.profileButtonBracketsize]} svg={<DownBracketGray />} />
								</View>
							</TouchableWithoutFeedback>
						</View>
					</View>
				</View>
			) : (
				<SearchList />
			)}
		</View>
	);
};

const SearchList = props => {
	return (
		<View style={[lo.wrp_box, lo.shadow]}>
			<ScrollView contentContainerStyle={{paddingTop: 10 * DP}}>
				<SearchItem />
				<SearchItem />
				<SearchItem />
				<SearchItem />
				<SearchItem />
				<SearchItem />
				<SearchItem />
				<SearchItem />
				<SearchItem />
				<SearchItem />
			</ScrollView>
		</View>
	);
};

const SearchItem = props => {
	return (
		<View style={search.wrap_item}>
			<View style={search.box_info}>
				<Image style={search.img_thumb} source={{uri: 'https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg'}}></Image>
				<View style={search.box_useinfo}>
					<Text style={[txt.noto28b, txt.gray]}>dog_kim</Text>
					<Text style={[txt.noto24r, txt.gray]}>까꿍이</Text>
				</View>
			</View>
			<View style={search.box_status}>
				<Text style={[txt.noto24r, txt.gray]}>팔로우중</Text>
			</View>
		</View>
	);
};

const SelectedPhoto = props => {
	const [isCancel, setCancel] = React.useState(false);
	const cancel = () => {
		setCancel(false);
	};
	return (
		!isCancel && (
			<View style={selected.wrp_image}>
				{Platform.OS==='ios'?<Image style={selected.image} source={{uri: props.source}} />:
				<FastImage style={selected.image} source={{uri: props.source}} />}
				<TouchableWithoutFeedback style={selected.btn_cancel} onPress={props.onPress(props.source, cancel)}>
					<View style={[selected.btn_cancel, selected.shadow]}>
						<SvgWrapper style={{width: 36 * DP, height: 36 * DP}} svg={<BtnCancel fill="#fff" />} />
					</View>
				</TouchableWithoutFeedback>
			</View>
		)
	);
};


const selected = StyleSheet.create({
	wrp_image: {
		marginRight: 30 * DP,
	},
	image: {
		width: 190 * DP,
		height: 190 * DP,
		borderRadius: 30 * DP,
	},
	btn_cancel: {
		width: 36 * DP,
		height: 36 * DP,
		top: 6 * DP,
		right: 6 * DP,
		position: 'absolute',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 4,
	},
});

const lo = StyleSheet.create({
	wrp_main: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	box_txtinput: {
		height: 300 * DP,
		paddingHorizontal: 48 * DP,
		paddingTop: 40 * DP,
		backgroundColor: '#FFF',
	},
	input_txt: {
		paddingVertical: 0,
		borderWidth: 0,
		includeFontPadding: false,
	},
	wrp_box: {
		flex: 1,
		backgroundColor: '#fff',
	},
	box_btn: {
		marginTop: 40 * DP,
		flexDirection: 'row',
		backgroundColor: '#fff',
		justifyContent: 'space-around',
	},
	box_actionbtn: {
		flexDirection: 'row',
		height: 56 * DP,
		alignItems: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		elevation: 4,
	},
});

const btn = StyleSheet.create({
	size: {
		width: 198 * DP,
		height: 60 * DP,
	},
	btn_profile: {
		borderRadius: 30 * DP,
		backgroundColor: '#FFFFFF',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		// position: 'absolute',
		// zIndex: 150,
	},
	cntr_dropdown: {
		flexDirection: 'row',
		paddingHorizontal: 48 * DP,
		marginTop: 40 * DP,
		justifyContent: 'space-between',
	},
	dropdown: {},
	profileButtonBracketsize: {
		height: 12 * DP,
		width: 20 * DP,
		marginLeft: 14 * DP,
	},
	box_menu: {
		backgroundColor: '#FFB6A5',
		height: 312 * DP,
		borderRadius: 30 * DP,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 2,
	},
});

const txt = StyleSheet.create({
	noto24r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 36 * DP,
	},
	noto24b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 24 * DP,
		lineHeight: 35 * DP,
	},
	noto28r: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
	},
	noto30b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 30 * DP,
		lineHeight: 46 * DP,
	},
	roboto24r: {
		fontFamily: 'Roboto-Regular',
		fontSize: 24 * DP,
		lineHeight: 30 * DP,
	},
	gray: {
		color: '#767676',
	},
	pink: {
		color: '#FFB6A5',
	},
	white: {
		color: '#FFFFFF',
	},
});

const search = StyleSheet.create({
	wrap_item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
		marginVertical: 20 * DP,
	},

	img_thumb: {
		width: 76 * DP,
		height: 76 * DP,
		borderRadius: 38 * DP,
		marginRight: 20 * DP,
	},
	box_info: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	box_useinfo: {},
	box_status: {},
});
