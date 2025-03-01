"use client";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { styled } from "@mui/material";
import SnackbarAlert from "../components/snackbar";
import { allColors, constants, primaryColor } from "../constants/index";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: primaryColor,
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: allColors.red,
  },
}));

const SnackProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={4}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
    >
      {children}
      <SnackbarAlert
        ref={(ref) => {
          constants.snackAlert = ref;
        }}
      />
    </SnackbarProvider>
  );
};

export default SnackProvider;
