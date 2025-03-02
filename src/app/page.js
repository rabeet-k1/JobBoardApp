"use client";
import GlobalButton from "@/components/globalButton";
import Header from "@/components/header";
import JobDetailModal from "@/components/jobDetailModal";
import MyTableRows from "@/components/myTableRows";
import TextInput from "@/components/textInput";
import { primaryColor } from "@/constants";
import useDebounce from "@/hooks/useDebounce";
import { fetchJobs, setRecordsLimit } from "@/redux/slices/JobPosts";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const debouncedValue = useDebounce(searchVal, 500);
  const jobModalRef = useRef();

  useEffect(() => {
    let payload = { limit: 20, searchVal: debouncedValue };
    dispatch(setRecordsLimit(20));
    dispatch(fetchJobs(payload));
  }, [debouncedValue]);

  const handleLoadMore = () => {
    let payload = { limit: recordsLimit + 20, searchVal: debouncedValue };
    dispatch(setRecordsLimit(recordsLimit + 20));
    dispatch(fetchJobs(payload));
  };

  // const filterJob = allJobPosts?.filter(
  //   (itemmm) =>
  //     itemmm.title.toLowerCase().includes(debouncedValue?.toLowerCase()) ||
  //     itemmm.company_name
  //       .toLowerCase()
  //       .includes(debouncedValue?.toLowerCase()) ||
  //     itemmm.job_type.toLowerCase().includes(debouncedValue?.toLowerCase())
  // );

  const handleFavBtn = () => {
    if (userData) router.push("/favorites");
    else router.push("/login");
  };

  const renderTable = useMemo(() => {
    return (
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
            {allJobPosts?.map((row) => (
              <MyTableRows
                key={row.id}
                row={row}
                handleOpenModal={() => jobModalRef.current.isOpenDialog(row)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [allJobPosts]);

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
          {renderTable}
          {allJobsLoading && (
            <Box sx={{ textAlign: "center", padding: "20px 0" }}>
              <Typography sx={{ fontWeight: "700", color: "black" }}>
                Fetching Data, Please wait!!!
              </Typography>
            </Box>
          )}
          {allJobPosts.length == 0 && (
            <Box sx={{ textAlign: "center", padding: "20px 0" }}>
              <Typography sx={{ fontWeight: "700", color: "black" }}>
                No Data Found!
              </Typography>
            </Box>
          )}
          {!allJobsLoading && (
            <div
              style={{
                marginTop: "10px",
                width: "100%",
                textAlign: "center",
                display: recordsLimit < totalRecords ? "block" : "none",
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
