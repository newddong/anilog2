import React from 'react';
import {View} from 'react-native';
import {btn_w108} from 'Atom/btn/btn_style';
import {Cross46} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import CheckBox from 'Molecules/select/CheckBox';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import {organism_style} from 'Organism/style_organism';
import {controllableAccount} from 'Organism/style_organism copy';
import userGlobalObject from 'Root/config/userGlobalObject';

/**
 *
 * @param {{
 * data : 'Object / UserDescriptionLabel Data 필요',
 * onFollowBtnClick: void,
 * onClickUnFollowBtn : void,
 * onClickLabel :void,
 * showCheckBox : boolean,
 * showCheckBox :boolean,
 * showButtons : boolean
 * showFollowStatusText : boolean
 * }} props
 */
export default ControllableAccount = props => {
	// console.log('props.data', props.showButtons);
	const [showCheckBox, setShowCheckBox] = React.useState(props.showCheckBox); // Label 좌측 CheckBox 출력 Boolean
	const [showCrossMark, setShowCrossMark] = React.useState(props.showCrossMark); // 팔로잉 버튼 우측 Cross 출력 Boolean
	const isMyAccount = props.data._id == userGlobalObject.userInfo._id;

	//팔로우 버튼 클릭
	const onClickFollowBtn = () => {
		props.onClickFollowBtn();
	};

	const onClickUnFollowBtn = () => {
		props.onClickUnFollowBtn();
	};

	//지우기 버튼 클릭
	const onPressCrossMark = () => {
		props.onPressCrossMark(props.data);
	};

	//프로필 라벨 클릭
	const onClickLabel = data => {
		// navigation.push('UserProfile', {userobject: data});
		props.onClickLabel(data);
	};

	return (
		<View style={[controllableAccount.container, {}]}>
			{showCheckBox ? (
				<View style={[controllableAccount.check50]}>
					<CheckBox />
				</View>
			) : (
				false
			)}
			<View style={[showCheckBox || showCrossMark ? controllableAccount.userDescriptionLabel_checked : controllableAccount.userDescriptionLabel]}>
				<UserDescriptionLabel
					data={props.data}
					onClickLabel={onClickLabel}
					width={props.width || 480}
					showFollowStatusText={props.showFollowStatusText}
				/>
			</View>
			{props.showButtons && !isMyAccount ? (
				<View style={[controllableAccount.rightContainer]}>
					<View style={[controllableAccount.btn_w108_controllableAccount]}>
						{props.data.follow ? (
							<AniButton btnTitle={'팔로잉'} btnLayout={btn_w108} btnStyle={'border'} onPress={onClickUnFollowBtn} />
						) : (
							<AniButton btnTitle={'팔로우'} btnLayout={btn_w108} onPress={onClickFollowBtn} />
						)}
					</View>
					{showCrossMark ? (
						<View style={[organism_style.cross46, controllableAccount.cross46]}>
							<Cross46 onPress={onPressCrossMark} />
						</View>
					) : (
						<></>
					)}
				</View>
			) : (
				<></>
			)}
		</View>
	);
};
ControllableAccount.defaultProps = {
	onClickFollowBtn: e => console.log(e),
	onClickUnFollowBtn: e => console.log(e),
	onClickLabel: e => console.log(''),
	onPressCrossMark: e => {},
	showCrossMark: false,
	showCheckBox: false,
	showButtons: false,
	showFollowStatusText: false,
};
