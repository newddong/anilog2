export default protect_obj = {
	protect: [],
	isAdoptMsgShowed: false,
};

export const updateProtect = (id, bool) => {
	console.log('id', id, 'bool : ', bool);
	if (protect_obj.protect.length != 0) {
		const findIndex = protect_obj.protect.findIndex(e => e._id == id);
		console.log('updateProtect : findIndex', findIndex);
		if (findIndex != -1) {
			let temp = [...protect_obj.protect];
			temp[findIndex].is_favorite = bool;
			protect_obj.protect = temp;
		}
	}
};

export const pushProtect = arr => {
	arr.map((v, i) => {
		const find = protect_obj.protect.findIndex(e => e._id == v._id);
		if (find == -1) {
			//현 메모리에 저장되어 있지않은 피드아이템만 추가
			protect_obj.protect.push(v);
		}
	});
	console.log('arr', protect_obj.protect.length);
};
