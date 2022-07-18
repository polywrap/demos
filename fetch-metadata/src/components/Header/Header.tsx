import React from "react";
import { Grid, Link, styled, useTheme } from "@mui/material";
import Logo from "./../../assets/logo.png";

const HeaderContainer = styled(Grid)(({ theme }) => ({
  position: "relative",
  top: 0,
  width: "100%",
  height: "40px",
}));

const HeaderLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: 600,
}));

const HeaderLogo = styled("img")(({ theme }) => ({
  objectFit: "contain",
  height: "40px",
  width: "40px",
  cursor: "pointer",
}));

export const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <HeaderContainer
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      columnSpacing={8}
    >
      <Grid item>
        <Link href="https://polywrap.io" target="_blank" rel="noopener">
          <HeaderLogo src={Logo} alt={"Polywrap logo"} />
        </Link>
      </Grid>
      <Grid item>
        <HeaderLink
          href="https://github.com/polywrap/demos/tree/main/fetch-metadata"
          target="_blank"
          rel="noopener"
          underline="none"
          color={theme.palette.text.primary}
        >
          Source Code
        </HeaderLink>
      </Grid>
      <Grid item>
        <HeaderLink
          href="https://docs.polywrap.io"
          target="_blank"
          rel="noopener"
          underline="none"
          color={theme.palette.text.primary}
        >
          Polywrap Docs
        </HeaderLink>
      </Grid>
    </HeaderContainer>
  );
};
