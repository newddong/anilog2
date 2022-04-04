import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {BLACK, GRAY10} from 'Root/config/color';
import {Check50, Rect50_Border, WriteBoard} from 'Atom/icon';
import {txt} from 'Root/config/textstyle';
import {useNavigation} from '@react-navigation/core';
import {getCommunityList} from 'Root/api/community';
import Modal from 'Root/component/modal/Modal';
import Loading from 'Root/component/molecules/modal/Loading';
import {styles} from 'Root/component/atom/image/imageStyle';

export default ArticleMain = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => fetchData());
		fetchData();
		return unsubscribe;
	}, []);

	const fetchData = () => {
		getCommunityList(
			{
				community_type: 'free',
			},
			result => {
				// console.log('result / getCommunityList / ArticleMain :', result.msg.free);
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
		navigation.push('ArticleDetail', {community_object: data[index]});
	};

	//글쓰기
	const onPressWrite = () => {
		navigation.navigate('CommunityWrite', {isReview: false});
		// navigation.push('WriteEditorTest');
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
			<>
				<Image
					style={[styles.img_square_246, {paddingVertical: 150 * DP}]}
					resizeMode={'stretch'}
					source={{
						uri: 'https://st.depositphotos.com/21121724/53932/v/600/depositphotos_539322694-stock-illustration-cartoon-home-pets-empty-feeder.jpg',
					}}
				/>
				<Text style={[txt.roboto36b]}>목록이 없네요.</Text>
			</>
		);
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={[{}]}
				renderItem={({item, index}) => {
					return (
						<>
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
