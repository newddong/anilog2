import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import {BackArrow32} from 'Atom/icon';
import DP from 'Root/config/dp';
import {WHITE, APRI10} from 'Root/config/color';
import InputWithSearchIcon from 'Molecules/input/InputWithSearchIcon';

export default InputAndSearchHeader = props => {
	// console.log('ConfirmInputHeader.', props.route.params.routeName);
	const routeName = props.route.name != undefined ? props.route.name : '';
	const [searchInput, setSearchInput] = React.useState('');


	const confirm = () => {
		// navigation.navigate('Search');
		routeName!='UserList'&&props.navigation.setParams({searchInput: searchInput});
	};

	const onChangeSearchText = text => {
		// console.log('text', text);
		props.navigation.setParams({...props.route.params, searchInput:text});
		setSearchInput(text);
	};

	//뒤로 가기 클릭 시 탭이 initialRoute인 Feed로 가던 현상 수정
	const onPressGoBack = () => {
		if(!props.route.params||!props.route.params.prevNav){
			props.navigation.goBack();
		}
		else if (props.route.params.prevNav == 'MainHomeFeedList' || props.route.params.prevNav == 'ProtectionTab') {
			props.navigation.navigate(props.route.params.prevNav);
		} else {
			props.navigation.goBack();
		}
	};

	return (
		<View style={[style.headerContainer, style.shadow]}>
			<>
				<TouchableOpacity onPress={onPressGoBack}>
					<View style={style.backButtonContainer}>
						<BackArrow32 onPress={onPressGoBack} />
					</View>
				</TouchableOpacity>
				{routeName != 'SearchFeed' ? (
					<View style={{marginBottom: 20 * DP, flex: 1}}>
						<InputWithSearchIcon placeholder={'검색어를 입력하세요.'} width={590} onChange={onChangeSearchText} onSearch={confirm} />
					</View>
				) : (
					<></>
				)}
			</>
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
