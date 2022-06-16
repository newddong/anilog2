import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
import ProfileImageSmall from 'Root/component/molecules/image/ProfileImageSmall';
import {getTimeLapsed} from 'Root/util/dateutil';
import userGlobalObject from 'Root/config/userGlobalObject';
import {Comment30, Comment30_Border, Like30, Like30_Border, Like30_Filled, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
import FastImage from 'react-native-fast-image';
/**
 * 추천 게시글
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터 오브젝트
 * @param {(data:object)=>void)} props.onPressRecommendReview - 추천 게시글 클릭
 */
const RecommendReview = props => {
	const onPressRecommendReview = data => {
		props.onPressRecommendReview(data);
	};

	const getCategory = (v, i) => {
		let category_sum_list = [];
		v.community_interests.interests_trip.map(v => category_sum_list.push(v));
		v.community_interests.interests_etc.map(v => category_sum_list.push(v));
		v.community_interests.interests_hospital.map(v => category_sum_list.push(v));
		v.community_interests.interests_review.map(v => category_sum_list.push(v));
		v.community_interests.interests_interior.map(v => category_sum_list.push(v));
		if (category_sum_list.length > 3) {
			category_sum_list.push('접기');
		}
		// category_sum_list.push('테스트');
		const page = Math.floor(category_sum_list.length / 4) + 1;
		let arr = [];
		arr.length = page;
		arr.fill([], 0, page);
		let newArr = [];
		let totalWidth = 0;
		let index = 0;
		category_sum_list.map((val, ind) => {
			totalWidth = totalWidth + 20 + val.length * 10;
			if (totalWidth < 560 * DP) {
				// console.log('totalWidth', totalWidth);
				newArr.push({group: index, item: val});
			} else {
				newArr.push({group: index + 1, item: val});
				totalWidth = 0;
				++index;
			}
		});
		let categoryArr = [];
		categoryArr.length = index + 1;
		categoryArr.fill([]);
		categoryArr.map((val, ind) => {
			categoryArr[ind] = newArr.filter(e => e.group === ind);
		});
		if (categoryArr.length > 0) {
			return (
				<View style={{flexDirection: 'row', width: 584 * DP, marginBottom: category_sum_list.length > 0 ? 10 * DP : 0}}>
					{categoryArr[0].map((v, i) => {
						let isLast = false;
						if (i == categoryArr[0].length - 1) {
							isLast = true;
							v.item = '+' + (category_sum_list.length - categoryArr[0].length);
						}
						if (v.item == '+' + 0) {
							return <View key={i}></View>;
						}
						return (
							<View
								key={i}
								style={[style.category, {backgroundColor: WHITE, borderColor: isLast ? GRAY10 : GRAY30, width: isLast ? 100 * DP : null}]}>
								<Text style={[txt.noto24, {color: GRAY10, paddingHorizontal: 10 * DP, textAlign: 'center'}]}>{v.item}</Text>
							</View>
						);
					})}
				</View>
			);
		}
	};

	//추천게시글이 사진을 가지고 있다면 출력
	const getImageList = v => {
		let imageList = [];
		let getImgTag = v.community_content.match(/<img[\w\W]+?\/?>/g); //img 태그 추출
		//이미지가 있는 추천글이라면 이미지 리스트 배열 변수 채우기
		if (getImgTag) {
			getImgTag.map((v, i) => {
				let src = v.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i); //img 태그가 있는 경우 src 추출
				imageList.push(src[1]);
			});
		}
		//사진 리스트 출력
		const getImage = () => {
			return imageList.map((v, i) => {
				if (imageList && imageList.length > 4 && i > 4) {
					return null;
				} else if (imageList && imageList.length > 4 && i == 4) {
					return (
						<Text key={i} style={[txt.roboto30b, {alignSelf: 'center', paddingHorizontal: 20 * DP}]}>
							+ {imageList.length - 4}
						</Text>
					);
				} else
					return <FastImage key={i} source={{uri: v}} style={[{width: 108 * DP, height: 108 * DP, borderRadius: 30 * DP, marginRight: 10 * DP}]} />;
			});
		};

		if (imageList && imageList.length == 0) {
			// 사진없다면 미출력
			return <></>;
		} else return <View style={[{flexDirection: 'row', marginTop: 20 * DP}]}>{getImage()}</View>;
	};

	const renderItem = ({item, index}) => {
		//사진포함 여부, 카테고리 포함여부, 글 내용 포함 여부에 따른 높이
		let category_sum_list = [];
		item.community_interests.interests_trip.map(v => category_sum_list.push(v));
		item.community_interests.interests_etc.map(v => category_sum_list.push(v));
		item.community_interests.interests_hospital.map(v => category_sum_list.push(v));
		item.community_interests.interests_review.map(v => category_sum_list.push(v));
		item.community_interests.interests_interior.map(v => category_sum_list.push(v));
		const getLines = () => {
			let lines = 6;
			if (item.community_is_attached_file) {
				lines = lines - 2;
			}
			if (category_sum_list.length > 0) {
				lines = lines - 2;
			}
			if (item.community_content_without_html == '') {
				lines = 0;
			}
			return lines;
		};
		return (
			<>
				<TouchableOpacity onPress={() => onPressRecommendReview(item)} activeOpacity={0.7} style={[style.itemCont, style.shadow]}>
					{/* 카테고리  */}
					{getCategory(item)}
					{/* 리뷰 제목 */}
					<Text style={[txt.noto32, {width: 584 * DP}]} numberOfLines={1}>
						{item.community_title}
					</Text>
					{/* 리뷰 글내용 */}
					{item.community_content_without_html ? (
						<Text
							style={[
								txt.noto24,
								{
									color: GRAY10,
									width: 584 * DP,
									minHeight: 74 * DP,
									marginTop: category_sum_list.length > 0 && item.community_is_attached_file ? 0 : 20 * DP,
								},
							]}
							numberOfLines={getLines()}>
							{item.community_content_without_html.trim()}
						</Text>
					) : (
						<></>
					)}
					{/* 사진 리스트 */}
					{getImageList(item)}
					{/* 하단 아이콘  */}
					<View style={[style.iconCont]}>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							{item.community_is_like ? <Like30_Filled /> : <Like30_Border />}
							<Text style={[txt.roboto24, {color: GRAY10, marginLeft: 6 * DP, marginRight: 16 * DP}]}>{item.community_like_count} </Text>
							<Comment30_Border />
							<Text style={[txt.roboto24, {color: GRAY10, marginLeft: 6 * DP}]}>{item.community_comment_count} </Text>
							<Text style={[txt.noto24, {color: GRAY10, marginLeft: 6 * DP, marginBottom: 4 * DP}]}>·{getTimeLapsed(item.community_date)}</Text>
						</View>
					</View>
				</TouchableOpacity>
				{index == props.data.length - 1 ? <View style={{width: 80 * DP}}></View> : <></>}
			</>
		);
	};

	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<Text style={[txt.noto36b]}>추천 게시글 </Text>
			</View>
			<FlatList
				data={props.data}
				renderItem={renderItem}
				style={{width: 750 * DP, paddingVertical: 20 * DP, paddingLeft: 6 * DP}}
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item._id}
				horizontal={true}
			/>
		</View>
	);
};

