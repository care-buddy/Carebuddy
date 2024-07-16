import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CommunityCard from '@/components/Community/CommunityCard';
import Button from '@/components/common/Button';
import TopBar from '@/components/common/TopBar';

// 임시 데이터
import { dummyCommunities } from '@constants/tempData';

interface CommunityData {
  _id: '';
  category: 0;
  community: '';
  introduction: '';
  deletedAt: null;
}

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const mock = new MockAdapter(axiosInstance);

mock.onGet('/api/communities').reply(200, dummyCommunities); // 글 목록 받아오기, get 메서드

const Community: React.FC = () => {
  const [species, setSpecies] = useState<boolean>(true); // 종 버튼(true가 강아지)
  const [communities, setCommunities] = useState<CommunityData[] | null>(null);

  // 종 버튼 클릭 핸들러
  const handleSpecies = () => {
    setSpecies((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      // 커뮤니티 목록
      try {
        const response = await axiosInstance.get(`/communities`);
        console.log('Component mounted, making API call...', response.data); // 임시

        setCommunities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <TopBar category="커뮤니티" title="모든 커뮤니티" />
      <ButtonContainer>
        <Button
          buttonStyle={species ? 'square-green' : 'square-white'}
          buttonSize="lg"
          onClick={handleSpecies}
        >
          강아지
        </Button>
        <Button
          buttonStyle={!species ? 'square-green' : 'square-white'}
          buttonSize="lg"
          onClick={handleSpecies}
        >
          고양이
        </Button>
      </ButtonContainer>
      <CardContainer>
        {communities?.map((community) => (
          <CommunityCard
            key={community._id}
            name={community.community}
            introduction={community.introduction}
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
