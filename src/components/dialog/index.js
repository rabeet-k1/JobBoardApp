import React from "react";
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

const GlobalDialog = styled(Dialog)(({ theme, customWidth }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    background: "#fff",
    overflowY: "visible",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "&.MuiDialog-root .MuiDialog-container .MuiPaper-root": {
    width: customWidth ? customWidth : "550px",
    boxShadow:
      "0 0.46875rem 2.1875rem rgb(90 97 105 / 10%), 0 0.9375rem 1.40625rem rgb(90 97 105 / 10%), 0 0.25rem 0.53125rem rgb(90 97 105 / 12%), 0 0.125rem 0.1875rem rgb(90 97 105 / 10%)",
    padding: "20px 10px",
    margin: 0,
    maxWidth: "calc(100% - 30px)",
    borderRadius: "25px",
    overflowY: "visible",
  },
}));

const BootstrapDialog = ({ children, handleClose, open, customwidth }) => {
  return (
    <GlobalDialog
      onClose={handleClose}
      open={open}
      scroll="body"
      customWidth={customwidth}
    >
      {children}
    </GlobalDialog>
  );
};

export default BootstrapDialog;
