import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa'; // 카메라 아이콘 import
import axios from 'axios';
import defaultImg from '@/assets/person.png';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import Input from '@/components/common/Input';
import axiosInstance from '@/utils/axiosInstance';
import userState, { UserState } from '@/recoil/atoms/userState';

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
    width: 150px;
    padding: 10px;

    border-radius: 50%;
    border: 0;
    overflow: hidden;
    text-align: center;
  }
`;

const Data = styled.span``;

interface ProfileContainerProps {
  userData: {
    nickName: string;
    introduce: string;
    profileImage: File | string | null;
  };
  setUserData;
  fetchData;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  userData,
  setUserData,
  fetchData,
}) => {
  const [profileImage, setProfileImage] = useState<File | string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null); // 수정/등록을 위한 폼데이터 상태

  // 전송할 이미지
  // 변경할 이미지를 고르고, 바로 변경되는 것이 아니기 때문에 저장할 상태가 필요
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // petInfo 객체 초기화
  const [userInfo, setUserInfo] = useState({
    introduce: userData?.introduce ?? '',
    nickName: userData?.nickName ?? '',
    profileImage: userData?.profileImage,
  });

  // 폼데이터 생성 함수
  const createFormData = () => {
    const formData = new FormData();
    // string으로 append 해줘야한다?
    formData.append('introduce', String(userInfo.introduce));
    formData.append('nickName', String(userInfo.nickName));

    // 선택 파일이 있을 때에는 그 파일을 append 해준다
    // 폼데이터에는 null 값을 보낼 수 없으니, 선택된 파일이나 버디이미지가 없는 경우에는 append하지 않습니다: 서버 default 값이 null
    if (selectedFile) {
      formData.append('profileImage', selectedFile);

      // } else formData.append('buddyImage', buddyImage);
    }

    return formData;
  };

  // 폼데이터가 변화할때마다 상태 업데이트
  const handleFormDataChange = (data: FormData) => {
    setFormData(data);
  };

  useEffect(() => {
    if (userData) {
      setUserInfo({
        introduce: userData.introduce ?? '',
        nickName: userData.nickName ?? '',
        profileImage: userData.profileImage,
      });

      setProfileImage(userData.profileImage);
    }
  }, []);

  useEffect(() => {
    handleFormDataChange(createFormData());
  }, [userInfo, selectedFile]);

  const handleSaveClick = async () => {
    try {
      // 현재 로그인된 사용자의 정보를 me 엔드포인트로 업데이트

      const response = await axiosInstance.put(`me`, formData);
      // UserState 업데이트

      const printFormData = (formData: FormData) => {
        // FormData.entries()를 사용하여 모든 항목을 순회합니다.
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
      };

      // formData를 사용하여 요청하기 전에 폼 데이터 내용 출력
      printFormData(formData);

      // 프로필 이미지가 File일 경우 URL을 생성
      const imageUrl = response.data.data.profileImage;

      // UserState 업데이트 (imageUrl을 포함)
      setUserData((prevData) => ({
        ...prevData,
        introduce: userInfo.introduce,
        nickName: userInfo.nickName,
        profileImage: imageUrl || prevData.profileImage, // 받아온 URL로 프로필 이미지 업데이트
      }));
      alert('변경 사항이 저장되었습니다');
      // console.log(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios 오류:', error.response?.data || error.message);
      } else {
        console.error('일반 오류:', error);
      }
    } finally {
      window.location.reload(); // 페이지 새로고침 추가
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target.files?.[0];

    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      setSelectedFile(file);
    }
  };

  // const imageSrc = selectFile ? URL.createObjectURL(selectFile) : imgView;
  // 선택된 파일이 있으면 해당 파일의 URL을 생성하여 사용
  // 그렇지 않으면, imgView가 URL인지 확인하고 해당 URL을 사용
  // imgView가 File일 경우 URL.createObjectURL로 변환
  let imageSrc: string | null;
  if (selectedFile) {
    imageSrc = URL.createObjectURL(selectedFile);
  } else if (typeof userData.profileImage === 'string') {
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
          <IconButton
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <FaCamera />
          </IconButton>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
            name="fileInput"
            accept="image/png, image/jpeg"
          />
        </ImgContainer>
        <Info>
          <List>
            <Item>닉네임</Item>
            <Input
              inputSize="bg"
              placeholder="닉네임을 입력하세요."
              value={userInfo.nickName}
              onChange={(e) => {
                setUserInfo((prev) => ({
                  ...prev,
                  nickName: e.target.value,
                }));
              }}
            />
          </List>
          <List>
            <Item>소개글</Item>
            <Data>
              <TextArea
                size="md"
                placeholder="소개글을 입력하세요"
                value={userInfo.introduce}
                onChange={(e) => {
                  setUserInfo((prev) => ({
                    ...prev,
                    introduce: e.target.value,
                  }));
                }}
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
