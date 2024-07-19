// 임시. interface 모아놓은 곳

// 댓글
export interface CommentData {
  userId: {
    _id: string;
    nickName: string;
    profileImage: string[];
  };
  text: string;
  deletedAt: string;
  _id: string;
  createdAt: string;
}

// 게시글

// 임시 - 추후에 type만 모아서 새로 정리 필요
export interface PostData {
  _id: string;
  userId: {
    nickName: string;
    profileImage: string[];
    deletedAt: string;
  };
  communityId: {
    _id: string;
    category: string | number;
    community: string;
    deletedAt: string;
  };
  title: string;
  likedUsers: string[];
  content: string;
  deletedAt: string;
  postImage: string[];
  createdAt: string;
}