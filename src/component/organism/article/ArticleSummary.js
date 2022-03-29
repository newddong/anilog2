import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, GRAY10, GRAY20, GRAY40} from 'Root/config/color';
import {Photo44} from 'Root/component/atom/icon';
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
				break;
			case 'question':
				return '질문';
				break;
			case 'meeting':
				return '모임';
				break;
			default:
				break;
		}
	};

	const onPressArticle = () => {
		props.onPressArticle();
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
					<Text style={[txt.noto24, {color: GRAY10}]}>22.01.02</Text>
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

const gg = {
	_id: 1,
	community_title: '제목1', // 커뮤니티 제목
	community_content: '본문1', // 커뮤니티 본문
	community_type: 'free', // 게시글의 타입 (자유게시판|'free', 리뷰|'review')
	community_free_type: 'talk', // 자유게시글 타입 (잡담|'talk', 질문|'qustion', 모임|'meeting')
	community_animal_type: 'dog', // 리뷰 글 내용 동물 타입 (개|'doc', 고양이|'cat', 그외|'etc')
	community_avatar_id: 'd', // 커뮤니티의 작성자로 지정하고 싶은 반려동물 ID
	community_is_temporary: false, // 임시저장 여부
	community_interests: {
		// 관심사 항목 키워드
		interests_trip: ['string'],
		interests_hospital: ['string'],
		interests_interior: ['string'],
		interests_etc: ['string'],
		interests_review: ['string'],
	},
	community_address: {
		// 커뮤니티 리뷰 관련 주소
		addr: {
			road_address: {address_name: '도로명 주소가 없는 위치입니다.'},
			address: {
				address_name: '서울 마포구 신수동 1-12',
				region_1depth_name: '서울',
				region_2depth_name: '마포구',
				region_3depth_name: '신수동',
				mountain_yn: 'N',
				main_address_no: '1',
				sub_address_no: '12',
				zip_code: '',
			},
			detailAddr: '',
		},
		region: {latitude: 37.549587723489424, longitude: 126.9385725098303},
	},
	community_like_count: 0,
	community_favorite_count: 0,
	community_comment_count: 0,
	__v: 0,
};
