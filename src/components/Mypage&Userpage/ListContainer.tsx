/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { PostData } from '@/types';

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

type ListContainerProps = {
  postIds?: PostData[];
  isLoading: boolean;
};

const ListContainer: React.FC<ListContainerProps> = ({
  postIds,
  isLoading,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePostClick = (_id: string) => {
    navigate(`/post/${_id}`); // Navigate to the post detail page
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const nonDeletedPosts =
    postIds && postIds.filter((post) => post.deletedAt === null);

  return (
    <Container>
      <DataContainer>
        <Title>그룹</Title>
        <Title>글제목</Title>
        <Title>작성일</Title>
      </DataContainer>
      {nonDeletedPosts && nonDeletedPosts.length > 0 ? (
        nonDeletedPosts
          // .filter((post) => post.deletedAt === null)
          .map((post) => (
            <DataContainer key={post._id}>
              <GroupContent>
                [
                {post.communityId.category === 0
                  ? '강아지'
                  : post.communityId.category === 1
                    ? '고양이'
                    : '기타'}
                ] {post.communityId.community}
              </GroupContent>
              <ContentList onClick={() => handlePostClick(post._id)}>
                {post.title}
              </ContentList>{' '}
              {/* Add onClick */}
              <ContentList>
                {new Date(post.createdAt).toLocaleDateString()}
              </ContentList>
            </DataContainer>
          ))
      ) : (
        <NoDataContainer>작성하신 게시글이 없습니다.</NoDataContainer>
      )}
    </Container>
  );
};

export default ListContainer;
