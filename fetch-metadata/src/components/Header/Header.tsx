import React from "react";
import "./style.css";
import {Grid, Link, useTheme} from "@mui/material";
import Logo from './../../assets/logo.png';

export const Header: React.FC = () => {

  const theme = useTheme();

  return (
    <Grid className="header" container direction="row" justifyContent="flex-start" alignItems="center" columnSpacing={3}>
      <Grid className={"header__item"} item>
        <Link href="https://polywrap.io"
              target="_blank"
              rel="noopener">
          <img className={"header__logo"} src={Logo} alt={"Polywrap logo"} />
        </Link>
      </Grid>
      <Grid className={"header__item"} item>
        <Link
          className="header__link"
          href="https://github.com/polywrap/demos/tree/main/fetch-metadata"
          target="_blank"
          rel="noopener"
          underline='none'
          color={theme.palette.text.primary}
        >
          Source Code
        </Link>
      </Grid>
      <Grid className={"header__item"} item>
          <Link
            className="header__link"
            href="https://docs.polywrap.io"
            target="_blank"
            rel="noopener"
            underline='none'
            color={theme.palette.text.primary}
          >
        Polywrap Docs
        </Link>
      </Grid>
    </Grid>
  );
};
