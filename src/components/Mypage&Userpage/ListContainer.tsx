import styled from "styled-components";
import React from 'react';

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
  createdAt: string;
}

interface PostId {
  title: string;
}

interface ListContainerProps {
  communityPosts: CommunityPost[];
  postIds: PostId[];
  isLoading: boolean;
}

const ListContainer: React.FC<ListContainerProps> = ({ communityPosts, postIds, isLoading }) => (
  <Container>
    <DataContainer>
      <Title>그룹</Title>
      <Title>글제목</Title>
      <Title>작성일</Title>
    </DataContainer>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <>
        {communityPosts.map((post, index) => (
          <DataContainer key={post.id}>
            <GroupContent>[{post.category === 0 ? '강아지' : '고양이'}] {post.community}</GroupContent>
            <ContentList>{postIds[index].title}</ContentList>
            <ContentList>{post.createdAt}</ContentList>
          </DataContainer>
        ))}
      </>
    )}
  </Container>
);

export default ListContainer;
