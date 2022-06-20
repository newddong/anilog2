import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput, LogBox} from 'react-native';
import {BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import InputWithSearchIcon from 'Molecules/input/InputWithSearchIcon';
import searchContext from 'Root/config/searchContext';

export default InputAndSearchHeader = props => {
	LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
	const routeName = props.route.name != undefined ? props.route.name : '';
	const [searchInput, setSearchInput] = React.useState('');
	const inputRef = React.useRef();
	// console.log('props', props);

	const confirm = text => {
		//헤더에서 작성한 인풋입력값을 템플릿에 전달
		routeName != 'UserList' && props.navigation.setParams({...props.route.params, searchInput: searchInput});
		searchContext.searchInfo.reSearch = !searchContext.searchInfo.reSearch;
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

	React.useEffect(() => {
		if (props.isLocation) {
			props.navigation.setParams({
				reSearch: () => reSearch(),
			});
			inputRef.current.focus();
		}
	}, []);

	const reSearch = () => {
		inputRef.current.focus();
		setSearchInput('');
	};

	const onChangeSearchText = text => {
		setSearchInput(text);
		//고객센터 문의하기에서 호출된 경우 searchInputForHelp 전역변수를 활용
		if (props.isLocation) {
			searchContext.searchInfo.searchInputForLocation = text;
		} else if (props.isHelpTab) {
			searchContext.searchInfo.searchInputForHelp = text;
		} else if (props.isSocial) {
			searchContext.searchInfo.searchInputForSocial = text;
		} else {
			//검색탭에서 호출된 경우 searchInput 전역변수를 활용
			searchContext.searchInfo.searchInput = text;
		}
	};

	const onClear = () => {
		if (props.isLocation) {
			searchContext.searchInfo.searchInputForLocation = '';
		} else if (props.isHelpTab) {
			searchContext.searchInfo.searchInputForHelp = '';
		} else if (props.isSocial) {
			searchContext.searchInfo.searchInputForSocial = '';
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
		<View style={[style.headerContainer, style.shadow, {}]}>
			<TouchableOpacity style={[style.backButtonContainer, {}]} onPress={onPressGoBack}>
				<BackArrow32 onPress={onPressGoBack} />
			</TouchableOpacity>
			<View style={{marginBottom: 20 * DP, flex: 1, justifyContent: 'center', paddingTop: 20 * DP}}>
				<InputWithSearchIcon
					placeholder={props.isLocation ? '위치 찾기' : '검색어를 입력하세요.'}
					value={searchInput}
					width={630}
					ref={inputRef}
					onChange={onChangeSearchText}
					onSearch={confirm}
					onClear={onClear}
					showCrossMark={false}
				/>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	headerContainer: {
		width: 750 * DP,
		paddingHorizontal: 28 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 135 * DP,
		flexDirection: 'row',
		backgroundColor: WHITE,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 67 * DP,
		marginBottom: 22 * DP,
	},
	backButtonContainer: {
		width: 52 * DP,
		height: 52 * DP,
		justifyContent: 'center',
		// backgroundColor: 'blue',
		marginBottom: 18 * DP,
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
});
