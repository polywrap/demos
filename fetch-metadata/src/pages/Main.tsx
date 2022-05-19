import React, {useState} from "react";
import {Grid, styled} from "@mui/material";
import {FetchMetadata} from "../components/FetchMetadata/FetchMetadata";
import {DisplayMetadata} from "../components/DisplayMetadata/DisplayMetadata";
import {MetaManifest} from "@web3api/client-js";

const AppContainer = styled(Grid)(({ theme }) => ({
  padding: "40px 10px",
  width: '100%',
}));

export const Main: React.FC = () => {

  const [manifest, setManifest] = useState<MetaManifest | undefined>();
  const [icons, setIcons] = useState<Record<string, string>>({});

  return (
    <AppContainer container direction="row" justifyContent="center" spacing={12} alignItems="flex-start">
      <Grid item container xs={12} lg={6} direction="row" justifyContent="center" spacing={0}>
        <FetchMetadata setManifest={setManifest} setIcons={setIcons} />
      </Grid>
      <Grid item container xs={12} lg={6} direction="row" justifyContent="center" spacing={0}>
        {manifest && <DisplayMetadata manifest={manifest} icons={icons} />}
      </Grid>
    </AppContainer>
  );
}