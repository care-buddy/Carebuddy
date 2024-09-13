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
  buddyId: string; // 버디 수정 후 Record fetch 시 필요
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
  fetchBuddiesData: () => void;
}
