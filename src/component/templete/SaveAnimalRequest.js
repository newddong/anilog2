import React from 'react';
import {View} from 'react-native';
import AnimalNeedHelpList from '../organism_ksw/AnimalNeedHelpList';
import SelectStat from '../organism_ksw/SelectStat';
import {login_style, temp_style} from './style_templete';
import {useNavigation} from '@react-navigation/core';
import {getProtectRequestList, getProtectRequestListByShelterId} from 'Root/api/shelterapi';

export default SaveAnimalRequest = ({route}) => {
	const navigation = useNavigation();

	//계정 좌측 CheckBox 디스플레이 여부

	const [checkBoxMode, setCheckBoxMode] = React.useState(false);
	//checkBox On
	const [data, setData] = React.useState([]);
	const [selectCNT, setSelectCNT] = React.useState(0);
	const [acceptAllState, setAcceptAllState] = React.useState(false);
	const [isDeleted, setIsDeleted] = React.useState(false);

	React.useEffect(() => {
		getProtectRequestList(
			//현재 로그인한 보호소의 고유 _id를 파라미터로 보내고
			//_id를 통해 얻어온 보호소의 보호 요청 게시글 리스트를 출력
			{
				protect_request_object_id: null,
				request_number: 2,
			},
			result => {
				console.log('result / getProtectRequestLIst / ShelterSaveAnimalRequest', result);
				setData(result.msg);
				// 받아온 protect_animal_protect_Request_id로 해당 게시글 좋아요 여부도 판별해야함
			},
			err => {
				console.log('err / getProtectRequestList', err);
				// err.filter(e => {
				// 	// console.log('e._protect_animal', e.protect_animal_id);
				// });
			},
		);
	}, []);

	//선택하기 클릭
	const showCheckBox = e => {
		setCheckBoxMode(e);

		//전체 선택을 처음 누를 경우 무조건 체크 박스가 모두 선택되도록 하기 위해 setSelectCNT값을 0으로 초기화.
		setSelectCNT(0);

		//취소를 누르고 다시 선택하기를 누를 경우 선택되어 있는 체크박스가 없게 하기 위해 false로 초기화.
		let copy = [...data];
		copy.map((v, i) => {
			v.checkBoxState = false;
		});
		setData(copy);
	};

	// 취소 클릭
	const hideCheckBox = e => {
		setCheckBoxMode(e);
	};

	//전체 선택 클릭
	const selectAll = () => {
		//v.checkBoxState = !v.checkBoxState와 같이 할 경우 체크 박스 값들이 각각 다를 경우 그것의 반대로만 변경 될 뿐 모두 선택되거나 모두 취소 되지 않음.
		setSelectCNT(selectCNT + 1);
		let copy = [...data];
		copy.map((v, i) => {
			//카운트의 2로 나눈 나머지값을 이용해서 전체 선택 혹은 전체 취소가 되도록 함.
			// selectCNT % 2 == 0 ? (v.checkBoxState = true) : (v.checkBoxState = false);
			v.checkBoxState = !v.checkBoxState;
		});
		setAcceptAllState(!acceptAllState);
		setData(copy);
	};

	// 삭제 클릭
	const deleteSelectedItem = () => {
		console.log('삭제시작');
		let filtered_array = [...data];
		filtered_array = filtered_array.filter(e => e.checkBoxState == false);
		setData(filtered_array);
		setIsDeleted(true);
	};

	//CheckBox 클릭 시
	const onCheckBox = (item, index) => {
		let copy = [...data];
		copy[index].checkBoxState = !copy[index].checkBoxState;
		setData(copy);
	};

	//썸네일 클릭
	const navigationGo = (status, user_id, item) => {
		let sexValue = '';
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: item.protect_request_writer_id._id,
				protect_request_status: 'all',
				protect_request_object_id: null,
				request_number: 10,
			},
			result => {
				switch (item.protect_animal_sex) {
					case 'male':
						sexValue = '남';
						break;
					case 'female':
						sexValue = '여';
						break;
					case 'male':
						sexValue = '성별모름';
						break;
				}
				const titleValue = item.protect_animal_species + '/' + item.protect_animal_species_detail + '/' + sexValue;
				navigation.push('AnimalProtectRequestDetail', {item: item, list: result.msg, title: titleValue});
			},
			err => {
				console.log('err / getProtectRequestListByShelterId / ProtectRequestList   : ', err);
			},
		);
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			{/* SelectStat	 */}
			<View style={[temp_style.selectstat_view]}>
				<SelectStat
					acceptAllState={acceptAllState}
					onSelectMode={showCheckBox}
					onCancelSelectMode={hideCheckBox}
					onSelectAllClick={selectAll}
					onDeleteSelectedItem={deleteSelectedItem}
				/>
			</View>

			{/* <FlatList> */}
			<View style={[temp_style.AnimalNeedHelpList]}>
				<AnimalNeedHelpList
					data={data}
					checkBoxMode={checkBoxMode}
					// onLabelClick={item => navigation.push('UserProfile', item)}
					onClickLabel={navigationGo}
					onHashClick={item => navigation.push('FeedListForHashTag', item)}
					onCheckBox={onCheckBox}
					isCheckAll={acceptAllState}
					isDeleted={isDeleted}
				/>
			</View>
			{/* </FlatList> */}
		</View>
	);
};
