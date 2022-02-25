import React from 'react';
import {Text, View, Image, ScrollView, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {BackArrow32, Meatball50_APRI10_Horizontal, Meatball50_GRAY20_Horizontal} from 'Atom/icon';
import DP from 'Root/config/dp';
import {txt} from 'Root/config/textstyle';
import Modal from 'Root/component/modal/Modal';
import userGlobalObject from 'Root/config/userGlobalObject';

/**
 * 유저가 기르는 반려동물의 프로필 사진, 닉네임, 유저의 닉네임을 출력하는 라벨
 * @param {object} props - Props Object
 * @param {object} props.menu - 미트볼 클릭시 출력되는 메뉴 목록
 * @param {(value:object, index:number)=>void} props.onSelect - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
export default MeatBallHeader = props => {
	// console.log('props.options', props.options.data);
	const [isClicked, setIsClicked] = React.useState(false);
	const userInfo = userGlobalObject.userInfo;

	const onSelect = select => {
		console.log('select', select);
		if (select == '정보') {
			Modal.close();
			setTimeout(() => {
				Modal.popInformationModal(
					props.options.data,
					() => onClose(),
					() => {
						props.navigation.push('UserInfoSetting');
						//프로필 수정하는 페이지 이동
					},
				);
			}, 100);
		} else if (select == '공유하기') {
			console.log('dddd');
			Modal.close();
			setTimeout(() => {
				Modal.popSocialModal(
					() => alert('카카오'),
					() => alert('링크복사'),
					() => alert('메시지'),
				);
			}, 100);
		}
	};

	const onPressMeatball = () => {
		setIsClicked(true);

		if (props.options.data && props.options.data.user_type == 'user' && props.options.data._id == userInfo._id) {
			//일반 유저 프로필이며 자신의 계정일 경우
			Modal.popSelectBoxModal(
				['계정 주소 공유하기'],
				select => onSelect(select),
				() => onClose(),
				false,
				false,
			);
		} else if (props.options.data && props.options.data.user_type == 'pet') {
			//반려동물 프로필
			const pet_family = props.options.data.pet_family;
			let family_id_list = [];
			pet_family.map((v, i) => {
				family_id_list.push(v._id);
			});
			const isPetOwner = family_id_list.includes(userInfo._id); // 보고 있는 반려동물 프로필이 로그인한 계정의 반려동물인지 여부
			isPetOwner
				? Modal.popSelectBoxModal(
						['정보', '계정 주소 공유하기', '신고'],
						select => onSelect(select),
						() => onClose(),
						false,
						false,
				  )
				: Modal.popSelectBoxModal(
						['정보', '공유하기', '신고'],
						select => onSelect(select),
						() => onClose(),
						false,
						false,
				  );
		} else if (props.options.data && props.options.data.user_type == 'user' && props.options.data._id != userInfo._id) {
			//일반 유저 프로필이며 자신의 계정이 아닐 경우
			Modal.popSelectBoxModal(
				['공유하기', '신고'],
				select => onSelect(select),
				() => onClose(),
				false,
				false,
			);
		} else if (props.options.data && props.options.data.user_type == 'shelter' && props.options.data._id != userInfo._id) {
			//보호소 프로필이며 자신의 계정이 아닐경우
			Modal.popSelectBoxModal(
				['정보', '공유하기', '신고'],
				select => onSelect(select),
				() => onClose(),
				false,
				false,
			);
		} else if (props.options.data && props.options.data.user_type == 'shelter' && props.options.data._id == userInfo._id) {
			//보호소 프로필이며 자신의 계정이 아닐경우
			Modal.popSelectBoxModal(
				['정보', '공유하기'],
				select => onSelect(select),
				() => onClose(),
				false,
				false,
			);
		}
	};

	const onClose = () => {
		Modal.close();
		setIsClicked(false);
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={props.navigation.goBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={props.navigation.goBack} />
				</View>
			</TouchableOpacity>
			<Text style={txt.roboto40b}>{props.options.title ? props.options.title : props.route.params.title}</Text>
			{/* <MeatBallDropdown menu={PROTECT_STATUS} onSelect={onPressMeatball} /> */}
			{isClicked ? <Meatball50_APRI10_Horizontal onPress={onPressMeatball} /> : <Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />}
		</View>
	);
};

MeatBallHeader.defaultProps = {
	menu: [],
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 95 * DP,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		paddingHorizontal: 48 * DP,
	},
	backButtonContainer: {
		width: 80 * DP,
		height: 80 * DP,
		justifyContent: 'center',
		padding: 10 * DP,
	},
	shadow: {
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 4,
		// },
		// elevation: 4,
	},
});
