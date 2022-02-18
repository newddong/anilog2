import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {styles} from 'Atom/image/imageStyle';
import {APRI10, WHITE} from 'Root/config/color';
import {Paw94x90} from 'Atom/icon';

/**
 * 디바이스의 미디어 썸네일을 표시, 선택할때 사용하는 최소단위 컴포넌트
 *
 * @typedef {object} LocalMediaProps
 * @property {object} data - LocalMedia의 데이터
 * @property {boolean} data.state - 미디어의 상태(선택 여부)
 * @property {boolean} data.isVideo - 미디어가 동영상인지 여부
 * @property {string} data.group_name - 미디어의 그룹 이름
 * @property {number} data.timestamp - 미디어가 생성된 timestamp
 * @property {object} data.image - 미디어의 이미지 속성
 * @property {string} data.image.uri - 미디어의 uri
 * @property {number} data.image.playableDuration - 미디어 재생시간
 * @property {number} index - 선택 순서를 표시(다중 선택, isSingleSelection이 false일 때)
 * @property {boolean} isSingleSelection - 단일 선택일때(발자국 표시) true, 다중 선택일때(번호 표시) false
 * @property {(img_uri:string)=>void} onSelect - LocalMedia가 선택될때 콜백, 파일 경로를 넘겨줌
 * @property {(img_uri:string)=>void} onCancel - LocalMedia가 선택 취소될때 콜백, 파일 경로를 넘겨줌
 * @property {boolean} disable - true일때 선택 불가능
 */

/**
 * @type {React.FunctionComponent<LocalMediaProps>}
 *
 */
const LocalMedia = React.memo(props => {
	// console.log(props.index)
	// console.log('props.data', props.data);

	const [isSelect, setSelected] = React.useState(false);

	React.useEffect(() => {
		props.data.state ? setSelected(true) : setSelected(false);
	}, [props.data.state]);

	const onPressMedia = e => {
		if (isSelect) {
			setSelected(false);
			props.onCancel(props.data.image.uri);
		} else {
			setSelected(true);
			props.onSelect(props.data.image.uri);
		}
	};

	const onSelect = e => {
		// console.log("PropsDisable", props.disable)

		if (props.disable) {
			!isSelect ? alert('5초과') : setSelected(!isSelect);
			props.onSelect(props.data.image.uri, !isSelect);
		} else if (!props.disable) {
			setSelected(!isSelect);
			props.onSelect(props.data.image.uri, !isSelect);
		}
	};

	const getStyleOfSelectedItem = () => {
		return isSelect ? [styles.img_square_186, {borderWidth: 4 * DP, borderColor: APRI10, opacity: 0.6}] : styles.img_square_186;
	};

	const getImageOfSelectedItem = () => {
		if (props.isSingleSelection) {
			return (
				<View style={style.paw94}>
					<Paw94x90 />
				</View>
			);
			//다중선택
		} else {
			return (
				<View
					style={{
						width: 44 * DP,
						height: 44 * DP,
						position: 'absolute',
						borderRadius: 20 * DP,
						backgroundColor: APRI10,
						right: 18 * DP,
						top: 12 * DP,
						justifyContent: 'center',
					}}>
					<Text
						style={[
							txt.roboto24,
							{
								alignSelf: 'center',
								color: WHITE,
								lineHeight: 32 * DP,
							},
						]}>
						{props.index}
					</Text>
				</View>
			);
		}
	};

	return (
		<TouchableOpacity onPress={onPressMedia} style={styles.img_square_186}>
			<Image source={{uri: props.data.img_uri}} style={getStyleOfSelectedItem()} />
			{isSelect && getImageOfSelectedItem()}
			{/* {props.data.image.playableDuration != null && (
				<Text style={[txt.roboto22, {color: WHITE, position: 'absolute', left: 10 * DP, bottom: 6 * DP}]}>{props.data.image.playableDuration}</Text>
			)} */}
		</TouchableOpacity>
	);
	// isVideo = true 분기
});

LocalMedia.defaultProps = {
	data: {
		image: {
			uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',
			playableDuration: 0,
		},
		timestamp: 0,
		group_name: 'Picture',
		isVideo: false,
		duration: null,
	},
	index: 1,
	disable: false,
	isSingleSelection: true,
	onSelect: e => console.log(e),
	onCancel: e => console.log(e),
};

const style = StyleSheet.create({
	paw94: {
		width: 94 * DP,
		height: 90 * DP,
		position: 'absolute',
		paddingVertical: 48 * DP,
		paddingHorizontal: 46 * DP,
	},
});

export default LocalMedia;
