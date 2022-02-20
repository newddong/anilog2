import {StyleSheet} from 'react-native';
import {
	MAINCOLOR,
	LINK,
	GRAY,
	GRAY_TXT_INPUT,
	GRAY_PLACEHOLDER,
	WHITE,
	RED,
	GRAY_BRIGHT,
	RED10,
	GRAY20,
	BLUE20,
	APRI10,
	GRAY10,
	GRAY40,
	GRAY30,
	APRI20,
} from 'Root/config/color';
import DP from 'Root/config/dp';
import {Platform} from 'react-native';
export const login_style = StyleSheet.create({
	wrp_main: {
		// flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: '#FFF',
	},
	contents: {
		// flex: 1,
		flexDirection: 'column',
		// marginHorizontal: 48 * DP,
		backgroundColor: WHITE,
	},
	txt_msg: {
		width: 654 * DP,
		height: 214 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	verification: {
		width: 654 * DP,
		height: 402 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#A07A7A',
	},
	form: {
		width: 654 * DP,
		marginBottom: 70 * DP,
	},
	pass_form: {
		width: 654 * DP,
	},
	shelter_form: {
		width: 654 * DP,
	},
	cntr_txt_input: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	tab: {
		marginTop: 58 * DP,
		height: 88 * DP,
		flexDirection: 'row',
	},
	input_num_verify: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	msg_pop: {
		width: 550 * DP,
		height: 126 * DP,
		backgroundColor: WHITE,
		opacity: 0.9,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30 * DP,
		borderBottomRightRadius: 0,
		position: 'absolute',
		top: 390 * DP,
		left: 52 * DP,
	},
	confirm_status: {
		height: 114 * DP,
		borderTopWidth: 2 * DP,
	},
	sctn_shelter_first: {
		alignItems: 'center',
		marginBottom: 132 * DP,
		justifyContent: 'flex-end',
	},
	assign_profile: {},
	petTypeSelection: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 40 * DP,
		marginTop: 70 * DP,
		justifyContent: 'space-between',
	},
	petSexSelection: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	basic_info: {
		flexDirection: 'row',
		width: 562 * DP,
		height: 40 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	social_info: {
		width: 410 * DP,
		height: 130 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	outside_main: {
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#FF00FF',
	},
});

export const btn_style = StyleSheet.create({
	btn_w194: {
		width: 194 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn_w654: {
		width: 654 * DP,
		height: 104 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#DEB5B5',
	},
	btn_w522: {
		width: 522 * DP,
		height: 92 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	queryBtn: {
		alignItems: 'flex-end',
		width: 654 * DP,
		height: 50 * DP,
	},
	btn_w242: {
		width: 242 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#FBE0AF',
	},
	btn_w280: {
		width: 280 * DP,
	},
	btn_w114: {
		width: 114 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#FBE0AF',
	},
	btn_w226: {
		width: 226 * DP,
		// height: 70 * DP,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	btn_w176: {
		width: 176 * DP,
		height: 70 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const temp_style = StyleSheet.create({
	passwordChecker: {
		width: 654 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	without_login: {
		width: 750 * DP,
		height: 316 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#7E94D0',
	},

	stageBar: {
		width: 654 * DP,
		height: 32 * DP,
	},
	agreementCheckList: {
		width: 654 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabSelectBorder_Type1: {
		width: 654 * DP,
		height: 88 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textMassage: {
		width: 654 * DP,
		height: 214 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textMassageLeftTop: {
		width: 654 * DP,
		height: 214 * DP,
		alignItems: 'baseline',
		justifyContent: 'flex-start',
		paddingTop: 10,
	},
	phoneNumVerification: {
		width: 654 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textMsg: {
		width: 654 * DP,
		height: 352 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input30: {
		width: 654 * DP,
		height: 82 * DP,
		// backgroundColor: '#DEB5B5',
	},
	textMsg_AssignUserHabitation: {
		width: 654 * DP,
		height: 128 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DBD3EB',
	},
	textMsg_AssignUserProfileImage: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	input30_assignUserProfileImage: {
		width: 654 * DP,
		height: 204 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputForm_assignShelterAddress: {
		width: 654 * DP,
		height: 420 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DEB5B5',
	},
	inputForm_ApplyCompanionA: {
		width: 654 * DP,
		height: 450 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input24A_assignShelterAddress: {
		width: 654 * DP,
		height: 112 * DP,
	},
	addressInput: {
		width: 654 * DP,
		// height: 238 * DP,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	inputWithSelect_assignShelterInformation: {
		width: 654 * DP,
		height: 122 * DP,
	},
	input24A_applyCompanionA: {
		width: 654 * DP,
		// height: 122 * DP,
	},
	datePicker_assignShelterInformation: {
		width: 654 * DP,
		height: 122 * DP,
	},
	passwordChecker: {
		width: 654 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	profileImageSelect: {
		width: 294 * DP,
		height: 294 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	profileNicknameChange: {
		width: 654 * DP,
		height: 380 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input24_changeUserProfileImage: {
		width: 654 * DP,
		// height: 168 * DP,
		height: 130 * DP,
	},
	input30_changePetProfileImage: {
		width: 654 * DP,
		// height: 118 * DP,
		height: 236 * DP,
	},
	passwordChecker_changePassword: {
		width: 654 * DP,
		height: 634 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputForm_userInfoDetailSettting: {
		width: 654 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#A07A7A',
	},
	text_userInfoDetailSettting: {
		width: 118 * DP,
		height: 46 * DP,
		// backgroundColor: '#E0A8A8',
	},
	tabSelectFilled_Type1: {
		width: 520 * DP,
		height: 82 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#EDEDED',
	},
	tabSelectFilled_Type2: {
		width: 750 * DP,
		// height: 78 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
	},
	inputWithSearchIcon: {
		width: 654 * DP,
		height: 82 * DP,
	},
	accountList: {
		width: 674 * DP,
		// height: 496 * DP,
	},
	userInfo: {
		width: 654 * DP,
		// height: 194 * DP,
		// alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#BCC0DC',
	},
	profileImageLarge: {
		width: 194 * DP,
		height: 194 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#D1E7F1',
	},

	userMenu_step2: {
		width: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#7F8EF3',
	},
	userMenu_step3: {
		width: 750 * DP,
		height: 316 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#7F8EF3',
	},
	userMenu_step4: {
		width: 750 * DP,
		height: 154 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#7F8EF3',
	},
	userInfoSetting_step1: {
		width: 750 * DP,
		height: 364 * DP,
		alignItems: 'center',
		// backgroundColor: '#94ACA0',
	},
	userInfoSetting_step2: {
		width: 750 * DP,
		// height: 522 * DP,
		alignItems: 'center',
		// backgroundColor: '#B3EBB5',
	},
	accountInfo: {
		flexDirection: 'column',
		width: 750 * DP,
		height: 152 * DP,
		// backgroundColor: '#B3EBB5',
	},
	title: {
		width: 200 * DP,
		height: 46 * DP,
		// backgroundColor: '#AFBCE1',
	},
	petImageLabel: {
		width: 190 * DP,
		height: 190 * DP,
		alignItems: 'center',
	},
	feedThumbnailList: {
		width: 750 * DP,
		marginBottom: 100 * DP,
		// height: 1032 * DP,
		// alignItems: 'center',
	},
	topTabNavigation_filled: {
		width: 750 * DP,
		height: 72 * DP,
		alignItems: 'center',
	},
	topTabNavigation_border: {
		width: 750 * DP,
		height: 70 * DP,
		alignItems: 'center',
	},
	onOffSwitch: {
		width: 84 * DP,
		height: 36 * DP,
	},
	controllableAccountList: {
		width: 654 * DP,
		marginTop: 30 * DP,
		alignItems: 'center',
	},
	petAccountList: {
		width: 614 * DP,
		alignItems: 'center',
	},
	controllableHashTagList: {
		width: 300 * DP,
		height: 36 * DP,
		marginTop: 20 * DP,
		marginLeft: 48 * DP,
	},
	hashTagList: {
		width: 750 * DP,
		marginTop: 20 * DP,
	},
	filterBtn: {
		width: 306 * DP,
		height: 60 * DP,
		alignItems: 'center',
		marginRight: 42 * DP,
	},
	animalNeedHelpList: {
		width: 654 * DP,
		alignSelf: 'center',
		backgroundColor: '#FFF',
	},
	animalNeedHelp: {
		width: 654 * DP,
		height: 214 * DP,
		backgroundColor: '#B5DED8',
		marginBottom: 30 * DP,
	},
	shelterList: {
		width: 654 * DP,
		height: 260 * DP,
		backgroundColor: '#ACC9CB',
	},
	companionFormList: {
		width: 702 * DP,
	},
	assignCheckList: {
		width: 654 * DP,
	},
	inputLongText: {
		width: 710 * DP,
		height: 424 * DP,
		backgroundColor: 'white',
	},
	animalProtectDetails: {
		width: 750 * DP,
		// height: 1316 * DP,
	},
	img_square_750: {
		width: 750 * DP,
		height: 750 * DP,
		backgroundColor: '#B0C7D8',
	},
	mediaSelect: {
		width: 750 * DP,
		minHeight: 674 * DP,
		backgroundColor: GRAY20,
	},
	inputWithSelect: {
		width: 654 * DP,
		// height: 122 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	feedContent: {
		width: 654 * DP,
		// height: 260 * DP,
		// backgroundColor: '#A07A7A',
		alignItems: 'center',
		justifyContent: 'center',
	},
	commentList: {
		width: 654 * DP,
		// marginTop: 12 * DP,
		// backgroundColor: '#ff00ff',
	},
	floatingBtn: {
		flexDirection: 'column',

		width: 110 * DP,
		height: 110 * DP,
	},
	editComment: {},
	aidRequest: {
		// width: 654 * DP,
		accountInfo_depth2: {
			flexDirection: 'row',
		},
	},
	accountInfo_depth2: {
		flexDirection: 'row',
	},
	user_email_userInfoSetting: {
		width: 442 * DP,
		height: 36 * DP,
		// backgroundColor: '#D19F9F',
	},
	changePassword_userInfoSetting: {
		width: 212 * DP,
		height: 64 * DP,
		// backgroundColor: '#D19F9F',
	},
	vertical_border: {
		width: 750 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: '#EDEDED',
	},
	detailInfo: {
		flexDirection: 'row',
		width: 750 * DP,
		height: 126 * DP,
		// backgroundColor: '#B3EBB5',
	},
	bracket48: {
		width: 70 * DP, //원래 50
		height: 70 * DP,
		// backgroundColor: '#8F8065',
	},
	introduceInfo: {
		flexDirection: 'column',
		width: 750 * DP,
		// backgroundColor: '#B3EBB5',
	},
	introduceInfo_depth1: {
		flexDirection: 'row',
		width: 750 * DP,
		height: 116 * DP,
		// backgroundColor: '#B3EBB5',
	},
	userText_userInfoSetting: {
		width: 650 * DP,
		// height: 82 * DP,
		// backgroundColor: '#AFD5FB',
	},
	myPetList: {
		width: 750 * DP,
		height: 378 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#7F8EF3',
	},
	myPetList_title: {
		width: 750 * DP,
		height: 116 * DP,
		// backgroundColor: '#7F8EF3',
	},
	myPetList_myPetList: {
		width: 750 * DP,
		height: 262 * DP,
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: '#AFBCE1',
	},
	title_userInfoSetting: {
		width: 200 * DP,
		height: 46 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#AFBCE1',
	},
	textMsg_assignPetProfileImage: {
		width: 654 * DP,
		height: 76 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputForm_assignPetProfileImage: {
		width: 654 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input30_assignPetProfileImage: {
		width: 654 * DP,
		height: 82 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkBox_assignPetProfileImage: {
		width: 526 * DP,
		height: 50 * DP,
	},
	textMsg_assignPetInfo: {
		width: 654 * DP,
		height: 36 * DP,
	},
	assignPetInfoA: {
		width: 654 * DP,
		height: 330 * DP,
	},
	assignPetInfoB: {
		width: 654 * DP,
		height: 224 * DP,
	},
	inputForm_assignPetInfo_line1: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 82 * DP,
		alignItems: 'center',
	},
	inputForm_assignPetInfo_line2: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 82 * DP,
		alignItems: 'center',
	},
	inputForm_assignPetInfo_line3: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 46 * DP,
		alignItems: 'center',
	},
	text_assignPetInfo: {
		width: 118 * DP,
		height: 46 * DP,
	},
	dropdownSelect_assignPetInfo_depth1: {
		width: 204 * DP,
		height: 82 * DP,
	},
	dropdownSelect_assignPetInfo_depth2: {
		width: 292 * DP,
		height: 82 * DP,
	},
	feedMedia: {
		width: 750 * DP,
		height: 750 * DP,
		backgroundColor: '#B0C7D8',
	},
	feedTextEdit: {
		width: 654 * DP,
		// minHeight: 376 * DP,
		marginTop: 40 * DP,
		backgroundColor: 'white',
		alignSelf: 'center',
		borderWidth: 2 * DP,
		borderColor: APRI10,
		borderRadius: 24 * DP,
		padding: 24 * DP,
	},
	selectedMediaList: {
		width: 654 * DP,
		height: 190 * DP,
	},
	dropdownSelect: {
		width: 292 * DP,
		height: 82 * DP,
	},
	input24: {
		width: 654 * DP,
		height: 122 * DP,
	},
	inputBalloon: {
		width: 654 * DP,
		height: 276 * DP,
	},
	inputNoTitle: {
		width: 438 * DP,
		height: 82 * DP,
	},
	profileInfo: {
		width: 750 * DP,
		height: 416 * DP,
		backgroundColor: '#B0C7D8',
	},
	// animalNeedHelpList: {
	// 	width: 750 * DP,
	// 	height: 770 * DP,
	// },
	radioBox_assignPetInfo: {
		width: 520 * DP,
		height: 46 * DP,
	},
	btn_w226_assignPetInfo: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 70 * DP,
	},
	datePicker_assignPetInfo_depth1: {
		width: 290 * DP,
		height: 82 * DP,
	},
	text218_assignPetInfo: {
		width: 218 * DP,
		height: 36 * DP,
	},
	inputNoTitle_assignPetInfo: {
		height: 82 * DP,
	},
	text68_assignPetInfo: {
		width: 68 * DP,
		height: 46 * DP,
	},
	selectedMediaList_assignProtectAnimal: {
		width: 654 * DP,
		height: 410 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#A07A7A',
	},
	textMsg_assignProtectAnimal: {
		width: 654 * DP,
		height: 36 * DP,
		justifyContent: 'center',
		backgroundColor: '#FFF',
	},
	image_assignProtectAnimal: {
		flexDirection: 'row',
		width: 160 * DP,
		height: 54 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#C8FBD2',
	},
	btn_w226_assignProtectAnimal: {
		width: 654 * DP,
		height: 70 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	inputForm_assignProtectAnimal_line1: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 82 * DP,
		alignItems: 'center',
	},
	text118_assignProtectAnimal: {
		width: 118 * DP,
		height: 46 * DP,
		backgroundColor: '#B1B6F0',
	},
	datePicker_assignProtectAnimal_depth1: {
		width: 520 * DP,
		height: 82 * DP,
		backgroundColor: '#FFF',
	},
	inputForm_assignProtectAnimal: {
		width: 654 * DP,
		height: 224 * DP,
		backgroundColor: '#FFF',
		marginTop: 70 * DP,
	},
	dropdownSelect_assignProtectAnimalInfo: {
		width: 160 * DP,
		height: 82 * DP,
		backgroundColor: '#B1B6F0',
	},
	text64_assignProtectAnimal: {
		width: 64 * DP,
		height: 46 * DP,
		backgroundColor: '#B1B6F0',
	},
	inputForm_assignProtectAnimal_line2: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 82 * DP,
		alignItems: 'center',
	},
	selectstat_view: {
		width: 654 * DP,
		height: 100 * DP,
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
		borderRightWidth: 2 * DP,
	},
	AnimalNeedHelpList: {
		width: 750 * DP,
		// height: 1324 * DP,
		marginTop: 40 * DP,
		marginBottom: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',

		// backgroundColor: '#F2C2C2',
	},
	FeedThumbnailList: {
		width: 750 * DP,
		marginTop: 10 * DP,
		marginLeft: 12 * DP,
		// height: 1324 * DP,
	},
	baseFlatList: {
		width: 750 * DP,
	},
	animalProtectDetails_protectApplyForm: {
		width: 654 * DP,
		height: 1316 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#C4C483',
	},
	animalProtectDetails_adoptorInformation: {
		width: 750 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	aidRequestList_aidRequestManage: {
		width: 750 * DP,
		// height: 1384 * DP,
		shadowColor: APRI10,
		shadowOpacity: 0.27,
		shadowRadius: 2,
		shadowOffset: {
			width: 2,
			height: 1,
		},
		elevation: 2,
		alignItems: 'center',
	},
	filterbutton_view: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#FFF',
	},
	filterbutton: {
		width: 306 * DP,
		backgroundColor: '#FFF',
	},
	meatball50: {
		width: 50 * DP,
		height: 50 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF',
	},
	baseFlatList_protectRequestList: {
		width: 750 * DP,
		// height: 1286 * DP,
		marginBottom: 70 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF',
	},
	rescueContentScroll_view: {
		width: 654 * DP,
		// height: 1254 * DP,
	},
	requestProtect_view: {
		width: 654 * DP,
		height: 67 * DP,
	},
	requestProtect: {
		width: 95 * DP,
		height: 36 * DP,
		marginTop: 30 * DP,
	},
	rescueContentTitle: {
		width: 654 * DP,
		marginBottom: 30 * DP,
	},
	shelterSmallLabel_view_animalProtectRequestDetail: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 84 * DP,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	shelterSmallLabel_animalProtectRequestDetail: {
		width: 516 * DP,
		height: 88 * DP,
		// backgroundColor: 'yellow',
	},
	button_animalProtectRequestDetail: {
		width: 126 * DP,
		height: 84 * DP,
		flexDirection: 'row',
	},
	rescueSummary: {
		width: 654 * DP,
		height: 202 * DP,
		borderWidth: 4 * DP,
		borderColor: APRI10,
		borderRadius: 40 * DP,

		alignItems: 'center',
		justifyContent: 'center',
	},
	rescueText: {
		width: 654 * DP,
		height: 160 * DP,
	},
	comment_count_view: {
		width: 654 * DP,
		height: 36 * DP,
		marginTop: 70 * DP,
	},
	comment_count: {
		width: 148 * DP,
		height: 46 * DP,
	},
	writeComment: {
		width: 654 * DP,
		height: 80 * DP,
		marginTop: 58 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#E3A0A0',
	},
	addMoreRequest_view: {
		width: 654 * DP,
		height: 118 * DP,
	},
	addMoreRequest: {
		width: 186 * DP,
		height: 36 * DP,
		marginTop: 82 * DP,
	},
	floatingBtnAapply: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 170 * DP,
		backgroundColor: '#E1BDE2',
	},
	accountInfo_shelterInfoSetting_view: {
		height: 206 * DP,
	},
	introduce_shelterInfoSetting_view: {
		minHeight: 200 * DP,
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	introduce_infoSetting_view: {
		flexDirection: 'column',
		height: 558 * DP,
		alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: '#FF00FF',
	},
	title_shelterInfoSetting_view: {
		flexDirection: 'row',
		width: 654 * DP,
		marginTop: 40 * DP,
	},
	title_shelterInfoSetting: {
		width: 200 * DP,
		height: 46 * DP,
		backgroundColor: '#FFF',
	},
	accountInfo_email_shelterInfoSetting_view: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 46 * DP,
		justifyContent: 'space-between',
		marginTop: 44 * DP,
		// backgroundColor: '#F6F6E4',
	},
	introduceMent_shelterInfoSetting: {
		alignSelf: 'flex-start',
		width: 630 * DP,
		maxHeight: 180 * DP,
		// height: 82 * DP,
	},
	shlterInfo__shelterInfoSetting_view: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 60 * DP,
		marginTop: 40 * DP,
		// alignItems: 'center',
		justifyContent: 'space-between',
		// backgroundColor: '#FF00FF',
	},
	title_type_shelterInfoSetting_view: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 48 * DP,
		marginTop: 16 * DP,
		justifyContent: 'space-between',
		// backgroundColor: '#FF00FF',
	},
	littleTitle: {
		width: 124 * DP,
		height: 48 * DP,
		backgroundColor: '#FFF',
	},
	littleContents: {
		width: 510 * DP,
		height: 48 * DP,
		backgroundColor: '#FFF',
	},
	address_type_shelterInfoSetting_view: {
		flexDirection: 'row',
		width: 654 * DP,
		marginTop: 16 * DP,
		justifyContent: 'space-between',
		// backgroundColor: '#FF00FF',
	},
	addressContents: {
		width: 510 * DP,
		backgroundColor: '#FFF',
	},
});

export const loginTemplete_style = StyleSheet.create({
	passwordChecker: {
		width: 654 * DP,
		height: 406 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#A07A7A',
	},
	innerContainer: {
		marginTop: 30,
		alignItems: 'center',
	},
	without_login: {
		width: 654 * DP,
		height: 216 * DP,
		marginTop: 80 * DP,
	},
	without_login_text: {
		width: 278 * DP,
		height: 50 * DP,
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	nextBtnView: {
		marginLeft: 20 * DP,
	},
	loginForm: {
		width: 522 * DP,
		height: 346 * DP,
	},
	idInput: {
		marginBottom: 30 * DP,
	},
	pwdInput: {},
	checkBox_loginFormContainer: {
		width: 522 * DP,
		height: 89 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	checkBox_loginForm: {
		width: 432 * DP,
		height: 50 * DP,
		flexDirection: 'row',
	},
	checkBoxContainer: {
		marginTop: 10 * DP,
		marginHorizontal: 20 * DP,
	},
	btn_w522_login: {
		marginTop: 102 * DP,
	},
	btn_w522_assign: {
		marginTop: 50 * DP,
	},
	basic_info: {
		marginTop: 32 * DP,
	},
	social_info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 38 * DP,
	},
	socialLogin_icon: {
		width: 80 * DP,
		height: 80 * DP,
	},
});

export const findAccount_style = StyleSheet.create({
	tabSelectBorder_type1: {
		marginTop: 20 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});

export const agreementCheck_style = StyleSheet.create({
	agreementCheckList: {
		marginTop: 61 * DP,
	},
	btn_w654: {
		width: 660 * DP, // 좌우 끝이 잘리는 현상 보고(from 경진작가님) => 654 보다 조금 더 넓게 수정 (권상우)
		alignSelf: 'center',
		marginTop: 110 * DP,
		marginBottom: 50 * DP,
	},
	horizontalSepartor: {
		width: 654 * DP,
		height: 2 * DP,
		marginVertical: 20 * DP,
		backgroundColor: GRAY30,
	},
});

export const userAssign = StyleSheet.create({
	tabSelectBorder_Type1: {
		marginTop: 30 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
	textMessageInside: {
		width: 414 * DP,
		textAlign: 'left',
		color: GRAY10,
	},
});

export const progressbar_style = StyleSheet.create({
	stageBar: {
		marginTop: 20 * DP,
	},
});

export const userPasswordCheck = StyleSheet.create({
	passwordChecker: {
		marginTop: 112 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});

export const tabSelectBorder_Type1 = StyleSheet.create({
	agreementCheckList: {
		marginTop: 61 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});

export const suggestAssign_style = StyleSheet.create({
	txt_msg: {
		marginTop: 320 * DP,
	},
	btn_w522: {
		marginTop: 110 * DP,
	},
	basic_info: {
		marginTop: 32 * DP,
	},
	social_info: {
		marginTop: 38 * DP,
	},
});

export const passwordReset_style = StyleSheet.create({
	passwordChecker: {
		marginTop: 110 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});

export const shelterCodeCheck_style = StyleSheet.create({
	queryBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: 12 * DP,
	},
	btn_w654: {
		marginTop: 106 * DP,
	},
});

export const assignUserHabitation_style = StyleSheet.create({
	btn_w654: {
		marginTop: 150 * DP,
	},
	textContainer: {
		width: 654 * DP,
	},
	info_text: {
		width: 654 * DP,
		marginTop: 12 * DP,
		color: GRAY10,
		alignSelf: 'flex-start',
	},
	habitationForm: {
		width: 654 * DP,
		height: 366 * DP,
		marginTop: 80 * DP,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export const shelterAssignEntrance_style = StyleSheet.create({
	btn_w522_public: {
		marginTop: 200 * DP,
	},
	btn_w522_private: {
		marginTop: 30 * DP,
	},
});

export const assign_profile = StyleSheet.create({
	cntr_profile: {
		alignSelf: 'center',
		marginVertical: 70 * DP,
		width: 294 * DP,
	},
	img_profile: {
		alignSelf: 'center',
		width: 294 * DP,
		height: 294 * DP,
		borderRadius: 150 * DP,
		backgroundColor: GRAY,
	},
	btn_add: {
		position: 'absolute',
		opacity: 0.8,
		width: 92 * DP,
		height: 92 * DP,
		bottom: 10 * DP,
		right: 10 * DP,
	},
	container_stagebar: {
		width: 654 * DP,
		height: 32 * DP,
		marginTop: 28 * DP,
	},
	stagebar_backgroundBar: {
		borderWidth: 4 * DP,
		borderColor: MAINCOLOR,
		borderRadius: 8 * DP,
		height: 16 * DP,
		marginRight: 18 * DP,
	},
	stagebar_insideBar: {
		backgroundColor: MAINCOLOR,
		borderRadius: 8 * DP,
		height: 16 * DP,
		left: -4 * DP,
	},
});

export const buttonstyle = StyleSheet.create({
	wrp_main: {
		// flex: 1,
		alignItems: 'center',
		backgroundColor: WHITE,
	},

	notcheckButton: {
		width: 50 * DP,
		height: 50 * DP,
		borderRadius: 15 * DP,
		borderWidth: 4 * DP,
		borderColor: '#999999',
		marginRight: 12 * DP,
	},
	checkedButton: {
		width: 50 * DP,
		height: 50 * DP,
		borderRadius: 15 * DP,
		borderWidth: 4 * DP,
		borderColor: '#ff9888',
		marginRight: 12 * DP,
	},
	loginbutton: {
		height: 104 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30 * DP,
		backgroundColor: '#ff9888',
		marginBottom: 42 * DP,
	},
	assignbutton: {
		height: 104 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30 * DP,
		backgroundColor: 'white',
		borderColor: '#ff9888',
		borderWidth: 2,
		marginBottom: 42 * DP,
	},
	socialAppsButton: {
		width: 80 * DP,
		height: 80 * DP,
		marginHorizontal: 15 * DP,
	},
	autologinButton: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginRight: 32 * DP,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		elevation: 2,
	},
});

export const textstyles = StyleSheet.create({
	noto28: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
		includeFontPadding: false,
	},
	noto24: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 24 * DP,
		lineHeight: 42 * DP,
	},
	noto40b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 40 * DP,
	},
	noto32b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 32 * DP,
	},
	noto28b: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 28 * DP,
		lineHeight: 42 * DP,
	},
	roboto28: {
		fontFamily: 'Roboto-Regular',
		fontSize: 28 * DP,
	},
	center: {
		textAlign: 'center',
	},
	link: {
		color: LINK,
	},
	gray: {
		color: GRAY,
	},
	white: {
		color: WHITE,
	},
	red: {
		color: RED,
	},
	salgoo: {
		color: '#ff9888',
	},
});

export const formstyles = StyleSheet.create({
	id_input: {
		width: '100%',
		height: 104 * DP,
		backgroundColor: GRAY_TXT_INPUT,
		paddingHorizontal: 24 * DP,
		paddingVertical: 30 * DP,
		marginBottom: 20 * DP,
	},
	pass_input: {
		width: '100%',
		height: 104 * DP,
		backgroundColor: GRAY_TXT_INPUT,
		paddingHorizontal: 24 * DP,
		paddingVertical: 30 * DP,
	},
	fail_msg: {
		borderTopColor: 'red',
		borderTopWidth: 2 * DP,
		marginBottom: 32 * DP,
	},
	fail_description: {
		marginBottom: 14 * DP,
	},
	select_mobile: {
		flexDirection: 'row',
		borderWidth: 2 * DP,
		borderColor: GRAY_BRIGHT,
		width: 184 * DP,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	input_mobile: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export const layoutstyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: WHITE,
	},
	contents: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: WHITE,
	},
	inputform: {
		marginBottom: 70 * DP,
	},
	textinputContainer: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	autologinContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	socialLinkContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 22 * DP,
		flexDirection: 'row',
	},
	suggestion: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
	},
	container_recaptcha: {
		marginTop: 40 * DP,
		marginBottom: 32 * DP,
	},
	recaptcha: {
		backgroundColor: 'yellow',
		marginBottom: 24 * DP,
		height: 128 * DP,
	},
});

export const verifyuser = StyleSheet.create({
	tab: {
		marginTop: 190 * DP,
		height: 88 * DP,
		flexDirection: 'row',
	},
	btn_tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2 * DP,
		borderColor: MAINCOLOR,
	},
	btn_tab_notselected: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2 * DP,
		borderColor: GRAY_BRIGHT,
	},
	container_msg: {
		height: 234 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export const assignUserProfileImage_style = StyleSheet.create({
	txt_msg: {
		marginTop: 80 * DP,
	},
	profileImageSelect: {
		marginTop: 70 * DP,
	},
	input30: {
		marginTop: 42 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});

export const assignShelterAddress_style = StyleSheet.create({
	textMsg: {
		width: 654 * DP,
		marginTop: 12 * DP,
	},
	input24A: {
		marginTop: 32 * DP,
	},
	addressInput: {
		marginTop: 60 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});
export const assignShelterInformation_style = StyleSheet.create({
	inputFormContainer: {
		width: 654 * DP,
		height: 700 * DP,
		marginTop: 84 * DP,
	},
	textMsg: {
		width: 654 * DP,
		marginTop: 12 * DP,
	},
	inputWithSelect: {
		width: 654 * DP,
		height: 158 * DP,
		justifyContent: 'space-between',
	},
	input24A: {
		width: 654 * DP,
		height: 118 * DP,
		marginTop: 60 * DP,
	},
	inputWithEmail: {
		marginTop: 60 * DP,
	},
	datePicker: {
		marginTop: 60 * DP,
	},
	datePicker: {
		marginTop: 60 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
	emailConfirmMsg: {
		// backgroundColor: 'yellow',
		width: 654 * DP,
		paddingLeft: 20 * DP,
		marginTop: 10 * DP,
	},
	datePickerContainer: {
		width: 654 * DP,
		height: 82 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		paddingVertical: 15 * DP,
		paddingHorizontal: 20 * DP,
	},
});
export const checkShelterPassword_style = StyleSheet.create({
	passwordChecker: {
		marginTop: 110 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});

export const assignShelterProfileImage_style = StyleSheet.create({
	txt_msg: {
		marginTop: 12 * DP,
	},
	profileImageSelect: {
		marginTop: 50 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});

export const changeUserProfileImage_style = StyleSheet.create({
	profileNicknameChange: {
		marginTop: 42 * DP,
	},
	profileImageSelect: {
		marginTop: 50 * DP,
	},
	btn_w654: {
		marginVertical: 110 * DP,
	},
	input24: {
		marginBottom: 80 * DP,
	},
});

export const changePetProfileImage_style = StyleSheet.create({
	ProfileImageSelect: {
		marginTop: 110 * DP,
	},
	input30: {
		marginTop: 70 * DP,
		alignItems: 'center',
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
});

export const changePassword_style = StyleSheet.create({
	passwordChecker: {
		marginTop: 164 * DP,
	},
	btn_w654: {
		marginVertical: 110 * DP,
	},
});

export const userInfoDetailSettting_style = StyleSheet.create({
	inputForm: {
		marginTop: 60 * DP,
	},
	inputForm_detail: {
		flexDirection: 'row',
		marginBottom: 40 * DP,
	},
	text: {
		marginTop: 18 * DP,
		marginRight: 16 * DP,
	},
	inputWithSelect: {
		flexDirection: 'row',
		marginBottom: 52 * DP,
	},
	phone_num_input: {
		width: 520 * DP,
		bottom: 0 * DP,
		height: 80 * DP,
	},
	tagListContainer: {
		width: 654 * DP,
		marginTop: 50 * DP,
	},
	interestTagList: {
		width: 654 * DP,
	},
	adressSelect: {
		flexDirection: 'row',
		width: 654 * DP,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#FFF',
	},
});

export const addFamilyAccount_style = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
	},
	inputWithSearchIcon: {
		marginTop: 20 * DP,
	},
	accountList: {
		width: 730 * DP,
		marginLeft: 48 * DP,
		marginTop: 30 * DP,
	},
	btn_w654: {
		marginTop: 50 * DP,
		marginLeft: 20 * DP,
		marginBottom: 20 * DP,
	},
});

export const userMenu_style = StyleSheet.create({
	container: {
		// height: 1478 * DP,
	},

	userMenu_step1: {
		width: 750 * DP,
		// height: 508 * DP,
		alignItems: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
		// backgroundColor: '#6F9B85',
	},
	user_id: {
		width: 420 * DP,
		height: 48 * DP,
		marginTop: 44 * DP,
	},
	contents: {
		width: 420 * DP,
		// height: 111 * DP,
	},
	socialInfoB: {
		width: 500 * DP,
		height: 106 * DP,
		marginTop: 38 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'yellow',
	},
	userInfo: {
		flexDirection: 'row',
		marginTop: 40 * DP,
	},
	profileImageLarge: {
		// marginRight: 52 * DP,
	},
	btn_w280_view: {
		flexDirection: 'row',
		marginVertical: 40 * DP,
		width: 610 * DP,
		alignItems: 'center',
	},

	btn_w280: {
		flexDirection: 'row',
		marginRight: 50 * DP,
		width: 280 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#BF9547',
	},
	introduceBox: {
		marginTop: 30 * DP,
		flexDirection: 'row',
		width: 492 * DP,
	},
	horizontalLine: {},
});

export const userInfoSetting_style = StyleSheet.create({
	profileImageLarge: {
		marginTop: 40 * DP,
	},
	btn_w242: {
		marginTop: 30 * DP,
	},
	user_email: {
		flexDirection: 'row',
		marginTop: 30 * DP,
		marginLeft: 48 * DP,
	},
	title: {
		marginLeft: 48 * DP,
	},
	changePassword: {
		marginTop: 30 * DP,
	},
	bracket48: {
		marginLeft: 404 * DP,
		marginTop: 56 * DP,
	},
	title_detail: {
		marginLeft: 48 * DP,
		marginTop: 40 * DP,
	},
	userText: {
		marginLeft: 48 * DP,
	},
	btn_w114: {
		marginTop: 40 * DP,
		marginLeft: 364 * DP,
	},
	user_introModifyContainer: {
		height: 140 * DP,
		// borderBottomColor: APRI10,
		// borderBottomWidth: 3 * DP,
	},
	user_intro_modifyMode: {
		// maxHeight: 200 * DP,
		paddingVertical: 10 * DP,
		paddingLeft: 10 * DP,
		color: GRAY10,
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 1 * DP,
		// 	height: 2 * DP,
		// },
		// elevation: 2,
	},
});

export const assignPetProfileImage_style = StyleSheet.create({
	textMsg: {
		marginTop: 12 * DP,
		alignItems: 'flex-start',
	},
	profileImageSelect: {
		marginTop: 50 * DP,
	},
	inputForm: {
		marginTop: 50 * DP,
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
	input30: {
		marginTop: 110 * DP,
	},
	checkBox: {
		flexDirection: 'row',
		marginTop: 20 * DP,
		width: 526 * DP,
		alignSelf: 'flex-start',
		paddingLeft: 20 * DP,
	},
});

export const assignPetInfo_style = StyleSheet.create({
	textMsg: {
		marginTop: 12 * DP,
	},
	inputForm: {
		marginTop: 70 * DP,
	},
	dropdownSelect_depth1: {
		marginLeft: 16 * DP,
	},
	dropdownSelect_depth2: {
		marginLeft: 24 * DP,
	},
	line2: {
		marginTop: 60 * DP,
	},
	tabSelectFilled_Type1: {
		marginLeft: 16 * DP,
	},
	line3: {
		marginTop: 60 * DP,
	},
	btn_w226_viewA: {
		marginTop: 110 * DP,
	},
	btn_w226: {
		marginLeft: 202 * DP,
	},
	datePicker_depth1: {
		marginLeft: 16 * DP,
	},
	text218: {
		marginTop: 46 * DP,
		marginLeft: 12 * DP,
	},
	inputNoTitle: {
		marginLeft: 16 * DP,
	},
	text68: {
		marginLeft: 16 * DP,
	},
	btn_w226_viewB: {
		marginTop: 130 * DP,
	},
	petKind: {
		width: 204 * DP,
		height: 82 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
	},
	pet_species_detail: {
		width: 292 * DP,
		height: 82 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
	},
	petKind_text: {
		width: 120 * DP,
		height: 44 * DP,
		textAlign: 'center',
	},
	pet_species_detail_text: {
		width: 208 * DP,
		height: 44 * DP,
		textAlign: 'center',
	},
});

export const assignProtectAnimal_style = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: 654 * DP,
	},
	textMsg: {
		width: 654 * DP,
		marginTop: 12 * DP,
	},
	selectedMediaList: {
		marginTop: 50 * DP,
		marginLeft: 10 * DP,
		alignSelf: 'flex-start',
	},
	btn_w226_view_image: {
		width: 654 * DP,
		height: 72 * DP,
		flexDirection: 'row',
		// alignItems: 'center',
		marginTop: 70 * DP,
	},
	inputform: {
		marginTop: 60 * DP,
	},
	dropdownSelect_year: {
		marginLeft: 30 * DP,
		width: 160 * DP,
		height: 82 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
		flexDirection: 'row',
	},
	dropdownSelect_month: {
		marginLeft: 50 * DP,
		width: 160 * DP,
		height: 82 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
		flexDirection: 'row',
	},
	weight: {
		flexDirection: 'row',
		height: 82 * DP,
	},
	weightText: {
		marginLeft: 10 * DP,
		alignSelf: 'center',
	},
	btn_w226: {
		width: 226 * DP,
		// height: 70 * DP,
	},
	text118: {
		marginLeft: 10 * DP,
	},
	addPhoto: {
		width: 640 * DP,
		height: 174 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		borderRadius: 40 * DP,
		borderWidth: 4 * DP,
		borderColor: APRI10,
	},
	addPhotoText: {
		textAlignVertical: 'center',
		textAlign: 'center',
		color: APRI10,
		lineHeight: 46 * DP,
		bottom: 2 * DP,
	},
	pic: {
		flexDirection: 'row',
		// width: 654 * DP,
		// marginTop: 40 * DP,
		alignSelf: 'center',
		justifyContent: 'flex-start',
	},
	addpic: {
		color: APRI10,
		marginLeft: 12 * DP,
		alignSelf: 'center',
		top: 5 * DP,
	},
	marginLeft16: {
		marginLeft: 16 * DP,
	},
	width118: {
		width: 118 * DP,
	},
	estimatedAgeContainer: {
		marginLeft: 10 * DP,
	},
	dropdownSelect_year_text: {
		width: 100 * DP,
		height: 44 * DP,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});

export const assignProtectAnimalDate = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'center',
	},
});

export const selectstat_view_style = StyleSheet.create({
	select_all: {
		marginLeft: 268 * DP,
	},
	vertical_stick: {
		marginLeft: 12 * DP,
	},
	delete_selected: {
		marginLeft: 12 * DP,
	},
	selectstat: {
		marginVertical: 38 * DP,
	},
	selecting: {
		marginTop: 38 * DP,
		justifyContent: 'flex-end',
	},
});

export const baseInfo_style = StyleSheet.create({
	list: {
		marginTop: 35 * DP,
	},
	detail: {
		marginTop: 40 * DP,
	},
});
export const animalFromShelter_style = StyleSheet.create({
	container: {
		flex: 0,
		marginTop: 30 * DP,
		alignItems: 'center',
	},
});
export const protectRequestList_style = StyleSheet.create({
	filterbutton_view: {
		marginTop: 40 * DP,
	},
});

export const requestLogin_style = StyleSheet.create({
	txt_msg: {
		marginTop: 326 * DP,
	},
	btn_w522: {
		marginTop: 24 * DP,
	},
	social_info: {},
});

export const temp_txt = StyleSheet.create({
	small: {
		fontSize: 20 * DP,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	medium: {
		fontSize: 40 * DP,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});

export const shelterMenu = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'yellow',
	},
	shelterMenuStep1: {
		backgroundColor: '#FFF',
		width: 750 * DP,
		// height: 550 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
	},
	shelterInfo: {
		backgroundColor: '#FFF',
		width: 654 * DP,
		// height: 194 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	shelterInfo_container: {
		flexDirection: 'row',
	},
	shelterInfo_container_left: {
		width: 194 * DP,
	},
	shelterInfo_container_right: {
		width: 460 * DP,
	},
	shelterInfo_profileImageLarge: {
		width: 194 * DP,
		height: 194 * DP,
		backgroundColor: '#D1E7F1',
		justifyContent: 'center',
		alignItems: 'center',
	},
	shelterInfo_user_id: {
		width: 420 * DP,
		height: 58 * DP,
		// backgroundColor: '#D1E7F1',
		marginTop: 10 * DP,
		alignSelf: 'flex-end',
	},
	shelterInfo_contents: {
		width: 420 * DP,
		// height: 82 * DP,
		// backgroundColor: '#FBC5C5',
		// alignSelf: 'flex-end',
		alignSelf: 'center',
	},
	showMore: {
		width: 400 * DP,
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	socialInfoB_4Items: {
		// backgroundColor: '#B0C0EC',
		width: 662 * DP,
		height: 106 * DP,
		marginTop: 38 * DP,
	},
	btnView: {
		// backgroundColor: '#78BB95',
		// width: 654 * DP,
		// height: 132 * DP,
		marginTop: 40 * DP,
		// paddingTop: 40 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	btnView_btn_w280: {
		width: 280 * DP,
		height: 60 * DP,
		backgroundColor: '#BF9547',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnView_floadAddPet_126x92: {
		width: 126 * DP,
		height: 92 * DP,
		// backgroundColor: '#BF9547',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 82 * DP,
	},
	btnView_floadAddPet_128x68: {
		width: 128 * DP,
		height: 68 * DP,
		// backgroundColor: '#BF9547',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 32 * DP,
	},
	textView_height36: {
		width: 610 * DP,
		height: 36 * DP,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		marginBottom: 40 * DP,
	},
	text36: {
		fontSize: 24 * DP,
		color: APRI10,
	},
	btnView_floadArticle_129x92: {
		width: 126 * DP,
		height: 92 * DP,
		backgroundColor: '#BF9547',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 36 * DP,
	},
	btnView_floadArticle_128x68: {
		width: 128 * DP,
		height: 68 * DP,
		// backgroundColor: '#BF9547',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 40 * DP,
	},
	profileMenu1: {
		backgroundColor: '#FFF',
		width: 750 * DP,
		height: 238 * DP,
		marginTop: 10 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileMenu2: {
		backgroundColor: '#FFF',
		width: 750 * DP,
		height: 238 * DP,
		marginTop: 10 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileMenu3: {
		backgroundColor: '#FFF',
		width: 750 * DP,
		height: 316 * DP,
		marginTop: 10 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileMenu4: {
		backgroundColor: '#FFF',
		width: 750 * DP,
		height: 238 * DP,
		marginTop: 10 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export const shelterInfoSetting = StyleSheet.create({
	container: {
		width: 750 * DP,
		marginBottom: 50 * DP,
	},
	shelterInfoSetting_step1: {
		width: 654 * DP,
		height: 364 * DP,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btn_w242: {
		width: 280 * DP,
		height: 60 * DP,
		alignItems: 'center',
		marginTop: 30 * DP,
	},
	shelterInfoSetting_step2: {
		width: 654 * DP,
		height: 1060 * DP,
		backgroundColor: '#FFF',
	},
	userIntroCont: {
		marginTop: 15 * DP,
		marginBottom: 15 * DP,
	},
	modificationTextInput: {
		paddingLeft: 10 * DP,
		color: GRAY10,
	},
	btn_w114: {
		position: 'absolute',
		right: 0,
	},
	email_view: {
		alignItems: 'center',
	},
	accountInfo: {
		width: 200 * DP,
		height: 46 * DP,
		marginTop: 44 * DP,
	},
	introduceMent: {},
	grayLine: {
		width: 750 * DP,
		borderRightColor: '#EDEDED',
		borderRightWidth: 2 * DP,
	},
	modificationTextCont: {
		height: 140 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 3 * DP,
	},
});

export const editShelterInfo = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#B3EBB5',
		alignItems: 'center',
	},

	shelterInfoForm: {
		width: 654 * DP,
		// backgroundColor: '#A07A7A',
		marginTop: 50 * DP,
	},
	inputCont: {
		flexDirection: 'row',
		height: 82 * DP,
		// backgroundColor: 'yellow',
		// marginBottom: 10 * DP,
	},
	input30WithMsg: {
		flexDirection: 'row',
		// alignSelf: 'center',
		height: 82 * DP,
	},
	inputEmail: {
		flexDirection: 'row',
		height: 82 * DP,
		// backgroundColor: 'yellow',
	},
	btn_w654: {
		marginVertical: 50 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	category: {
		width: 160 * DP,
		// backgroundColor: '#7F8EF3',
		justifyContent: 'center',
	},
	text: {
		width: 144 * DP,
		height: 46 * DP,
		marginRight: 16 * DP,
		// backgroundColor: 'pink',
	},
	emailText: {
		width: 118 * DP,
		height: 46 * DP,
		// backgroundColor: 'pink',
	},
	input30: {
		// width: 520 * DP,
		height: 82 * DP,
		// marginBottom: 50 * DP,
		// justifyContent: 'center',
		// backgroundColor: '#EDEDED',
	},
	inputWithEmail: {
		width: 480 * DP,
		height: 82 * DP,
		// backgroundColor: 'red',
	},
	addressInput: {
		width: 654 * DP,
		height: 236 * DP,
		marginTop: 40 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export const applicationFormVolunteer = StyleSheet.create({
	container: {
		// flex: 1,
		width: 750 * DP,
		alignItems: 'center',
	},
	shelterInfo: {
		width: 702 * DP,
		height: 246 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		marginTop: 30 * DP,
	},
	viewForm: {
		width: 654 * DP,
		marginTop: 40 * DP,
	},
	viewForm_step1: {
		width: 654 * DP,
		height: 52 * DP,
		flexDirection: 'row',
	},
	icon48: {
		width: 48 * DP,
		height: 48 * DP,
	},
	title: {
		width: 590 * DP,
		height: 42 * DP,
		marginLeft: 16 * DP,
		marginTop: 4 * DP,
		marginBottom: 10 * DP,
		flexDirection: 'row',
	},
	viewForm_step2: {
		// width: 540 * DP,
		marginTop: 10 * DP,
		marginLeft: 40 * DP,
		paddingLeft: 20 * DP,
		flexDirection: 'row',
	},
	volunteer_date_input: {
		height: 82 * DP,
		// marginRight: 20 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		justifyContent: 'center',
	},
	wish_date_separator: {
		width: 540 * DP,
		height: 82 * DP,
		marginLeft: 48 * DP,
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomWidth: 4 * DP,
		borderBottomColor: APRI10,
	},
	volunteer_date: {},
	participants: {
		width: 654 * DP,
		marginTop: 40 * DP,
	},
	participants_step1: {
		width: 654 * DP,
		height: 52 * DP,
		flexDirection: 'row',
	},
	participants_step2: {
		width: 450 * DP,
		marginTop: 20 * DP,
	},
	addParticipantBtn: {
		width: 654 * DP,
		paddingLeft: 25 * DP,
		flexDirection: 'row',
	},
	addParticipantTxt: {
		color: APRI10,
		alignSelf: 'center',
		justifyContent: 'center',
		marginLeft: 30 * DP,
	},
	participants_contact: {
		width: 654 * DP,
		height: 42 * DP,
		marginTop: 40 * DP,
	},
	participants_contact_text: {
		width: 590 * DP,
		height: 42 * DP,
		marginTop: 10 * DP,
		paddingLeft: 66 * DP,
	},
	btn_w226: {
		height: 90 * DP,
		marginTop: 110 * DP,
		marginBottom: 66 * DP,
	},
});

export const animalAdoption = StyleSheet.create({
	container: {
		flex: 1,
	},
	congratulatory_message: {
		width: 654 * DP,
		hegiht: 102 * DP,
		backgroundColor: WHITE,
		marginTop: 60 * DP,
	},
	instruction: {
		width: 654 * DP,
		height: 834 * DP,
		marginTop: 20 * DP,
		marginBottom: 60 * DP,
		borderRadius: 40 * DP,
		backgroundColor: 'white',
		alignItems: 'center',
		shadowOffset: {width: 1, height: 1},
		shadowOpacity: 0.5,
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 1 * DP,
		// 	height: 2 * DP,
		// },
		// elevation: 2,
		justifyContent: 'center',
	},
	instruction_text: {
		width: 574 * DP,
		height: 542 * DP,
		alignItems: 'center',
	},
	text_step1: {
		marginBottom: 40 * DP,
		alignItems: 'center',
	},
	instruction_icon: {
		width: 414 * DP,
		height: 142 * DP,
		marginTop: 40 * DP,
		flexDirection: 'row',
	},
	instruction_icon_item: {
		width: 126 * DP,
		height: 142 * DP,
		marginRight: 18 * DP,
		alignItems: 'center',
	},
	instruction_icon_item_text: {
		width: 126 * DP,
		height: 36 * DP,
		textAlign: 'center',
	},
	btn_w522: {
		marginBottom: 50 * DP,
		alignSelf: 'center',
	},
});

export const setPetInformation = StyleSheet.create({
	container: {
		flex: 1,
	},
	inputForm: {
		width: 654 * DP,
		height: 472 * DP,
		marginTop: 60 * DP,
	},
	inputForm_line_layout: {
		flexDirection: 'row',
		marginBottom: 60 * DP,
	},
	inputForm_line_left: {
		width: 136 * DP,
		height: 82 * DP,
	},
	inputForm_line_left_text: {
		width: 118 * DP,
		height: 46 * DP,
		marginTop: 16 * DP,
	},
	datePicker: {
		width: 290 * DP,
		flexDirection: 'row',
	},
	birthTime: {
		width: 218 * DP,
		height: 36 * DP,
		marginLeft: 12 * DP,
		alignSelf: 'flex-end',
	},
	inputNoTitle: {
		// width: 156 * DP,
		// backgroundColor: 'yellow',
	},
	kg: {
		width: 68 * DP,
		height: 46 * DP,
		alignSelf: 'center',
		marginLeft: 16 * DP,
	},
	inputForm_text: {
		width: 134 * DP,
	},
	radioBoxForm: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	radioBox_right: {
		width: 520 * DP,
		height: 50 * DP,
		marginLeft: 10 * DP,
	},
	radioBox_left: {
		width: 118 * DP,
		height: 46 * DP,
	},
	weightInfoText: {
		marginTop: 5 * DP,
	},
	weight_info: {
		color: APRI10,
		// backgroundColor: 'yellow',
	},
});

export const petInfoSetting = StyleSheet.create({
	container: {
		flex: 1,
	},
	profileContainer: {
		width: 750 * DP,
		// height: 344 * DP,
		borderBottomColor: GRAY40,
		borderBottomWidth: 10 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 30 * DP,
		// backgroundColor: 'yellow',
	},
	profileInside: {
		width: 654 * DP,
		// height: 254 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'lightblue',
	},
	petImageLabel: {
		width: 190 * DP,
		height: 190 * DP,
		alignItems: 'center',
		// marginTop: 44 * DP,
	},
	profileEditMark: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
	petInfoContainer: {
		width: 396 * DP,
		// backgroundColor: 'pink',
	},
	petInfo_topside: {
		width: 332 * DP,
		// height: 106 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	petInfo_topside_item: {
		width: 164 * DP,
		// height: 106 * DP,
		alignItems: 'center',
		// backgroundColor: 'blue',
	},
	petInfo_topside_upload: {
		width: 80 * DP,
		height: 85 * DP,
		justifyContent: 'space-between',
		// backgroundColor: 'red',
	},
	petInfo_bottom: {
		width: 394 * DP,
		// height: 80 * DP,
		marginTop: 20 * DP,
		// backgroundColor: 'green',
	},
	user_introBox: {
		height: 80 * DP,
		// backgroundColor: 'yellow',
	},
	petInfo_bottom_showMore: {
		// height: 80 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		// marginRight: 20 * DP,
	},
	btn_w242: {
		marginTop: 30 * DP,
		marginBottom: 40 * DP,
	},
	petAccountInfo: {
		container: {
			width: 750 * DP,
			height: 248 * DP,
			marginTop: 10 * DP,
			borderBottomColor: GRAY30,
			borderBottomWidth: 2 * DP,
			justifyContent: 'center',
			alignItems: 'center',
		},
		insideContainer: {
			width: 654 * DP,
			height: 178 * DP,
		},
		accountInfo_header: {
			width: 200 * DP,
			height: 46 * DP,
		},
		information: {
			width: 654 * DP,
			height: 36 * DP,
			marginTop: 30 * DP,
			flexDirection: 'row',
		},
		infoTitle: {
			width: 130 * DP,
			height: 36 * DP,
		},
		infoContent: {
			color: GRAY10,
		},
	},
	petProfileMenu: {
		container: {

			width: 750 * DP,
			// height: 130 * DP,
			marginTop: 2 * DP,
			paddingVertical: 40 * DP,
			borderBottomColor: GRAY40,
			borderBottomWidth: 2 * DP,
			justifyContent: 'center',
			alignItems: 'center',
			// backgroundColor: 'yellow',
		},
		insideContainer: {
			width: 654 * DP,
			// height: 50 * DP,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		menuTitle: {
			width: 390 * DP,
			height: 46 * DP,
			alignSelf: 'center',
		},
		bracket50: {
			width: 100 * DP,
			height: 60 * DP,
			// marginLeft: 214 * DP,
			justifyContent: 'center',
			alignItems: 'center',
			alignSelf: 'flex-end',
		},
	},
	petIntroduction: {
		width: 654 * DP,
		marginTop: 30 * DP,
		alignItems: 'flex-start',
		// backgroundColor: 'yellow',
	},
	familyAccountSetting: {
		container: {
			width: 750 * DP,
			marginTop: 42 * DP,
			borderBottomColor: GRAY40,
			borderBottomWidth: 2 * DP,
			justifyContent: 'center',
			alignItems: 'center',
		},
		insideContainer: {
			width: 654 * DP,
		},
		menuView: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		infoMessage: {
			width: 604 * DP,
			height: 68 * DP,
		},
		familyAccounts: {
			// width: 654 * DP,
			marginTop: 16 * DP,
		},
	},
	exposureSetting: {
		container: {
			width: 750 * DP,
			height: 200 * DP,
			marginTop: 2 * DP,
			justifyContent: 'center',
			alignItems: 'center',
		},
		insideContainer: {
			width: 654 * DP,
			height: 124 * DP,
		},
		menuView: {
			width: 654 * DP,
			height: 50 * DP,
			flexDirection: 'row',
		},
		privateSettingView: {
			flexDirection: 'row',
			width: 654 * DP,
			height: 44 * DP,
			marginTop: 30 * DP,
		},
		privateSettingMsg: {
			width: 550 * DP,
			height: 44 * DP,
		},
		privateSettingBtn: {
			width: 80 * DP,
			height: 36 * DP,
			marginLeft: 24 * DP,
			alignSelf: 'center',
		},
	},

	changeAdoptionStatus: {
		container: {
			width: 750 * DP,
			alignItems: 'center',
			paddingVertical: 30 * DP,
			// backgroundColor: GRAY30,
		},
		insideContainer: {
			width: 654 * DP,
			justifyContent: 'space-between',
		},
		menuView: {
			// marginTop: 52 * DP,
			flexDirection: 'row',
		},
		bracket50: {
			width: 100 * DP,
			height: 60 * DP,
			// marginLeft: 214 * DP,
			justifyContent: 'center',
			alignItems: 'center',
			alignSelf: 'flex-end',
		},
	},
});

export const vaccinationRecord = StyleSheet.create({
	container: {
		flex: 1,
	},
	vaccinationForm_container: {
		width: 654 * DP,
		height: 876 * DP,
		marginTop: 44 * DP,
	},
	vaccination_category: {
		width: 654 * DP,
		// height: 268 * DP,
		marginBottom: 2 * DP,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dueDateView: {
		alignSelf: 'flex-end',
		flexDirection: 'row',
		marginTop: 60 * DP,
		marginRight: 48 * DP,
	},
	dueDateText: {
		width: 194 * DP,
		height: 36 * DP,
	},
	dueDateSwitch: {
		width: 80 * DP,
		height: 36 * DP,
	},
	guide_msg: {
		width: 654 * DP,
		height: 76 * DP,
		marginVertical: 50 * DP,
	},
	titleView: {
		width: 654 * DP,
		height: 46 * DP,
		alignSelf: 'center',
		flexDirection: 'row',
	},
	title: {
		width: 216 * DP,
		height: 46 * DP,
		marginRight: 14 * DP,
	},
	titleMenu: {
		width: 186 * DP,
		height: 38 * DP,
		marginLeft: 26 * DP,
		alignSelf: 'center',
		alignItems: 'center',
	},
});

export const feedListForHashTag = StyleSheet.create({
	container: {
		flex: 1,
	},
	hashTagInfo: {
		width: 702 * DP,
		height: 232 * DP,
		alignItems: 'center',
		// backgroundColor: 'lightblue',
	},
	hashLabel: {
		width: 622 * DP,
		height: 144 * DP,
		marginTop: 12 * DP,
		borderWidth: 2 * DP,
		borderRadius: 40 * DP,
		paddingLeft: 40 * DP,
		borderColor: APRI10,
		justifyContent: 'center',
	},
	postCategory: {
		width: 346 * DP,
		height: 70 * DP,
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		marginRight: 24 * DP,
		backgroundColor: WHITE,
	},
	categoryText: {
		width: 161 * DP,
		height: 70 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'pink',
	},
});

export const searchFeed = StyleSheet.create({
	container: {
		flex: 1,
	},
	stateView: {
		width: 654 * DP,
		// height: 130 * DP,
	},
	showStateView: {
		height: 36 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		marginTop: 24 * DP,
		text: {
			height: 32 * DP,
			alignSelf: 'center',
		},
		onOffSwitch: {
			marginLeft: 16 * DP,
		},
	},
	postState: {
		height: 38 * DP,
		alignSelf: 'flex-start',
	},
});

export const searchAccountA = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WHITE,
		alignItems: 'center',
	},
	listContainer: {
		width: 750 * DP,
		alignSelf: 'center',
	},
});

export const searchAccountB = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ACC4D6',
	},
	petAccountList: {
		alignSelf: 'center',
	},
});

export const searchHashTag = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});

export const searchProtectRequest = StyleSheet.create({
	container: {
		flex: 1,
	},
	filterView: {
		width: 750 * DP,
		height: 68 * DP,
		marginTop: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		inside: {
			width: 654 * DP,
			height: 68 * DP,
		},
		onOffBtnView: {
			width: 344 * DP,
			height: 36 * DP,
			marginTop: 30 * DP,
			flexDirection: 'row',
			alignSelf: 'flex-end',
		},
		onOffBtnMsg: {
			width: 300 * DP,
			height: 32 * DP,
			alignSelf: 'center',
			position: 'absolute',
		},
		onOffSwitch: {
			position: 'absolute',
			right: 0,
		},
	},
	animalNeedHelpList: {
		marginTop: 80 * DP,
		width: 750 * DP,
		alignSelf: 'center',
		// backgroundColor: '#FF00FF',
	},
});

export const appliesRecord = StyleSheet.create({
	container: {
		flex: 1,
	},
	record: {
		width: 750 * DP,
		marginTop: 46 * DP,
		alignItems: 'center',
		alignSelf: 'center',
	},
	animalNeedHelp: {
		container: {
			width: 654 * DP,
			height: 276 * DP,
			marginBottom: 30 * DP,
		},
		headerContainer: {
			width: 654 * DP,
			height: 48 * DP,
			marginBottom: 20 * DP,
			flexDirection: 'row',
			alignItems: 'center',
			title: {
				height: 48 * DP,
				alignItems: 'center',
				justifyContent: 'center',
				// color: GRAY20,
				color: '#191919',
			},
			moreTxt: {},
			moreBtn: {},
		},
	},
	showMoreBox: {
		width: 100 * DP,
		height: 50 * DP,
		position: 'absolute',
		alignItems: 'center',
		flexDirection: 'row',
		right: 0,
	},
	shelterList_container: {
		marginTop: 48 * DP,
		alignItems: 'center',
		height: 312 * DP,
		marginVertical: 30 * DP,
	},
});

export const protectRequestList = StyleSheet.create({
	container: {
		flex: 0,
	},
});
export const missingReportList = StyleSheet.create({
	container: {
		flex: 1,
	},
	filterContainer: {
		width: 750 * DP,
		height: 110 * DP,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	insideContainer: {
		width: 654 * DP,
		height: 60 * DP,
		marginBottom: 10 * DP,
	},
	animalNeedHelpList: {
		marginTop: 30 * DP,
		width: 654 * DP,
		alignSelf: 'center',
		backgroundColor: '#FFF',
	},
	urget_write1: {
		width: 110 * DP,
		height: 110 * DP,
		position: 'absolute',
		bottom: 60 * DP,
		right: 20 * DP,
	},
});

export const activationList = StyleSheet.create({
	container: {
		flex: 1,
	},
	activityContainer: {
		width: 750 * DP,
		marginTop: 70 * DP,
	},
	activity: {
		width: 750 * DP,
		height: 258 * DP,
		marginVertical: 40 * DP,
		alignItems: 'center',
	},
	activityNameContainer: {
		width: 654 * DP,
		height: 42 * DP,
	},
	activityName: {
		marginLeft: 44.5 * DP,
	},
	activityImage: {
		width: 654 * DP,
		height: 204 * DP,
		marginTop: 12 * DP,
	},
	activityUpdating: {
		marginTop: 150 * DP,
	},
});
export const activationDetail = StyleSheet.create({
	container: {
		flex: 1,
	},
	insideContainer: {
		width: 750 * DP,
	},
	imageContainer: {
		width: 654 * DP,
		height: 728 * DP,
		marginTop: 70 * DP,
		alignSelf: 'center',
	},
	titleContainer: {
		width: 654 * DP,
		height: 84 * DP,
		marginTop: 40 * DP,
		flexDirection: 'row',
		alignSelf: 'center',
	},
	titleText: {
		width: 518 * DP,
		height: 54 * DP,
	},

	heartContainer: {
		width: 48 * DP,
		height: 84 * DP,
		marginLeft: 10 * DP,
	},
	shareContainer: {
		width: 48 * DP,
		height: 84 * DP,
		marginLeft: 30 * DP,
	},
	contentContainer: {
		width: 654 * DP,
		height: 322 * DP,
		marginTop: 10 * DP,
		alignSelf: 'center',
	},
});

export const applyVolunteer = StyleSheet.create({
	container: {
		flex: 1,
	},
	btn_w226: {
		marginTop: 60 * DP,
		alignSelf: 'flex-end',
		marginRight: 48 * DP,
		marginBottom: 68 * DP,
	},
	shelterInfo: {
		width: 750 * DP,
		height: 246 * DP,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		marginTop: 30 * DP,
	},
	viewForm: {
		width: 654 * DP,
		marginTop: 40 * DP,
		alignItems: 'flex-end',
	},
	viewForm_step1: {
		width: 654 * DP,
		height: 52 * DP,
		flexDirection: 'row',
	},
	icon48: {
		width: 48 * DP,
		height: 48 * DP,
	},
	title: {
		width: 590 * DP,
		height: 42 * DP,
		marginLeft: 16 * DP,
		marginTop: 4 * DP,
		marginBottom: 10 * DP,
		flexDirection: 'row',
	},
	volunteerDateList: {
		width: 578 * DP,
		height: 52 * DP,
		marginTop: 30 * DP,
		flexDirection: 'row',
	},
	volunteerDateList_text: {
		alignSelf: 'center',
	},
	volunteerDateList_cross: {
		position: 'absolute',
		right: 5 * DP,
		justifyContent: 'center',
	},
	viewForm_step2: {
		width: 590 * DP,
		height: 168 * DP,
		marginTop: 22 * DP,
		marginLeft: 64 * DP,
	},
	participants: {
		width: 654 * DP,
		marginTop: 40 * DP,
	},
	volunteerListInput: {
		width: 480 * DP,
		height: 44 * DP,
		// backgroundColor: 'lightblue',
		textAlign: 'right',
	},
	number_of_volunteerers: {
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		width: 590 * DP,
		height: 106 * DP,
		paddingRight: 20 * DP,
		alignItems: 'center',
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		flexDirection: 'row',
		// backgroundColor: 'yellow',
	},
	participants_step1: {
		width: 654 * DP,
		height: 52 * DP,
		flexDirection: 'row',
	},
	participants_step2: {
		width: 654 * DP,
		marginTop: 20 * DP,
		alignSelf: 'flex-end',
		// alignItems: 'flex-end',
	},
	participants_container: {
		flexDirection: 'row',
		width: 590 * DP,
		alignSelf: 'flex-end',
		alignItems: 'center',
		marginBottom: 30 * DP,
	},
	participants_list_container: {
		width: 514 * DP,
		height: 94 * DP,
	},
	accountList: {
		width: 654 * DP,
	},
	addParticipantBtn: {
		width: 590 * DP,
		height: 136 * DP,
		marginLeft: 10 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		borderRadius: 30 * DP,
		paddingVertical: 36 * DP,
		paddingHorizontal: 56 * DP,
		alignSelf: 'flex-end',
		flexDirection: 'row',
	},
	addParticipantTxt: {
		color: APRI10,
		alignSelf: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		marginLeft: 20 * DP,
	},
	participants_contact: {
		width: 654 * DP,
		marginTop: 40 * DP,
	},
	participants_contact_text: {
		width: 590 * DP,
		marginTop: 10 * DP,
	},
});

export const applyCompanionA = StyleSheet.create({
	container: {
		flex: 1,
	},
	stageBar: {
		marginTop: 20 * DP,
	},
	textMsg: {
		backgroundColor: WHITE,
		marginTop: 12 * DP,
	},
	inputForm: {
		marginTop: 60 * DP,
	},
	btn_w654: {
		marginTop: 70 * DP,
	},
	addressInput: {},
	input24A: {
		marginTop: 80 * DP,
		height: 132 * DP,
	},
});

export const applyCompanionB = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	inputForm: {
		marginTop: 40 * DP,
	},
	stageBar: {
		marginTop: 20 * DP,
	},
	textMsg: {
		backgroundColor: WHITE,
		marginTop: 12 * DP,
	},
	addPetBtnView: {
		marginTop: 60 * DP,
		width: 274 * DP,
		height: 64 * DP,
		flexDirection: 'row',
	},
	addPetTextView: {
		marginLeft: 10 * DP,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addPetText: {},
});

export const applyCompanionC = StyleSheet.create({
	container: {
		flex: 1,
	},
	assignCheckList: {
		marginTop: 40 * DP,
	},
	stageBar: {
		marginTop: 20 * DP,
	},
	textMsg: {
		marginTop: 12 * DP,
	},
	btnContainer: {
		width: 654 * DP,
		height: 70 * DP,
		marginTop: 110 * DP,
		marginBottom: 50 * DP,
		flexDirection: 'row',
	},
	btn_w176: {
		marginRight: 63 * DP,
	},
});

export const applyCompanionD = StyleSheet.create({
	container: {
		flex: 1,
	},
	InputLongText: {
		marginTop: 40 * DP,
		alignItems: 'center',
	},
	stageBar: {
		marginTop: 20 * DP,
	},
	textMsg: {
		marginTop: 12 * DP,
	},
	btnContainer: {
		width: 654 * DP,
		height: 70 * DP,
		marginTop: 80 * DP,
		flexDirection: 'row',
	},
	btn_w176: {
		marginRight: 63 * DP,
	},
});

export const applyDetails = StyleSheet.create({
	container: {
		flex: 1,
	},
	animalProtectDetails: {
		marginTop: 40 * DP,
	},
	btn_w226: {
		marginRight: 202 * DP,
	},
	btnContainer: {
		width: 654 * DP,
		height: 70 * DP,
		marginTop: 40 * DP,
		marginBottom: 30 * DP,
		alignSelf: 'center',
		flexDirection: 'row',
	},
});

export const photoSelect = StyleSheet.create({
	container: {
		flex: 1,
	},
	recentPhotoTitle: {
		width: 750 * DP,
		height: 102 * DP,
		marginLeft: 48 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
});

export const userIdentification = StyleSheet.create({
	container: {
		backgroundColor: '#ACC4D6',
		alignItems: 'center',
		flex: 1,
	},
	tabSelect: {
		marginTop: 20 * DP,
	},
	textMessage: {
		width: 654 * DP,
		height: 214 * DP,
		backgroundColor: 'pink',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputForm: {
		width: 654 * DP,
		height: 224 * DP,
		backgroundColor: '#A07A7A',
	},
	btn_w654: {
		marginTop: 110 * DP,
	},
	inputWithSelect: {
		height: 82 * DP,
		marginTop: 60 * DP,
	},
});

export const missingAnimalDetail = StyleSheet.create({
	container: {},
	insideContainer: {
		width: 750 * DP,
		alignItems: 'center',
	},
	poster: {
		width: 618 * DP,
		height: 872 * DP,
		// marginTop: 33 * DP,
		backgroundColor: '#FFFFFF',
		// backgroundColor: 'lightblue',
		...Platform.select({
			ios: {
				borderColor: 'black',
				shadowColor: '#4F4F4F',
				shadowOffset: {
					width: 8,
					hegiht: 6,
				},
				shadowOpacity: 0.25,
				// shadowRadius: 2.62,
			},
			android: {
				elevation: 4,
			},
		}),
		alignItems: 'center',
	},
	feedContent: {
		marginTop: 40 * DP,
	},
	horizontal_separator: {
		width: '95%',
		marginVertical: 30 * DP,
		backgroundColor: GRAY30,
		height: 2,
	},
	title: {
		width: 578 * DP,
		height: 112 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF0000',
		borderRadius: 10,
		marginTop: 10 * DP,
	},
	titleText: {
		fontSize: 62 * DP,
		fontWeight: 'bold',
		color: 'white',
	},
	picture: {
		marginTop: 10 * DP,
		width: 578 * DP,
		height: 284 * DP,
		// backgroundColor: 'yellow',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	img_squre_284: {
		width: 284 * DP,
		height: 284 * DP,

		backgroundColor: '#B0C7D8',
	},
	textBox: {
		marginTop: 10 * DP,
		height: 300 * DP, //유동적인 텍스트 크기에 대해서 좌우 간격이 좁아짐에 따라 늘어나는 height에 관한 처리 필요
		width: 578 * DP,
		alignItems: 'center',
	},
	phoneNumberBox: {
		width: 578 * DP,
		height: 106 * DP,
		backgroundColor: '#FF0000',
		alignItems: 'center',
	},
	missingTextWhite18: {
		marginTop: 8 * DP,
		fontSize: 18 * DP,
		color: 'white',
	},
	missingText18: {
		fontSize: 18 * DP,
		color: '#191919',
	},
	missingText38: {
		fontSize: 38 * DP,
		fontWeight: 'bold',
		color: '#FF0000',
	},
	missingBlackText32: {
		fontSize: 32 * DP,
		fontWeight: 'bold',
		color: '#191919',
	},
	missingRedText32: {
		fontSize: 32 * DP,
		fontWeight: 'bold',
		color: '#FF0000',
	},
	missingText26: {
		fontSize: 26 * DP,
		fontWeight: 'bold',
		color: '#191919',
	},
	missingText22: {
		paddingTop: 10 * DP,
		fontSize: 22 * DP,
		color: '#191919',
	},
	missingTextYellow50: {
		fontSize: 50 * DP,
		color: '#FFEE00',
		fontWeight: 'bold',
		fontFamily: 'Roboto',
	},
	yellowNumberBox: {
		height: 62 * DP,
		width: 452 * DP,
		marginBottom: 8 * DP,
		alignItems: 'center',
	},
	oneLine: {
		borderBottomColor: 'black',
		borderBottomWidth: 2 * DP,
		width: 578 * DP,
		marginTop: 10 * DP,
		color: '#191919',
	},
	floatingBtnMissingReport: {
		width: 118 * DP,
		height: 110 * DP,
		borderRadius: 45 * DP,
		borderColor: '#FF0000',
		borderWidth: 2,
		// marginBottom: 20 * DP,
		// marginRight: 12 * DP,
		alignItems: 'center',
		bottom: 20 * DP,
		right: 12 * DP,
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		opacity: 0.8,
	},

	commentList: {},
});

export const reportDetail = StyleSheet.create({
	container: {
		// backgroundColor: '#ACC4D6',
		alignItems: 'center',
		// flex: 1,
	},
	img_square_750: {
		marginTop: 20 * DP,
		backgroundColor: 'yellow',
	},
	feedContent: {
		marginTop: 40 * DP,
	},
	commentList: {
		flex: 1,
		// marginTop: 62 * DP,
	},
	basic_separator: {
		width: 654 * DP,
		height: 60 * DP,
		// backgroundColor: '#fff',
	},
	separator: {
		width: 654 * DP,
		height: 2 * DP,
		backgroundColor: GRAY30,
		marginTop: 30 * DP,
	},
	allCommentCount: {
		width: 654 * DP,
		height: 44 * DP,
		alignItems: 'flex-end',
		// backgroundColor: '#F8DDDD',
	},
	wrp_main: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: '#FFF',
	},
});

export const feedList = StyleSheet.create({
	container: {
		backgroundColor: '#ACC4D6',
		alignItems: 'center',
		flex: 1,
	},
	feedList: {
		width: 750 * DP,
	},
	floatingBtn: {
		position: 'absolute',
		right: 30 * DP,
		bottom: 40 * DP,
	},
});

export const feedCommentList = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		// backgroundColor: '#ACC4D6',
	},
	feedContent: {
		// width: 750 * DP,
		// height: 330 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: GRAY30,
		backgroundColor: WHITE,
		// backgroundColor: 'powderblue',
	},
	commentList: {
		// width: 750 * DP,
		marginTop: 20 * DP,
		alignItems: 'center',
		// backgroundColor: 'yellow',
	},
	comment_number: {
		marginTop: 30 * DP,
		marginBottom: 12 * DP,
		marginLeft: 48 * DP,
		alignSelf: 'flex-start',
	},
	addedImageContainer: {
		width: 606 * DP,
		height: 606 * DP,
		marginVertical: 30 * DP,
	},
	editComment: {
		width: 750 * DP,
		shadowColor: 'black',
		shadowOpacity: 0.5,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
		// position: 'absolute',
		backgroundColor: WHITE,
		bottom: 1,
		alignItems: 'center',
	},
	editComment_photoAdded: {
		width: 750 * DP,
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
		backgroundColor: WHITE,
		bottom: 1,
		alignItems: 'center',
	},
	editCommentFromRequest: {
		width: 654 * DP,
		borderBottomColor: APRI10,
		borderBottomWidth: 2 * DP,
		backgroundColor: WHITE,
		bottom: 0,
		alignItems: 'center',
		paddingTop: 30 * DP,
	},

	InputFromProtectRequest: {
		width: 600 * DP,
		height: 108 * DP,
		marginLeft: 20 * DP,
		fontSize: 28 * DP,
	},
	replyTextInput: {
		width: 646 * DP,
		marginLeft: 20 * DP,
		fontSize: 28 * DP,
		// backgroundColor: 'yellow',
	},
	replyTextInput_photo: {
		width: 442 * DP,
		marginRight: 12 * DP,
		// backgroundColor: 'pink',
	},
	replyTextInput_protect_request: {
		textAlignVertical: 'center',
	},
	commentBox_protect_request_left: {
		width: 550 * DP,
		height: 68 * DP,
		marginRight: 12 * DP,
		borderRadius: 24 * DP,
		backgroundColor: GRAY30,
		justifyContent: 'center',
		paddingLeft: 20 * DP,
	},
	editComment_expanded: {
		width: 750 * DP,
		height: 750 * DP,
		backgroundColor: '#D9A0A0',
		position: 'absolute',
		bottom: 0,
	},
	commentBox: {
		width: 750 * DP,
		// height: 186 * DP,
		// backgroundColor: 'yellow',
		paddingVertical: 28 * DP,
		paddingHorizontal: 20 * DP,
		alignItems: 'center',
	},
	commentBox_photo: {
		width: 750 * DP,
		height: 318 * DP,
		// paddingBottom: 12 * DP,
		paddingTop: 30 * DP,
		paddingBottom: 20 * DP,
		paddingHorizontal: 20 * DP,
		alignItems: 'center',
	},
	commentBox_protect_request: {
		width: 694 * DP,
		height: 68 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	commentBox_input_photo: {
		width: 492 * DP,
		height: 190 * DP,
		borderRadius: 30 * DP,
		marginRight: 12 * DP,
		paddingHorizontal: 20 * DP,
		paddingVertical: 12 * DP,
		backgroundColor: GRAY30,
	},
	commentBox_top_photo: {
		width: 694 * DP,
		height: 190 * DP,
		borderRadius: 24 * DP,
		marginBottom: 12 * DP,
		// justifyContent: 'space-between',
	},
	commentBox_top: {
		width: 694 * DP,
		// height: 68 * DP,
		maxHeight: 224 * DP,
		padding: 10 * DP,
		borderRadius: 24 * DP,
		marginBottom: 12 * DP,
		justifyContent: 'center',
		backgroundColor: GRAY30,
	},
	commentBox_bottom: {
		width: 694 * DP,
		height: 68 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	commentBox_bottom_left: {
		flexDirection: 'row',
	},
});

export const socialRelation = StyleSheet.create({
	container: {
		// backgroundColor: '#ACC4D6',
		alignItems: 'center',
		flex: 1,
	},
	topTabNavigation: {
		width: 654 * DP,
		height: 62 * DP,
		marginTop: 10 * DP,
		backgroundColor: '#88BA88',
	},
	inputWithSearchIcon: {
		marginTop: 38 * DP,
		marginBottom: 10 * DP,
	},
	controllableAccountList: {
		marginTop: 70 * DP,
	},
	controllableAccountListFull: {
		height: 992 * DP,
		marginTop: 70 * DP,
	},
	recommendList: {
		height: 508 * DP,
		marginTop: 70 * DP,
	},
	floatingBtn: {
		position: 'absolute',
		right: 30 * DP,
		bottom: 40 * DP,
	},
});

export const locationPicker = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
	},
	inputWithSearchIcon: {
		marginTop: 40 * DP,
	},
	locationList: {
		marginTop: 23 * DP,
		width: 654 * DP,
		height: 1280 * DP,
	},
});

export const accountPicker = StyleSheet.create({
	container: {
		backgroundColor: '#ACC4D6',
		alignItems: 'center',
		flex: 1,
	},
	accountList: {
		width: 750 * DP,
		marginTop: 42 * DP,
		marginBottom: 50 * DP,
	},
});

export const selectAccount = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
	},
	accountList: {
		marginTop: 32 * DP,
		width: 654 * DP,
	},
});

export const aidRequestList = StyleSheet.create({
	container: {
		backgroundColor: '#ACC4D6',
		alignItems: 'center',
		flex: 1,
	},
	aidRequestList: {
		marginTop: 40 * DP,
		width: 654 * DP,
		height: 1384 * DP,
		backgroundColor: '#88BA88',
	},
});

export const manageVolunteer = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
	},
	volunteerList: {
		width: 750 * DP,
		marginBottom: 30 * DP,
	},
	previous_volunteerList: {
		width: 750 * DP,
		height: 522 * DP,
	},
	previous_volunteerList_expanded: {
		width: 750 * DP,
	},
	title: {
		height: 35 * DP,
		marginTop: 40 * DP,
		marginBottom: 20 * DP,
		marginLeft: 48 * DP,
		flexDirection: 'row',
		alignSelf: 'flex-start',
	},
	separator: {
		width: 654 * DP,
		marginTop: 40 * DP,
		height: 2 * DP,
		backgroundColor: APRI10,
	},
	showMoreContainer: {
		width: 214 * DP,
		height: 48 * DP,
		marginBottom: 50 * DP,
		flexDirection: 'row',
		alignItems: 'center',
	},
	showMoreContainer_text: {
		color: GRAY10,
		marginLeft: 17 * DP,
	},
	none_adoptor_text: {
		color: GRAY20,
		width: 654 * DP,
		height: 130 * DP,
		paddingTop: 50 * DP,
		textAlign: 'center',
	},
});

export const writeAidRequest = StyleSheet.create({
	container: {
		flex: 1,
	},
	aidRequest: {
		marginTop: 40 * DP,
	},
	aidRequestCont: {
		width: 750 * DP,
		alignItems: 'center',
		marginTop: 40 * DP,
	},
	titleContainer: {
		marginBottom: 20 * DP,
		// height: 80 * DP,
		// borderBottomWidth: 2 * DP,
	},
	titleInput: {
		paddingHorizontal: 15 * DP,
		marginTop: 10 * DP,
		borderBottomWidth: 2 * DP,
		// lineHeight: 40 * DP,
		// backgroundColor: 'yellow',
		height: 100 * DP,
	},
	contentInput: {
		width: 606 * DP,
		height: 300 * DP,
		// backgroundColor: 'yellow',
	},
	feedTextEdit: {
		marginTop: 40 * DP,
		width: 654 * DP,
		alignSelf: 'center',
		borderRadius: 24 * DP,
		// padding: 24 * DP,
		// backgroundColor: 'red',
	},
	requestContent_underline: {
		width: 654 * DP,
		height: 2 * DP,
		marginVertical: 40 * DP,
		backgroundColor: APRI10,
	},
	contentContainer: {
		width: 654 * DP,
		height: 376 * DP,
		borderRadius: 24 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		padding: 24 * DP,
		// backgroundColor: 'yellow',
	},
	addPhotoContainer: {
		width: 160 * DP,
		height: 54 * DP,
		marginLeft: 48 * DP,
		marginTop: 38 * DP,
		alignSelf: 'flex-start',
		flexDirection: 'row',
	},
	addPhotoText: {
		marginLeft: 12 * DP,
		width: 94 * DP,
		height: 38 * DP,
		backgroundColor: 'pink',
		alignSelf: 'center',
	},
	addPhoto: {
		// backgroundColor: 'yellow',
		height: 190 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		borderRadius: 40 * DP,
		borderWidth: 7 * DP,
		borderColor: APRI10,
	},
	selectedMediaList: {
		alignSelf: 'flex-start',
		marginTop: 30 * DP,
		marginBottom: 40 * DP,
		marginLeft: 48 * DP,
	},
	pic: {
		flexDirection: 'row',
		width: 654 * DP,
		marginTop: 40 * DP,
		alignSelf: 'center',
		justifyContent: 'flex-start',
	},
});

export const feedMediaTagEdit = StyleSheet.create({
	container: {},
	feedMedia: {},
});

export const feedWrite = StyleSheet.create({
	container: {
		flex: 1,
	},
	container_without_lostAnimal: {
		backgroundColor: '#96A8B5',
		alignItems: 'center',
		height: 1408 * DP,
	},
	buttonContainer: {
		flexDirection: 'row',
		width: 654 * DP,
		height: 54 * DP,
		marginTop: 30 * DP,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	btnItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn_w194_container: {
		width: 654 * DP,
		marginTop: 40 * DP,
		flexDirection: 'row',
	},
	btn_w194: {
		marginRight: 266 * DP,
	},
	selectedMediaList: {
		marginTop: 42 * DP,
	},
	urgentBtnContainer: {
		width: 158 * DP,
		// width: 110 * DP,
		height: 332 * DP,
		// height: 110 * DP,
		position: 'absolute',
		right: 30 * DP,
		bottom: 40 * DP,
		justifyContent: 'flex-end',
	},
	urgentActionButton: {
		width: 110 * DP,
		height: 110 * DP,
		alignSelf: 'flex-end',
		backgroundColor: 'white',
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		borderRadius: 100 * DP,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 2 * DP,
		// 	height: 1 * DP,
		// },
		elevation: 4,
	},
	public_setting_btn: {
		width: 194 * DP,
		height: 60 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30 * DP,
		borderWidth: 2 * DP,
		borderColor: APRI10,
		flexDirection: 'row',
	},
	urgentBtnItemContainer: {
		width: 158 * DP,
		height: 90 * DP,
		borderRadius: 40 * DP,
		marginBottom: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
	},
	petAccountList: {
		minHeight: 670 * DP,
		marginTop: 28 * DP,
	},
	lostAnimalForm: {
		width: 654 * DP,
		marginTop: 40 * DP,
	},
	lostAnimalForm_Form: {
		width: 654 * DP,
		height: 126 * DP,
		marginBottom: 40 * DP,
	},
	formTitle: {
		width: 462 * DP,
		height: 34 * DP,
	},
	formContentContainer: {
		flexDirection: 'row',
		marginTop: 10 * DP,
	},
	dropdownSelect: {
		marginRight: 70 * DP,
	},
	datePicker: {
		height: 82 * DP,
		marginTop: 10 * DP,
	},
	tabSelectFilled_Type1: {
		width: 654 * DP,
	},
	input24: {
		height: 168 * DP,
		marginBottom: 4 * DP,
	},
	missing_location_input: {
		height: 230 * DP,
		width: 654 * DP,
		marginBottom: 30 * DP,
	},
	inputBalloon: {
		marginBottom: 50 * DP,
	},
	reportForm_container: {
		// height: 585 * DP,
	},
	reportForm: {
		width: 654 * DP,
		// height: 456 * DP,
		marginTop: 40 * DP,
	},
	reportForm_form: {
		width: 654 * DP,
		// height: 126 * DP,
		marginBottom: 40 * DP,
	},
	reportLocation_form: {
		width: 654 * DP,
		// height: 164 * DP,
		marginTop: 60 * DP,
		flexDirection: 'row',
	},
	reportLocation_form_left: {
		width: 438 * DP,
	},
	reportLocation_form_left_title: {
		width: 248 * DP,
		height: 40 * DP,
	},
	reportLocation_form_left_inputNoTitle: {
		marginTop: 42 * DP,
	},
	reportLocation_form_right: {
		width: 176 * DP,
		marginLeft: 40 * DP,
	},
	missing_location_detail_input: {
		width: 654 * DP,
		marginTop: 24 * DP,
		height: 82 * DP,
		paddingLeft: 20 * DP,
		borderBottomWidth: 2 * DP,
		borderBottomColor: APRI10,
	},
	report_location: {
		height: 230 * DP,
		width: 654 * DP,
		marginVertical: 30 * DP,
	},
	btn_w176: {
		marginBottom: 24 * DP,
	},
	locationDetail: {
		width: 654 * DP,
		height: 82 * DP,
		marginTop: 24 * DP,
		marginBottom: 50 * DP,
	},
	addressSelectContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'lightblue',
	},
	addressDropDownContainer: {},
});

export const profile = StyleSheet.create({
	container: {flex: 1},
	profileInfo: {
		width: '100%',
		backgroundColor: WHITE,
		// marginVertical: 30 * DP,
		// height: 416 * DP,
	},
	feedListContainer: {
		marginLeft: -2 * DP,
		flex: 1,
	},
	floatingBtn: {
		position: 'absolute',
		right: 30 * DP,
		bottom: 40 * DP,
	},
	petList: {
		width: 750 * DP,
		height: 212 * DP,
	},
	animalNeedHelpList: {
		width: 750 * DP,
		alignItems: 'center',
		marginTop: 20 * DP,
		flex: 1,
		// height: 400 * DP,
	},
	listEmpty: {
		width: 684 * DP,
		height: 212 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'red',
	},
});

export const animalProtectRequestDetail_style = StyleSheet.create({
	container: {
		width: 750 * DP,
		alignItems: 'center',
	},
	requestProtect: {
		marginTop: 30 * DP,
		backgroundColor: '#F29797',
	},
	rescueSummary: {
		marginTop: 28 * DP,
		zIndex: -1,
	},
	rescueText: {
		width: 654 * DP,
		marginTop: 40 * DP,
		marginBottom: 70 * DP,
	},
	floatingBtnAapply: {
		position: 'absolute',
		bottom: 0 * DP,
	},
	rescueSummary_insideContainer: {
		width: 594 * DP,
		height: 128 * DP,
	},
	rescueSummary_insideItem: {
		width: 594 * DP,
		height: 36 * DP,
		marginBottom: 10 * DP,
		flexDirection: 'row',
	},
	rescueSummary_insideItem_category: {
		marginRight: 10 * DP,
		color: GRAY20,
	},
	rescueSummary_insideItem_content: {
		marginRight: 50 * DP,
	},
	editComment: {
		width: 694 * DP,
		height: 108 * DP,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		position: 'absolute',
		backgroundColor: WHITE,
		bottom: 0,
	},
	bottomContainer: {
		width: 750 * DP,
		height: 100 * DP,
		backgroundColor: 'white',
		justifyContent: 'space-between',
		position: 'absolute',
		flexDirection: 'row',
		bottom: 70 * DP,
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 1 * DP,
		// 	height: 2 * DP,
		// },
		// elevation: 2,
		paddingHorizontal: 60 * DP,
	},
	buttonItemContainer: {
		width: 48 * DP,
		marginLeft: 15 * DP,
	},
	btnContainer: {
		width: 750 * DP,
		height: 100 * DP,
		backgroundColor: 'white',
		justifyContent: 'space-between',
		position: 'absolute',
		bottom: 0 * DP,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// shadowColor: '#000000',
		// shadowOpacity: 0.27,
		// shadowRadius: 4.65,
		// shadowOffset: {
		// 	width: 1 * DP,
		// 	height: 2 * DP,
		// },
		// elevation: 2,
		paddingHorizontal: 60 * DP,
		justifyContent: 'space-between',
	},
	shareDropDown: {
		width: 384 * DP,
		height: 184 * DP,
		position: 'absolute',
		right: 0,
		top: 80 * DP,
		flexDirection: 'row',
		borderRadius: 40 * DP,
		borderTopEndRadius: 0,
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: WHITE,
		paddingLeft: 60 * DP,
		shadowOffset: {
			height: 5 * DP,
		},
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 4.67,
		elevation: 3,
	},
	socialItem: {
		width: 92 * DP,
		height: 116 * DP,
		marginRight: 40 * DP,
	},
	replyWriteBox: {},
});

export const animalProtectList = StyleSheet.create({
	container: {
		width: 750 * DP,
		marginTop: 40 * DP,
		alignItems: 'center',
	},
	insideContainer: {
		width: 654 * DP,
		marginBottom: 40 * DP,
	},
	title: {
		width: 654 * DP,
		height: 35 * DP,
		alignSelf: 'center',
		marginBottom: 21 * DP,
	},
	menuHeader: {
		width: 654 * DP,
		height: 48 * DP,
		alignItems: 'center',
		flexDirection: 'row',
	},
});

export const saveFavorite = StyleSheet.create({
	accountHashList: {
		width: 654 * DP,
		// height: 1324 * DP,
		marginTop: 30 * DP,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#F2C2C2',
	},
});

export const linkedAccountList = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: WHITE,
	},
	insideContainer: {
		// width: 750 * DP,
		alignItems: 'center',
		flex: 3,
	},
	title: {
		width: 300 * DP,
		height: 42 * DP,
		marginBottom: 16 * DP,
	},

	accountList_step1: {
		flex: 1,
		alignItems: 'center',
		marginTop: 30 * DP,
	},
	accountList_step2: {
		width: 750 * DP,
		marginTop: 30 * DP,
	},
	floatingBtn: {
		position: 'absolute',
		right: 30 * DP,
		bottom: 40 * DP,
	},
});

export const followerList = StyleSheet.create({
	container: {
		flex: 1,

		alignItems: 'center',
		backgroundColor: WHITE,
	},
	insideContainer: {
		alignItems: 'center',
	},

	inputWitchSearch: {
		marginTop: 38 * DP,
	},
	accountList_step1: {
		width: 750 * DP,
		marginTop: 40 * DP,
	},
	accountList_step2: {
		marginTop: 70 * DP,
	},
	floatingBtn: {
		position: 'absolute',
		right: 30 * DP,
		bottom: 40 * DP,
	},
});

export const protectApplyForm = StyleSheet.create({
	detailContainer: {
		marginVertical: 40 * DP,
	},
	confirmButton: {
		marginBottom: 40 * DP,
	},
});

export const protectApplicant = StyleSheet.create({
	accountListContainer: {
		width: 654 * DP,
	},
});
