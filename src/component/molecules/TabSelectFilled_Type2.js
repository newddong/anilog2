import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLACK, WHITE} from 'Root/config/color';

/**
 * 커스텀 탭 (메인색깔로 채워진 스타일)
 * @param {object} props - Props Object
 * @param {object} props.items- 탭 네비게이션에 담길 목록
 * @param {number} props.defaultIndex - 탭의 처음 선택 아이템 인덱스
 * @param {(item:object,index:number)=>void} props.onSelect - 탭 클릭할 때 동작하는 콜백, 선택한 탭의 인덱스 반환
 */
const TabSelectFilled_Type2 = props => {
	const [selected, setSelected] = React.useState(props.defaultIndex ? props.defaultIndex : 0);
	const onSelect = (item, index) => {
		setSelected(index); //새로만들어진 배열로 state 변경
		props.onSelect(item, index);
	};

	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity
				onPress={() => onSelect(item, index)}
				style={{
					backgroundColor: index == selected ? APRI10 : WHITE,
					width: (750 * DP) / props.items.length + 1,
					height: 78 * DP,
					justifyContent: 'center',
				}}>
				<Text
					style={[
						index == selected ? txt.noto30b : txt.noto30,
						{
							color: index == selected ? WHITE : BLACK,
							textAlign: 'center',
							lineHeight: 42 * DP,
						},
					]}>
					{item}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList data={props.items} renderItem={renderItem} horizontal={true} scrollEnabled={false} inndica showsHorizontalScrollIndicator={false} />
	);
};

TabSelectFilled_Type2.defaultProps = {
	items: [1, 2, 3], //FlatList에 담길 배열 정보
	onSelect: e => console.log(e), //Tab Press 이벤트
};
export default TabSelectFilled_Type2;
