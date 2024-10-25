import { useRecoilValue } from 'recoil';
import userState from '@/recoil/atoms/userState';
import CATEGORY from '@/constants/communityConstants';
import { CommunityData } from '@/types';

// 카테고리(종) 옵션 생성 함수
const getCategoryOptions = (communityIds: CommunityData[]) => {
  const categoriesSet = new Set();
  const options = [];

  communityIds.forEach((community) => {
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
    const categoryValue = categoriesSet.has(community.category)
      ? -1
      : community.category;
    if (!categoriesSet.has(community.category)) {
      categoriesSet.add(community.category);
      options.push({ value: categoryValue, label: categoryLabel });
    }
  });

  if (!categoriesSet.has(CATEGORY.dog)) {
    options.unshift({ value: CATEGORY.dog, label: '강아지' }); // 강아지 기본값 추가
  }
  if (!categoriesSet.has(CATEGORY.cat)) {
    options.unshift({ value: CATEGORY.cat, label: '고양이' }); // 고양이 기본값 추가
  }

  options.sort((a, b) => a.value - b.value);

  return [{ value: -1, label: '종' }, ...options]; // 기본 카테고리 값으로 -1 사용
};

// 커뮤니티 옵션 생성 함수
const getCommunityOptions = (communityIds: CommunityData[]) => {
  const communitiesSet = new Set(); // 중복을 방지하기 위한 Set 사용
  const options = [];

  communityIds.forEach((community) => {
    if (!communitiesSet.has(community._id)) {
      communitiesSet.add(community._id);
      options.push({
        value: community._id,
        label: community.community,
        category: community.category ?? -1, // 카테고리가 없으면 -1로 설정
      });
    }
  });

  // 기본값으로 커뮤니티 추가
  options.unshift({ value: 'community', label: '커뮤니티', category: -1 }); // 커뮤니티 기본값 추가
  options.unshift({ value: 'community', label: '커뮤니티', category: 0 }); // '강아지'일때 '커뮤니티'
  options.unshift({ value: 'community', label: '커뮤니티', category: 1 }); // '고양이'일때 '커뮤니티'

  return options; // 기본 카테고리 값으로 -1 사용
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
