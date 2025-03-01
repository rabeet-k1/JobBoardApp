"use client";
import TextInput from "@/components/textInput";
import useDebounce from "@/hooks/useDebounce";
import { fetchJobs } from "@/redux/slices/JobPosts";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobDetailModal from "@/components/jobDetailModal";
import MyTableRows from "@/components/myTableRows";
import GlobalButton from "@/components/globalButton";
import { primaryColor } from "@/constants";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { allJobPosts, allJobsLoading } = useSelector(
    (state) => state.JobPostsSlice
  );
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const debouncedValue = useDebounce(searchVal, 300);
  const jobModalRef = useRef();

  useEffect(() => {
    if (allJobPosts?.length == 0) dispatch(fetchJobs());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // if (paginatedItem) if (callApi) callApi(newPage);
  };

  const filterJob = allJobPosts?.filter(
    (itemmm) =>
      itemmm.title.toLowerCase().includes(debouncedValue?.toLowerCase()) ||
      itemmm.company_name
        .toLowerCase()
        .includes(debouncedValue?.toLowerCase()) ||
      itemmm.job_type.toLowerCase().includes(debouncedValue?.toLowerCase())
  );

  const handleFavBtn = () => {
    router.push("/favorites");
  };

  return (
    <>
      <Header />
      <Box sx={{ background: "#fff", padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: "black",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            Jobs
          </Typography>
          <GlobalButton
            title="My Favorites"
            style={{
              padding: "8px 30px",
              background: primaryColor,
              textTransform: "capitalize",
            }}
            handleClickBtn={handleFavBtn}
          />
        </Box>

        <Box
          width={{
            xs: "100%",
            sm: "30%",
          }}
          sx={{
            marginLeft: "auto",
            textAlign: "right",
            marginBottom: "20px",
          }}
        >
          <TextInput
            fullwidth
            placeholder={"Search by title, company & job type"}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </Box>

        <Box sx={{ background: "#fff" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Job Title</StyledTableCell>
                  <StyledTableCell>Company</StyledTableCell>
                  <StyledTableCell>Job Type</StyledTableCell>
                  <StyledTableCell>Mark Favorite</StyledTableCell>
                  <StyledTableCell>View Detail</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterJob?.map((row) => (
                  <MyTableRows key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
            {allJobsLoading && (
              <Box sx={{ textAlign: "center", padding: "20px 0" }}>
                <Typography sx={{ fontWeight: "700" }}>
                  Fetching Data, Please wait!!!
                </Typography>
              </Box>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={0} //total records
            page={page}
            rowsPerPage={20}
            onPageChange={handleChangePage}
            sx={{ backgroundColor: "#fff" }}
            size="small"
          />
        </Box>
        <JobDetailModal ref={jobModalRef} />
      </Box>
    </>
  );
}
