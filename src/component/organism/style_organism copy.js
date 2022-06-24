import {StyleSheet} from 'react-native';
import {APRI10, GRAY10, GRAY20, GRAY30, GRAY40, MAINBLACK, WHITE} from 'Root/config/color';
import DP from 'Root/config/dp';

export const BGCOLOR = '#B5DED8';
export const temp_text = StyleSheet.create({
	small: {
		fontSize: 10,
	},
});

export const organism_style = StyleSheet.create({
	feedContent: {
		width: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EDE8A6',
	},
	userLocationLabel_view_feedContent: {
		width: 654 * DP,
		marginTop: 78 * DP,
		backgroundColor: '#0F0000',
	},
	userLocationLabel_feedContent: {
		width: 448 * DP,
		backgroundColor: '#0FA743',
	},
	feed: {
		width: 750 * DP,
		height: 1222 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	feedMedia: {
		width: 750 * DP,
		height: 1222 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#C1DAF6',
	},
	likeCommentButtons: {
		width: 750 * DP,
		height: 1222 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#C1DAF6',
	},
	likeCommentInfo: {
		width: 750 * DP,
		height: 1222 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#C1DAF6',
	},
	recentComment: {
		width: 750 * DP,
		height: 1222 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#C1DAF6',
	},
	petAccountList: {
		width: 614 * DP,
		height: 94 * DP,
		marginBottom: 30 * DP,
		flexDirection: 'row',
	},
	petLabel: {
		marginBottom: 40 * DP,
	},
	accountList: {
		width: 750 * DP,
		// marginBottom: 80 * DP,
	},
	accountListItem: {
		width: 654 * DP,
		height: 120 * DP,
		// marginLeft: 48 * DP,
		marginBottom: 20 * DP,
		justifyContent: 'center',
		borderColor: WHITE,
		borderWidth: 5 * DP,
		borderRadius: 30 * DP,
	},
	userDescriptionLabelContainer: {
		paddingLeft: 15 * DP,
	},
	cross46: {
		width: 46 * DP,
		height: 46 * DP,
		marginLeft: 20 * DP,
		alignSelf: 'center',
	},
	hashLabel: {
		width: 654 * DP,
		height: 94 * DP,
	},
});

export const controllableAccount = StyleSheet.create({
	container: {
		width: 694 * DP,
		flexDirection: 'row',
		paddingBottom: 40 * DP,
		alignItems: 'center',
	},
	userDescriptionLabel: {
		width: 460 * DP,
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
		height: 54 * DP,
		marginLeft: 10 * DP,
		alignSelf: 'center',
	},
	cross46: {
		marginLeft: 10 * DP,
	},
	check50: {
		alignSelf: 'center',
	},
});

export const controllableAccountList = StyleSheet.create({
	container: {
		width: 750 * DP,
		marginTop: 30 * DP,
		alignSelf: 'center',
	},
	title: {
		marginLeft: 48 * DP,
		height: 42 * DP,
		marginBottom: 16 * DP,
	},
	no_selectedItem: {},
	selectedItem: {
		// borderColor: APRI10,
		borderRadius: 40 * DP,
		// borderWidth: 2 * DP,
	},
});

export const controllableHashTag = StyleSheet.create({
	container: {
		width: 654 * DP,
		flexDirection: 'row',
		marginBottom: 40 * DP,
		alignSelf: 'center',
	},
	hashLabel: {
		width: 596 * DP,
		backgroundColor: 'pink',
	},
	hashLabel_uncheked: {
		width: 566 * DP,
		backgroundColor: 'pink',
	},
	check50: {
		width: 80 * DP,
		alignSelf: 'center',
	},
	cross46: {
		marginLeft: 20 * DP,
		alignSelf: 'center',
	},
});

export const controllableHashTagList = StyleSheet.create({
	container: {
		width: 654 * DP,
		backgroundColor: '#DEB5B5',
		alignSelf: 'center',
	},
	title: {
		width: 300 * DP,
		height: 42 * DP,
		marginBottom: 16 * DP,
		backgroundColor: GRAY30,
	},
});

export const accountHashList = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
		marginTop: 20 * DP,
		// marginBottom: 100 * DP,
		// backgroundColor: BGCOLOR,
	},
	userAccount: {
		width: 750 * DP,
		height: 94 * DP,
		marginBottom: 40 * DP,
	},
});

