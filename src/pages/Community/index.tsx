import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import userState from '@/recoil/atoms/userState';

import CommunityCard from '@/components/Community/CommunityCard';
import Button from '@/components/common/Button';
import TopBar from '@/components/common/TopBar';
import axiosInstance from '@/utils/axiosInstance';
import loadingState from '@/recoil/atoms/loadingState';
import validationAlertState from '@/recoil/atoms/validationAlertState';
import ValidationAlert from '@/components/common/ValidationAlert';
import CATEGORY from '@/constants/communityConstants';

import { CommunityData } from '@/types/index';

import useUpdateMe from '@/hooks/useUpdateMe';

const Community: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<number>(0); // 종 버튼
  const [communities, setCommunities] = useState<CommunityData[] | []>([]);
  const [error, setError] = useState<Error | null>(null);
  const user = useRecoilValue(userState);

  const updateMe = useUpdateMe();

  const [, setLoading] = useRecoilState(loadingState);
  const [alertState, setAlertState] = useRecoilState(validationAlertState);

  const isDogCategory = category === CATEGORY.dog;
  const isCatCategory = category === CATEGORY.cat;

  const handleCategoryClick = (newCategory: number) => {
    if (category !== newCategory) {
      setCategory(newCategory);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('communities');
        if (response.status === 200) {
          setCommunities(response.data.data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  const handleJoinButtonClick = async (communityId: string) => {
    if (!user?._id) {
      setAlertState({
        showAlert: true,
        alertMessage: '로그인 후 이용하실 수 있습니다.',
      });
      return;
    }

    try {
      if (confirm('그룹에 가입하시겠습니까?')) {
        const response = await axiosInstance.put(
          `users/${user._id}/joinCommunity`,
          {
            communityId,
          }
        );

        if (response.status === 200) {
          await updateMe();

          navigate(`/community-feed/${communityId}`);
        } else if (response.status === 400) {
          // 사용자가 이미 그룹에 가입된 경우
          alert('사용자가 이미 그룹에 가입되어 있습니다.');
        } else if (response.status === 404) {
          // 사용자나 그룹을 찾을 수 없는 경우
          alert('요청한 사용자나 그룹을 찾을 수 없습니다.');
        } else {
          // 그 외의 에러 처리
          throw new Error('Failed to join community');
        }
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

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
                user.communityId?.some((c) => c._id === community._id)
              }
              communityId={community._id}
            />
          ))}
      </CardContainer>
      {alertState.showAlert && (
        <ValidationAlert
          message={alertState.alertMessage}
          onClose={() => setAlertState({ showAlert: false, alertMessage: '' })}
        />
      )}
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
