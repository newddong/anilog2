import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { GRAY10, GRAY20 } from 'Root/config/color';
import { txt } from 'Root/config/textstyle';
import { btn_w226 } from 'Atom/btn/btn_style';
import { Cross46, Cross52 } from 'Atom/icon';
import AniButton from 'Molecules/button/AniButton';
import LocalMedia from 'Molecules/media/LocalMedia';
import { interestTagList, myPetList } from './style_organism';

export default MediaSelect = props => {

    const testData = [1, 2, 3];

    const renderItem = item => {
        return (
            <LocalMedia isSingleSelection={false} />
        );
    };

    return (
        <FlatList data={testData} renderItem={({ item }) => renderItem(item)} numColumns={4} />
    );
};
// // btnTitle: 'title', //버튼의 제목
// 	btnTheme: 'shadow', // btnTheme - ’shadow’, ‘noShadow’, ‘gray’에서 결정
// 	btnStyle: 'filled', // btnStyle - ‘filled’, ‘border’, ‘noBorder’ 에서 결정
// 	disable: false, // disable - 기본값은 false true일 경우 버튼 탭을 할수없도록 하고 표시를 바
// 	titleFontStyle: 24 * DP, // titleFontStyle - title의 폰트 크기
// 	btnLayout: btn_w226, // btnLayout - 버튼의 레이아웃(width, height, borderRadius를 결정)
// 	onPress: {}, // 버튼을 탭했을때 발생하는 콜백





// LocalMedia.defaultProps = {
// 	data: {
// 		img_uri: 'https://consecutionjiujitsu.com/wp-content/uploads/2017/04/default-image.jpg',
// 		isVideo: false,
// 		duration: null,
// 	},
// 	index: 1,
// 	isSingleSelection: true,
// 	onSelect: e => console.log(e),
// };

// {photo.map((p, i) => {
// 	return (
// 		<Image
// 			key={i}
// 			style={{
// 				width: 100,
// 				height: 100,
// 			}}
// 			source={{ uri: p.node.image.uri }}
// 		/>
// 	);
// })}