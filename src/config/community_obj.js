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
