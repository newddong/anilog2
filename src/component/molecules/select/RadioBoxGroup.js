import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity,TouchableWithoutFeedback, FlatList} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY20} from 'Root/config/color';
import {RadioChecked48, RadioUnchecked48} from 'Atom/icon';

/**
 * 버튼 컴포넌트트
 * @param {import('react-native').ViewProps} props - Props Object
 * @param {boolean} props.horizontal - RadioBox 수평정렬 지정 Default=true
 * @param {number} props.selectableNumber - 선택가능한 Radio Box 숫자 Default = 1
 * @param {number} props.defaultSelect - 디폴트 선택 인덱스
 * @param {(index:number)=>void} props.onSelect - 라디오버튼 선택할 때 동작하는 콜뱍, 선택한 박스의 인덱스 반환
 * @param {import('native-base').StyledProps|Array<import('native-base').StyledProps>} props.style - 스타일
 */
const RadioBoxGroup = props => {
	const [selectedIndex, setIndex] = React.useState(0);

	const onSelect = (item,index) => {
		setIndex(index);
		props.onSelect(item,index);
	}
    const style = Array.isArray(props.style)?[...props.style]:{...props.style};

	return (
		<View style={style}>
			{React.Children.map(props.children,(childComponent,index)=>{
				const onPress = ()=>{
					onSelect(childComponent.props.children,index);
				}
				return (React.cloneElement(childComponent,{selected:selectedIndex==index,onPress:onPress}));
			})}
		</View>
	);
};


RadioBoxGroup.defaultProps = {
	selectableNumber: 1,
	horizontal: true,
	onSelect: e => console.log(e),
	// defaultSelect: 1,
	width:550*DP,
};

export default RadioBoxGroup;
