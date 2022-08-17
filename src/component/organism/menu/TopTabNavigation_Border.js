import React from 'react';
import {View} from 'react-native';
import {APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import TabSelectBorder_Type3 from 'Molecules/tab/TabSelectBorder_Type3';

/**
 * 상단 탭 네비게이션 테두리 
 * @param {Array} props.itmes -Tab에 출력될 Label 배열
 * @param {void} props.onSelect  -현재 클릭된 상태인 tab (pressedTab에는 클릭된 index가 담겨져있음)
 * @param {number} props.currentScreen  - 현재 보고있는 탭의 숫자 0이 시작 
 * @param {string} props.searchText  - 검색 텍스트
 * 

 */
export default TopTabNavigation_Border = props => {
	return (
		<View style={{borderTopColor: APRI10, backgroundColor: 'white'}}>
			<TabSelectBorder_Type3
				items={props.items}
				onSelect={pressedNum => props.onSelect(pressedNum)}
				select={props.select}
				fontSize={props.fontSize}
				value={props.value}
			/>
		</View>
	);
};

TopTabNavigation_Border.defaultProps = {
	items: [1, 2, 3],
	onSelect: e => console.log(e),
};
