import { firestore } from "@/firebase";
import { openSnackAlert } from "@/helper";
import useFavorites from "@/hooks/useFavorites";
import { deleteDoc, doc } from "@firebase/firestore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const FavoriteCards = ({ favItem, index }) => {
  const { fetchFav } = useFavorites();
  const { userData } = useSelector((state) => state.AuthenticationSlice);

  const handleRemoveItem = async () => {
    try {
      const itemsRef = doc(
        firestore,
        "favorites",
        userData.id,
        "items",
        favItem.id
      );
      await deleteDoc(itemsRef);
      fetchFav();
      openSnackAlert("Job removed from favorites", "success");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
