import { tempProfileSrc } from '@constants/tempData';
import DefaultPetProfileImg from '@assets/defaultPetProfile.png';

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

// export default dummyBuddies;
