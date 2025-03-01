import GlobalButton from "@/components/globalButton";
import { primaryColor } from "@/constants";
import { setFavoriteJobs } from "@/redux/slices/FavoriteJobs";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { openSnackAlert } from "@/helper";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import useFavorites from "@/hooks/useFavorites";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MyTableRows = ({ row, handleOpenModal }) => {
  const { fetchFav, favoriteJobs } = useFavorites();
  const { userData } = useSelector((state) => state.AuthenticationSlice);
  const router = useRouter();
  const dispatch = useDispatch();

  let isExistFavItem = favoriteJobs?.find(
    (itemmmmmm) => itemmmmmm.jobId == row.id
  );

  const handleMarkFav = async (typeee) => {
    if (userData) {
      if (typeee == "favorite") {
        try {
          const itemsRef = collection(
            firestore,
            "favorites",
            userData.id,
            "items"
          );
          const docRef = await addDoc(itemsRef, {
            userId: userData.id,
            jobId: row.id,
          });
          fetchFav();

          openSnackAlert("Job marked as favorite", "success");
        } catch (error) {
          console.error("Error adding document: ", error);
        }
        // dispatch(setFavoriteJobs([row, ...favoriteJobs]));
      } else {
        try {
          const itemsRef = doc(
            firestore,
            "favorites",
            userData.id,
            "items",
            isExistFavItem.id
          );
          await deleteDoc(itemsRef);
          fetchFav();
          openSnackAlert("Job removed from favorites", "success");
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    } else router.push("/login");
  };

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {row.title}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row.company_name}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row.job_type}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {isExistFavItem !== undefined ? (
          <FavoriteIcon
            sx={{ cursor: "pointer", color: "red" }}
            onClick={() => handleMarkFav("removeFavorite")}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleMarkFav("favorite")}
          />
        )}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        <GlobalButton
          title="View"
          style={{
            padding: "8px 30px",
            textTransform: "capitalize",
            background: primaryColor,
            fontWeight: "600",
            fontSize: "14px",
            boxShadow: "none",
            width: { xs: "100%", sm: "auto" },
          }}
          handleClickBtn={handleOpenModal}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default memo(MyTableRows);
