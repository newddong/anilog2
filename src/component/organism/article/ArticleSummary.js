import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20, GRAY40, WHITE} from 'Root/config/color';
import {Photo44} from 'Root/component/atom/icon';
import {getTimeLapsed} from 'Root/util/dateutil';
import moment from 'moment';
import Loading from 'Root/component/molecules/modal/Loading';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressArticle - 내용 클릭
 */
const ArticleSummary = props => {
	const data = props.data;
	const [text, setText] = React.useState('');
	const getArticleType = () => {
		switch (data.community_free_type) {
			case 'talk':
				return '잡담';
			case 'question':
				return '질문';
			case 'meeting':
				return '모임';
			default:
				break;
		}
	};

	const onPressArticle = () => {
		props.onPressArticle();
	};

	const getUpdateTime = () => {
		// const timelapse = getTimeLapsed(data.community_update_date);
		// console.log('timeLapse', timelapse);
		let dateType = moment(data.community_update_date);
		// time = data.community_update_date.format('yyyy.MM.DD');
		const current = new Date();
		current.setHours(current.getHours() + 9);
		const article_date = new Date(data.community_update_date);
		article_date.setHours(article_date.getHours() + 6);
		article_date.setMinutes(article_date.getMinutes() + 45);
		const diff = (current.getTime() - article_date.getTime()) / 1000;
		// console.log('diff', diff);
		if (diff < 43200) {
			const time = moment(article_date).format('HH:mm');
			return time;
		} else {
			const time = dateType.format('YY.MM.DD');
			// console.log('g', g);
			return time;
		}
	};

	

	const onTextLayout = React.useCallback(e => {
		setText(e.nativeEvent.lines);
	}, []);

	const getText = () => {
		//타이틀이 한 줄로 처리가 되는 경우
		if (text.length == 1) {
			return (
				<Text style={[txt.noto28, {textAlignVertical: 'center'}]}>
					{text[0].text}
					{data.community_is_attached_file ? <Photo44 /> : <></>}
				</Text>
			);
		} else {
			//타이틀이 두 줄 이상일 경우
			return (
				<>
					<Text style={[txt.noto28, {textAlignVertical: 'center'}]}>{text[0].text}</Text>
					<View style={{flexDirection: 'row'}}>
						<Text style={[txt.noto28, {textAlignVertical: 'center', marginRight: 10 * DP, maxWidth: 400 * DP}]} numberOfLines={1}>
							{text[1].text}
						</Text>
						{data.community_is_attached_file ? <Photo44 /> : <></>}
					</View>
				</>
			);
		}
	};

	return (
		<View style={[style.container]}>
			<View style={[style.inside]}>
				<Text style={[txt.noto28, {color: GRAY10}]}>{getArticleType()}</Text>
				<TouchableOpacity onPress={onPressArticle} activeOpacity={0.6} style={[style.content]}>
					{text == '' ? <></> : getText()}
				</TouchableOpacity>
				<TouchableOpacity onPress={onPressArticle} activeOpacity={0} style={[style.content, {position: 'absolute', opacity: 0}]}>
					<Text style={[txt.noto28, {textAlignVertical: 'center', color: WHITE}]} onTextLayout={onTextLayout}>
						{data.community_title}
						{'  '}
						<Text style={[txt.roboto28, {color: APRI10}]}>{data.community_comment_count != 0 ? data.community_comment_count : ''}</Text>
					</Text>
				</TouchableOpacity>
				<View style={[{alignItems: 'flex-end', justifyContent: 'flex-start'}]}>
					<Text style={[txt.noto24, {color: GRAY10}]}>{getUpdateTime()}</Text>
				</View>
			</View>
		</View>
	);
};

ArticleSummary.defaultProps = {
	onPressArticle: () => {},
};

export default ArticleSummary;

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		paddingVertical: 20 * DP,
		borderTopColor: GRAY40,
		borderTopWidth: 2 * DP,
		// height:82*DP,
		// backgroundColor: 'yellow',
		alignSelf: 'center',
	},
	inside: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'pink',
	},
	content: {
		marginLeft: 20 * DP,
		width: 470 * DP,
		maxHeight: 90 * DP,
		// backgroundColor: 'yellow',
	},
});
