export interface Buddy {
  _id: string;
  name: string;
  species: number;
  kind: string;
  age: number;
  sex: number;
  weight: number;
  isNeutered: number | null;
  buddyImage: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
