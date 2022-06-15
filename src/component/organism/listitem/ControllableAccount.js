import React from 'react';
import {StyleSheet, View} from 'react-native';
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
		<View style={[style.container]}>
			{showCheckBox ? (
				<View style={[style.check50]}>
					<CheckBox />
				</View>
			) : (
				false
			)}
			<View style={[showCheckBox || showCrossMark ? style.userDescriptionLabel_checked : style.userDescriptionLabel]}>
				<UserDescriptionLabel
					data={props.data}
					onClickLabel={onClickLabel}
					width={props.width || 480}
					showFollowStatusText={props.showFollowStatusText}
				/>
			</View>
			{props.showButtons && !isMyAccount ? (
				<View style={[style.rightContainer]}>
					<View style={[style.btn_w108_controllableAccount]}>
						{props.data.follow ? (
							<AniButton btnTitle={'팔로잉'} btnLayout={btn_w108} btnStyle={'border'} onPress={onClickUnFollowBtn} />
						) : (
							<AniButton btnTitle={'팔로우'} btnLayout={btn_w108} onPress={onClickFollowBtn} />
						)}
					</View>
					{showCrossMark ? (
						<View style={[style.cross46]}>
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

const style = StyleSheet.create({
	container: {
		width: 694 * DP,
		flexDirection: 'row',
		paddingBottom: 40 * DP,
		alignItems: 'center',
	},
	userDescriptionLabel: {
		width: 480 * DP,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	userDescriptionLabel_checked: {
		width: 400 * DP,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	rightContainer: {
		// height: 94 * DP,
		position: 'absolute',
		right: 0,
		flexDirection: 'row',
	},
	btn_w108_controllableAccount: {
		height: 94 * DP,
		marginLeft: 10 * DP,
	},
	cross46: {
		marginLeft: 10 * DP,
	},
	check50: {
		alignSelf: 'center',
	},
});
