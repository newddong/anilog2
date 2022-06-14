import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity, FlatList, TouchableWithoutFeedback} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY20} from 'Root/config/color';
import {RadioChecked48, RadioUnchecked48, RadioChecked38, RadioUnchecked38} from 'Atom/icon';

/**
 * 버튼 컴포넌트트
 * @param {object} props - Props Object
 * @param {object} props.items - 라디오박스 목록 Array
 * @param {number} props.selectableNumber - 선택가능한 Radio Box 숫자 Default = 1
 * @param {number} props.defaultSelect - 디폴트 선택 인덱스
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.style - 스타일
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.textStyle - 텍스트 스타일
 * @param {(index:number)=>void} props.onSelect - 라디오버튼 선택할 때 동작하는 콜뱍, 선택한 박스의 인덱스 반환
 */
const RadioBoxItem = props => {
    const defaultStyle = {flexDirection:'row',alignItems:'center',justifyContent:'center'};
    const style = Array.isArray(props.style)?[...props.style,defaultStyle]:{...props.style,...defaultStyle};
	return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={style}>
                <View style={{marginRight:12*DP}}>
                   {props.selected ? <RadioChecked38 /> : <RadioUnchecked38 />}
                </View>
                <Text style={Array.isArray(props.textStyle)?[...props.textStyle]:{...props.textStyle}}>{props.children}</Text>
            </View>
        </TouchableWithoutFeedback>
	);
};
RadioBoxItem.defaultProps = {
	items: [1, 2, 3],
	selectableNumber: 1,
	horizontal: true,
	onSelect: e => console.log(e),
	// defaultSelect: 1,
	width:550*DP,
};

export default RadioBoxItem;
