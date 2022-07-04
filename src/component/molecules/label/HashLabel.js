import React from 'react';
import {Text, View} from 'react-native';
import {APRI10, GRAY10, GRAY20} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Hash50} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';

/**
 * 해시태그 관련 라벨 (키워드 및 태그된 게시물 수 출력 )
 * @param {object} props - Props Object
 * @param {string} props.keyword - 해시태그 키워드
 * @param {boolean} props.keywordBold - 해시태그 키워드의 글자 굵기 Default=true
 * @param {number} props.count - 해시태그가 사용된 게시물의 갯수
 */
const HashLabel = props => {
	// console.log('props. bold', props.keywordBold);
	const count = () => {
		let count = '';
		if (props.count > 10000) {
			count = (props.count / 10000).toFixed(1) + '만';
		} else {
			count = props.count + '';
		}
		return (
			<Text style={props.keywordBold ? [txt.noto24b, {lineHeight: 42 * DP, color: GRAY20}] : [txt.noto24, {lineHeight: 42 * DP}]}>
				{count + '개의 게시물'}
			</Text>
		);
	};

	return (
		<View style={{flexDirection: 'row', alignItems: 'center'}}>
			<View
				style={[
					styles.img_round_90,
					{
						// borderColor: APRI10,
						borderWidth: 4 * DP,
						alignItems: 'center',
						justifyContent: 'center',
					},
				]}>
				<Hash50 />
			</View>
			<View style={{marginLeft: 30 * DP}}>
				{/* 해쉬마크가 담긴 원과 KEYWORD간 30의 차이 */}
				{props.count < 1 ? (
					//부모가 보내는 count값이 없을 경우 키워드만 출력
					<Text style={txt.noto30b}>#{props.keyword}</Text>
				) : (
					//count값이 있을 경우 'count한 게시물' 출력
					<View>
						<Text style={[props.keywordBold ? txt.noto30b : txt.noto30, {lineHeight: 42 * DP}]}>#{props.keyword}</Text>
						{/* 부모 props의 keywordBold값이 True라면 noto24b를 스타일로 준다 */}
						{count()}
						{/* <Text style={props.keywordBold ? [txt.noto24b, {lineHeight: 42 * DP, color: GRAY20}] : [txt.noto24, {lineHeight: 42 * DP}]}>
							{count()}개의 게시물
						</Text> */}
					</View>
				)}
			</View>
		</View>
	);
};
HashLabel.defaultProps = {
	keyword: '#KEYWORD',
	keywordBold: false,
	count: 0,
};

export default HashLabel;
