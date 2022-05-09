import React from 'react';
import {Text, View, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import {Check50, ImageList48, VideoPlay48} from 'Atom/icon';
import {styles} from 'Atom/image/imageStyle';
import {BLACK, RED10, WHITE} from 'Root/config/color';
import {DEFAULT_PROFILE} from 'Root/i18n/msg';

/**
 * 피드썸네일
 * @param {object} props - Props Object
 * @param {boolean} props.selectMode - Feed 클릭시 테두리 혹은 투명도 스타일 적용 여부
 * @param {object} props.data - 피드 썸네일 데이터( @FeedObject)
 * @param {boolean} props.data.checkBoxState -
 * @param {string} props.data._id -
 * @param {string} props.data.feed_thumbnail -
 * @param {string} props.data.feed_type -
 * @param {Array.<object>} props.data.feed_medias -
 *
 */

const FeedThumbnail = React.memo(props => {
	console.log('FeedThumbnail', props.data);
	const [selected, setSelected] = React.useState(false);
	React.useEffect(() => {
		setSelected(props.data.checkBoxState);
	}, [props.data.checkBoxState]);

	const onSelect = () => {
		props.onSelect(props.data);
		// console.log('FeedThumbnail OnSelect', props.data._id);
		props.selectMode ? setSelected(!selected) : false; //SelectMode가 true일 경우에 한해서만 setSelected로 스타일을 바꿈
	};

	const getFeedIcon = () => {
		const find = props.data.feed_medias.some(v => {
			if (v.is_video) {
				return v.is_video == true;
			}
			return false;
		}); //feed_media의 값 중 is_video값이 true인 경우 true
		//data.medias의 값들 중 video형식의 media가 하나 이상 존재하는 경우
		if (find) {
			return <VideoPlay48 />;
			//data.medias 배열의 길이가 1개 이상인 경우
		} else if (props.data.feed_medias.length > 1) {
			return <ImageList48 />;
		} else return;
	};

	const checkDisplay = () => {
		if (props.selectMode && (selected || props.data.checkBoxState)) {
			return (
				<View style={{position: 'absolute', top: 14 * DP, right: 10 * DP}}>
					<Check50 />
				</View>
			);
		}
	};

	const checkSelect = () => {
		if ((props.selectMode && selected) || (props.selectMode && props.data.checkBoxState)) {
			return (
				<View style={[{opacity: 0.4, backgroundColor: BLACK}]}>
					<Image source={{uri: props.data.feed_thumbnail || DEFAULT_PROFILE}} style={styles.img_square_246} />
				</View>
			);
		} else if (!props.data.checkBoxState || !selected) {
			return <Image source={{uri: props.data.feed_thumbnail || DEFAULT_PROFILE}} style={styles.img_square_246} />;
		}
	};
	return (
		<TouchableWithoutFeedback onPress={onSelect}>
			{/* Select된 상태일 때 불투명도 40% 적용 및 배경색  Black */}
			{/* 그림인지 영상인지 표기(무조건 표기) */}
			<View style={{margin: 2.5 * DP}}>
				<View style={{position: 'absolute', top: 20 * DP, left: 20 * DP, zIndex: 1}}>{getFeedIcon()}</View>
				{checkSelect()}
				{props.data.feed_type == 'missing' || props.data.feed_type == 'report' ? (
					<View
						style={{
							width: 96 * DP,
							height: 56 * DP,
							position: 'absolute',
							justifyContent: 'center',
							backgroundColor: RED10,
							borderTopEndRadius: 20 * DP,
							borderTopLeftRadius: 20 * DP,
							right: 0,
							bottom: 0,
						}}>
						<Text style={[txt.noto28b, {width: 96 * DP, lineHeight: 36 * DP, color: WHITE, textAlign: 'center'}]}>
							{props.data.feed_type == 'missing' ? '실종' : '제보'}
						</Text>
					</View>
				) : (
					<></>
				)}

				{/* 클릭하거나 전체 선택시 체크 표기 - 모드는 선택하기 모드여야 함. */}
				{checkDisplay()}
			</View>
		</TouchableWithoutFeedback>
	);
});
FeedThumbnail.defaultProps = {};
export default FeedThumbnail;
