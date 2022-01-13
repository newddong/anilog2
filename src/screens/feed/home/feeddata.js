
export const feedData = {
   feedHomeData:{}
};

export const updatePostData = (newdata) => {
   feedData.feedHomeData.list?.forEach((v,i,a)=>{
      if(v._id===newdata._id)a[i]=newdata;
   });
};
export const removeLike = (post) => {
   feedData.feedHomeData.liked?.forEach((v,i,a)=>{
      if(v===post._id)a.splice(i,1);
   });
};

export const addLike = (post) => {
   feedData.feedHomeData.liked?.push(post._id);
};