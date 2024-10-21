import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Container = styled.div`
  margin: 30px 0;
`;

const ContentList = styled.span`
  padding: 10px 0;
  text-align: center;
  cursor: pointer; // Change cursor to pointer for better UX
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
  _id: string; // Add _id to access the post ID
  category: number;
  community: string;
  title: string;
  createdAt: Date;
}

interface ListContainerProps {
  postIds: PostId[];
  isLoading: boolean;
}

const ListContainer: React.FC<ListContainerProps> = ({ postIds, isLoading }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePostClick = (_id: string) => {
    navigate(`/post/${_id}`); // Navigate to the post detail page
  };

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
        postIds.map((post) => (
          <DataContainer key={post._id}>
            <GroupContent>
              [{post.category === 0 ? '강아지' : post.category === 1 ? '고양이' : '기타'}] {post.community}
            </GroupContent>
            <ContentList onClick={() => handlePostClick(post._id)}>{post.title}</ContentList> {/* Add onClick */}
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
