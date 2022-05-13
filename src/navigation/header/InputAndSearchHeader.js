import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import InputWithSearchIcon from 'Molecules/input/InputWithSearchIcon';
import searchContext from 'Root/config/searchContext';

export default InputAndSearchHeader = props => {
	const routeName = props.route.name != undefined ? props.route.name : '';
	const [searchInput, setSearchInput] = React.useState('');
	// console.log('props', props.route.params.searchInput);

	const confirm = () => {
		//헤더에서 작성한 인풋입력값을 템플릿에 전달
		routeName != 'UserList' && props.navigation.setParams({...props.route.params, searchInput: searchInput});
	};

	React.useEffect(() => {
		//500의 타임아웃은 타이핑의 시간에 텀을 주기 위함. 타임아웃이 없을 경우 각 초성 입력마다 검색을 실시함.
		const timeOutId = setTimeout(() => {
			//헤더에서 작성한 인풋입력값을 템플릿에 전달
			props.navigation.setParams({...props.route.params, searchInput: searchInput});
			if (searchInput != '') {
				props.navigation.setParams({...props.route.params, searchInput: searchInput});
			}
		}, 500);
		return () => clearTimeout(timeOutId);
	}, [searchInput]);

	const onChangeSearchText = text => {
		// props.navigation.setParams({...props.route.params, searchInput: text});
		setSearchInput(text);
		if (props.isHelpTab) {
			searchContext.searchInfo.searchInputForHelp = text;
		} else {
			searchContext.searchInfo.searchInput = text;
		}
	};
	const onClear = () => {
		if (props.isHelpTab) {
			searchContext.searchInfo.searchInputForHelp = '';
		} else {
			searchContext.searchInfo.searchInput = '';
		}
		searchContext.searchInfo.searchInput = '';
		setSearchInput('');
	};

	//뒤로 가기 클릭 시 탭이 initialRoute인 Feed로 가던 현상 수정
	const onPressGoBack = () => {
		if (!props.route.params.prevNav) {
			console.log('none preveNav');
			props.navigation.goBack();
		} else {
			props.navigation.navigate(props.route.params.prevNav);
		}
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<TouchableOpacity onPress={onPressGoBack}>
				<View style={style.backButtonContainer}>
					<BackArrow32 onPress={onPressGoBack} />
				</View>
			</TouchableOpacity>
			<View style={{marginBottom: 20 * DP, flex: 1}}>
				<InputWithSearchIcon placeholder={'검색어를 입력하세요.'} width={590} onChange={onChangeSearchText} onSearch={confirm} onClear={onClear} />
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 135 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
		paddingHorizontal: 48 * DP,
		paddingTop: 30 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 67 * DP,
		marginBottom: 22 * DP,
	},
	shadow: {
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 4,
		// },
		// elevation: 4,
	},
	backButtonContainer: {
		width: 80 * DP,
		height: 66 * DP,
		justifyContent: 'center',
		// backgroundColor:'red',
		marginBottom: 18 * DP,
	},
});
