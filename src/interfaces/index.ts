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
  doctorName: string;
  address: string;
  consultationDate: Date;
  hospitalizationStatus: Date | null;
  disease: string;
  symptom: string;
  treatment: string;
  memo: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
