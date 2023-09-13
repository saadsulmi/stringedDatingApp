import * as React from "react";
import { Grid, Skeleton } from "@mui/material";
import Chip from "@mui/joy/Chip";
import WineBar from "@mui/icons-material/WineBar";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import GenderIcon from "../Icons/GenderIcon";
import RelationIcon from "../Icons/RelationIcon";
import ReligionIcon from "../Icons/ReligionIcon";
import ImageContent from "./ImageContent";

function ChipsContent({ isLoading, user }) {
  return (
    <>
    <Grid container item xs={12} justifyContent={"space-between"} spacing={2}>
    <Grid item lg={4} xs>
        <Chip
        startDecorator={<GenderIcon />}
        color="neutral"
        size="lg"
        variant="soft"
      >
        {isLoading ? <Skeleton /> : user?.gender}
      </Chip>
    </Grid>
    <Grid item lg={4} xs>
      <Chip
        startDecorator={<ReligionIcon />}
        color="neutral"
        size="lg"
        variant="soft"
      >
        {isLoading ? <Skeleton /> : user?.faith}
      </Chip>
    </Grid>
    <Grid item lg={4} xs>
      <Chip
        startDecorator={<RelationIcon />}
        color="neutral"
        size="lg"
        variant="soft"
      >
        {isLoading ? <Skeleton /> : user?.realationshipStatus}
      </Chip>
    </Grid>
    <Grid item lg={4} xs>
      <Chip
        startDecorator={<SmokingRoomsIcon />}
        color="neutral"
        size="lg"
        variant="soft"
      >
        {isLoading ? <Skeleton /> : user?.smoking}
      </Chip>
    </Grid>
    <Grid item lg={4} xs>
      <Chip
        startDecorator={<WineBar />}
        color="neutral"
        size="lg"
        variant="soft"
      >
        {isLoading ? <Skeleton /> : user?.drinking ? user?.drinking : ""}
      </Chip>
    </Grid>
    </Grid>
    </>
  );
}

export default ChipsContent;
