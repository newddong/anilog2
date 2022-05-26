import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {btn_w522, btn_w654} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import {login_style, btn_style, temp_style, progressbar_style, assignUserHabitation_style} from 'Templete/style_templete';
import Modal from 'Component/modal/Modal';
import {stagebar_style} from 'Organism/style_organism copy';
import {getAddressList} from 'Root/api/address';
import {APRI10} from 'Root/config/color';
import {Arrow_Down_GRAY10} from 'Atom/icon';
import StageBar from 'Molecules/info/Stagebar';

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
			district: '군, 구를 선택해주세요.', //군,구
			neighbor: '동, 읍을 선택해주세요.', //동,읍,면
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
				let res = cities.msg;
				let find = res.findIndex(e => e == '서울특별시');
				let find2 = res.findIndex(e => e == '경기도');
				res.splice(find, 1);
				res.splice(find2, 1);
				res.splice(0, 0, '서울특별시');
				res.splice(1, 0, '경기도');
				setCity(res), handleError;
			},
			err => Modal.alert(err),
		);
	}, []);

	React.useEffect(() => {
		console.log('data.user_address:', data.user_address);
		if (
			data.user_address.city != '' &&
			data.user_address.district != '군, 구를 선택해주세요.' &&
			data.user_address.neighbor != '동, 읍을 선택해주세요.'
		) {
			setAdressValid(true);
		} else {
			setAdressValid(false);
		}
	}, [data.user_address]);

	const handleError = error => {
		Modal.popOneBtn(error, '확인', () => Modal.close());
	};

	const goToNextStep = () => {
		props.navigation.push('AssignUserProfileImage', data);
	};

	const onPressCity = () => {
		Modal.popSelectScrollBoxModal([city], '도, 광역시를 지정해주세요.', value => {
			getAddressList(
				{city: value},
				districts => {
					setDistrict(districts.msg);
					debug && console.log('districts:', districts.msg);
					// setData({...data, user_address: {...data.user_address, city: value, district: districts.msg[0], neighbor: '동, 읍을 선택해주세요.'}});
					setData({
						...data,
						user_address: {...data.user_address, city: value, district: '군, 구를 선택해주세요.', neighbor: '동, 읍을 선택해주세요.'},
					});
					if (value != data.user_address.city) {
						setIsCityChanged(!isCityChanged);
					}
				},
				handleError,
			);
			Modal.close();
		});
	};

	const onPressDistrict = () => {
		Modal.popSelectScrollBoxModal([district], '시, 군, 구를 지정해주세요', value => {
			getAddressList(
				{city: data.user_address.city, district: value},
				neighbor => {
					if (neighbor.msg.length == 0) {
						setNeighbor(['목록없음']);
					} else {
						setNeighbor(neighbor.msg);
					}
					debug && console.log('neighbors:', neighbor.msg);
					// setData({...data, user_address: {...data.user_address, district: value, neighbor: neighbor.msg[0] ? neighbor.msg[0] : ''}});
					setData({...data, user_address: {...data.user_address, district: value, neighbor: '동, 읍을 선택해주세요.'}});
					if (value != data.user_address.district) {
						setIsDistrictChanged(!isDistrictChanged);
					}
				},
				handleError,
			);
			Modal.close();
		});
	};

	const onPressNeighbor = () => {
		Modal.popSelectScrollBoxModal([neighbor], '동, 읍을 지정해주세요.', value => {
			setData({...data, user_address: {...data.user_address, neighbor: value == '목록없음' ? '' : value}});
			Modal.close();
		});
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			{/* (M)StageBar	 */}
			<View style={[temp_style.stageBar, progressbar_style.stageBar]}>
				<StageBar
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
				<Text style={[txt.noto24, assignUserHabitation_style.info_text]}>사는 지역을 알려주세요.</Text>
			</View>
			{/* HabitationForm */}
			<View style={[assignUserHabitation_style.habitationForm]}>
				<TouchableOpacity onPress={onPressCity} style={[style.addressContainer]}>
					<Text style={[txt.noto28, style.addressText]}>{data.user_address.city ? data.user_address.city : '도, 광역시를 선택해주세요.'}</Text>
					<Arrow_Down_GRAY10 />
				</TouchableOpacity>
				<TouchableOpacity onPress={onPressDistrict} style={[style.addressContainer]}>
					<Text style={[txt.noto28, style.addressText]}>{data.user_address.district}</Text>
					<Arrow_Down_GRAY10 />
				</TouchableOpacity>
				<TouchableOpacity onPress={onPressNeighbor} style={[style.addressContainer]}>
					<Text style={[txt.noto28, style.addressText]}>{data.user_address.neighbor}</Text>
					<Arrow_Down_GRAY10 />
				</TouchableOpacity>
			</View>
			{/* 버튼 */}
			<View style={[btn_style.btn_w654, assignUserHabitation_style.btn_w654]}>
				{adressValid ? (
					<AniButton btnTitle={'확인'} titleFontStyle={32} btnStyle={'border'} btnTheme={'shadow'} btnLayout={btn_w654} onPress={goToNextStep} />
				) : (
					<AniButton btnTitle={'확인'} titleFontStyle={32} disable={true} btnLayout={btn_w654} />
				)}
			</View>
		</View>
	);
};

export default AssignUserHabitation;

const style = StyleSheet.create({
	addressContainer: {
		width: 634 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		paddingVertical: 12 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 24 * DP,
	},
	addressText: {
		width: 538 * DP,
		textAlign: 'center',
	},
});
