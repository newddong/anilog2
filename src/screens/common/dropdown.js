import React from 'react';
import { FlatList } from 'react-native';
import {TouchableWithoutFeedback, View, Modal,Text,Animated} from 'react-native';
import DP from 'Screens/dp';

export default Dropdown = props => {
	const component = React.useRef();
	const dropcontainer = React.useRef();
	const [UI, setUI] = React.useState({
		x: 0,
		y: 0,
		height: 0,
		visible: false,
	});

	const open = () => {
		if (UI.visible) {
			setUI({...UI, visible: false});
		} else {
			component.current.measure((fx, fy, width, height, px, py) => {
				// console.log('Component width is: ' + width);
				// console.log('Component height is: ' + height);
				// console.log('X offset to frame: ' + fx);
				// console.log('Y offset to frame: ' + fy);
				// console.log('X offset to page: ' + px);
				// console.log('Y offset to page: ' + py);
				// setPosition({...position, drop: {x: px, y: py, height: height}});
				setUI({x: px, y: py, height: height, visible: true});
			});
		}
		props.onOpen && props.onOpen();
	};
	const close = () => {
		props.onClose && props.onClose();
		// setImmediate(setUI({...UI, visible: false}),500);
		if(props.animation){
			setTimeout(setUI,300,{...UI, visible: false});
		}
		else{
			setUI({...UI, visible: false});
		}
	};

	const onSelectItem = (data)=>{
		props.onSelect(data);
		!props.onSelectNotClose&&close();
	}
	const dropdownContainerStyle = Array.isArray(props.dropdownContainerStyle)?
				[...props.dropdownContainerStyle,{ borderTopWidth: 0 }]:
				{...props.dropdownContainerStyle, borderTopWidth: 0};

	const renderItem = (item) => {
		
		const renderselect = (arg)=>{
			onSelectItem(item);
		}

		const render = props.renderItem?
			<TouchableWithoutFeedback onPress={renderselect}>{props.renderItem({item})}</TouchableWithoutFeedback>:
			<DropItem style={props.dropItemStyle} onChange={onSelectItem} data={item} textStyle={props.dropItemTxtStyle}/>;
		
		return (
			render
		);
	}


	const dropdownItems = () => {
		return (
			
			<FlatList
				data={props.data}
				contentContainerStyle={props.listContainerStyle}
				renderItem={({item})=>renderItem(item)}
				initialNumToRender={10}
				style={{flex:1}}
				windowSize={20}
				keyExtractor={(item,index)=>index}
			/>
			
		);
	}

	const dropdownBackground = () => {

		if(props.animation){
			return (
				<Animated.View style={dropdownContainerStyle} ref={ref=>dropcontainer.current=ref}>
					<Animated.View style={props.listBackgroundStyle}>
					{dropdownItems()}
					</Animated.View>
				</Animated.View>
			);
		}
		else{
			return (
				<View style={dropdownContainerStyle} ref={ref=>dropcontainer.current=ref}>
					<View style={props.listBackgroundStyle}>
					{dropdownItems()}
					</View>
				</View>
			);
		}
	}




	return (
		<>
			
			{/*dropdown menu*/}
			<Modal transparent visible={UI.visible}>
				<View style={{flex: 1}}>
					<TouchableWithoutFeedback onPress={close}>
						<View style={{height: UI.y + UI.height}}>
						</View>
					</TouchableWithoutFeedback>

					<View style={{flexDirection: 'row'}}>
						<TouchableWithoutFeedback onPress={close}>
							<View style={{width: UI.x}}></View>
						</TouchableWithoutFeedback>
							{dropdownBackground()}
						<TouchableWithoutFeedback onPress={close}>
							<View style={{flex: 1}}></View>
						</TouchableWithoutFeedback>
						
					</View>
					<TouchableWithoutFeedback onPress={close}>
						<View style={{flex: 1}}></View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={close}>
						<View style={[props.style,{position:'absolute',top:UI.y,left:UI.x,marginTop:0}]}>
							{props.component}
						</View>
					</TouchableWithoutFeedback>
				</View>
				
			</Modal>
			{/* {<TouchableWithoutFeedback onPress={open}>
				<View style={[props.style,UI.visible&&{opacity:0}]} ref={ref => (component.current = ref)}>
					{props.component}
				</View>
			</TouchableWithoutFeedback>} */}
			{!UI.visible?<TouchableWithoutFeedback onPress={open}>
				<View style={props.style} ref={ref => (component.current = ref)}>
					{props.component}
				</View>
			</TouchableWithoutFeedback>:
			<View style={[props.style,{opacity:1}]}></View>}
			{/* {<TouchableWithoutFeedback onPress={showNomodal?open:close}>
				<View style={[props.style,{opacity:showNomodal?1:0}]} ref={ref => (component.current = ref)}>
					{props.component}
				</View>
			</TouchableWithoutFeedback>} */}
			
		</>
	);
};

Dropdown.defaultProps = {
	data:[], //dropDown에 표시될 항목, array
	onSelect:(data)=>{}, //dropDown의 항목을 선택했을때 실행, 선택된 항목을 argument로 넘김
	onOpen:()=>{},//dropDown을 클릭했을때 실행되는 함수
	onClose:()=>{},//dropDown을 닫을때 실행되는 함수
	animation:false,//dropDown에 애니메이션 적용여부(reanimate라이브러리 사용)
	onSelectNotClose:true,//dropDown 항목을 선택햇을때 dropdown을 바로 닫을지 여부
	dropItemStyle:{},//각 항목을 감싼 view의 style
	dropItemTxtStyle:{},//각 항목의 텍스트 style
	dropdownContainerStyle:{},//최종적인 FlatList의 배경 style을 정의한다. listBackground의 부모 뷰의 style,애니메이션 적용시 배경
	listContainerStyle:{},//각 항목들을 랜더링하는 FlatList의 contentContainerStyle을 정의한다.
	listBackgroundStyle:{},//FlatList를 감싸는 View의 style을 정의한다.애니메이션 적용시 리스트의 애니메이션
	renderItem:undefined,//item을 변수로 받는 함수, (item) => <Touchable>JSX</Touchable>형태로 dropdown의 item들을 
								//FlatList에랜더링한다. 설정되어있지 않으면 기본 DropItem 컴포넌트를 랜더링 한다.
	component:()=>(<></>),//dropdown을 open하도록 하는 버튼 컴포넌트
	style:{},//버튼 컴포넌트를 감싼 view의 스타일
}


export const DropItem = props => {
	const selectItem = (e) => {
		props.onChange(props.data)
	}
	return (
		<TouchableWithoutFeedback onPress={selectItem}>
			<View style={props.style}>
				<Text style={props.textStyle}>{props.data}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

DropItem.defaultProps = {
	onPress: () => {},
	style: {},
	data: '',
	textStyle:{},
};

