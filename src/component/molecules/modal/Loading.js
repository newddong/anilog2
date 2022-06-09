import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, Image, Animated, Easing} from 'react-native';
import FastImage from 'react-native-fast-image';
import {WHITE, GRAY10, APRI10} from 'Root/config/color';
import DP from 'Root/config/dp';
import Modal from 'Root/component/modal/Modal';
import {useNavigation} from '@react-navigation/core';

/**
 * 버튼이 없는 모달
 *
 * @todo 모달창이 없어지기 위한 조건을 넣어야함.
 *
 * @param {Object} props - props object
 * @param {boolean} props.isModal - 모달인지 여부
 * @param {boolean} props.smallBox - 컴포넌트 형식일 경우 height
 * @param {()=>void)} props.timeout - 타임아웃 콜백
 *
 */
const Loading = props => {
	const timerRef = useRef(null);
	React.useEffect(() => {
		timerRef.current = setTimeout(() => {
			if (props.isModal) {
				Modal.close();
				setTimeout(() => {
					Modal.popOneBtn('오류가 발생하였습니다. \n 잠시후 다시 이용해주세요. ', '확인', () => {
						props.timeout();
					});
				}, 200);
			}
		}, 10000);
		return () => {
			if (timerRef.current) {
				// console.log('timerRef.current', timerRef.current);
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	return props.isModal ? (
		<View
			style={[
				style.background,
				{
					backgroundColor: '#0009',
				},
			]}>
			{Platform.OS == 'android' ? (
				<FastImage
					style={{width: 200, height: 200}}
					source={Image.resolveAssetSource(require('Atom/icon/loading.gif'))}
					resizeMode={FastImage.resizeMode.contain}
				/>
			) : (
				<FastImage
					style={{width: 200, height: 200}}
					source={Image.resolveAssetSource(require('Atom/icon/loading.gif'))}
					resizeMode={FastImage.resizeMode.contain}
				/>
			)}
		</View>
	) : (
		<View
			style={[
				style.background,
				{
					backgroundColor: '#fff',
					justifyContent: 'flex-start',
					flex: 1,
				},
				props.smallBox
					? {
							width: 400 * DP,
							height: 400 * DP,
							// alignItems: 'center',
							alignSelf: 'center',
					  }
					: {},
			]}>
			<FastImage
				style={{width: 200, height: 200}}
				source={Image.resolveAssetSource(require('Atom/icon/loading_dense.gif'))}
				resizeMode={FastImage.resizeMode.contain}
			/>
		</View>
	);
};

Loading.defaultProps = {
	popUpMsg: 'popUp',
	isModal: true,
	smallBox: false,
	height: 700 * DP,
	timeout: () => {
		Modal.close();
	},
};

const style = StyleSheet.create({
	background: {
		backgroundColor: '#0009',
		width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
		height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popUpWindow: {
		backgroundColor: WHITE,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40 * DP,
		minHeight: 126 * DP, //UX 모달크기 변경(22.02.03 - 상우)
	},
	msg: {
		// marginBottom: 30 * DP,
		// marginTop: 30 * DP,
		// maxWidth: 466 * DP, // 상우 추가
		padding: 40 * DP, // 상우 추가
		textAlignVertical: 'center',
		color: GRAY10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		shadowOffset: {
			width: 1 * DP,
			height: 2 * DP,
		},
		elevation: 2,
	},
});

export default Loading;
