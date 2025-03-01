import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { forwardRef, useImperativeHandle } from "react";

const SnackbarAlert = forwardRef((props, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  useImperativeHandle(ref, () => ({
    openSnack(snackMessage, snackType) {
      enqueueSnackbar(snackMessage, { variant: snackType });
    },
  }));
  return <Box />;
});

export default SnackbarAlert;
