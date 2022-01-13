import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions, Platform, ScrollView} from 'react-native';
import AniButton from 'Molecules/button/AniButton';
import {btn_w226} from 'Atom/btn/btn_style';
import {WHITE, GRAY10} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {getUserInfoById} from 'Root/api/userapi';
import userGlobalObj from 'Root/config/userGlobalObject';
import PetAccountList from 'Component/organism_ksw/PetAccountList';
import {txt} from 'Root/screens/assign/style_assign';

/**
 * 아바타 동물을 선택하는 모달창
 *
 * @param {Object} props - props object
 * @param {string} props.okButtonnMsg - 확인 버튼 메시지
 * @param {()=>void} props.onOk - 확인 버튼 콜백
 * @param {(petObject:string)=>void} props.onSelectPet - 반려동물 라벨을 클릭했을때 콜백
 *
 */
const FeedAvartarSelect = props => {
	const [items, setItems] = React.useState([]);
	const checkApi = React.useRef(false);

	const pressOk = () => {
		props.onOk();
		Modal.close();
	};

	React.useEffect(() => {
		getUserInfoById(
			{userobject_id: userGlobalObj.userInfo._id},
			user => {
				setItems(user.msg?.user_my_pets);
			},
			err => {
				Modal.popOneBtn(err, '확인', () => Modal.close());
			},
		);
		checkApi.current = true;
	}, []);

	const selectPet = petobject => {
		props.onSelectPet && props.onSelectPet(petobject);
	};

	return (
		<View style={style.background}>
			<View style={[style.popUpWindow, style.shadow]}>
				{console.log('items.length:', items.length)}
				{checkApi.current ? (
					items.length > 0 ? (
						<PetAccountList items={items} onLabelClick={selectPet} />
					) : (
						<Text style={[{textAlign: 'center', marginBottom: 30 * DP}, txt.noto28b]}>{'등록된 반려동물이 없습니다.\n 반려동물을 등록해주세요'}</Text>
					)
				) : null}
				<View style={style.buttonContainer}>
					<AniButton btnLayout={btn_w226} btnStyle={'filled'} btnTitle={props.okButtonnMsg} onPress={pressOk} />
				</View>
				{(checkApi.current = false)}
			</View>
		</View>
	);
};

FeedAvartarSelect.defaultProps = {
	okButtonnMsg: '확인',
	onOk: () => {
		console.log('YES');
	},
	onSelectPet: e => {},
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	popUpWindow: {
		width: 614 * DP,
		backgroundColor: WHITE,
		paddingTop: 60 * DP,
		paddingBottom: 52 * DP,
		paddingHorizontal: 64 * DP,
		borderRadius: 40 * DP,
	},
	msg: {
		marginBottom: 30 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
});

export default FeedAvartarSelect;
