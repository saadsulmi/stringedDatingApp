import * as React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";

function ImageContent({ user }) {
  return (
    <>
      <Grid
        item
        xs={12}
        justifyContent={"center"}
        sx={{
          display: "flex",
          alignContent: "end",
          alignItems: "end",
        }}
      >
        {user?.images ? (
          user.images.map((image, index) => {
            return (
              <Card
                key={index}
                component="img"
                src={image}
                loading="lazy"
                sx={{
                  mr: 2,
                  width: { xs: 220, sm: 150, lg: 250 },
                  height: { xs: 220 , sm: 150, lg: 250 },
                  bgcolor: "lightgray",
                  objectFit: "cover",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              />
            );
          })
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}

export default ImageContent;
