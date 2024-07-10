import styled from "styled-components";

const Container = styled.div`
  margin: 30px 0 30px 0;
`;

const ContentList = styled.span`
  padding: 10px 0 10px 0;
  text-align: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: var(--font-size-md-1); //16
  text-align: center;
  padding: 10px 0 10px 0;
`;

// const ListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: auto 0;
// `;

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

const ListContainer = () => {
  const posts = [
    { id: '1', group: '그룹1', title: '안녕하세요', date: '2024-01-01' },
    { id: '2', group: '그룹2', title: '글입니다히히히', date: '2024-01-02' },
    { id: '3', group: '그룹3', title: '가운데정렬왜안돼', date: '2024-01-03' },
  ];

  return (
    <Container>
      <DataContainer>
        <Title>그룹</Title>
        <Title>글제목</Title>
        <Title>작성일</Title>
      </DataContainer>
      {posts.map((post) => (
        <DataContainer key={post.id}>
          <GroupContent>[{post.group}]</GroupContent>
          <ContentList>{post.title}</ContentList>
          <ContentList>{post.date}</ContentList>
        </DataContainer>
      ))}
    </Container>
  );
};

export default ListContainer;
