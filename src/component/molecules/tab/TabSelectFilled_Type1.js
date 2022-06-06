import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLACK, GRAY10, GRAY40, GRAY50, WHITE} from 'Root/config/color';

/**
 * 커스텀 탭 (메인색깔로 채워진 스타일)
 * @param {object} props - Props Object
 * @param {object} props.items- 탭 네비게이션에 담길 목록
 * @param {number} props.width - 탭의 전체 넓이 / Default = 654
 * @param {number} props.defaultIndex - 탭의 처음 선택 아이템 인덱스
 * @param {(index:number)=>void} props.onSelect - 탭 클릭할 때 동작하는 콜백, 선택한 탭의 인덱스 반환
 */
const TabSelectFilled_Type1 = props => {
	const [selected, setSelected] = React.useState(props.defaultIndex ? props.defaultIndex : 0);

	//선택된 Tab의 State를 True로 이외의 Tab은 False로
	const onSelect = index => {
		setSelected(index);
		props.onSelect(index);
	};

	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity
				onPress={() => onSelect(index)}
				style={{
					width: props.width * DP,
					height: 82 * DP,
					backgroundColor: selected == index ? BLACK : GRAY50,
					justifyContent: 'center',
					marginRight: 20 * DP,
					borderRadius: 30 * DP,
				}}>
				<Text
					style={[
						txt.noto28,
						{
							color: selected == index ? WHITE : GRAY10,
							textAlign: 'center',
						},
					]}>
					{item}
				</Text>
			</TouchableOpacity>
		);
	};

	return <FlatList data={props.items} renderItem={renderItem} horizontal={true} scrollEnabled={false} showsHorizontalScrollIndicator={false} />;
};
TabSelectFilled_Type1.defaultProps = {
	items: [1, 2, 3, 4], //FlatList에 담길 배열 정보
	onSelect: e => console.log(e), //Tab Press 이벤트
	width: 654,
};
export default TabSelectFilled_Type1;
