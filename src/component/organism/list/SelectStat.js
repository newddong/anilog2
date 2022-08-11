import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {BLACK, GRAY30} from 'Root/config/color';
import DP from 'Root/config/dp';
/**
 * 즐겨찾기 선택하기
 * @param {void} props.onCancelSelectMode - 선택모드 취소
 * @param {void} props.onDeleteSelectedItem - 선택된 항목 삭제
 * @param {void} props.onSelectAllClick - 전체 선택
 * @param {void} props.onSelectMode- 선택하기 함수
 * @param {boolean} props.selectMode- true - 선택하기 모드 , false 선택하기 아닌 모드
 * @param {boolean} props.showBottomLine- true일시 밑줄 보여줌
 */
export default SelectStat = props => {
	console.log('SelectStat', props);
	const [selectMode, setSelectMode] = React.useState(props.selectMode || false);
	let selectCNT = React.useRef(0);

	React.useEffect(() => {
		setSelectMode(props.selectMode);
	}, [props.selectMode]);

	//선택하기 버튼 클릭
	const select = () => {
		setSelectMode(true);
		selectCNT.current = 0;
		//useState의 비동기 실행으로 상위로 값을 넘길떄 selectMode 값이 아닌 임의값으로 지정해서 전송
		props.onSelectMode(true);
	};

	//취소 버튼 클릭
	const selectCancel = () => {
		setSelectMode(false);
		//useState의 비동기 실행으로 상위로 값을 넘길떄 selectMode 값이 아닌 임의값으로 지정해서 전송
		props.onSelectMode(false);
	};

	//전체 선택
	const selectAll = () => {
		selectCNT.current += 1;
		props.onSelectAllClick();
	};

	//선택 삭제
	const deleteSelectedItem = () => {
		props.onDeleteSelectedItem();
	};

	return (
		<View style={[style.container, {borderBottomWidth: props.showBottomLine ? 2 * DP : 0}]}>
			{/* 취소, 전체선택, 선택삭제 */}
			<View style={[style.selectstat]}>
				{selectMode ? (
					<TouchableOpacity style={[style.textBtn]} onPress={selectCancel}>
						<Text style={[txt.noto26, {alignSelf: 'flex-start'}]}>완료</Text>
						<Text>{props.headerText}</Text>
					</TouchableOpacity>
				) : null}
				{selectMode ? (
					<View style={[style.rightContainer]}>
						<TouchableOpacity onPress={selectAll} style={[style.textBtn]}>
							<Text style={[txt.noto26]}>{selectCNT.current % 2 == 1 ? '전체 취소' : '전체 선택'}</Text>
						</TouchableOpacity>
						<View style={[style.vertical_stick]} />
						<TouchableOpacity onPress={deleteSelectedItem} style={[style.textBtn]}>
							<Text style={[txt.noto26]}>선택 삭제 </Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={[style.rightContainer]}>
						<TouchableOpacity onPress={select}>
							<Text style={[txt.noto26]}>선택하기 </Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
};

SelectStat.propTypes = {
	onSelectMode: PropTypes.func.isRequired,
	onCancelSelectMode: PropTypes.func.isRequired,
};
SelectStat.defaultProps = {
	onSelectMode: e => console.log(e), //선택하기 버튼 클릭
	onCancelSelectMode: e => console.log(e), // 취소버튼 클릭
	onSelectAllClick: e => console.log(e), // 전체 선택 클릭
	onDeleteSelectedItem: e => console.log(e), // 선택 삭제 클릭
	selectMode: false,
	showBottomLine: true,
};
// media_uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',

const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 72 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		borderBottomColor: GRAY30,
		borderBottomWidth: 2 * DP,
		paddingHorizontal: 28 * DP,
		flexDirection: 'row',
	},
	selectstat_view: {
		width: 750 * DP,
		height: 100 * DP,
		alignItems: 'center',
	},
	rightContainer: {
		flexDirection: 'row',
		position: 'absolute',
		right: 0,
	},
	selectstat: {
		flexDirection: 'row',
		width: 694 * DP,
		height: 42 * DP,
	},
	textBtn: {
		// width: 120 * DP,
		height: 42 * DP,
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	vertical_stick: {
		width: 2 * DP,
		height: 34 * DP,
		marginHorizontal: 20 * DP,
		alignSelf: 'center',
		backgroundColor: BLACK,
	},
});
