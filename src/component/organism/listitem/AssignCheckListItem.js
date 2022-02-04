import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {APRI10, BLACK, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import CheckBox from 'Molecules/select/CheckBox';
import {assignCheckListItem} from 'Organism/style_organism';

/**
 *
 *@param {{
 *data: 'Object / text, detail 필요',
 *onCheck : void,
 *isCheck : 'boolean / 체크박스 초기 상태'
 *onPressDetail : void
 * }} props
 */
export default AssignCheckListItem = props => {
	// console.log('Assign Item', props.state);

	const [chekced, setChecked] = React.useState(props.isCheck);
	const onCheck = isCheck => {
		setChecked(isCheck);
		props.onCheck(isCheck);
	};

	const onPressDetail = () => {
		props.onPressDetail();
	};

	// React.useEffect(() => {
	// 	setChecked(props.state);
	// }, [props.state]);

	React.useEffect(() => {
		setChecked(props.isCheck);
	}, [props.isCheck]);

	return (
		<View style={[assignCheckListItem.container]}>
			<View style={[assignCheckListItem.check50]}>
				<CheckBox onCheck={onCheck} state={props.state} />
			</View>
			<View style={[assignCheckListItem.textContainer]}>
				<Text style={[txt.noto24, {color: chekced ? APRI10 : BLACK}]}>{props.data.text}</Text>
			</View>
			{props.data.detail ? (
				<TouchableOpacity onPress={onPressDetail} style={[assignCheckListItem.detailText]}>
					<Text style={[txt.roboto24b, {color: GRAY20, textDecorationLine: 'underline'}]}>보기</Text>
				</TouchableOpacity>
			) : (
				false
			)}
		</View>
	);
};

AssignCheckListItem.defaultProps = {
	isCheck: false,
	data: {
		text: 'Defatult',
		detail: false,
	},
	onPressDetail: e => console.log(e),
	onCheck: e => console.log(e),
};
