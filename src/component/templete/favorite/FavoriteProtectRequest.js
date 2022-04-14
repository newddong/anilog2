import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import {login_style} from 'Templete/style_templete';
import {txt} from 'Root/config/textstyle';
import Loading from 'Root/component/molecules/modal/Loading';
import {favoriteEtc, getFavoriteEtcListByUserId} from 'Root/api/favoriteetc';
import userGlobalObject from 'Root/config/userGlobalObject';
import AnimalNeedHelpList from 'Root/component/organism/list/AnimalNeedHelpList';
import DP from 'Root/config/dp';
import {EmptyIcon} from 'Root/component/atom/icon';

export default FavoriteProtectRequest = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
		});
		fetchData();
		return unsubscribe;
	}, []);

	const fetchData = () => {
		getFavoriteEtcListByUserId(
			{
				userobject_id: userGlobalObject.userInfo._id,
				collectionName: 'protectrequestobjects',
			},
			result => {
				console.log('result / getFavoriteEtcListByUserId / FavoriteCommunity : ', result.msg);
				let temp = [];
				result.msg.map((v, i) => {
					temp.push(v.favorite_etc_target_object_id);
				});
				setData(temp);
			},
			err => {
				console.log('err / getFavoriteEtcListByUserId / FavoriteCommunity : ', err);
				setData([]);
			},
		);
	};

	//별도의 API 사용 예정.
	const onFavoriteTag = (bool, index) => {
		// console.log('즐겨찾기=>' + value + ' ' + index);
		console.log(' data[index]._id', data[index]._id);
		console.log('bool', bool);
		favoriteEtc(
			{
				collectionName: 'protectrequestobjects',
				post_object_id: data[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ProtectRequestList : ', result.msg);
			},
			err => {
				console.log('err / favoriteEtc / PRotectRequestList : ', err);
			},
		);
	};

	const whenEmpty = () => {
		return (
			<View style={{paddingVertical: 150 * DP, alignItems: 'center'}}>
				<EmptyIcon />
				<Text style={[txt.roboto36b, {marginTop: 10 * DP}]}>목록이 없네요.</Text>
			</View>
		);
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<View style={{marginTop: 20 * DP}}>
					<AnimalNeedHelpList data={data} onFavoriteTag={onFavoriteTag} whenEmpty={whenEmpty} />
				</View>
			</View>
		);
};
