import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa'; // 카메라 아이콘 import
import axios from 'axios';
import defaultImg from '@/assets/person.png';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import Input from '@/components/common/Input';
import axiosInstance from '@/utils/axiosInstance';

const Container = styled.div`
  margin: 30px 0;
`;

const UserContainer = styled.div`
  font-size: var(--font-size-md-1); //16
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ImgContainer = styled.div``;

const IconButton = styled.span`
  cursor: pointer;
  font-size: 20px;
  background-color: white;
  border: 1px solid #cecece;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #6d987a;
  position: relative;
  bottom: 50px;
  left: 110px;
  height: 40px;
  width: 40px;
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
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({ userData }) => {
  const [introduce, setIntroduce] = useState(userData.introduce);
  const [nickName, setNickName] = useState(userData.nickName);
  const [profileImage, setProfileImage] = useState<string[]>(userData.profileImage || []);

  useEffect(() => {
    setIntroduce(userData.introduce);
    setNickName(userData.nickName);
    setProfileImage(userData.profileImage || []);
  }, [userData]);

  const handleSaveClick = async () => {
    try {
      const updates: { introduce?: string; nickName?: string; profileImage?: string[] } = {};
      if (introduce !== userData.introduce) {
        updates.introduce = introduce;
      }
      if (nickName !== userData.nickName) {
        updates.nickName = nickName;
      }
      if (profileImage !== userData.profileImage) {
        updates.profileImage = profileImage;
      }

      // 현재 로그인된 사용자의 정보를 me 엔드포인트로 업데이트
      if (Object.keys(updates).length > 0) {
        const response = await axiosInstance.put(`me`, updates);
        alert('변경 사항이 저장되었습니다');
        window.location.reload(); // 페이지 새로고침 추가
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
          <IconButton onClick={() => document.getElementById('fileInput')?.click()}>
            <FaCamera />
          </IconButton>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </ImgContainer>
        <Info>
          <List>
            <Item>닉네임</Item>
            <Input
              inputSize="bg"
              placeholder="닉네임을 입력하세요."
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </List>
          <List>
            <Item>소개글</Item>
            <Data>
              <TextArea
                size="md"
                placeholder="소개글을 입력하세요"
                value={introduce}
                onChange={(e) => setIntroduce(e.target.value)}
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
