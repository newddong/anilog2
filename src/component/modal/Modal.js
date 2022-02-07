/**
 * 모달 모듈
 */
export default Modal = {
	/**
	 * 모달창 종료 함수
	 *
	 * 모달은 스택으로 쌓이므로 가장 나중에 호출된 모달창이 사라짐
	 * ```js
	 * Modal.close()
	 * ```
	 */
	close: () => {},

	/**
	 * 두버튼 모달창을 띄우는 함수
	 * @param {string} msg - 팝업창 메세지
	 * @param {string} noMsg - 취소 버튼 메시지
	 * @param {string} yesMsg - 확인 버튼 메시지
	 * @param {()=>void} onNo - 취소 버튼의 콜백함수
	 * @param {()=>void} onYes - 확인 버튼의 콜백함수
	 */
	popTwoBtn: (msg, noMsg, yesMsg, onNo, onYes) => {},

	/**
	 * 버튼없는 모달창을 띄우는 함수
	 * @param {string} msg - 팝업창 메세지
	 */
	popNoBtn: msg => {},

	/**
	 * 버튼이 한개인 모달창을 띄우는 함수
	 * @param {string} msg - 팝업창 메세지
	 * @param {string} okMsg - 확인 버튼 메시지
	 * @param {()=>void} onOk - 확인 버튼의 콜백함수
	 */
	popOneBtn: (msg, okMsg, onOk) => {},

	/**
	 * 컴포넌트를 모달로 띄우는 함수
	 * @param {React.FC} component - 팝업할 컴포넌트
	 */
	popDrop: component => {},

	/**
	 * 달력 선택창을 모달로 띄우는 함수
	 * @param {boolean} visible - 달력 모달 열기 true/false
	 * @param {()=>void} onOff - 달력 모달 닫기 콜백
	 * @param {(moment.Moment)=>void} date - 날짜 선택 반환값(Date타입)
	 * @param {boolean} past - 과거 날짜만 선택가능
	 * @param {boolean} future - 미래 날짜만 선택가능
	 * @param {boolean} multiple - 다중선택 가능
	 */
	popCalendar: (visible, onOff, date, past, future, multiple) => {},

	/**
	 * 회전 선택창을 모달로 띄우는 함수
	 * ```js
	 * Modal.rollingSelect('제목',['항목1','항목2','항목3'],(item)=>{},()=>{})
	 * ```
	 * @param {string} title - 선택창 타이틀
	 * @param {Array.<string>} items - 선택항목 목록
	 * @param {(event:string)=>void} onSelect - 선택항목을 반환하는 콜백
	 * @param {()=>void} onCance - 취소 버튼의 콜백함수
	 */
	rollingSelect: (title, items = [''], onSelect, onCancel = Modal.close) => {},

	/**
	 * 선택 모달창을 띄우는 함수(첫번째 선택에 따라 두번째 선택의 항목이 변하는 부분은 구현되지 않음)
	 * @param {Array.<string>} primaryItems - 첫번째 항목 배열
	 * @param {Array.<string>} secondaryItems - 두번째 항목 배열
	 * @param {(primaryItem:string,secondaryItem:string)=>void} onOk - 선택항목들을 반환하는 매개변수가 2개인 콜백
	 * @param {string} okButtonnMsg - 확인버튼에 표시할 텍스트
	 *
	 * @example
	 * Modal.popSelect(['개','고양이','기타'],['리트리버','말티즈','푸들','치와와'],(val1,val2)=>alert(val1+':'+val2),'동물선택');
	 */
	popSelect: (primaryItems, secondaryItems, onOk, okButtonnMsg) => {},

	/**
	 * 아바타 동물을 선택하는 모달창
	 *
	 * @param {string} okButtonnMsg - 확인 버튼 메시지
	 * @param {(petObject:string)=>void} onSelectPet - 반려동물 라벨을 클릭했을때 콜백
	 * @param {boolean} props.isBtnMode - 버튼출력여부
	 *
	 *
	 * @example
	 * Modal.popSelect(['개','고양이','기타'],['리트리버','말티즈','푸들','치와와'],(val1,val2)=>alert(val1+':'+val2),'동물선택');
	 */
	popAvatarSelectModal: (onSelectPet, okButtonnMsg, isBtnMode) => {},

	/**
	 * 반려 동물을 선택하는 모달창
	 * @param {Array.<string>} items -  배열
	 * @param {string} title - 확인 버튼 메시지
	 * @param {(string)=>void} onSelect - 확인 버튼 콜백
	 *
	 * @example
	 */
	popRadioSelect: (items, title, onSelect) => {},

	/**
	 * 선택 모달창을 띄우는 함수(첫번째 선택에 따라 두번째 선택의 항목이 변하는 부분은 구현되지 않음)
	 * @param {string} primaryItem - 첫번째 항목 초기값
	 * @param {string} secondaryItem - 두번째 항목 초기값
	 * @param {(primaryItem:string,secondaryItem:string)=>void} onOk - 선택항목들을 반환하는 매개변수가 2개인 콜백
	 * @param {string} okButtonnMsg - 확인버튼에 표시할 텍스트
	 *
	 * @example
	 * Modal.popPetSelect('개','리트리버'],(val1,val2)=>alert(val1+':'+val2),'동물선택');
	 */
	popPetSelect: (primaryItem, secondaryItem, onOk, okButtonnMsg) => {},

	/**
	 * 보호동물 등록 세부사항 요약 모달
	 * @param {object} data - 첫번째 항목 초기값
	 * @param {()=>void} onOk - 선택항목들을 반환하는 매개변수가 2개인 콜백
	 * @param {()=>void} onClose - 선택항목들을 반환하는 매개변수가 2개인 콜백
	 *
	 * @example
	 * Modal.popProtectPetDetails(data, ()=>alert('등록'),()=>alert('취소'), );
	 */
	popProtectPetDetails: (data, onOk, onClose) => {},

	/**
	 * 스크롤뷰 형태의 모달창을 띄우는 함수(하단 스크롤뷰 셀렉트 모달)
	 * @param {object} data - 선택항목 리스트 , 최대 두 개의 길이의 오브젝트 배열 타입
	 * @param {string} header - 선택항목 제목 / 빈 값일 시 '취소' 출력
	 * @param {(data,data)=>void} onSelect - 완료 버튼 클릭 콜백 / 선택항목들을 반환하는 매개변수가 2개인 콜백
	 * @param {()=>void} onClose - 헤더 타이틀이 빈 값일 경우 '취소'가 타이틀로 출력되며, 해당 '취소' 버튼 클릭 시 수행되는 콜백 함수
	 *
	 * @example
	 */
	popSelectScrollBoxModal: (data, header, onSelect) => {},

	/**
	 * 날짜 선택창 모달을 띄우는 함수(하단 스크롤뷰 셀렉트 모달)
	 * @param {string} header - 선택항목 제목
	 * @param {(date)=>void} onSelect - 선택항목들을 반환하는 매개변수가 2개인 콜백
	 *
	 * @example
	 */
	popSelectDateModal: (header, onSelect) => {},

	/**
	 * 선택 모달창을 띄우는 함수(중앙 일반 셀렉트 모달)
	 * @param {object} data - 선택항목 리스트
	 * @param {()=>void} onSelect - 선택항목들을 반환하는 매개변수가 2개인 콜백
	 * @param {()=>void} onClose - x마크 클릭 콜백 함수
	 * @param {boolean} headerRoof - 모달 헤더 부분 지붕 존재 유무
	 * @param {string} headerTitle - 모달 헤더 타이틀 문자열
	 *
	 * @example
	 */
	popSelectBoxModal: (data, onSelect, onClose, headerRoof, headerTitle) => {},

	/**
	 * 유저 오브젝트 정보 요약 출력 모달
	 * @param {object} data - 유저 오브젝트 정보
	 * @param {()=>void} onClose - x마크 클릭 콜백 함수
	 *
	 * @example
	 */
	popInformationModal: (data, onClose) => {},

	/**
	 * 반려동물의 가족계정 추가 컨펌 모달
	 * @param {object} data - 추가할 가족 계정의 오브젝트 정보
	 * @param {()=>void} onYes - x마크 클릭 콜백 함수
	 * @param {()=>void} onNo - x마크 클릭 콜백 함수
	 *
	 * @example
	 */
	popAddFamilyModal: (data, onYes, onNo) => {},

	/**
	 * 버튼 두개의 선택 모달
	 * @param {object} data - 추가할 가족 계정의 오브젝트 정보
	 * @param {string} msg - 모달 타이틀
	 * @param {(selectedItem:string)=>void} onYes - Ok버튼 콜백
	 * @param {()=>void} onNo - No버튼 콜백
	 * @param {string} yesMsg - 확인 버튼 타이틀
	 * @param {string} noMsg - 취소 버튼 타이틀
	 *
	 * @example
	 */
	popTwoBtnSelectModal: (data, msg, onYes, onNo, noMsg, yesMsg) => {},

	/**
	 * 버튼 한개의 선택 모달
	 * @param {object} data - 추가할 가족 계정의 오브젝트 정보
	 * @param {string} msg - 모달 타이틀
	 * @param {(selectedItem:string)=>void} onYes - Ok버튼 콜백
	 * @param {()=>void} onNo - No버튼 콜백
	 * @param {string} yesMsg - 확인 버튼 타이틀
	 * @param {string} noMsg - 취소 버튼 타이틀
	 *
	 * @example
	 */
	popOneBtnSelectModal: (data, msg, onYes, yesMsg) => {},

	/**
	 * 나의 보호소 출신 동물 / 보호동물 및 보호요청게시글 게이트웨이 모달
	 * @param {object} data - 선택한 보호동물의 정보
	 * @param {()=>void)} onPressAdoptorInfo - 입양처보기 버튼 타이틀
	 * @param {()=>void)} onPressReqeustInfo - 게시글보기 버튼 타이틀
	 *
	 * @example
	 */
	popAnimalInfoModal: (data, onYes, onNo) => {},

	/**
	 * 입양 및 임시보호 동물 알림 모달
	 * @param {object} data - 선택한 보호동물의 정보
	 * @param {()=>void)} onYes - 등록 버튼 클릭
	 * @param {()=>void)} onNo - 나가기 버튼 클릭
	 *
	 * @example
	 */
	popAdoptionInfoModal: (data, onYes, onNo) => {},

	/**
	 * 반려동물의 백신예정일 알람()
	 * @param {object} data - 추가할 가족 계정의 오브젝트 정보(필요 데이터 - 해당 달, 펫 닉네임, 필요한 백싱 )
	 * @param {()=>void)} onClose - X마크 클릭

	 * @example
	 */
	popTopAlarm: (data, onClose) => {},

	/**
	 * 관심사 추가 및 수정 모달
	 * @param {object} data - 관심사 추가할 계정 object(반려동물 혹은 유저)
	 * @param {(selectedData)=>void)} onSave - 저장 버튼 클릭 콜백 / 선택된 항목의 오브젝트( ex : 지역, 미용, 놀이, 건강 등)
	 * @param {()=>void)} onClose - 페이지 좌상단 x버튼 클릭 / 종료 콜백
	 *
	 * @example
	 */
	popInterestTagModal: (data, onSave, onClose) => {},

	/**
	 * 공유 - 공유 목록 출력 모달
	 * @param {()=>void} props.onPressKakao - 카카오톡 클릭
	 * @param {()=>void} props.onPressLinkCopy - 링크복사 클릭
	 * @param {()=>void} props.onPressMsg - 메시지 클릭
	 * @example
	 */
	popSocialModal: (onPressKakao, onPressLinkCopy, onPressMsg) => {},

	popInfoModal: () => {},

	alert: () => {},

	closeKeboard: () => {},
};
// items, selectMsg, exitMsg, onSelect, onExit
