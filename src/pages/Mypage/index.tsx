import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '@/assets/person.png';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import ListContainer from '@/components/Mypage&Userpage/ListContainer';
import PetCardContainer from '@/components/Mypage&Userpage/PetCardContainer';
import Input from '@/components/common/Input';
import SmallModal from '@/components/common/SmallModal';
import UserAsk from '@/pages/Mypage/UserAsk';
import Modal from '@/components/common/Modal/index'
import TopBar from '@/components/common/TopBar';

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

const Data = styled.span`
`;

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

const UserInfoContainer = () => (
  <Container>
    <InfoContainer>
      <Item>이메일</Item>
      <Data>carebuddy@naver.com</Data>
    </InfoContainer>
    <InfoContainer>
      <Item>닉네임</Item>
      <Data>케어버디</Data>
    </InfoContainer>
    <InfoContainer>
      <Item>소개글</Item>
      <Data>소개글입니다^^</Data>
    </InfoContainer>
  </Container>
);

const handleSaveClick = () => {
  alert('소개글이 저장되었습니다');
};

const ProfileContainer = () => (
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
            value="케어버디"
          />
        </List>
        <List>
          <Item>소개글</Item>
          <Data>
            <TextArea
              size="md"
              placeholder="소개글을 입력하세요"
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

const Mypage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 회원탈퇴 모달
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 글 수정 모달

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

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const contentItems = [
    { id: '1', content: '회원정보', component: <UserInfoContainer /> },
    { id: '2', content: '프로필', component: <ProfileContainer /> },
    { id: '3', content: '반려동물 관리', component: <PetCardContainer /> },
    { id: '4', content: '작성 글 목록', component: <ListContainer /> },
  ];

  return (
    <Container>
      <TopBar category="회원 정보 수정" title="마이 페이지" />

      <Button onClick={handleEditClick}>글 수정하기 모달 임시</Button>
      {isEditModalOpen && (
        <Modal
          title='글 수정하기'
          value='수정'
          component={<PostCreate />}
          onClose={handleCloseEditModal}
        />
      )}
      {contentItems.map(item => (
        <React.Fragment key={item.id}>
          <Menu>
            <Item>{item.content}</Item>
          </Menu>
          {item.component}
        </React.Fragment>
      ))}
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
