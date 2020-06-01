import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "src/components/Header";
import constants from "src/constants";
import Grid from "src/components/Grid";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
         sans-serif;
  }

  body, #root {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 3vh 15vw;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ContainerWrapper>
        <Container>
          <Header />
          <Grid />
        </Container>
      </ContainerWrapper>
    </>
  );
}

export default App;
