import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import defaultImg from '@/assets/person.png';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import Input from '@/components/common/Input';

const Container = styled.div`
  margin: 30px 0;
`;

const UserContainer = styled.div`
  font-size: var(--font-size-md-1); //16
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LinkButton = styled.div`
  margin: 10px 0;
  text-decoration: underline;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Item = styled.a`
  font-weight: bold;
  padding-right: 40px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const List = styled.span`
  display: flex;
  align-items: center;
  margin: 15px;
`;

const ImageBox = styled.div`
  img {
    height: 150px;
    padding: 10px;
  }
`;

const Data = styled.span``;

interface ProfileContainerProps {
  userData: {
    nickName: string;
    introduce: string;
    profileImage: string[];
  };
  onIntroductionChange: (newIntroduction: string) => void;
  onNicknameChange: (newNickname: string) => void;
  onProfileImageChange: (newImage: string[]) => void;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({ userData, onIntroductionChange, onNicknameChange, onProfileImageChange }) => {
  const [introduction, setIntroduction] = useState(userData.introduce);
  const [nickname, setNickname] = useState(userData.nickName);
  const [profileImage, setProfileImage] = useState<string[]>(userData.profileImage || []);

  useEffect(() => {
    setIntroduction(userData.introduction);
    setNickname(userData.nickname);
    setProfileImage(userData.profileImage || []);
  }, [userData]);

  const handleSaveClick = async () => {
    try {
      const updates: { introduction?: string; nickname?: string; profileImage?: string[] } = {};
      if (introduction !== userData.introduction) {
        updates.introduction = introduction;
      }
      if (nickname !== userData.nickname) {
        updates.nickname = nickname;
      }
      if (profileImage !== userData.profileImage) {
        updates.profileImage = profileImage;
      }

      console.log('업데이트 데이터:', updates);

      if (Object.keys(updates).length > 0) {
        const response = await axios.put('/api/user', updates);
        console.log('업데이트 응답:', response.data);
        onIntroductionChange(updates.introduction || userData.introduction);
        onNicknameChange(updates.nickname || userData.nickname);
        onProfileImageChange(updates.profileImage || userData.profileImage);
        alert('변경 사항이 저장되었습니다');
      } else {
        alert('변경된 사항이 없습니다');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios 오류:', error.response?.data || error.message);
      } else {
        console.error('일반 오류:', error);
      }
    }
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage([reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <UserContainer>
        <ImgContainer>
          <ImageBox>
            <img src={profileImage && profileImage.length > 0 ? profileImage[0] : defaultImg} alt="프로필 사진" />
          </ImageBox>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          <LinkButton onClick={() => document.getElementById('fileInput')?.click()}>프로필 사진 업로드 하기</LinkButton>
        </ImgContainer>
        <Info>
          <List>
            <Item>닉네임</Item>
            <Input
              inputSize='bg'
              placeholder="닉네임을 입력하세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
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

export default ProfileContainer;