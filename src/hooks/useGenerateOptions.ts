import { useRecoilValue } from 'recoil';
import userState from '@/recoil/atoms/userState';
import CATEGORY from '@/constants/communityConstants';
import { CommunityData } from '@/types';

// 카테고리(종) 옵션 생성 함수
const getCategoryOptions = (communityIds: CommunityData[]) => {
  const categoriesSet = new Set();

  const options = communityIds
    .map((community) => {
      let categoryLabel;

      switch (community.category) {
        case CATEGORY.dog:
          categoryLabel = '강아지';
          break;
        case CATEGORY.cat:
          categoryLabel = '고양이';
          break;
        default:
          categoryLabel = '알 수 없음';
          break;
      }

      // 카테고리가 없으면 -1을 설정
      const categoryValue = categoriesSet.has(community.category) ? -1 : community.category;
      if (!categoriesSet.has(community.category)) {
        categoriesSet.add(community.category);
        return { value: categoryValue, label: categoryLabel };
      }

      return undefined; // 반환하는 값을 명시적으로 undefined로 설정
    })
    .filter((option) => option !== undefined); // undefined가 포함되지 않도록 필터링

  return [{ value: -1, label: '종' }, ...options]; // 기본 카테고리 값으로 -1 사용
};

// 커뮤니티 옵션 생성 함수
const getCommunityOptions = (communityIds: CommunityData[]) => {
  const communitiesSet = new Set(); // 중복을 방지하기 위한 Set 사용

  const options = communityIds
    .map((community) => {
      if (!communitiesSet.has(community._id)) {
        communitiesSet.add(community._id);
        return {
          value: community._id,
          label: community.community,
          category: community.category ?? -1, // 카테고리가 없으면 -1로 설정
        };
      }

      return undefined; // 반환하는 값을 명시적으로 undefined로 설정
    })
    .filter((option) => option !== undefined); // undefined가 포함되지 않도록 필터링

  return [{ value: 'community', label: '커뮤니티', category: -1 }, ...options]; // 기본 카테고리 값으로 -1 사용
};

// 사용자 상태에 따른 옵션 생성하는 커스텀 훅
const useGenerateOptions = () => {
  const user = useRecoilValue(userState);

  // communityId가 null 또는 undefined인 경우 빈 배열로 처리
  const communityIds = user?.communityId ?? [];

  const categoryOptions = getCategoryOptions(communityIds);
  const communityOptions = getCommunityOptions(communityIds);

  return {
    categoryOptions,
    communityOptions,
  };
};

export default useGenerateOptions;
