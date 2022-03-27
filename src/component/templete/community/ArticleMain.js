import React from 'react';
import {StyleSheet, View} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {BLACK} from 'Root/config/color';
import {WriteBoard} from 'Root/component/atom/icon';

export default ArticleMain = ({route, navigation}) => {
	const dummy = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}];

	// 게시글 내용 클릭
	const onPressArticle = index => {
		// console.log('dummy', dummy[index]);
		navigation.push('ArticleDetail');
	};

	//추천 게시글 아이템 클릭
	const onPressRecommendArticle = () => {
		navigation.push('ArticleDetail');
	};

	// 댓글 모두보기 클릭
	const onPressReply = index => {
		navigation.push('ArticleCommentList', {feedobject: {_id: '61d2df2fc0f179ccd5ba5a1e'}});
	};

	//글쓰기
	const onPressWrite = () => {
		navigation.push('CommunityWrite', {isReview: false});
		// navigation.push('WriteEditorTest');
	};

	const dummy2 = [
		// 'ㄱ<div>ㅋ</div><div>ㅋ</div><div>ㅋ</div><div>ㅋ</div><div><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648191511800_rn_image_picker_lib_temp_314698c0-0991-4b82-89cf-64abdf448359.jpg" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648191511801_rn_image_picker_lib_temp_43498705-34cb-4f9e-a26d-4e6449b9861e.jpg" onclick="_.sendEvent('ImgClick')" conte
		// nteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><br></p></div>'
		`<div>ㅋ</div><div>ㅋ</div><div>ㅋ</div><div>ㅋ</div><div><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648191511800_rn_image_picker_lib_temp_314698c0-0991-4b82-89cf-64abdf448359.jpg" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648191511801_rn_image_picker_lib_temp_43498705-34cb-4f9e-a26d-4e6449b9861e.jpg" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><br></p></div>`,
		`<div>ㅋ</div><div>ㅋ</div><div>ㅋ</div><div>ㅋ</div><div><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648191511800_rn_image_picker_lib_temp_314698c0-0991-4b82-89cf-64abdf448359.jpg" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648191511801_rn_image_picker_lib_temp_43498705-34cb-4f9e-a26d-4e6449b9861e.jpg" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><br></p></div>`,
		`<div>ㅋ</div><div>ㅋ</div><div>ㅋ</div><div>ㅋ</div><div><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648191511800_rn_image_picker_lib_temp_314698c0-0991-4b82-89cf-64abdf448359.jpg" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><img src="https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648191511801_rn_image_picker_lib_temp_43498705-34cb-4f9e-a26d-4e6449b9861e.jpg" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px" width="150px" style="border-radius:15px; margin: 0 auto 4px; "></p><p><br></p></div>`,
	];

	return (
		<View style={[style.container]}>
			<ArticleList
				items={dummy}
				onPressArticle={onPressArticle} //게시글 내용 클릭
				onPressThumnails={onPressArticle} //게시글 사진 썸네일 클릭 - 메인페이지에선 게시글 상세로 이동
				onPressReply={onPressReply} //댓글 모두보기 클릭
				onPressRecommendArticle={onPressRecommendArticle} //추천 게시글 아이템 클릭
			/>
			<View style={[style.write, style.shadow]}>
				<WriteBoard onPress={onPressWrite} />
			</View>
		</View>
	);
};
ArticleMain.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	write: {
		position: 'absolute',
		width: 94 * DP,
		height: 94 * DP,
		right: 30 * DP,
		bottom: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 5 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
	},
});
