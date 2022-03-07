import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {getFollowers, getFollows, getUserListByNickname} from 'Root/api/userapi';
import AccountHashList from 'Organism/list/AccountHashList';
import SelectStat from 'Organism/list/SelectStat';
import {login_style, temp_style, selectstat_view_style, saveFavorite} from 'Templete/style_templete';
import userGlobalObject from 'Root/config/userGlobalObject';

//즐겨찾기 친구
export default SaveFavorite = props => {
	const navigation = useNavigation();
	const [checkBoxMode, setCheckBoxMode] = React.useState(false);
	const [data, setData] = React.useState('false');
	let selectCNT = React.useRef(0);

	React.useEffect(() => {
		getFollows(
			{
				userobject_id: userGlobalObject.userInfo._id,
			},
			follow => {
				// console.log('follow / getFollows / SaveFavorite', follow.msg);
				let follow_id_list = [];
				follow.msg.map((v, i) => {
					follow_id_list.push(v.follow_id._id);
					console.log('foll', i, v.follow_id.user_nickname);
				});
				getUserListByNickname(
					{
						user_nickname: '이',
						user_type: '',
						userobject_id: '',
						request_number: 10,
					},
					result => {
						// console.log('result / getUserListByNick / SaveFavorite  : ', result.msg.slice(0, 2));
						let res = result.msg;
						res.map((v, i) => {
							if (follow_id_list.includes(v._id)) {
								v.isFollowing = true;
							} else v.isFollowing = false;
						});
						// console.log('res', res[0]);
						res.map((v, i) => {
							console.log('v', i, v.isFollowing);
							// const e  = 61d2de8ac0f179ccd5ba58a6
							// LOG  v 1 61d2ef69c0f179ccd5ba66cc
							// LOG  v 2 61d38081c0f179ccd5ba7ec7
							// LOG  v 3 61d3812ac0f179ccd5ba7ecb
							// LOG  v 4 61d38ebcc0f179ccd5ba81e1
							// LOG  v 5 61d391e0c0f179ccd5ba8404
							// LOG  v 6 61d397a8c0f179ccd5ba84fb
							// LOG  v 7 61d398a5c0f179ccd5ba85a1
							// LOG  v 8 61d3be2bc0f179ccd5ba9889
							// LOG  v 9 61d3f45ec0f179ccd5baa07b
						});

						setData(res);
					},
					err => {
						console.log('err', err);
					},
				);
			},
			err => {
				console.log(' err / getFollows / SaveFavorite');
			},
		);
	}, []);

	//Check Box On
	const showCheckBox = e => {
		// console.log(`showCheckBox=>${showCheckBox}`);
		setCheckBoxMode(e);
		//전체 선택을 처음 누를 경우 무조건 체크 박스가 모두 선택되도록 하기 위해 setSelectCNT값을 0으로 초기화.
		selectCNT.current = 0;

		//취소를 누르고 다시 선택하기를 누를 경우 선택되어 있는 체크박스가 없게 하기 위해 false로 초기화.
		let copy = [...data];
		copy.map((v, i) => {
			v._index = i;
			v.checkBoxState = false;
		});
		setData(copy);
	};

	// 선택하기 => 전체 선택 클릭
	const selectAll = () => {
		selectCNT.current += 1;
		let copy = [...data];
		// console.log('selectCNT.current =====>' + selectCNT.current);
		copy.map((v, i) => {
			//카운트의 2로 나눈 나머지값을 이용해서 전체 선택 혹은 전체 취소가 되도록 함.
			selectCNT.current % 2 == 1 ? (v.checkBoxState = true) : (v.checkBoxState = false);
		});
		setData(copy);
	};

	// 선택하기 => 선택 삭제 클릭 (API 데이터 불러온 뒤 다시 수정할 것. - 실제로 ID를 API로 넘긴 후 데이터를 다시 가져와서 표출 해야함.)
	const deleteSelectedItem = () => {
		let copy = [...data];
		copy = copy.filter(e => e.checkBoxState != true);
		copy.map((v, i) => {
			// console.log('index=>' + i);
			v._index = i;
			v.checkBoxState = false;
		});
		setData(copy);
	};

	//CheckBox 클릭 시
	const onCheckBox = (item, index) => {
		let copy = [...data];
		copy[index].checkBoxState = !copy[index].checkBoxState;
	};

	const onClickFollow = data => {
		console.log('data', data);
	};

	const onClickLabel = data => {
		navigation.push('UserProfile', {userobject: data});
	};

	const onClickHash = data => {
		navigation.push('FeedListForHashTag', data);
	};

	if (data == 'false') {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
				<ActivityIndicator size={'large'}></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<View style={[temp_style.selectstat_view]}>
					<View style={[temp_style.selectstat, selectstat_view_style.selectstat]}>
						<SelectStat
							onSelectMode={e => showCheckBox(e)}
							onCancelSelectMode={e => hideCheckBox(e)}
							onSelectAllClick={selectAll}
							onDeleteSelectedItem={deleteSelectedItem}
						/>
					</View>
				</View>
				<View style={[saveFavorite.accountHashList, {height: null}]}>
					<AccountHashList
						data={data}
						checkBoxMode={checkBoxMode}
						onClickLabel={onClickLabel}
						onClickHash={onClickHash}
						onClickFollow={onClickFollow}
						onCheckBox={onCheckBox}
						routeName={props.route.name}
						showFollowBtn={true}
					/>
				</View>
			</View>
		);
	}
};

