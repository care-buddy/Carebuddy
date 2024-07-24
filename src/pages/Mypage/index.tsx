import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import defaultImg from '@/assets/person.png';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import ListContainer from '@/components/Mypage&Userpage/ListContainer';
import PetCardContainer from '@/components/Mypage&Userpage/PetCardContainer';
import Input from '@/components/common/Input';
import SmallModal from '@/components/common/SmallModal';
import UserAsk from '@/pages/Mypage/UserAsk';
import Modal from '@/components/common/Modal/index';
import PostCreate from '@/pages/PostCreate/index';
import TopBar from '@/components/common/TopBar';
import Loading from '@/components/common/Loading';

// Mock API 설정
const mock = new MockAdapter(axios, { delayResponse: 500 });

// 초기 API 응답 설정
mock.onGet('/api/user').reply(200, {
  email: 'carebuddy@naver.com',
  nickname: '케어버디',
  introduction: '소개글입니다^^',
  communityId: [
    { id: '1', category: 0, community: '눈', createdAt: '2024-01-01' },
    { id: '2', category: 0, community: '위식도', createdAt: '2024-01-02' },
    { id: '3', category: 1, community: '중성화', createdAt: '2024-01-03' },
  ],
  postId: [
    { title: '안녕하세요' },
    { title: '글제목입니다 ㅎㅎ' },
    { title: '동물이 최고야!!' },
  ]
});

// 소개글 업데이트 핸들러 추가
mock.onPut('/api/user').reply((config) => {
  console.log('받은 데이터:', JSON.parse(config.data)); // 수신 데이터 확인
  const { introduction } = JSON.parse(config.data);
  return [200, { introduction }];
});

const Container = styled.div`
  margin: 30px 0 30px 0;
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

const UserContainer = styled.div`
  font-size: var(--font-size-md-1); //16
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const List = styled.span`
  display: flex;
  align-items: center;
  margin: 15px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LinkButton = styled.div`
  margin: 10px 0 10px 0;
  text-decoration: underline;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const WithdrawContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ImageBox = styled.div`
  img {
    height: 150px;
    padding: 10px;
  }
`;

const Data = styled.span``;

const InfoContainer = styled.div`
  display: flex;
  margin: 30px;
  margin-left: 0;
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

const UserInfoContainer: React.FC<{ userData: UserData }> = ({ userData }) => (
  <Container>
    <InfoContainer>
      <Item>이메일</Item>
      <Data>{userData.email}</Data>
    </InfoContainer>
    <InfoContainer>
      <Item>닉네임</Item>
      <Data>{userData.nickname}</Data>
    </InfoContainer>
    <InfoContainer>
      <Item>소개글</Item>
      <Data>{userData.introduction}</Data>
    </InfoContainer>
  </Container>
);

const ProfileContainer: React.FC<{ userData: UserData, onIntroductionChange: (newIntroduction: string) => void }> = ({ userData, onIntroductionChange }) => {
  const [introduction, setIntroduction] = useState(userData.introduction);

  const handleSaveClick = async () => {
    try {
      const response = await axios.put('/api/user', { introduction });
      console.log('소개글 업데이트 응답:', response.data);
      onIntroductionChange(introduction);
      alert('소개글이 저장되었습니다');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios 오류:', error.response?.data || error.message);
      } else {
        console.error('일반 오류:', error);
      }
    }
  };

  return (
    <Container>
      <UserContainer>
        <ImgContainer>
          <ImageBox><img src={defaultImg} alt="프로필 사진" /></ImageBox>
          <LinkButton>프로필 사진 업로드 하기</LinkButton>
        </ImgContainer>
        <Info>
          <List>
            <Item>닉네임</Item>
            <Input
              inputSize='bg'
              placeholder="입력하여주세요."
              value={userData.nickname}
            />
          </List>
          <List>
            <Item>소개글</Item>
            <Data>
              <TextArea
                size="md"
                placeholder="소개글을 입력하세요"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
            </Data>
          </List>
          <ButtonContainer>
            <Button onClick={handleSaveClick}>저장하기</Button>
          </ButtonContainer>
        </Info>
      </UserContainer>
    </Container>
  );
};

const Mypage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    nickname: '',
    introduction: '',
    communityId: [],
    postId: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 회원탈퇴 모달
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 글 수정 모달

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/user');
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostSubmit = async (formData: { title?: string, content?: string, groupId?: string }) => {
    try {
      const response = await axios.post('/api/posts', formData);
      console.log('게시물 생성됨:', response.data);
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error('게시물 생성 오류:', error);
    }
  };

  const handleIntroductionChange = (newIntroduction: string) => {
    setUserData(prevData => ({ ...prevData, introduction: newIntroduction }));
  };

  // 회원탈퇴 모달 함수
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

  const contentItems = [
    { id: '1', content: '회원정보', component: <UserInfoContainer userData={userData} /> },
    { id: '2', content: '프로필', component: <ProfileContainer userData={userData} onIntroductionChange={handleIntroductionChange} /> },
    { id: '3', content: '반려동물 관리', component: <PetCardContainer /> },
    { id: '4', content: '작성 글 목록', component: <ListContainer communityPosts={userData.communityId} postIds={userData.postId} isLoading={isLoading} /> },
  ];

  return (
    <Container>
      <TopBar category="회원 정보 수정" title="마이 페이지" />
      <Button onClick={handleWriteClick}>글 작성하기 모달 임시</Button>
      {isWriteModalOpen && (
        <Modal
          title='글 작성하기'
          value='등록'
          component={<PostCreate />}
          onConfirm={handlePostSubmit}
          onClose={handleCloseWriteModal}
        />
      )}
      <Button onClick={handleEditClick}>글 수정하기 모달 임시</Button>
      {isEditModalOpen && (
        <Modal
          title='글 수정하기'
          value='수정'
          component={<PostCreate />}
          onClose={handleCloseEditModal}
        />
      )}
      {isLoading ? (
        <Loading /> // 로딩컴포넌트 불러온 곳
      ) : (
        contentItems.map(item => (
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
          component={<UserAsk onConfirm={handleConfirmWithdraw} onCancel={handleCloseModal} />}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default Mypage;
