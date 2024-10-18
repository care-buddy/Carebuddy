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

const NoDataContainer = styled.div`
  text-align: center;
  border-bottom: 1px solid #cecece;
  padding: 10px 0;
`;

const GroupContent = styled(ContentList)`
  color: #6d987a;
`;

interface PostId {
  category: number;
  title: string;
  createdAt: Date;
}

interface ListContainerProps {
  postIds: PostId[];
  isLoading: boolean;
}

const ListContainer: React.FC<ListContainerProps> = ({ postIds, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <DataContainer>
        <Title>그룹</Title>
        <Title>글제목</Title>
        <Title>작성일</Title>
      </DataContainer>
      {postIds.length > 0 ? (
        postIds.map((post, index) => (
          <DataContainer key={index}>
            <GroupContent>
              [{post.category === 0 ? '강아지' : post.category === 1 ? '고양이' : '기타'}] {post.community}
            </GroupContent>
            <ContentList>{post.title}</ContentList>
            <ContentList>{new Date(post.createdAt).toLocaleDateString()}</ContentList>
          </DataContainer>
        ))
      ) : (
        <NoDataContainer>작성하신 게시글이 없습니다.</NoDataContainer>
      )}
    </Container>
  );
};

export default ListContainer;
