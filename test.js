import React from 'react';
import {View, Text, FlatList, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {txt} from 'Root/config/textstyle';
import Animated, {useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, runOnJS, ceil} from 'react-native-reanimated';
import DP from 'Root/config/dp';

export default RollingSelect = props => {
	
	
	const scrollRef = React.useRef();
	const scrollOffsetY = useSharedValue(0);
	// const [itemCountInWindow, setItemCountInWindow] = React.useState(0); 
	const selectedItem = React.useRef();
	const [scrollOffset, setScrollOffset] = React.useState({x:0,y:0});
	
	const items = props.items;
	const itemheight = Math.ceil(50*DP);
	const layoutHeight = Math.ceil(370*DP);

	const [scrollList, setScrollList] = React.useState([]);

	const scrollHandler = useAnimatedScrollHandler(event => {
		scrollOffsetY.value = event.contentOffset.y;
	});
	
	const onScrollEnd = e => {
		let index = Math.round(e.nativeEvent.contentOffset.y / itemheight);
		
		
		if(index<items.length-1){
			index = index + items.length;
			scrollRef.current.scrollTo({x:0,y:itemheight*index,animated:false});
			// setScrollOffset({x:0,y:itemheight*index});
		}
		

		if(index>items.length*2-1){
			index = index - items.length;
			scrollRef.current.scrollTo({x:0,y:itemheight*index,animated:false});
			// setScrollOffset({x:0,y:itemheight*index});
		}

		scrollRef.current.scrollTo({x:0,y:itemheight*index,animated:true});

	};
	const onItemSelection = e => {
		console.log('선택',e);
		selectedItem.current = e;
	}
	const onSelect = () => {
		props.onSelect(selectedItem.current);
	}

	const onCancel = () => {
		props.onCancel();
	}

	const onLayout = e => {
		const showItemNumber = Math.floor(e.nativeEvent.layout.height/itemheight);
		
		let list = items;
		if(showItemNumber > items.length){
			let length = 0;
			let count = Math.floor(1+showItemNumber/items.length)
			console.log('count',count);
			for(let i=0;i<Math.floor(1+showItemNumber/items.length)*3;i++){
				console.log('d',i);
				list=list.concat(items);
			}
			console.log(list.length);
			// setItemCountInWindow(length);
			setScrollList(list);
		}else{
			// setItemCountInWindow(items.length);
			setScrollList(items.concat(items).concat(items));
		}
		setScrollOffset({x:0,y:itemheight*Math.floor(items.length+showItemNumber/2)});
	}
	console.log('reder')
	return (
		<View style={{flex: 1, backgroundColor: '#0009', justifyContent: 'flex-end'}}>
			<View style={{height: 470*DP, backgroundColor: '#fff', justifyContent: 'flex-end'}}>
				<View style={{width:'100%',flex:1,justifyContent:'space-around',flexDirection:'row',alignItems:'center'}}>
					<TouchableWithoutFeedback onPress={onCancel}>
					<Text style={txt.noto26b}>취소</Text>
					</TouchableWithoutFeedback>
					<Text style={txt.noto32b}>{props.title}</Text>
					<TouchableWithoutFeedback onPress={onSelect}>
					<Text style={txt.noto26b}>선택</Text>
					</TouchableWithoutFeedback>
				</View>
				<View style={{height: layoutHeight, backgroundColor: '#fff', alignItems: 'center'}} onLayout={onLayout}>
					<Animated.ScrollView
						showsVerticalScrollIndicator={false}
						ref={scrollRef}
						contentOffset={scrollOffset}
						onMomentumScrollEnd={onScrollEnd}
						onScroll={scrollHandler}
						style={{height: layoutHeight,width:'100%'}}
						contentContainerStyle={{}}>
						{scrollList.map((item, index) => (
							<ScrollItem index={index} key={index} scrolloffset={scrollOffsetY} layoutheight={layoutHeight} itemheight={itemheight} item={item} onItemSelection={onItemSelection}/>
						))}
					</Animated.ScrollView>

					{/* <View style={{height: 60*DP, width: '100%', borderColor:'black',borderTopWidth:2*DP,borderBottomWidth:2*DP, position: 'absolute', top: 143*DP,left:0}} /> */}
					<View style={{height: 2*DP, width: '100%',backgroundColor:'#999999',position: 'absolute', top: 143*DP,left:0}} />
					<View style={{height: 2*DP, width: '100%',backgroundColor:'#999999',position: 'absolute', top: 203*DP,left:0}} />
				</View>
			</View>
		</View>
	);
};

RollingSelect.defaultProps = {
	title:'제목',
	items:['항목1','항목2','항목3','항목4','항목5'],
	onSelect:e=>{console.log('onSelect',e)},
	onCancel:e=>{console.log('onCancel',e)}

}


const ScrollItem = props => {
	
	const [isSelect, setSelect] = React.useState(false);
	
	const [itemOffset, setItemOffset] = React.useState(0);
	
	const onLayout = e => {
		setItemOffset(e.nativeEvent.layout.y);
	};

	const itemSelection = value => {

		(value < 15 && value > -15 && (setSelect(true) || true)) ||setSelect(false);
		
	};

	React.useEffect(() => {
		props.onItemSelection&&props.onItemSelection(props.item);
	}, [isSelect]);
	
	const itemStyle = useAnimatedStyle(() => {
		let offsetInLayout = itemOffset - props.scrolloffset.value;
		let result = 80 - (180 / props.layoutheight) * offsetInLayout;
		runOnJS(itemSelection)(result);
		return {
			transform: [
				{rotateX: `${(result > 90 ? 90 : result < -90 ? -90 : result)*1}deg`},
				{translateY: -result/4*1},
			],
		};
	});
	return (
		<Animated.View style={[itemStyle,{justifyContent:'center', height: props.itemheight,width:'100%',alignItems:'center'}]} onLayout={onLayout}>
			<Animated.Text style={[txt.noto28b,{color: isSelect ? 'red' : 'black', includeFontPadding:false}]}>
				{props.item}
			</Animated.Text>
		</Animated.View>
	);
};
