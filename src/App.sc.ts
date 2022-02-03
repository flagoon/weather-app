import styled from "styled-components";

export const AppContainer = styled.main`
  max-width: 768px;
  margin: 24px auto;
  padding: 16px;
  border: 1px solid red;
`;

export const CitySection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  @media screen and (max-width: 500px) {
    background-color: yellow;
  } ;
`;
