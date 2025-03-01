import { Button } from "@mui/material";

const GlobalButton = ({
  variant,
  handleClickBtn,
  endIcon,
  startIcon,
  disabled,
  hoverProperties,
  iconHoverColor,
  title,
  style,
  ...props
}) => {
  return (
    <Button
      variant={variant || "contained"}
      onClick={handleClickBtn}
      endIcon={endIcon}
      startIcon={startIcon}
      {...props}
      sx={{
        ...style,
        borderRadius: "50px",
        "&:hover": {
          background: style.background,
          ...hoverProperties,
        },
        "&.MuiButtonBase-root:hover .MuiButton-startIcon svg": {
          color: iconHoverColor,
        },
        "&.MuiButtonBase-root:hover .MuiButton-endIcon svg": {
          color: iconHoverColor,
        },
      }}
    >
      {title}
    </Button>
  );
};

export default GlobalButton;
