import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {login_style, temp_style, protectRequestList_style} from 'Templete/style_templete';
import AnimalNeedHelpList from 'Organism/list/AnimalNeedHelpList';
import {PROTECT_STATUS} from 'Root/i18n/msg';
import {getProtectRequestListByShelterId} from 'Root/api/shelterapi';
import Modal from 'Root/component/modal/Modal';
import {txt} from 'Root/config/textstyle';
import {getPettypes} from 'Root/api/userapi';
import {Filter60Border, Filter60Filled, NewMeatBall60} from 'Root/component/atom/icon';
import ArrowDownButton from 'Root/component/molecules/button/ArrowDownButton';
import {btn_w306_h68} from 'Root/component/atom/btn/btn_style';

// ShelterMenu - 보호요청 올린 게시글 클릭
// params - 로그인한 보호소 유저의 _id
export default ShelterProtectRequests = ({route, navigation}) => {
	const [protectAnimalList, setProtectAnimalList] = React.useState([]); // AnimalNeedHelpList 내가 올린 보호요청 게시글 목록 리스트
	const [filterStatus, setFilterStatus] = React.useState('all');
	const [filterSpecies, setFilterSpecies] = React.useState('');
	const [petTypes, setPetTypes] = React.useState(['동물종류']);
	const [filterIcon, setFilterIcon] = React.useState(false);
	const filterRef = React.useRef();

	React.useEffect(() => {
		// Modal.popNoBtn('잠시만 기다려주세요.');
		getProtectRequestListByShelterId(
			{
				shelter_userobject_id: route.params,
				protect_request_status: filterStatus,
				protect_request_object_id: null,
				request_number: 10,
			},
			result => {
				// console.log('result / getProtectRequestList / ShelterProtectRequests', result.msg[3].protect_animal_id.protect_animal_sex);
				if (filterSpecies) {
					const filtered = result.msg.filter(e => e.protect_animal_species == filterSpecies);
					// console.log('SEX : ', filtered[3].protect_animal_id);
					// filtered.protect_animal_sex = filtered.protect_animal_id.protect_animal_sex;
					setProtectAnimalList(filtered);
				} else {
					setProtectAnimalList(result.msg);
				}
				// Modal.close();
			},
			err => {
				console.log('err / getProtectReqeustListByShelterId / ShelterProtectRequest', err);
				if (err == '검색 결과가 없습니다.') {
					setProtectAnimalList([]);
				}
				// Modal.close();
			},
		);
	}, [filterSpecies, filterStatus]);

	React.useEffect(() => {
		getPettypes(
			{},
			types => {
				const species = [...petTypes];
				types.msg.map((v, i) => {
					species[i + 1] = v.pet_species;
				});
				setPetTypes(species);
			},
			err => Modal.alert(err),
		);
	}, []);

	//보호 게시글 목록의 라벨 클릭 콜백
	const onClickLabel = (status, user_id, item) => {
		navigation.push('ProtectRequestManage', {item: item, list: protectAnimalList});
	};

	//보호게시글 목록의 즐겨찾기 태그
	const onFavoriteTag = (state, index) => {
		console.log('state Favorite Tag', state); //state
	};

	//화면 좌측 상단 필터드롭다운
	const onSelectFilter = (v, i) => {
		let filter = v;
		i == 0 ? setFilterSpecies('') : setFilterSpecies(filter);
	};

	//화면 우측상단 요청게시글 상태 선택 드롭다운
	const onSelectMeatball = (v, i) => {
		//입양가능 , 협의중 , 완료
		switch (i) {
			case 0:
				setFilterStatus('rescue');
				break;
			case 1:
				setFilterStatus('discuss');
				break;
			case 2:
				setFilterStatus('complete');
				break;
			default:
				break;
		}
	};

	const onFilterOn = () => {
		setFilterIcon(!filterIcon);
		filterRef.current.measure((fx, fy, width, height, px, py) => {
			// console.log('px', px);
			// console.log('py', py);
			if (!filterIcon) {
				Modal.popRadioSelect(
					{x: px, y: py},
					PROTECT_STATUS,
					'정렬',
					selected => {
						switch (selected) {
							case 0:
								setFilterStatus('rescue');
								break;
							case 1:
								setFilterStatus('discuss');
								break;
							case 2:
								setFilterStatus('complete');
								break;
							default:
								break;
						}
						setFilterIcon(false);
						Modal.close();
					},
					() => {
						setFilterIcon(false);
						Modal.close();
					},
				);
			}
		});
	};

	const onSelectKind = kind => {
		Modal.popSelectScrollBoxModal(
			[petTypes],
			'동물 종류 선택',
			selected => {
				selected == '동물종류' ? setFilterSpecies('') : setFilterSpecies(selected);
				Modal.close();
			},
			() => {
				Modal.close();
			},
		);
	};

	const whenEmpty = () => {
		return <Text style={[txt.roboto28b, {marginTop: 50, textAlign: 'center'}]}>보호 요청 게시목록이 없습니다. </Text>;
	};

	return (
		<View style={[login_style.wrp_main, {flex: 1}]}>
			<View style={[temp_style.filterbutton_view, protectRequestList_style.filterbutton_view]}>
				<View style={[temp_style.filterbutton]}>
					<ArrowDownButton
						onPress={onSelectKind}
						btnTitle={filterSpecies || '동물종류'}
						btnLayout={btn_w306_h68}
						btnStyle={'border'}
						btnTheme={'gray'}
					/>
				</View>
				<View style={[temp_style.meatball50]}>
					{filterIcon ? (
						<Filter60Filled onPress={onFilterOn} />
					) : (
						<View style={[protectRequestList_style.shadow]} collapsable={false} ref={filterRef}>
							<Filter60Border onPress={onFilterOn} />
						</View>
					)}
				</View>
			</View>
			<ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
				<ScrollView horizontal={true} scrollEnabled={false}>
					<View style={[protectRequestList_style.listContainer]}>
						<AnimalNeedHelpList data={protectAnimalList} onClickLabel={onClickLabel} onFavoriteTag={onFavoriteTag} whenEmpty={whenEmpty()} />
					</View>
				</ScrollView>
			</ScrollView>
		</View>
	);
};
