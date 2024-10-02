import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ListContainer from '@/components/Mypage&Userpage/ListContainer';
import PetCardContainer from '@/components/Mypage&Userpage/PetCardContainer';
import Loading from '@/components/common/Loading';
import UserInfoContainer from '@components/Mypage&Userpage/UserInfoContainer';
import ProfileContainer from '@components/Mypage&Userpage/ProfileContainer';

import SmallModal from '@/components/common/SmallModal';
import UserAsk from '@/pages/Mypage/UserAsk';
import TopBar from '@/components/common/TopBar';

import axiosInstance from '@/utils/axiosInstance';
import { IBuddyProfile } from '@/interfaces';

const Container = styled.div`
  margin: 30px 0;
`;

const Menu = styled.div`
  padding: 10px 10px 10px 0;
  font-weight: bold;
  font-size: 22px;
  border-bottom: 1px solid #cecece;
  padding-bottom: 10px;
`;

const Item = styled.a`
  font-weight: bold;
  padding-right: 40px;
`;

const WithdrawContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Withdraw = styled.div`
  font-size: var(--font-size-ft-1);
  text-decoration: underline;
  cursor: pointer;
`;

interface UserData {
  email: string;
  nickName: string;
  introduce: string;
  profileImage: string[];
  communityId: CommunityPost[];
  postId: PostId[];
  buddyId: [];
}

interface CommunityPost {
  id: string;
  category: number;
  community: string;
  createdAt: string;
}

interface PostId {
  title: string;
  content: string;
  createdAt: Date;
}

interface ApiResponse {
  email: string;
  nickName: string;
  introduce: string;
  profileImage: string[];
  communityId: CommunityPost[];
  postId: ApiPostId[];
  buddyId: [];
}

interface ApiPostId {
  title: string;
  content: string;
  createdAt: string;
}

const Mypage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    nickName: '',
    introduce: '',
    profileImage: [],
    communityId: [],
    postId: [],
    buddyId: [],
  });

  const [buddiesData, setBuddiesData] = useState<IBuddyProfile[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const userId = '66b9b34ae9a13c88c643e361'; // userId 지정 -> 추후 변환 예정

      try {
        // api/users 엔드포인트 호출
        const response = await axiosInstance.get<{ message: ApiResponse }>(`users/${userId}`);
        const data = response.data.message;

        const mappedData: UserData = {
          email: data.email || '',
          nickName: data.nickName || '',
          introduce: data.introduce || '',
          profileImage: data.profileImage || [],
          communityId: data.communityId || [],
          postId: data.postId
            ? data.postId.map((post) => ({
              title: post.title,
              content: post.content,
              createdAt: new Date(post.createdAt),
            }))
            : [],
          buddyId: data.buddyId || [],
        };
        console.log('user 데이터: ', data);
        setUserData(mappedData);
        setBuddiesData(mappedData.buddyId);
      } catch (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIntroduceChange = (newIntroduction: string) => {
    setUserData((prevData) => ({ ...prevData, introduce: newIntroduction }));
    handleUserDataUpdate({ ...userData, introduce: newIntroduction });
  };

  const handleNickNameChange = (newNickname: string) => {
    setUserData((prevData) => ({ ...prevData, nickName: newNickname }));
    handleUserDataUpdate({ ...userData, nickName: newNickname });
  };

  const handleProfileImageChange = (newImage: string[]) => {
    setUserData((prevData) => ({ ...prevData, profileImage: newImage }));
    handleUserDataUpdate({ ...userData, profileImage: newImage });
  };

  const handleUserDataUpdate = async (updatedUserData: UserData) => {
    try {
      const response = await axiosInstance.put('users', updatedUserData);
      console.log('사용자 데이터 업데이트:', response.data);
    } catch (error) {
      console.error('사용자 데이터 업데이트 오류:', error);
    }
  };

  const handleWithdrawClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmWithdraw = () => {
    setIsModalOpen(false);
  };

  const contentItems = [
    {
      id: '1',
      content: '회원정보',
      component: <UserInfoContainer userData={userData} />,
    },
    {
      id: '2',
      content: '프로필',
      component: (
        <ProfileContainer
          userData={userData}
          onIntroduceChange={handleIntroduceChange}
          onNickNameChange={handleNickNameChange}
          onProfileImageChange={handleProfileImageChange}
        />
      ),
    },
    {
      id: '3',
      content: '반려동물 프로필',
      component: <PetCardContainer buddyData={buddiesData} isMe={false} />,
    },
    {
      id: '4',
      content: '작성 글 목록',
      component: (
        <ListContainer postIds={userData.postId} isLoading={isLoading} />
      ),
    },
  ];

  return (
    <Container>
      <TopBar category="회원 정보 수정" title="마이 페이지" />
      {isLoading ? (
        <Loading />
      ) : (
        contentItems.map((item) => (
          <React.Fragment key={item.id}>
            <Menu>
              <Item>{item.content}</Item>
            </Menu>
            {item.component}
          </React.Fragment>
        ))
      )}
      <WithdrawContainer>
        <Withdraw onClick={handleWithdrawClick}>회원탈퇴</Withdraw>
      </WithdrawContainer>
      {isModalOpen && (
        <SmallModal
          component={
            <UserAsk
              onConfirm={handleConfirmWithdraw}
              onCancel={handleCloseModal}
            />
          }
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default Mypage;
