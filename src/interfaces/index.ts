export interface IBuddy {
  _id: string;
  name: string;
  species: number;
  kind: string;
  age: number;
  sex: number;
  weight: number;
  isNeutered: number | null;
  buddyImage: File | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IRecord {
  _id: string;
  doctorName: string | null;
  address: string | null;
  isConsultation: boolean;
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
  age: number;
  buddyImage: string;
  deletedAt: Date | null;
}

export interface IProfilesWrapperProps {
  buddies?: IBuddyProfile[];
  isMe: boolean;
  fetchBuddiesData: () => void;
}
