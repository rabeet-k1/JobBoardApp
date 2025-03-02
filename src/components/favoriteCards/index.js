import { openSnackAlert } from "@/helper";
import { setFavoriteJobs } from "@/redux/slices/FavoriteJobs";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FavoriteCards = ({ favItem, index }) => {
  const dispatch = useDispatch();
  const { favoriteJobs } = useSelector((state) => state.FavoriteJobsSlice);

  const handleRemoveItem = () => {
    let tempArr = [...favoriteJobs];
    tempArr.splice(index, 1);
    dispatch(setFavoriteJobs(tempArr));
    openSnackAlert("Job removed from favorites", "success");
  };

  return (
    <Box
      sx={{
        background: "#fff",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: "24px",
        position: "relative",
        color: "black",
      }}
    >
      <FavoriteIcon
        sx={{
          cursor: "pointer",
          color: "red",
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
        onClick={handleRemoveItem}
      />
      <Typography>Name: {favItem?.title}</Typography>
      <Typography>Company Name: {favItem?.company_name}</Typography>
      <Typography>Job Type: {favItem?.job_type}</Typography>
      <Typography>Salary: {favItem?.salary ? favItem?.salary : "-"}</Typography>
    </Box>
  );
};

export default FavoriteCards;
