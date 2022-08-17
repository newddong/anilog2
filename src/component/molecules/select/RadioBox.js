import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import DP from 'Root/config/dp';
import {RadioChecked48, RadioUnchecked48} from 'Atom/icon';

/**
 * 단일 라디오 박스
 * @param {object} props - Props Object
 * @param {object} props.items - 라디오박스 목록 Array
 * @param {boolean} props.horizontal - RadioBox 수평정렬 지정 Default=true
 * @param {number} props.selectableNumber - 선택가능한 Radio Box 숫자 Default = 1
 * @param {number} props.defaultSelect - 디폴트 선택 인덱스
 * @param {(index:number)=>void} props.onSelect - 라디오버튼 선택할 때 동작하는 콜뱍, 선택한 박스의 인덱스 반환
 */
const RadioBox = props => {
	const tabLength = props.items.length;
	let tabState = [];
	Array(tabLength)
		.fill(props.items)
		.map((v, i) => {
			tabState[i] = {tabName: v[i], state: false};
		});
	// tabState[0].state = true;

	const [selected, setSelected] = React.useState(tabState);
	const [defaultSelect, setDefaultSelect] = React.useState(props.defaultSelect || '');
	const [checkedItems, setCheckedItems] = React.useState([]);

	React.useEffect(() => {
		let copy = [...selected];
		if (!defaultSelect) {
			copy[0].state = true;
		} else {
			defaultSelect ? (copy[defaultSelect].state = true) : null;
		}
		setSelected(copy);
	}, [defaultSelect]);

	//선택된 Tab의 State를 True로 이외의 Tab은 False로
	const onSelect = index => {
		const copyState = [...selected];
		if (checkedItems.length < props.selectableNumber) {
			// 유저가 선택한 Box가 선택가능한 수 미만일 경우
			checkedItems.push(index);
		} else {
			// 유저가 선택한 Box가 선택가능한 수를 초과했을 경우
			if (checkedItems.includes(index)) {
				// 이미 체크되어 있는 박스를 선택했을 경우
				// noting
			} else {
				// 새로운 박스를 선택했을 경우 가장 먼저 선택했던 박스를 해제하고 새로운 박스 추가
				checkedItems.splice(0, 1);
				checkedItems.push(index);
			}
		}
		//CheckedItems 배열에 copyState의 길이만큼 인덱스를 검색
		for (let i = 0; i < copyState.length; i++) {
			checkedItems.includes(i) ? (copyState[i].state = true) : (copyState[i].state = false);
		}
		setSelected(copyState);
		// props.onSelect(tabState[index].tabName);
		props.onSelect(index);
	};

	const renderItem = (item, index) => {
		return (
			<TouchableOpacity
				key={index}
				onPress={() => onSelect(index)}
				style={{width: (550 / props.items.length) * DP, flexDirection: 'row', justifyContent: 'center'}}>
				<View style={{marginLeft: props.horizontal ? 25 * DP : 0}}>
					<View style={{}}>{selected[index].state ? <RadioChecked48 /> : <RadioUnchecked48 />}</View>
				</View>
				<Text style={[txt.noto28, {marginLeft: 12 * DP, textAlign: 'center'}]}>{item}</Text>
			</TouchableOpacity>
		);
	};
	return (
		<View style={{justifyContent: 'space-between', flexDirection: 'row', width: props.width}}>
			{props.items.map((v, i) => {
				return renderItem(v, i);
			})}
		</View>
	);
};
RadioBox.defaultProps = {
	items: [1, 2, 3],
	selectableNumber: 1,
	horizontal: true,
	onSelect: e => console.log(e),
	// defaultSelect: 1,
	width: 550 * DP,
};

export default RadioBox;
