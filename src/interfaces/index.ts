export interface Buddy {
  _id: string;
  name: string;
  species: number;
  kind: string;
  age: number;
  sex: number;
  weight: number;
  isNeutered: number | null;
  buddyImage: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Record {
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

export interface BuddyProfile {
  _id: string;
  name: string;
  kind: string;
  age: number;
  buddyImage: string;
  deletedAt: Date | null;
}

export interface ProfilesWrapperProps {
  name?: string;
  buddies?: BuddyProfile[];
  onSubmitBuddy: (newBuddy: BuddyProfile) => void;
  onBuddySelect: (buddyId: string) => void;
}
