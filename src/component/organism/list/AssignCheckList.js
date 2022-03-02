import React from 'react';
import {FlatList} from 'react-native';
import {View} from 'react-native';
import AssignCheckListItem from 'Organism/listitem/AssignCheckListItem';
import {assignCheckList} from 'Organism/style_organism copy';
/**
 *
 *@param {{
 *items: 'array / 동의 목록의 list 정보',
 *onCheck : void,
 *onPressDetail : void
 * }} props
 */
export default AssignCheckList = props => {
	// console.log('AssignCheckLis', props.items);
	const [isCheckAll, setCheckAll] = React.useState(false);
	React.useEffect(() => {
		setCheckAll(props.isCheckAll);
	}, [props.isCheckAll]);

	const renderItem = (item, index) => {
		// console.log('item', item);
		return (
			<View style={[assignCheckList.assignCheckListItem]} key={index}>
				<AssignCheckListItem
					data={item}
					onCheck={isCheck => props.onCheck(item, index, isCheck)}
					state={item.state || props.isCheckAll}
					onPressDetail={() => props.onPressDetail(index)}
				/>
			</View>
		);
	};
	return props.items.map((item, index) => renderItem(item, index));
	// return <FlatList data={props.items} renderItem={({item, index}) => renderItem(item, index)}></FlatList>;
};

AssignCheckList.defaultProps = {
	state: false,
	items: ['Default', 'Default'],
	onCheck: e => console.log(e),
	onPressDetail: e => console.log(e + '번째 항목 더보기 클릭'),
};
