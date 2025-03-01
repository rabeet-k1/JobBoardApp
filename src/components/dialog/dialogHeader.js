import React from "react";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        p: 0,
        marginBottom: 0.5,
        paddingX: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textTransform: "capitalize",
      }}
      {...other}
    >
      {children}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DialogHeader = (props) => {
  return (
    <BootstrapDialogTitle onClose={props.handleClose}>
      {props.title}
    </BootstrapDialogTitle>
  );
};

export default DialogHeader;
