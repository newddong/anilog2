export default feed_obj = {
	shouldUpdateByEdit: false,
	shouldUpdateByComment: false,
	edited_list: [],
	edit_obj: {},
	list: [],
	deleted_obj: {},
	deleted_list: [],
	mainHomeFeedList: [],
	shouldUpdateUserProfile: false,
	feed_writer: '',
};

export const pushEditedFeedList = res => {
	const findIndex = feed_obj.edited_list.findIndex(e => e._id == res._id);
	if (findIndex != -1) {
		feed_obj.edited_list[findIndex] = res;
	} else {
		feed_obj.edited_list.push(res);
	}
};
