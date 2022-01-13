import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {btn_w522} from '../atom/btn/btn_style';
import AniButton from '../molecules/AniButton';
import DropdownSelect from '../molecules/DropdownSelect';
import Stagebar from '../molecules/Stagebar';
import {login_style, btn_style, temp_style, progressbar_style, assignUserHabitation_style} from './style_templete';
import Modal from 'Component/modal/Modal';
import {stagebar_style} from '../organism_ksw/style_organism';
import {getAddressList} from 'Root/api/address';
import NormalDropDown from 'Molecules/NormalDropDown';

/**
 * 유저의 지역정보를 등록하는 템플릿
 *
 * @param {navigation} navigation - 네비게이션을 이용하기 위한 객체
 */
const AssignUserHabitation = props => {
	console.log('-AssignUserHabitation-');
	const debug = false;
	const [data, setData] = React.useState({
		...props.route.params,
		user_address: {
			// city: '시를 선택해 주세요', //시,도
			// district: '구를 선택해 주세요', //군,구
			// neighbor: '동을 선택해 주세요', //동,읍,면
			city: '', //시,도
			district: '', //군,구
			neighbor: '', //동,읍,면
		},
	});

	const [city, setCity] = React.useState(['시를 선택해 주세요']);
	const [district, setDistrict] = React.useState(['구를 선택해 주세요']);
	const [neighbor, setNeighbor] = React.useState(['동을 선택해 주세요']);
	const [adressValid, setAdressValid] = React.useState(false); // 주소값이 모두 들어갔을 경우
	const [isCityChanged, setIsCityChanged] = React.useState(false); //시단위 선택 변경 시
	const [isDistrictChanged, setIsDistrictChanged] = React.useState(false); //구단위 선택 변경 시

	React.useEffect(() => {
		getAddressList(
			{},
			cities => {
				setCity(cities.msg), handleError;
			},
			err => Modal.alert(err),
		);
	}, []);

	React.useEffect(() => {
		console.log('data.user_address:', data.user_address);
		if (data.user_address.city != '' && data.user_address.district != '' && data.user_address.neighbor != '') {
			setAdressValid(true);
		}
	}, [data.user_address]);

	const onSelectCity = (value, index) => {
		debug && console.log('city:', value);
		getAddressList(
			{city: value},
			districts => {
				setDistrict(districts.msg);
				debug && console.log('districts:', districts.msg);
				setData({...data, user_address: {...data.user_address, city: value, district: districts.msg[0], neighbor: ''}});
				if (value != data.user_address.city) {
					setIsCityChanged(!isCityChanged);
				}
			},
			handleError,
		);
	};

	const onSelectDistrict = (value, index) => {
		debug && console.log('district:', value);
		getAddressList(
			{city: data.user_address.city, district: value},
			neighbor => {
				if (neighbor.msg.length == 0) {
					setNeighbor(['목록없음']);
				} else {
					setNeighbor(neighbor.msg);
				}
				debug && console.log('neighbors:', neighbor.msg);
				setData({...data, user_address: {...data.user_address, district: value, neighbor: neighbor.msg[0] ? neighbor.msg[0] : ''}});
				if (value != data.user_address.district) {
					setIsDistrictChanged(!isDistrictChanged);
				}
			},
			handleError,
		);
	};

	const onSelectNeighbor = (value, index) => {
		debug && console.log('neighbor:', value);
		console.log('value=>', value);
		setData({...data, user_address: {...data.user_address, neighbor: value == '목록없음' ? '' : value}});
	};

	const handleError = error => {
		Modal.popOneBtn(error, '확인', () => Modal.close());
	};

	const goToNextStep = () => {
		props.navigation.push('AssignUserProfileImage', data);
	};

	// const onSelectCity = () => {
	// 	// Modal.rollingSelect(
	// 	// 	'시를 선택해 주세요',
	// 	// 	city,
	// 	// 	city => {
	// 	// 		setData({...data, user_address: {...data.user_address, city: city}});
	// 	// 		getAddressList(
	// 	// 			{city: city},
	// 	// 			districts => {
	// 	// 				setDistrict(districts.msg);
	// 	// 			},
	// 	// 			handleError,
	// 	// 		);
	// 	// 		// cityDrop.current.press();
	// 	// 	},
	// 	// 	() => {
	// 	// 		cityDrop.current.press();
	// 	// 	},
	// 	// );
	// };
	// const onSelectDistrict = selectedItem => {
	// 	Modal.rollingSelect(
	// 		'구를 선택해 주세요',
	// 		district,
	// 		district => {
	// 			setData({...data, user_address: {...data.user_address, district: district}});
	// 			getAddressList(
	// 				{city: data.user_address.city, district: district},
	// 				neighbors => {
	// 					setNeighbor(neighbors.msg);
	// 				},
	// 				handleError,
	// 			);
	// 			districDrop.current.press();
	// 		},
	// 		district => {
	// 			districDrop.current.press();
	// 		},
	// 	);
	// };
	// const onSelectNeighbor = selectedItem => {
	// 	Modal.rollingSelect(
	// 		'동을 선택해 주세요',
	// 		neighbor,
	// 		e => {
	// 			setData({...data, user_address: {...data.user_address, neighbor: e}});
	// 			neighborDrop.current.press();
	// 		},
	// 		() => {
	// 			neighborDrop.current.press();
	// 		},
	// 	);
	// };

	const cityDrop = React.useRef();
	const districDrop = React.useRef();
	const neighborDrop = React.useRef();

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			{/* (M)StageBar	 */}
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<Stagebar
					backgroundBarStyle={stagebar_style.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
					insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
					textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
					current={4} //현재 단계를 정의
					maxstage={4} //전체 단계를 정의
					width={600 * DP} //bar의 너비
				/>
			</View>

			{/* Text Msg */}
			<View style={[assignUserHabitation_style.textContainer]}>
				<Text style={[txt.noto24, assignUserHabitation_style.info_text]}>사는 지역을 대략적으로 알려주세요.</Text>
			</View>
			{/* HabitationForm */}
			<View style={[assignUserHabitation_style.habitationForm]}>
				<NormalDropDown menu={city} width={522} height={500} onSelect={onSelectCity} defaultIndex={0} />
				<NormalDropDown
					menu={district}
					width={522}
					height={500}
					onSelect={onSelectDistrict}
					defaultIndex={0}
					isLargeCategoryChanged={isCityChanged}
				/>
				<NormalDropDown
					menu={neighbor}
					width={522}
					height={500}
					onSelect={onSelectNeighbor}
					defaultIndex={0}
					isLargeCategoryChanged={isDistrictChanged}
				/>

				{/* <DropdownSelect width={522} value={data.user_address.city} onOpen={onSelectCity} ref={cityDrop} /> */}
				{/* <DropdownSelect width={522} value={data.user_address.district} onOpen={onSelectDistrict} ref={districDrop} />
				<DropdownSelect width={522} value={data.user_address.neighbor} onOpen={onSelectNeighbor} ref={neighborDrop} /> */}
			</View>

			{/* (A)Btn_w654 */}
			<View style={[btn_style.btn_w654, assignUserHabitation_style.btn_w654]}>
				{adressValid ? (
					<AniButton btnTitle={'확인'} titleFontStyle={'32'} btnTheme={'shadow'} btnLayout={btn_w522} onPress={goToNextStep} />
				) : (
					<AniButton btnTitle={'확인'} titleFontStyle={'32'} disable={true} btnLayout={btn_w522} />
				)}
			</View>
		</View>
	);
};

export default AssignUserHabitation;
