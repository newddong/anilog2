import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {BLACK} from 'Root/config/color';
import {Animal_another_off, Animal_cat_off, Animal_dog_off, Filter60Border, Filter60Filled, WriteBoard} from 'Root/component/atom/icon';
import ReviewList from 'Root/component/organism/list/ReviewList';
import {Animal_another, Animal_cat, Animal_dog} from 'Root/component/atom/icon';
import Modal from 'Root/component/modal/Modal';
import {getCommunityList} from 'Root/api/community';
import Loading from 'Root/component/molecules/modal/Loading';

export default ReviewMain = ({route, navigation}) => {
	const [data, setData] = React.useState('');

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
			case 'etc':
				setFilterData({...filterData, etc: !filterData.etc});
				break;
			default:
				break;
		}
	};

	const [filterData, setFilterData] = React.useState({
		dog: false,
		cat: false,
		etc: false,
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
		navigation.push('CommunityCommentList', {community_object: data[index]});
	};

	const onPressReviewContent = index => {
		navigation.push('ReviewDetail', {community_object: data[index]});
	};

	const onPressWrite = () => {
		navigation.push('CommunityWrite', {isReview: true});
	};

	const g = {
		__v: 0,
		_id: '62449e8c06cdc2f33c14c572',
		community_address: {
			_id: '62449e8c06cdc2f33c14c573',
			normal_address: {_id: '62449e8c06cdc2f33c14c575', address_name: '', city: '', district: ''},
			region: {_id: '62449e8c06cdc2f33c14c576', latitude: '', longitude: ''},
			road_address: {_id: '62449e8c06cdc2f33c14c574', address_name: '', city: '', district: ''},
		},
		community_animal_type: '',
		community_comment_count: 1,
		community_content: '<div>꼭 드셔보세요</div>',
		community_date: '2022-03-30T05:57:16.687Z',
		community_favorite_count: 0,
		community_free_type: '',
		community_interests: {interests_etc: [], interests_hospital: [], interests_interior: [], interests_review: [], interests_trip: ['놀이터']},
		community_is_attached_file: true,
		community_is_delete: false,
		community_is_recomment: false,
		community_is_temporary: false,
		community_like_count: 0,
		community_recent_comment: {
			comment_contents: '손에 손 잡고~',
			comment_id: '62452c0d06cdc2f33c14c72e',
			comment_user_nickname: '자네는고양이어딘가',
		},
		community_title: '신호등 치킨',
		community_type: 'review',
		community_update_date: '2022-03-30T05:57:16.687Z',
		community_writer_id: {
			_id: '623b17b4400ac30b877dd7d0',
			user_nickname: 'Vids1',
			user_profile_uri: 'https://pinetreegy.s3.ap-northeast-2.amazonaws.com/upload/1648039860242_5CEB6D55-F508-4B7C-8B4F-8E4706F6F8BE.jpg',
		},
		type: 'CommunityObject',
	};

	const getData = () => {
		let filtered = [];
		// console.log('data', data[0]);
		if (filterData.dog) {
			const getDogType = data.filter(e => e.community_animal_type == 'dog');
			getDogType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (filterData.cat) {
			const getCatType = data.filter(e => e.community_animal_type == 'cat');
			getCatType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (filterData.etc) {
			const getEtcType = data.filter(e => e.community_animal_type == 'etc');
			getEtcType.map((v, i) => {
				filtered.push(v);
			});
		}
		if (!filterData.dog && !filterData.cat && !filterData.etc) {
			filtered = data;
		}
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
						{!filterData.etc ? (
							<Animal_another onPress={() => onPressAnimalFilter('etc')} />
						) : (
							<Animal_another_off onPress={() => onPressAnimalFilter('etc')} />
						)}
					</View>
				</View>
			</View>
		);
	};

	if (data == '') {
		return <Loading isModal={false} />;
	} else
		return (
			<View style={[style.container]}>
				<FlatList
					data={[{}]}
					listKey={({item, index}) => index}
					renderItem={({item, index}) => {
						return (
							<>
								<ReviewList items={getData()} onPressReviewContent={onPressReviewContent} onPressReply={onPressReply} />
							</>
						);
					}}
					ListHeaderComponent={filterComponent()}
					stickyHeaderIndices={[0]}
				/>
				<View style={[style.write, style.shadowButton]}>
					<WriteBoard onPress={onPressWrite} />
				</View>
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
		paddingTop: 15 * DP,
		paddingBottom: 10 * DP,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
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
