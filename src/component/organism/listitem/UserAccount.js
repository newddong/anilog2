import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {btn_w108} from 'Atom/btn/btn_style';
import AniButton from 'Molecules/button/AniButton';
import CheckBox from 'Molecules/select/CheckBox';
import HashLabel from 'Molecules/label/HashLabel';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import {userAccount} from 'Organism/style_organism copy';

/**
 * 친구 즐겨찾기 Hash와 유저오브젝트 리스트 출력 컴포넌트
 * @param {object} props - Props Object
 * @param {object} props.data - 친구 아이템 데이터
 * @param {void} props.onHashClick - 해쉬 라벨 클릭
 * @param {void} props.onLabelClick - 유저 라벨 클릭
 * @param {void} props.onClickFollow - 팔로우, 팔로잉 버튼 클릭
 * @param {boolean} props.checkBoxMode - 선택 삭제 모드 여부 (default = false)
 * @param {boolean} props.checkBoxState - 선택 여부 (default = false)
 */
export default UserAccount = props => {
	// console.log('UserAccount item', props.data);
	const [followState, setFollowState] = React.useState(true);

	const getLabel = () => {
		if (props.data.type === 'UserObject') {
			return <UserDescriptionLabel data={props.data} onClickLabel={e => props.onLabelClick(e)} />;
		} else if (props.data.type === 'HashTagObject') {
			return (
				<TouchableOpacity onPress={() => props.onHashClick()}>
					<HashLabel keyword={props.data.hashtag_keyword} keywordBold={props.data.keywordBold} count={props.data.hashtag_feed_count} />
				</TouchableOpacity>
			);
		}
	};

	//팔로우 버튼 클릭
	const onClickFollow = () => {
		setFollowState(!followState);
		props.onClickFollow(followState);
	};

	return (
		<View style={[userAccount.container, {}]}>
			{/* {console.log(`props.checkBoxMode=>${props.checkBoxMode}`)}
			{console.log(`props.data.checkBoxState=>${props.data.checkBoxState}`)} */}
			{/* CheckBox */}
			{props.checkBoxMode ? (
				<View style={[userAccount.checkBox]}>
					<CheckBox
						state={props.data.checkBoxState}
						onCheck={() => props.onCheckBox(props.data.type == 'HashTagObject' ? props.data.keyword : props.data.user_nickname)}
					/>
				</View>
			) : (
				false
			)}
			{/* UserLabel */}
			<View style={[userAccount.userProfileContainer]}>{getLabel()}</View>
			{props.showFollowBtn && (
				<View
					onPress={onClickFollow}
					style={[props.checkBoxMode ? userAccount.followingBtnContainer : userAccount.followingBtnContainer_noneCheckBox]}>
					{props.data.follow || props.data.is_follow ? (
						<AniButton onPress={onClickFollow} btnTitle={'팔로잉'} btnTheme={'shadow'} btnStyle={'border'} btnLayout={btn_w108} />
					) : (
						<AniButton onPress={onClickFollow} btnTitle={'팔로우'} btnTheme={'shadow'} btnLayout={btn_w108} />
					)}
				</View>
			)}
		</View>
	);
};

UserAccount.defaultProps = {
	onLabelClick: e => console.log(e),
	onClickFollow: e => console.log(e),
	onCheckBox: e => console.log(e),
	checkBoxMode: false,
	checkBoxState: false,
	showFollowBtn: false,
};
