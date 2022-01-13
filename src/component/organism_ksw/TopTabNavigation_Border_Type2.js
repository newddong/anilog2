import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, TouchableOpacity, FlatList, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY20, GRAY30} from 'Root/config/color';

/**
 * 커스텀 탭 (색깔이 채워지지 않은 스타일)
 * @param {object} props - Props Object
 * @param {object} props.items- 탭 네비게이션에 담길 목록
 * @param {number} props.width - 탭의 전체 넓이 / Default = 654
 * @param {number} props.select - gesture Handler(손가락으로 swipe)로 탭을 움직였을 때 자식까지 state를 연동시키기 위한 props / Default = 1
 * @param {number} props.defaultIndex - 탭의 처음 선택 아이템 인덱스
 * @param {number} props.fontSize - 탭의 제목 글꼴 크기 / Default = 30
 * @param {(index:number)=>void} props.onSelect - 탭 클릭할 때 동작하는 콜백, 선택한 탭의 인덱스 반환
 */
const TopTabNavigation_Border_Type2 = props => {
	const [selected, setSelected] = React.useState(props.defaultIndex ? props.defaultIndex : 0);
	React.useEffect(() => {
		setSelected(props.select);
	}, [props.select]);

	React.useEffect(() => {
		setSelected(props.value);
	}, [props.value]);

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
					width: (750 * DP) / props.items.length,
					height: 70 * DP,
					borderBottomWidth: 2 * DP,
					borderBottomColor: index == selected ? APRI10 : GRAY30,
					marginHorizontal: 0.5 * DP, //서로 다른 Border Color가 겹치는 현상방지
					justifyContent: 'center',
					backgroundColor: 'white',
				}}>
				<Text
					style={[
						index == selected ? txt.noto30b : txt.noto30,
						{
							color: index == selected ? APRI10 : GRAY20,
							textAlign: 'center',
							lineHeight: 42 * DP,
							fontSize: props.fontSize * DP,
						},
					]}
					numberOfLines={1}>
					{item}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={{alignItems: 'center'}}>
			<FlatList data={props.items} renderItem={renderItem} horizontal={true} scrollEnabled={false} />
		</View>
	);
};

TopTabNavigation_Border_Type2.defaultProps = {
	items: [1, 2, 3], //FlatList에 담길 배열 정보
	onSelect: e => console.log(e), //Tab Press 이벤트
	select: 0,
	fontSize: 24,
};
export default TopTabNavigation_Border_Type2;
