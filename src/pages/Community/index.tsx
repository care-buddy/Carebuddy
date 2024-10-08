import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CommunityCard from '@/components/Community/CommunityCard';
import Button from '@/components/common/Button';
import TopBar from '@/components/common/TopBar';

import axiosInstance from '@/utils/axiosInstance';

import CATEGORY from '@/constants/communityConstants';

import { CommunityData } from '@/interfaces/index';

import userState from '@/recoil/atoms/userState';

import { User } from '@/types/index';

const Community: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<number>(0); // 종 버튼
  const [communities, setCommunities] = useState<CommunityData[] | []>([]); // 커뮤니티 목록
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const user = useRecoilValue(userState) || ({} as User);

  // 종 버튼 클릭 핸들러
  const isDogCategory = category === CATEGORY.dog;
  const isCatCategory = category === CATEGORY.cat;

  const handleCategoryClick = (newCategory: number) => {
    if (category !== newCategory) {
      setCategory(newCategory);
    }
  };

  // 커뮤니티 목록 가져오기
  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('communities')
        .then((response) => {
          if (response.status === 200) {
            setCommunities(response.data.data);
          } else {
            throw new Error('Failed to fetch data');
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  const handleJoinButtonClick = async (communityId: string) => {
    // 사용자 로그인 여부 확인
    if (!user?._id) {
      alert('로그인 후 그룹에 가입할 수 있습니다.'); // 로그인하지 않은 경우 알림
      return;
    }

    // 가입 확인
    if (confirm('그룹에 가입하시겠습니까?')) {
      try {
        await axiosInstance.put(`users/${user?._id}/joinCommunity`, {
          communityId,
        });
        navigate(`/community-feed/${communityId}`);
      } catch (error) {
        setError(error as Error);
      }
    }
  };

  // 로딩, 에러 처리 - 임시. 미완성
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <TopBar category="커뮤니티" title="모든 커뮤니티" />
      <ButtonContainer>
        <Button
          buttonStyle={isDogCategory ? 'square-green' : 'square-white'}
          buttonSize="lg"
          onClick={() => handleCategoryClick(CATEGORY.dog)}
        >
          강아지
        </Button>
        <Button
          buttonStyle={isCatCategory ? 'square-green' : 'square-white'}
          buttonSize="lg"
          onClick={() => handleCategoryClick(CATEGORY.cat)}
        >
          고양이
        </Button>
      </ButtonContainer>
      <CardContainer>
        {communities
          ?.filter((community) => community.category === category)
          .map((community) => (
            <CommunityCard
              key={community._id}
              name={community.community}
              introduction={community.introduction}
              onButtonClick={() => handleJoinButtonClick(community._id)}
              joined={
                Array.isArray(user?.communityId) &&
                user.communityId?.some((c) => c._id === community._id) // communityId가 배열인지 확인
              }
              communityId={community._id}
            />
          ))}
      </CardContainer>
    </>
  );
};

export default Community;

const ButtonContainer = styled.div`
  padding: 20px 0;

  & > * {
    margin-right: 10px;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
`;
