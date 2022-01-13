import React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import InputBalloon from 'Root/component/molecules/InputBalloon';
import InputLongText from 'Root/component/molecules/InputLongText';
import Input30 from 'Root/component/molecules/Input30';
import Input24 from 'Root/component/molecules/Input24';
import InputWithSearchIcon from 'Root/component/molecules/InputWithSearchIcon';
import {useNavigation} from '@react-navigation/core';
import {GRAY10} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {GRAY_BRIGHT} from 'Root/screens/color';
import Formtxtinput from 'Root/screens/common/formtxtinput';
export default InputTest1 = props => {
	const navigation = useNavigation();
	return (
		<ScrollView>
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={() => navigation.navigate('InputTest1')}>
					<View style={{width: 130, height: 50, backgroundColor: 'yellow'}}>
						<Text style={{fontSize: 18}}>InputTest1</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('InputTest2')}>
					<View style={{width: 130, height: 50, backgroundColor: 'powderblue'}}>
						<Text style={{fontSize: 18}}>InputTest2</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('InputTest3')}>
					<View style={{width: 130, height: 50, backgroundColor: GRAY10}}>
						<Text style={{fontSize: 18}}>InputTest3</Text>
					</View>
				</TouchableOpacity>
			</View>
			<FormTxtInput
				onChange={() => console.log('d')}
				inputStyle={[txt.noto28]}
				placeholder={'닉네임을 입력하세요'}
				placeholderTextColor={GRAY_BRIGHT}
			/>
			{/* Input24 - info Version */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> Input24 - star Version </Text>
			<Input24
				title={'Title'}
				placeholder={'placeholder'}
				descriptionType={'star'} // Important
				value={'value'}
				alert_msg={'alert_msg'}
				confirm_msg={'confirm_msg'}
				onChange={e => console.log(e)}
				// onClear={}
			/>
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> Input24 - info Version </Text>
			<Input24
				title={'Title'}
				placeholder={'placeholder'}
				descriptionType={'info'} // Important
				info={'information'}
				value={'value'}
				alert_msg={'alert_msg'}
				confirm_msg={'confirm_msg'}
				onChange={e => console.log(e)}
				// onClear={}
			/>
			{/* InputWithSearchIcon */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> InputWithSearchIcon </Text>
			<InputWithSearchIcon
				title={'Title'}
				placeholder={'placeholder'}
				info={'information'}
				value={'InputWithSearchICon'}
				alert_msg={'alert_msg'}
				confirm_msg={'confirm_msg'}
				onChange={e => console.log(e)}
				onClear={ e => console.log(e)}
				onSearch={ e => console.log(e)}
			/>
			{/* Input30 */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> Input30 - showTitle [ true false] </Text>
			<View style={{flexDirection: 'row'}}>
				<Input30
					title={'title'}
					showTitle={true}
					placeholder={'placeholder'}
					description={'description'}
					value={'value'}
					alert_msg={'alert_msg'}
					confirm_msg={'confirm_msg'}
					onChange={e => console.log(e)}
					onClear={e => console.log(e)}
				/>
				<View style={{}}>
				<Input30
					title={'title'}
					showTitle={false}
					placeholder={'placeholder'}
					description={'description'}
					value={'value'}
					alert_msg={'alert_msg'}
					confirm_msg={'confirm_msg'}
					onChange={e => console.log(e)}
					onClear={e => console.log(e)}
				/>
				<Input30
					title={'title'}
					showTitle={false}
					placeholder={'placeholder'}
					description={'description'}
					value={'value'}
					alert_msg={'alert_msg'}
					confirm_msg={'confirm_msg'}
					onChange={e => console.log(e)}
					onClear={e => console.log(e)}
				/>
				</View>
			</View>

			
			{/* Input24 - star Version */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> Input24 - star Version</Text>
			<Input24
				title={'Long Title'}
				placeholder={'placeholder'}
				value={'value'}
				descriptionType={'star'}
				alert_msg={'alert_msg'}
				confirm_msg={'confirm_msg'}
				required={true}
				onChange={e => console.log(e)}
				onClear={e => console.log(e)}
			/>
			{/* Input30 */}
			<Text style={{backgroundColor: 'blue', color: 'white', marginVertical: 10}}> Input30 / msg출력 확인을 위해선 10자이상 써주세요</Text>
			<Input30
				title={'title'}
				placeholder={'placeholder'}
				description={'description'}
				value={'value'}
				alert_msg={'alert_msg'}
				confirm_msg={'confirm_msg'}
				onChange={e => console.log(e)}
				onClear={e => console.log(e)}
				// onClear={}
			/>
			{/* InputBallon */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> inputBalloon </Text>
			<InputBalloon placeholder={'PlaceHolder'} value={'title'} onChange={e => console.log(e)} />
			{/* InputLongText */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> InputLongText</Text>
			<InputLongText placeholder={'PlaceHolder'} value={'title'} onChange={e => console.log(e)} maxLength={500} />
			
		</ScrollView>
	);
};
