import React from 'react';
import {View, Text, FlatList, TouchableWithoutFeedback, ScrollView, Platform, Dimensions, Animated} from 'react-native';
import {txt} from 'Root/config/textstyle';
import DP from 'Root/config/dp';
import Modal from 'Component/modal/Modal';
import {APRI10} from 'Root/config/color';

/**
 * 회전 선택창 모달 컴포넌트
 *
 * @param {Object} props - props object
 * @param {Array.<string>} props.items - 선택 항목의 배열
 * @param {string} props.title - 선택창 제목
 * @param {(item:string)=>void} props.onSelect - 선택 버튼 콜백
 * @param {()=>void} props.onCancel - 취소 버튼 콜백
 *
 */
const RollingSelect = props => {
	const scrollRef = React.useRef();
	const selectedItem = React.useRef();
	const [scrollOffset, setScrollOffset] = React.useState({x: 0, y: 0});

	const items = props.items;
	const itemheight = Math.ceil(50 * DP);
	const layoutHeight = Math.ceil(370 * DP);

	const [scrollList, setScrollList] = React.useState([]);
	const [currentY, setCurrentY] = React.useState(0);
	const onScrollEnd = e => {
		// console.log('onscrollend  ', e.nativeEvent);
		let index = Math.round(e.nativeEvent.contentOffset.y / itemheight);

		if (index < items.length - 1) {
			index = index + items.length;
			scrollRef.current.scrollTo({x: 0, y: itemheight * index, animated: false});
			// setScrollOffset({x:0,y:itemheight*index});
		}

		if (index > items.length * 2 - 1) {
			index = index - items.length;
			scrollRef.current.scrollTo({x: 0, y: itemheight * index, animated: false});
			// setScrollOffset({x:0,y:itemheight*index});
		}

		// setScrollOffset({x:0,y:itemheight*index});
		scrollRef.current.scrollTo({x: 0, y: itemheight * index, animated: true});
		setCurrentY(itemheight * index);
	};

	const onItemSelection = e => {
		selectedItem.current = e;
	};
	const onSelect = () => {
		props.onSelect(selectedItem.current);
		Modal.close();
	};

	const onCancel = () => {
		props.onCancel();
		Modal.close();
	};

	const scrollY = React.useRef(new Animated.Value(0));
	const onScroll = Animated.event([{nativeEvent:{
		contentOffset:{
			y: scrollY.current
		},
	}}],{listener:(e)=>{/*console.log('이벤트',scrollY.current)*/},useNativeDriver:false});

	const onLayout = e => {
		// console.log('Parent onLayout',Platform.OS,e.nativeEvent);
		const showItemNumber = Math.floor(e.nativeEvent.layout.height / itemheight);

		let list = items;
		if (showItemNumber > items.length) {
			let length = 0;
			let count = Math.floor(1 + showItemNumber / items.length);
			// console.log('count',count);
			for (let i = 0; i < Math.floor(1 + showItemNumber / items.length) * 3; i++) {
				// console.log('d',i);
				list = list.concat(items);
			}
			// console.log(list.length);
			// setItemCountInWindow(length);
			setScrollList(list);
		} else {
			// setItemCountInWindow(items.length);
			setScrollList(items.concat(items).concat(items));
		}
		setScrollOffset({x: 0, y: itemheight * Math.floor(items.length + showItemNumber / 2)});
	};

	return (
		<View
			style={{
				height: Platform.OS == 'ios' ? Dimensions.get('window').height : '100%',
				width: Platform.OS == 'ios' ? Dimensions.get('window').width : '100%',
				backgroundColor: '#0009',
				justifyContent: 'flex-end',
			}}>
			<View style={{height: 470 * DP, backgroundColor: '#fff', justifyContent: 'flex-end'}}>
				<View style={{width: '100%', flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
					<TouchableWithoutFeedback onPress={onCancel}>
						<Text style={[txt.noto26b, {color: APRI10}]}>취소</Text>
					</TouchableWithoutFeedback>
					<Text style={txt.noto32b}>{props.title}</Text>
					<TouchableWithoutFeedback onPress={onSelect}>
						<Text style={[txt.noto26b, {color: APRI10}]}>선택</Text>
					</TouchableWithoutFeedback>
				</View>
				<View style={{height: layoutHeight, backgroundColor: '#fff', alignItems: 'center'}} onLayout={onLayout}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						ref={scrollRef}
						contentOffset={scrollOffset}
						scrollEventThrottle={50}
						onMomentumScrollEnd={onScrollEnd}
						onScroll={onScroll}
						style={{height: layoutHeight, width: '100%'}}>
						{scrollList.map((item, index) => (
							<ScrollItem
								index={index}
								key={index}
								scrolloffset={scrollY}
								layoutheight={layoutHeight}
								itemheight={itemheight}
								item={item}
								onItemSelection={onItemSelection}
								currentY={currentY}
							/>
						))}
					</ScrollView>
					<View style={{height: 2 * DP, width: '100%', backgroundColor: '#999999', position: 'absolute', top: 143 * DP, left: 0}} />
					<View style={{height: 2 * DP, width: '100%', backgroundColor: '#999999', position: 'absolute', top: 203 * DP, left: 0}} />
				</View>
			</View>
		</View>
	);
};

RollingSelect.defaultProps = {
	title: '제목',
	items: ['항목1', '항목2', '항목3', '항목4', '항목5'],
	onSelect: e => {
		console.log('onSelect', e);
	},
	onCancel: e => {
		console.log('onCancel', e);
	},
};

/**
 * @typedef {import('react-native-reanimated').useSharedValue} SharedValue
 *
 */

/**
 * 회전 선택창 항목 컴포넌트
 *
 * @param {Object} props - props object
 * @param {string} props.item - 항목 내용
 * @param {number} props.layoutheight - 레이아웃(스크롤 전체)의 높이
 * @param {SharedValue} props.scrolloffset - 스크롤이 움직인 오프셋 값(스크롤 핸들러에서 받아온 값)
 * @param {(item:string)=>void} props.onItemSelection - 항목이 하이라이트(선택) 됐을때 콜백
 *
 */
const ScrollItem = props => {
	const [isSelect, setSelect] = React.useState(false);
	const selectItem = React.useRef('기본값');
	const [itemOffset, setItemOffset] = React.useState(0);
	const scrollOffset = React.useRef(0);
	const offsetInLayout = React.useRef(0);

	const onLayout = e => {
		console.log('Child onLayout', Platform.OS, e.nativeEvent);
		scrollOffset.current = new Animated.Value(e.nativeEvent.layout.y);
		offsetInLayout.current = Animated.subtract(scrollOffset.current,props.scrolloffset.current);
		setItemOffset(e.nativeEvent.layout);
	};

	const rotateX = offsetInLayout.current==0?'90deg':offsetInLayout.current.interpolate({
		inputRange:[-10,props.layoutheight/2,props.layoutheight+10],
		outputRange:['90deg','0deg','90deg']
	});

	const translateY = offsetInLayout.current==0?90/4:offsetInLayout.current.interpolate({
		inputRange:[-10,props.layoutheight/2,props.layoutheight+10],
		outputRange:[-90/4,0,-90/4]
	});

	React.useEffect(()=>{
		console.log('index'+props.index,props.currentY, itemOffset.y);
		let testOffset = itemOffset.y-3*itemOffset.height;
		if(testOffset<=props.currentY+10&&testOffset>=props.currentY-10&&props.currentY!=0){
			setSelect(true);
			props.onItemSelection && props.onItemSelection(props.item);
		}else{
			setSelect(false);
		}
	},[props.currentY])


	const itemSelection = value => {
		if (value < 15 && value > -15) {
			setSelect(true);
			props.onItemSelection && props.onItemSelection(props.item);
		} else {
			setSelect(false);
		}
	};

	return (
		<Animated.View style={[{justifyContent: 'center', height: props.itemheight, width: '100%', alignItems: 'center',transform:[{rotateX:rotateX},{translateY:translateY} ]}]} onLayout={onLayout}>
			<Animated.Text style={[txt.noto28b, {color: isSelect ? 'red' : 'black', includeFontPadding: false}]}>{props.item}</Animated.Text>
		</Animated.View>
	);
};

export default RollingSelect;
