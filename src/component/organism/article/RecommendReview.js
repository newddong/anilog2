import React from 'react';
import {txt} from 'Root/config/textstyle';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLACK, GRAY10, GRAY20, GRAY30, WHITE} from 'Root/config/color';
import ProfileImageSmall from 'Root/component/molecules/image/ProfileImageSmall';
import {getTimeLapsed} from 'Root/util/dateutil';
import userGlobalObject from 'Root/config/userGlobalObject';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Comment30, Comment30_Border, Like30, Like30_Border, Like30_Filled, Like48_Border, Like48_Filled} from 'Root/component/atom/icon';
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

	const first = props.data ? props.data[0] : '';
	const second = props.data ? props.data[1] : '';

	const recommendReview = data => {
		if (data) {
			const imageList = () => {
				let imageList = [];
				let getImgTag = data.community_content.match(/<img[\w\W]+?\/?>/g); //img 태그 추출
				if (getImgTag) {
					getImgTag.map((v, i) => {
						let src = v.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i); //img 태그가 있는 경우 src 추출
						imageList.push(src[1]);
					});
				}
				return imageList;
			};
			return (
				<TouchableOpacity onPress={() => onPressRecommendReview(data)} activeOpacity={0.7} style={[{}]}>
					<View style={{flexDirection: 'row'}}>
						<View style={{height: 158 * DP, justifyContent: 'space-between'}}>
							<View style={[style.userLabel]}>
								{data.community_writer_id ? <ProfileImageSmall data={data.community_writer_id} size={46} /> : <ProfileImageSmall size={46} />}
								{data.community_writer_id ? (
									<Text
										style={[
											txt.noto24,
											{marginLeft: 24 * DP, width: 350 * DP, color: data.community_writer_id._id == userGlobalObject.userInfo._id ? APRI10 : BLACK},
										]}
										numberOfLines={1}>
										{data.community_writer_id.user_nickname}
									</Text>
								) : (
									<Text style={[txt.noto24, {marginLeft: 24 * DP, width: 350 * DP}]} numberOfLines={1}>
										이미 탈퇴한 계정입니다.
									</Text>
								)}
							</View>
							<View style={[style.article_content]}>
								<Text style={[txt.noto24, {color: GRAY10, textAlignVertical: 'center', height: 74 * DP}]} numberOfLines={2}>
									{data.community_content_without_html}
								</Text>
								<View style={{flexDirection: 'row', width: 360 * DP, alignItems: 'center'}}>
									<Like30 />
									<Text style={[txt.roboto24, {color: GRAY20, marginLeft: 6 * DP, marginRight: 10 * DP}]}>{data.community_like_count}</Text>
									<Comment30 />
									<Text style={[txt.roboto24, {color: GRAY20, marginLeft: 6 * DP, marginRight: 10 * DP}]}>{data.community_comment_count}</Text>
									<Text style={[txt.roboto24, {color: GRAY20}]}> · {getTimeLapsed(data.community_date)}</Text>
								</View>
							</View>
						</View>
						{imageList().length == 0 ? (
							<Image style={[{width: 158 * DP, height: 158 * DP, borderRadius: 30 * DP}]} source={require('Atom/icon/document2.png')} />
						) : (
							<Image style={[{width: 158 * DP, height: 158 * DP, borderRadius: 30 * DP}]} source={{uri: imageList()[0]}} />
						)}
					</View>
				</TouchableOpacity>
			);
		} else return <></>;
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
		if (getImgTag) {
			getImgTag.map((v, i) => {
				let src = v.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i); //img 태그가 있는 경우 src 추출
				imageList.push(src[1]);
			});
		}
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
				} else return <Image key={i} source={{uri: v}} style={[{width: 108 * DP, height: 108 * DP, borderRadius: 30 * DP, marginRight: 10 * DP}]} />;
			});
		};
		if (imageList && imageList.length == 0) {
			return <></>;
		} else return <View style={[style.image, {flexDirection: 'row', marginTop: 20 * DP}]}>{getImage()}</View>;
	};

	const renderItem = ({item, index}) => {
		//사진포함 여부, 카테고리 포함여부, 글 내용 포함 여부에 따른 높이
		const getHeight = () => {
			let height = 200 * DP;
			let category_sum_list = [];
			item.community_interests.interests_trip.map(v => category_sum_list.push(v));
			item.community_interests.interests_etc.map(v => category_sum_list.push(v));
			item.community_interests.interests_hospital.map(v => category_sum_list.push(v));
			item.community_interests.interests_review.map(v => category_sum_list.push(v));
			item.community_interests.interests_interior.map(v => category_sum_list.push(v));
			if (item.community_is_attached_file) {
				height = height + 148 * DP;
			}
			if (category_sum_list.length > 0) {
				height = height + 58 * DP;
			}
			if (item.community_content_without_html == '') {
				height = height - 58 * DP;
			}
			console.log('item height', item.community_title, height, category_sum_list.length > 0, item.community_content_without_html == '');
			return height;
		};
		return (
			<>
				<TouchableOpacity
					onPress={() => onPressRecommendReview(item)}
					activeOpacity={0.7}
					style={[style.itemCont, style.shadow, {height: getHeight()}]}>
					{getCategory(item)}
					<Text style={[txt.noto32, {width: 584 * DP}]} numberOfLines={1}>
						{item.community_title}
					</Text>
					{item.community_content_without_html ? (
						<Text style={[txt.noto24, {color: GRAY10, width: 584 * DP, maxHeight: 74 * DP}]} numberOfLines={2}>
							{item.community_content_without_html.trim()}
						</Text>
					) : (
						<></>
					)}
					{getImageList(item)}
					<View style={[style.iconCont, {height: 40 * DP, marginTop: 30 * DP}]}>
						<View style={[style.like, {flexDirection: 'row', alignItems: 'center'}]}>
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
		<View style={[style.container]} onLayout={e => console.log('e', e.nativeEvent.layout.height)}>
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
		// height: 434 * DP,
		borderRadius: 30 * DP,
		paddingHorizontal: 24 * DP,
		paddingVertical: 30 * DP,
		marginVertical: 10 * DP,
		marginLeft: 10 * DP,
		marginRight: 20 * DP,
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	content: {
		width: 654 * DP,
		// height: 606 * DP,
		borderRadius: 46 * DP,
		backgroundColor: WHITE,
		paddingVertical: 50 * DP,
		paddingHorizontal: 32 * DP,
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
});
