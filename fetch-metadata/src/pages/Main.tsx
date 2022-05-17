import React, {useState} from "react";
import {Grid, styled} from "@mui/material";
import {FetchMetadata} from "../components/FetchMetadata/FetchMetadata";
import {DisplayMetadata} from "../components/DisplayMetadata/DisplayMetadata";
import {MetaData} from "../util/MetaData";

const AppContainer = styled(Grid)(({ theme }) => ({
  padding: "40px 10px",
  width: '100%',
}));

export const Main: React.FC = () => {

  const [metadata, setMetadata] = useState<MetaData | undefined>();

  return (
    <AppContainer container direction="row" justifyContent="center" spacing={12} alignItems="flex-start">
      <Grid item xs={12} lg={6}>
        <FetchMetadata setMetadata={setMetadata} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <DisplayMetadata metadata={metadata} />
      </Grid>
    </AppContainer>
  );
}