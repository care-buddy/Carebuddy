import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function Layout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
