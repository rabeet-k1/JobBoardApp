import { Box, DialogContent, Typography } from "@mui/material";
import React, { useState } from "react";
import DialogFooter from "../dialog/dialogFooter";
import DialogHeader from "../dialog/dialogHeader";
import BootstrapDialog from "../dialog";
import GlobalButton from "../globalButton";
import { primaryColor } from "@/constants";
import Link from "next/link";

let refData = null;

const JobDetailModal = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  React.useImperativeHandle(ref, () => ({
    isOpenDialog(dataaaa) {
      refData = dataaaa;
      setOpen(true);
    },
  }));

  return (
    <Box>
      <BootstrapDialog onClose={() => ref.current.handleClose()} open={open}>
        <DialogHeader
          title={"Job Details"}
          handleClose={() => setOpen(false)}
        />
        <DialogContent dividers>
          <Typography>Name: {refData?.title}</Typography>
          <Typography>Company Name: {refData?.company_name}</Typography>
          <Typography>Job Type: {refData?.job_type}</Typography>
          <Typography sx={{ marginBottom: "20px" }}>
            Salary: {refData?.salary}
          </Typography>
          <Link href={refData?.url} target="_blank">
            <GlobalButton
              title="Apply Now"
              style={{
                padding: "8px 30px",
                background: primaryColor,
                textTransform: "capitalize",
              }}
            />
          </Link>
          <Typography sx={{ marginTop: "20px", fontWeight: "600" }}>
            Job Description:
          </Typography>
          <div
            style={{ padding: "0 20px" }}
            dangerouslySetInnerHTML={{ __html: refData?.description }}
          />
        </DialogContent>
        <DialogFooter type={refData?.type} handleClose={() => setOpen(false)} />
      </BootstrapDialog>
    </Box>
  );
});

export default JobDetailModal;
