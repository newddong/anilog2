export default community_obj = {
	object: {},
	pageToMove: '',
	initial: true,
	current: '',
	reviewFilter: {
		userInterestReview: {
			interests_review: [],
			interests_trip: [],
			interests_etc: [],
			interests_hospital: [],
			interests_interior: [],
			interests_location: {city: '', district: ''},
		},
	},
	review: [],
	free: [],
	deleted_list: [],
	editedList: [],
};

export const pushEditedCommunityList = res => {
	const findIndex = community_obj.editedList.findIndex(e => e._id == res._id);
	if (findIndex != -1) {
		community_obj.editedList[findIndex] = res;
	} else {
		community_obj.editedList.push(res);
	}
};

export const pushReviewList = arr => {
	arr.map((v, i) => {
		const find = community_obj.review.findIndex(e => e._id == v._id);
		if (find == -1) {
			//현 메모리에 저장되어 있지않은 리뷰아이템만 추가
			community_obj.review.push(v);
		} else {
			community_obj.review[find] = v;
		}
	});
};

export const pushFreeList = arr => {
	arr.map((v, i) => {
		const find = community_obj.free.findIndex(e => e._id == v._id);
		if (find == -1) {
			//현 메모리에 저장되어 있지않은 리뷰아이템만 추가
			community_obj.free.push(v);
		} else {
			community_obj.free[find] = v;
		}
	});
};

export const updateReview = (isLike, id, bool, count) => {
	console.log('updateReview isLike', isLike, 'id : ', id, 'count', count);
	if (isLike) {
		if (community_obj.review.length != 0) {
			const findIndex = community_obj.review.findIndex(e => e._id == id);
			console.log('updateReview : findIndex', findIndex);
			if (findIndex != -1) {
				let temp = [...community_obj.review];
				temp[findIndex] = {
					...temp[findIndex],
					community_is_like: bool,
					community_like_count: count,
				};
				community_obj.review = temp;
			}
		}
	} else {
		if (community_obj.review.length != 0) {
			const findIndex = community_obj.review.findIndex(e => e._id == id);
			console.log('updateReview : findIndex', findIndex);
			if (findIndex != -1) {
				let temp = [...community_obj.review];
				temp[findIndex] = {
					...temp[findIndex],
					community_is_favorite: bool,
				};
				community_obj.review = temp;
			}
		}
	}
};
