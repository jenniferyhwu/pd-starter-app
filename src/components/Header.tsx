import React from "react";
import styled from "styled-components";
import constants from "src/constants";

const HEADER_HEIGHT_PX = 70;

const HeaderText = styled.h1`
  margin: 0;
  color: ${constants.color.green};
  letter-spacing: 10px;
`;

const Container = styled.div`
  height: ${HEADER_HEIGHT_PX}px;
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
