import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, TouchableOpacity, FlatList, View} from 'react-native';
import DP from 'Root/config/dp';
import {APRI10, BLACK, WHITE} from 'Root/config/color';
import {
	CommunityIcon,
	CommunityIcon_GRAY,
	FeedIcon,
	FeedIcon_GRAY,
	ProtectRequestIcon,
	ProtectRequestIcon_GRAY,
	TagIcon,
	TagIcon_GRAY,
} from 'Root/component/atom/icon';

/**
 * 커스텀 탭 (메인색깔로 채워진 스타일)
 * @param {object} props - Props Object
 * @param {object} props.items- 탭 네비게이션에 담길 목록
 * @param {number} props.defaultIndex - 탭의 처음 선택 아이템 인덱스
 * @param {(item:object,index:number)=>void} props.onSelect - 탭 클릭할 때 동작하는 콜백, 선택한 탭의 인덱스 반환
 */
const ProfileTabSelect = props => {
	const [selected, setSelected] = React.useState(0);
	const onSelect = (item, index) => {
		setSelected(index); //새로만들어진 배열로 state 변경
		props.onSelect(item, index);
	};

	const getIcon = (item, index) => {
		switch (item) {
			case '피드':
				return index == selected ? <FeedIcon /> : <FeedIcon_GRAY />;
			case '태그':
				return index == selected ? <TagIcon /> : <TagIcon_GRAY />;
			case '커뮤니티':
				return index == selected ? <CommunityIcon /> : <CommunityIcon_GRAY />;
			case '보호동물':
				return index == selected ? <ProtectRequestIcon /> : <ProtectRequestIcon_GRAY />;
			default:
				break;
		}
	};

	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity
				onPress={() => onSelect(item, index)}
				style={{
					width: (750 * DP) / props.items.length,
					height: 78 * DP,
					paddingHorizontal: 0 * DP,
					justifyContent: 'center',
				}}>
				<View
					style={{
						borderRadius: 30 * DP,
						borderWidth: 2 * DP,
						borderColor: index == selected ? 'black' : WHITE,
						width: (750 * DP) / props.items.length - 20 * DP,
						height: 78 * DP,
						alignItems: 'center',
						alignSelf: 'center',
						justifyContent: 'center',
					}}>
					{getIcon(item, index)}
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList data={props.items} renderItem={renderItem} horizontal={true} scrollEnabled={false} inndica showsHorizontalScrollIndicator={false} />
	);
};

ProfileTabSelect.defaultProps = {
	items: [1, 2, 3], //FlatList에 담길 배열 정보
	onSelect: e => console.log(e), //Tab Press 이벤트
};
export default ProfileTabSelect;
