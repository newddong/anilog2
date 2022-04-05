import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY40, WHITE} from 'Root/config/color';
import {Photo44} from 'Root/component/atom/icon';
import {getTimeLapsed} from 'Root/util/dateutil';
import moment from 'moment';
import Loading from 'Root/component/molecules/modal/Loading';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressArticle - 내용 클릭
 * @param {string} props.isSearch - 검색어
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
		getTimeLapsed;
		const dbDate = new Date(data.community_date);
		// dbDate.setHours(dbDate.getHours());
		const current = new Date();
		const diff = (current.getTime() - dbDate.getTime()) / 1000;
		if (diff < 50400) {
			const time = moment(dbDate).format('HH:mm');
			return time;
		} else {
			const time = moment(dbDate).format('YY.MM.DD');
			// console.log('g', g);
			return time;
		}
	};

	const onTextLayout = React.useCallback(e => {
		setText(e.nativeEvent.lines);
	}, []);

	const getText = () => {
		//타이틀이 한 줄로 처리가 되는 경우
		let first = '';
		let second = '';
		first = text[0].text.split(new RegExp(`(${props.isSearch})`, 'gi'));

		if (text.length == 1) {
			return (
				<Text style={[txt.noto28, style.summaryText]}>
					{props.isSearch == '' || props.isSearch.length < 2
						? text[0].text
						: first.map((part, i) =>
								part.toLowerCase() === props.isSearch.toLowerCase() ? (
									// <View style={{backgroundColor: 'red'}}>{part}</View>
									<Text key={i} style={{color: APRI10, fontWeight: 'bold', marginRight: 10 * DP}}>
										{part + ''}
									</Text>
								) : (
									<Text key={i} style={{color: BLACK, marginRight: 10 * DP}}>
										{part + ''}
									</Text>
								),
						  )}
					{data.community_is_attached_file ? <Photo44 /> : <></>}{' '}
					<Text style={[txt.roboto28, {color: APRI10}]}>{data.community_comment_count != 0 ? data.community_comment_count : ''}</Text>
				</Text>
			);
		} else {
			//타이틀이 두 줄 이상일 경우
			second = text[1].text.split(new RegExp(`(${props.isSearch})`, 'gi'));
			return (
				<>
					<Text style={[txt.noto28, style.summaryText]}>
						{props.isSearch == '' || props.isSearch.length < 2
							? text[0].text
							: first.map((part, i) =>
									part.toLowerCase() === props.isSearch.toLowerCase() ? (
										// <View style={{backgroundColor: 'red'}}>{part}</View>
										<Text key={i} style={{color: APRI10, fontWeight: 'bold', marginRight: 10 * DP}}>
											{part + ''}
										</Text>
									) : (
										<Text key={i} style={{color: BLACK, marginRight: 10 * DP}}>
											{part + ''}
										</Text>
									),
							  )}
					</Text>
					<View style={[{flexDirection: 'row', width: 470 * DP, alignItems: 'center'}]}>
						<Text style={[txt.noto28, {textAlignVertical: 'center', marginRight: 10 * DP, maxWidth: 400 * DP}]} numberOfLines={1}>
							{props.isSearch == '' || props.isSearch.length < 2
								? text[1].text
								: second.map((part, i) =>
										part.toLowerCase() === props.isSearch.toLowerCase() ? (
											// <View style={{backgroundColor: 'red'}}>{part}</View>
											<Text key={i} style={{color: APRI10, fontWeight: 'bold', marginRight: 10 * DP}}>
												{part + ''}
											</Text>
										) : (
											<Text key={i} style={{color: BLACK, marginRight: 10 * DP}}>
												{part + ''}
											</Text>
										),
								  )}
							{/* {text[1].text}{' '} */}
						</Text>
						{data.community_is_attached_file ? <Photo44 /> : <></>}
						<Text style={[txt.roboto28, {color: APRI10, textAlignVertical: 'center'}]}>
							{' '}
							{data.community_comment_count != 0 ? data.community_comment_count : ''}
						</Text>
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
						{/* <Text style={[txt.roboto28, {opacity: 0}]}>{data.community_comment_count != 0 ? data.community_comment_count : ''}</Text> */}
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
	isSearch: '',
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
	summaryText: {
		textAlignVertical: 'center',
		width: 470 * DP,
	},
});
