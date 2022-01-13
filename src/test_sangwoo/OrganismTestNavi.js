import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import FeedContent from 'Root/component/organism/FeedContent';
import Feed from 'Root/component/organism/Feed';
import ProfileInfo from 'Root/component/organism/ProfileInfo';
import ParentComment from 'Root/component/organism/ParentComment';
import ChildCommentList from 'Root/component/organism/ChildCommentList';

// const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export default OrganismTestNavi = () => {
	return (
		<Drawer.Navigator initialRouteName="ParentComment">
			<Drawer.Screen name="FeedContent" component={FeedContent} />
			<Drawer.Screen name="Feed" component={Feed} />
			<Drawer.Screen name="ProfileInfo" component={ProfileInfo} />
			<Drawer.Screen name="ParentComment" component={ParentComment} />
			<Drawer.Screen name="ChildCommentList" component={ChildCommentList} />
		</Drawer.Navigator>
	);
};
