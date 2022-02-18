import React from 'react';
import {View} from 'react-native';
import {btn_w108} from 'Atom/btn/btn_style';
import {Cross46} from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import CheckBox from 'Molecules/select/CheckBox';
import UserDescriptionLabel from 'Molecules/label/UserDescriptionLabel';
import {organism_style} from 'Organism/style_organism';
import {useNavigation} from '@react-navigation/native';
import {controllableAccount} from 'Organism/style_organism copy';

/**
 *
 * @param {{
 * data : 'Object / UserDescriptionLabel Data 필요',
 * onFollowBtnClick: void,
 * onClickLabel :void,
 * showCheckBox : boolean,
 * showCheckBox :boolean,
 * showButtons : boolean
 * }} props
 */
export default ControllableAccount = props => {
	// console.log('props.data', props.data);
	const navigation = useNavigation();
	const [showCheckBox, setShowCheckBox] = React.useState(props.showCheckBox); // Label 좌측 CheckBox 출력 Boolean
	const [showCrossMark, setShowCrossMark] = React.useState(props.showCrossMark); // 팔로잉 버튼 우측 Cross 출력 Boolean
	const [following, setFollowing] = React.useState(false);

	//팔로우 버튼 클릭
	const onClickFollowBtn = () => {
		setFollowing(!following);
		props.onClickFollowBtn();
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
		<View style={[controllableAccount.container]}>
			{showCheckBox ? (
				<View style={[controllableAccount.check50]}>
					<CheckBox />
				</View>
			) : (
				false
			)}
			<View style={[showCheckBox || showCrossMark ? controllableAccount.userDescriptionLabel_checked : controllableAccount.userDescriptionLabel]}>
				<UserDescriptionLabel data={props.data} onClickLabel={onClickLabel} width={300} />
			</View>
			{props.showButtons && false ? (
				<View style={[controllableAccount.rightContainer]}>
					<View style={[controllableAccount.btn_w108_controllableAccount]}>
						{following ? (
							<AniButton btnTitle={'팔로우'} btnTheme={'gray'} btnStyle={'border'} btnLayout={btn_w108} onPress={onClickFollowBtn} />
						) : (
							<AniButton btnTitle={'팔로잉'} btnLayout={btn_w108} onPress={onClickFollowBtn} />
						)}
					</View>
					{showCrossMark ? (
						<View style={[organism_style.cross46, controllableAccount.cross46]}>
							<Cross46 onPress={onPressCrossMark} />
						</View>
					) : null}
				</View>
			) : null}
		</View>
	);
};
ControllableAccount.defaultProps = {
	onClickFollowBtn: e => console.log(e),
	onClickLabel: e => console.log(''),
	onPressCrossMark: e => {},
	showCrossMark: false,
	showCheckBox: false,
	showButtons: true,
};
