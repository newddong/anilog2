import React from 'react';
import {Text, View} from 'react-native';
import {Cross46, Rect48_Border} from 'Atom/icon';
import HashLabel from 'Molecules/label/HashLabel';
import {controllableHashTag} from 'Organism/style_organism';

/**
 * 해시태그
 * @param {object} props.data - 해시태그 데이터

 */
export default ControllableHashTag = props => {
	const [checked, setChecked] = React.useState(true);

	return (
		<View style={controllableHashTag.container}>
			{checked ? (
				<View style={[controllableHashTag.check50]}>
					<Rect48_Border />
				</View>
			) : (
				false
			)}
			<View style={[checked ? controllableHashTag.hashLabel_uncheked : controllableHashTag.hashLabel]}>
				<HashLabel keyword={props.keyword} keywordBold={props.keywordBold} count={props.count} />
			</View>
			{checked ? (
				false
			) : (
				<View style={[controllableHashTag.cross46]}>
					<Cross46 />
				</View>
			)}
		</View>
	);
};