export const hashTagList = StyleSheet.create({
	container: {
		width: 654 * DP,
		marginBottom: 40 * DP,
		alignSelf: 'center',
	},
	hashLabel: {
		width: 654 * DP,
		height: 94 * DP,
		marginBottom: 40 * DP,
	},
});

export const phoneNumVerification = StyleSheet.create({
	container: {
		width: 654 * DP,
		// height: 402 * DP, //UX 변경으로 인한 주석처리 (22.02.03 - 상우)
		backgroundColor: WHITE,
	},
	input30: {
		height: 82 * DP,
		marginBottom: 60 * DP,
	},
	inputWithSelect: {
		// height: 82 * DP,
		marginBottom: 50 * DP,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	phoneNumValidPassedText: {
		// width: 654 * DP,
		alignSelf: 'flex-end',
		right: 60 * DP,
		color: 'red',
		// backgroundColor: 'yellow',
		paddingLeft: 10 * DP,
		marginTop: -40 * DP,
		marginBottom: 10 * DP,
	},
	inputTimeLimitContainer: {
		flexDirection: 'row',
		marginTop: 40 * DP,
	},
	inputTimeLimit: {
		width: 388 * DP,
		height: 118 * DP,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	btn_w226: {
		position: 'absolute',
		right: 0,
		top: 10 * DP,
		// marginLeft: 40 * DP,
	},
});

export const emailVerification = StyleSheet.create({
	container: {
		width: 654 * DP,
		height: 402 * DP,
		backgroundColor: WHITE,
	},
	input30: {
		height: 82 * DP,
		marginBottom: 60 * DP,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	inputWithSelect: {
		height: 82 * DP,
		marginBottom: 60 * DP,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	inputTimeLimit: {
		width: 388 * DP,
		height: 118 * DP,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	btn_w226: {
		position: 'absolute',
		right: 0,
		top: 10 * DP,
		// marginLeft: 40 * DP,
	},
});

export const passwordChecker_style = StyleSheet.create({
	container_initMode: {
		width: 654 * DP,
		height: 406 * DP,
	},
	container_resetMode: {
		width: 654 * DP,
		height: 634 * DP,
		// backgroundColor: 'yellow',
	},
	passwordInput_resetMode: {
		marginBottom: 80 * DP,
	},
	passwordInput_initMode: {
		marginBottom: 90 * DP,
	},
});

export const socialInfoA = StyleSheet.create({
	container: {
		width: 366 * DP,
		height: 84 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	socialInfo: {
		width: 100 * DP,
		height: 84 * DP,
		marginRight: 30 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	number: {
		height: 38 * DP,
	},
	title: {
		height: 46 * DP,
	},
});

export const socialInfoB = StyleSheet.create({
	container: {
		// width: 500 * DP,
		width: 366 * DP,
		height: 106 * DP,
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	socialInfo: {
		width: 82 * DP,
		width: 96 * DP,

		marginRight: 60 * DP,
		justifyContent: 'center',
		// alignItems: 'center',
	},
	number: {
		marginLeft: -13.5 * DP,
		alignSelf: 'center',
		width: 130 * DP,
		height: 50 * DP,
		textAlign: 'center',
		// backgroundColor: 'yellow',
	},
	title: {
		alignSelf: 'stretch',
		height: 46 * DP,
		width: 82 * DP,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		// alignContent: 'flex-start',
		// backgroundColor: 'purple',
	},
});

export const profileMenu = StyleSheet.create({
	container: {
		width: 750 * DP,
		// marginBottom: 20 * DP,
	},
	upperMenu: {},
	lowerMenu: {
		marginTop: 10 * DP,
	},
	titleContainer: {
		height: 82 * DP,
		flexDirection: 'row',
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
		alignItems: 'center',
		paddingLeft: 48 * DP,
	},
	title: {
		width: 200 * DP,
		height: 42 * DP,
		paddingLeft: 12 * DP,
	},
	bottomeContainer: {},
	itemContainer: {
		paddingHorizontal: 28 * DP,
	},
	item_step1: {
		flexDirection: 'row',
		height: 76 * DP,
		// backgroundColor: 'pink',
	},
	item: {
		width: 310 * DP,
		height: 48 * DP,
		// marginLeft: 16 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
		// backgroundColor: 'red',
	},
	item_text: {
		width: 270 * DP,
		height: 50 * DP,
		// marginRight: 52 * DP,
		justifyContent: 'center',
		// backgroundColor: 'yellow',
		alignSelf: 'center',
	},
	item_bracket: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: 100 * DP,
		height: 50 * DP,
		right: 30 * DP,
	},
	horizon_separator: {
		width: 362 * DP,
		height: 2 * DP,
		marginLeft: 6 * DP,
		marginRight: 7 * DP,
		backgroundColor: GRAY40,
	},
	vertical_separator: {
		width: 2 * DP,
		height: 64 * DP,
		marginTop: 6 * DP,
		marginHorizontal: 16 * DP,
		// marginLeft: 12 * DP,
		// marginRight: 16 * DP,
		backgroundColor: GRAY40,
	},
});

export const myPetList = StyleSheet.create({
	container: {
		width: 750 * DP,
		height: 270 * DP,
		paddingLeft: 28 * DP,
		flexDirection: 'row',
	},
	petImageLabel: {
		width: 180 * DP,
		height: 270 * DP,
		marginLeft: 30 * DP,
	},
	addPet: {
		marginLeft: 20 * DP,
	},
});

export const interestTagList = StyleSheet.create({
	container: {
		width: 654 * DP,
	},
	titleContainer: {
		width: 654 * DP,
		height: 70 * DP,
		marginTop: 20 * DP,
		flexDirection: 'row',
	},
	title: {
		width: 226 * DP,
		height: 48 * DP,
		alignSelf: 'center',
	},
	btn_w226: {
		marginLeft: 234 * DP,
	},
	interestingTagList: {
		width: 606 * DP,
		height: 102 * DP,
		marginLeft: 44 * DP,
		marginTop: 20 * DP,
	},
	tagContainer: {
		height: 68 * DP,
		paddingHorizontal: 20 * DP,
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY30,
		marginRight: 15 * DP,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
	cross52: {
		marginLeft: 20 * DP,
	},
});

export const addressInput = StyleSheet.create({
	container: {
		width: 654 * DP,
		height: 238 * DP,
	},
	upperContainer: {
		width: 654 * DP,
		flexDirection: 'row',
	},
	titleContainer: {
		flexDirection: 'row',
		height: 46 * DP,
	},
	lowerContainer: {},
	input24A: {
		width: 388 * DP,
		alignSelf: 'flex-start',
	},
	btn_w226: {
		// marginBottom: 10 * DP,
		marginTop: 10 * DP,
		// backgroundColor: 'yellow',
		// marginTop: 60 * DP,
	},
	inputNoTitle: {
		marginTop: 24 * DP,
	},
});

export const vaccination = StyleSheet.create({
	container: {
		width: 654 * DP,
		// backgroundColor: '#0000FF',
	},
	insideContainer: {
		marginVertical: 40 * DP,
		// backgroundColor: '#FFFF00',
	},
	titleContainer: {
		width: 654 * DP,
		height: 46 * DP,
		alignSelf: 'center',
		flexDirection: 'row',
		// backgroundColor: '#FFFF00',
	},
	title: {
		width: 216 * DP,
		// height: 46 * DP,
		marginRight: 14 * DP,
	},
	titleMenu: {
		width: 186 * DP,
		// height: 38 * DP,
		marginLeft: 26 * DP,
		alignSelf: 'center',
		alignItems: 'center',
	},
	itemContainer: {
		width: 654 * DP,
		height: 46 * DP,
		marginTop: 20 * DP,
		alignSelf: 'center',
		flexDirection: 'row',
		// backgroundColor: '#00FF00',
	},
	item_name: {
		width: 216 * DP,
		height: 46 * DP,
		marginRight: 14 * DP,
	},
	current_dueDate: {
		width: 186 * DP,
		height: 38 * DP,
		marginLeft: 26 * DP,
		borderRadius: 10 * DP,
		backgroundColor: APRI10,
		alignSelf: 'center',
		alignItems: 'center',
	},
	next_dueDate: {
		width: 186 * DP,
		height: 38 * DP,
		marginLeft: 26 * DP,
		borderRadius: 10 * DP,
		backgroundColor: GRAY40,
		alignSelf: 'center',
		alignItems: 'center',
	},
	separator: {
		width: 654 * DP,
		height: 3 * DP,
		backgroundColor: APRI10,
	},
});

export const shelterLabel = StyleSheet.create({
	container: {
		width: 178 * DP,
		height: 260 * DP,
	},
	profileImageMedium: {
		alignSelf: 'center',
	},
	shelterInfo: {
		width: 178 * DP,
		height: 120 * DP,
		alignItems: 'center',
	},
});

export const shelterList = StyleSheet.create({
	container: {
		width: 654 * DP,
		height: 260 * DP,
	},
	shelterLabel: {
		marginRight: 22 * DP,
	},
});

export const companionForm = StyleSheet.create({
	container: {
		width: 702 * DP,
		height: 324 * DP,
		borderRadius: 40 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	insideContainer: {
		width: 634 * DP,
		height: 234 * DP,
	},
	upperMenu: {
		width: 634 * DP,
		height: 122 * DP,
		flexDirection: 'row',
	},
	lowerMenu: {
		width: 634 * DP,
		height: 82 * DP,
		marginTop: 30 * DP,
		alignItems: 'center',
	},
	inputItem: {
		width: 204 * DP,
		marginRight: 11 * DP,
	},
	fieldName: {
		width: 204 * DP,
		height: 40 * DP,
	},
	dropDownSelect: {
		width: 204 * DP,
		height: 82 * DP,
	},
});

export const companionFormList = StyleSheet.create({
	container: {
		width: 702 * DP,
	},
	companionFormContainer: {
		marginBottom: 26 * DP,
		marginTop: 10 * DP,
	},
});

export const assignCheckListItem = StyleSheet.create({
	container: {
		width: 694 * DP,
		// height: 50 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	check50: {
		width: 50 * DP,
		height: 50 * DP,
	},
	textContainer: {
		width: 592 * DP,
		// height: 72 * DP,
		marginLeft: 12 * DP,
		justifyContent: 'center',
	},
	detailText: {
		position: 'absolute',
		right: 0,
	},
});

export const assignCheckList = StyleSheet.create({
	container: {
		width: 654 * DP,
		height: 72 * DP,
		flexDirection: 'row',
	},
	assignCheckListItem: {
		marginBottom: 50 * DP,
	},
});

export const protectedPetList = StyleSheet.create({
	container: {
		marginTop: 20 * DP,
		justifyContent: 'center',
		height: 252 * DP,
	},
	itemContainer: {
		width: 184 * DP,
		height: 204 * DP,
		marginRight: 30 * DP,
		alignItems: 'center',
	},
	petProfileImageMedium: {
		width: 120 * DP,
		height: 120 * DP,
	},
	petProfileInfo: {
		width: 184 * DP,
		height: 84 * DP,
		alignItems: 'center',
	},
	nicknameCont: {
		width: 150 * DP,
	},
	addressCont: {
		width: 150 * DP,
		color: GRAY10,
		textAlign: 'center',
	},
});

export const aidRequest = StyleSheet.create({
	container: {
		width: 672 * DP,
		height: 192 * DP,
		justifyContent: 'center',
	},
	numberContainer: {
		width: 56 * DP,
		height: 56 * DP,
		position: 'absolute',
		right: 0,
		top: 0,
		// paddingLeft: 10 * DP,
		borderRadius: 50 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
	},
	insideContainer: {
		width: 654 * DP,
		// height: 174 * DP,
		flexDirection: 'row',
		borderRadius: 30 * DP,
		// backgroundColor: 'red',
		borderColor: APRI10,
		borderWidth: 10 * DP,
	},
	leftContainer: {},
	img_irregular_174: {
		width: 174 * DP,
		height: 174 * DP,
	},
	gender: {
		position: 'absolute',
		right: 10 * DP,
		top: 10 * DP,
		zIndex: 1,
	},
	rightContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	right_insideContainer: {
		width: 440 * DP,
		height: 138 * DP,
		marginHorizontal: 15 * DP,
		// backgroundColor: 'pink',
	},
	right_upperMenu: {
		width: 440 * DP,
		height: 44 * DP,
		// backgroundColor: GRAY30,
	},
	right_middleMenu: {
		width: 440 * DP,
		height: 36 * DP,
		marginTop: 12 * DP,
		flexDirection: 'row',
		// backgroundColor: 'wheat',
	},
	right_middleMenu_title: {
		height: 36 * DP,
		// backgroundColor: 'lavender',
	},
	right_middleMenu_content: {
		height: 36 * DP,
		// backgroundColor: 'palegreen',
		paddingRight: 10 * DP,
		marginLeft: 10 * DP,
		marginRight: 10 * DP,
	},
	right_middleMenu_content_text: {
		lineHeight: 36 * DP,
	},
	right_lowerMenu: {
		width: 440 * DP,
		height: 36 * DP,
		marginTop: 12 * DP,
		flexDirection: 'row',
		// backgroundColor: 'lightgray',
	},
	borderColor_APRI10: {
		borderWidth: 2 * DP,
		borderColor: GRAY30,
	},
	borderColor_GRAY10: {
		borderWidth: 1 * DP,
		borderColor: GRAY30,
	},
	img_irregular_174_border: {
		width: 174 * DP,
		height: 174 * DP,
		borderTopLeftRadius: 25 * DP,
		borderBottomLeftRadius: 25 * DP,
	},
	saved_location_text: {
		maxWidth: 200 * DP,
		lineHeight: 36 * DP,
		// textAlignVertical: 'center',
	},
});

export const aidRequestList = StyleSheet.create({
	container: {
		width: 750 * DP,
	},
	itemContainer: {
		alignSelf: 'center',
		marginBottom: 20 * DP,
	},
	addProtectedPetContainer: {
		width: 654 * DP,
		height: 174 * DP,
		borderRadius: 30 * DP,
		marginRight: 14 * DP,
		borderColor: APRI10,
		borderWidth: 2 * DP,
		marginTop: 30 * DP,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	addProtectedPet_insideContainer: {
		height: 64 * DP,
		flexDirection: 'row',
	},
	addProtectedPetText: {
		marginLeft: 10 * DP,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: APRI10,
	},
	aidRequestListCont: {
		width: 750 * DP,
		marginTop: 20 * DP,
	},
	needPostText: {
		width: 654 * DP,
		height: 40 * DP,
		paddingRight: 5 * DP,
		// backgroundColor: 'yellow',
	},
});

export const volunteerItem = StyleSheet.create({
	container: {
		width: 654 * DP,
		height: 94 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	labelContainer: {
		width: 510 * DP,
		// backgroundColor: 'palegreen',
	},
	expected_activityDate: {
		// width: 112 * DP,
		// backgroundColor: 'yellow',
		height: 70 * DP,
		alignItems: 'flex-end',
		alignSelf: 'center',
	},
});

export const volunteerItemList = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
	},
	itemContainer: {
		width: 654 * DP,
		height: 94 * DP,
		marginBottom: 40 * DP,
	},
});

export const animalInfo = StyleSheet.create({
	container: {
		width: 654 * DP,
		height: 180 * DP,
		flexDirection: 'row',
	},
	infoContainer: {
		width: 434 * DP,
		height: 132 * DP,
		marginLeft: 40 * DP,
		alignSelf: 'center',
	},
	infoContainer_petNickname: {
		height: 46 * DP,
		maxWidth: 420 * DP,
	},
	infoContainer_petDetail: {
		height: 38 * DP,
	},
});

export const animalInfoList = StyleSheet.create({
	container: {
		// width: 750 * DP,
		// height: 723 * DP,
	},
	itemContainer: {
		width: 750 * DP,
		height: 180 * DP,
		marginBottom: 30 * DP,
		backgroundColor: 'white',
	},
});

export const selectedMediaList = StyleSheet.create({
	container_410: {
		height: 410 * DP,
	},
	container_190: {
		height: 190 * DP,
	},
	itemContainer: {
		// width: 190 * DP,
		// height: 190 * DP,
		marginRight: 30 * DP,
		marginLeft: 0 * DP,
		backgroundColor: 'white',
	},
});

export const animalNeedHelp = StyleSheet.create({
	container: {
		// width: 654 * DP,
		// height: 214 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		item_bracket: '#FF00FF',
	},
	container_seleted: {
		width: 702 * DP,
		height: 374 * DP,
		borderRadius: 30 * DP,
		borderWidth: 5 * DP,
		borderColor: APRI10,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	checkBoxContainer: {
		width: 80 * DP,
		// marginLeft: 48 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#00FF00',
	},
	protectedThumbnail_container: {
		width: 214 * DP,
		height: 214 * DP,
	},
	gender: {
		width: 48 * DP,
		height: 48 * DP,
		position: 'absolute',
		right: 10 * DP,
		top: 10 * DP,
	},
	detailContainer: {
		width: 380 * DP,
		height: 214 * DP,
		marginLeft: 30 * DP,
		// marginTop: 10 * DP,
	},
	detail_upperMenu: {
		width: 410 * DP,
		// height: 48 * DP,
		flexDirection: 'row',
	},
	detail_upper_petStateContainer: {
		height: 38 * DP,
		flexDirection: 'row',
	},
	detail_upper_petState: {
		height: 38 * DP,
		borderRadius: 12 * DP,
		borderWidth: 2 * DP,
		borderColor: GRAY10,
		paddingHorizontal: 10 * DP,
		marginRight: 12 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	petStatusContainer_text: {
		color: GRAY10,
		lineHeight: 30 * DP,
	},
	detail_upper_tag: {
		width: 48 * DP,
	},
	detail_lowerMenu: {
		width: 410 * DP,
		height: 214 * DP,
		paddingVertical: 4 * DP,
	},
	lowerMenu_kindAndBreed: {
		height: 50 * DP,
		// justifyContent: 'center',
		marginBottom: -5 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
	breedText: {
		alignSelf: 'center',
		marginLeft: 20 * DP,
		maxWidth: 250 * DP,
	},
	lowerMenu_helpDetail: {
		// height: 38 * DP,
		// marginTop: 10 * DP,
		// backgroundColor: 'yellow',
	},
	container_with_Line: {
		width: 705 * DP,
		height: 500 * DP,
		borderRadius: 30 * DP,
		borderWidth: 5 * DP,
		borderColor: APRI10,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		marginLeft: 100 * DP,
	},
	sideBtn_view: {
		width: 614 * DP,
		height: 70 * DP,
		marginTop: 30 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	container_basicInfo: {
		flexDirection: 'row',
		// backgroundColor: '#FF00FF',
	},
	container_basicInfo_seleted: {
		flexDirection: 'row',
	},
});

export const animalNeedHelpList = StyleSheet.create({
	container: {
		width: 750 * DP,
		// marginTop: 20 * DP,
	},
	container_bordermode: {
		width: 750 * DP,
		marginBottom: 40 * DP,
		// marginTop: 20 * DP,
	},
	itemContainer: {
		alignItems: 'center',
		width: 654 * DP,
		alignSelf: 'center',
		flexDirection: 'row',
		marginBottom: 40 * DP,
	},
});

export const animalProtectDetail = StyleSheet.create({
	container: {
		alignSelf: 'center',
		marginBottom: 50 * DP,
	},
	animalNeedHelp_container: {
		marginBottom: 10 * DP,
	},
	details_container: {
		width: 654 * DP,
		// paddingBottom: 100 * DP,
	},
	detail: {
		width: 654 * DP,
		marginTop: 40 * DP,
	},
	detail_icon48: {
		width: 48 * DP,
		height: 48 * DP,
	},
	detail_title: {
		width: 590 * DP,
		height: 40 * DP,
		marginLeft: 16 * DP,
		alignSelf: 'center',
	},
	detail_content: {
		width: 550 * DP,
		marginTop: 6 * DP,
		marginLeft: 64 * DP,
		minHeight: 50 * DP,
	},
});

export const familyAccountList = StyleSheet.create({
	itemContainer: {
		width: 654 * DP,
		height: 94 * DP,
		marginBottom: 30 * DP,
		flexDirection: 'row',
	},
	profileImageSmall: {
		width: 94 * DP,
		height: 94 * DP,
	},
	userIDContainer: {
		width: 456 * DP,
		height: 42 * DP,
		marginLeft: 30 * DP,
		alignSelf: 'center',
	},
	cross52: {
		marginLeft: 24 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const familyAccountList_style = StyleSheet.create({
	itemContainer: {
		width: 654 * DP,
		height: 94 * DP,
		marginBottom: 30 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	profileImageSmall: {
		width: 94 * DP,
		height: 94 * DP,
	},
	userIDContainer: {
		width: 456 * DP,
		height: 42 * DP,
		marginLeft: 30 * DP,
		alignSelf: 'center',
	},
	cross52: {
		marginLeft: 24 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const userAccount = StyleSheet.create({
	container: {
		width: 694 * DP,
		height: 94 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
	},
	checkBox: {
		width: 80 * DP,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	userProfileContainer: {
		width: 442 * DP,
		height: 94 * DP,
	},
	followingBtnContainer: {
		justifyContent: 'center',
		marginLeft: 20 * DP,
	},
	followingBtnContainer_noneCheckBox: {
		justifyContent: 'center',
		marginLeft: 100 * DP,
	},
});

export const selectStat = StyleSheet.create({
	container: {
		width: 654 * DP,
		height: 94 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		borderBottomColor: GRAY30,
		borderBottomWidth: 2 * DP,
		flexDirection: 'row',
	},
	selectstat_view: {
		width: 750 * DP,
		height: 100 * DP,
		alignItems: 'center',
	},
	rightContainer: {
		flexDirection: 'row',
		position: 'absolute',
		right: 0,
	},
	selectstat: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 42 * DP,
	},
	textBtn: {
		width: 120 * DP,
		height: 42 * DP,
		alignItems: 'center',
	},
	vertical_stick: {
		width: 2,
		height: 34 * DP,
		alignSelf: 'center',
		backgroundColor: APRI10,
	},
});

export const feedText = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: 654 * DP,
	},
});

export const stagebar_style = StyleSheet.create({
	backgroundBar: {
		width: 400 * DP,
		height: 20 * DP,
		backgroundColor: 'white',
		borderRadius: 20 * DP,
		borderWidth: 4 * DP,
		// borderColor: APRI10,
		borderColor: MAINBLACK,
	},
	insideBar: {
		width: 80 * DP,
		height: 20 * DP,
		// backgroundColor: APRI10,
		borderRadius: 18 * DP,
		backgroundColor: MAINBLACK,
	},
	text: {
		marginLeft: 18 * DP,
		width: 40 * DP,
		height: 32 * DP,
		marginBottom: 0 * DP,
		color: GRAY10,
	},
});
