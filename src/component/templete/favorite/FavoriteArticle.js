import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {getCommunityList} from 'Root/api/community';
import Modal from 'Root/component/modal/Modal';
import ArticleList from 'Root/component/organism/list/ArticleList';
import {styles} from 'Root/component/atom/image/imageStyle';
import community_obj from 'Root/config/community_obj';
import Loading from 'Root/component/molecules/modal/Loading';

//즐겨찾기한 커뮤니티 조회
export default FavoriteArticle = ({route}) => {
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
		// navigation.push('ArticleDetail', {community_object: data[index]});
		community_obj.object = data[index];
		community_obj.pageToMove = 'ArticleDetail';
		community_obj.initial = false;
		console.log('community_obj.current', community_obj.current);
		if (community_obj.current == '') {
			//탭 간의 이동을 간편히 하기 위해 만든 community_obj의 current 값이 빈값 == 현재 보고 있는 ArticleDetail이 없음
			//우선 ArticleMain의 스택을 쌓기 위해 ArticleMain으로 먼저 보낸 뒤 바로 이동되어야 할 상세 자유 게시글을 여기서 선언 => Parameter로 보냄
			navigation.navigate('COMMUNITY', {screen: 'ArticleMain', initial: false, params: {community_object: data[index], pageToMove: 'ArticleDetail'}});
		} else {
			//이미 보고 있는 ArticleDetail이 존재하므로 ArticleDetail 템플릿을 덮어씌우고 봐야할 상세 자유 게시글은 Parameter로 송신
			navigation.navigate('COMMUNITY', {
				screen: 'ArticleDetail',
				initial: false,
				params: {community_object: data[index], reset: true},
			});
		}
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
			{route.name == 'MyArticle' ? (
				<></>
			) : (
				<View style={[style.header]}>
					<Text style={[txt.noto24]}>직접 책갈피 표시를 선택해 즐겨찾기를 해제할 수 있습니다.</Text>
				</View>
			)}
			{data == 'false' ? (
				<Loading isModal={false} />
			) : (
				<View style={{paddingVertical: 20 * DP}}>
					<ArticleList
						items={data}
						onPressArticle={onPressArticle} //게시글 내용 클릭
						whenEmpty={whenEmpty}
					/>
				</View>
			)}
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
	},
	header: {
		width: 654 * DP,
		marginTop: 10 * DP,
		marginBottom: 30 * DP,
		alignItems: 'flex-end',
	},
});
