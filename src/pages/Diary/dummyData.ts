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
    isConsultation: true,
    consultationDate: new Date('2024-04-09T07:00:00.000Z'),
    hospitalizationStatus: false,
    disease: '감기1',
    symptom: ['콧물', '기침'],
    treatment: ['해열제', '진통주사', '기침약'],
    memo: null,
    deletedAt: null,
    createdAt: new Date('2024-04-08T07:00:00.000Z'),
    updatedAt: new Date('2024-04-08T07:00:00.000Z'),
  },
  {
    _id: '2r',
    doctorName: null,
    address: null,
    isConsultation: false,
    consultationDate: new Date('2024-04-08T07:00:00.000Z'),
    hospitalizationStatus: true,
    disease: '감기2',
    symptom: [],
    treatment: [],
    memo: '메모메모',
    deletedAt: null,
    createdAt: new Date('2024-04-08T07:00:00.000Z'),
    updatedAt: new Date('2024-04-08T07:00:00.000Z'),
  },
];

export const dummyRecord2 = null;
