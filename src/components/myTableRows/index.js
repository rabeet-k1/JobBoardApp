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
  const { favoriteJobs } = useSelector((state) => state.FavoriteJobsSlice);
  const { userData } = useSelector((state) => state.AuthenticationSlice);
  const router = useRouter();
  const dispatch = useDispatch();

  let isExistFavItem = favoriteJobs?.findIndex(
    (itemmmmmm) => itemmmmmm.id == row.id
  );

  const handleMarkFav = (typeee) => {
    if (userData) {
      if (typeee == "favorite") {
        dispatch(setFavoriteJobs([row, ...favoriteJobs]));
        openSnackAlert("Job marked as favorite", "success");
      } else {
        let tempArr = [...favoriteJobs];
        tempArr.splice(isExistFavItem, 1);
        dispatch(setFavoriteJobs(tempArr));
        openSnackAlert("Job removed from favorites", "success");
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
        {isExistFavItem !== -1 ? (
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
