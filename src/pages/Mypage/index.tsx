import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import Button from '@/components/common/Button';
import ListContainer from '@/components/Mypage&Userpage/ListContainer';
import PetCardContainer from '@/components/Mypage&Userpage/PetCardContainer';
import SmallModal from '@/components/common/SmallModal';
import UserAsk from '@/pages/Mypage/UserAsk';
import Modal from '@/components/common/Modal/index';
import PostCreate from '@/pages/PostCreate/index';
import TopBar from '@/components/common/TopBar';
import Loading from '@/components/common/Loading';
import UserInfoContainer from '@components/Mypage&Userpage/UserInfoContainer';
import ProfileContainer from '@components/Mypage&Userpage/ProfileContainer';
import { useRecoilState } from 'recoil';
import buddyState from '@/recoil/atoms/buddyState';

// Mock API 설정
// const mock = new MockAdapter(axios, { delayResponse: 500 });

// 초기 API 응답 설정
// mock.onGet('/api/user').reply(200, {
//   email: 'carebuddy@naver.com',
//   nickname: '케어버디',
//   introduction: '소개글입니다^^',
//   profileImage: [],
//   communityId: [
//     { id: '1', category: 0, community: '눈', createdAt: '2024-01-01' },
//     { id: '2', category: 0, community: '위식도', createdAt: '2024-01-02' },
//     { id: '3', category: 1, community: '중성화', createdAt: '2024-01-03' },
//   ],
//   postId: [
//     { title: '안녕하세요' },
//     { title: '글제목입니다 ㅎㅎ' },
//     { title: '동물이 최고야!!' },
//   ],
// });

// mock.onPut('/api/user').reply((config) => {
//   const { nickname, introduction, profileImage } = JSON.parse(config.data);
//   // console.log('받은 데이터:', { nickname, introduction, profileImage });
//   return [200, { nickname, introduction, profileImage }];
// });

// mock.onPost('/api/posts').reply((config) => {
//   const { title, content, groupId, postImage } = JSON.parse(config.data);
//   // console.log('게시물 생성:', { title, content, groupId, postImage });
//   return [200, { title, content, groupId, postImage }];
// });

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
  nickname: string;
  introduction: string;
  profileImage: string[];
  communityId: CommunityPost[];
  postId: PostId[];
}

interface CommunityPost {
  id: string;
  category: number;
  community: string;
  createdAt: string;
}

interface PostId {
  title: string;
}

interface FormData {
  title: string;
  content: string;
  groupId: string;
  postImage: string[];
}

const Mypage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    nickname: '',
    introduction: '',
    profileImage: [],
    communityId: [],
    postId: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 회원탈퇴 모달
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 글 수정 모달

  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    groupId: '',
    postImage: [],
  });

  const [buddiesData] = useRecoilState(buddyState);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/user');
        setUserData(response.data);
      } catch (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostSubmit = async () => {
    try {
      const response = await axios.post('/api/posts', formData);
      console.log('게시물 생성됨:', response.data);
      alert('게시글 작성 완료');
      setIsWriteModalOpen(false);
    } catch (error) {
      console.error('게시물 생성 오류:', error);
    }
  };

  const handleIntroductionChange = (newIntroduction: string) => {
    setUserData((prevData) => ({ ...prevData, introduction: newIntroduction }));
    handleUserDataUpdate({ ...userData, introduction: newIntroduction });
  };

  const handleNicknameChange = (newNickname: string) => {
    setUserData((prevData) => ({ ...prevData, nickname: newNickname }));
    handleUserDataUpdate({ ...userData, nickname: newNickname });
  };

  const handleProfileImageChange = (newImage: string[]) => {
    setUserData((prevData) => ({ ...prevData, profileImage: newImage }));
    handleUserDataUpdate({ ...userData, profileImage: newImage });
  };

  const handleUserDataUpdate = async (updatedUserData: UserData) => {
    try {
      const response = await axios.put('/api/user', updatedUserData);
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

  const handleWriteClick = () => {
    setIsWriteModalOpen(true);
  };

  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleFormDataChange = (data: {
    title?: string;
    content?: string;
    groupId?: string;
    postImage?: string[];
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
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
          onIntroductionChange={handleIntroductionChange}
          onNicknameChange={handleNicknameChange}
          onProfileImageChange={handleProfileImageChange}
        />
      ),
    },
    {
      id: '3',
      content: '반려동물 관리',
      component: <PetCardContainer buddyData={buddiesData.buddies} isMe />,
    },
    {
      id: '4',
      content: '작성 글 목록',
      component: (
        <ListContainer
          communityPosts={userData.communityId}
          postIds={userData.postId}
          isLoading={isLoading}
        />
      ),
    },
  ];

  return (
    <Container>
      <TopBar category="회원 정보 수정" title="마이 페이지" />
      <Button onClick={handleWriteClick}>글 작성하기</Button>
      {isWriteModalOpen && (
        <Modal
          title="글 작성하기"
          value="등록"
          component={
            <PostCreate
              formData={formData}
              onFormDataChange={handleFormDataChange}
            />
          }
          onClose={handleCloseWriteModal}
          onHandleClick={handlePostSubmit}
        />
      )}
      <Button onClick={handleEditClick}>글 수정하기</Button>
      {isEditModalOpen && (
        <Modal
          title="글 수정하기"
          value="수정"
          component={
            <PostCreate
              formData={formData}
              onFormDataChange={handleFormDataChange}
            />
          }
          onClose={handleCloseEditModal}
        />
      )}
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
