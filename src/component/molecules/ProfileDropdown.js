import React from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback, Text} from 'react-native';
import AniButton from 'Molecules/AniButton';
import ActionButton from 'Molecules/ActionButton';
import Dropdown from 'Molecules/Dropdown';
import {btn_w280, btn_w226} from 'Atom/btn/btn_style';
import {APRI10, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {txt} from 'Root/config/textstyle';

/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {object} props.menu - 드롭다운 목록
 * @param {object} props.btnLayout - 버튼의 레이아웃 스타일(Atoms의 btn_wXXX)
 * @param {number} props.titleFontStyle - 제목 글꼴 크기, 기본값 24
 * @param {(value,index:number)=>void} props.onSelect - 드롭다운을 선택했을 때 동작하는 콜백, 선택된 값과 인덱스를 반환
 * @param {()=>void} props.onOpen - 드롭다운이 열렸을 때 동작하는 콜백
 * @param {()=>void} props.onClose - 드롭다운이 닫혔을 때 동작하는 콜백
 */
const ProfileDropdown = props => {
	
	const onClose = () => {
		props.onClose();
		Modal.close();
	};

	const onOpen = () => {
		props.onOpen();
	};

	const onSelect = (v,i) => {
		props.onSelect(v,i);
		dropdown.current.button.current.press();
	};
	const dropdown = React.useRef();
	return (
		<Dropdown
			buttonComponent={<ActionButton {...props} initState={false} noStateChange onClose={onClose} onOpen={onOpen}/>}
			ref={dropdown}
			dropdownList={
				<View style={{backgroundColor: APRI10, borderRadius: 40 * DP, alignItems: 'center'}}>
					<ActionButton {...props} initState={false} noStateChange onClose={onClose} onOpen={onOpen} />
					{props.menu.map((v, i) => (
						<TouchableWithoutFeedback onPress={()=>onSelect(v,i)} key={i}>
							<View style={{width: props.btnLayout.width, marginVertical: 15 * DP,height:80*DP,justifyContent:'center'}}>
								<Text
									style={[
										txt.noto24b,
										{
											fontSize: props.titleFontStyle * DP,
											textAlign: 'center',
											color: WHITE,
										},
									]}>
									{v}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					))}
				</View>
			}
		/>
	);
};

ProfileDropdown.defaultProps = {
	btnLayout: btn_w226, // 버튼의 레이아웃(width, height, radius 등의 수치 결정)
	titleFontStyle: 24, // 버튼 title의 폰트 크기
	onOpen: e => console.log('onOpen', e),
	onClose: e => console.log('onClose', e),
	onSelect: (v, i) => console.log(i + ':' + v),
	menu: [],
};

export default ProfileDropdown;
