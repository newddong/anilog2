import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20, GRAY40} from 'Root/config/color';
import {Photo44} from 'Root/component/atom/icon';
import {getTimeLapsed} from 'Root/util/dateutil';
import moment from 'moment';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressArticle - 내용 클릭
 */
const ArticleSummary = props => {
	const data = props.data;
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

	return (
		<View style={[style.container]}>
			<View style={[style.inside]}>
				<Text style={[txt.noto28, {color: GRAY10}]}>{getArticleType()}</Text>
				<TouchableOpacity onPress={onPressArticle} activeOpacity={0.6} style={[style.content]}>
					<Text style={[txt.noto28, {textAlignVertical: 'center'}]}>
						{data.community_title}
						{'  '}
						<Photo44 />
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
	},
});
