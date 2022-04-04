import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {BLACK} from 'Root/config/color';
import {Animal_another_off, Animal_cat_off, Animal_dog_off, Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import {getCommunityList} from 'Root/api/community';

export default ReviewMain = ({route, navigation}) => {
	const [data, setData] = React.useState();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => fetchData());
		fetchData();
		return unsubscribe;
	}, []);

	const fetchData = () => {
		getCommunityList(
			{
				community_type: 'review',
			},
			result => {
				// console.log('result / getCommunityList / ArticleMain :', result.msg);
				setData(result.msg.review);
			},
			err => {
				console.log('err / getCommunityList / ArticleMain : ', err);
				Modal.alert(err);
			},
		);
	};

	const onPressAnimalFilter = filter => {
		switch (filter) {
			case 'dog':
				setFilterData({...filterData, dog: !filterData.dog});
				break;
			case 'cat':
				setFilterData({...filterData, cat: !filterData.cat});
				break;
			case 'another':
				setFilterData({...filterData, another: !filterData.another});
				break;
			default:
				break;
		}
	};

	const [filterData, setFilterData] = React.useState({
		dog: false,
		cat: false,
		another: false,
		filter: {
			location: '',
			category: [],
		},
	});

	const onPressFilter = () => {
		Modal.popInterestTagModal(
			'Review',
			{interests_etc: [], interests_hospital: [], interests_interior: [], interests_review: [], interests_trip: []},
			() => Modal.close(),
			() => Modal.close(),
			arg => {
				console.log('arg', arg);
			},
		);
	};

	const onPressReply = index => {
		navigation.push('ReviewCommentList', {feedobject: {_id: '62262a16d38ae5f3c51390d6'}});
	};

	const onPressReviewContent = index => {
		navigation.push('ReviewDetail');
	};

	const onPressWrite = () => {
		navigation.push('CommunityWrite', {isReview: true});
		// navigation.push('CommunityWrite');
	};

	const getData = () => {
		let filtered = data;
		return filtered;
	};

	const filterComponent = () => {
		return (
			<View style={[style.filter]}>
				<View style={[style.shadow_filter]}>
					<Filter60Border onPress={() => onPressFilter('filter')} />
				</View>
				<View style={[style.animalFilter]}>
					<View style={[style.shadow]}>
						{!filterData.dog ? (
							<Animal_dog onPress={() => onPressAnimalFilter('dog')} />
						) : (
							<Animal_dog_off onPress={() => onPressAnimalFilter('dog')} />
						)}
					</View>
					<View style={[style.shadow]}>
						{!filterData.cat ? (
							<Animal_cat onPress={() => onPressAnimalFilter('cat')} />
						) : (
							<Animal_cat_off onPress={() => onPressAnimalFilter('cat')} />
						)}
					</View>
					<View style={[style.shadow]}>
						{!filterData.another ? (
							<Animal_another onPress={() => onPressAnimalFilter('another')} />
						) : (
							<Animal_another_off onPress={() => onPressAnimalFilter('another')} />
						)}
					</View>
				</View>
			</View>
		);
	};

	return (
		<View style={[style.container]}>
			<FlatList
				data={[{}]}
				listKey={({item, index}) => index}
				renderItem={({item, index}) => {
					return (
						<>
							<View style={[style.write, style.shadowButton]}>
								<WriteBoard onPress={onPressWrite} />
							</View>
							<ReviewList items={getData()} onPressReviewContent={onPressReviewContent} onPressReply={onPressReply} />
						</>
					);
				}}
				ListHeaderComponent={filterComponent()}
				stickyHeaderIndices={[0]}
			/>
		</View>
	);
};
ReviewMain.defaultProps = {};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	filter: {
		width: 676 * DP,
		height: 60 * DP,
		marginTop: 30 * DP,
		alignSelf: 'center',
		// paddingTop: 30 * DP,
		marginBottom: 10 * DP,
		flexDirection: 'row',
	},
	animalFilter: {
		width: 396 * DP,
		marginLeft: 220 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	write: {
		position: 'absolute',
		width: 94 * DP,
		height: 94 * DP,
		right: 30 * DP,
		bottom: 40 * DP,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shadow: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		shadowOffset: {
			height: 2 * DP,
			width: 2 * DP,
		},
		elevation: 3,
		backgroundColor: 'white',
		borderRadius: 22 * DP,
	},
	shadow_filter: {
		width: 60 * DP,
		height: 60 * DP,
		backgroundColor: 'white',
		shadowOpacity: 0.5,
		elevation: 2,
		shadowOffset: {
			height: 4 * DP,
		},
		borderRadius: 20 * DP,
	},
	shadowButton: {
		shadowColor: BLACK,
		shadowOpacity: 0.5,
		shadowRadius: 1 * DP,
		shadowOffset: {},
		elevation: 3,
		backgroundColor: 'white',
		borderRadius: 39 * DP,
	},
});
