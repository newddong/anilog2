import React from 'react';
import {txt} from 'Root/config/textstyle';
import {Text, View, TextInput} from 'react-native';
import DP from 'Root/config/dp';
import {GRAY10, GRAY20, GRAY30, BLACK, RED10} from 'Root/config/color';

/**
 * 타임아웃이 추가된 인풋 컴포넌트
 * @param {object} props - Props Object
 * @param {string} props.value - 인풋 값 Default = null
 * @param {string} props.placeholder - 인풋 PlaceHolder
 * @param {string} props.alert_msg - 경고 메시지 (타임아웃과는 별개로 인풋 값이 Validator를 통과하지 못했을 시 출력되는 메시지)
 * @param {string} props.timeout_msg - 시간 초과 메시지
 * @param {number} props.timelimit - 시간 제한 [단위:초]
 * @param {number} props.width - 인풋의 너비
 * @param {(input:string)=>void} props.onChange - 인풋 값 변경 시 콜백, 인풋 값을 반환
 * @param {()=>void} props.onClear - 지우기(X)버튼 클릭에 동작하는 콜백
 * @param {()=>void} props.onStartTimer - 타이머가 시작될 시 동작하는 콜백
 * @param {()=>void} props.onEndTimer - 타이머가 종료될 시 동작하는 콜백
 */
const InputTimeLimit = props => {
	const [input, setInput] = React.useState('');
	const [confirm, setConfirm] = React.useState();
	const inputRef = React.useRef();
	const interval = 1000; //1 sec

	let min = Math.floor((props.timelimit.limit / 60) % 60); //184 나누기 60의 몫
	let sec = Math.floor(props.timelimit.limit % 60); // 184 나누기 60의 나머지
	const [minutes, setMinutes] = React.useState(min);
	const [seconds, setSeconds] = React.useState(sec);
	const [timeOut, setTimeout] = React.useState(false);

	React.useEffect(() => {
		//onStartTimer
		if (props.timelimit.limit == 0) return;
		if (minutes == min && seconds == sec) {
			console.log('처음');
			props.onStartTimer();
		}

		const countdown = setInterval(() => {
			if (parseInt(seconds) > 0) {
				setSeconds(parseInt(seconds) - 1);
			} else {
				if (parseInt(minutes) === 0) {
					//onEndTimer
					setTimeout(true);
					props.onEndTimer();
					clearInterval(countdown);
				} else {
					setMinutes(parseInt(minutes) - 1);
					setSeconds(59);
				}
			}
		}, interval);
		return () => clearInterval(countdown);
	}, [minutes, seconds]);

	React.useEffect(() => {
		setMinutes(Math.floor((props.timelimit.limit / 60) % 60));
		setSeconds(Math.floor(props.timelimit.limit % 60));
		setTimeout(false);
	}, [props.timelimit]);

	const validator = text => {
		//Validation 조건 아직 불분명하기에 length<10일 경우 false로 설정
		if (props.validator && props.validator(text)) {
			props.onValid(true);
			setConfirm(true);
		} else {
			props.onValid(false);
			setConfirm(false);
		}
	};

	const onChange = text => {
		setInput(text);
		validator(text);
		props.onChange(text);
	};

	const getMsg = () => {
		if (input.length == 0 && !timeOut) {
			// return '인증번호를 입력하세요';
			return '3글자 이상 문자 입력 후 인증 요청을 눌러주세요.';
		} else if (!confirm && !timeOut) {
			return props.alert_msg;
		} else if (timeOut) {
			return props.timeout_msg;
		}
	};

	const getBorderColor = () => {
		if (input.length == 0 && !timeOut) {
			return GRAY30;
		} else if (!confirm || timeOut) {
			return RED10;
		}
	};

	return (
		<View style={{flexDirection: 'row'}}>
			<View style={{height: 118 * DP, width: props.width * DP}}>
				{/* 하단테두리 2px이 있기 때문에 inputValue와 82px가 차이가 나도 -2한 80값을 height로 줌 */}
				<View
					style={{
						height: 82 * DP,
						borderBottomWidth: 2 * DP,
						borderBottomColor: getBorderColor(),
						flexDirection: 'row',
					}}>
					<TextInput
						ref={inputRef}
						onChangeText={onChange}
						placeholder={props.placeholder}
						placeholderTextColor={GRAY10}
						keyboardType={'number-pad'}
						style={[
							txt.roboto28,
							{
								//TextInput과 바깥 View와의 거리 24px, lineHeight는 글꼴크기와 일치
								paddingLeft: 24 * DP,
								lineHeight: 44 * DP,
								color: confirm ? BLACK : RED10,
							},
						]}
						value={input}
					/>
					<View style={{position: 'absolute', alignSelf: 'center', right: 0}}>
						<Text
							style={[
								txt.roboto28,
								{
									color: timeOut ? RED10 : GRAY20,
								},
							]}>
							{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
						</Text>
					</View>
				</View>
				<Text style={(txt.noto22, {color: 'red', lineHeight: 36 * DP})}>{getMsg()}</Text>
			</View>
		</View>
	);
};
InputTimeLimit.defaultProps = {
	value: null,
	placeholder: 'placeholder',
	timelimit: 180,
	alert_msg: 'alert_msg',
	timeout_msg: 'timeOut_msg',
	width: 400,
	onChange: e => console.log(e),
	onClear: e => console.log(e),
	onStartTimer: e => console.log(e),
	onEndTimer: e => console.log(e),
};

export default InputTimeLimit;
