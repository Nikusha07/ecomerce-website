import Nav from "./nav";

import { useSession, signIn } from "next-auth/react";
import styled, { css } from "styled-components";

function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div>
        <div className="text-center w-full">
          <StyledButton onClick={() => signIn("google")}>
            Login With Google ..
          </StyledButton>
        </div>
      </div>
    );
  }
  return (
    <Container>
      <Nav />
      <ContentDiv>{children}</ContentDiv>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

const ContentDiv = styled.div`
  padding: 2rem;
  background-color: white;
`;

const StyledButton = styled.div`
  ${({ theme }) => css`
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  `}

  ${(props) =>
    props.tw &&
    css`
      ${props.tw}
    `}
`;

export default Layout;
