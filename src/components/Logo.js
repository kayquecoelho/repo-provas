import styled from "styled-components";
import Logo from "..//assets/logo.svg";

export default function LogoComponent() {
  return <LogoImage src={Logo} alt="RepoProvas" />;
}

const LogoImage = styled.img`
  max-width: 250px;

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
