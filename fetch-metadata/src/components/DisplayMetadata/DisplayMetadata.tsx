import React from 'react';
import {Grid, Link, styled, Typography} from "@mui/material";
import {MetaData} from "../../util/MetaData";
import {imgType} from "../../util/image";

const SectionContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
}));

const MetadataHeader = styled(Grid)(({ theme }) => ({
  marginBottom: '16px',
}));

const MetadataItem = styled(Grid)(({ theme }) => ({
  marginBottom: '8px',
}));

const WrapperIcon = styled('img')(({ theme }) => ({
  height: "64px",
  maxWidth: "100%",
}));

const LinkIcon = styled('img')(({ theme }) => ({
  height: "28px",
  maxWidth: "100%",
}));

interface Props {
  metadata: MetaData | undefined
}

export const DisplayMetadata: React.FC<Props> = ({ metadata }: Props) => {

  if (!metadata) {
    return (<></>);
  }

  const metaDataStringValue = (property: string, value?: string) => (
    <MetadataItem container item direction="row" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={0}>
      <Grid item xs={2}>
        <Typography variant={"subtitle2"}>{property}</Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant={"body2"}>{value}</Typography>
      </Grid>
    </MetadataItem>
  )

  return (
    <>
      <SectionContainer container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
        <MetadataHeader container item direction="row" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={0}>
          <Grid container item xs={10} direction="column" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={0}>
            <Grid item>
              <Typography variant={"h3"}>{metadata.displayName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant={"body2"}>{metadata.subtext}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            {metadata.icon && metadata.iconImage && <WrapperIcon src={`data:image/${imgType(metadata.icon)};base64,${metadata.iconImage}`} alt={""}/>}
          </Grid>
        </MetadataHeader>
        {metaDataStringValue("Description: ", metadata.description)}
        {metaDataStringValue("Repository: ", metadata.repository)}
        {metaDataStringValue("Tags: ", metadata.tags?.join(", "))}
        <MetadataItem container item direction="row" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={0}>
          <Grid item xs={2}>
            <Typography variant={"subtitle2"}>Links: </Typography>
          </Grid>
          <Grid item xs={10}>
            {metadata.links && Object.values(metadata.links).map(({ name, icon, url, iconImage}) => (
              <Grid container item direction="row" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={2} key={icon}>
                <Grid item>
                  <Link variant={"body1"}
                        href={url}
                        underline={"hover"}
                        target='_blank'
                        rel="noopener">
                    {name}
                  </Link>
                </Grid>
                {icon && iconImage &&
                  <Grid item>
                    <LinkIcon src={`data:image/${imgType(icon)};base64,${iconImage}`} alt={""}/>
                  </Grid>
                }
              </Grid>
            ))}
          </Grid>
        </MetadataItem>
        <MetadataItem container item direction="row" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={0}>
          <Grid item xs={2}>
            <Typography variant={"subtitle2"}>Queries: </Typography>
          </Grid>
          <Grid item xs={10}>
            {metadata.queries && Object.values(metadata.queries).map(({ name, description }) => (
              <MetadataItem container item direction="row" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={0}>
                <Grid item xs={3}>
                  <Typography variant={"body1"}>{name}</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant={"body2"}>{description}</Typography>
                </Grid>
              </MetadataItem>
            ))}
          </Grid>
        </MetadataItem>
      </SectionContainer>
    </>
  );
};
