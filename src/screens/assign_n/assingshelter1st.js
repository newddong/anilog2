import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, Modal} from 'react-native';

import {Bracket, DownBracketBlack} from 'Asset/image';
import DP from 'Screens/dp';
import {SvgWrap} from 'Screens/svgwrapper';
import {BLACK, GRAY, GRAY_PLACEHOLDER, GRAY_BRIGHT, MAINCOLOR, GRAY_BRIGHTEST, RED} from '../color';
import FormTxtInput from 'Screens/common/formtxtinput';
import {lo, txt, form, btn} from './style_assign';
import {
	BTN_CHECK,
	INQUIRY,
	REQ_CODE,
	REQ_CODE_DESCRIPTION,
	ASK_SHELTER_ASSIGN,
	COMPLETE_ASSIGN,
	SHELTER_NAME,
	SHELTER_ADDRESS,
	REQ_SHELTER_NAME,
	REQ_SHELTER_ADDRESS,
	REQ_DETAIL_ADDRESS,
	SHELTER_PHONE_NUM,
	SHELTER_EMAIL,
	SHELTER_HOMEPAGE,
	SHELTER_DATE_FOUNDATION,
	REQ_SHELTER_URI,
	REQ_SHELTER_PHONE,
} from 'Screens/msg';
import Dropdown from 'Screens/common/dropdown';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StageBar} from './assignshelter';

export default FirtStage = props => {
	const navigation = useNavigation();
   const [btnActive, setBtnActive] = React.useState(true);
   const [data, setData] = React.useState({
      shelter_name:'',
   	shelter_addr:'',
   	shelter_addr_detail:'',
   });

   const goNext =()=>{

      props.navigation.push('SecondStage',{title: '보호소 등록',data:data});
   }

   const shelterName = (e) => {
      console.log(e.nativeEvent.text);
      setData({...data,shelter_name:e.nativeEvent.text});
   }

   const shelterAddr = (e) => {
      console.log(e.nativeEvent.text);
      setData({...data,shelter_addr:e.nativeEvent.text});
   }

   const shelterAddrDetail = (e) => {
      console.log(e.nativeEvent.text);
      setData({...data,shelter_addr_detail:e.nativeEvent.text});
   }

   React.useEffect(()=>{
      console.log(props.route.params.addr);
      setData({...data, shelter_addr:props.route.params.addr?.roadAddrPart1, shelter_addr_detail:props.route.params.addr?.detailAddr})
   },[props.route.params])

	return (
		<View style={lo.wrp_main}>
			<View style={lo.contents}>
				<StageBar style={{marginTop: 30 * DP, marginBottom: 78 * DP}} width={600 * DP} current={1} maxstage={3} />
				<View style={[lo.shelter_form, {marginBottom: 70 * DP}]}>
					<View style={{marginBottom: 80 * DP}}>
						<Text style={[txt.noto30, {color: GRAY}]}>
							{SHELTER_NAME}
							<Text style={{color: RED}}>*</Text>
						</Text>

						<FormTxtInput
							style={{marginBottom: 20 * DP}}
							inputStyle={[form.input_shelter_code, txt.noto28]}
							placeholder={REQ_SHELTER_NAME}
							placeholderTextColor={GRAY_PLACEHOLDER}
                     onChange={shelterName}
                     value={data.shelter_name}
						/>
					</View>
					<Text style={[txt.noto30, {color: GRAY}]}>
						{SHELTER_ADDRESS}
						<Text style={{color: RED}}>*</Text>
					</Text>
					<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10 * DP}}>
						<FormTxtInput
							style={{width: 472 * DP, marginRight: 30 * DP}}
							inputStyle={[form.input_shelter_code, txt.noto28]}
							placeholder={REQ_SHELTER_ADDRESS}
							placeholderTextColor={GRAY_PLACEHOLDER}
                     onChange={shelterAddr}
                     value={data.shelter_addr}
						/>

						<TouchableWithoutFeedback
							onPress={() => {
								navigation.navigate('AddressSearch', {title: '주소검색', from: 'FirtStage', addr:data.shelter_addr});
								// alert('주소검색');
							}}>
							<View style={[btn.search_address, btn.shadow]}>
								<Text style={[txt.noto28, txt.gray]}>주소검색</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					<FormTxtInput
						style={{marginBottom: 20 * DP}}
						inputStyle={[form.input_shelter_code, txt.noto28]}
						placeholder={REQ_DETAIL_ADDRESS}
						placeholderTextColor={GRAY_PLACEHOLDER}
                  onChange={shelterAddrDetail}
                  value={data.shelter_addr_detail}
					/>
				</View>
            {!btnActive ? (
					<View style={[btn.confirm_button, {backgroundColor: GRAY_BRIGHT}, btn.shadow]}>
						<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
					</View>
				) : (
					<TouchableWithoutFeedback onPress={goNext}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto32b, txt.white]}>{BTN_CHECK}</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
			</View>
		</View>
	);
};
