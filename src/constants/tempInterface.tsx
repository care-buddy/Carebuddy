// 임시. interface 모아놓은 곳

// 댓글
export interface CommentData {
  userId: {
    _id: '';
    nickName: '';
    profileImage: [''];
  };
  text: '';
  deletedAt: '';
  _id: '';
  createdAt: '';
}

// 게시글

// 임시 - 추후에 type만 모아서 새로 정리 필요
export interface PostData {
  _id: '';
  userId: {
    nickName: '';
    profileImage: [''];
    deletedAt: '';
  };
  communityId: {
    _id: '';
    category: 0;
    community: '';
    deletedAt: '';
  };
  title: '';
  likedUsers: ['', ''];
  content: '';
  deletedAt: '';
  postImage: [''];
  createdAt: '';
}