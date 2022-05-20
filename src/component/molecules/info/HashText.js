import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {txt} from 'Root/config/textstyle';
import {BLUE20} from 'Root/config/color';
import {useNavigation} from '@react-navigation/native';
import {getUserListByNickname} from 'Root/api/userapi';

/**
 * 해시테그, 유저 링크가 들어간 텍스트
 *
 * @param {object} props - Props Object
 * @param {string} props.value - 텍스트 값
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경 콜백
 */
export default function HashText(props) {
	if (!props.children || props.children == 0) {
		return <></>;
	} else return <Text {...props}>{makeFeedInputView(props.children, props.allowTab)}</Text>;
}

HashText.defaultProps = {
	allowTab: true,
};

const makeFeedInputView = (input, allowTab) => {
	if (!input || input.length == 0) {
		input = '피드 내용이 없습니다.';
	}
	if (!input.includes('&@&@') && !input.includes('&#&#')) return input;
	let Regex = /(((.*?\n)*?.*?)(&@&@(.*?)%&%(.*?)&@&@|&#&#(.*?)%&%(.*?)&#&#))([^&@#]*?$)?/g;
	const navigation = useNavigation();
	const onHashClick = (hashID, keyword) => {
		console.log(hashID, keyword.substring(1));
		if (keyword && keyword.length > 0) {
			allowTab && navigation.push('FeedListForHashTag', {hashtag_keyword: keyword.substring(1)});
		}
	};

	const onUserClick = (userID, nickname) => {
		if (userID && userID.length > 0) {
			allowTab && navigation.push('UserProfile', {userobject: {_id: userID}});
		} else {
			getUserListByNickname(
				{
					user_nickname: nickname.substring(1),
					request_number: 1,
					user_type: '',
				},
				result => {
					allowTab && navigation.push('UserProfile', {userobject: {_id: result.msg[0]._id}});
				},
				error => {
					Modal.alert('존재하지 않는 유저입니다.');
				},
			);
		}
	};

	let match;
	let viewArr = [];
	while ((match = Regex.exec(input)) !== null) {
		let pressfn = match[5] ? onUserClick : onHashClick;
		let id = match[6] || match[8];
		let tag = match[5] || match[7];
		viewArr.push(
			<React.Fragment key={viewArr.length}>
				{match[2]}
				<Text
					style={{color: BLUE20}}
					onPress={() => {
						pressfn(id, tag);
					}}>
					{tag}
				</Text>
				{match[9]}
			</React.Fragment>,
		);
	}

	return viewArr;
};
