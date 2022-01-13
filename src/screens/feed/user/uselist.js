import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import DP from 'Screens/dp.js';
import UserListItem from './uselistitem.js';
import {TabContext} from 'tabContext';
import {useIsFocused} from '@react-navigation/native';
import {getUserList} from 'Root/api/userapi';

export var searchTxtChange = () => {};

export default UserList = ({navigation,route}) => {
	const context = React.useContext(TabContext);
	const [searchTxt, setSearchTxt] = React.useState('');
	const [userList, setUserList] = React.useState([]);
	const isFocused = useIsFocused();

	React.useEffect(() => {
		context.tabVisible(false);
	}, []);

	React.useEffect(() => {
		getUserList(
			{
				nickname: searchTxt,
			},
			userlist => {
				// console.log(userlist);
				setUserList(userlist);
			},
		);
	}, [searchTxt]);

	searchTxtChange = e => {
		setSearchTxt(e.nativeEvent.text);
	};

	const selectUser = user => {
		// console.log(route.params);
		navigation.navigate({name:route.params.navfrom,params:{selectedUser:user}, merge:true});
	};

	const renderItem = ({item, index}) => {
		return <UserListItem style={{marginVertical: 12 * DP}} data={item} onSelect={selectUser} />;
	};

	return (
		<View style={layout.wrap_list}>
			<FlatList
				style={layout.contentsScroll}
				data={userList}
				renderItem={renderItem}
				// keyExtractor={item => item._id}
				// ref={scroll}
				// extraData={data.liked}
				// initialScrollIndex={data.index}
				// initialNumToRender={10}
				// windowSize={5}
				// onEndReached={scrollReachBottom}
				// onEndReachedThreshold={0.6}
				// onScroll={onScroll}
				// onScrollBeginDrag={onScrollBeginDrag}
				// onScrollEndDrag={onScrollEndDrag}
				// onMomentumScrollEnd={onMomentumScrollEnd}
				// onMomentumScrollBegin={onMomentumScrollBegin}
				// getItemLayout={getItemLayout}
			/>
		</View>
	);
};

const BOXCOLOR = false;

const layout = StyleSheet.create({
	wrap_list: {
		flex: 1,
		backgroundColor: BOXCOLOR ? 'yellow' : '#FFF',
	},
	contentsScroll: {
		flex: 1,
		paddingHorizontal: 48 * DP,
		backgroundColor: BOXCOLOR && 'gold',
	},
});
