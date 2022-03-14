import React from 'react';
import {txt} from 'Root/config/textstyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20} from 'Root/config/color';
import {Arrow_Down_GRAY10, Arrow_Up_GRAY10, FavoriteTag46_Filled, Meatball50_GRAY20_Horizontal} from 'Root/component/atom/icon';
import UserLocationTimeLabel from 'Root/component/molecules/label/UserLocationTimeLabel';
import {dummy_userObject} from 'Root/config/dummyDate_json';
/**
 * 게시글 컨텐츠
 * @param {object} props - Props Object
 * @param {object} props.data - 데이터
 * @param {()=>void)} props.onPressFavorite - 좋아요 클릭
 * @param {()=>void} props.onPressMeatball - 미트볼 클릭
 * @param {()=>void} props.onPressArticle - 내용 클릭
 * @param {string} props.route - 부모 컴포넌트 이름
 */
const ArticleContent = props => {
	const isDetail = props.route == 'ArticleDetail';
	const onPressArticle = () => {
		props.onPressArticle();
	};

	const onPressMeatball = () => {
		props.onPressMeatball();
	};

	const onPressFavorite = () => {
		props.onPressFavorite();
	};

	const [showMore, setShowMore] = React.useState(false);

	return (
		<View style={[style.container]}>
			<View style={[style.header]}>
				<View style={[style.header_title]}>
					<Text style={[txt.noto32b]}>우리 강아지 매기</Text>
				</View>
				<View style={[style.header_icon]}>
					<FavoriteTag46_Filled onPress={onPressFavorite} />
					<Meatball50_GRAY20_Horizontal onPress={onPressMeatball} />
				</View>
			</View>
			<View style={[style.profile]}>
				<UserLocationTimeLabel data={dummy_userObject[0]} />
			</View>
			<TouchableOpacity activeOpacity={1} onPress={onPressArticle}>
				<View style={[style.hashText, {}]}>
					<Text numberOfLines={isDetail || showMore ? null : 2}>
						우리 #둥이 는 언제나 #창가 에 앉아있기를 좋아하는거같다. 다른 강아지들은 높은곳을 무서워한다는데ㅋㅋㅋ 정말 신... #둥이 는 언제나 #창가 에
						앉아있기를 좋아하는거같다. 다른 강아지들은 높은곳을 무서워한다는데ㅋㅋㅋ 정말 신...
					</Text>
				</View>
				{isDetail ? (
					<></>
				) : (
					<TouchableOpacity onPress={() => setShowMore(!showMore)} style={[style.footer]}>
						<Text style={[txt.noto24, {color: GRAY10}]}>더보기</Text>
						{!showMore ? <Arrow_Down_GRAY10 /> : <Arrow_Up_GRAY10 />}
					</TouchableOpacity>
				)}
			</TouchableOpacity>
		</View>
	);
};

ArticleContent.defaultProps = {
	onPressFavorite: () => {},
	onPressMeatball: () => {},
	onPressArticle: () => {},
};
export default ArticleContent;

const style = StyleSheet.create({
	container: {
		width: 654 * DP,
		alignSelf: 'center',
	},
	header: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 50 * DP,
		justifyContent: 'space-between',
	},
	header_title: {
		width: 544 * DP,
	},
	header_icon: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	profile: {
		marginTop: 12 * DP,
	},
	hashText: {
		width: 634 * DP,
		marginTop: 10 * DP,
	},
	footer: {
		// flex: 1,
		width: 150 * DP,
		alignSelf: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
});
