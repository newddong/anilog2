import React, {useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, FlatList} from 'react-native';
import {lo, txt, btn, item} from 'Templete/style_address';
import FormTxtInput from 'Molecules/input/formtxtinput';
import DP from 'Root/config/dp';
import {SvgWrap} from 'Atom/svgwrapper';
import {SearchIcon, Bracket} from 'Asset/image';
import axios from 'axios';
import qs from 'qs';

export default AddressSearch = props => {
	console.log('data', props.route.params);
	// const [data, setData] = React.useState({keyword:'',...props.route.params?.data,input:{}});
	const [data, setData] = React.useState({
		keyword: props.route.params.addr ? props.route.params.addr.brief : '',
		detail: props.route.params.addr ? props.route.params.addr.detail : '',
	});
	const [addr, setAddr] = React.useState({});
	const [addrList, setAddrList] = React.useState({common: {}, list: []});
	const [page, setPage] = React.useState(1);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const scroll = React.useRef();
	const [isSelect, setIsSelect] = React.useState(false);
	const [detailData, setDetailData] = React.useState(false);

	useEffect(() => {
		// console.log('refresh component');
		// console.log(addr);
		// console.log('props.address', props);
		setAddrList({common: {}, list: []});
		setSelectedIndex(-1);
		search(data.keyword, 1);
	}, [data]);

	useEffect(() => {
		// console.log('selectedindex changed '+selectedIndex );
		// if(selectedIndex>=1){
		// 	scroll.current?.scrollToIndex({index:selectedIndex});
		// }
	}, [selectedIndex]);

	React.useEffect(() => {
		setTimeout(() => {
			if (props.route.params.addr) {
				setAddr({...addr, addr: props.route.params.addr.brief, detailAddr: props.route.params.addr.detail});
				setDetailData(props.route.params.addr.detail);
			}
		}, 500);
	}, [props.route.params?.addr]);

	const search = (keyword, page) => {
		// console.log('search using addr api');
		// console.log('keyword:', keyword);
		if (keyword.length < 2) return;
		axios
			.post(
				'https://www.juso.go.kr/addrlink/addrLinkApi.do',
				qs.stringify({
					confmKey: 'devU01TX0FVVEgyMDIxMTIwNTIyMjgwMzExMTk5Mjk=',
					currentPage: page,
					countPerPage: 60,
					keyword: keyword,
					resultType: 'json',
				}),
			)
			.then(result => {
				// console.log(result);
				setAddrList({
					common: JSON.parse(result.request._response).results.common,
					list: [...addrList.list, ...JSON.parse(result.request._response)?.results.juso],
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	const keywordInput = keyword => {
		if (keyword.nativeEvent.text == '') {
			setIsSelect(false);
		}
		setData({...data, keyword: keyword.nativeEvent.text});
		// console.log('keyword:', keyword.nativeEvent.text);
	};

	const scrollReachedEnd = () => {
		// console.log('page'+page);
		setPage(page + 1);
		if (parseInt(addrList.common.totalCount) > 0) {
			if (addrList.common.countPerPage >= parseInt(addrList.common.totalCount)) {
				return;
			}
			search(data.keyword, page);
		}
	};

	const selectAddr = (addr, index) => {
		console.log('\nindex:' + index);
		console.log('addr:', addr);
		scroll.current?.scrollToIndex({index: index});
		setSelectedIndex(index);
		setIsSelect(true);
		setAddr(addr);
	};

	React.useEffect(() => {
		addr.detailAddr = detailData;
	}, [addr]);

	const inputDetailAddr = e => {
		console.log('inputDetailAddr:', e.nativeEvent.text);
		setAddr({...addr, detailAddr: e.nativeEvent.text.trim()});
		setDetailData(e.nativeEvent.text.trim());
	};

	const summary = () => {
		if (parseInt(addrList.common.totalCount) > 0) {
			if (addrList.common.countPerPage >= parseInt(addrList.common.totalCount)) {
				return addrList.common.totalCount + ' / ' + addrList.common.totalCount;
			}
			return addrList.common.currentPage * addrList.common.countPerPage + ' / ' + addrList.common.totalCount;
		} else {
			return '';
		}
	};

	const complete = () => {
		if (!isSelect) {
			Modal.popOneBtn('?????? ???????????? ?????? \n??????????????? ????????? ?????????.', '??????', () => {
				Modal.close();
			});
		} else if (addr.detailAddr != undefined && detailData != '') {
			props.navigation.navigate({
				name: props.route.params.from,
				key: props.route.params.fromkey,
				params: {addr: addr},
				merge: true,
			});
		} else {
			// alert('?????? ???????????? ????????? ??? ??????????????????.');
			Modal.popOneBtn('?????? ????????? ????????? ?????????.', '??????', () => {
				Modal.close();
			});
		}
	};

	return (
		<View style={lo.wrp_main}>
			<View style={[lo.cntr_contents, lo.shadow]}>
				<View style={lo.cntr_tab}>
					{/* <TouchableWithoutFeedback onPress={() => {}}>
						<View style={[lo.btn_tab]}>
							<Text style={[txt.noto28, txt.gray]}>?????? ??????</Text>
						</View>
					</TouchableWithoutFeedback> */}
					<TouchableWithoutFeedback onPress={() => {}}>
						<View style={[lo.btn_tab, lo.tab_selected]}>
							<Text style={[txt.noto28b, txt.white]}>????????? ??????</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={lo.cntr_msg}>
					<Text style={[txt.noto40b, data.keyword.length > 0 ? txt.gray : txt.maincolor, {lineHeight: 42 * DP}]}>??</Text>
					<View>
						<Text style={[txt.noto20, data.keyword.length > 0 ? txt.gray : txt.maincolor, {lineHeight: 28 * DP}]}>
							??????????????? ????????? ????????? ???????????? ?????? ??????????????? ????????? ?????? ??? ????????? ?????????. (????????? ?????? ??????: WWW.juso.go.kr)
						</Text>
						<Text style={[txt.noto20, data.keyword.length > 0 ? txt.gray : txt.maincolor, , {lineHeight: 28 * DP}]}>???) ?????????, ????????? 432???</Text>
					</View>
				</View>
				<View style={[lo.cntr_form, {marginBottom: 10 * DP}]}>
					<FormTxtInput
						onChange={keywordInput}
						style={lo.form_input}
						inputStyle={[txt.noto28, {includeFontPadding: false, paddingVertical: 0}]}
						placeholder={'???????????? ????????? ?????????.'}
						placeholderTextColor={'#DBDBDB'}
						value={data.keyword}
						onFocus={() => {}}
						onBlur={() => {}}
					/>
					<SvgWrap
						style={{width: 56 * DP, height: 56 * DP}}
						svg={<SearchIcon fill={'#767676'} />}
						onPress={() => {
							alert('??????');
						}}
					/>
				</View>
				{data.keyword.length > 0 && (
					<View style={lo.cntr_msg}>
						<Text style={[txt.noto20, txt.gray, {lineHeight: 28 * DP}]}>
							????????? ????????? <Text style={[txt.noto20, txt.maincolor]}>????????????</Text>??? ????????? ?????????
						</Text>
					</View>
				)}
				{data.keyword.length === 0 && (
					<View style={lo.cntr_msg}>
						<Text style={[txt.noto40b, {lineHeight: 42 * DP}, txt.maincolor]}>??</Text>
						<View>
							<Text style={[txt.noto20, txt.maincolor, {lineHeight: 28 * DP}]}>
								?????? ?????? ?????? ??? ?????? ????????? ????????? ????????? ?????????. ?????? ????????? ?????? ?????? ????????? ????????? ????????? ?????????.
							</Text>
						</View>
					</View>
				)}
			</View>
			{/* {data.keyword.length > 0 && ( */}
			<View style={[lo.cntr_addr_result]}>
				<FlatList
					data={addrList.list}
					refreshing
					renderItem={({item, index}) => <AddrItem data={item} onSelect={selectAddr} index={index} selectedIndex={selectedIndex} />}
					keyExtractor={(item, index) => index}
					onEndReached={scrollReachedEnd}
					onEndReachedThreshold={0.2}
					extraData={selectedIndex}
					ref={ref => (scroll.current = ref)}
					onMomentumScrollBegin={() => {
						setIsSelect(false);
					}}
				/>
				<View style={lo.cntr_addr_result_stat}>
					<Text style={txt.noto20}>{summary()}</Text>
					<TouchableWithoutFeedback
						onPress={() => {
							scroll.current.scrollToIndex({index: 0});
						}}>
						<View style={btn.scrolltop}>
							<Text style={[txt.noto24, txt.gray]}>?????????</Text>
							<SvgWrap style={{width: 40 * DP, height: 38 * DP, transform: [{rotate: '270deg'}]}} svg={<Bracket fill="#767676" />}></SvgWrap>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
			{/* )} */}

			{/* {isSelect && ( */}
			<View style={lo.cntr_footer}>
				<View style={lo.cntr_detail_addr}>
					<Text style={txt.noto24b}>???????????? ??????</Text>
					{/* <Text style={txt.noto24}>???????????? ??????</Text> */}
					<FormTxtInput
						style={lo.form_input}
						inputStyle={[txt.noto24, {includeFontPadding: false, paddingVertical: 0}]}
						defaultValue={data.detail || ''}
						placeholder={'??????????????? ???????????????.'}
						placeholderTextColor={'#DBDBDB'}
						onChange={inputDetailAddr}
					/>
				</View>
				<View style={lo.cntr_msg}>
					<Text style={[txt.noto40b, txt.maincolor, {lineHeight: 42 * DP}]}>??</Text>
					<View>
						<Text style={[txt.noto20, txt.maincolor, {lineHeight: 28 * DP}]}>
							?????? ?????? ?????? ??? ?????? ????????? ????????? ????????? ?????????. ?????? ????????? ?????? ?????? ????????? ????????? ????????? ?????????.
						</Text>
					</View>
				</View>
				<View style={lo.cntr_btn}>
					<TouchableWithoutFeedback onPress={complete}>
						<View style={[btn.confirm_button, btn.shadow]}>
							<Text style={[txt.noto24b, txt.white]}>{'?????? ?????? ??????'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
			{/* )} */}
		</View>
	);
};

const AddrItem = React.memo(props => {
	const isSelect = props.index === props.selectedIndex;
	const select = () => {
		props.onSelect(props.data, props.index);
	};

	return (
		<TouchableWithoutFeedback onPress={select}>
			<View style={item.box_addr}>
				<View style={item.btn_check}>{isSelect && <View style={item.btn_check_selected}></View>}</View>
				<View style={item.box_addr_result}>
					<View style={item.addr_detail}>
						<View style={item.icon_type}>
							<Text style={[txt.noto18, txt.white]}>?????????</Text>
						</View>
						<Text style={[txt.noto24, txt.gray, {width: 456 * DP, lineHeight: 35 * DP}]}>{props.data.roadAddr}</Text>
					</View>
					<View style={item.addr_detail}>
						<View style={item.icon_type}>
							<Text style={[txt.noto18, txt.white]}>??????</Text>
						</View>
						<Text style={[txt.noto24, txt.gray, {width: 456 * DP, lineHeight: 35 * DP}]}>{props.data.jibunAddr}</Text>
					</View>
				</View>
				<Text style={[txt.roboto28, txt.gray]}>{props.data.zipNo}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
});

AddrItem.defaultProps = {
	onSelect: () => {},
};
AddressSearch.defaultProps = {};
