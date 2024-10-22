import { UserState } from '@/recoil/atoms/userState';
import { IPublicUser } from '@/types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 30px 0;
`;

const InfoContainer = styled.div`
  display: flex;
  margin: 30px;
  margin-left: 0;
`;

const Item = styled.a`
  font-weight: bold;
  padding-right: 40px;
`;

const Data = styled.span``;

// interface UserData {
//   email: string;
//   nickName: string;
//   introduce: string;
// }

const UserInfoContainer: React.FC<{ userData: IPublicUser | UserState }> = ({
  userData,
}) => (
  <Container>
    <InfoContainer>
      <Item>이메일</Item>
      <Data>{userData?.email}</Data>
    </InfoContainer>
    <InfoContainer>
      <Item>닉네임</Item>
      <Data>{userData?.nickName}</Data>
    </InfoContainer>
    <InfoContainer>
      <Item>소개글</Item>
      <Data>{userData?.introduce}</Data>
    </InfoContainer>
  </Container>
);

export default UserInfoContainer;