RecommendReview.defaultProps = {
	onPressRecommendReview: () => {},
};

export default RecommendReview;
const style = StyleSheet.create({
	container: {
		width: 750 * DP,
		marginTop: 20 * DP,
		paddingVertical: 20 * DP,
		paddingHorizontal: 24 * DP,
	},
	header: {
		height: 62 * DP,
		marginBottom: 24 * DP,
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.4,
		shadowRadius: 2,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 2,
	},
	itemCont: {
		width: 634 * DP,
		height: 434 * DP,
		borderRadius: 30 * DP,
		paddingHorizontal: 24 * DP,
		paddingVertical: 30 * DP,
		marginVertical: 10 * DP,
		marginLeft: 10 * DP,
		marginRight: 20 * DP,
		// justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	item: {
		// backgroundColor: 'green',
	},
	imgBox: {
		width: 56 * DP,
		height: 56 * DP,
		borderRadius: 50,
	},
	userLabel: {
		flexDirection: 'row',
		// justifyContent:'center',
		alignItems: 'center',
	},
	article_content: {
		width: 376 * DP,
		marginTop: 8 * DP,
		marginLeft: 48 * DP,
		alignSelf: 'flex-end',
	},
	separatorLine: {
		width: 590 * DP,
		height: 2 * DP,
		marginVertical: 35 * DP,
		backgroundColor: GRAY20,
	},
	category: {
		header: 38 * DP,
		borderRadius: 10 * DP,
		borderWidth: 2 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 10 * DP,
		paddingVertical: 2 * DP,
	},
	categoryList: {
		width: 510 * DP,
		minHeight: 65 * DP,
	},
	iconCont: {
		width: 586 * DP,
		height: 40 * DP,
		marginTop: 30 * DP,
		position: 'absolute',
		bottom: 40 * DP,
		marginHorizontal: 24 * DP,
	},
});
