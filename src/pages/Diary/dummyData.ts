import { tempProfileSrc } from '@constants/tempData';
import DefaultPetProfileImg from '@assets/defaultPetProfile.png';
import { Record } from '@/interfaces';

export const dummyBuddies = {
  name: '주인이름',
  buddies: [
    {
      _id: '1a',
      name: '후이',
      kind: '말티즈',
      age: 3,
      buddyImage: tempProfileSrc,
      createdAt: '2024-04-19T09:00:00.463Z',
      updatedAt: '2024-04-19T09:00:00.463Z',
      deletedAt: null,
    },
    {
      _id: '2b',
      name: '쿠키',
      kind: '샴',
      age: 2,
      buddyImage: DefaultPetProfileImg,
      createdAt: '2024-04-19T09:00:00.463Z',
      updatedAt: '2024-04-19T09:00:00.463Z',
      deletedAt: null,
    },
  ],
};

export const dummyBuddies2 = {
  name: '방금가입한 회원',
  buddies: [],
};

export const dummyRecord: Record[] = [
  {
    _id: '1r',
    doctorName: 'Dr.Lee',
    address: 'Seoul, Korea',
    consultationDate: new Date('2024-04-08T07:00:00.000Z'),
    hospitalizationStatus: null,
    disease: '감기1',
    symptom: '기침, 콧물',
    treatment: '해열제',
    memo: null,
    deletedAt: null,
    createdAt: new Date('2024-04-08T07:00:00.000Z'),
    updatedAt: new Date('2024-04-08T07:00:00.000Z'),
  },
  {
    _id: '2r',
    doctorName: '2번 의사',
    address: 'Seoul, Korea',
    consultationDate: new Date('2024-04-08T07:00:00.000Z'),
    hospitalizationStatus: new Date('2024-04-08T07:00:00.000Z'),
    disease: '감기2',
    symptom: '기침, 콧물',
    treatment: '해열제',
    memo: 'null',
    deletedAt: null,
    createdAt: new Date('2024-04-08T07:00:00.000Z'),
    updatedAt: new Date('2024-04-08T07:00:00.000Z'),
  },
];

export const dummyRecord2 = null;
