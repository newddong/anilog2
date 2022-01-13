import React, {Children, Component, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {AppRegistry, StyleSheet, Text, View, TextInput} from 'react-native';
import {TabContext} from '../tabContext';

export default Test = () => {
	return (
		
			<View style={{flex: 1, backgroundColor: 'yellow'}}>
				<Text>최상위</Text>
				<TabContext.Consumer>
					{({toggle}) => (
						<TouchableWithoutFeedback
							onPress={toggle}>
							<View style={{width: 300, height: 300, backgroundColor: 'blue'}}></View>
						</TouchableWithoutFeedback>
					)}
				</TabContext.Consumer>
			</View>
		
	);
};
