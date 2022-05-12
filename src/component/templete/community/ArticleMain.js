import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {BLACK, GRAY10} from 'Root/config/color';
import {Check50, EmptyIcon, Rect50_Border, WriteBoard} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {useNavigation} from '@react-navigation/core';
import {getCommunityList} from 'Root/api/community';
import Modal from 'Root/component/modal/Modal';
import Loading from 'Root/component/molecules/modal/Loading';
import community_obj from 'Root/config/community_obj';
import userGlobalObject from 'Root/config/userGlobalObject';

export default ArticleMain = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
			// console.log('community_obj / ArticleMain / object._id : ', community_obj.object._id);
			// console.log('community_obj / ArticleMain / pageToMove : ', community_obj.pageToMove);
			// console.log('community_obj.initial / ArticleMain /  initial : ', community_obj.initial);
			community_obj.current = '';
			if (community_obj.initial != true && community_obj.object._id != undefined) {
				console.log('community_obj.pageToMove', community_obj.pageToMove);
				navigation.navigate(community_obj.pageToMove, {community_object: community_obj.object});
			}
		});
		navigation.addListener('blur', () => {
			community_obj.object = {};
			community_obj.pageToMove = '';
			community_obj.initial = true;
		});
		fetchData();
		return unsubscribe;
	}, []);

	const fetchData = () => {
		getCommunityList(
			{
				community_type: 'free',
			},
			result => {
				// console.log('result / getCommunityList / ArticleMain :', result.msg.free[0]);
				setData(result.msg.free);
			},
			err => {
				console.log('err / getCommunityList / ArticleMain : ', err);
				setData([]);
				Modal.alert(err);
			},
		);
	};

	// 게시글 내용 클릭
	const onPressArticle = index => {
		navigation.push('ArticleDetail', {community_object: getData()[index]});
	};

	//글쓰기
	const onPressWrite = () => {
		if (userGlobalObject.userInfo.isPreviewMode) {
			Modal.popLoginRequestModal(() => {
				navigation.navigate('Login');
			});
		} else {
			navigation.navigate('CommunityWrite', {isReview: false});
			// navigation.push('WriteEditorTest');
		}
	};

	const [onlyTalk, setOnlyTalk] = React.useState(false);
	const [onlyQuestion, setOnlyQuestion] = React.useState(false);
	const [onlyMeeting, setOnlyMeeting] = React.useState(false);

	const onPressFilter = type => {
		switch (type) {
			case '잡담':
				setOnlyTalk(!onlyTalk);
				setOnlyQuestion(false);
				setOnlyMeeting(false);
				break;
			case '질문':
				setOnlyTalk(false);
				setOnlyQuestion(!onlyQuestion);
				setOnlyMeeting(false);
				break;
			case '모임':
				setOnlyTalk(false);
				setOnlyQuestion(false);
				setOnlyMeeting(!onlyMeeting);
				break;
			default:
				break;
		}
	};

	const getData = () => {
		let filtered = data;
		if (onlyTalk) {
			filtered = filtered.filter(e => e.community_free_type == 'talk');
		} else if (onlyQuestion) {
			filtered = filtered.filter(e => e.community_free_type == 'question');
		} else if (onlyMeeting) {
			filtered = filtered.filter(e => e.community_free_type == 'meeting');
		}
		return filtered;
	};

	const whenEmpty = () => {
		return (
			<View style={{paddingVertical: 150 * DP, alignItems: 'center'}}>
				<EmptyIcon />
				<Text style={[txt.noto28]}>검색 결과가 없습니다..</Text>
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={[{}]}
				renderItem={({item, index}) => {
					return (
						<>
							<View style={{width: 654 * DP, alignSelf: 'center'}}>
								<View style={[style.kindFilter]}>
									<View style={[style.kindFilterItem]}>
										<Text style={[txt.noto28, {color: GRAY10}]}> 잡담</Text>
										{onlyTalk ? <Check50 onPress={() => onPressFilter('잡담')} /> : <Rect50_Border onPress={() => onPressFilter('잡담')} />}
									</View>
									<View style={[style.kindFilterItem]}>
										<Text style={[txt.noto28, {color: GRAY10}]}> 질문</Text>
										{onlyQuestion ? <Check50 onPress={() => onPressFilter('질문')} /> : <Rect50_Border onPress={() => onPressFilter('질문')} />}
									</View>
									<View style={[style.kindFilterItem]}>
										<Text style={[txt.noto28, {color: GRAY10}]}> 모임</Text>
										{onlyMeeting ? <Check50 onPress={() => onPressFilter('모임')} /> : <Rect50_Border onPress={() => onPressFilter('모임')} />}
									</View>
								</View>
							</View>
							{data == 'false' ? (
								<Loading isModal={false} />
							) : (
								<ArticleList
									items={getData()}
									onPressArticle={onPressArticle} //게시글 내용 클릭
									whenEmpty={whenEmpty}
								/>
							)}
						</>
					);
				}}
				showsVerticalScrollIndicator={false}
				listKey={({item, index}) => index}
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
	kindFilter: {
		width: 420 * DP,
		backgroundColor: 'white',
		marginVertical: 30 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		justifyContent: 'space-between',
	},
	kindFilterItem: {
		width: 120 * DP,
		// backgroundColor: 'red',
		marginLeft: 10 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
