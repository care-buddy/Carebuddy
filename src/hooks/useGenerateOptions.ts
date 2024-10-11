import { useRecoilValue } from 'recoil';
import userState from '@/recoil/atoms/userState';
import CATEGORY from '@/constants/communityConstants';
import { CommunityData } from '@/types';

// 카테고리(종) 옵션 생성 함수
const getCategoryOptions = (communityIds: CommunityData[]) => [
  { value: 'category', label: '종' }, 
  ...communityIds.map((community) => {
    switch (community.category) {
      case CATEGORY.dog:
        return { value: CATEGORY.dog, label: '강아지' };
      case CATEGORY.cat:
        return { value: CATEGORY.cat, label: '고양이' };
      default:
        return { value: 'unknown', label: '알 수 없음' };
    }
  }),
];

// 커뮤니티 옵션 생성 함수
const getCommunityOptions = (communityIds: CommunityData[]) => [
  { value: 'community', label: '커뮤니티' }, 
  ...communityIds.map((community) => ({
    value: community._id,
    label: community.community,
  })),
];

// 사용자 상태에 따른 옵션 생성하는 커스텀 훅
const useGenerateOptions = () => {
  const user = useRecoilValue(userState); 

  // null 체크를 통해 communityId를 배열로 처리
  const communityIds = user?.communityId || [];

  const categoryOptions = getCategoryOptions(communityIds);
  const communityOptions = getCommunityOptions(communityIds);

  return {
    categoryOptions,
    communityOptions,
  };
};

export default useGenerateOptions;
