import { DialogActions } from "@mui/material";
import React from "react";
import { allColors } from "@/constants";
import GlobalButton from "../globalButton";

const DialogFooter = ({ handleClose }) => {
  return (
    <DialogActions>
      <GlobalButton
        title={"Close"}
        handleClickBtn={handleClose}
        style={{ background: allColors.red }}
      />
    </DialogActions>
  );
};

export default DialogFooter;
