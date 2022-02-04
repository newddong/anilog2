import React from 'react';
import {View, Text} from 'react-native';

/**
 * 진행상황을 보여주는 막대형식의 그래프
 * @param {object} props - Props Object
 * @param {object} props.style - 전체 container style, text와 bar를 감싸는 view의 style
 * @param {object} props.backgroundBarStyle -  배경이 되는 bar의 style, width props으로 너비결정됨
 * @param {object} props.insideBarStyle - 내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
 * @param {object} props.textStyle - bar 오른쪽 Text의 스타일
 * @param {number} props.width - bar의 너비
 * @param {number} props.current - 현재단계를 정의
 * @param {number} props.maxstage - 전체단계를 정의
 * @param {(title:string)=>void} props.onPress - 버튼을 눌렸을때 동작하는 콜백, 제목 반환환
 */
const StageBar = props => {
	return (
		<View style={{...props.style, flexDirection: 'row', alignItems: 'center'}}>
			<View style={[props.backgroundBarStyle, {width: props.width, justifyContent: 'center'}]}>
				<View style={[props.insideBarStyle, {width: (props.width / props.maxstage) * props.current}]} />
			</View>
			<Text style={props.textStyle}>
				{props.current}/{props.maxstage}
			</Text>
		</View>
	);
};

//props
StageBar.defaultProps = {
	style: {}, //전체 container style, text와 bar를 감싸는 view의 style
	backgroundBarStyle: {}, //배경이 되는 bar의 style, width props으로 너비결정됨
	insideBarStyle: {}, //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
	current: 1, //현재 단계를 정의
	maxstage: 1, //전체 단계를 정의
	width: 0, //bar의 너비
	textStyle: {}, //text의 스타일
};
export default StageBar;
