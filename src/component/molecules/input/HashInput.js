import React from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, Platform} from 'react-native';
import AccountHashList from 'Organism/list/AccountHashList';
import {GRAY20} from 'Root/config/color';
import {findTagAt, isTag, getTagName, findStartIndexOfTag, findEndIndexOfTag} from 'Root/util/stringutil';
import {getUserListByNickname} from 'Root/api/userapi';
import {getHashKeywords} from 'Root/api/hashapi';
import Modal from 'Component/modal/Modal';

export default function HashInput(props) {
	const [value, setValue] = React.useState('');
	const [find, setFind] = React.useState(false);
	const [cursor, setCursor] = React.useState();
	const inputRef = React.useRef();
	const internal = React.useRef({
		value: '',
		text: '',
		textInputCursor: 0, //입력칸의 커서 위치
		cursor: 0, //text에서 커서 위치
		tagStartIdx: 0,
		tagEndIdx: 0,
		currentTag: '',
		editTag: '',
		prevEditTag: '',
		hashStore: new Map(),
		linkStore: new Map(),
		hashKewords: [],
	}).current;
	console.log(internal);
	const [findList, setFindList] = React.useState([]);
	const changeTextRegex = /([#@])([^#@\s]+)/gm;
	const findHashRegex = /[#]([^#\s]+)/g;
	//이벤트는 onChangeText가 onSelectionChange보다 먼저 발생한다.
	//onSelectionChange는 한글의 자모 조립시에는 발생하지 않고, 한 음절이 입력이 끝난 뒤 커서의 위치가 변동되었을 경우만 발생한다.

	const matchId = () => {
		console.log('matchId ', internal.text);
		if (typeof internal.text != 'string') return;
		if (internal.linkStore.size > 0) {
			internal.linkStore.forEach((value, key) => {
				let regex = new RegExp(`&@&@@${key}%&%&@&@`, 'g');
				internal.text = internal.text.replace(regex, `&@&@@${key}%&%${value}&@&@`);
			});
		}
		if (internal.hashStore?.size > 0) {
			internal.hashStore.forEach((value, key) => {
				let regex = new RegExp(`&#&##${key}%&%&#&#`, 'g');
				internal.text = internal.text.replace(regex, `&#&##${key}%&%${value}&#&#`);
			});
		}
		console.log('matchId Result ', internal.text);
	};

	const onChangeText = text => {
		internal.text = text.replace(changeTextRegex, '&$1&$1$1$2%&%&$1&$1'); //디비에 입력될 내용으로 변환
		console.log('onChangeText 1st ', internal.text);
		internal.editTag = findTagAt(internal.textInputCursor, text);
		console.log('onChangeText editTag ', internal.editTag);
		props.onFind && props.onFind(isTag(internal.editTag));
		setFind(isTag(internal.editTag));

		if (isTag(internal.editTag)) {
			if (internal.editTag.startsWith('@')) {
				getUserListByNickname(
					{
						user_nickname: getTagName(internal.editTag),
					},
					result => {
						console.log('user editing', result);
						setFindList(result.msg);
					},
					error => {
						// Modal.alert(error)
						console.log(error);
					},
				);
			}
			if (internal.editTag.startsWith('#')) {
				getHashKeywords(
					{
						hashtag_keyword: getTagName(internal.editTag),
					},
					result => {
						console.log('hash editing', result);
						setFindList(result.msg);
					},
					error => {
						console.log(error);
					},
				);
			}
		} //onChangeText에서 api검색을 수행해야 자모 변경에도 민감하게 반응, 음절 완료시 검색을 하게 하려면 onSelectionChange로 if문을 이동
		internal.value = text;
		setValue(text);
		matchId();
		internal.hashKewords = text.match(findHashRegex);
		props.onChangeText(internal.text, internal.hashKewords);
	};

	const onSelectionChange = e => {
		const {start, end} = e.nativeEvent.selection;
		// if (start == end) {
		internal.textInputCursor = start;
		// }
		console.log('move cursor ', internal.textInputCursor);

		internal.prevEditTag = internal.editTag;
		internal.editTag = findTagAt(start, internal.value); //현재 커서의 위치에서 태그를 찾음
		console.log('move tag ', internal.editTag);

		if (internal.editTag != internal.prevEditTag) {
			console.log('nickname search by move cursor ');
			if (internal.editTag.startsWith('@')) {
				getUserListByNickname(
					{
						user_nickname: getTagName(findTagAt(internal.textInputCursor, internal.value)),
					},
					result => {
						console.log('user selection', result);
						setFindList(result.msg);
					},
					error => {
						console.log(error);
					},
				);
			}
			if (internal.editTag.startsWith('#')) {
				getHashKeywords(
					{
						hashtag_keyword: getTagName(findTagAt(internal.textInputCursor, internal.value)),
					},
					result => {
						console.log('hash selection', result);
						setFindList(result.msg);
					},
					error => {
						console.log(error);
					},
				);
			}
		} //커서 이동시 태그값이 바뀌면 리스트를 갱신

		internal.tagStartIdx = findStartIndexOfTag(internal.textInputCursor, internal.value); //현재 커서가 위치한 단어의 시작 인덱스,
		internal.tagEndIdx = findEndIndexOfTag(internal.textInputCursor, internal.value); //현재 커서가 위치한 단어의 끝 인덱스
		console.log('tag position ', internal.tagStartIdx, internal.tagEndIdx);
		props.onFind && props.onFind(isTag(internal.editTag));
		setFind(isTag(internal.editTag));
		// matchId()
	};

	const userSelect = (user, index) => {
		console.log('userselect ', user, index);
		let nickname = (Platform.OS == 'android' ? '@' : '@') + user.user_nickname;
		let offset = Platform.OS == 'android' ? 0 : 1;

		internal.linkStore.set(user.user_nickname, user._id);
		console.log('within string ', internal.value, 'change current tag ', internal.editTag, ' to selected user nickname ', nickname);

		if (internal.editTag.length == 1) {
			internal.value = internal.value
				.substring(0, internal.tagStartIdx + offset)
				.concat(nickname, internal.value.substring(internal.tagEndIdx))
				.trimEnd()
				.concat(' ');
		} else if (internal.editTag.length > 1) {
			let re = new RegExp(internal.editTag, 'g');
			internal.value = internal.value.replace(re, nickname);
		}
		// internal.value = internal.value.substring(0,internal.tagStartIdx+offset).concat(nickname, internal.value.substring(internal.tagEndIdx)).trimEnd().concat(' ');
		setValue(internal.value);

		inputRef.current.focus();
		props.onFind && props.onFind(false);
		setFind(false);
		onChangeText(internal.value);
	};

	const hashSelect = (hash, index) => {
		console.log('userselect ', hash, index);
		let keyword = (Platform.OS == 'android' ? '#' : '#') + hash.hashtag_keyword;
		let offset = Platform.OS == 'android' ? 0 : 1;

		internal.hashStore.set(hash.hashtag_keyword, hash._id);
		console.log('within string ', internal.value, 'change current tag ', internal.editTag, ' to selected hash keyword ', keyword);

		if (internal.editTag.length == 1) {
			internal.value = internal.value
				.substring(0, internal.tagStartIdx + offset)
				.concat(keyword, internal.value.substring(internal.tagEndIdx))
				.trimEnd()
				.concat(' ');
		} else if (internal.editTag.length > 1) {
			let re = new RegExp(internal.editTag, 'g');
			internal.value = internal.value.replace(re, keyword);
		}
		// internal.value = internal.value.substring(0,internal.tagStartIdx+offset).concat(nickname, internal.value.substring(internal.tagEndIdx)).trimEnd().concat(' ');
		setValue(internal.value);

		inputRef.current.focus();
		props.onFind && props.onFind(false);
		setFind(false);
		onChangeText(internal.value);
	};

	const onFocus = (e) => {
		Modal.closeKeboard();
		props.onFocus&&props.onFocus(e);

	}

	return (
		<>
			<View style={[props.containerStyle, {height: 10 * DP}]}>
				<TextInput
					{...props} //props override
					textAlignVertical={'top'}
					multiline={true}
					value={value}
					onChangeText={onChangeText}
					onFocus={onFocus}
					placeholder={props.placeholder}
					placeholderTextColor={GRAY20}
					selection={cursor}
					ref={inputRef}
					maxLength={props.maxLength}
					onSelectionChange={onSelectionChange}></TextInput>
			</View>

			{find && (
				<View style={{width: '100%', flex: 1, padding: 15 * DP, flexDirection: 'row'}}>
					{/* <AccountList items={findList} onSelect={userSelect} makeBorderMode={false} showCrossMark={false} /> */}
					<AccountHashList data={findList} showFollowBtn={false} onClickLabel={userSelect} onClickHash={hashSelect} />
				</View>
			)}
		</>
	);
}

HashInput.defaultProp = {
	containerStyle: {},
	placeholder: '게시물을 작성하세요',
	onChangeText: (text, hashKewords) => {},
	onFind: isFinding => {},
};
