export interface User {
  adminNumber: number;
  _id: string;
  nickName: string;
  email: string;
  password: string;
  profileImage: string[];
  introduce: string;
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