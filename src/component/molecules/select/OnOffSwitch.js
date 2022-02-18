import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TouchableOpacity} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20, GRAY30, GRAY40, WHITE} from 'Root/config/color';

/**
 *
 *@param {{
 *default: '0 - off , 1 - on'
 *onSwtichOn: 'Switch On Callback',
 *onSwtichOff: 'Switch Off Callback',
 * }} props
 */
export default OnOffSwitch = props => {
	const [btnStatus, setBtnStatus] = React.useState(props.default || false);

	return (
		<View>
			{btnStatus ? (
				<TouchableOpacity
					onPress={() => {
						setBtnStatus(false);
						props.onSwtichOff();
					}}>
					{/* {console.log('btnStatus=>' + btnStatus)} */}
					<View
						style={{
							width: 80 * DP,
							height: 36 * DP,
							flexDirection: 'row',
							borderRadius: 18 * DP,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: APRI10,
						}}>
						<Text style={[txt.roboto20, {color: WHITE}]}> On </Text>
						<View style={{width: 28 * DP, height: 28 * DP, borderRadius: 30, backgroundColor: WHITE}} />
					</View>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					onPress={() => {
						setBtnStatus(true);
						props.onSwtichOn();
					}}>
					{/* {console.log('btnStatus=>' + btnStatus)} */}
					<View
						style={{
							width: 84 * DP,
							height: 36 * DP,
							flexDirection: 'row',
							borderRadius: 18 * DP,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: GRAY30,
						}}>
						<View style={{width: 28 * DP, height: 28 * DP, borderRadius: 30, backgroundColor: WHITE}} />
						<Text style={[txt.roboto20, {color: WHITE}]}> Off </Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};
OnOffSwitch.defaultProps = {
	onSwtichOn: e => console.log(e),
	onSwtichOff: e => console.log(e),
};
