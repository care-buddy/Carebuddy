import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CommunityCard from '@/components/Community/CommunityCard';
import Button from '@/components/common/Button';
import TopBar from '@/components/common/TopBar';

import type { CommunityData } from '@/constants/tempInterface';

// 임시 데이터
import { dummyCommunities } from '@constants/tempData';

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const mock = new MockAdapter(axiosInstance);

mock.onGet('/api/communities').reply(200, dummyCommunities); // 커뮤니티 목록 받아오기, get 메서드
// mock.onGet('/api/communities').reply(500, '서버 오류 발생'); // 커뮤니티 목록 받아오기, get 메서드

mock
  .onPut(/\/api\/user\/\w+\/joinGroup/)
  .reply(200, '그룹 가입이 완료되었습니다.'); // 그룹 가입, put 메서드

const Community: React.FC = () => {
  const [category, setCategory] = useState<number>(0); // 종 버튼(기본값 강아지)
  const [communities, setCommunities] = useState<CommunityData[] | null>(null); // 커뮤니티 목록
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 종 버튼 클릭 핸들러
  const handleDogCategory = () => {
    if (category === 1) {
      setCategory(0);
    }
  };

  const handleCatCategory = () => {
    if (category === 0) {
      setCategory(1);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      // 커뮤니티 목록을 가져오는 API 호출
      axiosInstance
        .get('/communities')
        .then((response) => {
          if (response.status === 200) {
            setCommunities(response.data);
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

  const handleJoinButtonClick = async () => {
    try {
      const userId = 'abs'; // 임시
      const response = await axiosInstance.put(`/user/${userId}/joinGroup`, {
        communityId: '6617c6acb39abf604bbe8dc2',
      });
      console.log('커뮤니티 가입, 성공', response.data); // 새로운 커뮤니티로 리다이렉트 해주기. 
    } catch (error) {
      setError(error as Error)
    }
  };

  // 유저 정보로 가입된 그룹 확인해서 joined 정보 넣기

  // 로딩, 에러 처리
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
          buttonStyle={category === 0 ? 'square-green' : 'square-white'}
          buttonSize="lg"
          onClick={handleDogCategory}
        >
          강아지
        </Button>
        <Button
          buttonStyle={category === 1 ? 'square-green' : 'square-white'}
          buttonSize="lg"
          onClick={handleCatCategory}
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
              onButtonClick={handleJoinButtonClick}
              joined={true} // 가입 여부를 어떻게 확인해야하는지 모름. 
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
