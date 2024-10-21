import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';  // useParams 훅 추가
import axiosInstance from '@/utils/axiosInstance';
import defaultImg from '@/assets/person.png';
import ListContainer from '@/components/Mypage&Userpage/ListContainer';
import PetCardContainer from '@/components/Mypage&Userpage/PetCardContainer';
import TopBar from '@/components/common/TopBar';
import DefaultPetProfileImg from '@assets/defaultPetProfile.png';
import { tempProfileSrc } from '@constants/tempData';

const Container = styled.div``;

const Menu = styled.div`
  padding: 10px 10px 10px 0;
  font-weight: bold;
  font-size: 22px;
  border-bottom: 1px solid #cecece;
  padding-bottom: 10px;
`;

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
  margin-left: 50px;
`;

const InputList = styled.span`
  display: flex;
`;

const ImageBox = styled.div`
  img {
    height: 180px;
    padding: 10px;
  }
`;

interface UserData {
  email: string;
  nickName: string;
  introduce: string;
  profileImage: string[];
  postId: PostId[];
}

interface PostId {
  _id: string;  // ID 필드 추가
  category: number;
  community: string;
  title: string;
  createdAt: Date;
}

interface ApiResponse {
  email: string;
  nickName: string;
  introduce: string;
  profileImage: string[];
  postId: ApiPostId[];
}

interface ApiPostId {
  _id: string;  // ID 필드 추가
  communityId: communityId;
  title: string;
  createdAt: string;
}

interface communityId {
  category: number;
  community: string;
}

const ProfileContainer: React.FC<{ userData: UserData }> = ({ userData }) => (
  <Container>
    <UserContainer>
      <ImgContainer>
        <ImageBox>
          <img src={defaultImg} alt="프로필 사진" />
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

const Userpage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // URL에서 userId를 받아온다
  const [userData, setUserData] = useState<UserData>({
    email: '',
    nickName: '',
    introduce: '',
    profileImage: [],
    postId: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<{ message: ApiResponse }>(`users/${userId}`);
        const data = response.data.message;

        const mappedData: UserData = {
          email: data.email || '',
          nickName: data.nickName || '',
          introduce: data.introduce || '',
          profileImage: data.profileImage || [],
          postId: data.postId
            ? data.postId.map((post) => ({
              _id: post._id,  // _id 값 추가
              category: post.communityId.category,
              community: post.communityId.community,
              title: post.title,
              createdAt: new Date(post.createdAt), // Parse createdAt as a Date
            }))
            : [],
        };
        console.log('user 데이터: ', data);
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
      content: 'User의 반려동물',
      component: <PetCardContainer buddyData={userData.buddyId} isMe={false} />,
    },
    {
      id: '3',
      content: '작성 글 목록',
      component: <ListContainer postIds={userData.postId} isLoading={isLoading} />,  // postId 전달
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
