import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import ListContainer from '@/components/Mypage&Userpage/ListContainer';
import PetCardContainer from '@/components/Mypage&Userpage/PetCardContainer';
import SmallModal from '@/components/common/SmallModal';
import UserAsk from '@/pages/Mypage/UserAsk';
import TopBar from '@/components/common/TopBar';
import Loading from '@/components/common/Loading';
import UserInfoContainer from '@components/Mypage&Userpage/UserInfoContainer';
import ProfileContainer from '@components/Mypage&Userpage/ProfileContainer';
import { useRecoilState } from 'recoil';
import buddyState from '@/recoil/atoms/buddyState';
import axiosInstance from '@/utils/axiosInstance';

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
    nickName: '',
    introduce: '',
    profileImage: [],
    communityId: [],
    postId: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 회원탈퇴 모달
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    groupId: '',
    postImage: [],
  });

  const [buddiesData] = useRecoilState(buddyState);

  const userId = '668ce6fa73b15595e620fd41';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`user/mypage/${userId}`);
        const data = response.data.message;

        // 데이터 매핑
        const mappedData: UserData = {
          email: data.email || '', // 기본값 설정
          nickName: data.nickName || '', // nickName 필드에 값 설정
          introduce: data.introduce || '', // introduce 필드에 값 설정
          profileImage: data.profileImage || [], // profileImage 필드에 값 설정
          communityId: data.communityId || [], // communityId 필드에 값 설정
          postId: data.postId || [], // postId 필드에 값 설정
        };

        console.log('user 데이터', mappedData);
        console.log('post 데이터', response.data.message.postId);

        setUserData(mappedData);

        // Fetch된 데이터를 formData에 넣기
        setFormData({
          title: data.nickName || '', // 예시로 nickname을 title로 설정
          content: data.introduce || '', // 예시로 introduction을 content로 설정
          groupId: data.communityId.length > 0 ? data.communityId[0].id : '', // 첫 번째 커뮤니티 ID
          postImage: data.profileImage || [], // 프로필 이미지를 postImage로 설정
        });
      } catch (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleIntroductionChange = (newIntroduction: string) => {
    setUserData((prevData) => ({ ...prevData, introduce: newIntroduction }));
    handleUserDataUpdate({ ...userData, introduce: newIntroduction });
  };

  const handleNicknameChange = (newNickname: string) => {
    setUserData((prevData) => ({ ...prevData, nickName: newNickname }));
    handleUserDataUpdate({ ...userData, nickName: newNickname });
  };

  const handleProfileImageChange = (newImage: string[]) => {
    setUserData((prevData) => ({ ...prevData, profileImage: newImage }));
    handleUserDataUpdate({ ...userData, profileImage: newImage });
  };

  const handleUserDataUpdate = async (updatedUserData: UserData) => {
    try {
      const response = await axiosInstance.put('user', updatedUserData);
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
          onIntroductionChange={handleIntroductionChange}
          onNicknameChange={handleNicknameChange}
          onProfileImageChange={handleProfileImageChange}
        />
      ),
    },
    {
      id: '3',
      content: '반려동물 관리',
      component: <PetCardContainer buddyData={buddiesData.buddies} isMe={false} />,
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
