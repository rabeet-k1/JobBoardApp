"use client";
import TextInput from "@/components/textInput";
import useDebounce from "@/hooks/useDebounce";
import {
  fetchJobs,
  setCurrentPage,
  setRecordsLimit,
} from "@/redux/slices/JobPosts";
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
  const { allJobPosts, allJobsLoading, totalRecords, recordsLimit } =
    useSelector((state) => state.JobPostsSlice);
  const { userData } = useSelector((state) => state.AuthenticationSlice);
  const [searchVal, setSearchVal] = useState("");
  const debouncedValue = useDebounce(searchVal, 300);
  const jobModalRef = useRef();

  useEffect(() => {
    if (allJobPosts?.length == 0) dispatch(fetchJobs(recordsLimit));
  }, []);

  const handleLoadMore = () => {
    dispatch(setRecordsLimit(recordsLimit + 20));
    dispatch(fetchJobs(recordsLimit + 20));
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
    if (userData) router.push("/favorites");
    else router.push("/login");
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
                  <MyTableRows
                    key={row.id}
                    row={row}
                    handleOpenModal={() =>
                      jobModalRef.current.isOpenDialog(row)
                    }
                  />
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

          {!allJobsLoading && (
            <div
              style={{
                marginTop: "10px",
                width: "100%",
                textAlign: "center",
                display: recordsLimit !== totalRecords ? "block" : "none",
              }}
            >
              <GlobalButton
                title="View More"
                style={{
                  padding: "8px 30px",
                  background: primaryColor,
                  textTransform: "capitalize",
                }}
                handleClickBtn={handleLoadMore}
              />
            </div>
          )}
        </Box>
        <JobDetailModal ref={jobModalRef} />
      </Box>
    </>
  );
}
