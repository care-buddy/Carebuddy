import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'; // useParams 훅 추가
import axiosInstance from '@/utils/axiosInstance';
import defaultImg from '@/assets/person.png';
import ListContainer from '@/components/Mypage&Userpage/ListContainer';
import PetCardContainer from '@/components/Mypage&Userpage/PetCardContainer';
import TopBar from '@/components/common/TopBar';
import {
  Menu,
  ImageBox,
} from '@/components/Mypage&Userpage/containerComponents';
import { IPublicUser } from '@/types';

const Container = styled.div``;

const Item = styled.a`
  font-weight: bold;
  padding: 10px 10px 10px 0;
`;

const UserContainer = styled.div`
  font-size: var(--font-size-md-1); //16
  display: flex;
  align-items: center;
  margin: 30px 0 30px 0;
`;

const List = styled.span`
  display: flex;
  align-items: center;
`;

const ListItem = styled.a<{ bold?: boolean }>`
  margin: 10px;
  display: flex;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
`;

const InputList = styled.span`
  display: flex;
`;

const ProfileContainer: React.FC<{ userData: IPublicUser }> = ({
  userData,
}) => {
  // 선택된 파일이 있으면 해당 파일의 URL을 생성하여 사용
  // 그렇지 않으면, imgView가 URL인지 확인하고 해당 URL을 사용
  // imgView가 File일 경우 URL.createObjectURL로 변환
  let imageSrc: string | null;
  if (typeof userData.profileImage === 'string') {
    imageSrc = userData.profileImage;
  } else if (userData.profileImage) {
    imageSrc = URL.createObjectURL(userData.profileImage);
  } else {
    imageSrc = null; // 기본 이미지 URL
  }

  return (
    <Container>
      <UserContainer>
        <ImgContainer>
          <ImageBox>
            <img src={imageSrc || defaultImg} alt="프로필 사진" />
          </ImageBox>
        </ImgContainer>
        <Info>
          <InputList>
            <List>
              <ListItem bold>{userData.nickName}</ListItem>
            </List>
          </InputList>
          <InputList>
            <List>
              <ListItem>{userData.introduce}</ListItem>
            </List>
          </InputList>
        </Info>
      </UserContainer>
    </Container>
  );
};

const Userpage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // URL에서 userId를 받아온다
  const [userData, setUserData] = useState<IPublicUser>({
    email: '',
    nickName: '',
    introduce: '',
    profileImage: null,
    postId: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<{ message: IPublicUser }>(
          `users/${userId}`
        );
        const data = response.data.message;

        const mappedData: IPublicUser = {
          email: data.email || '',
          nickName: data.nickName || '',
          introduce: data.introduce || '',
          profileImage: data.profileImage || null,
          postId: data.postId || [],
          buddyId: data.buddyId,
        };
        setUserData(mappedData);
      } catch (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]); // userId 변경 시마다 API 호출

  const contentItems = [
    {
      id: '1',
      content: '프로필',
      component: <ProfileContainer userData={userData} />,
    },
    {
      id: '2',
      content: `${userData.nickName}의 반려동물`,
      component: <PetCardContainer buddies={userData.buddyId} isMe={false} />,
    },
    {
      id: '3',
      content: '작성 글 목록',
      component: (
        <ListContainer postIds={userData.postId} isLoading={isLoading} />
      ), // postId 전달
    },
  ];

  return (
    <Container>
      <TopBar category="Carebuddy" title="유저 페이지" />
      {isLoading ? (
        <div>Loading...</div>
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
    </Container>
  );
};

export default Userpage;
