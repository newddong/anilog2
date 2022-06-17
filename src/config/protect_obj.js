export default protect_obj = {
	protect: [],
	isAdoptMsgShowed: false,
};

export const updateProtect = (id, bool) => {
	console.log('id', id, 'bool : ', bool);
	if (protect_obj.protect.length != 0) {
		const findIndex = protect_obj.protect.findIndex(e => e._id == id);
		console.log('updateReview : findIndex', findIndex);
		if (findIndex != -1) {
			let temp = [...protect_obj.protect];
			temp[findIndex] = {
				...temp[findIndex],
				is_favorite: bool,
			};
			protect_obj.protect = temp;
		}
	}
};
