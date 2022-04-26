import { Grid } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer({ children, link }) {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <StyledLink to={link}>{children}</StyledLink>
      </Grid>
    </Grid>
  );
}

const StyledLink = styled(Link)`
  color: rgb(25, 118, 210);
`;
