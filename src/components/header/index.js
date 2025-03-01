import { primaryColor } from "@/constants";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: primaryColor }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Board App
          </Typography>
          <Button color="inherit">
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button color="inherit">
            <Link href={"/signup"}>Signup</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
