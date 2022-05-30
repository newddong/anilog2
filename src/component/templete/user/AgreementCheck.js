import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {APRI10, MAINBLACK} from 'Root/config/color';
import {txt} from 'Root/config/textstyle';
import {btn_w654, btn_w694_r30} from 'Atom/btn/btn_style';
import Modal from 'Root/component/modal/Modal';
import AniButton from 'Molecules/button/AniButton';
import AssignCheckList from 'Organism/list/AssignCheckList';
import AssignCheckListItem from 'Organism/listitem/AssignCheckListItem';
import {stagebar_style} from 'Organism/style_organism copy';
import {login_style, btn_style, temp_style, progressbar_style, agreementCheck_style} from 'Templete/style_templete';
import StageBar from 'Molecules/info/Stagebar';
import {getTermsOfService} from 'Root/api/termsofservice';

export default AgreementCheck = props => {
	const user_agreement = React.useRef({
		is_over_fourteen: false, //14살 이상
		is_service: false, //서비스 동의
		is_personal_info: false, //개인정보 제공 동의
		is_location_service_info: false, //위치정보 제공 동의
		is_donation_info: false, //기부정보 제공 동의
		is_marketting_info: false, //마케팅정보 제공 동의
	}).current;
	const [term, setTerm] = React.useState();
	const [permissionToNext, setPermissionToNext] = React.useState(false);
	const [acceptAllState, setAcceptAllState] = React.useState(false);

	React.useEffect(() => {
		getTermsOfService(
			{},
			result => {
				// console.log('getTermsOfService', result.msg);
				const rttt = [
					{
						__v: 0,
						_id: '623ac65cb6296f1b712022f7',
						terms_of_service_contents:
							'제 1 조 (목적)\\n본 약관은 주식회사 애니로그(이하 "회사")가 제공하는 위치기반서비스에 대해 회사와 위치기반서비스를 이용하는 개인위치정보주체(이하 "이용자")간의 권리·의무 및 책임사항, 기타 필요한 사항 규정을 목적으로 합니다.\\n\\n제 2 조 (이용약관의 효력 및 변경)\\n①본 약관은 이용자가 본 약관에 동의하고 회사가 정한 절차에 따라 위치기반서비스의 이용자로 등록됨으로써 효력이 발생합니다.\\n②이용자가 본 약관의 “동의하기” 버튼을 클릭하였을 경우 본 약관의 내용을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한 것으로 봅니다.\\n③회사는 위치기반서비스의 변경사항을 반영하기 위한 목적 등으로 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 수정할 수 있습니다.\\n④약관이 변경되는 경우 회사는 변경사항을 그 적용일자 최소 7일 전에 회사의 홈페이지 또는 서비스 공지사항 등(이하, 홈페이지 등)을 통해 공지합니다. 다만, 개정되는 내용이 이용자 권리의 중대한 변경을 발생시키는 경우 적용일 최소 30일 전에 홈페이지 등에 공지합니다.\\n⑤회사가 전항에 따라 이용자에게 공지 또는 통지한 경우 이용자가 공지 또는 통지⋅고지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 약관에 승인한 것으로 봅니다. 이용자가 개정약관에 동의하지 않을 경우 본 약관에 대한 동의를 철회 할 수 있습니다.\\n제 3 조 (약관 외 준칙)\\n이 약관에 명시되지 않은 사항에 대해서는 위치 정보의 보호 및 이용 등에 관한 법률, 개인정보보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계법령 및 회사가 정한 지침 등의 규정에 따릅니다.\\n\\n제 4 조 (서비스의 내용)\\n회사는 위치정보사업자 등으로부터 수집한 이용자의 위치정보를 이용하여 아래와 같은 위치기반서비스를 제공합니다.\\n\\n①위치정보를 활용한 정보 검색결과 및 콘텐츠를 제공하거나 추천\\n②생활편의를 위한 위치 공유, 위치/지역에 따른 알림, 경로 안내\\n③위치기반의 컨텐츠 분류를 위한 콘텐츠 태깅(Geotagging)\\n④위치기반의 맞춤형 광고\\n제 5 조 (서비스 이용요금)\\n회사가 제공하는 위치기반서비스는 무료입니다.\\n단, 무선 서비스 이용 시 발생하는 데이터 통신료는 별도이며, 이용자가 가입한 각 이동통신사의 정책에 따릅니다.\\n',
						terms_of_service_date: '2022-03-23T05:47:26.460Z',
						terms_of_service_title: '위치기반서비스 이용약관 동의',
					},
					{
						__v: 0,
						_id: '623ac092b6296f1b712022f5',
						terms_of_service_contents:
							'서비스 제공을 위한 필요 최소한의 개인정보를 수집하고 있습니다.\\n회원 가입 시 또는 서비스 이용 과정에서 어플리케이션이나 프로그램 등을 통해 아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.\\n\\n[애니로그계정]\\n필수\\n전화번호, 비밀번호, 닉네임, 프로필사진, 연락처, 서비스 이용내역\\n\\n[본인인증 시]\\n이름, 성별, 생년월일, 휴대폰번호, 통신사업자, 내/외국인 여부, 암호화된 이용자 확인값(CI), 중복가입확인정보(DI))\\n\\n[법정대리인 동의 시]\\n법정대리인 정보(이름, 성별, 생년월일, 휴대폰번호, 통신사업자, 내/외국인 여부, 암호화된 이용자 확인값(CI), 중복가입확인정보(DI))\\n\\n일부 서비스에서는 특화된 여러 기능들을 제공하기 위해 ‘애니로그계정’에서 공통으로 수집하는 정보 이외에 이용자에게 동의를 받고\\n추가적인 개인정보를 수집할 수 있습니다.\\n필수정보란? : 해당 서비스의 본질적 기능을 수행하기 위한 정보\\n선택정보란? : 보다 특화된 서비스를 제공하기 위해 추가 수집하는 정보 (선택 정보를 입력하지 않은 경우에도 서비스 이용 제한은 없습니다.)\\n\\n개인정보를 수집하는 방법은 다음과 같습니다.\\n개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.\\n\\n회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우\\n제휴 서비스 또는 단체 등으로부터 개인정보를 제공받은 경우\\n고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등\\n온·오프라인에서 진행되는 이벤트/행사 등 참여\\n서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.\\n모바일 이용 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디, 폰기종, 단말기 모델명), IP주소, 쿠키, 방문일시, 부정이용기록, 서비스 이용 기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다.',
						terms_of_service_date: '2022-03-23T05:47:26.460Z',
						terms_of_service_title: '개인정보 수집 이용약관 동의',
					},
					{
						__v: 0,
						_id: '623a8b00faf7793f8357114a',
						terms_of_service_contents:
							'제 1 장 환영합니다!\\n제 1 조 (목적)\\n주식회사 파인프렌즈(이하 ‘회사’)가 제공하는 서비스를 이용해 주셔서 감사합니다. 본 약관은 여러분이 애니로그계정 서비스를 이용하는 데 필요한 권리, 의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항을 규정하고 있으므로 조금만 시간을 내서 주의 깊게 읽어주시기 바랍니다.\\n\\n제 2 조 (약관의 효력 및 변경)\\n①본 약관의 내용은 애니로그 서비스의 화면에 게시하거나 기타의 방법으로 공지하고, 본 약관에 동의한 여러분 모두에게 그 효력이 발생합니다.\\n②회사는 필요한 경우 관련법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 본 약관이 변경되는 경우 회사는 변경사항을 시행일자 15일 전부터 여러분에게 서비스 공지사항에서 공지 또는 통지하는 것을 원칙으로 하며, 피치 못하게 여러분에게 불리한 내용으로 변경할 경우에는 그 시행일자 30일 전부터 (서비스 내 전자쪽지 발송, 서비스 내 알림 메시지를 띄우는 등의 별도의 전자적 수단) 발송 또는 여러분이 등록한 휴대폰번호로 문자메시지 발송하는 방법 등으로 개별적으로 알려 드리겠습니다.\\n③회사가 전항에 따라 공지 또는 통지를 하면서 공지 또는 통지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 여러분의 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로 봅니다. 여러분이 개정약관에 동의하지 않을 경우 여러분은 이용계약을 해지할 수 있습니다.\\n제 3 조 (약관 외 준칙)\\n본 약관에 규정되지 않은 사항에 대해서는 관련법령 또는 회사가 정한 개별 서비스의 이용약관, 운영정책 및 규칙 등(이하 ‘세부지침’)의 규정에 따릅니다.\\n\\n제 4 조 (용어의 정의)\\n①본 약관에서 사용하는 용어의 정의는 다음과 같습니다.\\n1.애니로그계정: 회사 또는 관계사가 제공하는 개별 서비스를 하나의 로그인계정과 비밀번호로 회원 인증, 회원정보 변경, 회원 가입 및 탈퇴 등을 관리할 수 있도록 회사가 정한 로그인계정 정책을 말합니다.\\n2.회원: 애니로그계정이 적용된 개별 서비스에서 본 약관에 동의하고, 애니로그계정을 이용하는 자를 말합니다.\\n3.관계사: 회사와 제휴 관계를 맺고 애니로그계정을 공동 제공하기로 합의한 법인을 말합니다. 개별 관계사는 파인프렌즈 기업사이트에서 확인할 수 있고 추후 추가/변동될 수 있으며 관계사가 추가/변동될 때에는 파인프렌즈 기업사이트에 변경 사항을 게시합니다.\\n4.개별 서비스: 애니로그계정을 이용하여 접속 가능한 회사 또는 관계사가 제공하는 서비스를 말합니다. 개별 서비스는 추후 추가/변동될 수 있으며 서비스가 추가/변동될 때에는 파인프렌즈 기업사이트에 변경 사항을 게시합니다.\\n5.애니로그계정 정보 : 애니로그계정을 이용하기 위해 회사가 정한 필수 내지 선택 입력 정보로서 애니로그계정 서비스 내 설정 화면을 통해 정보 확인, 변경 처리 등을 관리할 수 있는 회원정보 항목을 말합니다.\\n6.인증회원 : 회사로부터 전자서명생성정보를 인증 받은 회원을 말합니다.\\n7.이용기관 : 인증회원의 전자서명 및 인증서를 바탕으로 한 거래 등을 위하여 인증서비스를 이용하려는 제3자를 말합니다.',
						terms_of_service_date: '2022-03-23T02:50:05.121Z',
						terms_of_service_title: '서비스 이용약관 동의',
					},
				];

				setTerm(result.msg);
			},
			err => {
				console.log('getTermsOfService err', err);
			},
		);
	}, []);

	const goToNextStep = () => {
		props.navigation.push('UserVerification', {user_agreement: user_agreement});
	};

	const onPressAceeptAllBtn = state => {
		Object.keys(user_agreement).forEach(key => {
			user_agreement[key] = state;
		});
		setAcceptAllState(state);
	};

	const permissionCheck = () => {
		if (
			user_agreement.is_donation_info &&
			user_agreement.is_location_service_info &&
			user_agreement.is_over_fourteen &&
			user_agreement.is_personal_info &&
			user_agreement.is_service
		) {
			setPermissionToNext(true);
		} else {
			setPermissionToNext(false);
		}
	};

	const onPressAcceptItem = (text, index, isCheck) => {
		// text - 동의 내역, index - 리스트 인덱스 , isCheck - T/F 상태
		switch (index) {
			case 0:
				user_agreement.is_over_fourteen = isCheck;
				break;
			case 1:
				user_agreement.is_service = isCheck;
				break;
			case 2:
				user_agreement.is_personal_info = isCheck;
				break;
			case 3:
				user_agreement.is_location_service_info = isCheck;
				break;
			case 4:
				user_agreement.is_donation_info = isCheck;
				break;
			case 5:
				user_agreement.is_marketting_info = isCheck;
				break;
		}
		permissionCheck();
	};

	const onPressDetail = index => {
		console.log(index);
		switch (index) {
			case 1:
				props.navigation.push('TermsAndPolicy', {name: 'service', term: term[2]});
				break;
			case 2:
				props.navigation.push('TermsAndPolicy', {name: 'privacy', term: term[1]});
				break;
			case 3:
				props.navigation.push('TermsAndPolicy', {name: 'location', term: term[0]});
				break;

			default:
				break;
		}
	};

	return (
		<ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'red'}}>
			<View style={[login_style.wrp_main, {flex: 1}]}>
				<View style={[styles.stageBar, {marginTop: 20 * DP}]}>
					<StageBar
						backgroundBarStyle={styles.backgroundBar} //배경이 되는 bar의 style, width props으로 너비결정됨
						// insideBarStyle={stagebar_style.insideBar} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
						textStyle={[txt.roboto24, stagebar_style.text]} //text의 스타일
						insideBarStyle={{width: 160 * DP, height: 20 * DP, backgroundColor: MAINBLACK, borderRadius: 18 * DP}} //내부 bar의 style, width는 background bar의 길이에서 현재 단계에 따라 변화됨
						current={1} //현재 단계를 정의
						maxstage={4} //전체 단계를 정의
						width={640 * DP} //bar의 너비
					/>
				</View>

				{/* AgreementCheckList */}
				<View style={[temp_style.agreementCheckList, agreementCheck_style.agreementCheckList]}>
					<AssignCheckListItem data={{text: '아래 항목에 전체 동의합니다', detail: false}} onCheck={onPressAceeptAllBtn} />
					<View style={[agreementCheck_style.horizontalSepartor]} />
					<AssignCheckList
						items={userAssign_agreementCheckList}
						onCheck={onPressAcceptItem}
						isCheckAll={acceptAllState}
						onPressDetail={onPressDetail}
					/>
				</View>

				{/* (A)Btn_w654 */}
				<View style={[btn_style.btn_w694, {marginTop: 120 * DP}]}>
					{permissionToNext ? (
						<AniButton btnTitle={'다음'} titleFontStyle={32} btnStyle={'border'} btnLayout={btn_w694_r30} onPress={goToNextStep} />
					) : (
						<AniButton btnTitle={'다음'} titleFontStyle={32} disable={true} btnLayout={btn_w694_r30} onPress={goToNextStep} />
					)}
				</View>
			</View>
		</ScrollView>
	);
};

const userAssign_agreementCheckList = [
	{text: '본인은 만 14세 이상입니다. (필수)', detail: false},
	{text: '서비스 이용약관 동의 (필수)', detail: true},
	{text: '개인정보 수집 이용약관 동의 (필수)', detail: true},
	{text: '위치기반 서비스 이용약관 동의 (필수)', detail: true},
	// {text: '기부내역 이용약관 동의(필수)', detail: true},
	{text: '이벤트 및 마케팅 정보 수신 동의 동의(선택)', detail: true},
];

const styles = StyleSheet.create({
	stageBar: {
		width: 694 * DP,
		height: 32 * DP,
	},
	backgroundBar: {
		width: 640 * DP,
		height: 20 * DP,
		backgroundColor: 'white',
		borderRadius: 20 * DP,
		borderWidth: 4 * DP,
		// borderColor: APRI10,
		borderColor: MAINBLACK,
	},
});
