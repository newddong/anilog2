import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {login_style, selectstat_view_style, temp_style} from 'Templete/style_templete';
import Loading from 'Root/component/molecules/modal/Loading';
import {getFavoriteEtcListByUserId, setFavoriteEtc, setFavoriteEtcCancelList} from 'Root/api/favoriteetc';
import userGlobalObject from 'Root/config/userGlobalObject';
import AnimalNeedHelpList from 'Root/component/organism/list/AnimalNeedHelpList';
import DP from 'Root/config/dp';
import ListEmptyInfo from 'Root/component/molecules/info/ListEmptyInfo';
import SelectStat from 'Root/component/organism/list/SelectStat';
import ProtectRequest from 'Root/component/organism/listitem/ProtectRequest';
import {Check42, Check50, Rect42_Border, Rect50_Border} from 'Root/component/atom/icon';
import {updateProtect} from 'Root/config/protect_obj';

export default FavoriteProtectRequest = ({route}) => {
	const navigation = useNavigation();
	const [data, setData] = React.useState('false');
	const [selectMode, setSelectMode] = React.useState(false);
	const [selectCNT, setSelectCNT] = React.useState(0);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
		});
		// fetchData();
		return unsubscribe;
	}, []);

	const fetchData = () => {
		getFavoriteEtcListByUserId(
			{
				userobject_id: userGlobalObject.userInfo._id,
				collectionName: 'protectrequestobjects',
			},
			result => {
				// console.log('result / getFavoriteEtcListByUserId / FavoriteProtectRequest : ', result.msg[0]);
				let temp = [];
				result.msg.map((v, i) => {
					if (v) {
						v.favorite_etc_target_object_id.is_favorite = v.is_favorite;
						temp.push(v.favorite_etc_target_object_id);
					}
				});
				setData(temp);
			},
			err => {
				console.log('err / getFavoriteEtcListByUserId / FavoriteProtectRequest : ', err);
				setData([]);
			},
		);
	};

	//Check Box On
	const checkSelectMode = state => {
		console.log('state', state);
		setSelectMode(state);
		//전체 선택을 처음 누를 경우 무조건 체크 박스가 모두 선택되도록 하기 위해 setSelectCNT값을 0으로 초기화.
		setSelectCNT(0);
		//취소를 누르고 다시 선택하기를 누를 경우 선택되어 있는 체크박스가 없게 하기 위해 false로 초기화.
		let copy = [...data];
		copy.map((v, i) => {
			v.checkBoxState = false;
		});
		setData(copy);
	};

	//CheckBox Off
	const cancelSelectMode = e => {
		data.map((v, i) => {
			v.checkBoxState = false;
		});
		setSelectMode(e);
	};

	// 선택하기 => 선택 삭제 클릭
	const deleteSelectedItem = () => {
		//현재 dummyData 중 CheckBox 상태가 true인 것이 없는 경우
		if (data.findIndex(e => e.checkBoxState == true) == -1) {
			Modal.popOneBtn('선택된 보호요청이 없습니다.', '확인', () => Modal.close());
			// CheckBox 상태가 true인 것이 존재하는 경우 삭제 시작
		} else {
			console.log('삭제시작');
			const doDelete = () => {
				let copy = [...data];
				copy = copy.filter(element => element.checkBoxState == true); //CheckBoxState가 true인 경우엔 걸러진다
				console.log('copy length', copy.length);
				doDeleteFavorite(copy);
				setData(copy);
				Modal.close();
			};

			// Modal.popTwoBtn(deleteMsg(), '취소', '해제', () => Modal.close(), doDelete);
			Modal.popOneBtn('선택한 게시글을 \n 즐겨찾기에서 해제 하시겠습니까?', '해제', doDelete);
		}
	};

	const doDeleteFavorite = list => {
		const listToDelete = list.map(v => v._id);
		console.log('listToDelete', listToDelete);
		setFavoriteEtcCancelList(
			{
				collectionName: 'protectrequestobjects',
				target_object_id: listToDelete,
				is_favorite: false,
			},
			result => {
				console.log('result/ setFavoriteEtcCancelList / FavoriteReview : ', result.msg);
				cancelSelectMode(false);
				checkSelectMode(false);
				fetchData();
				listToDelete.map((v, i) => {
					updateProtect(v, false);
				});
			},
			err => console.log('err / setFavoriteEtcCancelList / FavoriteReview : ', err),
		);
	};

	// 선택하기 => 전체 선택 클릭
	const selectAll = () => {
		//v.checkBoxState = !v.checkBoxState와 같이 할 경우 체크 박스 값들이 각각 다를 경우 그것의 반대로만 변경 될 뿐 모두 선택되거나 모두 취소 되지 않음.
		setSelectCNT(selectCNT + 1);
		let copy = [...data];
		if (data.findIndex(e => e.checkBoxState == true) == -1) {
			copy.map((v, i) => {
				copy[i].checkBoxState = true;
			});
		} else {
			console.log('선택이 있다');
			const filtered = data.filter(e => e.checkBoxState == true);
			const len = data.length;
			const ratio = filtered.length / len;
			// console.log('filtered', filtered);
			console.log('len', data.length);
			console.log('ratio', ratio);
			if (ratio < 0.5) {
				copy.map((v, i) => {
					copy[i].checkBoxState = true;
				});
			} else {
				copy.map((v, i) => {
					copy[i].checkBoxState = false;
				});
			}
		}
		setData(copy);
	};

	//즐겨찾기 선택모드에서 체크박스 클릭
	const onPressCheck = (i, bool) => {
		console.log('i', i, bool);
		let copy = [...data];
		copy[i].checkBoxState = bool;
		setData(copy);
	};

	//별도의 API 사용 예정.
	const onFavoriteTag = (bool, index) => {
		console.log('bool', bool);
		setFavoriteEtc(
			{
				collectionName: 'protectrequestobjects',
				target_object_id: data[index]._id,
				is_favorite: bool,
			},
			result => {
				console.log('result / favoriteEtc / ProtectRequestList : ', result.msg.favoriteEtc);
				fetchData();
				updateProtect(data[index]._id, bool);
			},
			err => {
				console.log('err / favoriteEtc / PRotectRequestList : ', err);
			},
		);
	};

	//보호요청글 클릭
	const onClickLabel = item => {
		console.log('item', item);
		if (selectMode) {
			return false;
		} else {
			let gender = '남';
			switch (item.protect_animal_sex) {
				case 'male':
					gender = '남';
					break;
				case 'female':
					gender = '여';
					break;
				case 'male':
					gender = '성별모름';
					break;
			}
			const title = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + gender;
			navigation.push('AnimalProtectRequestDetail', {id: item._id, title: title, writer: item.protect_request_writer_id._id});
		}
	};

	const render = ({item, index}) => {
		return (
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				{selectMode ? (
					<View style={{marginRight: 20 * DP}}>
						{item.checkBoxState ? (
							<Check42 onPress={() => onPressCheck(index, false)} />
						) : (
							<Rect42_Border onPress={() => onPressCheck(index, true)} />
						)}
					</View>
				) : (
					<></>
				)}
				<ProtectRequest
					data={item}
					onClickLabel={() => onClickLabel(item)}
					onFavoriteTag={bool => onFavoriteTag(bool, index)}
					selectMode={selectMode}
				/>
			</View>
		);
	};

	const header = () => {
		return (
			<View style={[style.selectstat_view, {}]}>
				<SelectStat
					selectMode={selectMode}
					onSelectMode={checkSelectMode}
					onCancelSelectMode={cancelSelectMode}
					onSelectAllClick={selectAll}
					onDeleteSelectedItem={deleteSelectedItem}
				/>
			</View>
		);
	};

	const ITEM_HEIGHT = 266 * DP;

	const whenEmpty = () => {
		return <ListEmptyInfo text={'즐겨찾기한 보호요청글이 없습니다.'} />;
	};

	if (data == 'false') {
		return <Loading isModal={false} />;
	} else
		return (
			<FlatList
				data={data}
				style={{backgroundColor: '#fff'}}
				contentContainerStyle={{alignItems: 'center'}}
				renderItem={render}
				keyExtractor={item => item._id}
				getItemLayout={(data, index) => {
					if (!data[index]) return {length: 0, offset: 0, index: index};
					return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index: index};
				}}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={header}
				ListEmptyComponent={whenEmpty}
			/>
		);
};

const style = StyleSheet.create({
	selectstat_view: {
		width: 694 * DP,
		height: 100 * DP,
		alignItems: 'center',
		marginBottom: 20 * DP,
	},
	selectstat: {
		flexDirection: 'row',
		marginTop: 30 * DP,
		width: 694 * DP,
		height: 42 * DP,
	},
});