const gd = [
	{
		__v: 3,
		_id: '61d2de8ac0f179ccd5ba58a6',
		pet_birthday: '2022-01-03T00:00:00.000Z',
		pet_family: ['61d2de63c0f179ccd5ba5887', '61d2dcb0c0f179ccd5ba5649'],
		pet_is_temp_protection: false,
		pet_neutralization: 'no',
		pet_sex: 'male',
		pet_species: '개',
		pet_species_detail: '코커스패니얼',
		pet_status: 'companion',
		pet_weight: '4',
		type: 'UserObject',
		user_agreement: {
			is_donation_info: false,
			is_location_service_info: false,
			is_marketting_info: false,
			is_over_fourteen: false,
			is_personal_info: false,
			is_service: false,
		},
		user_denied: false,
		user_follow_count: 0,
		user_follower_count: 2,
		user_interests: [],
		user_introduction: '',
		user_is_verified_email: false,
		user_is_verified_phone_number: false,
		user_my_pets: [],
		user_nickname: '길동이',
		user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641209482105_A3B92DE3-4536-43F5-B8A9-94355C099318.jpg',
		user_register_date: '2022-01-03T11:31:22.210Z',
		user_type: 'pet',
		user_upload_count: 0,
	},
	{
		__v: 0,
		_id: '61d2ef69c0f179ccd5ba66cc',
		pet_birthday: '2021-11-01T00:00:00.000Z',
		pet_family: ['61d2ed24c0f179ccd5ba65a4'],
		pet_is_temp_protection: false,
		pet_neutralization: 'no',
		pet_sex: 'male',
		pet_species: '개',
		pet_species_detail: '진돗개',
		pet_status: 'companion',
		pet_weight: '1',
		type: 'UserObject',
		user_agreement: {
			is_donation_info: false,
			is_location_service_info: false,
			is_marketting_info: false,
			is_over_fourteen: false,
			is_personal_info: false,
			is_service: false,
		},
		user_denied: false,
		user_follow_count: 0,
		user_follower_count: 0,
		user_interests: [],
		user_introduction: '',
		user_is_verified_email: false,
		user_is_verified_phone_number: false,
		user_my_pets: [],
		user_nickname: '진돌이',
		user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1641213801224_F8B5ABD7-3D41-444D-AD4F-4FB3221AEB25.jpg',
		user_register_date: '2022-01-03T12:43:21.328Z',
		user_type: 'pet',
		user_upload_count: 0,
	},
];
