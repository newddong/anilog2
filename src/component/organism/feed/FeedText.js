import React from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { txt } from 'Root/config/textstyle';
import { feedText } from './style_organism';
import DP from 'Root/config/dp';


export default FeedText = props => {
	const origin_text = props.text; //FeedContent에서 보내주는 Feed 글 내용

	const char = []; //Char 단위로 나눈 Feed글을 담을 배열선언
	char.length = origin_text.length; //Feed글의 글자수

	//글자수 담는 반복문
	for (let i = 0; i < char.length; i++) {
		char[i] = origin_text.charAt(i);
	}
	const num_of_char = 30
	const HEIGHT = Dimensions.get('screen').height;
	const Width = Dimensions.get('screen').width;

	const textLength = parseInt(props.text.length / num_of_char); //줄을 나누기 위한 길이 설정 => 현재 30글자마다 한줄

	const sliced = []; // 각 30글자가 담겨질 배열 선언

	sliced.length = textLength; // 30글자 박스들의 길이 - 총 62자의 피드글이라면 length = 2
	// 각 sliced에 30글자 씩 담는 반복문
	for (let i = 0; i <= textLength; i++) {
		sliced[i] = char.slice(i * num_of_char, (i + 1) * num_of_char);
	}

	// FlatList로 각 줄의 View 출력
	const renderItem = (char, index) => {
		let item = ''; // 잘게 잘라진 글자들을 다시 붙일 변수 item
		// 잘게 잘라진 글자들을 다시 붙여주는 반복문
		for (let i = 0; i < char.length; i++) {
			item = item + char[i];
		}
		// 다시 붙여진 글을 ' ' 띄어쓰기 기준으로 split
		const splitedArr = item.split(' ');
		let idx = 0;
		const valueInfos = splitedArr.map(str => {
			// ex) '피드 테스트 #피드' 라는 3개의 split로 가정해보자
			const idxArr = [idx, idx + str.length - 1];
			idx += str.length + 1;
			return {
				str, // split된 각 배열들의 string , ex)  ['피드', '테스트','#피드']
				isHT: str.startsWith('#'), //split된 각 배열들의 value가 #로 시작하는 경우의 boolean , ex) [false, false, true]
				idxArr, // index
			};
		});
		return (
			<View style={{ flexDirection: 'row' }}>
				{valueInfos.map((v, idx) => {
					//valueInfos에는 위에서 split한 값들의 str, isHt, idxArr 값이 들어있다.
					const isLast = idx === valueInfos.length - 1; //마지막 split의 마지막 글자여부 Boolean
					return (
						<Text
							ellipsizeMode='tail'
							key={idx}
							// split된 값들의 isHT(hashTag로 시작하는가?)가 True일 경우 글자색은 blue이며
							style={[txt.noto28, v.isHT ? { color: 'blue', height: 40 * DP, textDecorationLine: 'underline' } : { height: 40 * DP }]}
							// 클릭이벤트가 부여된다. 해쉬로 시작하는 텍스트 Split가 아닐 경우 이벤트는 null
							onPress={() => (v.isHT ? props.onHashClick(v.str) : null)}>
							{v.str}
							{/* 각 split의 마지막 글자인 경우 띄어쓰기를 부여,   */}
							{!isLast && <Text style={{ backgroundColor: 'transparent' }}> </Text>}
						</Text>
					);
				})}
			</View>
		);
	};

	return (
		<View style={feedText.container}>
			<FlatList data={sliced} renderItem={({ item, index }) => renderItem(item, index)} />
		</View>
	);
};

FeedText.defaultProps = {
	text: '피드 텍스트 #피드 ',
	onHashClick: e => console.log(e),
};
