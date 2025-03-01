import { primaryColor } from "@/constants";
import app from "@/firebase";
import { setUserData } from "@/redux/slices/Authentication";
import { setFavoriteJobs } from "@/redux/slices/FavoriteJobs";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const { userData } = useSelector((state) => state.AuthenticationSlice);

  const handleLogout = () => {
    auth
      .signOut()
      .then((responsee) => {
        dispatch(setUserData());
        dispatch(setFavoriteJobs([]));
      })
      .catch((errrr) => {
        console.log(errrr, "error");
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: primaryColor }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello, {userData ? userData?.userName : "Guest!"}
          </Typography>
          {!userData ? (
            <>
              <Button color="inherit">
                <Link href={"/login"}>Login</Link>
              </Button>
              <Button color="inherit">
                <Link href={"/signup"}>Signup</Link>
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
