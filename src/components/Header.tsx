import React from "react";
import styled from "styled-components";
import constants from "src/constants";

const HeaderText = styled.h1`
  margin: 0 0 20px 0;
  color: ${constants.color.green};
  letter-spacing: 10px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <Container>
      <HeaderText>DISHES</HeaderText>
    </Container>
  );
};

export default Header;
