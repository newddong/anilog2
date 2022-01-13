import React from 'react';
import {FlatList, Text, View, ScrollView} from 'react-native';
import CompanionForm from './CompanionForm';
import {companionFormList} from './style_organism';

/**
 *
 * @param {{
 * onSelectSpecies : void,
 * onSelectAge:void,
 * onSelectDuration :void,
 * onSelectStatus :void,
 * onDelete : void,
 * }} props
 */
export default CompanionFormList = props => {
	const [companionList, setCompanionList] = React.useState([]);
	// console.log('temp in FormList', props.tempData)

	// React.useEffect(() => {
	// 	console.log('props.tempdata.length', props.tempData.length)
	// 	props.tempData.length == 0 ? null : setCompanionList(props.tempData)
	// }, [props.tempData])

	React.useEffect(() => {
		setCompanionList(props.items);
	}, [props.items]);

	const renderItem = (item, index) => {
		// console.log('item in renderite', item)

		return (
			<View style={[companionFormList.companionFormContainer]}>
				<CompanionForm
					data={item}
					onSelectSpecies={(v, i) => props.onSelectSpecies(v, i, index)}
					onSelectAge={(v, i) => props.onSelectAge(v, i, index)}
					onSelectDuration={(v, i) => props.onSelectDuration(v, i, index)}
					onSelectStatus={(v, i) => props.onSelectStatus(v, i, index)}
					onDelete={() => props.onDelete(index)}
				/>
			</View>
		);
	};

	return (
		<View style={[companionFormList.container]}>
			<ScrollView horizontal={false} contentContainerStyle={{flex: 0}} scrollEnabled={false}>
				<ScrollView horizontal={true} contentContainerStyle={{flex: 1}} scrollEnabled={false}>
					<FlatList data={companionList} renderItem={({item, index}) => renderItem(item, index)} scrollEnabled={false} />
				</ScrollView>
			</ScrollView>
		</View>
	);
};

CompanionFormList.defaultProps = {
	items: [],
	onSelectSpecies: e => console.log(e),
	onSelectAge: e => console.log(e),
	onSelectDuration: e => console.log(e),
	onSelectStatus: e => console.log(e),
	onDelete: e => console.log(e),
};
