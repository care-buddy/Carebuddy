export interface IBuddy {
  _id: string;
  name: string;
  species: number;
  kind: string;
  birth: string;
  sex: number;
  weight: number;
  isNeutered: number | null;
  buddyImage: File | null;
  createdAt: Date;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IRecord {
  _id?: string; // 모킹용입니다.
  buddyId?: string; // 버디 수정 후 Record fetch 시 필요
  doctorName: string | null;
  address: string | null;
  consultationStatus: boolean;
  consultationDate: Date | null;
  hospitalizationStatus: boolean | null;
  disease: string;
  symptom: string[];
  treatment: string[];
  memo: string | null;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IBuddyProfile {
  _id: string;
  name: string;
  kind: string;
  birth: string;
  buddyImage: string;
  createdAt: Date;
  deletedAt: Date | null;
}

export interface IProfilesWrapperProps {
  buddies?: IBuddyProfile[];
  isMe: boolean;
  fetchBuddiesData?: () => void;
}

// 유저
export interface User {
  adminNumber?: number;
  _id?: string;
  nickName?: string;
  email?: string;
  password?: string;
  profileImage?: string | File | null;
  introduce?: string;
  isTempPassword?: number;
  postId?: PostData[];
  commentId?: string[];
  buddyId?: IBuddyProfile[];
  hospitalId?: string[];
  communityId?: CommunityData[];
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPublicUser {
  email: string;
  nickName: string;
  introduce: string;
  profileImage: string | File | null;
  communityId?: CommunityData[];
  postId: PostData[];
  buddyId?: [];
}

// 커뮤니티
export interface CommunityData {
  _id: string;
  community: string;
  category: number;
  introduction: string;
  deletedAt: null | string;
}

// 게시글
export interface PostData {
  _id: string;
  userId: {
    nickName: string;
    profileImage: string;
    deletedAt: string;
    _id: string;
  };
  communityId: {
    _id: string;
    category?: string | number;
    community?: string;
    deletedAt?: string;
  };
  title: string;
  likedUsers: string[];
  content: string;
  deletedAt: string;
  postImage: string;
  createdAt: Date;
  commentId: CommentData[];
}

// 댓글
export interface CommentData {
  userId: {
    _id: string;
    nickName: string;
    profileImage?: string;
  };
  text: string;
  deletedAt: string;
  _id: string;
  createdAt: string;
}

export interface ICreatedAt {
  createdAt: Date;
}
