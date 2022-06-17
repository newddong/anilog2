import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {BLUE20} from 'Root/config/color';
import {useNavigation} from '@react-navigation/native';
import {getUserListByNickname} from 'Root/api/userapi';
import {Arrow_Down_GRAY20} from 'Atom/icon';
import DP from 'Root/config/dp';
import {GRAY10, WHITE} from 'Root/config/color';
import {extractTags, getFeedText, getByteSubtring} from 'Root/util/stringutil';

/**
 * 해시테그, 유저 링크가 들어간 텍스트
 *
 * @param {object} props - Props Object
 * @param {string} props.value - 텍스트 값
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경 콜백
 */
export default function HashText(props) {
	const taginfo = React.useRef(extractTags(props.children));
	React.useEffect(() => {
		taginfo.current = extractTags(props.children);
	}, [props.children]);

	const text = getFeedText(props.children, props.byteOfLine);

	// console.log(text, taginfo);
	const [hide, setHide] = React.useState(text.length > 2);
	const onShow = () => {
		setHide(false);
		props.onMoreView&&props.onMoreView(false);
	}
	const onHide = () =>{
		setHide(true);
		props.onMoreView&&props.onMoreView(true);
	}

	const makeView = (input, taginfo,hide, onShow) => {
		// hide =false
		const moreView = () => (
			<TouchableOpacity
				onPress={onShow}>
				<View style={{flexDirection: 'row', paddingTop: 4 * DP, height: 30 * DP, alignItems: 'center'}}>
					<Text style={[txt.noto24, {lineHeight: 30 * DP}]}>더보기</Text>
					<Arrow_Down_GRAY20 />
				</View>
			</TouchableOpacity>
		);
		const hideView = () => (
			<TouchableOpacity
				onPress={onHide}>
				<View style={{width:694*DP,paddingHorizontal:28*DP,flexDirection: 'row', paddingTop: 20 * DP, height:50 * DP,justifyContent:'flex-end',alignItems: 'center'}}>
					<Text style={[txt.noto24, {lineHeight: 30 * DP}]}>접기</Text>
					<View style={{transform:[{rotate:'180deg'}]}}><Arrow_Down_GRAY20 /></View>
				</View>
			</TouchableOpacity>
		);
		return input.map((v, i) => {
			if (hide) {
				if (i > 1) return false;
				if (i == 1) {
					if (v.includes('#') || v.includes('@'))
						return (
							<View style={{flexDirection:'row',width:694*DP,justifyContent:'space-between'}} key={'hide'}>
								<Text>
									{makeTagView(getByteSubtring(v, 35), taginfo)}...
									
								</Text>
								{moreView()}
							</View>
						);
					return (
						<View style={{flexDirection:'row',width:694*DP,justifyContent:'space-between'}} key={v}>
							<Text>
								{getByteSubtring(v, 35)}...
								
							</Text>
							{moreView()}
						</View>
					);
				}
			}
			if (v.includes('#') || v.includes('@')) {
				return (
					<React.Fragment key={i}>
						<Text>{makeTagView(v, taginfo)}</Text>
						{<Text>{'\n'}</Text>}
						{input.length>2&&i==input.length-1&&hideView()}
					</React.Fragment>
				);
			} else {
				return (
					<React.Fragment key={i}>
						<Text>{v}</Text>
						{<Text>{'\n'}</Text>}
						{input.length>2&&i==input.length-1&&hideView()}
					</React.Fragment>
				);
			}
		});
	};
	
	const navigation = useNavigation();

	const makeTagView = (str, taginfo) => {
		let regex = /(.*?)([#@].*?)( |$)/g;
		let regex2 = / ([^#@]*?)$/g;
	
		
	
		const pressfn = tag => {
			if (tag.charAt(0) == '#') {
				navigation.push('FeedListForHashTag', {hashtag_keyword: tag.substring(1)});
			}
			if (tag.charAt(0) == '@') {
				if (taginfo[tag]) {
					navigation.push('UserProfile', {userobject: {_id: taginfo[tag]}});
				} else {
					getUserListByNickname(
						{
							user_nickname: tag.substring(1),
							request_number: 1,
							user_type: '',
						},
						result => {
							navigation.push('UserProfile', {userobject: {_id: result.msg[0]._id}});
						},
						error => {
							Modal.alert('존재하지 않는 유저입니다.');
						},
					);
				}
			}
		};
	
		let match;
		let txt = [];
		let idx = 0;
		while ((match = regex.exec(str)) !== null) {
			let tag = match[2];
			let string = match[1];
			let space = match[3];
			txt.push(
				<React.Fragment key={tag + idx++}>
					<Text>{string}</Text>
					<Text
						style={{color: BLUE20}}
						onPress={() => {
							pressfn(tag);
						}}>
						{tag}
					</Text>
					<Text>{space}</Text>
				</React.Fragment>,
			);
		}
		txt.push(
			<React.Fragment key={str + idx}>
				<Text>{str.match(regex2)}</Text>
			</React.Fragment>,
		);
		return txt;
	};

	if (!props.children || props.children == 0) {
		return <></>;
	} else {
		return (
			<Text {...props}>
				{makeView(text, taginfo.current, hide, onShow)}
			</Text>
		);
	}
	
}

HashText.defaultProps = {
};
