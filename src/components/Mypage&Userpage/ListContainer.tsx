import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet('/api/user').reply(200, {
  communityId: [
    { id: '1', category: 0, community: '안녕하세요', date: '2024-01-01' },
    { id: '2', category: 0, community: '글입니다히히히', date: '2024-01-02' },
    { id: '3', category: 1, community: '가운데정렬왜안돼', date: '2024-01-03' },
  ],
});

const Container = styled.div`
  margin: 30px 0;
`;

const ContentList = styled.span`
  padding: 10px 0;
  text-align: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
`;

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
  padding: 10px 0;
`;

const GroupContent = styled(ContentList)`
  color: #6d987a;
`;

interface CommunityPost {
  id: string;
  category: number;
  community: string;
  date: string;
}

const ListContainer: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    axios.get('/api/user')
      .then((response) => {
        setPosts(response.data.communityId || []);
        console.log(setPosts)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Container>
      <DataContainer>
        <Title>그룹</Title>
        <Title>글제목</Title>
        <Title>작성일</Title>
      </DataContainer>
      {posts.map((post) => (
        <DataContainer key={post.id}>
          <GroupContent>[{post.category === 0 ? '강아지' : '고양이'}]</GroupContent>
          <ContentList>{post.community}</ContentList>
          <ContentList>{post.date}</ContentList>
        </DataContainer>
      ))}
    </Container>
  );
};

export default ListContainer;
