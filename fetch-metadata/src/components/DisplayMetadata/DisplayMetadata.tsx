import React from "react";
import { Grid, Link, styled, Typography } from "@mui/material";
import { imgType } from "../../util/image";
import { AnyMetaManifest as MetaManifest } from "@polywrap/polywrap-manifest-types-js";

const SectionContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
}));

const MetadataHeader = styled(Grid)(({ theme }) => ({
  marginBottom: "16px",
}));

const MetadataItem = styled(Grid)(({ theme }) => ({
  marginBottom: "8px",
}));

const WrapperIcon = styled("img")(({ theme }) => ({
  height: "64px",
  maxWidth: "100%",
}));

const LinkIcon = styled("img")(({ theme }) => ({
  height: "28px",
  maxWidth: "100%",
}));

interface Props {
  manifest: MetaManifest;
  icons: Record<string, string>;
}

export const DisplayMetadata: React.FC<Props> = ({
  manifest,
  icons,
}: Props) => {
  const metaDataStringValue = (property: string, value?: string) => (
    <MetadataItem
      container
      item
      direction="row"
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      spacing={0}
    >
      <Grid item xs={2}>
        <Typography variant={"subtitle2"}>{property}</Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant={"body2"}>{value}</Typography>
      </Grid>
    </MetadataItem>
  );

  return (
    <>
      <SectionContainer
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <MetadataHeader
          container
          item
          direction="row"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          spacing={0}
        >
          <Grid
            container
            item
            xs={10}
            direction="column"
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={0}
          >
            <Grid item>
              <Typography variant={"h3"}>{manifest.displayName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant={"body2"}>{manifest.subtext}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            {manifest.icon && (
              <WrapperIcon
                src={`data:image/${imgType(manifest.icon)};base64,${
                  icons[manifest.icon]
                }`}
                alt={""}
              />
            )}
          </Grid>
        </MetadataHeader>
        {metaDataStringValue("Description: ", manifest.description)}
        {metaDataStringValue("Repository: ", manifest.repository)}
        {metaDataStringValue("Tags: ", manifest.tags?.join(", "))}
        <MetadataItem
          container
          item
          direction="row"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          spacing={0}
        >
          <Grid item xs={2}>
            <Typography variant={"subtitle2"}>Links: </Typography>
          </Grid>
          <Grid item xs={10}>
            {manifest.links &&
              Object.values(manifest.links).map(({ name, icon, url }) => (
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  spacing={2}
                  key={icon}
                >
                  <Grid item>
                    <Link
                      variant={"body1"}
                      href={url}
                      underline={"hover"}
                      target="_blank"
                      rel="noopener"
                    >
                      {name}
                    </Link>
                  </Grid>
                  {icon && (
                    <Grid item>
                      <LinkIcon
                        src={`data:image/${imgType(icon)};base64,${
                          icons[icon]
                        }`}
                        alt={""}
                      />
                    </Grid>
                  )}
                </Grid>
              ))}
          </Grid>
        </MetadataItem>
        <MetadataItem
          container
          item
          direction="row"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          spacing={0}
        >
          <Grid item xs={10}>
          </Grid>
        </MetadataItem>
      </SectionContainer>
    </>
  );
};
