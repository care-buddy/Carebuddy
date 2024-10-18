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
import { CommunityData, IBuddyProfile, User } from '@/interfaces';
import { useRecoilState } from 'recoil';
import userState, { UserState } from '@/recoil/atoms/userState';

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
  profileImage: string | File | null;
  communityId: CommunityData[];
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
  profileImage: string;
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
  const [userData, setUserData] = useRecoilState<UserState>(userState);

  const [buddiesData, setBuddiesData] = useState<IBuddyProfile[]>([]);
  const [allUsers, setAllUsers] = useState<UserData[]>([]); // 추가: 모든 사용자 데이터를 저장
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imageFile, setImageFile] = useState<File | string | null>(null);
  // 전송할 이미지
  // 변경할 이미지를 고르고, 바로 변경되는 것이 아니기 때문에 저장할 상태가 필요
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // GET /me 엔드포인트 호출
        const meResponse = await axiosInstance.get<{ message: ApiResponse }>(
          `me`
        );

        // 응답 구조를 안전하게 확인합니다.
        const meData = meResponse.data; // optional chaining 사용

        if (!meData) {
          throw new Error('사용자 데이터가 없습니다.');
        }

        console.log('me 데이터: ', meData);
      } catch (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchData();
  }, []);

  const handleIntroduceChange = (newIntroduction: string) => {
    if (userData) {
      // 상태 업데이트
      setUserData((prevData: UserState) => {
        if (prevData) {
          return {
            ...prevData,
            introduce: newIntroduction,
          };
        }
        return prevData;
      });

      // 서버에 업데이트 요청
      handleUserDataUpdate({ ...userData, introduce: newIntroduction });
    }
  };

  const handleNickNameChange = (newNickname: string) => {
    setUserData((prevData) => ({ ...prevData, nickName: newNickname }));
    handleUserDataUpdate({ ...userData, nickName: newNickname });
  };

  // 이미지 작업 추후 진행 File로 붙여야합니다
  const handleProfileImageChange = (newImage: File) => {
    setUserData((prevData) => ({ ...prevData, profileImage: newImage }));
    handleUserDataUpdate({ ...userData, profileImage: newImage });
  };

  const handleUserDataUpdate = async (updatedUserData: UserState) => {
    try {
      // 이미지 변경을 포함한 요청을 보내기 위해 폼데이터 생성
      const formData = new FormData();

      // 이미지는 백엔드 구현 후 추가
      formData.append('nickName', updatedUserData.nickName);
      formData.append('introduce', updatedUserData.introduce);

      // 선택 파일이 있을 때에는 그 파일을 append 해준다
      // 폼데이터에는 null 값을 보낼 수 없으니, 선택된 파일이나 버디이미지가 없는 경우에는 append하지 않습니다: 서버 default 값이 null
      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      } else if (imageFile) {
        formData.append('profileImage', imageFile);
      }

      const response = await axiosInstance.put('me', updatedUserData);
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
        <ProfileContainer userData={userData} setUserData={setUserData} />
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
