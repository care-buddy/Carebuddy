export interface User {
  // 타입 아직 정확하지는 않음!
  _id: string;
  nickName: string;
  email: string;
  password: string;
  profileImage: string[];
  introduce: string;
  adminNumber: number;
  isTempPassword: number;
  postId: string[];
  commentId: string[];
  buddyId: string[];
  hospitalId: string[];
  communityId: string[];
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}
